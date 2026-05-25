"use client";

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { Wine, Database, RefreshCw, BarChart4, Award, Droplet } from "lucide-react";

interface WineKPIData {
  total_red_samples: number;
  total_white_samples: number;
  avg_red_quality: number;
  avg_white_quality: number;
}

interface WineBivariateData {
  quality: string;
  "Rượu đỏ (Alcohol)": number;
  "Rượu trắng (Alcohol)": number;
}

interface StatMetrics {
  mean: number;
  median: number;
  mode: number;
  variance: number;
  std_dev: number;
  min: number;
  max: number;
  iqr: number;
}

interface WineStatistics {
  [key: string]: StatMetrics;
}

export default function WineDashboard() {
  const [kpis, setKpis] = useState<WineKPIData | null>(null);
  const [bivariate, setBivariate] = useState<WineBivariateData[]>([]);
  const [redStats, setRedStats] = useState<WineStatistics | null>(null);
  const [whiteStats, setWhiteStats] = useState<WineStatistics | null>(null);
  const [currentTab, setCurrentTab] = useState<"red" | "white">("red");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const [kpiRes, bivRes, redStatRes, whiteStatRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/wine/kpis"),
          fetch("http://127.0.0.1:8000/api/wine/chart/bivariate"),
          fetch("http://127.0.0.1:8000/api/wine/statistics/red"),
          fetch("http://127.0.0.1:8000/api/wine/statistics/white")
        ]);

        setKpis(await kpiRes.json());
        setBivariate(await bivRes.json());
        setRedStats(await redStatRes.json());
        setWhiteStats(await whiteStatRes.json());
      } catch (error) {
        console.error("Lỗi kết nối API Wine Backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWineData();
  }, []);

  if (loading || !kpis || !redStats || !whiteStats) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-purple-400 font-mono text-xl tracking-wide">
        <RefreshCw className="mr-3 animate-spin text-purple-500" /> Đang đồng bộ ma trận hóa học Rượu Đỏ & Rượu Trắng...
      </div>
    );
  }

  const activeStats = currentTab === "red" ? redStats : whiteStats;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 font-sans">
      
      {/* HEADER BAR */}
      <div className="border-b border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Wine className="text-purple-400" size={26} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
              Wine Quality Comparative Analytics System
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">
            Mục 1.1.3 & 1.2.2: Phân tích khám phá đối chứng lý thuyết hóa học giữa vang đỏ và vang trắng
          </p>
        </div>
        <a href="/" className="self-start md:self-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 transition-colors">
          ← CHUYỂN SANG DIABETES DASHBOARD
        </a>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Mẫu Vang Đỏ (Red Wine)</span>
          <div className="text-2xl font-black text-rose-400 tracking-tight">{kpis.total_red_samples} <span className="text-sm font-normal text-slate-500">records</span></div>
        </div>
        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Mẫu Vang Trắng (White Wine)</span>
          <div className="text-2xl font-black text-amber-100 tracking-tight">{kpis.total_white_samples} <span className="text-sm font-normal text-slate-500">records</span></div>
        </div>
        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Điểm Chất Lượng Đỏ TB</span>
          <div className="text-2xl font-black text-rose-500 tracking-tight flex items-center gap-1.5">
            {kpis.avg_red_quality} <Award size={18} className="text-rose-500/60" />
          </div>
        </div>
        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Điểm Chất Lượng Trắng TB</span>
          <div className="text-2xl font-black text-amber-300 tracking-tight flex items-center gap-1.5">
            {kpis.avg_white_quality} <Award size={18} className="text-amber-300/60" />
          </div>
        </div>
      </div>

      {/* CHART SECTION: BIVARIATE TREND ANALYSIS */}
      <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/80 mb-8 shadow-xl">
        <div className="mb-4">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">Mục 1.3: Bivariate Trend Lines</span>
          <h3 className="text-base font-bold text-slate-200">Xu Hướng Nồng Độ Cồn (Alcohol) Biến Thiên Theo Chất Lượng Rượu</h3>
          <p className="text-xs text-slate-400 mt-0.5">Phân tích hai biến so sánh xu thế nâng cao nồng độ cồn để đạt điểm chất lượng tối ưu[cite: 1]</p>
        </div>
        <div className="h-[350px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bivariate} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="quality" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="Rượu đỏ (Alcohol)" stroke="#F43F5E" strokeWidth={3} activeDot={{ r: 6 }} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Rượu trắng (Alcohol)" stroke="#F59E0B" strokeWidth={3} activeDot={{ r: 6 }} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DYNAMIC DESCRIPTIVE MATRIX TABLE */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Database className="text-purple-400" size={20} />
            <div>
              <h3 className="text-base font-bold text-slate-200">Ma Trận Thống Kê Mô Tả Đặc Tính Hóa Học[cite: 1]</h3>
              <p className="text-xs text-slate-400 mt-0.5">Lựa chọn tab để chuyển đổi ma trận thuộc tính thực nghiệm tương ứng[cite: 1]</p>
            </div>
          </div>
          
          {/* TAB SWITCHER */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto font-mono text-xs">
            <button 
              onClick={() => setCurrentTab("red")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${currentTab === "red" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-slate-400 hover:text-slate-200"}`}
            >
              RED WINE MATRIX
            </button>
            <button 
              onClick={() => setCurrentTab("white")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${currentTab === "white" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-slate-400 hover:text-slate-200"}`}
            >
              WHITE WINE MATRIX
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider font-mono">
                <th className="p-4 font-bold">Chỉ số cấu trúc (Chemical Features)</th>
                <th className="p-4 text-purple-400 font-bold">Mean</th>
                <th className="p-4 font-bold">Median</th>
                <th className="p-4 font-bold">Mode</th>
                <th className="p-4 font-bold">Variance</th>
                <th className="p-4 font-bold">Std Dev</th>
                <th className="p-4 text-emerald-400 font-bold">Min</th>
                <th className="p-4 text-rose-400 font-bold">Max</th>
                <th className="p-4 text-amber-400 font-bold">IQR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono text-[12px]">
              {Object.keys(activeStats).map((feature) => (
                <tr key={feature} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 font-sans font-bold text-slate-300 group-hover:text-white transition-colors">{feature}</td>
                  <td className="p-4 text-purple-400 font-bold bg-purple-500/5">{activeStats[feature].mean}</td>
                  <td className="p-4 text-slate-200">{activeStats[feature].median}</td>
                  <td className="p-4 text-slate-400">{activeStats[feature].mode}</td>
                  <td className="p-4 text-slate-500">{activeStats[feature].variance}</td>
                  <td className="p-4 text-slate-400">{activeStats[feature].std_dev}</td>
                  <td className="p-4 text-emerald-400 font-semibold">{activeStats[feature].min}</td>
                  <td className="p-4 text-rose-400 font-semibold">{activeStats[feature].max}</td>
                  <td className="p-4 text-amber-400 font-semibold bg-amber-500/5">{activeStats[feature].iqr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}