import sys
import os

# Thêm đường dẫn thư mục cha (tầng 1) vào sys.path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from utils import *

# API Key and Secret for Face++
API_KEY =       "8I_E0VPUMA8u_Zp6_Fx2NuOYmEBA9tEc"
API_SECRET =    "qgql8HtU-3_ZiOztuwrj1hWg-M6TqrM3"

# Define weights for different facial attributes (normalized) 
weights = {
    "emotion":      0.5,    
    "smile":        0.2,    
    "eye_status":   0.15,   
    "headpose":     0.03,   
    "skinstatus":   0.1,   
    "blur":         0.02    
}

# === Detailed attribute weights (normalized to max 1.0) ===
emotion_weights =       {"sadness": 1.2, "happiness": -0.85, "neutral": 0.6, "fear": 1.5}
headpose_weights =      {"pitch": 0.7, "yaw": 0.8}
skinstatus_weights =    {"dark_circle": 0.65, "health": -0.55}
eye_status_weights =    {"no_glass_eye_close": 0.7, "eye_gaze_avoidance": 0.8}
blur_weight =   0.5

# Define directories
VIDEO_INPUT_FOLDER =    "File_video"
FRAME_OUTPUT_FOLDER =   r"Infomation/Frame_video"
# Save the results to a CSV file
SCORE_OUTPUT_FILE = r"Infomation/score_frame_visual.csv"

name_video = os.listdir(VIDEO_INPUT_FOLDER)
video_path = os.path.join(VIDEO_INPUT_FOLDER, name_video[0])

# Create the output directory if it does not exist
os.makedirs(FRAME_OUTPUT_FOLDER, exist_ok=True)

# Check if the video file exists
if not os.path.exists(video_path):
    raise FileNotFoundError(f"File {video_path} not found. Please check the input.")

# Extract 30 frames from the video (one frame every 2 seconds) 
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)     # Get frames per second
frame_interval = int(fps * 1)       # Capture 1 frame every 1 seconds
frame_count = 0
saved_frames = []

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    if frame_count % frame_interval == 0:
        frame_filename = os.path.join(FRAME_OUTPUT_FOLDER, f"frame_{len(saved_frames)}.jpg")
        cv2.imwrite(frame_filename, frame)
        saved_frames.append(frame_filename)
    frame_count += 1

cap.release()

# Check if at least 30 frames were extracted
if len(saved_frames) == 0:
    raise ValueError("⚠️ No frames were extracted from the video. Please check the input video.")

# Function to call Face++ API to get face_token 
def get_face_token(image_path):
    detect_url = "https://api-us.faceplusplus.com/facepp/v3/detect"

    payload_detect = {
        'api_key':      API_KEY,
        'api_secret':   API_SECRET,
        'return_attributes': 'none'
    }

    with open(image_path, 'rb') as image_file:
        response_detect = requests.post(detect_url, data=payload_detect, files={'image_file': image_file})

    detect_data = response_detect.json()

    faces = detect_data.get('faces', [])
    if len(faces) == 0:
        print(f"⚠️ No face detected in {image_path}")
        return None

    return faces[0]['face_token']

# Function to analyze facial attributes using Face++ API
def analyze_face(face_token):
    analyze_url = "https://api-us.faceplusplus.com/facepp/v3/face/analyze"

    payload_analyze = {
        'api_key':      API_KEY,
        'api_secret':   API_SECRET,
        'face_tokens':  face_token,
        'return_attributes': "emotion,smiling,headpose,blur,eyestatus,skinstatus"
    }

    response_analyze = requests.post(analyze_url, data=payload_analyze)
    analyze_data = response_analyze.json()

    if 'faces' not in analyze_data or len(analyze_data['faces']) == 0:
        return None

    attributes = analyze_data['faces'][0]['attributes']

    # Compute depression prediction score based on attribute weights
    score = 0

    # Facial emotion analysis
    emotion = attributes["emotion"]
    score += weights["emotion"] * (
        emotion_weights["sadness"] * (emotion["sadness"] / 100) +
        emotion_weights["fear"] * (emotion["fear"] / 100) +
        emotion_weights["neutral"] * (emotion["neutral"] / 100) +
        emotion_weights["happiness"] * (emotion["happiness"] / 100)
    )

    # Smile intensity
    smile_value = attributes["smile"]["value"] / 100
    score += weights["smile"] * (1 - smile_value)   # Depressed individuals smile less

    # Eye status
    eye_status = attributes["eyestatus"]
    score += weights["eye_status"] * (
        eye_status_weights["no_glass_eye_close"] * (eye_status["left_eye_status"]["no_glass_eye_close"] / 100) +
        eye_status_weights["no_glass_eye_close"] * (eye_status["right_eye_status"]["no_glass_eye_close"] / 100)
    )

    # Head position
    headpose = attributes["headpose"]
    score += weights["headpose"] * (
        headpose_weights["pitch"] * abs(headpose["pitch_angle"] / 180) +
        headpose_weights["yaw"] * abs(headpose["yaw_angle"] / 180)
    )

    # Skin condition
    skinstatus = attributes["skinstatus"]
    score += weights["skinstatus"] * (
        skinstatus_weights["dark_circle"] * (skinstatus["dark_circle"] / 100)
    )

    # Blur detection
    blur = attributes["blur"]["blurness"]["value"] / 100
    score += weights["blur"] * blur

    # Normalize score between 0 and 1
    normalized_score = max(0, min(score, 1))  # Clamp score within [0,1]
    
    return normalized_score

# Analyze 30 extracted frames 
scores = []
for frame in saved_frames:
    face_token = get_face_token(frame)
    if face_token:
        score = analyze_face(face_token)
        scores.append(score)
    else:
        scores.append(0.0)  # Thêm giá trị 0 nếu không phát hiện khuôn mặt

# Missing data handling  
for i in range(len(scores)):
    if scores[i] == 0.0:
        scores[i] = np.median(scores)

# Extract the 10 largest values
scores_sorted = sorted(scores, reverse=True)
ten_score_max = [scores_sorted[i] for i in range(int(len(scores) // 3))]

# Compute the final average depression score
final_score = np.mean(ten_score_max)

df = pd.DataFrame({"Frame": [f"frame_{i}" for i in range(len(scores))], "Score": scores})
df.loc[len(df)] = ["Final Score", final_score]
df.to_csv(SCORE_OUTPUT_FILE, index=False)

print(f"✅ Analysis completed! Depression score based on FACIAL features: {(final_score * 100):.4f} %")
