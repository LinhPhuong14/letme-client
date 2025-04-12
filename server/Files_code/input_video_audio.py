import cv2
import numpy as np
import sounddevice as sd
import wave
import threading
import time
import os
from pydub import AudioSegment

# === Configuration settings ===
VIDEO_FOLDER = "File_video"
AUDIO_FOLDER = "File_audio"

VIDEO_FILENAME = "Video.mp4"
AUDIO_FILENAME = "audio.wav"

DURATION = 64  # 1 minute and 4 seconds
FRAME_WIDTH = 1920  # Full HD
FRAME_HEIGHT = 1080
FPS = 30  # Keep 30 FPS for stable recording
SAMPLE_RATE = 48000  # High-quality audio sample rate
CHANNELS = 2  # Stereo recording
BIT_DEPTH = 2  # 16-bit PCM (Compatible with WAV format)

# === Create folders if they do not exist ===
os.makedirs(VIDEO_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)

# === Define file paths ===
video_path = os.path.join(VIDEO_FOLDER, VIDEO_FILENAME)
audio_path = os.path.join(AUDIO_FOLDER, AUDIO_FILENAME)

# === Function to record video ===
def record_video():
    cap = cv2.VideoCapture(0)  # Open the default camera

    if not cap.isOpened():
        print("❌ Cannot open the camera!")
        return

    frame_width = int(cap.get(3))  # Get frame width
    frame_height = int(cap.get(4))  # Get frame height

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Use MP4 codec
    out = cv2.VideoWriter(video_path, fourcc, FPS, (frame_width, frame_height))

    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Unable to read frames from the camera!")
            break
        out.write(frame)
        cv2.imshow("Recording", frame)  # Display the recording window

        elapsed_time = time.time() - start_time
        if elapsed_time > DURATION:
            break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()
    print(f"❗ Video has been saved")

# === Function to record audio (Increase volume) ===
def record_audio():
    audio_frames = []

    def callback(indata, frames, time, status):
        if status:
            print(status)
        audio_frames.append(indata.copy())

    with sd.InputStream(samplerate=SAMPLE_RATE, channels=CHANNELS, dtype='int16', callback=callback):
        time.sleep(DURATION)

    # Convert recorded frames to a numpy array and amplify the audio
    audio_np = np.concatenate(audio_frames, axis=0).astype(np.int16)

    # Amplify the audio (Increase volume x2)
    audio_np = np.clip(audio_np * 2.0, -32768, 32767).astype(np.int16)

    # Save raw WAV file before applying additional amplification
    wf = wave.open(audio_path, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(BIT_DEPTH)  # 16-bit PCM
    wf.setframerate(SAMPLE_RATE)
    wf.writeframes(audio_np.tobytes())
    wf.close()

    # Use pydub to further increase volume by 10dB
    audio_segment = AudioSegment.from_wav(audio_path)
    louder_audio = audio_segment + 10  # Increase volume by 10dB
    louder_audio.export(audio_path, format="wav")

    print(f"❗ Audio has been saved")

# === Run video and audio recording in parallel ===
video_thread = threading.Thread(target=record_video)
audio_thread = threading.Thread(target=record_audio)

video_thread.start()
audio_thread.start()

video_thread.join()
audio_thread.join()
