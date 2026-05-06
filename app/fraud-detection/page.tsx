"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  ChevronDown,
  Filter,
  Gauge,
  MoreHorizontal,
  PhoneCall,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UserRound,
  UsersRound,
  Zap
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Users", value: "487K", delta: "+1.2%", icon: UsersRound, tone: "blue", spark: "M0 29 L45 27 L90 29 L135 26 L180 24" },
  { label: "Fraud Alerts", value: "72", delta: "active", icon: ShieldAlert, tone: "red", spark: "M0 30 L45 31 L90 28 L135 27 L180 25" },
  { label: "High Risk Users", value: "6", delta: "watch", icon: Siren, tone: "orange", spark: "M0 29 L45 27 L90 28 L135 29 L180 26" },
  { label: "Suspicious Calls", value: "432", delta: "24h", icon: PhoneCall, tone: "yellow", spark: "M0 27 L45 30 L90 30 L135 26 L180 25" },
  { label: "Blocked Users", value: "5", delta: "today", icon: ShieldCheck, tone: "green", spark: "M0 30 L45 30 L90 25 L135 24 L180 25" },
  { label: "Risk Setting", value: "66", delta: "rules", icon: Gauge, tone: "blue", spark: "M0 28 L45 29 L90 28 L135 30 L180 26" }
];

const toneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700",
  yellow: "border-yellow-200 bg-yellow-50 text-yellow-700"
};

const users = [
  { id: "102", name: "John Doe", risk: 88, type: "SIM Box", status: "Blocked", volume: "100,000", cost: 106.75, number: "93.209.6.000" },
  { id: "4637", name: "User123", risk: 88, type: "SIM Box", status: "Blocked", volume: "100,000", cost: 88.25, number: "91.448.2.190" },
  { id: "3593", name: "MarkSmith", risk: 82, type: "Call Spoofing", status: "Monitored", volume: "100,000", cost: 88.10, number: "187.084" },
  { id: "1234", name: "Alice456", risk: 76, type: "CLI Spoofing", status: "Under Review", volume: "160,000", cost: 36.10, number: "AP2259" },
  { id: "4205", name: "IP:203.0.113.55", risk: 91, type: "SIM Box", status: "Blocked", volume: "160,000", cost: 535.12, number: "203.0.113.55" }
];

const alerts = [
  ["4217", "Call Spoofing", "AP2259", "Call to premium route", "80%", "$106.75", "5 min ago"],
  ["5216", "SIM Box Activity", "User16 SIM-Box", "Multiple SIM box patterns", "77%", "$160.25", "15 min ago"],
  ["4221", "Weird CLI", "187.084", "Malformed caller identity", "88%", "$66.80", "30 min ago"],
  ["4301", "Call Spoofing", "AP2076", "Premium destination burst", "85%", "$115.80", "1 hour ago"]
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
  const tone = status === "Blocked" ? "border-red-200 bg-red-50 text-red-700" : status === "Monitored" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : "border-blue-200 bg-blue-50 text-blue-700";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

function FraudBars({ tick }: { tick: number }) {
  const bars = [18, 12, 20, 24, 28, 36, 52, 78, 58, 32, 22];
  const labels = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6"];

  return (
    <div className="mt-4 rounded-lg border border-slate-300 bg-white p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] font-bold text-slate-600">
        <span>Call Volume</span>
        <span className="text-orange-700">Live</span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-md bg-slate-50 px-3 pb-7 pt-4">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern height="20" id="fraudBarGrid" patternUnits="userSpaceOnUse" width="20">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#CBD5E1" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect fill="url(#fraudBarGrid)" height="100" opacity="0.7" width="100" />
          <line stroke="#94A3B8" strokeWidth="0.8" x1="7" x2="97" y1="84" y2="84" />
          <line stroke="#94A3B8" strokeWidth="0.8" x1="7" x2="7" y1="8" y2="84" />
        </svg>
        <div className="relative z-10 flex h-full items-end gap-2 pl-3">
          {bars.map((height, index) => {
            const liveHeight = Math.max(12, height + ((tick + index) % 4) * 2);

            return (
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-1" key={`${height}-${index}`}>
                <span
                  className="w-full rounded-t border border-orange-600 bg-orange-500 shadow-sm transition-all duration-500"
                  style={{ height: `${liveHeight}%` }}
                  title={`${labels[index]}: ${liveHeight}K calls`}
                />
                <span className="absolute bottom-1 text-[9px] font-bold text-slate-500" style={{ left: `${10 + index * 8}%` }}>
                  {labels[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FraudDetectionPage() {
  const [activeTab, setActiveTab] = useState("Call Fraud");
  const [lastUpdated, setLastUpdated] = useState(0);
  const [riskFilter, setRiskFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("102");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLastUpdated((value) => (value + 1) % 60);
      setTick((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = `${user.id} ${user.name} ${user.type} ${user.number}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      const matchesRisk = riskFilter === "All" || (riskFilter === "High" ? user.risk >= 85 : user.risk < 85);
      const matchesTab = activeTab === "Call Fraud" || (activeTab === "SMS Fraud" ? user.type === "SIM Box" : user.type.includes("Spoofing"));

      return matchesSearch && matchesStatus && matchesRisk && matchesTab;
    });
  }, [activeTab, riskFilter, searchTerm, statusFilter]);
  const selectedUser = users.find((user) => user.id === selectedUserId) ?? users[0];

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
                <ShieldAlert className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-black">Fraud Command Center</h2>
                <p className="text-sm font-semibold text-slate-700">Live fraud detection, user risk scoring, and response actions.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">72 Active Alerts</span>
              <span className="rounded-md border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">$13,450 Exposure</span>
              <span className="rounded-md border border-border bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">Live {lastUpdated}s</span>
            </div>
          </div>
        </section>

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

        <section className="mt-4 grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-base font-bold text-black">24h Fraud Mix</h2>
              <MoreHorizontal className="h-5 w-5 text-black" />
            </div>
            <div className="flex items-center gap-5 p-4">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[14px] border-orange-500 border-b-blue-500 border-l-red-500 text-center">
                <div><p className="text-2xl font-bold text-black">16</p><p className="text-[10px] font-bold text-slate-600">Alerts</p></div>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <p>SIM Box</p><p className="text-right">16</p>
                <p>Call Spoofing</p><p className="text-right">9</p>
                <p>CLI Spoofing</p><p className="text-right">2</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="border-b border-border p-4">
              <h2 className="text-base font-bold text-black">Selected User</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B2B32] text-white"><UserRound className="h-5 w-5" /></span>
                <div>
                  <p className="text-lg font-bold text-black">{selectedUser.name}</p>
                  <p className="text-xs font-semibold text-slate-600">{selectedUser.number}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-md border border-border bg-slate-50 p-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Risk</p>
                  <p className="text-sm font-bold text-orange-700">{selectedUser.risk}%</p>
                </div>
                <div className="rounded-md border border-border bg-slate-50 p-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Type</p>
                  <p className="truncate text-sm font-bold text-black">{selectedUser.type}</p>
                </div>
                <div className="rounded-md border border-border bg-slate-50 p-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Cost</p>
                  <p className="text-sm font-bold text-black">${selectedUser.cost.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white shadow-soft">
            <div className="border-b border-border p-4">
              <h2 className="text-base font-bold text-black">Response Actions</h2>
            </div>
            <div className="grid gap-2 p-4">
              <button className="h-9 rounded-md bg-[#0B2B32] text-xs font-bold text-white" onClick={() => setSelectedUserId(selectedUser.id)} type="button">Block Number</button>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-9 rounded-md border border-slate-300 bg-white text-xs font-bold text-black" type="button">Whitelist</button>
                <button className="h-9 rounded-md border border-slate-300 bg-white text-xs font-bold text-black" type="button">Monitor</button>
              </div>
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-xs font-bold text-red-700">Predicted burst in next 2 hours</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-black">Fraud Monitoring</h2>
                  <p className="text-sm font-semibold text-slate-700">Detection of fraudulent activity and suspicious calling behavior.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MiniButton><Activity className="h-3.5 w-3.5" /> Live {lastUpdated}s</MiniButton>
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Rules</MiniButton>
                </div>
              </div>

              <div className="border-b border-border p-3">
                <div className="mb-3 flex flex-wrap gap-2">
                  {["Call Fraud", "SMS Fraud", "Account Fraud"].map((tab) => (
                    <button
                      className={`h-9 rounded-md border px-4 text-sm font-bold ${activeTab === tab ? "border-[#0B2B32] bg-[#0B2B32] text-white" : "border-border bg-white text-slate-700 hover:bg-slate-50"}`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      type="button"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative min-w-[280px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm font-semibold outline-none focus:border-[#0B2B32]"
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search user, number, or service..."
                      value={searchTerm}
                    />
                  </div>
                  <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold" onChange={(event) => setRiskFilter(event.target.value)} value={riskFilter}>
                    {["All", "High", "Medium"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-bold" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                    {["All", "Blocked", "Monitored", "Under Review"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <MiniButton onClick={() => { setSearchTerm(""); setRiskFilter("All"); setStatusFilter("All"); }}>Clear</MiniButton>
                </div>
              </div>

              <div className="p-4">
                <div className="rounded-lg border border-border bg-white">
                  <div className="border-b border-border p-3">
                    <h3 className="text-base font-bold text-black">High Risk Users ({filteredUsers.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-xs">
                      <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                        <tr>{["User ID", "Username", "Risk Score", "Fraud Type", "Status", "Call Volume", "Cost"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredUsers.map((user) => (
                          <tr className={`cursor-pointer hover:bg-slate-50 ${selectedUser.id === user.id ? "bg-[#0B2B32]/5" : ""}`} key={user.id} onClick={() => setSelectedUserId(user.id)}>
                            <td className="px-3 py-2 font-bold text-black"># {user.id}</td>
                            <td className="px-3 py-2 font-semibold text-black">{user.name}</td>
                            <td className="px-3 py-2"><span className="rounded-md border border-orange-200 bg-orange-50 px-2 py-0.5 font-bold text-orange-700">{user.risk}%</span></td>
                            <td className="px-3 py-2 font-semibold text-black">{user.type}</td>
                            <td className="px-3 py-2"><StatusBadge status={user.status} /></td>
                            <td className="px-3 py-2 font-semibold text-black">{user.volume}</td>
                            <td className="px-3 py-2 font-semibold text-black">${user.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-lg font-bold text-black">Alert Table</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-xs">
                  <thead className="border-b border-border text-[11px] uppercase tracking-wide text-slate-700">
                    <tr>{["ID", "Type", "User / Number", "Issue", "Risk", "Cost", "Time"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {alerts.map(([id, type, user, issue, risk, cost, time]) => (
                      <tr className="hover:bg-slate-50" key={id}>
                        <td className="px-3 py-2 font-bold text-black"># {id}</td>
                        <td className="px-3 py-2 font-semibold text-black">{type}</td>
                        <td className="px-3 py-2 font-semibold text-black">{user}</td>
                        <td className="px-3 py-2 font-semibold text-slate-700">{issue}</td>
                        <td className="px-3 py-2 font-bold text-orange-700">{risk}</td>
                        <td className="px-3 py-2 font-bold text-black">{cost}</td>
                        <td className="px-3 py-2 font-semibold text-slate-700">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Call Volume</h2>
              </div>
              <div className="p-4">
                <div className="rounded-md border border-orange-200 bg-orange-50 p-3">
                  <p className="text-2xl font-bold text-black">$13,450</p>
                  <p className="text-xs font-bold text-orange-700">Fraud Cost</p>
                </div>
                <p className="mt-4 text-2xl font-bold text-black">652K</p>
                <p className="text-xs font-bold text-slate-600">Suspicious Calls</p>
                <FraudBars tick={tick} />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">User Details</h2>
              </div>
              <div className="space-y-3 p-4">
                <StatusBadge status={selectedUser.status} />
                <div className="rounded-md border border-border bg-slate-50 p-3 text-xs font-bold">
                  <p className="flex justify-between"><span>Risk Score</span><span className="text-orange-700">{selectedUser.risk}%</span></p>
                  <p className="mt-2 flex justify-between"><span>Fraud Type</span><span>{selectedUser.type}</span></p>
                  <p className="mt-2 flex justify-between"><span>Call Duration</span><span>100 min</span></p>
                  <p className="mt-2 flex justify-between"><span>Cost</span><span>${selectedUser.cost.toFixed(2)}</span></p>
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
