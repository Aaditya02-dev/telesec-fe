"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { alerts, kpis, playbooks, fraudAlerts, fiberRiskNodes, trafficMetrics } from "@/lib/mock-data";
import {
  BarChart3, Download, Filter, RefreshCw, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, Clock, FileText, Calendar,
  ArrowUpRight, ArrowDownRight, Activity, Shield, Zap, Network,
  Eye, Share2, Radio, Bot, ShieldAlert, Cpu
} from "lucide-react";

// ─── Status & severity colours ────────────────────────────────────────────────
const statusColor: Record<string, string> = {
  Investigating: "text-[#41bf63] bg-[#41bf63]/10 border border-[#41bf63]/20",
  Queued:        "text-blue-400 bg-blue-400/10 border border-blue-400/20",
  Resolved:      "text-slate-400 bg-slate-400/10 border border-slate-400/20",
  Open:          "text-red-400 bg-red-400/10 border border-red-400/20",
};
const severityColor: Record<string, string> = {
  Critical: "text-red-400 bg-red-400/10 border border-red-400/20",
  Major:    "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
  Normal:   "text-[#41bf63] bg-[#41bf63]/10 border border-[#41bf63]/20",
};
const riskColor: Record<string, string> = {
  danger:  "bg-red-500",
  warning: "bg-yellow-500",
  success: "bg-[#41bf63]",
};

// ─── Mini Traffic Sparkline (SVG, no deps) ───────────────────────────────────
function TrafficSparkline() {
  const vals = trafficMetrics.map(d => d.network);
  const max  = Math.max(...vals);
  const min  = Math.min(...vals);
  const W = 400, H = 80;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * W;
    const y = H - ((v - min) / (max - min)) * H;
    return `${x},${y}`;
  }).join(" ");
  const area = `M0,${H} L` + pts.split(" ").map((p, i) => (i === 0 ? p : p)).join(" L") + ` L${W},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sgrd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#41bf63" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#41bf63" stopOpacity="0"   />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sgrd)" />
      <polyline points={pts} fill="none" stroke="#41bf63" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Playbook Status Bar ──────────────────────────────────────────────────────
function PlaybookStatusBar({ enabled }: { enabled: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-8 rounded-full ${enabled ? "bg-[#41bf63]" : "bg-slate-700"}`} />
      <span className={`text-[9px] font-black uppercase tracking-widest ${enabled ? "text-[#41bf63]" : "text-slate-500"}`}>
        {enabled ? "Ready" : "Pending"}
      </span>
    </div>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Incidents" | "Traffic" | "Fraud" | "Fiber" | "Playbooks">("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) window.location.href = "/login";
  }, []);

  if (!isMounted) return null;

  // Aggregate summary stats from real data
  const criticalCount   = alerts.filter(a => a.severity === "Critical").length;
  const resolvedCount   = alerts.filter(a => a.status === "Resolved").length;
  const activePlaybooks = playbooks.filter(p => p.enabled).length;
  const fraudDanger     = fraudAlerts.filter(f => f.status === "danger").length;
  const fiberDanger     = fiberRiskNodes.filter(n => n.status === "danger").length;
  const peakTraffic     = Math.max(...trafficMetrics.map(d => d.network));

  const summaryKpis = [
    { label: "Active Alerts",    value: kpis.find(k => k.title === "Active Alerts")?.value    ?? "—", icon: AlertTriangle,  change: kpis.find(k => k.title === "Active Alerts")?.trend    ?? "", up: kpis.find(k => k.title === "Active Alerts")?.trendType === "up",    col: "text-red-400",    bg: "bg-red-400/10"    },
    { label: "Critical Incidents", value: kpis.find(k => k.title === "Critical Incidents")?.value ?? "—", icon: ShieldAlert, change: kpis.find(k => k.title === "Critical Incidents")?.trend ?? "No change", up: false, col: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Network Health",   value: kpis.find(k => k.title === "Network Health")?.value   ?? "—", icon: Network,        change: kpis.find(k => k.title === "Network Health")?.trend    ?? "", up: true,  col: "text-[#41bf63]", bg: "bg-[#41bf63]/10" },
    { label: "MTTR",             value: kpis.find(k => k.title === "MTTR")?.value             ?? "—", icon: Clock,          change: kpis.find(k => k.title === "MTTR")?.trend              ?? "", up: false, col: "text-blue-400",   bg: "bg-blue-400/10"  },
    { label: "Fraud Alerts",     value: kpis.find(k => k.title === "Fraud Alerts")?.value     ?? "—", icon: Bot,            change: kpis.find(k => k.title === "Fraud Alerts")?.trend      ?? "", up: true,  col: "text-yellow-400", bg: "bg-yellow-400/10"},
    { label: "Fiber Risk Nodes", value: kpis.find(k => k.title === "Fiber Risk Nodes")?.value ?? "—", icon: Radio,          change: kpis.find(k => k.title === "Fiber Risk Nodes")?.trend  ?? "No change", up: false, col: "text-purple-400", bg: "bg-purple-400/10"},
  ];

  const tabs = ["All", "Incidents", "Traffic", "Fraud", "Fiber", "Playbooks"] as const;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">

          {/* ── Header ── */}
          <div className="relative overflow-hidden rounded-2xl bg-[#13161F] border border-white/5 shadow-2xl">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#41bf63]/10 blur-3xl pointer-events-none" />
            <div className="relative p-6 lg:px-8 lg:py-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#41bf63] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#41bf63]" />
                  </span>
                  <span className="text-[10px] font-black text-[#41bf63] uppercase tracking-[0.2em]">Production Environment Active</span>
                </div>
                <h1 className="text-2xl lg:text-[28px] font-black tracking-tight text-white uppercase leading-tight">
                  Network Reports{" "}
                  <span className="bg-gradient-to-r from-[#41bf63] to-[#6ee7a0] bg-clip-text text-transparent">
                    & Analytics
                  </span>
                </h1>
                <p className="text-[13px] font-medium text-slate-500 max-w-xl leading-relaxed">
                  Incident logs · Traffic metrics · Fraud intelligence · Fiber health · Playbook activity
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                  <Calendar className="h-3.5 w-3.5" /> Last 24h
                </button>
                <button className="flex items-center gap-2 rounded-xl bg-[#41bf63] px-4 py-2.5 text-[11px] font-bold text-black uppercase tracking-widest hover:bg-[#bce628] transition-all">
                  <Download className="h-3.5 w-3.5" /> Export Report
                </button>
              </div>
            </div>
          </div>

          {/* ── KPI Row from real data ── */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-[2px] rounded-full bg-[#41bf63]" />
              <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Service Health Overview</h2>
              <span className="ml-auto text-[9px] font-bold text-slate-500 uppercase tracking-widest">Updated just now</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#41bf63] shadow-[0_0_6px_rgba(65,191,99,0.6)]" />
            </div>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {summaryKpis.map(k => (
                <div key={k.label} className="rounded-xl border border-white/5 bg-[#13161F] p-4 flex flex-col gap-2 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between">
                    <div className={`p-1.5 rounded-lg ${k.bg}`}>
                      <k.icon className={`h-3.5 w-3.5 ${k.col}`} />
                    </div>
                    <span className={`flex items-center gap-0.5 text-[9px] font-black uppercase ${k.up ? "text-[#41bf63]" : "text-slate-500"}`}>
                      {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {k.change.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xl font-black text-white">{k.value}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{k.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Tabs ── */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === t
                    ? "bg-[#41bf63]/20 border border-[#41bf63]/40 text-[#41bf63]"
                    : "bg-white/5 border border-white/5 text-slate-500 hover:text-white"
                }`}
              >{t}</button>
            ))}
          </div>

          {/* ── Traffic Chart (All / Traffic) ── */}
          {(activeTab === "All" || activeTab === "Traffic") && (
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Network Traffic — 24h</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">Hourly data · Inbound + Outbound + Total</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#41bf63] flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" /> Peak: {peakTraffic} Gbps
                  </span>
                </div>
                <div className="p-6">
                  <TrafficSparkline />
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: "Peak Traffic",  value: `${peakTraffic} Gbps`, col: "text-[#41bf63]" },
                      { label: "Avg Inbound",   value: `${Math.round(trafficMetrics.reduce((a,b) => a + b.inbound, 0) / trafficMetrics.length)} Gbps`, col: "text-blue-400" },
                      { label: "Avg Outbound",  value: `${Math.round(trafficMetrics.reduce((a,b) => a + b.outbound, 0) / trafficMetrics.length)} Gbps`, col: "text-purple-400" },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl bg-[#0B0C10] border border-white/5 p-3 text-center">
                        <p className={`text-lg font-black ${s.col}`}>{s.value}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Playbooks Summary */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automation Playbooks</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">{activePlaybooks} of {playbooks.length} ready to deploy</p>
                </div>
                <div className="p-5 space-y-4">
                  {playbooks.map(pb => (
                    <div key={pb.title} className="flex items-center justify-between gap-3 rounded-xl bg-[#0B0C10] border border-white/5 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${pb.enabled ? "bg-[#41bf63] shadow-[0_0_6px_rgba(65,191,99,0.8)]" : "bg-slate-600"}`} />
                        <div>
                          <p className="text-[11px] font-bold text-white">{pb.title}</p>
                          <p className="text-[9px] font-bold text-slate-500 uppercase">{pb.action}</p>
                        </div>
                      </div>
                      <PlaybookStatusBar enabled={pb.enabled} />
                    </div>
                  ))}
                  <div className="mt-2 p-3 rounded-xl bg-[#41bf63]/5 border border-[#41bf63]/20 text-center">
                    <p className="text-[10px] font-black text-[#41bf63] uppercase tracking-widest">{activePlaybooks} Active · {playbooks.length - activePlaybooks} Pending</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Incidents Table (All / Incidents) ── */}
          {(activeTab === "All" || activeTab === "Incidents") && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-[2px] rounded-full bg-red-400" />
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Active Incident Log</h2>
                <span className="ml-auto text-[9px] font-bold text-slate-500 uppercase tracking-widest">{alerts.length} records</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Ticket ID", "Severity", "Device", "Issue", "Status", "Time", "Actions"].map(h => (
                        <th key={h} className="px-5 py-3.5 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map(a => (
                      <tr key={a.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4"><span className="text-[11px] font-black text-[#41bf63] font-mono">{a.id}</span></td>
                        <td className="px-5 py-4"><span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${severityColor[a.severity]}`}>{a.severity}</span></td>
                        <td className="px-5 py-4"><span className="text-[11px] font-bold text-white">{a.device}</span></td>
                        <td className="px-5 py-4"><span className="text-[11px] font-medium text-slate-400">{a.issue}</span></td>
                        <td className="px-5 py-4"><span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${statusColor[a.status]}`}>{a.status}</span></td>
                        <td className="px-5 py-4"><span className="text-[10px] font-bold text-slate-500">{a.time}</span></td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded-lg bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all"><Eye className="h-3 w-3" /></button>
                            <button className="p-1.5 rounded-lg bg-white/5 text-slate-500 hover:text-[#41bf63] hover:bg-[#41bf63]/10 transition-all"><Download className="h-3 w-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Fraud + Fiber (All / Fraud / Fiber) ── */}
          {(activeTab === "All" || activeTab === "Fraud" || activeTab === "Fiber") && (
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Fraud */}
              {(activeTab === "All" || activeTab === "Fraud") && (
                <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fraud Intelligence</h3>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${fraudDanger > 0 ? "text-red-400 bg-red-400/10 border border-red-400/20" : "text-[#41bf63] bg-[#41bf63]/10 border border-[#41bf63]/20"}`}>
                      {fraudDanger} Critical
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    {fraudAlerts.map(f => (
                      <div key={f.label} className="flex items-center gap-3 rounded-xl bg-[#0B0C10] border border-white/5 px-4 py-3">
                        <div className={`h-2 w-2 rounded-full shrink-0 ${riskColor[f.status]} ${f.status === "danger" ? "shadow-[0_0_6px_rgba(239,68,68,0.6)]" : ""}`} />
                        <span className="text-[11px] font-bold text-slate-300 flex-1">{f.label}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                          f.status === "danger"  ? "text-red-400 bg-red-400/10"    :
                          f.status === "warning" ? "text-yellow-400 bg-yellow-400/10" :
                          "text-[#41bf63] bg-[#41bf63]/10"
                        }`}>
                          {f.status === "danger" ? "High Risk" : f.status === "warning" ? "Monitoring" : "Resolved"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fiber */}
              {(activeTab === "All" || activeTab === "Fiber") && (
                <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fiber Risk Nodes</h3>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${fiberDanger > 0 ? "text-red-400 bg-red-400/10 border border-red-400/20" : "text-[#41bf63] bg-[#41bf63]/10 border border-[#41bf63]/20"}`}>
                      {fiberDanger} Critical
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    {fiberRiskNodes.map(n => (
                      <div key={n.label} className="flex items-center gap-3 rounded-xl bg-[#0B0C10] border border-white/5 px-4 py-3">
                        <div className={`h-2 w-2 rounded-full shrink-0 ${riskColor[n.status]} ${n.status === "danger" ? "shadow-[0_0_6px_rgba(239,68,68,0.6)]" : ""}`} />
                        <span className="text-[11px] font-bold text-slate-300 flex-1">{n.label}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                          n.status === "danger"  ? "text-red-400 bg-red-400/10"       :
                          n.status === "warning" ? "text-yellow-400 bg-yellow-400/10" :
                          "text-[#41bf63] bg-[#41bf63]/10"
                        }`}>
                          {n.status === "danger" ? "Critical" : n.status === "warning" ? "Warning" : "Healthy"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── Playbooks Tab standalone ── */}
          {activeTab === "Playbooks" && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-[2px] rounded-full bg-purple-400" />
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Automation Playbook Report</h2>
              </div>
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Playbook Name", "Target", "Status", "Enabled"].map(h => (
                        <th key={h} className="px-5 py-3.5 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {playbooks.map(pb => (
                      <tr key={pb.title} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4"><span className="text-[11px] font-bold text-white">{pb.title}</span></td>
                        <td className="px-5 py-4"><span className="text-[11px] font-mono text-[#41bf63]">{pb.action}</span></td>
                        <td className="px-5 py-4">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${pb.status === "Ready" ? "text-[#41bf63] bg-[#41bf63]/10 border border-[#41bf63]/20" : "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"}`}>
                            {pb.status}
                          </span>
                        </td>
                        <td className="px-5 py-4"><PlaybookStatusBar enabled={pb.enabled} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
