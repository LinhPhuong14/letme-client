import sys
import os

# Thêm đường dẫn thư mục cha (tầng 1) vào sys.path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from utils import *
from define import merge_audio_video

# import voice

# print(voice.final_score)
df = pd.read_csv(r"Infomation/score_frame_visual.csv")
score = df["Score_voice_visual"] 

def get_dynamic_text(frame_number, fps, score):
    """Tạo text động theo frame và thời gian thực"""
    timestamp = frame_number / fps
    return f"depression score  {(score * 100):.5}%"

# Khởi tạo MediaPipe Face Detection
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# Define directories
name_audio = os.listdir("File_audio")
audio_path = os.path.join("File_audio", name_audio[0])

name_video = os.listdir("File_video")
input_path = os.path.join("File_video", name_video[0])

output_path = r"Infomation/final_output.mp4"

# Khởi tạo video capture
cap = cv2.VideoCapture(input_path)
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))


# Khởi tạo Video Writer
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

frame_count = 0
i = 0
time_past = 0

with mp_face_detection.FaceDetection(
    model_selection=1,       # 0 cho ngắn distance, 1 cho long distance
    min_detection_confidence=0.7
) as face_detection:
    
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        # Chuyển BGR sang RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_detection.process(image)

        # Vẽ bounding box và text
        if results.detections:
            for detection in results.detections:
                # Lấy tọa độ bounding box
                bboxC = detection.location_data.relative_bounding_box
                ih, iw, _ = frame.shape
                x, y, w, h = int(bboxC.xmin * iw), int(bboxC.ymin * ih), \
                            int(bboxC.width * iw), int(bboxC.height * ih)
                
                # Vẽ bounding box tùy chỉnh
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                
                # Tạo text động
                text = get_dynamic_text(frame_count, fps, score[i])
                text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 1)[0]
                
                timestamp = frame_count / fps

                if ((timestamp - time_past) > 2) and (timestamp < 60):
                    i += 1
                    time_past = timestamp
                         
                # Tính toán vị trí text
                text_y = y - 10 if y > 20 else y + 20
                
                # Vẽ nền text
                cv2.rectangle(frame, (x, text_y - text_size[1]), 
                            (x + text_size[0], text_y), (0, 255, 0), -1)
                
                # Vẽ text
                cv2.putText(frame, text, (x, text_y),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 1)

        # Ghi và hiển thị frame
        out.write(frame)
        cv2.imshow('MediaPipe Face Detection', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
        frame_count += 1

cap.release()
out.release()
cv2.destroyAllWindows()


merge_audio_video(
   input_video_path = r"Infomation/final_output.mp4",
    input_audio_path = audio_path,
    output_video_path = r"Infomation/final_output_have_voice.mp4"
)

print(f"Final video have been done and saved to {output_path}")