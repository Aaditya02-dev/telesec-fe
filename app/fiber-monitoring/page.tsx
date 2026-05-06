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
  { label: "Total Links", value: "253", delta: "+1.4%", icon: Link2, tone: "blue", spark: "M0 28 L36 28 L72 27 L108 24 L144 25 L180 22" },
  { label: "At Risk Links", value: "3", delta: "watch", icon: TriangleAlert, tone: "orange", spark: "M0 30 L45 29 L90 29 L135 27 L180 25" },
  { label: "Major Alerts", value: "2", delta: "active", icon: Zap, tone: "red", spark: "M0 31 L45 30 L90 28 L135 26 L180 24" },
  { label: "Degraded Links", value: "6", delta: "2 new", icon: Signal, tone: "yellow", spark: "M0 30 L45 29 L90 27 L135 25 L180 24" },
  { label: "Predicted Failures", value: "1", delta: "next 24h", icon: Sparkles, tone: "orange", spark: "M0 31 L45 31 L90 26 L135 24 L180 20" },
  { label: "Serving Capacity", value: "66", delta: "carriers", icon: Gauge, tone: "blue", spark: "M0 27 L45 28 L90 26 L135 28 L180 24" }
];

const toneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700",
  yellow: "border-yellow-200 bg-yellow-50 text-yellow-700"
};

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
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-bold text-black transition hover:border-[#0B2B32] hover:bg-slate-50"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Safe" ? "border-green-200 bg-green-50 text-green-700" : status === "Moderate" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : "border-red-200 bg-red-50 text-red-700";

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
    <div className="rounded-lg border border-border bg-white shadow-soft">
      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">Fiber Degradation Trends</h2>
          <p className="text-sm font-semibold text-slate-700">Optical power, attenuation, and forecast window for link {selectedLink}.</p>
        </div>
        <MiniButton>View Detailed Trends <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
      </div>
      <div
        className="relative h-72 overflow-hidden rounded-b-lg bg-slate-50"
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
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#CBD5E1" strokeWidth="0.35" />
            </pattern>
            <linearGradient id="powerArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="attenArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect fill="#F8FAFC" height="100" width="100" />
          <rect fill="url(#fiberGrid)" height="100" opacity="0.9" width="100" />
          <path d="M0 50 C10 48 12 36 25 39 S43 47 52 42 S67 58 75 43 S88 22 100 18 L100 100 L0 100 Z" fill="url(#powerArea)" />
          <path d="M0 64 C12 61 17 70 27 61 S43 58 52 70 S67 63 75 64 S88 58 100 62 L100 100 L0 100 Z" fill="url(#attenArea)" />
          <path d="M0 50 C10 48 12 36 25 39 S43 47 52 42 S67 58 75 43 S88 22 100 18" fill="none" stroke="#F59E0B" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M0 64 C12 61 17 70 27 61 S43 58 52 70 S67 63 75 64 S88 58 100 62" fill="none" stroke="#2563EB" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M82 22 C88 35 93 39 100 40" fill="none" stroke="#D97706" strokeDasharray="3 2" strokeLinecap="round" strokeWidth="1.3" />
          <line stroke="#0B2B32" strokeDasharray="2 2" strokeOpacity="0.42" x1={hoverPoint.x} x2={hoverPoint.x} y1="10" y2="92" />
          <circle cx={hoverPoint.x} cy={hoverPoint.powerY} fill="#F59E0B" r="1.8" />
          <circle cx={hoverPoint.x} cy={hoverPoint.attenuationY} fill="#2563EB" r="1.6" />
        </svg>
        <div
          className="pointer-events-none absolute z-10 min-w-[170px] rounded-lg border border-border bg-white p-3 text-xs font-bold shadow-soft"
          style={{ left: `${tooltipLeft}%`, top: `${tooltipTop}%` }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-black">Link #{selectedLink}</p>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-600">
              {hoverPoint.day}
            </span>
          </div>
          <p className="mt-2 text-orange-700">Optical Power {hoverPoint.power.toFixed(1)} dBm</p>
          <p className="text-blue-700">Attenuation {hoverPoint.attenuation.toFixed(2)} dB</p>
          <p className={hoverPoint.risk > 80 ? "text-red-700" : hoverPoint.risk > 55 ? "text-orange-700" : "text-green-700"}>
            Risk {hoverPoint.risk}%
          </p>
        </div>
        <div className="absolute bottom-3 left-4 flex gap-4 text-xs font-bold text-slate-700">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500" /> Optical Power</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600" /> Attenuation</span>
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
    { label: "Safe", value: riskSummary.safe, color: "bg-green-500", text: "text-green-700", track: "bg-green-100" },
    { label: "Moderate", value: riskSummary.moderate, color: "bg-yellow-500", text: "text-yellow-700", track: "bg-yellow-100" },
    { label: "Degraded", value: riskSummary.degraded, color: "bg-red-500", text: "text-red-700", track: "bg-red-100" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 text-black bg-white">

        <section className="mt-4 grid overflow-hidden rounded-lg border border-border bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div className="border-b border-border px-4 py-3 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0" key={metric.label}>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold uppercase leading-tight tracking-wide text-slate-500">{metric.label}</p>
                    <p className="mt-1 text-xl font-bold leading-none text-black">{metric.value}</p>
                    <p className="mt-1 text-[11px] font-bold leading-tight text-slate-600">{metric.delta}</p>
                  </div>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${toneClasses[metric.tone as keyof typeof toneClasses]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <svg className="mt-2 h-4 w-full" preserveAspectRatio="none" viewBox="0 0 180 34">
                  <path d={metric.spark} fill="none" stroke="#0B2B32" strokeLinecap="round" strokeWidth="1.8" />
                </svg>
              </div>
            );
          })}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-black">Fiber Monitoring</h2>
                  <p className="text-sm font-semibold text-slate-700">Interactive monitoring for optical power, attenuation, and predicted failures.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MiniButton><CalendarClock className="h-3.5 w-3.5" /> Live {lastUpdated}s</MiniButton>
                  <MiniButton onClick={() => setForecastEnabled((value) => !value)}>{forecastEnabled ? "Forecast On" : "Forecast Off"}</MiniButton>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-b border-border p-3">
                <div className="relative min-w-[240px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm font-semibold outline-none focus:border-[#0B2B32]"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search link..."
                    value={searchTerm}
                  />
                </div>
                <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                  {["All", "Safe", "Moderate", "Degraded"].map((item) => <option key={item}>{item}</option>)}
                </select>
                <MiniButton><Filter className="h-3.5 w-3.5" /> Fiber Bed</MiniButton>
              </div>
              <TrendChart selectedLink={selectedLink} />
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-lg border border-border bg-white shadow-soft">
                <div className="border-b border-border p-4">
                  <h2 className="text-lg font-bold text-black">At Risk Fiber Links</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-xs">
                    <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                      <tr>{["Link ID", "Status", "Signal Loss", "Atten Trend", "Last Alert"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {riskLinks.map(([id, status, loss, trend, alert]) => (
                        <tr className="cursor-pointer hover:bg-slate-50" key={id} onClick={() => setSelectedLink(id)}>
                          <td className="px-3 py-2 font-bold text-black"># {id}</td>
                          <td className="px-3 py-2"><StatusBadge status={status === "Critical" ? "Degraded" : status === "High" ? "Moderate" : "Safe"} /></td>
                          <td className="px-3 py-2 font-bold text-black">{loss}</td>
                          <td className="px-3 py-2 font-bold text-green-700">{trend}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{alert}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-black">Link {activeLink.id}</h2>
                  <MoreHorizontal className="h-5 w-5 text-black" />
                </div>
                <div className="mt-4 h-32 rounded-lg border border-border bg-slate-50 p-3">
                  <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                    <path d="M0 30 C18 32 22 20 38 24 S58 35 72 22 S88 20 100 26" fill="none" stroke="#F59E0B" strokeDasharray="3 2" strokeWidth="2" />
                    <path d="M0 38 C20 39 32 35 44 31 S74 20 100 18" fill="none" stroke="#2563EB" strokeWidth="2" />
                  </svg>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                  <span className="rounded-md border border-border bg-slate-50 p-2">Signal {activeLink.signal} dBm</span>
                  <span className="rounded-md border border-border bg-slate-50 p-2">Risk {activeLink.risk}%</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Risk Overview</h2>
                <MoreHorizontal className="h-5 w-5 text-black" />
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-orange-700">Avg Risk</p>
                      <Activity className="h-4 w-4 text-orange-700" />
                    </div>
                    <p className="mt-2 text-2xl font-bold leading-none text-black">{averageRisk}%</p>
                    <p className="mt-1 text-[11px] font-semibold text-orange-700">Across {fiberLinks.length} links</p>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-red-700">Peak Risk</p>
                      <TriangleAlert className="h-4 w-4 text-red-700" />
                    </div>
                    <p className="mt-2 text-2xl font-bold leading-none text-black">{maxRisk}%</p>
                    <p className="mt-1 text-[11px] font-semibold text-red-700">Link {fiberLinks.find((link) => link.risk === maxRisk)?.id}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-slate-50 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold text-black">Link Health Distribution</p>
                    <span className="rounded-md border border-border bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600">{fiberLinks.length} total</span>
                  </div>
                  <div className="space-y-3">
                    {riskBreakdown.map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex items-center justify-between text-xs font-bold">
                          <span className={`flex items-center gap-2 ${item.text}`}><span className={`h-2 w-2 rounded-full ${item.color}`} /> {item.label}</span>
                          <span className="text-black">{item.value}</span>
                        </div>
                        <div className={`h-2 rounded-full ${item.track}`}>
                          <span className={`block h-full rounded-full ${item.color}`} style={{ width: `${(item.value / fiberLinks.length) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Selected Link</p>
                      <p className="mt-1 text-sm font-bold text-black">Link {activeLink.id}</p>
                      <p className="text-xs font-semibold text-slate-600">{activeLink.location} / {activeLink.alert}</p>
                    </div>
                    <StatusBadge status={activeLink.status} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                    <span className="rounded-md border border-border bg-slate-50 p-2">Signal {activeLink.signal} dBm</span>
                    <span className="rounded-md border border-border bg-slate-50 p-2">Risk {activeLink.risk}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Fiber Link Details</h2>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-lg font-bold text-black">Link {activeLink.id}</p>
                  <p className="text-xs font-semibold text-slate-600">{activeLink.location} / {activeLink.length}</p>
                </div>
                <StatusBadge status={activeLink.status} />
                <div>
                  <div className="flex justify-between text-xs font-bold"><span>Risk Score</span><span>{activeLink.risk}%</span></div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100"><span className="block h-full rounded-full bg-orange-500" style={{ width: `${activeLink.risk}%` }} /></div>
                </div>
                <button className="h-9 w-full rounded-md bg-[#0B2B32] text-xs font-bold text-white" onClick={() => setSelectedLink(activeLink.id)} type="button">Open Link</button>
                <button className="h-9 w-full rounded-md border border-slate-300 bg-white text-xs font-bold text-black" type="button">Schedule Maintenance</button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Forecasting</h2>
              </div>
              <div className="p-4">
                <div className="rounded-md border border-orange-200 bg-orange-50 p-3">
                  <p className="text-sm font-bold text-black">Failure Predicted</p>
                  <p className="mt-1 text-xs font-semibold text-orange-700">Link {activeLink.id} predicts possible attenuation drift.</p>
                </div>
                <p className="mt-3 text-xs font-bold text-slate-600">Analysis window: 11:00 AM</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-4 rounded-lg border border-border bg-white shadow-soft">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <span className="rounded-md bg-[#0B2B32] px-3 py-1 text-xs font-bold text-white">Fiber Link List</span>
            <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-slate-700">Link Name</span>
            <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-slate-700">Alarms</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                <tr>{["Link ID", "Link Name", "Location", "Length", "Status", "Signal", "Max Atten", "Risk Score", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLinks.map((link) => (
                  <tr className={`cursor-pointer hover:bg-slate-50 ${selectedLink === link.id ? "bg-[#0B2B32]/5" : ""}`} key={link.id} onClick={() => setSelectedLink(link.id)}>
                    <td className="px-3 py-2 font-bold text-black"># {link.id}</td>
                    <td className="px-3 py-2 font-semibold text-black">{link.name}</td>
                    <td className="px-3 py-2 font-semibold text-black">{link.location}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{link.length}</td>
                    <td className="px-3 py-2"><StatusBadge status={link.status} /></td>
                    <td className="px-3 py-2 font-bold text-black">{link.signal} dBm</td>
                    <td className="px-3 py-2 font-semibold text-black">{link.atten}</td>
                    <td className="px-3 py-2 font-bold text-orange-700">{link.risk}%</td>
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
