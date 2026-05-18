from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from services import get_data_from_sheets
from engine import AgroFinancialEngine

# 1. Khởi tạo App với đầy đủ Metadata cho UEH Research Project
app = FastAPI(
    title="Green Agri-Tech Intelligence Backend",
    description="Hệ thống Backend phân tích tài chính đầu tư vật tư nông nghiệp công nghệ cao - UEH Research Project",
    version="3.0"
)

# 2. Định nghĩa danh sách các Origins được phép truy cập (CORS)
origins = [
    "https://agri-intelligence-dashboard.pages.dev",  # Production trên Cloudflare
    "http://localhost:3000",                          # Localhost Next.js (Cổng mặc định)
    "http://127.0.0.1:3000",                          # Localhost IP biến thể
]

# 3. Thêm Middleware CORS vào hệ thống (Chỉ khai báo DUY NHẤT một lần)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Cho phép các domain trong danh sách bốc dữ liệu
    allow_credentials=True,
    allow_methods=["*"],            # Cho phép tất cả các phương thức: GET, POST, OPTIONS,...
    allow_headers=["*"],            # Cho phép mọi Headers truyền lên
)

# 4. Router kiểm tra trạng thái hệ thống
@app.get("/")
def root():
    return {"status": "Online", "project": "Agri-Tech Backend System"}

# 5. API Core xử lý tính toán Empirical Data tài chính thực tế
@app.get("/api/v1/analysis")
def get_project_analysis(
    discount_rate: float = Query(0.10, description="Tỷ suất chiết khấu tài chính (ví dụ: 0.10 cho 10%)"),
    years: int = Query(5, description="Số năm dự phóng dòng tiền dự án")
):
    try:
        # Step 1: Gọi service bốc dữ liệu realtime từ Google Sheets về
        df = get_data_from_sheets()
        
        # Step 2: Đẩy dữ liệu vào lõi xử lý Engine Chuyên Gia
        engine = AgroFinancialEngine(df)
        
        # Step 3: Tính toán các chỉ số kinh tế chuyên sâu
        inventory_data = engine.analyze_inventory()
        financial_data = engine.calculate_investment_metrics(discount_rate, years)
        
        # Step 4: Trả kết quả JSON sạch ra cho Client/Dashboard Cloudflare
        return {
            "success": True,
            "inventory_analysis": inventory_data,
            "financial_investment_evaluation": financial_data
        }
    except Exception as e:
        return {
            "success": False, 
            "error": str(e)
        }