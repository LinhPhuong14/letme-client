import sys
import os

# Thêm đường dẫn thư mục cha (tầng 1) vào sys.path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from utils import *


# Định nghĩa các thư mục và đường dẫn file
audio_folder = "File_audio"
chart_folder = r"Infomation/Chart_feature_audio"
score_output_voice = r"Infomation/score_voices.csv"

name_audio = os.listdir(audio_folder)
audio_path = os.path.join(audio_folder, name_audio[0])


# Tạo thư mục chứa biểu đồ nếu chưa có
os.makedirs(chart_folder, exist_ok=True)

def extract_features(audio_path, threshold_db=25):
    # Đọc file âm thanh
    sound = parselmouth.Sound(audio_path)
    
    # 1. Trích xuất F0 (Pitch)
    pitch = sound.to_pitch()
    f0_values = pitch.selected_array['frequency']
    f0_values = f0_values[f0_values != 0]  # Loại bỏ giá trị 0 (không có pitch)
    mean_f0 = np.mean(f0_values) if len(f0_values) > 0 else 0
    
    # 2. Trích xuất cường độ (Intensity)
    intensity = sound.to_intensity()
    intensity_values = intensity.values[0]
    mean_intensity = np.mean(intensity_values) if len(intensity_values) > 0 else 0
    
    # 5. Tính tốc độ nói (Speech Rate)
    speech_rate = len(f0_values) / sound.get_total_duration() if sound.get_total_duration() > 0 else 0
    
    result = {
        "mean_f0": mean_f0,
        "mean_intensity": mean_intensity,
        "speech_rate": speech_rate,
    }
    
    percent_feature = 0
    
    for item in normal_ranges:
        min_normal, max_normal = normal_ranges[item]
        value = result[item]
        
        if value < min_normal:
            # Giá trị thấp hơn ngưỡng bình thường
            percent_feature += sqrt((min_normal - value) / min_normal) 
        elif value > max_normal:
            # Giá trị cao hơn ngưỡng bình thường
            percent_feature += ((value - max_normal) / max_normal) ** 2 
        else:
            # Giá trị nằm trong khoảng bình thường
            percent_feature += 0
        
    # Trả về kết quả
    return max(0, min(percent_feature, 1)), result

def emotion_voice(path_voice):
    # Tải mô hình Speech Emotion Recognition từ Hugging Face
    classifier = pipeline(
        "audio-classification",
        model="firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3"
    )

    # Đường dẫn tới tệp âm thanh của bạn
    audio_file = path_voice  # Thay đổi với đường dẫn tệp âm thanh thực tế

    # Sử dụng mô hình để phân loại cảm xúc
    result = classifier(audio_file)
      
    percent_emotion = 0
    
    for item in result:
        if item['label'] == 'sad':
            percent_emotion += item['score'] * emotion_weights["sad"] 
        elif item['label'] == 'happy':
            percent_emotion += item['score'] * emotion_weights["happy"] 
        elif item['label'] == 'neutral':
            percent_emotion += item['score'] * emotion_weights["neutral"] 
        elif item['label'] == 'fearful':
            percent_emotion += item['score'] * emotion_weights["fearful"] 
        elif item['label'] == 'angry':
            percent_emotion += item['score'] * emotion_weights["angry"] 
        elif item['label'] == 'surprised':
            percent_emotion += item['score'] * emotion_weights["surprised"] 
        elif item['label'] == 'disgust':
            percent_emotion += item['score'] * emotion_weights["disgust"] 
    
    # In kết quả phân loại cảm xúc
    return max(0, min(percent_emotion,1))
    
weights = {
    "emotion":          0.7,
    "voice_features" :  0.3    
}  

emotion_weights = {"sad": 0.85, "happy": -0.1, "neutral": 0.6, "fearful": 0.85, "angry": 0.5, "surprised": 0.2, "disgust": 0.3}

normal_ranges = {
        "mean_f0":               (120, 220),
        "mean_intensity":        (50, 70),
        "speech_rate":           (50, 70),
    }

voice_features_weights = {"mean_f0": 0.4, "mean_intensity": 0.3, "speech_rate": 0.3}

# Sử dụng hàm
features, voice_features = extract_features(audio_path)
emotion = emotion_voice(audio_path)

final_score = weights["emotion"] * emotion + weights["voice_features"] * features

df = pd.DataFrame({"Final_score" : [final_score],
                   "Score_features" : [features],
                   "Score_emotion" : [emotion]
                   })

df.to_csv(score_output_voice, index=False)

# In kết quả
print(f"The percentage of predictions based on emotion through voice: {(emotion * 100):.4f} %, based on voice characteristics: {(features * 100):.4f} %")
print(f"✅ Analysis completed! Depression score based on VOCAL features: {(final_score * 100):.4f} %")

# Vẽ biểu đồ so sánh các đặc trưng với khoảng giá trị bình thường
for feature_name, val in voice_features.items():
    plt.figure(figsize=(6, 4))
    
    plt.bar(feature_name, val, color='blue', alpha=0.7)
    plt.axhline(y=normal_ranges[feature_name][0], color='g', linestyle='--', label="Min Normal")
    plt.axhline(y=normal_ranges[feature_name][1], color='r', linestyle='--', label="Max Normal")
    
    plt.xlabel("Voice Feature")
    plt.ylabel("Value")
    plt.title(f"Analysis of {feature_name}")
    plt.legend()
    
    plt.savefig(os.path.join(chart_folder, f"{feature_name}_plot.png"))
    plt.close()

