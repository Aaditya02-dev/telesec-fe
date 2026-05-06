"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trafficMetrics } from "@/lib/mock-data";

const legendItems = [
  { label: "Network Traffic", color: "#D4F84A" },
  { label: "Inbound Traffic", color: "#00E5FF" },
  { label: "Outbound Traffic", color: "#B065E0" }
];

export function TrafficChart() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Metrics Column - Updated for Dark Theme */}
      <div className="xl:w-64 space-y-4 shrink-0">
        <div className="rounded-[16px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Total Network</p>
          <p className="mt-1 text-3xl font-black text-white tracking-tight">1.4 TB/s</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#D4F84A]">
            <span>↑ 12.4%</span>
            <span className="text-slate-500 font-medium">vs last hr</span>
          </div>
        </div>
        <div className="rounded-[16px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Inbound Peak</p>
          <p className="mt-1 text-2xl font-black text-[#00E5FF] tracking-tight">842 GB/s</p>
        </div>
        <div className="rounded-[16px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Outbound Peak</p>
          <p className="mt-1 text-2xl font-black text-[#B065E0] tracking-tight">612 GB/s</p>
        </div>
      </div>

      {/* Chart Column */}
      <div className="flex-1 rounded-[16px] border border-white/10 bg-[#0F171A]/80 p-6 backdrop-blur-md shadow-inner flex flex-col">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-white">Traffic Trend (24h)</p>
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {legendItems.map((item) => (
              <span key={item.label} className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                <span className="h-1.5 w-4 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
        
        <div className="h-72 w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trafficMetrics}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4F84A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4F84A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B065E0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#B065E0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                tickMargin={12}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis 
                stroke="#475569" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 26, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
              <Area 
                type="monotone" 
                dataKey="network" 
                stroke="#D4F84A" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorNetwork)" 
              />
              <Area 
                type="monotone" 
                dataKey="inbound" 
                stroke="#00E5FF" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorInbound)" 
              />
              <Area 
                type="monotone" 
                dataKey="outbound" 
                stroke="#B065E0" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorOutbound)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
