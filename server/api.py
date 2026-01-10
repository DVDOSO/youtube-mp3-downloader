from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from yt_dlp import YoutubeDL
from util import *
import os
from time import sleep

app = Flask(__name__)
CORS(app, expose_headers=['filename'])

@app.route("/download", methods=['POST'])
def download():
    data = request.get_json()
    video_urls = data.get('url')

    ydl_opts = {
        'nocheckcertificate': True,
        'quiet': False,
        'format': 'bestaudio/best',
        'ffmpeg_location': './ffmpeg',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_urls, download=True)
        filename = ydl.prepare_filename(info).replace('.webm', '.mp3').replace('.m4a', '.mp3')

    exposed_filename = remove_url_from_name(string_to_latin1(filename))

    # Should activate X-Sendfile or something
    response = send_file(filename, as_attachment=True)
    response.headers['X-Filename'] = exposed_filename
    response.headers.add('Access-Control-Expose-Headers', 'X-Filename')

    return response

@app.route("/cleanup", methods=['POST'])
def cleanup():
    try:
        for item in os.listdir('.'):
            if item[-4:] == '.mp3':
                print("Removing", item)
                os.remove(item)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
