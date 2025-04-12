import os
import shutil

def delete_file(path_folder):
    folder_path = path_folder # 👉 Thư mục cha cần làm sạch

    # Lặp qua tất cả item trong thư mục
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.remove(file_path)  # Xóa file hoặc symbolic link
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)  # Xóa folder con
        except Exception as e:
            print(f"❗ Không thể xóa {file_path}: {e}")

    print("✅ Đã xóa toàn bộ nội dung trong thư mục.")


delete_file("File_audio")
delete_file("File_video")
delete_file("Infomation")
