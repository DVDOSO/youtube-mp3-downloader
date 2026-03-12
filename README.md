# YouTube to MP3 Converter

A full-stack web application that allows users to convert YouTube videos to MP3 files individually or in bulk. This project utilizes a **Next.js** frontend and a **Python (Flask)** backend powered by `yt-dlp` and `FFmpeg`.

---

## 🚀 Quick Start (Docker)

The easiest way to run this project is using Docker Compose. This handles all system dependencies—including Python, Node.js, and FFmpeg—automatically inside isolated Linux containers.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Note for Windows Users:** Virtualization must be enabled in your BIOS.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/DVDOSO/youtube-mp3-downloader.git
    cd youtube-mp3-downloader
    ```

2.  **Start the application:**

    ```bash
    docker-compose up --build
    ```

    _Note: The first build will take a few minutes as it downloads the base images and installs FFmpeg._

3.  **Access the app:**
    [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Python Flask
- **Processing:** `yt-dlp` & FFmpeg (Linux binaries)
- **Infrastructure:** Docker & Docker Compose

---

## 📁 Project Structure

- `/client`: Next.js frontend application.
- `/server`: Flask API and conversion logic.
- `/server/downloads`: Temporary storage for processed MP3 files.

---

## ⚖️ Disclaimer

This project is for **educational and entertainment purposes only**.

- **Copyright & Terms of Service:** This tool is not intended to facilitate the illegal downloading of copyrighted material. Users are responsible for complying with YouTube's [Terms of Service](https://www.youtube.com/t/terms) and all applicable copyright laws in their jurisdiction.
- **No Warranty:** The author of this project assumes no liability for any misuse of this software or for any damages resulting from its use.
- **Use at your own risk:** This application is provided "as is" without any warranties regarding its functionality or legality in your specific region.
