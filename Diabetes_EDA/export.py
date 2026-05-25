# Thêm đoạn này vào file extra.py để xuất báo cáo đẹp nộp thầy
from ydata_profiling import ProfileReport

# Tạo báo cáo
profile = ProfileReport(marketing_data, title="Marketing Campaign EDA Report")
profile.to_file("Lab1_Marketing_Report.html")