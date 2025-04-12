@echo off
echo 🚀 Building Docker image...
docker build -t letme-app .

echo 🏃 Running container with mounted source code...
docker run -it --rm -v "%cd%":/app -w /app letme-app

pause
