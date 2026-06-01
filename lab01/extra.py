import pandas as pd
import sweetviz as sv

# 1. Nạp dữ liệu chuẩn
file_path = r"marketing_campaign.csv"
df = pd.read_csv(file_path, sep=None, engine='python')

# 2. Sinh báo cáo tự động bằng SweetViz (Phần 4 của Lab 1)
print("[INFO] Đang chạy SweetViz phân tích tự động...")
report = sv.analyze(df)

# 3. Xuất file báo cáo HTML để nộp bài
report.show_html("Marketing_EDA_Report.html")
print("[SUCCESS] Báo cáo đã được xuất ra file 'Marketing_EDA_Report.html'. Mở file này bằng trình duyệt để xem!")