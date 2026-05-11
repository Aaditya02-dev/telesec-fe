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
  { label: "Total Users", value: "487K", delta: "+1.2%", icon: UsersRound },
  { label: "Fraud Alerts", value: "72", delta: "active", icon: ShieldAlert },
  { label: "High Risk Users", value: "6", delta: "watch", icon: Siren },
  { label: "Suspicious Calls", value: "432", delta: "24h", icon: PhoneCall },
  { label: "Blocked Users", value: "5", delta: "today", icon: ShieldCheck },
  { label: "Risk Setting", value: "66", delta: "rules", icon: Gauge }
];

function FraudKpiCard({ metric }: { metric: (typeof metrics)[number] }) {
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
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 text-xs font-bold text-slate-200 transition hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10 hover:text-white"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Blocked" ? "border-red-500/25 bg-red-500/10 text-red-400" : status === "Monitored" ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-300" : "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

function FraudBars({ tick }: { tick: number }) {
  const bars = [18, 12, 20, 24, 28, 36, 52, 78, 58, 32, 22];
  const labels = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6"];

  return (
    <div className="mt-4 rounded-lg border border-white/5 bg-white/5 p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] font-bold text-slate-500">
        <span>Call Volume</span>
        <span className="text-orange-400">Live</span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-md bg-[#0B0C10] px-3 pb-7 pt-4">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern height="20" id="fraudBarGrid" patternUnits="userSpaceOnUse" width="20">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect fill="url(#fraudBarGrid)" height="100" opacity="0.7" width="100" />
          <line stroke="rgba(255,255,255,0.24)" strokeWidth="0.8" x1="7" x2="97" y1="84" y2="84" />
          <line stroke="rgba(255,255,255,0.24)" strokeWidth="0.8" x1="7" x2="7" y1="8" y2="84" />
        </svg>
        <div className="relative z-10 flex h-full items-end gap-2 pl-3">
          {bars.map((height, index) => {
            const liveHeight = Math.max(12, height + ((tick + index) % 4) * 2);

            return (
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-1" key={`${height}-${index}`}>
                <span
                  className="w-full rounded-t border border-orange-400 bg-orange-500 shadow-sm transition-all duration-500"
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
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] p-4 shadow-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#41bf63]/20 bg-[#41bf63]/10 text-[#41bf63]">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">Fraud Command Center</h2>
                <p className="text-sm font-semibold text-slate-500">Live fraud detection, user risk scoring, and response actions.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">72 Active Alerts</span>
              <span className="rounded-md border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">$13,450 Exposure</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">Live {lastUpdated}s</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric) => (
            <FraudKpiCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <h2 className="text-base font-bold text-white">24h Fraud Mix</h2>
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </div>
            <div className="flex items-center gap-5 p-4">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[14px] border-orange-500 border-b-[#41bf63] border-l-red-500 text-center">
                <div><p className="text-2xl font-bold text-white">16</p><p className="text-[10px] font-bold text-slate-500">Alerts</p></div>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-2 text-xs font-bold text-slate-300">
                <p>SIM Box</p><p className="text-right">16</p>
                <p>Call Spoofing</p><p className="text-right">9</p>
                <p>CLI Spoofing</p><p className="text-right">2</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="border-b border-white/5 p-4">
              <h2 className="text-base font-bold text-white">Selected User</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#41bf63] text-[#0B0C10]"><UserRound className="h-5 w-5" /></span>
                <div>
                  <p className="text-lg font-bold text-white">{selectedUser.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{selectedUser.number}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-md border border-white/5 bg-white/5 p-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Risk</p>
                  <p className="text-sm font-bold text-orange-400">{selectedUser.risk}%</p>
                </div>
                <div className="rounded-md border border-white/5 bg-white/5 p-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Type</p>
                  <p className="truncate text-sm font-bold text-white">{selectedUser.type}</p>
                </div>
                <div className="rounded-md border border-white/5 bg-white/5 p-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Cost</p>
                  <p className="text-sm font-bold text-white">${selectedUser.cost.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="border-b border-white/5 p-4">
              <h2 className="text-base font-bold text-white">Response Actions</h2>
            </div>
            <div className="grid gap-2 p-4">
              <button className="h-9 rounded-md bg-[#41bf63] text-xs font-bold text-[#0B0C10] hover:bg-[#6ee7a0]" onClick={() => setSelectedUserId(selectedUser.id)} type="button">Block Number</button>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-9 rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" type="button">Whitelist</button>
                <button className="h-9 rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" type="button">Monitor</button>
              </div>
              <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-xs font-bold text-red-400">Predicted burst in next 2 hours</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex flex-col gap-3 border-b border-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Fraud Monitoring</h2>
                  <p className="text-sm font-semibold text-slate-500">Detection of fraudulent activity and suspicious calling behavior.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MiniButton><Activity className="h-3.5 w-3.5" /> Live {lastUpdated}s</MiniButton>
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Rules</MiniButton>
                </div>
              </div>

              <div className="border-b border-white/5 p-3">
                <div className="mb-3 flex flex-wrap gap-2">
                  {["Call Fraud", "SMS Fraud", "Account Fraud"].map((tab) => (
                    <button
                      className={`h-9 rounded-md border px-4 text-sm font-bold ${activeTab === tab ? "border-[#41bf63] bg-[#41bf63] text-[#0B0C10]" : "border-white/10 bg-white/5 text-slate-300 hover:bg-[#41bf63]/10 hover:text-white"}`}
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
                      className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search user, number, or service..."
                      value={searchTerm}
                    />
                  </div>
                  <select className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-white outline-none focus:border-[#41bf63] [&>option]:bg-[#13161F] [&>option]:text-white" onChange={(event) => setRiskFilter(event.target.value)} value={riskFilter}>
                    {["All", "High", "Medium"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <select className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-white outline-none focus:border-[#41bf63] [&>option]:bg-[#13161F] [&>option]:text-white" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                    {["All", "Blocked", "Monitored", "Under Review"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <MiniButton onClick={() => { setSearchTerm(""); setRiskFilter("All"); setStatusFilter("All"); }}>Clear</MiniButton>
                </div>
              </div>

              <div className="p-4">
                <div className="rounded-lg border border-white/5 bg-white/5">
                  <div className="border-b border-white/5 p-3">
                    <h3 className="text-base font-bold text-white">High Risk Users ({filteredUsers.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-xs">
                      <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                        <tr>{["User ID", "Username", "Risk Score", "Fraud Type", "Status", "Call Volume", "Cost"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                          <tr className={`cursor-pointer hover:bg-white/[0.02] ${selectedUser.id === user.id ? "bg-[#41bf63]/5" : ""}`} key={user.id} onClick={() => setSelectedUserId(user.id)}>
                            <td className="px-3 py-2 font-bold text-white"># {user.id}</td>
                            <td className="px-3 py-2 font-semibold text-white">{user.name}</td>
                            <td className="px-3 py-2"><span className="rounded-md border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 font-bold text-orange-400">{user.risk}%</span></td>
                            <td className="px-3 py-2 font-semibold text-white">{user.type}</td>
                            <td className="px-3 py-2"><StatusBadge status={user.status} /></td>
                            <td className="px-3 py-2 font-semibold text-white">{user.volume}</td>
                            <td className="px-3 py-2 font-semibold text-white">${user.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <h2 className="text-lg font-bold text-white">Alert Table</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-xs">
                  <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                    <tr>{["ID", "Type", "User / Number", "Issue", "Risk", "Cost", "Time"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {alerts.map(([id, type, user, issue, risk, cost, time]) => (
                      <tr className="hover:bg-white/[0.02]" key={id}>
                        <td className="px-3 py-2 font-bold text-white"># {id}</td>
                        <td className="px-3 py-2 font-semibold text-white">{type}</td>
                        <td className="px-3 py-2 font-semibold text-white">{user}</td>
                        <td className="px-3 py-2 font-semibold text-slate-400">{issue}</td>
                        <td className="px-3 py-2 font-bold text-orange-400">{risk}</td>
                        <td className="px-3 py-2 font-bold text-white">{cost}</td>
                        <td className="px-3 py-2 font-semibold text-slate-400">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <h2 className="text-base font-bold text-white">Call Volume</h2>
              </div>
              <div className="p-4">
                <div className="rounded-md border border-orange-500/20 bg-orange-500/10 p-3">
                  <p className="text-2xl font-bold text-white">$13,450</p>
                  <p className="text-xs font-bold text-orange-400">Fraud Cost</p>
                </div>
                <p className="mt-4 text-2xl font-bold text-white">652K</p>
                <p className="text-xs font-bold text-slate-500">Suspicious Calls</p>
                <FraudBars tick={tick} />
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <h2 className="text-base font-bold text-white">User Details</h2>
              </div>
              <div className="space-y-3 p-4">
                <StatusBadge status={selectedUser.status} />
                <div className="rounded-md border border-white/5 bg-white/5 p-3 text-xs font-bold">
                  <p className="flex justify-between"><span>Risk Score</span><span className="text-orange-400">{selectedUser.risk}%</span></p>
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
