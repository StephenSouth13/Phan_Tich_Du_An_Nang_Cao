Chào Stephen, đây là **Master Plan (Kế hoạch tổng thể)** và **Action Plan (Kế hoạch hành động)** chi tiết, được thiết kế chuẩn cấu trúc quản trị dự án công nghệ dành riêng cho bài tập lớn môn Phân tích dự án nâng cao tại UEH.

Tài liệu này được định dạng bằng Markdown hoàn chỉnh, không dùng placeholder, dữ liệu giả lập mơ hồ mà đi thẳng vào cấu trúc hệ thống **"Dashboard Quản lý Chi phí và Dự báo Biên Lợi nhuận Nông nghiệp Xanh"** sử dụng kiến trúc **n8n + Python Backend + Next.js Frontend** theo đúng định hướng "Senior Coder / Architect" của bạn.

---

# 📑 MASTER PLAN & ACTION PLAN: GREEN AGRI-INSIGHTS SYSTEM

## I. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

* **Tên dự án:** Hệ thống Giám sát Chi phí và Dự báo Biên Lợi nhuận Nông nghiệp Xanh (Green Agri-Insights)
* **Môn học:** Phân tích dự án nâng cao – UEH University
* **Giảng viên phụ trách:** Thầy Đỗ Như Tài
* **Mục tiêu cốt lõi:** Xây dựng một ứng dụng (App) hoàn chỉnh có khả năng tự động hóa luồng thu thập dữ liệu (ETL qua n8n), xử lý phân tích tài chính đầu tư (Python Backend), phân quyền tương tác thực tế (3 Roles) và trực quan hóa chuyên sâu (Next.js/Tailwind Frontend) nhằm tối ưu hóa chi phí đầu vào và bảo vệ biên lợi nhuận cho chuỗi giá trị nông nghiệp sạch.

---

## II. THIẾT KẾ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE DESIGN)

Hệ thống được thiết kế theo mô hình 3 lớp tách biệt (Decoupled Architecture) nhằm tối ưu hóa hiệu năng và khả năng mở rộng dữ liệu:

```
[Nguồn Dữ Liệu Ngoài] (Giá vật tư, Giá siêu thị, Thời tiết)
       │
       ▼ (HTTP Request / Web Scraping)
┌────────────────────────────────────────────────────────┐
│ 1. TẦNG TỰ ĐỘNG HÓA & ETL (n8n Workflow)              │
│    - Trigger: Cron Job (12:00 AM Daily)                │
│    - Extract & Transform: Clean & Parse Data           │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼ (HTTP POST JSON)
┌────────────────────────────────────────────────────────┐
│ 2. TẦNG BACKEND & LƯU TRỮ (Python FastAPI + Supabase)  │
│    - Database: PostgreSQL (Supabase) + RLS Row-Level   │
│    - Analytics Engine: NumPy, Pandas, Scikit-learn     │
│    - Logic: Tính Gross Profit Margin, Biến phí, NPV    │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼ (RESTful API / Auth Token)
┌────────────────────────────────────────────────────────┐
│ 3. TẦNG GIAO DIỆN & TƯƠNG TÁC (Next.js + Tailwind)     │
│    - Role 1: Nông dân (Nhập chi phí, xem Biên LN nội bộ)│
│    - Role 2: Nhà cung cấp (Cập nhật bảng giá vật tư)   │
│    - Role 3: Admin / Nhà đầu tư (Master Dashboard)    │
└────────────────────────────────────────────────────────┘
```

---

## III. THIẾT KẾ LOGIC MA TRẬN DỮ LIỆU (DATABASE SCHEMA)

Để đảm bảo tính toàn vẹn dữ liệu và hỗ trợ phân quyền Row-Level Security (RLS) trên Supabase, hệ thống sử dụng cấu trúc cơ sở dữ liệu quan hệ gồm 4 bảng lõi sau:

### 1. Bảng `users` (Quản lý phân quyền tài khoản)

| **Tên trường (Column)** | **Kiểu dữ liệu** | **Mô tả thuộc tính**                               |
| -------------------------------- | ------------------------- | ------------------------------------------------------------ |
| `user_id`(PK)                  | UUID                      | Khóa chính, định danh duy nhất cho mỗi user            |
| `email`                        | VARCHAR                   | Email đăng nhập của người dùng                        |
| `role`                         | VARCHAR                   | Phân quyền:`'farmer'`,`'supplier'`,`'admin'`         |
| `region`                       | VARCHAR                   | Khu vực địa lý (ví dụ:`'Mekong_Delta'`,`'Da_Lat'`) |

### 2. Bảng `input_material_prices` (Dữ liệu giá vật tư nông nghiệp đầu vào)

| **Tên trường (Column)** | **Kiểu dữ liệu** | **Mô tả thuộc tính**                                          |
| -------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `item_id`(PK)                  | SERIAL                    | Khóa chính tự tăng                                                  |
| `supplier_id`(FK)              | UUID                      | Khóa ngoại liên kết với bảng `users`(Role: supplier)            |
| `category`                     | VARCHAR                   | Phân loại vật tư (`'seed'`,`'organic_fertilizer'`)              |
| `item_name`                    | VARCHAR                   | Tên loại hạt giống/phân bón (Ví dụ:`'Hạt giống lúa ST25'`) |
| `price_per_kg`                 | NUMERIC                   | Giá tiền trên mỗi kg (VND)                                          |
| `updated_at`                   | TIMESTAMP                 | Thời gian cập nhật dữ liệu gần nhất (Từ n8n hoặc Form)         |

### 3. Bảng `market_output_prices` (Dữ liệu giá thu mua/bán lẻ nông sản đầu ra)

| **Tên trường (Column)** | **Kiểu dữ liệu** | **Mô tả thuộc tính**                                                  |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| `market_id`(PK)                | SERIAL                    | Khóa chính tự tăng                                                          |
| `source_name`                  | VARCHAR                   | Nguồn cào dữ liệu (Ví dụ:`'Bach_Hoa_Xanh'`,`'Coop_Mart'`)             |
| `product_name`                 | VARCHAR                   | Tên sản phẩm đầu ra (Ví dụ:`'Gạo sạch ST25'`,`'Cà chua VietGAP'`) |
| `retail_price`                 | NUMERIC                   | Giá bán lẻ trên thị trường (VND/kg)                                      |
| `date_scraped`                 | DATE                      | Ngày hệ thống n8n tự động cào dữ liệu về                              |

### 4. Bảng `farmer_production_costs` (Dữ liệu chi phí vận hành nội bộ của nông dân)

| **Tên trường (Column)** | **Kiểu dữ liệu** | **Mô tả thuộc tính**                             |
| -------------------------------- | ------------------------- | ---------------------------------------------------------- |
| `record_id`(PK)                | SERIAL                    | Khóa chính tự tăng                                     |
| `farmer_id`(FK)                | UUID                      | Khóa ngoại liên kết với bảng `users`(Role: farmer) |
| `crop_type`                    | VARCHAR                   | Loại cây trồng canh tác trong vụ này                 |
| `seed_cost_total`              | NUMERIC                   | Tổng chi phí mua hạt giống thực tế đã chi          |
| `fertilizer_cost_total`        | NUMERIC                   | Tổng chi phí mua phân bón thực tế đã chi           |
| `logistics_cost`               | NUMERIC                   | Chi phí vận chuyển và xăng dầu phát sinh            |
| `expected_yield_kg`            | NUMERIC                   | Sản lượng thu hoạch dự kiến (kg)                     |
| `created_at`                   | TIMESTAMP                 | Ngày nông dân chủ động nhập liệu lên App          |

---

## IV. MA TRẬN PHÂN QUYỀN CHỨC NĂNG (USER ROLES & INTERACTIONS MATRIX)

Hệ thống xử lý phân quyền chặt chẽ bằng Middleware của Next.js kết hợp với Supabase Row-Level Security (RLS) để điều phối hành vi của người dùng:

### 1. Giao diện Người nông dân (Role: `farmer`)

* **Hành động (Write):** Nhập liệu trực tiếp chi phí thực tế phát sinh của trang trại mình vào bảng `farmer_production_costs`.
* **Giao diện hiển thị (Read):**
  * Xem bảng so sánh giá hạt giống của các nhà cung cấp để tối ưu hóa khâu mua sắm (Procurement).
  * Biểu đồ cấu trúc chi phí nội bộ và **Biên lợi nhuận gộp dự kiến (Gross Profit Margin)** được tính toán theo thời gian thực dựa trên công thức tài chính:
    $$
    Gross\ Profit\ Margin = \frac{(Expected\ Yield \times Market\ Price) - Total\ Cost}{(Expected\ Yield \times Market\ Price)} \times 100\%
    $$
* **Bảo mật:** RLS thiết lập chính sách `USING (auth.uid() = farmer_id)`, tuyệt đối không thể xem hoặc can thiệp dữ liệu của trang trại khác.

### 2. Giao diện Nhà cung cấp vật tư (Role: `supplier`)

* **Hành động (Write):** Cập nhật, chỉnh sửa hoặc tải lên (Upload file CSV) bảng báo giá các mặt hàng hạt giống, phân bón hữu cơ của đơn vị mình vào bảng `input_material_prices`.
* **Giao diện hiển thị (Read):** Biểu đồ trực quan hóa xu hướng biến động giá của thị trường chung và thống kê số lượng nông dân quan tâm đến nhóm sản phẩm xanh.

### 3. Giao diện Quản trị viên & Nhà đầu tư (Role: `admin`)

* **Hành động (Write):** Điều chỉnh các tham số vĩ mó, thiết lập ngưỡng rủi ro biến phí (Ví dụ: cấu hình hệ thống tự động bắn cảnh báo qua Telegram khi giá xăng dầu tăng vượt mức 25,000 VND/lít).
* **Giao diện hiển thị (Read):** **Master Dashboard** chứa toàn bộ dữ liệu vĩ mô: Bản đồ phân bố biên lợi nhuận nông nghiệp theo khu vực, bảng giám sát trạng thái hoạt động (Log) của luồng n8n.

---

## V. KẾ HOẠCH HÀNH ĐỘNG CHI TIẾT (ACTION PLAN)

Dự án nhóm được chia làm 4 phân kỳ công tác (Sprints) rõ ràng trong vòng 4 tuần để đảm bảo tiến độ và tính chuyên nghiệp tối đa:

### TUẦN 1: THIẾT KẾ WORKFLOW n8n & CÀO DỮ LIỆU (DATA INGESTION PHASE)

* **Nhiệm vụ 1:** Thiết lập môi trường n8n (Local Docker hoặc Cloud). Tạo Webhook và Scheduled Trigger chạy tự động vào 12h đêm hàng ngày.
* **Nhiệm vụ 2:** Xây dựng Node `HTTP Request` thực hiện bóc tách cấu trúc dữ liệu (Web Scraping) từ các trang web siêu thị lớn để lấy giá nông sản đầu ra, đồng thời cấu hình API kết nối lấy dữ liệu giá xăng dầu/thời tiết vĩ mô.
* **Nhiệm vụ 3:** Tạo cơ sở dữ liệu trên Supabase theo Schema đã thiết kế, kết nối Node đầu ra của n8n để đẩy dữ liệu thô sau khi làm sạch vào Database.

### TUẦN 2: XÂY DỰNG PYTHON BACKEND & MÔ HÌNH DỰ BÁO (ANALYTICS PHASE)

* **Nhiệm vụ 1:** Viết API Backend bằng Python (`FastAPI`) để xử lý các yêu cầu tính toán từ Frontend.
* **Nhiệm vụ 2:** Ứng dụng mã nguồn Python xử lý tính toán các bài toán kinh tế đầu tư: Biên lợi nhuận gộp, điểm hòa vốn (Break-even Point), và mô phỏng kịch bản biến động chi phí (What-If Analysis).
* **Nhiệm vụ 3:** Viết script Python (Sử dụng `Scikit-learn / Linear Regression` đơn giản) để dự báo xu hướng giá hạt giống đầu vào cho 3 tháng tiếp theo dựa trên chuỗi dữ liệu lịch sử.

### TUẦN 3: PHÁT TRIỂN GIAO DIỆN APP FRONTEND (UI & INTERACTION PHASE)

* **Nhiệm vụ 1:** Khởi tạo dự án `Next.js` với `Tailwind CSS`, tích hợp thư viện vẽ biểu đồ chuyên nghiệp `Chart.js` hoặc `Recharts`.
* **Nhiệm vụ 2:** Thiết kế hệ thống Đăng nhập / Phân quyền (Authentication Middleware) kết nối với Supabase Auth để định tuyến chính xác giao diện cho từng Role riêng biệt.
* **Nhiệm vụ 3:** Xây dựng Form nhập liệu chi phí vận hành cho Nông dân và Form cập nhật giá cho Nhà cung cấp; liên kết biểu đồ hiển thị thời gian thực nhận dữ liệu từ Python Backend API.

### TUẦN 4: KIỂM THỬ, ĐÓNG GÓI & VIẾT BÁO CÁO (DEPLOYMENT & REPORT PHASE)

* **Nhiệm vụ 1:** Chạy kiểm thử toàn diện luồng dữ liệu (End-to-End Testing): Giả lập nông dân nhập dữ liệu **$\rightarrow$** kiểm tra tính chính xác của thuật toán Python Backend **$\rightarrow$** kiểm tra độ mượt hiển thị biểu đồ trên Frontend.
* **Nhiệm vụ 2:** Viết báo cáo Word chi tiết nộp thầy Tài, trong đó tập trung phân tích ý nghĩa kinh tế của dự án: Cách hệ thống giúp tối ưu hóa chi phí đầu tư, hỗ trợ giảm thiểu rủi ro thị trường cho nông dân ứng dụng nông nghiệp xanh.
* **Nhiệm vụ 3:** Chuẩn bị Slide thuyết trình, quay video demo luồng chạy tự động của n8n để tạo ấn tượng mạnh mẽ trong buổi bảo vệ dự án nhóm.
