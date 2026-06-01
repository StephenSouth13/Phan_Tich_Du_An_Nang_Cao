import pandas as pd
import numpy as np
from scipy import stats
import os

class WineEngine:
    def __init__(self, red_path, white_path):
        # Khởi tạo hai DataFrame rỗng dự phòng tránh lỗi hệ thống sập gãy luồng API
        self.df_red = pd.DataFrame()
        self.df_white = pd.DataFrame()

        # Đọc file Rượu Đỏ với cơ chế tự động nhận diện ký tự phân tách (sep=None)
        if os.path.exists(red_path):
            try:
                self.df_red = pd.read_csv(red_path, sep=None, engine='python')
                self.df_red = self.df_red.drop_duplicates()
                print(f"[WINE ENGINE] Nạp dữ liệu Rượu đỏ thành công: {self.df_red.shape}")
            except Exception as e:
                print(f"[WINE ENGINE ERROR] Không thể đọc file Red Wine: {e}")
        else:
            print(f"[WINE ENGINE ERROR] Sai đường dẫn file Red Wine: {red_path}")

        # Đọc file Rượu Trắng với cơ chế tự động nhận diện ký tự phân tách (sep=None)
        if os.path.exists(white_path):
            try:
                self.df_white = pd.read_csv(white_path, sep=None, engine='python')
                self.df_white = self.df_white.drop_duplicates()
                print(f"[WINE ENGINE] Nạp dữ liệu Rượu trắng thành công: {self.df_white.shape}")
            except Exception as e:
                print(f"[WINE ENGINE ERROR] Không thể đọc file White Wine: {e}")
        else:
            print(f"[WINE ENGINE ERROR] Sai đường dẫn file White Wine: {white_path}")

    def get_summary_statistics(self, wine_type="red"):
        """Tính toán ma trận thống kê mô tả toàn diện cho từng loại rượu theo yêu cầu Phần 1"""
        df = self.df_red if wine_type == "red" else self.df_white
        if df.empty:
            return {}

        summary = {}
        # Lấy tất cả các cột đặc trưng số học trừ cột nhãn chất lượng (quality)
        features = [col for col in df.columns if col != 'quality']
        
        for col in features:
            data = df[col]
            summary[col] = {
                "mean": round(float(np.mean(data)), 3),
                "median": round(float(np.median(data)), 3),
                "mode": round(float(stats.mode(data, keepdims=True).mode[0]), 3),
                "variance": round(float(np.var(data)), 3),
                "std_dev": round(float(np.std(data)), 3),
                "min": round(float(np.min(data)), 3),
                "max": round(float(np.max(data)), 3),
                "iqr": round(float(stats.iqr(data)), 3)
            }
        return summary

    def get_wine_kpis(self):
        """Tính toán nhanh các chỉ số tổng quan so sánh giữa Red và White phục vụ KPI Cards"""
        red_len = len(self.df_red) if not self.df_red.empty else 0
        white_len = len(self.df_white) if not self.df_white.empty else 0
        
        avg_red_quality = self.df_red['quality'].mean() if not self.df_red.empty else 0
        avg_white_quality = self.df_white['quality'].mean() if not self.df_white.empty else 0

        return {
            "total_red_samples": red_len,
            "total_white_samples": white_len,
            "avg_red_quality": round(float(avg_red_quality), 2),
            "avg_white_quality": round(float(avg_white_quality), 2),
        }

    def get_bivariate_analysis(self):
        """Phân tích hai biến (Mục 1.3): So sánh nồng độ cồn trung bình biến thiên theo điểm Chất lượng"""
        red_group = self.df_red.groupby('quality')['alcohol'].mean().to_dict() if not self.df_red.empty else {}
        white_group = self.df_white.groupby('quality')['alcohol'].mean().to_dict() if not self.df_white.empty else {}
        
        # Tập hợp tất cả các mức điểm chất lượng thực tế xuất hiện trong hệ thống file
        all_qualities = sorted(list(set(list(red_group.keys()) + list(white_group.keys()))))
        
        bivariate_data = []
        for q in all_qualities:
            bivariate_data.append({
                "quality": f"Điểm {q}",
                "Rượu đỏ (Alcohol)": round(float(red_group.get(q, 0)), 2),
                "Rượu trắng (Alcohol)": round(float(white_group.get(q, 0)), 2)
            })
        return bivariate_data