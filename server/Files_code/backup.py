import os
import shutil
from datetime import datetime
import zipfile

# 📁 Danh sách thư mục nguồn cần sao lưu
source_folders = [
    r"File_video",
    r"File_audio",
    r"Infomation"
]

# 📁 Thư mục chứa các bản sao lưu
backup_root = r"Backup"
os.makedirs(backup_root, exist_ok=True)

# 🕒 Tạo tên thư mục theo ngày-giờ
timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
dst_folder = os.path.join(backup_root, timestamp)
os.makedirs(dst_folder, exist_ok=True)

# 📝 Log setup
log_file_path = os.path.join(dst_folder, "log_file.txt")
log_lines = []
start_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
log_lines.append(f"[{start_time}] 🚀 Bắt đầu backup vào '{dst_folder}'")

# 📥 Sao chép từng thư mục trong danh sách
try:
    for src_folder in source_folders:
        if not os.path.exists(src_folder):
            log_lines.append(f"⚠️ Bỏ qua: không tồn tại '{src_folder}'")
            continue

        folder_name = os.path.basename(src_folder.rstrip("\\/"))
        dst_subfolder = os.path.join(dst_folder, folder_name)

        shutil.copytree(src_folder, dst_subfolder)
        log_lines.append(f"📁 Sao chép thư mục: {folder_name}")

    log_lines.append("✅ Đã sao lưu tất cả thư mục.")

except Exception as e:
    log_lines.append(f"❌ Lỗi khi sao lưu: {e}")

# 📦 Nén toàn bộ vào backup.zip (trừ chính nó)
try:
    zip_path = os.path.join(dst_folder, "backup.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dst_folder):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, dst_folder)
                if rel_path != "backup.zip":
                    zipf.write(full_path, arcname=rel_path)
    log_lines.append(f"🗜️ Đã nén backup.zip tại: {zip_path}")
except Exception as e:
    log_lines.append(f"❌ Lỗi khi nén: {e}")

# 🖊️ Ghi log ra file
with open(log_file_path, "a", encoding="utf-8") as log_file:
    for line in log_lines:
        log_file.write(line + "\n")

# 🧹 Giữ lại 10 bản backup gần nhất
try:
    backup_folders = [
        f for f in os.listdir(backup_root)
        if os.path.isdir(os.path.join(backup_root, f))
    ]
    backup_folders.sort()
    while len(backup_folders) > 10:
        oldest = backup_folders.pop(0)
        path_to_delete = os.path.join(backup_root, oldest)
        shutil.rmtree(path_to_delete)
        with open(log_file_path, "a", encoding="utf-8") as log_file:
            log_file.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 🗑️ Đã xóa bản backup cũ: {oldest}\n")
except Exception as e:
    with open(log_file_path, "a", encoding="utf-8") as log_file:
        log_file.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ❗ Lỗi khi xóa backup cũ: {e}\n")

print("✅ Hoàn tất backup nhiều thư mục và tạo file zip")
