from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Multi-Tenant EDA Analytics System v3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khai báo đường dẫn tuyệt đối chuẩn xác trên máy của bạn
DIABETES_PATH = r"D:\UEH\Phan_Tich_Du_An_Nang_Cao\Diabetes_EDA\diabetes.csv"
RED_WINE_PATH = r"D:\UEH\Phan_Tich_Du_An_Nang_Cao\Diabetes_EDA\wine\winequality-red.csv"
WHITE_WINE_PATH = r"D:\UEH\Phan_Tich_Du_An_Nang_Cao\Diabetes_EDA\wine\winequality-white.csv"

# IMPORT ĐÚNG TÊN CLASS: Gọi WineEngine thay vì RedWineEngine
from engine import DiabetesEngine
from engine_wine import WineEngine

try:
    diabetes_engine = DiabetesEngine(DIABETES_PATH)
    print("[SYSTEM] Nạp thành công lõi Diabetes Engine.")
except Exception as e:
    print(f"[SYSTEM ERROR] Lỗi khởi tạo Diabetes Engine: {e}")
    diabetes_engine = None

try:
    wine_engine = WineEngine(red_path=RED_WINE_PATH, white_path=WHITE_WINE_PATH)
    print("[SYSTEM] Nạp thành công lõi Wine Engine.")
except Exception as e:
    print(f"[SYSTEM ERROR] Lỗi khởi tạo Wine Engine: {e}")
    wine_engine = None

@app.get("/status")
def get_status():
    return {
        "status": "Online", 
        "diabetes_loaded": diabetes_engine is not None,
        "wine_loaded": wine_engine is not None
    }

# --- ENDPOINTS CHO TIỂU ĐƯỜNG (DIABETES) ---
@app.get("/api/kpis")
def get_kpis():
    return diabetes_engine.get_dashboard_kpis() if diabetes_engine else {}

@app.get("/api/chart/bivariate")
def get_bivariate():
    return diabetes_engine.get_bivariate_analysis() if diabetes_engine else []

@app.get("/api/chart/age-distribution")
def get_age_dist():
    return diabetes_engine.get_age_distribution_data() if diabetes_engine else []

@app.get("/api/statistics")
def get_statistics():
    return diabetes_engine.get_summary_statistics() if diabetes_engine else {}

# --- ENDPOINTS CHO RƯỢU (WINE) ---
@app.get("/api/wine/kpis")
def get_wine_kpis():
    return wine_engine.get_wine_kpis() if wine_engine else {}

@app.get("/api/wine/chart/bivariate")
def get_wine_bivariate():
    return wine_engine.get_bivariate_analysis() if wine_engine else []

@app.get("/api/wine/statistics/red")
def get_wine_stat_red():
    return wine_engine.get_summary_statistics(wine_type="red") if wine_engine else {}

@app.get("/api/wine/statistics/white")
def get_wine_stat_white():
    return wine_engine.get_summary_statistics(wine_type="white") if wine_engine else {}
@app.get("/api/chart/univariate")
def get_univariate(feature: str = "Glucose"):
    return diabetes_engine.get_univariate_distribution(feature) if diabetes_engine else []