"use client";

import { useState } from "react";
import {
  Bell,
  BrainCircuit,
  ChevronDown,
  Clock3,
  Filter,
  GitBranch,
  MoreHorizontal,
  Network,
  Play,
  Router,
  Search,
  Server,
  ShieldCheck,
  Siren,
  Sparkles,
  TriangleAlert,
  UsersRound,
  Zap
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const summaryMetrics = [
  { label: "Current", value: "7", helper: "active RCA cases", icon: Network, tone: "blue", spark: "M0 28 L35 27 L70 27 L105 25 L140 26 L180 24" },
  { label: "Today's", value: "16", helper: "clusters analyzed", icon: Bell, tone: "orange", spark: "M0 29 L35 29 L70 28 L105 29 L140 25 L180 24" },
  { label: "Success Rate", value: "88%", helper: "auto diagnosis", icon: ShieldCheck, tone: "green", spark: "M0 30 L35 29 L70 29 L105 27 L140 25 L180 21" },
  { label: "Avg Time", value: "5 min", helper: "to root cause", icon: Clock3, tone: "blue", spark: "M0 27 L35 28 L70 28 L105 26 L140 19 L180 21" },
  { label: "Affected Services", value: "3", helper: "service impact", icon: Siren, tone: "red", spark: "M0 28 L35 27 L70 25 L105 22 L140 18 L180 16" }
];

const toneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700"
};

const impactedServices = [
  ["Internet Gateway", "Degraded", "w-[82%]", "bg-green-500"],
  ["VoIP Service", "Unavailable", "w-[58%]", "bg-orange-400"],
  ["Internal IT Apps", "Disrupted", "w-[64%]", "bg-yellow-400"]
];

const impactRows = [
  ["Fiber Link A-B", "Degraded", "text-orange-700"],
  ["Internet Gateway", "Service Down", "text-red-700"],
  ["Switch S2", "Disrupted", "text-orange-700"],
  ["VoIP Service", "Unavailable", "text-red-700"]
];

const activityRows = [
  ["#1023", "Critical", "RCA Engine identified root cause: Router R1", "1 min ago", "NOC", "Open"],
  ["#1021", "Critical", "15 alerts detected from log anomalies", "5 min ago", "NOC", "Open"],
  ["#1018", "Major", "Dependency path traced to Node R1", "6 min ago", "NOC", "Open"],
  ["#1016", "Critical", "All logs ingested from cluster #2005", "7 min ago", "NOC", "Open"]
];

function SeverityPill({ severity }: { severity: string }) {
  const critical = severity === "Critical";

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-bold ${
        critical ? "border-red-300 bg-red-50 text-red-700" : "border-orange-300 bg-orange-50 text-orange-700"
      }`}
    >
      {severity}
    </span>
  );
}

function MiniButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-bold text-black transition hover:border-[#0B2B32] hover:bg-slate-50"
      type="button"
    >
      {children}
    </button>
  );
}

function RcaMap() {
  const rcaNodes = [
    { label: "Cluster-1", meta: "5 major", x: 20, y: 24, status: "warning", icon: GitBranch },
    { label: "Cluster-2", meta: "12 critical", x: 20, y: 50, status: "critical", icon: GitBranch },
    { label: "Cluster-5", meta: "3 minor", x: 20, y: 73, status: "warning", icon: GitBranch },
    { label: "Router R1", meta: "root cause", x: 50, y: 50, status: "critical", icon: Router, central: true },
    { label: "Switch S2", meta: "healthy", x: 80, y: 24, status: "healthy", icon: Server },
    { label: "Gateway", meta: "down", x: 80, y: 50, status: "critical", icon: Network },
    { label: "VoIP", meta: "degraded", x: 80, y: 73, status: "warning", icon: Server }
  ];

  const rcaLinks = [
    { from: rcaNodes[0], to: rcaNodes[3], status: "warning", label: "71%", duration: "3s" },
    { from: rcaNodes[1], to: rcaNodes[3], status: "critical", label: "94%", duration: "2.2s" },
    { from: rcaNodes[2], to: rcaNodes[3], status: "warning", label: "52%", duration: "3.4s" },
    { from: rcaNodes[3], to: rcaNodes[4], status: "healthy", label: "21ms", duration: "3.1s" },
    { from: rcaNodes[3], to: rcaNodes[5], status: "critical", label: "down", duration: "2.1s" },
    { from: rcaNodes[3], to: rcaNodes[6], status: "warning", label: "63%", duration: "3.3s" }
  ];

  const styles = {
    critical: { bg: "bg-danger", line: "#DC2626", fill: "#DC2626", text: "text-danger" },
    healthy: { bg: "bg-success", line: "#16A34A", fill: "#16A34A", text: "text-success" },
    warning: { bg: "bg-warning", line: "#D97706", fill: "#D97706", text: "text-warning" }
  };

  return (
    <div className="rounded-lg border border-border bg-white p-5 text-black shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-black">Real-time RCA Topology</h2>
          <p className="mt-1 text-sm font-semibold text-slate-700">Root cause path, impacted services, and alarm cluster flow</p>
        </div>
        <div className="rounded-md border border-success/30 bg-success/10 px-3 py-1 text-xs font-bold text-success">
          Live 12s
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Clusters</p>
          <p className="mt-1 text-lg font-bold text-black">3</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Root Confidence</p>
          <p className="mt-1 text-lg font-bold text-danger">90%</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Impacted</p>
          <p className="mt-1 text-lg font-bold text-black">3</p>
        </div>
      </div>

      <div className="relative mt-4 h-[420px] isolate overflow-hidden rounded-lg border border-slate-300 bg-slate-50">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" role="img" viewBox="0 0 100 100">
          <defs>
            <pattern height="10" id="rootCauseGrid" patternUnits="userSpaceOnUse" width="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#D8E0EA" strokeWidth="0.42" />
            </pattern>
            <pattern height="5" id="rootCauseDots" patternUnits="userSpaceOnUse" width="5">
              <circle cx="1" cy="1" fill="#94A3B8" opacity="0.32" r="0.22" />
            </pattern>
            <radialGradient cx="50%" cy="48%" id="rootCauseWash" r="58%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.65" />
              <stop offset="48%" stopColor="#F8FAFC" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="rootCausePanelShade" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <rect fill="url(#rootCauseWash)" height="100" width="100" />
          <rect fill="url(#rootCauseGrid)" height="100" opacity="0.9" width="100" />
          <rect fill="url(#rootCauseDots)" height="100" opacity="0.65" width="100" />
          <rect fill="url(#rootCausePanelShade)" height="100" width="100" />
          {rcaLinks.map((link) => {
            const tone = styles[link.status as keyof typeof styles];
            const isCritical = link.status === "critical";
            return (
              <g key={`${link.from.label}-${link.to.label}`}>
                <line
                  className="topology-link"
                  stroke={tone.line}
                  strokeLinecap="round"
                  strokeOpacity={isCritical ? "0.62" : "0.42"}
                  strokeWidth={isCritical ? "1.8" : "1.35"}
                  x1={link.from.x}
                  x2={link.to.x}
                  y1={link.from.y}
                  y2={link.to.y}
                />
                <circle fill={tone.fill} r={isCritical ? "1.35" : "1.1"}>
                  <animate attributeName="cx" dur={link.duration} repeatCount="indefinite" values={`${link.from.x};${link.to.x}`} />
                  <animate attributeName="cy" dur={link.duration} repeatCount="indefinite" values={`${link.from.y};${link.to.y}`} />
                </circle>
                <text
                  fill="#0F172A"
                  fontSize="2.6"
                  fontWeight="700"
                  textAnchor="middle"
                  x={(link.from.x + link.to.x) / 2}
                  y={(link.from.y + link.to.y) / 2 - 2}
                >
                  {link.label}
                </text>
              </g>
            );
          })}
        </svg>

        {rcaNodes.map((node) => {
          const tone = styles[node.status as keyof typeof styles];
          const NodeIcon = node.icon;

          return (
            <div
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              key={node.label}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="relative">
                <span className={`topology-pulse absolute inset-0 rounded-full ${tone.bg}`} />
                <span
                  className={`relative flex items-center justify-center rounded-full border-2 border-white bg-white shadow-md ${
                    node.central ? "h-14 w-14" : "h-11 w-11"
                  }`}
                >
                  <NodeIcon className={`h-5 w-5 ${tone.text}`} />
                </span>
              </div>
              <div className="min-w-[86px] rounded-md border border-border bg-white px-2 py-1 text-center text-[11px] font-bold leading-tight text-black shadow-sm">
                <p>{node.label}</p>
                <p className="text-[10px] font-semibold text-slate-600">{node.meta}</p>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center gap-3 rounded-md border border-border bg-white/95 px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Healthy</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Warning</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-danger" /> Critical</span>
          <span className="ml-auto text-slate-500">Updated 12s ago</span>
        </div>
      </div>
    </div>
  );
}

export default function RootCausePage() {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 text-black bg-white">

        <section className="mt-4 rounded-lg border border-border bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#0B2B32]/20 bg-[#0B2B32]/10 text-[#0B2B32]">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-black">RCA Command View</h2>
                <p className="text-sm font-semibold text-slate-700">Cluster #2005, automated diagnosis, and service impact.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">Critical</span>
              <span className="rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">90% Confidence</span>
              <span className="rounded-md border border-border bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">Updated 12s ago</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid overflow-hidden rounded-lg border border-border bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-5">
          {summaryMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div className="border-b border-border p-4 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0" key={metric.label}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
                    <p className="mt-1 text-2xl font-bold text-black">{metric.value}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{metric.helper}</p>
                  </div>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${toneClasses[metric.tone as keyof typeof toneClasses]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <svg className="mt-3 h-5 w-full" preserveAspectRatio="none" viewBox="0 0 180 34">
                  <path d={metric.spark} fill="none" stroke="#0B2B32" strokeLinecap="round" strokeWidth="1.8" />
                </svg>
              </div>
            );
          })}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-base font-bold text-black">Incident Details</h2>
              <MoreHorizontal className="h-5 w-5 text-black" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cluster ID</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xl font-bold text-black">#2005</span>
                    <SeverityPill severity="Critical" />
                  </div>
                </div>
                <span className="rounded-md border border-border bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700">ID #1023</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div className="rounded-md border border-border bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Dependency Chain</p>
                  <p className="mt-1 text-sm font-bold text-black">Fiber Link A-B / Switch S2</p>
                </div>
                <div className="rounded-md border border-red-200 bg-red-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-700">Failed Node</p>
                  <p className="mt-1 text-sm font-bold text-black">Router R1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-base font-bold text-black">Impact Analysis</h2>
              <MoreHorizontal className="h-5 w-5 text-black" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3">
                <Zap className="h-5 w-5 text-orange-700" />
                <div>
                  <p className="text-sm font-bold text-black">Route dependency degraded</p>
                  <p className="text-xs font-semibold text-orange-700">4 downstream objects affected</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {impactRows.map(([name, status, color]) => (
                  <div className="rounded-md border border-border bg-slate-50 px-3 py-2" key={name}>
                    <p className="text-xs font-bold text-black">{name}</p>
                    <p className={`mt-0.5 text-[11px] font-bold ${color}`}>{status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-base font-bold text-black">Suggested Action</h2>
            </div>
            <div className="p-4">
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-blue-700" />
                  <div>
                    <p className="text-sm font-bold text-black">Restart Router R1</p>
                    <p className="text-xs font-semibold text-blue-700">Confidence: 90%</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Fiber Link A-B", "Switch S2"].map((node) => (
                  <span className="rounded-md border border-border bg-slate-50 px-2 py-2 text-xs font-bold text-black" key={node}>
                    {node}
                  </span>
                ))}
              </div>
              <button className="mt-3 h-10 w-full rounded-lg bg-[#0B2B32] text-sm font-bold text-white hover:bg-[#123f49]" type="button">
                Execute Action
              </button>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <RcaMap />
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-black">RCA Timeline</h2>
              </div>
              <div className="space-y-4 p-4">
                {[
                  ["RCA engine identified Router R1", "1 min ago"],
                  ["13 alerts detected from log anomalies", "3 min ago"],
                  ["Dependency path traced to Node R1", "7 min ago"]
                ].map(([title, time], index) => (
                  <div className="relative flex gap-3" key={title}>
                    {index < 2 && <span className="absolute left-3 top-7 h-full border-l border-dashed border-slate-300" />}
                    <span className="relative z-10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0B2B32] text-white">
                      <Play className="h-3 w-3" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-black">{title}</p>
                      <p className="text-xs font-semibold text-slate-600">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-black">Impacted Services</h2>
              </div>
              <div className="space-y-2 p-4">
                {impactedServices.map(([service, status, width, color]) => (
                  <div className="rounded-md border border-border bg-white p-2" key={service}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-black">{service}</span>
                      <span className="text-slate-600">{status}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <span className={`block h-full rounded-full ${width} ${color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-4 rounded-lg border border-border bg-white shadow-soft">
          <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <span className="rounded-md bg-[#0B2B32] px-3 py-1 text-xs font-bold text-white">RCA Activity</span>
              <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-slate-700">Model Output</span>
            </div>
            <div className="flex gap-2">
              <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
              <MiniButton>Latest <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                <tr>
                  {["ID", "Severity", "Incident", "Issue", "Assigned Team", "Status"].map((head) => (
                    <th className="px-3 py-2 font-bold" key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activityRows.map(([id, severity, incident, issue, team, status]) => (
                  <tr className="hover:bg-slate-50" key={`${id}-${issue}`}>
                    <td className="px-3 py-2 font-bold text-black">{id}</td>
                    <td className="px-3 py-2"><SeverityPill severity={severity} /></td>
                    <td className="px-3 py-2 font-semibold text-black">{incident}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{issue}</td>
                    <td className="px-3 py-2 font-bold text-black">{team}</td>
                    <td className="px-3 py-2 font-bold text-orange-700">{status}</td>
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
