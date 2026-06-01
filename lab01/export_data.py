import json
import os
from engine import DiabetesEngine
from engine_wine import WineEngine

# Cấu hình đường dẫn
DIABETES_PATH = r"D:\UEH\Phan_Tich_Du_An_Nang_Cao\Diabetes_EDA\diabetes.csv"
RED_WINE_PATH = r"D:\UEH\Phan_Tich_Du_An_Nang_Cao\Diabetes_EDA\wine\winequality-red.csv"
WHITE_WINE_PATH = r"D:\UEH\Phan_Tich_Du_An_Nang_Cao\Diabetes_EDA\wine\winequality-white.csv"

# Khởi tạo
diabetes_engine = DiabetesEngine(DIABETES_PATH)
wine_engine = WineEngine(red_path=RED_WINE_PATH, white_path=WHITE_WINE_PATH)

# ĐƯỜNG DẪN ĐÚNG LÀ "public/data"
output_dir = "public/data" 
os.makedirs(output_dir, exist_ok=True)

def save_json(data, filename):
    filepath = os.path.join(output_dir, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"[*] Đã xuất: {filepath}")

# Xuất dữ liệu
save_json(diabetes_engine.get_dashboard_kpis(), "diabetes_kpis.json")
save_json(diabetes_engine.get_bivariate_analysis(), "diabetes_bivariate.json")
save_json(diabetes_engine.get_age_distribution_data(), "diabetes_age_dist.json")
save_json(diabetes_engine.get_summary_statistics(), "diabetes_stats.json")
save_json(diabetes_engine.get_univariate_distribution("Glucose"), "diabetes_univariate_glucose.json")
save_json(wine_engine.get_wine_kpis(), "wine_kpis.json")
save_json(wine_engine.get_bivariate_analysis(), "wine_bivariate.json")
save_json(wine_engine.get_summary_statistics(wine_type="red"), "wine_stats_red.json")
save_json(wine_engine.get_summary_statistics(wine_type="white"), "wine_stats_white.json")

print("[SYSTEM] Hoàn tất! Dữ liệu đã sẵn sàng trong public/data/")