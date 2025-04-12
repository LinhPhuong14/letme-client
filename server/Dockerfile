FROM python:3.11-slim

# Cài thư viện hệ thống
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    libasound2-dev \
    portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

# Đặt thư mục làm việc
WORKDIR /app

# COPY toàn bộ project (nếu Dockerfile nằm trong Letme_code)
COPY . .

# Cài thư viện Python
RUN pip install --no-cache-dir -r requirements.txt

# Chạy app
CMD ["python", "main.py"]
