# 📊 Phân Tích Dự Án Đầu Tư Nâng Cao

## Thông tin môn học

* **Môn học:** Phân tích Dự án Đầu tư Nâng cao
* **Giảng viên:** TS. Đỗ Như Tài
* **Email:** [dntai@sgu.edu.vn](mailto:dntai@sgu.edu.vn)
* **Website:** https://dntai.github.io

---

## Thông tin sinh viên

* **Họ và tên:** Quách Thành Long
* **MSSV:** 88241020109
* **Trường:** Đại học Kinh tế TP. Hồ Chí Minh (UEH)

---

## Giới thiệu dự án

Dự án được thực hiện trong khuôn khổ môn học **Phân tích Dự án Đầu tư Nâng cao**, tập trung vào việc ứng dụng các kỹ thuật **Exploratory Data Analysis (EDA)**, thống kê mô tả và trực quan hóa dữ liệu nhằm hỗ trợ quá trình đánh giá, phân tích và ra quyết định dựa trên dữ liệu.

Hệ thống cho phép:

* Khám phá và phân tích dữ liệu thực tế.
* Trực quan hóa các đặc trưng và mối quan hệ giữa các biến.
* Hỗ trợ đánh giá xu hướng, rủi ro và tiềm năng của dữ liệu nghiên cứu.
* Tạo báo cáo phân tích phục vụ học tập và nghiên cứu.

---

## Công nghệ sử dụng

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python

### Phân tích dữ liệu

* Pandas
* NumPy
* SciPy
* SweetViz

### Trực quan hóa

* Recharts
* Matplotlib

### Triển khai

* Cloudflare Pages

---

## Cấu trúc dự án

```text
Phan_Tich_Du_An_Nang_Cao/
│
├── app/                  # Giao diện người dùng
├── public/               # Dữ liệu và tài nguyên tĩnh
├── wine/                 # Bộ dữ liệu Wine
├── engine.py             # Xử lý dữ liệu Diabetes
├── engine_wine.py        # Xử lý dữ liệu Wine
├── main.py               # FastAPI API Server
├── export_data.py        # Xuất dữ liệu JSON
└── README.md
```

## Hướng dẫn chạy dự án

### Backend

```bash
python -m uvicorn main:app --reload
```

### Frontend

```bash
pnpm install
pnpm dev
```

Truy cập:

```text
http://localhost:3000
```

---

## Repository

GitHub:

https://github.com/StephenSouth13/Phan_Tich_Du_An_Nang_Cao

---

## Kết quả đạt được

* Thực hiện phân tích dữ liệu khám phá (EDA).
* Xây dựng hệ thống trực quan hóa dữ liệu tương tác.
* Tự động hóa báo cáo thống kê và phân tích dữ liệu.
* Hỗ trợ quá trình đánh giá và ra quyết định dựa trên dữ liệu.

---

## Kết luận

Dự án là sản phẩm học thuật được xây dựng nhằm vận dụng các kiến thức của môn **Phân tích Dự án Đầu tư Nâng cao**, kết hợp giữa phân tích dữ liệu, trực quan hóa và phát triển hệ thống hỗ trợ ra quyết định trên nền tảng web hiện đại.
