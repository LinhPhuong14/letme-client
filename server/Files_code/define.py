import subprocess
import ffmpeg

def extract_audio(input_video_path, output_audio_path):
    # Lệnh FFmpeg để tách âm thanh từ video và lưu dưới dạng WAV
    command = [
        'ffmpeg', 
        '-i', input_video_path,  # Đường dẫn tới video
        '-vn',                    # Tắt video
        '-acodec', 'pcm_s16le',    # Codec âm thanh PCM 16-bit
        '-ar', '44100',            # Tần số mẫu (sample rate) 44.1 kHz
        '-ac', '2',                # Sử dụng 2 kênh (stereo)
        output_audio_path         # Đường dẫn để lưu âm thanh
    ]
    
    try:
        # Thực thi lệnh FFmpeg
        subprocess.run(command, check=True)
        print(f"Audio has been extracted and saved to {output_audio_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")



def merge_audio_video(input_video_path, input_audio_path, output_video_path):
    # Lệnh FFmpeg để ghép audio và video lại với nhau
    command = [
        'ffmpeg',
        '-i', input_video_path,   # Đường dẫn đến video MP4
        '-i', input_audio_path,    # Đường dẫn đến audio WAV
        '-c:v', 'copy',            # Giữ nguyên video mà không mã hóa lại (copy)
        '-c:a', 'aac',       # Chọn codec âm thanh PCM 16-bit cho âm thanh lossless
        '-ar', '44100',            # Tần số mẫu 44.1 kHz cho âm thanh
        '-ac', '2',                # Sử dụng 2 kênh âm thanh (stereo)
        '-shortest',               # Đảm bảo video và audio có độ dài giống nhau
        output_video_path         # Đường dẫn để lưu video đầu ra
    ]
    
    try:
        # Thực thi lệnh FFmpeg
        subprocess.run(command, check=True)
        print(f"Video and audio have been merged and saved to {output_video_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")


def get_video_duration(filename):
    try:
        probe = ffmpeg.probe(filename)
        format_info = probe['format']
        duration = float(format_info['duration'])
        return duration
    except ffmpeg.Error as e:
        print("Lỗi ffmpeg:", e)
        return None


# def merge_audio_video(video_path, audio_path, output_path):
#     # Đọc file video và audio
#     video = VideoFileClip(video_path)
#     audio = AudioFileClip(audio_path)

#     # Đảm bảo rằng thời gian của audio và video là như nhau
#     audio = audio.subclip(0, video.duration)

#     # Gắn âm thanh vào video
#     video_with_audio = video.set_audio(audio)

#     # Lưu video kết hợp với âm thanh
#     video_with_audio.write_videofile(output_path, codec='libx264', audio_codec='aac', bitrate='5000k')