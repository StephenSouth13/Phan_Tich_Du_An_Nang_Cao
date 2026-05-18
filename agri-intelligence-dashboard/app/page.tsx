"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { DollarSign, Layers, Activity, TrendingUp, RefreshCw } from "lucide-react";

// Khai báo kiểu dữ liệu cho TypeScript chuẩn chỉnh
interface DashboardData {
  success: boolean;
  inventory_analysis: {
    total_capex_vnd: number;
    allocation_by_category: Record<string, number>;
  };
  financial_investment_evaluation: {
    initial_investment_capex: number;
    projected_cash_flows: number[];
    net_present_value_npv: number;
    roi_percentage: number;
    project_status: string;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [discountRate, setDiscountRate] = useState<number>(0.10);
  const [years, setYears] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm gọi API từ Python FastAPI Backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/analysis?discount_rate=${discountRate}&years=${years}`);
      const json = await res.json();
      if (json.success) setData(json);
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [discountRate, years]);

  if (loading || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white font-mono text-xl">
        <RefreshCw className="mr-3 animate-spin" /> Đang bốc dữ liệu realtime từ Google Sheets...
      </div>
    );
  }

  // Định dạng hiển thị tiền tệ VND
  const formatVND = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  // Chuẩn bị dữ liệu cho Biểu đồ cột (Dòng tiền dự phóng)
  const barChartData = data.financial_investment_evaluation.projected_cash_flows.map((cf, index) => ({
    name: `Năm ${index + 1}`,
    "Dòng tiền": cf,
  }));

  // Chuẩn bị dữ liệu cho Biểu đồ tròn (Cơ cấu vật tư)
  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
  const pieChartData = Object.entries(data.inventory_analysis.allocation_by_category).map(([key, val]) => ({
    name: key,
    value: val,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Green Agri-Tech Intelligence System
          </h1>
          <p className="text-sm text-slate-400 mt-1">Hệ thống phân tích tài chính đầu tư vật tư nông nghiệp công nghệ cao v3.0</p>
        </div>
        
        {/* Bộ điều khiển thông số tài chính */}
        <div className="flex flex-wrap gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 font-semibold">Tỷ suất chiết khấu (r)</label>
            <input 
              type="number" step="0.01" min="0" max="1" 
              value={discountRate} 
              onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
              className="bg-slate-950 border border-slate-700 rounded px-3 py-1 text-emerald-400 focus:outline-none focus:border-emerald-500 w-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 font-semibold">Số năm dự phóng</label>
            <input 
              type="number" min="1" max="10" 
              value={years} 
              onChange={(e) => setYears(parseInt(e.target.value) || 5)}
              className="bg-slate-950 border border-slate-700 rounded px-3 py-1 text-emerald-400 focus:outline-none focus:border-emerald-500 w-24"
            />
          </div>
        </div>
      </div>

      {/* Grid thống kê nhanh (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center mb-4"><span className="text-slate-400 text-sm font-medium">Tổng vốn đầu tư (CapEx)</span><DollarSign className="text-blue-400" size={20} /></div>
          <div className="text-xl font-bold">{formatVND(data.inventory_analysis.total_capex_vnd)}</div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center mb-4"><span className="text-slate-400 text-sm font-medium">Giá trị hiện tại thuần (NPV)</span><TrendingUp className="text-emerald-400" size={20} /></div>
          <div className={`text-xl font-bold ${data.financial_investment_evaluation.net_present_value_npv > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {formatVND(data.financial_investment_evaluation.net_present_value_npv)}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center mb-4"><span className="text-slate-400 text-sm font-medium">Tỷ lệ ROI dự kiến</span><Activity className="text-amber-400" size={20} /></div>
          <div className="text-xl font-bold text-amber-400">{data.financial_investment_evaluation.roi_percentage}%</div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center mb-4"><span className="text-slate-400 text-sm font-medium">Trạng thái Khả thi</span><Layers className="text-purple-400" size={20} /></div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.financial_investment_evaluation.project_status.includes("FEASIBLE") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
            {data.financial_investment_evaluation.project_status}
          </span>
        </div>
      </div>

      {/* Grid Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biểu đồ cột: Dòng tiền */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-slate-300">Dự phóng Dòng tiền thu về (Theo năm)</h3>
          <div className="h-80 w-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={(value: any) => formatVND(value)} contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                <Bar dataKey="Dòng tiền" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ tròn: Cơ cấu hạng mục vật tư */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-slate-300">Cơ cấu Chi phí Danh mục Vật tư</h3>
          <div className="h-80 w-100 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatVND(value)} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}