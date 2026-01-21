from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from yt_dlp import YoutubeDL
from util import *
import os
import shutil

app = Flask(__name__)
CORS(app, expose_headers=['filename'])

@app.route("/download", methods=['POST'])
def download():
    data = request.get_json()
    video_url = data.get('url')

    ydl_opts = {
        'nocheckcertificate': True,
        'quiet': False,
        'format': 'bestaudio/best',
        'outtmpl': 'downloads/%(title)s.%(ext)s',
        'ffmpeg_location': './ffmpeg',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=True)
        filename = ydl.prepare_filename(info).replace('.webm', '.mp3').replace('.m4a', '.mp3')

    # [10:] strips "downloads_" prefix from filename
    serialized_filename = remove_url_from_name(string_to_latin1(filename))[10:]

    os.rename(filename, f"downloads/{serialized_filename}")

    # Should activate X-Sendfile or something
    response = send_file(f"downloads/{serialized_filename}", as_attachment=True)
    response.headers['X-Filename'] = serialized_filename
    response.headers.add('Access-Control-Expose-Headers', 'X-Filename')

    return response

@app.route("/list-download", methods=['POST'])
def list_download():
    data = request.get_json()
    video_urls = data.get('urls')

    ydl_opts = {
        'nocheckcertificate': True,
        'quiet': False,
        'format': 'bestaudio/best',
        'outtmpl': 'downloads/%(title)s.%(ext)s',
        'ffmpeg_location': './ffmpeg',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]
    }

    file_paths = []

    with YoutubeDL(ydl_opts) as ydl:
        for url in video_urls:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info).replace('.webm', '.mp3').replace('.m4a', '.mp3')
            serialized_filename_path = f"downloads/{remove_url_from_name(string_to_latin1(filename))[10:]}"
            os.rename(filename, serialized_filename_path)
            file_paths.append(serialized_filename_path)
    
    shutil.make_archive('downloaded_playlist', 'zip', './downloads/')

    response = send_file('downloaded_playlist.zip', as_attachment=True)
    return response

@app.route("/cleanup", methods=['POST'])
def cleanup():
    try:
        for item in os.listdir('./downloads/'):
            if item[-4:] == '.mp3':
                print("Removing", item)
                os.remove(f"./downloads/{item}")
        for item in os.listdir('.'):
            if item[-4:] == '.zip':
                print("Removing", item)
                os.remove(item)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
