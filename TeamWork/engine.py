import pandas as pd
import numpy as np

class AgroFinancialEngine:
    def __init__(self, dataframe: pd.DataFrame):
        self.df = dataframe

    def analyze_inventory(self):
        """
        Phân hệ 1: Phân tích cơ cấu chi phí vật tư và danh mục đầu tư
        """
        # Giả định mỗi sản phẩm cần nhập một số lượng nhất định cho trang trại
        # Dùng mã ID làm giống cho việc tạo số lượng ngẫu nhiên cố định để tránh dummy data hỗn loạn
        self.df['quantity'] = self.df['original_usd_price'].apply(lambda x: int((x % 10) + 1))
        
        # Tính tổng thành tiền VND cho từng loại vật tư
        self.df['total_value_vnd'] = self.df['retail_vnd_price'] * self.df['quantity']
        
        # Tính tổng vốn đầu tư thiết bị ban đầu (CapEx)
        total_capex = float(self.df['total_value_vnd'].sum())
        
        # Thống kê chi phí theo từng Category
        category_summary = self.df.groupby('category')['total_value_vnd'].sum().to_dict()
        
        return {
            "total_capex_vnd": total_capex,
            "allocation_by_category": category_summary
        }

    def calculate_investment_metrics(self, discount_rate: float = 0.10, years: int = 5):
        """
        Phân hệ 2: Tính toán chỉ số tài chính chuyên sâu NPV cho dự án
        Giả định doanh thu từ trang trại thông minh mang lại tăng trưởng 15% mỗi năm
        """
        summary = self.analyze_inventory()
        initial_investment = summary["total_capex_vnd"]
        
        # Giả định Dòng tiền thu về (Cash Inflows) năm 1 bằng 35% giá trị đầu tư ban đầu, các năm sau tăng trưởng 15%
        cash_flows = []
        base_inflow = initial_investment * 0.35
        
        for t in range(1, years + 1):
            inflow = base_inflow * (1.15 ** (t - 1))
            cash_flows.append(inflow)
            
        # Tính NPV (Net Present Value) sử dụng công thức tài chính tiêu chuẩn
        # NPV = -Initial_Investment + Sum( Cashflow_t / (1 + r)^t )
        npv = -initial_investment
        for t, cf in enumerate(cash_flows, start=1):
            npv += cf / ((1 + discount_rate) ** t)
            
        # Tính tỷ lệ ROI (Return on Investment) cơ bản tổng thể
        total_return = sum(cash_flows)
        roi = (total_return - initial_investment) / initial_investment
        
        return {
            "initial_investment_capex": initial_investment,
            "projected_cash_flows": cash_flows,
            "net_present_value_npv": round(npv, 2),
            "roi_percentage": round(roi * 100, 2),
            "project_status": "FEASIBLE (Đáng đầu tư)" if npv > 0 else "NOT FEASIBLE (Rủi ro cao)"
        }