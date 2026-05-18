from fastapi import FastAPI, Query
from services import get_data_from_sheets
from engine import AgroFinancialEngine
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Green Agri-Tech Intelligence Backend",
    description="Hệ thống Backend phân tích tài chính đầu tư vật tư nông nghiệp công nghệ cao - UEH Research Project",
    version="3.0"
)

@app.get("/")
def root():
    return {"status": "Online", "project": "Agri-Tech Backend System"}

@app.get("/api/v1/analysis")
def get_project_analysis(
    discount_rate: float = Query(0.10, description="Tỷ suất chiết khấu tài chính (ví dụ: 0.10 cho 10%)"),
    years: int = Query(5, description="Số năm dự phóng dòng tiền dự án")
):
    try:
        # 1. Gọi service bốc dữ liệu realtime từ Google Sheets về
        df = get_data_from_sheets()
        
        # 2. Đẩy dữ liệu vào lõi xử lý Engine Chuyên Gia
        engine = AgroFinancialEngine(df)
        
        # 3. Tính toán các chỉ số
        inventory_data = engine.analyze_inventory()
        financial_data = engine.calculate_investment_metrics(discount_rate, years)
        
        # 4. Trả kết quả JSON sạch ra cho Client/Dashboard
        return {
            "success": True,
            "inventory_analysis": inventory_data,
            "financial_investment_evaluation": financial_data
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
    
# Thêm cấu hình CORS để Next.js gọi được API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Cổng mặc định của Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)