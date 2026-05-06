"use client";

import { useState } from "react";
import {
  Activity,
  Bell,
  ChevronDown,
  Database,
  Eye,
  Filter,
  Flame,
  Maximize2,
  MoreHorizontal,
  Network,
  Plus,
  RadioTower,
  RefreshCw,
  Router,
  Search,
  Server,
  ShieldAlert,
  Signal,
  Wifi,
  Zap
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Devices", value: "1,248", delta: "+2.5%", icon: Server, tone: "blue" },
  { label: "Up", value: "1,135", delta: "91.0%", icon: Signal, tone: "green" },
  { label: "Down", value: "67", delta: "-5.4%", icon: ShieldAlert, tone: "red" },
  { label: "Warning", value: "46", delta: "+3.6%", icon: Flame, tone: "orange" },
  { label: "Total Links", value: "2,531", delta: "+1.7%", icon: Network, tone: "blue" },
  { label: "Utilization", value: "48.7%", delta: "avg", icon: Activity, tone: "green" },
  { label: "Critical Nodes", value: "12", delta: "View", icon: Zap, tone: "red" }
];

const toneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700"
};

const nodes = [
  { label: "Internet", ip: "WAN", x: 50, y: 9, status: "healthy", icon: Wifi },
  { label: "Edge-R1", ip: "10.0.0.1", x: 35, y: 24, status: "healthy", icon: Router },
  { label: "Edge-R2", ip: "10.0.0.2", x: 65, y: 24, status: "healthy", icon: Router },
  { label: "Core-SW1", ip: "10.1.0.1", x: 34, y: 40, status: "healthy", icon: Network, selected: true },
  { label: "Core-SW2", ip: "10.1.0.2", x: 66, y: 40, status: "healthy", icon: Network },
  { label: "Dist-SW1", ip: "10.2.1.1", x: 22, y: 59, status: "healthy", icon: Network },
  { label: "Dist-SW2", ip: "10.2.2.1", x: 42, y: 59, status: "down", icon: Network },
  { label: "Dist-SW3", ip: "10.2.3.1", x: 70, y: 59, status: "healthy", icon: Network },
  { label: "AP-01", ip: "10.3.1.101", x: 13, y: 83, status: "healthy", icon: RadioTower },
  { label: "Server-01", ip: "10.3.1.50", x: 34, y: 83, status: "healthy", icon: Server },
  { label: "FW-01", ip: "10.4.1.10", x: 58, y: 83, status: "down", icon: Flame },
  { label: "DB-01", ip: "10.4.1.20", x: 76, y: 83, status: "warning", icon: Database },
  { label: "Cell-Site-01", ip: "10.5.1.1", x: 88, y: 56, status: "warning", icon: RadioTower }
];

const links = [
  ["Internet", "Edge-R1", "10 Gbps", "healthy"],
  ["Internet", "Edge-R2", "10 Gbps", "healthy"],
  ["Edge-R1", "Core-SW1", "10 Gbps", "healthy"],
  ["Edge-R2", "Core-SW2", "10 Gbps", "healthy"],
  ["Core-SW1", "Core-SW2", "40 Gbps", "healthy"],
  ["Core-SW1", "Dist-SW1", "25 Gbps", "healthy"],
  ["Core-SW1", "Dist-SW2", "10 Gbps", "warning"],
  ["Core-SW2", "Dist-SW3", "10 Gbps", "healthy"],
  ["Dist-SW1", "AP-01", "1 Gbps", "healthy"],
  ["Dist-SW1", "Server-01", "10 Gbps", "healthy"],
  ["Dist-SW3", "FW-01", "1 Gbps", "down"],
  ["Dist-SW3", "DB-01", "10 Gbps", "warning"],
  ["Dist-SW3", "Cell-Site-01", "5 GHz", "warning"]
] as const;

const statusStyle = {
  down: { bg: "bg-danger", fill: "#DC2626", line: "#DC2626", text: "text-danger" },
  healthy: { bg: "bg-success", fill: "#16A34A", line: "#16A34A", text: "text-success" },
  warning: { bg: "bg-warning", fill: "#D97706", line: "#D97706", text: "text-warning" }
};

const devices = [
  ["Core-SW1", "10.1.0.1", "Core Switch", "Up", "15d 4h 32m", "23%", "45%", "40.2 Gbps"],
  ["Core-SW2", "10.1.0.2", "Core Switch", "Up", "12d 7h 11m", "18%", "37%", "38.7 Gbps"],
  ["Edge-R1", "10.0.0.1", "Router", "Up", "20d 1h 5m", "15%", "28%", "12.4 Gbps"],
  ["Dist-SW2", "10.2.2.1", "Switch", "Down", "2h 15m", "-", "-", "0 Gbps"],
  ["FW-01", "10.4.1.10", "Firewall", "Up", "30d 6h 18m", "31%", "55%", "8.9 Gbps"]
];

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

function TopologyWorkspace() {
  const [activeTool, setActiveTool] = useState("Select");
  const [deviceFilter, setDeviceFilter] = useState("All");
  const [layerFilter, setLayerFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDevices, setShowDevices] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showLinks, setShowLinks] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [zoom, setZoom] = useState(1);

  const byLabel = Object.fromEntries(nodes.map((node) => [node.label, node]));
  const getDeviceType = (label: string) => {
    if (label.includes("SW")) return "Switch";
    if (label.includes("Edge") || label === "Internet") return "Router";
    if (label.includes("AP") || label.includes("Cell")) return "Wireless";
    if (label.includes("FW")) return "Firewall";
    return "Server";
  };
  const getLayer = (label: string) => {
    if (label === "Internet") return "WAN";
    if (label.includes("Edge")) return "Edge";
    if (label.includes("Core")) return "Core";
    if (label.includes("Dist")) return "Distribution";
    return "Access";
  };
  const visibleNodes = nodes.filter((node) => {
    const matchesSearch = `${node.label} ${node.ip}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || node.status === statusFilter.toLowerCase();
    const matchesType = deviceFilter === "All" || getDeviceType(node.label) === deviceFilter;
    const matchesLayer = layerFilter === "All" || getLayer(node.label) === layerFilter;

    return matchesSearch && matchesStatus && matchesType && matchesLayer;
  });
  const visibleNodeLabels = new Set(visibleNodes.map((node) => node.label));
  const visibleLinks = links.filter(([fromLabel, toLabel]) => visibleNodeLabels.has(fromLabel) && visibleNodeLabels.has(toLabel));
  const resetMap = () => {
    setActiveTool("Select");
    setZoom(1);
  };
  const clearFilters = () => {
    setDeviceFilter("All");
    setLayerFilter("All");
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <div className="rounded-lg border border-border bg-white shadow-soft">
      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">Network Topology</h2>
          <p className="text-sm font-semibold text-slate-700">Interactive map of network devices, links, and service paths.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <MiniButton><RefreshCw className="h-3.5 w-3.5" /> Sync</MiniButton>
          <MiniButton><Activity className="h-3.5 w-3.5" /> Live</MiniButton>
          <MiniButton><Maximize2 className="h-3.5 w-3.5" /></MiniButton>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#0B2B32] px-3 text-xs font-bold text-white hover:bg-[#123f49]" type="button">
            <Plus className="h-3.5 w-3.5" /> Add Widget
          </button>
        </div>
      </div>

      <div className="border-b border-border p-3">
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm font-semibold outline-none focus:border-[#0B2B32]"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search node..."
              value={searchTerm}
            />
          </div>
          <select
            className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-black outline-none focus:border-[#0B2B32]"
            onChange={(event) => setDeviceFilter(event.target.value)}
            value={deviceFilter}
          >
            {["All", "Router", "Switch", "Server", "Firewall", "Wireless"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select
            className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-black outline-none focus:border-[#0B2B32]"
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            {["All", "Healthy", "Warning", "Down"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select
            className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-black outline-none focus:border-[#0B2B32]"
            onChange={(event) => setLayerFilter(event.target.value)}
            value={layerFilter}
          >
            {["All", "WAN", "Edge", "Core", "Distribution", "Access"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <button
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-black transition hover:border-[#0B2B32] hover:bg-slate-50"
            onClick={clearFilters}
            type="button"
          >
            <Filter className="h-3.5 w-3.5" /> Clear All
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[160px_minmax(0,1fr)]">
        <aside className="rounded-lg border border-border bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Map Controls</p>
          <div className="mt-3 space-y-1">
            <button
              className={`flex h-8 w-full items-center rounded-md px-2 text-left text-xs font-bold ${activeTool === "Select" ? "bg-[#0B2B32] text-white" : "text-slate-700 hover:bg-white"}`}
              onClick={() => setActiveTool("Select")}
              type="button"
            >
              Select
            </button>
            <button
              className={`flex h-8 w-full items-center rounded-md px-2 text-left text-xs font-bold ${activeTool === "Pan" ? "bg-[#0B2B32] text-white" : "text-slate-700 hover:bg-white"}`}
              onClick={() => setActiveTool("Pan")}
              type="button"
            >
              Pan
            </button>
            <button
              className="flex h-8 w-full items-center rounded-md px-2 text-left text-xs font-bold text-slate-700 hover:bg-white"
              onClick={() => setZoom((value) => Math.min(1.3, value + 0.1))}
              type="button"
            >
              Zoom In
            </button>
            <button
              className="flex h-8 w-full items-center rounded-md px-2 text-left text-xs font-bold text-slate-700 hover:bg-white"
              onClick={() => setZoom((value) => Math.max(0.82, value - 0.1))}
              type="button"
            >
              Zoom Out
            </button>
            <button
              className="flex h-8 w-full items-center rounded-md px-2 text-left text-xs font-bold text-slate-700 hover:bg-white"
              onClick={resetMap}
              type="button"
            >
              Fit to View
            </button>
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Layers</p>
            <div className="mt-2 space-y-2 text-xs font-bold text-slate-700">
              {[
                ["Devices", showDevices, setShowDevices],
                ["Links", showLinks, setShowLinks],
                ["Labels", showLabels, setShowLabels]
              ].map(([label, checked, setChecked]) => (
                <label className="flex items-center gap-2" key={label as string}>
                  <input
                    checked={checked as boolean}
                    className="h-3.5 w-3.5 accent-[#0B2B32]"
                    onChange={(event) => (setChecked as React.Dispatch<React.SetStateAction<boolean>>)(event.target.checked)}
                    type="checkbox"
                  />
                  {label as string}
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Legend</p>
            <div className="mt-2 space-y-2 text-xs font-bold text-slate-700">
              <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /> Up</p>
              <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-warning" /> Warning</p>
              <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-danger" /> Down</p>
            </div>
          </div>
        </aside>

        <div className={`relative h-[620px] overflow-hidden rounded-lg border border-slate-300 bg-slate-50 ${activeTool === "Pan" ? "cursor-grab" : "cursor-default"}`}>
          <svg className="absolute inset-0 h-full w-full" role="img" viewBox="0 0 100 100">
            <defs>
              <pattern height="4" id="networkGrid" patternUnits="userSpaceOnUse" width="4">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#CBD5E1" strokeWidth="0.28" />
              </pattern>
              <pattern height="2" id="networkDots" patternUnits="userSpaceOnUse" width="2">
                <circle cx="0.5" cy="0.5" fill="#94A3B8" opacity="0.35" r="0.12" />
              </pattern>
            </defs>
            <rect fill="#F8FAFC" height="100" width="100" />
            <rect fill="url(#networkGrid)" height="100" opacity="0.85" width="100" />
            <rect fill="url(#networkDots)" height="100" opacity="0.7" width="100" />
          </svg>
          <div
            className="absolute inset-0 origin-center transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
          {showLinks && (
          <svg className="absolute inset-0 h-full w-full" role="img" viewBox="0 0 100 100">
            {visibleLinks.map(([fromLabel, toLabel, label, status]) => {
              const from = byLabel[fromLabel];
              const to = byLabel[toLabel];
              const tone = statusStyle[status as keyof typeof statusStyle];

              return (
                <g key={`${fromLabel}-${toLabel}`}>
                  <line
                    className="topology-link"
                    stroke={tone.line}
                    strokeLinecap="round"
                    strokeOpacity={status === "down" ? "0.65" : "0.48"}
                    strokeWidth={status === "down" ? "0.55" : "0.42"}
                    x1={from.x}
                    x2={to.x}
                    y1={from.y}
                    y2={to.y}
                  />
                  <circle fill={tone.fill} r="0.75">
                    <animate attributeName="cx" dur="3s" repeatCount="indefinite" values={`${from.x};${to.x}`} />
                    <animate attributeName="cy" dur="3s" repeatCount="indefinite" values={`${from.y};${to.y}`} />
                  </circle>
                  {showLabels && (
                    <text fill="#0F172A" fontSize="2.2" fontWeight="700" textAnchor="middle" x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1.4}>
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          )}

          {showDevices && visibleNodes.map((node) => {
            const tone = statusStyle[node.status as keyof typeof statusStyle];
            const Icon = node.icon;

            return (
              <div
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                key={node.label}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="relative">
                  <span className={`topology-pulse absolute inset-0 rounded-full ${tone.bg}`} />
                  <span className={`relative flex items-center justify-center rounded-full border-2 border-white bg-white shadow-md ${node.selected ? "h-14 w-14 ring-2 ring-[#0B2B32]/25" : "h-11 w-11"}`}>
                    <Icon className={`h-5 w-5 ${tone.text}`} />
                  </span>
                </div>
                {showLabels && (
                  <div className="min-w-[74px] rounded-md border border-border bg-white px-2 py-1 text-center text-[10px] font-bold leading-tight text-black shadow-sm">
                    <p>{node.label}</p>
                    <p className="text-[10px] font-semibold text-slate-600">{node.ip}</p>
                  </div>
                )}
              </div>
            );
          })}
          </div>

          <div className="absolute bottom-3 left-3 rounded-md border border-border bg-white/95 px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm">
            {visibleNodes.length} devices / {visibleLinks.length} links | {Math.round(zoom * 100)}%
          </div>

        </div>
      </div>
    </div>
  );
}

export default function NetworkTopologyPage() {

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
                <Network className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-black">Network Operations Map</h2>
                <p className="text-sm font-semibold text-slate-700">Live topology, device health, link utilization, and recent configuration changes.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:min-w-[360px]">
              {[
                ["Regions", "8"],
                ["Collectors", "12/12"],
                ["Last Sync", "10:30 AM"]
              ].map(([label, value]) => (
                <div className="rounded-md border border-border bg-slate-50 px-3 py-2" key={label}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-bold text-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4 grid overflow-hidden rounded-lg border border-border bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-7">
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
              </div>
            );
          })}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <TopologyWorkspace />

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Topology Overview</h2>
                <MoreHorizontal className="h-5 w-5 text-black" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-[12px] border-blue-500 border-b-orange-400 border-l-green-500 text-center">
                    <span className="text-lg font-bold text-black">1,248</span>
                  </div>
                  <div className="space-y-2 text-xs font-bold text-slate-700">
                    {["Routers 156", "Switches 482", "Servers 320", "Firewalls 45", "APs 120"].map((item) => <p key={item}>{item}</p>)}
                  </div>
                </div>
                <button className="mt-4 text-sm font-bold text-blue-700" type="button">View Inventory</button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Map Shortcuts</h2>
              </div>
              <div className="grid gap-2 p-4">
                {["Add Device", "Add Link", "Import Topology", "Export Map"].map((action) => (
                  <button
                    className="flex h-9 items-center justify-between rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-black hover:border-[#0B2B32] hover:bg-slate-50"
                    key={action}
                    type="button"
                  >
                    {action}
                    <Plus className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">System Status</h2>
              </div>
              <div className="space-y-3 p-4">
                {[
                  ["Collectors", "12/12", "text-success"],
                  ["Agents", "156/160", "text-success"],
                  ["Last Update", "10:30:45 AM", "text-black"]
                ].map(([label, value, color]) => (
                  <div className="flex items-center justify-between text-xs font-bold" key={label}>
                    <span className="text-slate-600">{label}</span>
                    <span className={color}>{value}</span>
                  </div>
                ))}
                <button className="h-9 w-full rounded-md bg-[#0B2B32] text-xs font-bold text-white hover:bg-[#123f49]" type="button">
                  View All
                </button>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="border-b border-border p-4">
              <h2 className="text-base font-bold text-black">Link Utilization</h2>
            </div>
            <div className="grid gap-4 p-4 md:grid-cols-2">
              {[
                ["Core-SW1 <-> Core-SW2", "78%", "bg-red-500"],
                ["Edge-R1 <-> Core-SW1", "62%", "bg-yellow-500"],
                ["Core-SW2 <-> Dist-SW3", "41%", "bg-green-500"],
                ["Dist-SW1 <-> Access-SW1", "35%", "bg-green-500"]
              ].map(([name, value, color]) => (
                <div className="rounded-md border border-border bg-slate-50 p-3" key={name}>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-black">{name}</span>
                    <span className="text-slate-700">{value}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                    <span className={`block h-full ${color}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="border-b border-border p-4">
              <h2 className="text-base font-bold text-black">Recent Changes</h2>
            </div>
            <div className="grid gap-3 p-4 md:grid-cols-3">
              {[
                ["10:15 AM", "Edge-R2", "Interface Gi0/1 Up", "text-success"],
                ["09:47 AM", "Dist-SW2", "Interface Ten0/2 Down", "text-danger"],
                ["09:30 AM", "FW-01", "Config Updated", "text-blue-700"]
              ].map(([time, device, detail, color]) => (
                <div className="rounded-md border border-border bg-slate-50 p-3" key={`${time}-${device}`}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{time}</p>
                  <p className="mt-1 text-sm font-bold text-black">{device}</p>
                  <p className={`mt-1 text-xs font-semibold ${color}`}>{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-lg border border-border bg-white shadow-soft">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <span className="rounded-md bg-[#0B2B32] px-3 py-1 text-xs font-bold text-white">Device List</span>
            <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-slate-700">Link List</span>
            <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-slate-700">Alarms on Map (12)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                <tr>
                  {["", "Device Name", "IP Address", "Type", "Status", "Uptime", "CPU", "Memory", "Traffic", "Actions"].map((head) => (
                    <th className="px-3 py-2 font-bold" key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {devices.map(([name, ip, type, status, uptime, cpu, memory, traffic]) => (
                  <tr className="hover:bg-slate-50" key={name}>
                    <td className="px-3 py-2"><Eye className="h-4 w-4 text-slate-500" /></td>
                    <td className="px-3 py-2 font-bold text-black">{name}</td>
                    <td className="px-3 py-2 font-semibold text-black">{ip}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{type}</td>
                    <td className={`px-3 py-2 font-bold ${status === "Down" ? "text-danger" : "text-success"}`}>{status}</td>
                    <td className="px-3 py-2 font-semibold text-black">{uptime}</td>
                    <td className="px-3 py-2 font-semibold text-black">{cpu}</td>
                    <td className="px-3 py-2 font-semibold text-black">{memory}</td>
                    <td className="px-3 py-2 font-semibold text-black">{traffic}</td>
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
