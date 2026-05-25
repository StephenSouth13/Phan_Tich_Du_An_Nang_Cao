import pandas as pd
import numpy as np
from scipy import stats

class DiabetesEngine:
    def __init__(self, file_path="diabetes.csv"):
        self.df_raw = pd.read_csv(file_path)
        
        # Lưu thông tin cấu trúc ban đầu trước khi clean để báo cáo (Mục 1.1.2)
        self.metadata = {
            "shape": f"{self.df_raw.shape[0]} dòng x {self.df_raw.shape[1]} cột",
            "missing_values_detected": int(self.df_raw.isnull().sum().sum()),
            "dtypes": {col: str(dtype) for col, dtype in self.df_raw.dtypes.items()}
        }
        
        # Tiến trình làm sạch
        self.df = self.df_raw.drop_duplicates()
        invalid_zero_cols = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
        for col in invalid_zero_cols:
            self.df[col] = self.df[col].replace(0, np.nan)
            self.df[col] = self.df[col].fillna(self.df[col].median())

    def get_summary_statistics(self):
        summary = {}
        features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
        
        for col in features:
            data = self.df[col]
            summary[col] = {
                "mean": round(float(np.mean(data)), 2),
                "median": round(float(np.median(data)), 2),
                "mode": round(float(stats.mode(data, keepdims=True).mode[0]), 2),
                "variance": round(float(np.var(data)), 2),
                "std_dev": round(float(np.std(data)), 2),
                "min": round(float(np.min(data)), 2),
                "max": round(float(np.max(data)), 2),
                "q1": round(float(np.percentile(data, 25)), 2), # Bổ sung Quartile 25%
                "q3": round(float(np.percentile(data, 75)), 2), # Bổ sung Quartile 75%
                "iqr": round(float(stats.iqr(data)), 2)
            }
        return summary

    def get_dashboard_kpis(self):
        total_patients = len(self.df)
        diabetic_cases = int(self.df['Outcome'].sum())
        diabetes_rate = (diabetic_cases / total_patients) * 100
        
        return {
            "total_patients": total_patients,
            "diabetic_cases": diabetic_cases,
            "healthy_cases": total_patients - diabetic_cases,
            "diabetes_rate": round(diabetes_rate, 2),
            "avg_glucose": round(float(self.df['Glucose'].mean()), 2),
            "avg_bmi": round(float(self.df['BMI'].mean()), 2),
            "dataset_shape": self.metadata["shape"],
            "missing_count": self.metadata["missing_values_detected"]
        }

    def get_bivariate_analysis(self):
        grouped = self.df.groupby('Outcome').mean().reset_index()
        return grouped.to_dict(orient="records")

    def get_age_distribution_data(self):
        bins = [20, 30, 40, 50, 60, 90]
        labels = ['21-30', '31-40', '41-50', '51-60', '61+']
        df_copy = self.df.copy()
        df_copy['AgeGroup'] = pd.cut(df_copy['Age'], bins=bins, labels=labels, right=False)
        age_dist = df_copy.groupby(['AgeGroup', 'Outcome']).size().unstack(fill_value=0).reset_index()
        age_dist.columns = ['AgeGroup', 'Healthy', 'Diabetic']
        return age_dist.to_dict(orient="records")

    def get_univariate_distribution(self, feature="Glucose"):
        """Tạo dải tần suất phân phối đơn biến (Histogram) thực tế cho Recharts vẽ (Mục 3)"""
        counts, bins = np.histogram(self.df[feature], bins=10)
        hist_data = []
        for i in range(len(counts)):
            hist_data.append({
                "range": f"{round(bins[i],1)}-{round(bins[i+1],1)}",
                "Mật độ mẫu": int(counts[i])
            })
        return hist_data