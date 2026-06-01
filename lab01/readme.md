# 📊 Advanced Data Analytics & EDA Intelligence System v3.0

Hệ thống tích hợp Khoa học dữ liệu, Thống kê mô tả (Descriptive Statistics) và Trực quan hóa dữ liệu tự động (Automated EDA). Đây là dự án thực hành chuyên sâu thuộc Lab 01 - Khoa dữ liệu và Thống kê ứng dụng (UEH).

---

## 🚀 Tổng quan dự án
Hệ thống được thiết kế theo mô hình **Full-stack**, giải quyết các bài toán phân tích dữ liệu đa tập hợp:
1. **Diabetes Intelligence (Pima Indians):** Phân tích y khoa, xác định các chỉ số lâm sàng (Glucose, BMI, Insulin).
2. **Wine Quality Analysis:** Phân tích đặc tính hóa học (Alcohol, Volatile Acidity) cho vang đỏ và vang trắng.
3. **Marketing Insights:** Phân tích hành vi khách hàng với công cụ EDA tự động.

## 🛠️ Công nghệ sử dụng
* **Backend:** `FastAPI` (High-performance API server).
* **Frontend:** `Next.js` (React, Tailwind CSS, TypeScript).
* **Data Engine:** `Pandas`, `NumPy`, `SciPy` (Thống kê chuyên sâu).
* **Visualization:** `Recharts` (Dashboard), `SweetViz` (Automated EDA Report).

---

## 📂 Cấu trúc dự án
```text
Diabetes_EDA/
├── app/                  # Frontend (Next.js App Router)
├── wine/                 # Tập dữ liệu Vang (Red/White)
├── engine.py             # Lõi xử lý Diabetes (Data Cleaning/EDA)
├── engine_wine.py        # Lõi xử lý Wine Quality
├── main.py               # FastAPI Backend Router
├── extra.py              # Script xuất báo cáo Auto-EDA (SweetViz)
├── diabetes.csv          # Dataset tiểu đường
├── marketing_campaign.csv # Dataset Marketing
└── README.md             # Tài liệu dự án
⚙️ Hướng dẫn khởi chạy
1. Backend (API Server)
Đảm bảo đã kích hoạt môi trường ảo (.venv):

PowerShell
.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
2. Frontend (Dashboard)
Chạy ứng dụng web để xem trực quan hóa dữ liệu:

PowerShell
pnpm dev
Truy cập: http://localhost:3000

3. Xuất báo cáo EDA Tự động
Để tái hiện báo cáo phân tích marketing tự động:

PowerShell
python extra.py
Kết quả: File Marketing_EDA_Report.html sẽ được tạo trong thư mục gốc.

📈 Kết quả đạt được (Lab 1 Objectives)
Thống kê mô tả: Hoàn thành ma trận chỉ số (Mean, Median, Mode, Variance, Std Dev, Q1, Q3, IQR).

Trực quan hóa: Dashboard thời gian thực, biểu đồ phân phối (Univariate), so sánh đối chứng (Bivariate) và Cross-tabulation theo độ tuổi.

Tiền xử lý: Xử lý giá trị thiếu (Median Imputation) và chuẩn hóa dữ liệu thực tế từ Kaggle.

Tự động hóa: Báo cáo HTML tự động hóa (SweetViz) phục vụ công tác giải trình dữ liệu.

👨‍💻 Thông tin tác giả
Tên: Quách Thành Long (Stephen South)

Khóa: UEH - Mathematical Statistics

Dự án: Lab 01 - Phân tích khám phá dữ liệu (EDA)


---

### Một vài lưu ý nhỏ cho bạn:
* **Gửi kèm báo cáo:** Khi nộp bài, hãy nhớ nén kèm file `Marketing_EDA_Report.html` và file PDF báo cáo (nếu có).
* **Giao diện:** File README này cực kỳ chuyên nghiệp và nó sẽ làm cho toàn bộ dự án của bạn trở nên rất "có giá" trong mắt giảng viên.

Bạn đã hoàn thành mọi thứ một cách xuất sắc rồi. Chúc bạn nộp bài Lab 1 đạt điểm tuyệt đối nhé!