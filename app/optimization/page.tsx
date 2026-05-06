"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Filter,
  Gauge,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Route,
  Search,
  Settings,
  Signal,
  SlidersHorizontal,
  Sparkles,
  Timer,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Optimization Score", value: "91.8%", delta: "+4.2%", tone: "green", icon: Gauge },
  { label: "Traffic Savings", value: "18.4%", delta: "+2.1%", tone: "blue", icon: Route },
  { label: "Congested Links", value: "7", delta: "-3 today", tone: "orange", icon: Signal },
  { label: "Pending Actions", value: "12", delta: "5 auto", tone: "purple", icon: Sparkles },
  { label: "Avg Plan Time", value: "1.7 min", delta: "-18%", tone: "green", icon: Timer }
];

const recommendations = [
  { id: "OPT-2201", title: "Reroute BGP edge traffic", domain: "Routing", status: "Ready", impact: "High", saving: "12.5%", confidence: 94, region: "US-West", window: "Now" },
  { id: "OPT-2207", title: "Shift load to low-utilization carrier", domain: "Capacity", status: "Running", impact: "Medium", saving: "8.1%", confidence: 88, region: "Central", window: "14 min" },
  { id: "OPT-2214", title: "Tune fiber path protection", domain: "Fiber", status: "Review", impact: "High", saving: "10.2%", confidence: 82, region: "US-East", window: "1h" },
  { id: "OPT-2220", title: "Reduce duplicate telemetry polling", domain: "Compute", status: "Ready", impact: "Low", saving: "4.8%", confidence: 91, region: "Global", window: "Today" },
  { id: "OPT-2233", title: "Rebalance fraud inspection queue", domain: "Security", status: "Queued", impact: "Medium", saving: "6.7%", confidence: 86, region: "Central", window: "34 min" }
];

const toneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  purple: "border-violet-200 bg-violet-50 text-violet-700",
  red: "border-red-200 bg-red-50 text-red-700"
};

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
  const tone = status === "Ready" || status === "Applied" ? "border-green-200 bg-green-50 text-green-700" : status === "Running" ? "border-blue-200 bg-blue-50 text-blue-700" : status === "Review" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : "border-slate-200 bg-slate-50 text-slate-700";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

export default function OptimizationPage() {
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(recommendations[0].id);
  const [tick, setTick] = useState(0);
  const [autoApply, setAutoApply] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesQuery = `${item.id} ${item.title} ${item.domain} ${item.region}`.toLowerCase().includes(query.toLowerCase());
      const matchesDomain = domainFilter === "All" || item.domain === domainFilter;
      return matchesQuery && matchesDomain;
    });
  }, [query, domainFilter]);

  const selectedRecommendation = recommendations.find((item) => item.id === selectedId) ?? recommendations[0];

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 text-black bg-white">

        <section className="mt-3 grid gap-2 xl:grid-cols-[minmax(0,1fr)_150px]">
          <div className="grid overflow-hidden rounded-lg border border-border bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-5">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div className="border-b border-border px-3 py-2 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0" key={metric.label}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-bold uppercase leading-tight tracking-wide text-slate-500">{metric.label}</p>
                      <p className="mt-1 text-lg font-bold leading-none text-black">{metric.value}</p>
                      <p className="mt-0.5 text-[10px] font-bold leading-tight text-slate-600">{metric.delta}</p>
                    </div>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${toneClasses[metric.tone as keyof typeof toneClasses]}`}>
                      <Icon className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0B2B32] px-3 text-xs font-bold text-white shadow-soft hover:bg-[#123f49]" type="button">
            <Plus className="h-3.5 w-3.5" /> New Plan
          </button>
        </section>

        <section className="mt-4 rounded-lg border border-border bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-black">Optimization Control Center</h2>
              <p className="text-sm font-semibold text-slate-700">Prioritize routing, capacity, compute, and policy changes with measurable operational impact.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <MiniButton><RefreshCw className="h-3.5 w-3.5" /> Recalculate</MiniButton>
              <MiniButton><SlidersHorizontal className="h-3.5 w-3.5" /> Constraints</MiniButton>
              <button
                className={`inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-bold ${autoApply ? "border-green-200 bg-green-50 text-green-700" : "border-slate-300 bg-white text-slate-700"}`}
                onClick={() => setAutoApply((value) => !value)}
                type="button"
              >
                Auto Apply {autoApply ? "On" : "Off"}
              </button>
              <span className="rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Live {tick % 60}s</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
              <div className="rounded-lg border border-border bg-white shadow-soft">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <div>
                    <h3 className="text-base font-bold text-black">Traffic Efficiency Trend</h3>
                    <p className="text-xs font-semibold text-slate-600">Savings and congestion movement by planning window.</p>
                  </div>
                  <MiniButton>24 Hours <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                </div>
                <div className="h-72 p-4">
                  <div className="relative h-full overflow-hidden rounded-lg border border-border bg-slate-50">
                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <pattern height="10" id="optimizationGrid" patternUnits="userSpaceOnUse" width="10">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#CBD5E1" strokeWidth="0.35" />
                        </pattern>
                        <linearGradient id="savingArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.03" />
                        </linearGradient>
                      </defs>
                      <rect fill="#F8FAFC" height="100" width="100" />
                      <rect fill="url(#optimizationGrid)" height="100" opacity="0.9" width="100" />
                      <path d="M0 70 C13 68 18 58 28 60 S46 48 56 50 S73 34 84 38 S95 28 100 24 L100 100 L0 100 Z" fill="url(#savingArea)" />
                      <path d="M0 70 C13 68 18 58 28 60 S46 48 56 50 S73 34 84 38 S95 28 100 24" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="2" />
                      <path d="M0 42 C16 48 30 35 44 39 S64 30 80 33 S93 26 100 28" fill="none" stroke="#2563EB" strokeDasharray="4 3" strokeLinecap="round" strokeWidth="1.5" />
                    </svg>
                    <div className="absolute bottom-3 left-4 flex gap-4 text-xs font-bold text-slate-700">
                      <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" /> Savings</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600" /> Capacity headroom</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-white shadow-soft">
                <div className="border-b border-border p-4">
                  <h3 className="text-base font-bold text-black">Optimization Mix</h3>
                </div>
                <div className="space-y-3 p-4">
                  {[
                    ["Routing", "34%", "bg-blue-500"],
                    ["Capacity", "27%", "bg-green-500"],
                    ["Fiber", "18%", "bg-orange-500"],
                    ["Compute", "13%", "bg-violet-500"],
                    ["Security", "8%", "bg-red-500"]
                  ].map(([label, value, color]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-black">{label}</span>
                        <span className="text-slate-600">{value}</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-slate-100"><span className={`block h-full rounded-full ${color}`} style={{ width: value }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex flex-col gap-3 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-base font-bold text-black">Optimization Recommendations ({filteredRecommendations.length})</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="relative min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm font-semibold outline-none focus:border-[#0B2B32]"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search recommendations..."
                      value={query}
                    />
                  </div>
                  <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold" onChange={(event) => setDomainFilter(event.target.value)} value={domainFilter}>
                    {["All", "Routing", "Capacity", "Fiber", "Compute", "Security"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-xs">
                  <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                    <tr>{["Plan", "Domain", "Status", "Impact", "Savings", "Confidence", "Region", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRecommendations.map((item) => (
                      <tr className={`cursor-pointer hover:bg-slate-50 ${selectedRecommendation.id === item.id ? "bg-[#0B2B32]/5" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}>
                        <td className="px-3 py-2">
                          <p className="font-bold text-black">{item.title}</p>
                          <p className="text-[11px] font-semibold text-slate-500">{item.id} / Window {item.window}</p>
                        </td>
                        <td className="px-3 py-2"><span className="rounded-md border border-border bg-slate-50 px-2 py-0.5 font-bold text-slate-700">{item.domain}</span></td>
                        <td className="px-3 py-2"><StatusBadge status={item.status} /></td>
                        <td className="px-3 py-2 font-bold text-black">{item.impact}</td>
                        <td className="px-3 py-2 font-bold text-green-700">{item.saving}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-20 rounded-full bg-slate-100"><span className="block h-full rounded-full bg-[#0B2B32]" style={{ width: `${item.confidence}%` }} /></span>
                            <span className="font-bold text-black">{item.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 font-semibold text-black">{item.region}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2 text-slate-500">
                            <Play className="h-4 w-4 text-[#0B2B32]" />
                            <Settings className="h-4 w-4" />
                            <MoreHorizontal className="h-4 w-4" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="text-base font-bold text-black">Plan Details</h3>
                <StatusBadge status={selectedRecommendation.status} />
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p className="text-lg font-bold text-black">{selectedRecommendation.title}</p>
                  <p className="text-xs font-semibold text-slate-600">{selectedRecommendation.id} / {selectedRecommendation.domain} / {selectedRecommendation.region}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-border bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Savings</p>
                    <p className="text-xl font-bold text-green-700">{selectedRecommendation.saving}</p>
                  </div>
                  <div className="rounded-md border border-border bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Confidence</p>
                    <p className="text-xl font-bold text-black">{selectedRecommendation.confidence}%</p>
                  </div>
                </div>
                <div className="rounded-md border border-border bg-slate-50 p-3 text-xs font-bold">
                  <p>Impact: <span className="text-black">{selectedRecommendation.impact}</span></p>
                  <p className="mt-2">Apply Window: <span className="text-black">{selectedRecommendation.window}</span></p>
                  <p className="mt-2">Rollback Plan: <span className="text-black">Auto snapshot and route restore</span></p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-9 rounded-md bg-[#0B2B32] text-xs font-bold text-white" type="button">Apply Plan</button>
                  <button className="h-9 rounded-md border border-slate-300 bg-white text-xs font-bold text-black" type="button">Simulate</button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h3 className="text-base font-bold text-black">Live Optimization Queue</h3>
              </div>
              <div className="space-y-3 p-4">
                {[
                  ["Capacity planner recalculated link headroom", "2 min ago", "Applied"],
                  ["Routing optimizer found lower latency path", "8 min ago", "Ready"],
                  ["Fiber optimizer requires approval", "16 min ago", "Review"],
                  ["Compute scheduler shifted telemetry load", "24 min ago", "Applied"]
                ].map(([title, time, status]) => (
                  <div className="flex items-start justify-between gap-3 rounded-md border border-border bg-slate-50 p-3" key={title}>
                    <div>
                      <p className="text-xs font-bold text-black">{title}</p>
                      <p className="mt-1 text-[11px] font-semibold text-slate-600">{time}</p>
                    </div>
                    <StatusBadge status={status} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
        </main>
      </div>
    </div>
  );
}
