"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CalendarClock,
  ChevronDown,
  Filter,
  Gauge,
  Link2,
  MoreHorizontal,
  Search,
  Signal,
  Sparkles,
  TriangleAlert,
  Zap
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Links", value: "253", delta: "+1.4%", icon: Link2 },
  { label: "At Risk Links", value: "3", delta: "watch", icon: TriangleAlert },
  { label: "Major Alerts", value: "2", delta: "active", icon: Zap },
  { label: "Degraded Links", value: "6", delta: "2 new", icon: Signal },
  { label: "Predicted Failures", value: "1", delta: "next 24h", icon: Sparkles },
  { label: "Serving Capacity", value: "66", delta: "carriers", icon: Gauge }
];

function FiberKpiCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;

  return (
    <div className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/8 bg-[#13161F] px-4 py-3 transition-all duration-200 hover:border-[#41bf63]/30 hover:bg-[#1a1e29]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-[#41bf63]/30">
        <Icon className="h-[18px] w-[18px] text-[#41bf63]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[11px] font-semibold uppercase leading-none tracking-wider text-slate-400">
          {metric.label}
        </span>
        <span className="text-2xl font-black leading-tight tracking-tight text-white">
          {metric.value}
        </span>
        <span className="truncate text-[10px] font-bold leading-none text-[#41bf63]">
          {metric.delta}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#41bf63] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

const fiberLinks = [
  { id: "A-B", name: "Link A-B", location: "San Francisco", length: "20 km", status: "Degraded", signal: -39.2, atten: "0.35 dB", risk: 100, alert: "Optical power drift" },
  { id: "B-E", name: "Link B-E", location: "Los Angeles", length: "50 km", status: "Safe", signal: -16.0, atten: "0.10 dB", risk: 30, alert: "Stable" },
  { id: "C-D", name: "Link C-D", location: "New York", length: "30 km", status: "Degraded", signal: -38.3, atten: "0.36 dB", risk: 60, alert: "Attenuation rising" },
  { id: "E-F", name: "Link E-F", location: "Chicago", length: "40 km", status: "Safe", signal: -22.5, atten: "0.12 dB", risk: 10, alert: "Stable" },
  { id: "F-G", name: "Link F-G", location: "Dallas", length: "35 km", status: "Moderate", signal: -25.1, atten: "0.22 dB", risk: 55, alert: "Loss variance" }
];

const riskLinks = [
  ["A-B", "Critical", "-55.2 dBm", "38.7% up", "2 hours ago"],
  ["C-D", "High", "-55.3 dBm", "18.0% up", "1 hour ago"],
  ["F-G", "Moderate", "-25.1 dBm", "5.5% up", "15 hours ago"]
];

function MiniButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 text-xs font-bold text-slate-200 transition hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10 hover:text-white"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Safe" ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : status === "Moderate" ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-300" : "border-red-500/25 bg-red-500/10 text-red-400";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

function TrendChart({ selectedLink }: { selectedLink: string }) {
  const trendPoints = [
    { day: "Mon", x: 0, power: -31.8, attenuation: 0.18, risk: 28, powerY: 50, attenuationY: 64 },
    { day: "Tue", x: 14, power: -28.4, attenuation: 0.21, risk: 34, powerY: 39, attenuationY: 67 },
    { day: "Wed", x: 29, power: -32.2, attenuation: 0.26, risk: 41, powerY: 45, attenuationY: 60 },
    { day: "Thu", x: 43, power: -34.7, attenuation: 0.31, risk: 56, powerY: 48, attenuationY: 70 },
    { day: "Fri", x: 58, power: -38.9, attenuation: 0.28, risk: 68, powerY: 55, attenuationY: 64 },
    { day: "Sat", x: 72, power: -35.1, attenuation: 0.33, risk: 74, powerY: 43, attenuationY: 66 },
    { day: "Sun", x: 82, power: -39.3, attenuation: 0.35, risk: 86, powerY: 22, attenuationY: 58 },
    { day: "Forecast", x: 96, power: -42.6, attenuation: 0.41, risk: 92, powerY: 18, attenuationY: 62 }
  ];
  const [hoverPoint, setHoverPoint] = useState(trendPoints[6]);
  const tooltipLeft = Math.min(78, Math.max(6, hoverPoint.x + 2));
  const tooltipTop = Math.min(62, Math.max(12, Math.min(hoverPoint.powerY, hoverPoint.attenuationY) + 8));

  return (
    <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
      <div className="flex flex-col gap-3 border-b border-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Fiber Degradation Trends</h2>
          <p className="text-sm font-semibold text-slate-500">Optical power, attenuation, and forecast window for link {selectedLink}.</p>
        </div>
        <MiniButton>View Detailed Trends <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
      </div>
      <div
        className="relative h-72 overflow-hidden rounded-b-lg bg-[#0B0C10]"
        onMouseLeave={() => setHoverPoint(trendPoints[6])}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width) * 100;
          const nearest = trendPoints.reduce((closest, point) => (
            Math.abs(point.x - x) < Math.abs(closest.x - x) ? point : closest
          ), trendPoints[0]);
          setHoverPoint(nearest);
        }}
      >
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern height="8" id="fiberGrid" patternUnits="userSpaceOnUse" width="8">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.35" />
            </pattern>
            <linearGradient id="powerArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="attenArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#41bf63" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#41bf63" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect fill="#0B0C10" height="100" width="100" />
          <rect fill="url(#fiberGrid)" height="100" opacity="0.9" width="100" />
          <path d="M0 50 C10 48 12 36 25 39 S43 47 52 42 S67 58 75 43 S88 22 100 18 L100 100 L0 100 Z" fill="url(#powerArea)" />
          <path d="M0 64 C12 61 17 70 27 61 S43 58 52 70 S67 63 75 64 S88 58 100 62 L100 100 L0 100 Z" fill="url(#attenArea)" />
          <path d="M0 50 C10 48 12 36 25 39 S43 47 52 42 S67 58 75 43 S88 22 100 18" fill="none" stroke="#F59E0B" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M0 64 C12 61 17 70 27 61 S43 58 52 70 S67 63 75 64 S88 58 100 62" fill="none" stroke="#41bf63" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M82 22 C88 35 93 39 100 40" fill="none" stroke="#D97706" strokeDasharray="3 2" strokeLinecap="round" strokeWidth="1.3" />
          <line stroke="#41bf63" strokeDasharray="2 2" strokeOpacity="0.42" x1={hoverPoint.x} x2={hoverPoint.x} y1="10" y2="92" />
          <circle cx={hoverPoint.x} cy={hoverPoint.powerY} fill="#F59E0B" r="1.8" />
          <circle cx={hoverPoint.x} cy={hoverPoint.attenuationY} fill="#41bf63" r="1.6" />
        </svg>
        <div
          className="pointer-events-none absolute z-10 min-w-[170px] rounded-lg border border-white/10 bg-[#13161F]/95 p-3 text-xs font-bold shadow-xl"
          style={{ left: `${tooltipLeft}%`, top: `${tooltipTop}%` }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-white">Link #{selectedLink}</p>
            <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
              {hoverPoint.day}
            </span>
          </div>
          <p className="mt-2 text-orange-400">Optical Power {hoverPoint.power.toFixed(1)} dBm</p>
          <p className="text-[#41bf63]">Attenuation {hoverPoint.attenuation.toFixed(2)} dB</p>
          <p className={hoverPoint.risk > 80 ? "text-red-400" : hoverPoint.risk > 55 ? "text-orange-400" : "text-[#41bf63]"}>
            Risk {hoverPoint.risk}%
          </p>
        </div>
        <div className="absolute bottom-3 left-4 flex gap-4 text-xs font-bold text-slate-400">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500" /> Optical Power</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#41bf63]" /> Attenuation</span>
        </div>
      </div>
    </div>
  );
}

export default function FiberMonitoringPage() {
  const [lastUpdated, setLastUpdated] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLink, setSelectedLink] = useState("A-B");
  const [statusFilter, setStatusFilter] = useState("All");
  const [forecastEnabled, setForecastEnabled] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setLastUpdated((value) => (value + 1) % 60), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredLinks = useMemo(() => {
    return fiberLinks.filter((link) => {
      const matchesSearch = `${link.id} ${link.name} ${link.location}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || link.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);
  const activeLink = fiberLinks.find((link) => link.id === selectedLink) ?? fiberLinks[0];
  const riskSummary = {
    safe: fiberLinks.filter((link) => link.status === "Safe").length,
    moderate: fiberLinks.filter((link) => link.status === "Moderate").length,
    degraded: fiberLinks.filter((link) => link.status === "Degraded").length
  };
  const averageRisk = Math.round(fiberLinks.reduce((total, link) => total + link.risk, 0) / fiberLinks.length);
  const maxRisk = Math.max(...fiberLinks.map((link) => link.risk));
  const riskBreakdown = [
    { label: "Safe", value: riskSummary.safe, color: "bg-[#41bf63]", text: "text-[#41bf63]", track: "bg-[#41bf63]/10" },
    { label: "Moderate", value: riskSummary.moderate, color: "bg-yellow-500", text: "text-yellow-300", track: "bg-yellow-500/10" },
    { label: "Degraded", value: riskSummary.degraded, color: "bg-red-500", text: "text-red-400", track: "bg-red-500/10" }
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">

        <section className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric) => (
            <FiberKpiCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex flex-col gap-3 border-b border-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Fiber Monitoring</h2>
                  <p className="text-sm font-semibold text-slate-500">Interactive monitoring for optical power, attenuation, and predicted failures.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MiniButton><CalendarClock className="h-3.5 w-3.5" /> Live {lastUpdated}s</MiniButton>
                  <MiniButton onClick={() => setForecastEnabled((value) => !value)}>{forecastEnabled ? "Forecast On" : "Forecast Off"}</MiniButton>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-b border-white/5 p-3">
                <div className="relative min-w-[240px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search link..."
                    value={searchTerm}
                  />
                </div>
                <select className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-white outline-none focus:border-[#41bf63] [&>option]:bg-[#13161F] [&>option]:text-white" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                  {["All", "Safe", "Moderate", "Degraded"].map((item) => <option key={item}>{item}</option>)}
                </select>
                <MiniButton><Filter className="h-3.5 w-3.5" /> Fiber Bed</MiniButton>
              </div>
              <TrendChart selectedLink={selectedLink} />
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="border-b border-white/5 p-4">
                  <h2 className="text-lg font-bold text-white">At Risk Fiber Links</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-xs">
                    <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                      <tr>{["Link ID", "Status", "Signal Loss", "Atten Trend", "Last Alert"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {riskLinks.map(([id, status, loss, trend, alert]) => (
                        <tr className="cursor-pointer hover:bg-white/[0.02]" key={id} onClick={() => setSelectedLink(id)}>
                          <td className="px-3 py-2 font-bold text-white"># {id}</td>
                          <td className="px-3 py-2"><StatusBadge status={status === "Critical" ? "Degraded" : status === "High" ? "Moderate" : "Safe"} /></td>
                          <td className="px-3 py-2 font-bold text-white">{loss}</td>
                          <td className="px-3 py-2 font-bold text-[#41bf63]">{trend}</td>
                          <td className="px-3 py-2 font-semibold text-slate-400">{alert}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#13161F] p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Link {activeLink.id}</h2>
                  <MoreHorizontal className="h-5 w-5 text-slate-400" />
                </div>
                <div className="mt-4 h-32 rounded-lg border border-white/5 bg-white/5 p-3">
                  <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                    <path d="M0 30 C18 32 22 20 38 24 S58 35 72 22 S88 20 100 26" fill="none" stroke="#F59E0B" strokeDasharray="3 2" strokeWidth="2" />
                    <path d="M0 38 C20 39 32 35 44 31 S74 20 100 18" fill="none" stroke="#41bf63" strokeWidth="2" />
                  </svg>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                  <span className="rounded-md border border-white/5 bg-white/5 p-2">Signal {activeLink.signal} dBm</span>
                  <span className="rounded-md border border-white/5 bg-white/5 p-2">Risk {activeLink.risk}%</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 p-4">
                <h2 className="text-base font-bold text-white">Risk Overview</h2>
                <MoreHorizontal className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-orange-400">Avg Risk</p>
                      <Activity className="h-4 w-4 text-orange-400" />
                    </div>
                    <p className="mt-2 text-2xl font-bold leading-none text-white">{averageRisk}%</p>
                    <p className="mt-1 text-[11px] font-semibold text-orange-400">Across {fiberLinks.length} links</p>
                  </div>
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-red-400">Peak Risk</p>
                      <TriangleAlert className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="mt-2 text-2xl font-bold leading-none text-white">{maxRisk}%</p>
                    <p className="mt-1 text-[11px] font-semibold text-red-400">Link {fiberLinks.find((link) => link.risk === maxRisk)?.id}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold text-white">Link Health Distribution</p>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-500">{fiberLinks.length} total</span>
                  </div>
                  <div className="space-y-3">
                    {riskBreakdown.map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex items-center justify-between text-xs font-bold">
                          <span className={`flex items-center gap-2 ${item.text}`}><span className={`h-2 w-2 rounded-full ${item.color}`} /> {item.label}</span>
                          <span className="text-white">{item.value}</span>
                        </div>
                        <div className={`h-2 rounded-full ${item.track}`}>
                          <span className={`block h-full rounded-full ${item.color}`} style={{ width: `${(item.value / fiberLinks.length) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Selected Link</p>
                      <p className="mt-1 text-sm font-bold text-white">Link {activeLink.id}</p>
                      <p className="text-xs font-semibold text-slate-500">{activeLink.location} / {activeLink.alert}</p>
                    </div>
                    <StatusBadge status={activeLink.status} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                    <span className="rounded-md border border-white/5 bg-white/5 p-2">Signal {activeLink.signal} dBm</span>
                    <span className="rounded-md border border-white/5 bg-white/5 p-2">Risk {activeLink.risk}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <h2 className="text-base font-bold text-white">Fiber Link Details</h2>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-lg font-bold text-white">Link {activeLink.id}</p>
                  <p className="text-xs font-semibold text-slate-500">{activeLink.location} / {activeLink.length}</p>
                </div>
                <StatusBadge status={activeLink.status} />
                <div>
                  <div className="flex justify-between text-xs font-bold"><span>Risk Score</span><span>{activeLink.risk}%</span></div>
                  <div className="mt-1 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-orange-500" style={{ width: `${activeLink.risk}%` }} /></div>
                </div>
                <button className="h-9 w-full rounded-md bg-[#41bf63] text-xs font-bold text-[#0B0C10] hover:bg-[#6ee7a0]" onClick={() => setSelectedLink(activeLink.id)} type="button">Open Link</button>
                <button className="h-9 w-full rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" type="button">Schedule Maintenance</button>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <h2 className="text-base font-bold text-white">Forecasting</h2>
              </div>
              <div className="p-4">
                <div className="rounded-md border border-orange-500/20 bg-orange-500/10 p-3">
                  <p className="text-sm font-bold text-white">Failure Predicted</p>
                  <p className="mt-1 text-xs font-semibold text-orange-400">Link {activeLink.id} predicts possible attenuation drift.</p>
                </div>
                <p className="mt-3 text-xs font-bold text-slate-500">Analysis window: 11:00 AM</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/5 p-3">
            <span className="rounded-md bg-[#41bf63] px-3 py-1 text-xs font-bold text-[#0B0C10]">Fiber Link List</span>
            <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">Link Name</span>
            <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">Alarms</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                <tr>{["Link ID", "Link Name", "Location", "Length", "Status", "Signal", "Max Atten", "Risk Score", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLinks.map((link) => (
                  <tr className={`cursor-pointer hover:bg-white/[0.02] ${selectedLink === link.id ? "bg-[#41bf63]/5" : ""}`} key={link.id} onClick={() => setSelectedLink(link.id)}>
                    <td className="px-3 py-2 font-bold text-white"># {link.id}</td>
                    <td className="px-3 py-2 font-semibold text-white">{link.name}</td>
                    <td className="px-3 py-2 font-semibold text-white">{link.location}</td>
                    <td className="px-3 py-2 font-semibold text-slate-400">{link.length}</td>
                    <td className="px-3 py-2"><StatusBadge status={link.status} /></td>
                    <td className="px-3 py-2 font-bold text-white">{link.signal} dBm</td>
                    <td className="px-3 py-2 font-semibold text-white">{link.atten}</td>
                    <td className="px-3 py-2 font-bold text-orange-400">{link.risk}%</td>
                    <td className="px-3 py-2"><MoreHorizontal className="h-4 w-4 text-slate-500" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
