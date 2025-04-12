import subprocess
import threading
import os
import sys
import pandas as pd
from Files_code.define import extract_audio

# === 📁 Đường dẫn gốc của project ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# === 📄 Đường dẫn tuyệt đối đến các script con ===
file1 = os.path.join(BASE_DIR, "Files_code", "input_video_audio.py")
file2 = os.path.join(BASE_DIR, "Files_code", "visual.py")
file3 = os.path.join(BASE_DIR, "Files_code", "voice.py")
file4 = os.path.join(BASE_DIR, "Files_code", "bounding_box.py")
file5 = os.path.join(BASE_DIR, "Files_code", "backup.py")
file6 = os.path.join(BASE_DIR, "Files_code", "delete_info.py")

# === 📁 Đường dẫn thư mục ===
file_video_dir = os.path.join(BASE_DIR, "File_video")
file_audio_path = os.path.join(BASE_DIR, "File_audio", "audio.wav")
score_visual_path = os.path.join(BASE_DIR, "Infomation", "score_frame_visual.csv")
score_voice_path = os.path.join(BASE_DIR, "Infomation", "score_voices.csv")
final_output_path = os.path.join(BASE_DIR, "Infomation", "final_output.mp4")

# === 🧹 Xóa màn hình (chỉ Windows) ===
os.system("cls" if os.name == "nt" else "clear")

# === 🧩 Hàm tiện ích chạy script (bắt lỗi) ===
def run_script(script_path):
    try:
        print(f"🔹 Running: {script_path}")
        process = subprocess.Popen([sys.executable, script_path], cwd=BASE_DIR)
        process.wait()
        if process.returncode == 0:
            print(f"✅ Hoàn thành: {os.path.basename(script_path)}")
        else:
            print(f"❌ Lỗi: {os.path.basename(script_path)} (Exit Code: {process.returncode})")
    except Exception as e:
        print(f"❗ Exception khi chạy {script_path}: {e}")

# === 🧠 Tính điểm tổng hợp từ visual + voice ===
def calculator_frame_visual_voice():
    df_visual = pd.read_csv(score_visual_path)
    df_voice = pd.read_csv(score_voice_path)
    
    score_voice = df_voice["Final_score"].iloc[0]
    df_visual["Score_voice_visual"] = df_visual["Score"] * 0.7 + score_voice * 0.3
    
    df_visual.to_csv(score_visual_path, index=False)

# === 🔧 BẮT ĐẦU CHẠY ===
if __name__ == "__main__":
    run_script(file6)
    print("-" * 50)

    print("1. Using the camera directly")
    print("2. Importing video")
    s = int(input("You want to use the camera directly or import video: "))

    if s == 2:
        input("Bạn đã nhập video vào chưa? (Nếu rồi hãy nhấn ENTER)")
        videos = os.listdir(file_video_dir)

        if len(videos) == 0:
            print("❌ Video file not found. Please check the input.")
            sys.exit()
        elif len(videos) > 1:
            print("❌ Video files more than 1. Please check input.")
            sys.exit()
        else:
            video_path = os.path.join(file_video_dir, videos[0])
            extract_audio(video_path, file_audio_path)
    else:
        run_script(file1)
        print("-" * 50)

    # === Chạy song song visual.py và voice.py ===
    t2 = threading.Thread(target=run_script, args=(file2,))
    t3 = threading.Thread(target=run_script, args=(file3,))
    t2.start()
    t3.start()
    t2.join()
    t3.join()

    print("-" * 50)

    calculator_frame_visual_voice()
    run_script(file4)
    print("-" * 50)
    run_script(file5)
    print("-" * 50)
    run_script(file6)
    print("-" * 50)

    print("🎉 Tất cả các bước đã hoàn thành.")
