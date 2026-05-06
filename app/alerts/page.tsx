"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Clock3,
  Filter,
  Flame,
  Gauge,
  MessageSquare,
  MoreHorizontal,
  Search,
  SendHorizonal,
  Server,
  ShieldCheck,
  Siren,
  Ticket,
  TriangleAlert,
  UserRound
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Alerts", value: "68", icon: Bell, tone: "blue", spark: "M0 30 L35 30 L70 28 L105 30 L140 30 L180 26" },
  { label: "Open", value: "43", icon: Siren, tone: "green", spark: "M0 29 L35 27 L70 27 L105 26 L140 25 L180 24" },
  { label: "Acknowledged", value: "15", icon: Ticket, tone: "orange", spark: "M0 29 L40 29 L80 30 L120 28 L180 27" },
  { label: "Critical", value: "21", icon: TriangleAlert, tone: "red", spark: "M0 30 L35 28 L70 31 L105 29 L140 24 L180 22" },
  { label: "Major", value: "28", icon: Flame, tone: "rose", spark: "M0 28 L35 26 L70 28 L105 29 L140 25 L180 27" },
  { label: "Successes", value: "38", icon: ShieldCheck, tone: "purple", spark: "M0 30 L35 29 L70 28 L105 27 L140 29 L180 24" }
];

const alerts = [
  { id: "#1037", severity: "Critical", incident: "Node Down", node: "Router R1", issue: "Node Down", rca: "Link", team: "NOC", status: "Open" },
  { id: "#1051", severity: "Major", incident: "Gore Besalte", node: "Core Switch", issue: "Loss of Signal", rca: "-", team: "SysOps", status: "Open" },
  { id: "#1018", severity: "Major", incident: "Core Switch", node: "Server", issue: "Interface Down", rca: "-", team: "SysOps", status: "Open" },
  { id: "#1018", severity: "Critical", incident: "Disk Space Low", node: "Router", issue: "Disk Space Low", rca: "-", team: "SysOps", status: "Open" }
];

const openAlerts = [
  { id: "#1032", severity: "Critical", incident: "Gore Router", device: "Router R1", issue: "Node Down", team: "NOC" },
  { id: "#1027", severity: "Critical", incident: "Core Switch", device: "Server", issue: "Interface Down", team: "SysOps" },
  { id: "#1018", severity: "Major", incident: "Switch", device: "Server R1", issue: "Loss of Signal", team: "SysOps" },
  { id: "#1017", severity: "Major", incident: "Router SSPP Adj. Down", device: "Router R1", issue: "Fiber Degradation", team: "SysOps" }
];

const toneClasses = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  purple: "bg-violet-50 text-violet-700 border-violet-200",
  red: "bg-red-50 text-red-700 border-red-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200"
};

function SeverityBadge({ severity }: { severity: string }) {
  const critical = severity === "Critical";

  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${
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
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-bold text-black transition-all hover:border-[#0B2B32] hover:bg-slate-50"
      type="button"
    >
      {children}
    </button>
  );
}

export default function AlertsPage() {
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
              <div className="border-b border-border p-4 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0" key={metric.label}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
                    <p className="mt-1 text-2xl font-bold text-black">{metric.value}</p>
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

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <div>
                  <h2 className="text-base font-bold text-black">Incident Summary</h2>
                  <p className="text-[11px] font-semibold text-slate-600">Live incident load, impact, ownership, and escalation state.</p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-black" />
              </div>
              <div className="grid gap-0 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-5">
                {[
                  ["Ongoing Incidents", "5", "Active cases", Siren, "border-red-200 bg-red-50 text-red-700"],
                  ["Top Issue", "Node Down", "Most repeated", TriangleAlert, "border-orange-200 bg-orange-50 text-orange-700"],
                  ["Major Impact", "21", "Affected alerts", Flame, "border-rose-200 bg-rose-50 text-rose-700"],
                  ["Avg BSSA", "22", "Score index", Gauge, "border-blue-200 bg-blue-50 text-blue-700"],
                  ["Avg Response", "15 min", "Team SLA", Clock3, "border-green-200 bg-green-50 text-green-700"]
                ].map(([label, value, helper, Icon, tone]) => {
                  const SummaryIcon = Icon as typeof Siren;

                  return (
                    <div className="bg-white px-3 py-2" key={label as string}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-[9px] font-bold uppercase leading-tight tracking-wide text-slate-500">{label as string}</p>
                          <p className="mt-1 truncate text-lg font-bold leading-none text-black">{value as string}</p>
                          <p className="mt-0.5 truncate text-[10px] font-semibold leading-tight text-slate-600">{helper as string}</p>
                        </div>
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${tone as string}`}>
                          <SummaryIcon className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-2 border-t border-border bg-slate-50 px-3 py-2 md:grid-cols-3">
                {[
                  ["Primary team", "NOC", Server],
                  ["Escalation", "SysOps ready", UserRound],
                  ["Status", "Ongoing", Ticket]
                ].map(([label, value, Icon]) => {
                  const DetailIcon = Icon as typeof Server;

                  return (
                    <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-white px-2.5 py-1.5" key={label as string}>
                      <DetailIcon className="h-3.5 w-3.5 shrink-0 text-[#0B2B32]" />
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-bold uppercase tracking-wide text-slate-500">{label as string}</p>
                        <p className="truncate text-xs font-bold text-black">{value as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-black">Alerts Activity</h2>
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs font-bold text-slate-700">Live</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <MiniButton>Servers</MiniButton>
                    <MiniButton>Last 24 hours <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                    <MiniButton>Time</MiniButton>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
                  <MiniButton>Status <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Device <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Assigned Team <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Group By</MiniButton>
                  <span className="rounded-md border border-[#0B2B32]/30 bg-[#0B2B32]/10 px-2.5 py-1 text-xs font-bold text-black">
                    Clusters
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-xs">
                  <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                    <tr>
                      {["ID", "Severity", "Incident", "Affected Node", "Issue", "RCA", "Assigned Team", "Status"].map((head) => (
                        <th className="px-3 py-2 font-bold" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-[#0B2B32]/5">
                      <td className="px-3 py-3 font-bold text-black">#1033</td>
                      <td className="px-3 py-3"><SeverityBadge severity="Critical" /></td>
                      <td className="px-3 py-3 font-bold text-black">Router R1</td>
                      <td className="px-3 py-3 font-semibold text-black">Router R1</td>
                      <td className="px-3 py-3 font-semibold text-black">Node Down</td>
                      <td className="px-3 py-3 font-bold text-red-700">Link</td>
                      <td className="px-3 py-3 font-bold text-orange-700">NOC</td>
                      <td className="px-3 py-3 font-bold text-orange-700">Open</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3" />
                      <td className="px-3 py-3">
                        <span className="rounded-md border border-border bg-white px-3 py-2 text-xs font-bold text-black shadow-sm">
                          Cluster #2005
                        </span>
                      </td>
                      <td className="px-3 py-3" colSpan={6}>
                        <div className="relative h-9 rounded-md bg-slate-50">
                          <span className="absolute left-0 right-0 top-1/2 h-px bg-[#0B2B32]/30" />
                          <span className="absolute left-[22%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-green-500" />
                          <span className="absolute left-[53%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500" />
                          <span className="absolute left-[70%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                          <span className="absolute right-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                        </div>
                      </td>
                    </tr>
                    {alerts.map((alert, index) => (
                      <tr className="transition hover:bg-slate-50" key={`${alert.id}-${index}`}>
                        <td className="px-3 py-2 font-bold text-black">{alert.id}</td>
                        <td className="px-3 py-2"><SeverityBadge severity={alert.severity} /></td>
                        <td className="px-3 py-2 font-semibold text-black">{alert.incident}</td>
                        <td className="px-3 py-2 font-semibold text-black">{alert.node}</td>
                        <td className="px-3 py-2 font-semibold text-black">{alert.issue}</td>
                        <td className="px-3 py-2 font-semibold text-slate-700">{alert.rca}</td>
                        <td className="px-3 py-2 font-semibold text-black">{alert.team}</td>
                        <td className="px-3 py-2 font-bold text-orange-700">{alert.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-3">
                <h2 className="text-lg font-bold text-black">Open Alerts (43)</h2>
                <div className="flex gap-2">
                  <MiniButton>Now <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Filter <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] table-fixed text-left text-xs">
                  <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                    <tr>
                      {["ID", "Severity", "Incident", "Device", "Issue", "RCA", "Assigned Team", "Status"].map((head) => (
                        <th className="px-2 py-2 font-bold" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {openAlerts.map((alert) => (
                      <tr className="hover:bg-slate-50" key={alert.id}>
                        <td className="px-2 py-2 font-bold text-black">{alert.id}</td>
                        <td className="px-2 py-2"><SeverityBadge severity={alert.severity} /></td>
                        <td className="px-2 py-2 font-semibold text-black">{alert.incident}</td>
                        <td className="px-2 py-2 font-semibold text-black">{alert.device}</td>
                        <td className="px-2 py-2 font-bold text-orange-700">{alert.issue}</td>
                        <td className="px-2 py-2 font-semibold text-red-700">Alert</td>
                        <td className="px-2 py-2 font-semibold text-black">{alert.team}</td>
                        <td className="px-2 py-2 font-bold text-orange-700">Open</td>
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
                <h2 className="text-lg font-bold text-black">Incident Details</h2>
                <MoreHorizontal className="h-5 w-5 text-black" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-700">Cluster ID <span className="text-xl font-bold text-black">#2005</span></p>
                <div className="mt-3 rounded-lg border border-border bg-white p-3">
                  <p className="text-sm font-semibold text-black">Today 10:32 AM</p>
                  <p className="mt-1 text-sm font-bold text-orange-700">Status: Ongoing</p>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-black">Root Cause Identified:</p>
                  <div className="mt-3 rounded-lg border border-border bg-slate-50 p-3 text-sm font-bold text-black">
                    Router R1
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-black">Impacted Nodes:</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["Fieer Link A-B", "Switch-S2"].map((node) => (
                      <span className="rounded-lg border border-border bg-white p-2 text-xs font-bold text-black" key={node}>
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button className="h-10 rounded-lg bg-orange-500 text-sm font-bold text-white hover:bg-orange-600" type="button">
                    ACKNOWLEDGE
                  </button>
                  <button className="h-10 rounded-lg bg-[#0B2B32] text-sm font-bold text-white hover:bg-[#123f49]" type="button">
                    RESOLVE
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-lg font-bold text-black">Activity Timeline</h2>
                <MoreHorizontal className="h-5 w-5 text-black" />
              </div>
              <div className="space-y-4 p-4">
                {[
                  ["Frank (SysOps Lead)", "8m ago", "Acknowledged #2005, investigating root cause ...", UserRound],
                  ["Jien Ticket Created", "6th stage", "Ticket linked to cluster #2005", Ticket],
                  ["Alert Cluster Created", "7m ago", "Related alerts grouped automatically", Bell]
                ].map(([title, meta, body, Icon], index) => {
                  const TimelineIcon = Icon as typeof UserRound;

                  return (
                    <div className="relative flex gap-3" key={title as string}>
                      {index < 2 && <span className="absolute left-4 top-9 h-full border-l border-dashed border-slate-300" />}
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B2B32] text-white">
                        <TimelineIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-black">{title as string}</p>
                        <p className="text-xs font-bold text-slate-600">{meta as string}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">{body as string}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="relative mt-2">
                  <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-10 text-sm font-semibold text-black outline-none placeholder:text-slate-500 focus:border-[#0B2B32]"
                    placeholder="Comment..."
                  />
                  <SendHorizonal className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0B2B32]" />
                </div>
              </div>
            </div>
          </aside>
        </section>
        </main>
      </div>
    </div>
  );
}
