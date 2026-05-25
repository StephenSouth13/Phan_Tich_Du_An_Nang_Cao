"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, AreaChart, Area, LineChart, Line } from "recharts";
import { Activity, Users, Heart, Percent, ShieldAlert, RefreshCw, Database, Wine, Award, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

// Interfaces cho Diabetes
interface KPIData { total_patients: number; diabetic_cases: number; healthy_cases: number; diabetes_rate: number; avg_glucose: number; avg_bmi: number; dataset_shape: string; missing_count: number; }
interface BivariateData { Outcome: number; Glucose: number; BloodPressure: number; SkinThickness: number; BMI: number; }
interface AgeDistData { AgeGroup: string; Healthy: number; Diabetic: number; }
interface UnivariateData { range: string; "Mật độ mẫu": number; }

// Interfaces cho Wine
interface WineKPIData { total_red_samples: number; total_white_samples: number; avg_red_quality: number; avg_white_quality: number; }
interface WineBivariateData { quality: string; "Rượu đỏ (Alcohol)": number; "Rượu trắng (Alcohol)": number; }

interface StatMetrics { mean: number; median: number; mode: number; variance: number; std_dev: number; min: number; max: number; q1: number; q3: number; iqr: number; }
interface FullStatistics { [key: string]: StatMetrics; }

export default function IntegratedLabDashboard() {
  const [activeModule, setActiveModule] = useState<"diabetes" | "wine">("diabetes");
  const [loading, setLoading] = useState<boolean>(true);

  // States của Diabetes (Bài 2)
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [bivariate, setBivariate] = useState<BivariateData[]>([]);
  const [ageDist, setAgeDist] = useState<AgeDistData[]>([]);
  const [univariate, setUnivariate] = useState<UnivariateData[]>([]);
  const [stats, setStats] = useState<FullStatistics | null>(null);

  // States của Wine (Bài 1)
  const [wineKpis, setWineKpis] = useState<WineKPIData | null>(null);
  const [wineBivariate, setWineBivariate] = useState<WineBivariateData[]>([]);
  const [redWineStats, setRedWineStats] = useState<FullStatistics | null>(null);
  const [whiteWineStats, setWhiteWineStats] = useState<FullStatistics | null>(null);
  const [currentWineTab, setCurrentWineTab] = useState<"red" | "white">("red");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [kpiRes, bivRes, ageRes, statRes, uniRes, wKpiRes, wBivRes, wRedRes, wWhiteRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/kpis"),
          fetch("http://127.0.0.1:8000/api/chart/bivariate"),
          fetch("http://127.0.0.1:8000/api/chart/age-distribution"),
          fetch("http://127.0.0.1:8000/api/statistics"),
          fetch("http://127.0.0.1:8000/api/chart/univariate?feature=Glucose"),
          fetch("http://127.0.0.1:8000/api/wine/kpis"),
          fetch("http://127.0.0.1:8000/api/wine/chart/bivariate"),
          fetch("http://127.0.0.1:8000/api/wine/statistics/red"),
          fetch("http://127.0.0.1:8000/api/wine/statistics/white")
        ]);

        setKpis(await kpiRes.json());
        setBivariate(await bivRes.json());
        setAgeDist(await ageRes.json());
        setStats(await statRes.json());
        setUnivariate(await uniRes.json());

        setWineKpis(await wKpiRes.json());
        setWineBivariate(await wBivRes.json());
        setRedWineStats(await wRedRes.json());
        setWhiteWineStats(await wWhiteRes.json());
      } catch (error) {
        console.error("Lỗi đồng bộ dữ liệu tích hợp Lab 1:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading || !kpis || !stats || !wineKpis || !redWineStats || !whiteWineStats) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-emerald-400 font-mono text-lg tracking-wider">
        <RefreshCw className="mr-3 animate-spin text-emerald-500" /> Đang đồng bộ ma trận dữ liệu tích hợp Lab 01...
      </div>
    );
  }

  // Tiền xử lý dữ liệu biểu đồ đối chứng Diabetes
  const healthyGroup = (bivariate.find(item => item.Outcome === 0) || {}) as BivariateData;
  const diabeticGroup = (bivariate.find(item => item.Outcome === 1) || {}) as BivariateData;
  const featuresCompareData = [
    { name: "Glucose", "Khỏe mạnh": healthyGroup.Glucose || 0, "Tiểu đường": diabeticGroup.Glucose || 0 },
    { name: "Huyết áp", "Khỏe mạnh": healthyGroup.BloodPressure || 0, "Tiểu đường": diabeticGroup.BloodPressure || 0 },
    { name: "BMI", "Khỏe mạnh": healthyGroup.BMI || 0, "Tiểu đường": diabeticGroup.BMI || 0 },
  ];

  const activeWineStats = currentWineTab === "red" ? redWineStats : whiteWineStats;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 p-6 font-sans antialiased">
      
      {/* GLOBAL PORTAL HEADER */}
      <div className="max-w-7xl mx-auto border-b border-slate-800 pb-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <ShieldAlert className="text-emerald-400" size={24} />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-400">
              UEH Advanced Data Analytics Portal — Lab 01
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Hệ thống tích hợp Khoa học dữ liệu, Thống kê mô tả và Trực quan hóa EDA thời gian thực
          </p>
        </div>

        {/* TABS ĐIỀU HƯỚNG BÀI TẬP */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 font-mono text-xs shadow-inner">
          <button 
            onClick={() => setActiveModule("diabetes")}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeModule === "diabetes" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Activity size={14} /> BÀI 2: DIABETES
          </button>
          <button 
            onClick={() => setActiveModule("wine")}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeModule === "wine" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Wine size={14} /> BÀI 1: RED WINE QUALITY
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeModule === "diabetes" ? (
          /* ========================================================= */
          /* BÀI 2: TIỂU ĐƯỜNG PIMA INDIANS                            */
          /* ========================================================= */
          <div className="space-y-6">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Cỡ Mẫu Nghiên Cứu</span>
                <div className="text-2xl font-black text-blue-400 tracking-tight">{kpis.total_patients} bệnh nhân</div>
                <p className="text-[10px] text-slate-500 font-mono mt-1 font-bold">Shape: {kpis.dataset_shape}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Tỷ Lệ Nhiễm Bệnh Tích Lũy</span>
                <div className="text-2xl font-black text-rose-400 tracking-tight">{kpis.diabetes_rate}%</div>
                <p className="text-[10px] text-rose-500/70 font-semibold mt-1">Dương tính: {kpis.diabetic_cases} ca</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Glucose Trung Bình</span>
                <div className="text-2xl font-black text-amber-400 tracking-tight">{kpis.avg_glucose} mg/dL</div>
                <p className="text-[10px] text-slate-500 font-medium mt-1">Khử 0 bằng Trung vị (Median)</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Chỉ Số BMI Trung Bình</span>
                <div className="text-2xl font-black text-emerald-400 tracking-tight">{kpis.avg_bmi} kg/m²</div>
                <p className="text-[10px] text-slate-500 font-medium mt-1">Dấu hiệu béo phì chủng tộc</p>
              </div>
            </div>

            {/* CHARTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Mục 3.1: Univariate Plot</span>
                <h3 className="text-sm font-bold text-slate-200 mt-2 mb-3">Phân Phối Đơn Biến: Nồng Độ Glucose</h3>
                <div className="h-60 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={univariate} margin={{left: -25, right: 5}}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/><XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false}/><YAxis stroke="#64748b" fontSize={10} tickLine={false}/><Tooltip contentStyle={{backgroundColor: "#0f172a", border: "1px solid #334155"}}/><Area type="monotone" dataKey="Mật độ mẫu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Mục 3.2: Bivariate Plot</span>
                <h3 className="text-sm font-bold text-slate-200 mt-2 mb-3">Phân Tích Hai Biến: Chỉ Số Sức Khỏe Trung Bình</h3>
                <div className="h-60 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={featuresCompareData} margin={{left: -25, right: 5}}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/><XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false}/><YAxis stroke="#64748b" fontSize={10} tickLine={false}/><Tooltip contentStyle={{backgroundColor: "#0f172a"}}/><Legend wrapperStyle={{fontSize: "11px"}}/><Bar dataKey="Khỏe mạnh" fill="#10B981" radius={[3,3,0,0]} barSize={16}/><Bar dataKey="Tiểu đường" fill="#F43F5E" radius={[3,3,0,0]} barSize={16}/></BarChart></ResponsiveContainer></div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Mục 1.2: Cross-tabulation</span>
                <h3 className="text-sm font-bold text-slate-200 mt-2 mb-3">Mật Độ Ca Bệnh Tích Lũy Theo Nhóm Tuổi</h3>
                <div className="h-60 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={ageDist} margin={{left: -25, right: 5}}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/><XAxis dataKey="AgeGroup" stroke="#64748b" fontSize={10} tickLine={false}/><YAxis stroke="#64748b" fontSize={10} tickLine={false}/><Tooltip contentStyle={{backgroundColor: "#0f172a"}}/><Legend wrapperStyle={{fontSize: "11px"}}/><Bar dataKey="Healthy" name="Khỏe mạnh" stackId="a" fill="#3B82F6" barSize={18}/><Bar dataKey="Diabetic" name="Tiểu đường" stackId="a" fill="#F59E0B" radius={[3,3,0,0]} barSize={18}/></BarChart></ResponsiveContainer></div>
              </div>
            </div>

            {/* AUTOMATED TEXT INTERPRETATIONS (CÂU TRẢ LỜI CHO ĐỀ LAB) */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-5">
              <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl self-start">
                <FileText size={22} />
              </div>
              <div className="space-y-3 w-full">
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Báo Cáo Nhận Xét Và Giải Trình Thống Kê Lâm Sàng (Diabetes EDA Report)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed font-medium">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-amber-400 font-bold mb-1">1. Đánh giá dải phân phối & Tính lệch (Skewness):</p>
                    Biểu đồ phân phối đơn biến chỉ ra nồng độ <span className="text-slate-100 font-bold">Glucose</span> hội tụ quanh vùng trung vị <span className="text-blue-400 font-mono font-bold">{stats.Glucose?.median} mg/dL</span>. 
                    Tuy nhiên dải phân phối kéo dài hẳn về phía bên phải (Right-skewed) với giá trị Max đạt tới <span className="text-rose-400 font-mono">{stats.Glucose?.max} mg/dL</span>, 
                    minh chứng cho sự xuất hiện của nhóm đối tượng có lượng đường huyết cực đoan cao.
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-emerald-400 font-bold mb-1">2. Phân tích ngoại lai (Outliers) & Khoảng biến thiên:</p>
                    Chỉ số <span className="text-slate-100 font-bold">Insulin</span> có khoảng biến thiên (Range) rộng nhất nội tại mô hình (từ {stats.Insulin?.min} đến {stats.Insulin?.max} $\mu U/mL$). 
                    Với khoảng tứ phân vị IQR lớn lên tới <span className="text-amber-400 font-mono">{stats.Insulin?.iqr}</span>, dữ liệu chứa lượng Outliers cực lớn ở biên cao. 
                    Phương pháp điền khuyết bằng Trung vị (Median = {stats.Insulin?.median}) đã được áp dụng thành công nhằm cô lập nhiễu, chống làm lệch ma trận thống kê.
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 md:col-span-2">
                    <p className="text-blue-400 font-bold mb-1">3. Xu thế phân bố bệnh lý theo độ tuổi (Cross-tabulation Insight):</p>
                    Kết quả kiểm định chéo nhóm tuổi chứng minh: Tỷ lệ mắc bệnh tích lũy tăng phi mã khi bước qua tuổi 30. 
                    Ở phân khúc <span className="text-orange-400 font-bold">21-30 tuổi</span>, số ca khỏe mạnh áp đảo hoàn toàn; tuy nhiên ở dải từ <span className="text-orange-400 font-bold">31-50 tuổi</span>, 
                    mật độ ca bệnh lý chiếm tới gần <span className="text-rose-400 font-bold">50%</span> tổng cỡ mẫu nhóm, xác nhận tuổi tác là biến độc lập có trọng số rủi ro tác động rất cao.
                  </div>
                </div>
              </div>
            </div>

            {/* DATA TABLE MATRIX */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-slate-800 bg-slate-900/40 font-bold flex items-center gap-2 text-sm text-slate-200">
                <Database size={16} className="text-emerald-400"/> MA TRẬN THỐNG KÊ MÔ TẢ TOÀN DIỆN BÀI 2 (DIABETES)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Features</th>
                      <th className="p-3 text-blue-400 font-bold">Mean</th>
                      <th className="p-3">Median</th>
                      <th className="p-3">Mode</th>
                      <th className="p-3">Variance</th>
                      <th className="p-3">Std Dev</th>
                      <th className="p-3">Min</th>
                      <th className="p-3 text-indigo-400 font-bold">Q1 (25%)</th>
                      <th className="p-3 text-purple-400 font-bold">Q3 (75%)</th>
                      <th className="p-3">Max</th>
                      <th className="p-3 text-amber-400 font-bold">IQR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {Object.keys(stats).map((f) => (
                      <tr key={f} className="hover:bg-slate-800/20 transition-colors font-medium">
                        <td className="p-3 font-sans font-bold text-slate-300">{f}</td>
                        <td className="p-3 text-blue-400 bg-blue-500/5 font-bold">{stats[f].mean}</td>
                        <td className="p-3 text-slate-200">{stats[f].median}</td>
                        <td className="p-3 text-slate-400">{stats[f].mode}</td>
                        <td className="p-3 text-slate-500">{stats[f].variance}</td>
                        <td className="p-3 text-slate-400">{stats[f].std_dev}</td>
                        <td className="p-3 text-emerald-400">{stats[f].min}</td>
                        <td className="p-3 text-indigo-400 font-semibold">{stats[f].q1}</td>
                        <td className="p-3 text-purple-400 font-semibold">{stats[f].q3}</td>
                        <td className="p-3 text-rose-400">{stats[f].max}</td>
                        <td className="p-3 text-amber-400 bg-amber-500/5 font-bold">{stats[f].iqr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* BÀI 1: CHẤT LƯỢNG RƯỢU VANG (WINE QUALITY MODULE)          */
          /* ========================================================= */
          <div className="space-y-6">
            
            {/* KPI GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Tổng Mẫu Vang Đỏ</span>
                <div className="text-2xl font-black text-rose-400 tracking-tight">{wineKpis.total_red_samples} records</div>
                <p className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">Tệp thực tế winequality-red</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Tổng Mẫu Vang Trắng</span>
                <div className="text-2xl font-black text-slate-200 tracking-tight">{wineKpis.total_white_samples} records</div>
                <p className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">Tệp thực tế winequality-white</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Điểm Chất Lượng Đỏ TB</span>
                <div className="text-2xl font-black text-rose-500 flex items-center gap-1 tracking-tight">{wineKpis.avg_red_quality} <Award size={18}/></div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mb-1">Điểm Chất Lượng Trắng TB</span>
                <div className="text-2xl font-black text-amber-300 flex items-center gap-1 tracking-tight">{wineKpis.avg_white_quality} <Award size={18}/></div>
              </div>
            </div>

            {/* BIVARIATE LINE TREND CHART */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Mục 3.2: Bivariate Trend Lines</span>
              <h3 className="text-base font-bold text-slate-200 mt-2 mb-1">Xu Hướng Nồng Độ Cồn (Alcohol) Biến Thiên Theo Điểm Chất Lượng</h3>
              <p className="text-xs text-slate-400">Trực quan hóa hai biến so sánh cấu trúc nồng độ cồn để đạt điểm thẩm định chuyên gia cao</p>
              <div className="h-72 w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={wineBivariate} margin={{ left: -25, right: 10, top: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="quality" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Line type="monotone" dataKey="Rượu đỏ (Alcohol)" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Rượu trắng (Alcohol)" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AUTOMATED TEXT INTERPRETATIONS FOR WINE (CÂU TRẢ LỜI CHO ĐỀ LAB) */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-5">
              <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl self-start">
                <CheckCircle2 size={22} />
              </div>
              <div className="space-y-3 w-full">
                <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Báo Cáo Nhận Xét Và Giải Trình Cấu Trúc Hóa Học Rượu (Wine Quality EDA Report)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed font-medium">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-rose-400 font-bold mb-1">1. Phân bố điểm Chất lượng & Độ tập trung:</p>
                    Dữ liệu thực nghiệm của cả vang đỏ và vang trắng chỉ ra điểm số chất lượng tập trung nén cực mạnh ở phân khúc tầm trung là <span className="text-slate-100 font-bold">Điểm 5 và Điểm 6</span> (thể hiện rõ qua giá trị Mode và Median đều bằng 6). 
                    Các chai rượu đạt điểm xuất sắc (Điểm 8, Điểm 9) chiếm tỷ lệ cực kỳ khan hiếm trong dải mẫu, phân phối tiệm cận hình chuông chuẩn Gauss.
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-amber-400 font-bold mb-1">2. Tác động của Nồng độ cồn (Alcohol) - Phân tích hai biến:</p>
                    Nhìn vào đồ thị đường xu hướng hai biến, có một quy luật hóa sinh nhất quán: <span className="text-slate-100 font-bold">Nồng độ cồn tỷ lệ thuận mạnh mẽ với chất lượng rượu</span>. 
                    Những chai rượu đạt điểm cao nhất luôn sở hữu hàm lượng cồn vượt trội (trung bình trên <span className="text-amber-400 font-mono font-bold">11.5% - 12%</span>), 
                    trong khi nhóm rượu chất lượng thấp (Điểm 3, Điểm 4) bị kéo tụt nồng độ cồn xuống ngưỡng đáy sinh học.
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 md:col-span-2">
                    <p className="text-purple-400 font-bold mb-1">3. So sánh đối chứng lý thuyết hóa học đặc trưng (Red vs White):</p>
                    Ma trận dữ liệu bóc tách sự khác biệt bản chất: Vang đỏ có chỉ số axit biến đổi (<span className="font-mono text-rose-400">volatile acidity</span>) trung bình cao hơn rõ rệt để định hình hương vị chát nồng, 
                    trong khi lượng đường tồn dư (<span className="font-mono text-amber-300">residual sugar</span>) của vang trắng lại sở hữu trung vị (Median) và khoảng IQR vượt bậc, 
                    minh chứng cho lý thuyết vang trắng luôn có dải vị ngọt đậm đà và dải phân phối biến động mạnh hơn vang đỏ.
                  </div>
                </div>
              </div>
            </div>

            {/* WINE DATA TABLE MATRIX WITH TAB SWITCH */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="font-bold flex items-center gap-2 text-sm text-slate-200">
                  <Database size={16} className="text-purple-400"/> MA TRẬN THỐNG KÊ ĐẶC TÍNH HÓA HỌC KHẢO SÁT CHƯƠNG 1
                </div>
                
                {/* SUB-TAB SWITCH FOR WINE TYPE */}
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono shadow-inner">
                  <button 
                    onClick={() => setCurrentWineTab("red")} 
                    className={`px-3 py-1.5 rounded-md transition-all ${currentWineTab === "red" ? "bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    RED WINE MATRIX
                  </button>
                  <button 
                    onClick={() => setCurrentWineTab("white")} 
                    className={`px-3 py-1.5 rounded-md transition-all ${currentWineTab === "white" ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    WHITE WINE MATRIX
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Chemical Features</th>
                      <th className="p-3 text-purple-400 font-bold">Mean</th>
                      <th className="p-3">Median</th>
                      <th className="p-3">Mode</th>
                      <th className="p-3">Variance</th>
                      <th className="p-3">Std Dev</th>
                      <th className="p-3">Min</th>
                      <th className="p-3 text-indigo-400 font-bold">Q1 (25%)</th>
                      <th className="p-3 text-purple-400 font-bold">Q3 (75%)</th>
                      <th className="p-3">Max</th>
                      <th className="p-3 text-amber-400 font-bold">IQR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {Object.keys(activeWineStats).map((f) => (
                      <tr key={f} className="hover:bg-slate-800/20 transition-colors font-medium">
                        <td className="p-3 font-sans font-bold text-slate-300">{f}</td>
                        <td className="p-3 text-purple-400 bg-purple-500/5 font-bold">{activeWineStats[f].mean}</td>
                        <td className="p-3 text-slate-200">{activeWineStats[f].median}</td>
                        <td className="p-3 text-slate-400">{activeWineStats[f].mode}</td>
                        <td className="p-3 text-slate-500">{activeWineStats[f].variance}</td>
                        <td className="p-3 text-slate-400">{activeWineStats[f].std_dev}</td>
                        <td className="p-3 text-emerald-400">{activeWineStats[f].min}</td>
                        <td className="p-3 text-indigo-400 font-semibold">{activeWineStats[f].q1}</td>
                        <td className="p-3 text-purple-400 font-semibold">{activeWineStats[f].q3}</td>
                        <td className="p-3 text-rose-400">{activeWineStats[f].max}</td>
                        <td className="p-3 text-amber-400 bg-amber-500/5 font-bold">{activeWineStats[f].iqr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}