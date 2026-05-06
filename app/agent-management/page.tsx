"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Filter,
  GitBranch,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
  TriangleAlert,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Agents", value: "160", delta: "+4 online", tone: "blue", icon: Bot },
  { label: "Active Agents", value: "156", delta: "97.5%", tone: "green", icon: CheckCircle2 },
  { label: "Avg Response", value: "240 ms", delta: "-12 ms", tone: "purple", icon: Timer },
  { label: "Policy Blocks", value: "8", delta: "today", tone: "orange", icon: ShieldCheck },
  { label: "Needs Review", value: "4", delta: "2 critical", tone: "red", icon: TriangleAlert }
];

const agents = [
  { id: "AG-101", name: "RCA Analysis Agent", type: "Root Cause", status: "Active", health: 98, region: "US-West", tasks: 42, latency: "210 ms", owner: "NOC Core" },
  { id: "AG-118", name: "Fiber Drift Agent", type: "Fiber", status: "Active", health: 94, region: "US-East", tasks: 31, latency: "260 ms", owner: "Fiber Ops" },
  { id: "AG-126", name: "Fraud Pattern Agent", type: "Security", status: "Active", health: 91, region: "Central", tasks: 27, latency: "290 ms", owner: "Fraud Desk" },
  { id: "AG-144", name: "Topology Mapper", type: "Network", status: "Training", health: 82, region: "Global", tasks: 18, latency: "340 ms", owner: "Planning" },
  { id: "AG-152", name: "Playbook Executor", type: "Automation", status: "Paused", health: 73, region: "US-West", tasks: 12, latency: "410 ms", owner: "Automation" }
];

const activityLog = [
  ["RCA Analysis Agent completed incident correlation", "2 min ago", "Success"],
  ["Fiber Drift Agent detected attenuation trend", "9 min ago", "Warning"],
  ["Playbook Executor waiting for approval rule", "15 min ago", "Paused"],
  ["Fraud Pattern Agent refreshed model signals", "22 min ago", "Success"]
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
  const tone = status === "Active" || status === "Success" ? "border-green-200 bg-green-50 text-green-700" : status === "Training" || status === "Warning" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : status === "Paused" ? "border-slate-200 bg-slate-50 text-slate-700" : "border-red-200 bg-red-50 text-red-700";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

export default function AgentManagementPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesQuery = `${agent.id} ${agent.name} ${agent.type} ${agent.owner}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || agent.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId) ?? agents[0];

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
            <Plus className="h-3.5 w-3.5" /> Add Agent
          </button>
        </section>

        <section className="mt-4 rounded-lg border border-border bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-black">Agent Control Center</h2>
              <p className="text-sm font-semibold text-slate-700">Monitor AI agents, runtime health, policy status, and operational workload.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <MiniButton><RefreshCw className="h-3.5 w-3.5" /> Sync Registry</MiniButton>
              <MiniButton><SlidersHorizontal className="h-3.5 w-3.5" /> Policies</MiniButton>
              <span className="rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Live {tick % 60}s</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex flex-col gap-3 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-base font-bold text-black">Agent Registry ({filteredAgents.length})</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="relative min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm font-semibold outline-none focus:border-[#0B2B32]"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search agents..."
                      value={query}
                    />
                  </div>
                  <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                    {["All", "Active", "Training", "Paused"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-xs">
                  <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                    <tr>{["Agent", "Type", "Status", "Health", "Region", "Tasks", "Latency", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAgents.map((agent) => (
                      <tr className={`cursor-pointer hover:bg-slate-50 ${selectedAgent.id === agent.id ? "bg-[#0B2B32]/5" : ""}`} key={agent.id} onClick={() => setSelectedAgentId(agent.id)}>
                        <td className="px-3 py-2">
                          <p className="font-bold text-black">{agent.name}</p>
                          <p className="text-[11px] font-semibold text-slate-500">{agent.id} / {agent.owner}</p>
                        </td>
                        <td className="px-3 py-2"><span className="rounded-md border border-border bg-slate-50 px-2 py-0.5 font-bold text-slate-700">{agent.type}</span></td>
                        <td className="px-3 py-2"><StatusBadge status={agent.status} /></td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-20 rounded-full bg-slate-100"><span className="block h-full rounded-full bg-green-500" style={{ width: `${agent.health}%` }} /></span>
                            <span className="font-bold text-black">{agent.health}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 font-semibold text-black">{agent.region}</td>
                        <td className="px-3 py-2 font-bold text-black">{agent.tasks}</td>
                        <td className="px-3 py-2 font-semibold text-slate-700">{agent.latency}</td>
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

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-border bg-white shadow-soft">
                <div className="border-b border-border p-4">
                  <h3 className="text-base font-bold text-black">Runtime Pipeline</h3>
                </div>
                <div className="space-y-3 p-4">
                  {[
                    ["Input Queue", "Events normalized", "98%"],
                    ["Reasoning Core", "Policies applied", "91%"],
                    ["Action Router", "Tool calls gated", "86%"],
                    ["Audit Writer", "Evidence stored", "100%"]
                  ].map(([name, detail, value]) => (
                    <div className="rounded-md border border-border bg-slate-50 p-3" key={name}>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-black">{name}</span>
                        <span className="text-slate-600">{value}</span>
                      </div>
                      <p className="mt-1 text-[11px] font-semibold text-slate-600">{detail}</p>
                      <div className="mt-2 h-2 rounded-full bg-white"><span className="block h-full rounded-full bg-[#0B2B32]" style={{ width: value }} /></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-white shadow-soft">
                <div className="border-b border-border p-4">
                  <h3 className="text-base font-bold text-black">Capability Map</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {[
                    ["RCA", "38 agents", BrainIcon],
                    ["Fiber", "29 agents", Activity],
                    ["Security", "34 agents", ShieldCheck],
                    ["Automation", "55 agents", GitBranch]
                  ].map(([title, count, Icon]) => (
                    <div className="rounded-md border border-border bg-slate-50 p-3" key={title as string}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-black">{title as string}</p>
                        <Icon className="h-4 w-4 text-[#0B2B32]" />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-slate-600">{count as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="text-base font-bold text-black">Agent Details</h3>
                <StatusBadge status={selectedAgent.status} />
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p className="text-lg font-bold text-black">{selectedAgent.name}</p>
                  <p className="text-xs font-semibold text-slate-600">{selectedAgent.id} / {selectedAgent.type} / {selectedAgent.region}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-border bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Health</p>
                    <p className="text-xl font-bold text-green-700">{selectedAgent.health}%</p>
                  </div>
                  <div className="rounded-md border border-border bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Tasks</p>
                    <p className="text-xl font-bold text-black">{selectedAgent.tasks + (tick % 3)}</p>
                  </div>
                </div>
                <div className="rounded-md border border-border bg-slate-50 p-3 text-xs font-bold">
                  <p>Owner: <span className="text-black">{selectedAgent.owner}</span></p>
                  <p className="mt-2">Latency: <span className="text-black">{selectedAgent.latency}</span></p>
                  <p className="mt-2">Last Heartbeat: <span className="text-black">{tick % 9}s ago</span></p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-9 rounded-md bg-[#0B2B32] text-xs font-bold text-white" type="button">Restart Agent</button>
                  <button className="h-9 rounded-md border border-slate-300 bg-white text-xs font-bold text-black" type="button">Open Config</button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h3 className="text-base font-bold text-black">Recent Agent Activity</h3>
              </div>
              <div className="space-y-3 p-4">
                {activityLog.map(([title, time, status]) => (
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

function BrainIcon({ className }: { className?: string }) {
  return <Cpu className={className} />;
}
