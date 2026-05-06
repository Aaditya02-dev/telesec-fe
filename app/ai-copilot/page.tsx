"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  ChevronDown,
  ClipboardList,
  Gauge,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Network,
  Play,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Zap
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Open Alerts", value: "21", delta: "+1.8%", icon: Bell, tone: "blue", spark: "M0 30 L45 29 L90 27 L135 25 L180 24" },
  { label: "Incident Cluster", value: "#1023", delta: "Router R1", icon: Network, tone: "orange", spark: "M0 29 L45 29 L90 29 L135 28 L180 26" },
  { label: "Automation Success", value: "87%", delta: "67 rules in 24h", icon: ShieldCheck, tone: "green", spark: "M0 30 L45 28 L90 29 L135 26 L180 23" },
  { label: "Predicted Failures", value: "1", delta: "next 24h", icon: TriangleAlert, tone: "orange", spark: "M0 31 L45 30 L90 27 L135 25 L180 26" }
];

const toneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700"
};

const quickActions = [
  "Restart service with high CPU usage",
  "Explain cluster #1023",
  "Predict fiber link failures",
  "Create a new automation rule"
];

type ChatMessage = {
  role: "copilot" | "user";
  text: string;
  time: string;
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

function TrafficMiniChart({ tick }: { tick: number }) {
  const values = [20, 28, 34, 31, 29, 36, 45, 58, 53, 62, 88];

  return (
    <div className="mt-4 h-40 rounded-lg border border-border bg-slate-50 p-3">
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 60">
        <defs>
          <linearGradient id="copilotTraffic" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path d="M0 45 C12 35 16 38 25 34 S44 37 52 29 S72 20 82 21 S90 8 100 12 L100 60 L0 60 Z" fill="url(#copilotTraffic)" />
        <path d="M0 45 C12 35 16 38 25 34 S44 37 52 29 S72 20 82 21 S90 8 100 12" fill="none" stroke="#F97316" strokeLinecap="round" strokeWidth="2" />
        <circle cx={(tick * 9) % 100} cy={60 - (values[tick % values.length] / 100) * 48} fill="#F97316" r="2" />
      </svg>
    </div>
  );
}

function getCopilotReply(prompt: string) {
  const text = prompt.toLowerCase();

  if (text.includes("bandwidth") || text.includes("traffic")) {
    return "Current aggregate bandwidth is 652K suspicious-flow events and 30.7 Gbps routed traffic. Router R1 remains the highest contributor.";
  }

  if (text.includes("restart")) {
    return "Recommended automation: restart interface Ge0/1 on Router R1, validate link state, then rerun diagnostics. I can queue the playbook for approval.";
  }

  if (text.includes("fiber")) {
    return "Fiber forecast shows one likely failure window in the next 24 hours. Link A-B has rising attenuation and should be scheduled for maintenance.";
  }

  if (text.includes("cluster") || text.includes("network down") || text.includes("router")) {
    return "Router R1 is down and is impacting 1 switch, 2 fiber links, and 1 internet gateway. Root signal: interface loss of signal on Ge0/1.";
  }

  return "I checked the current operational context. No new critical dependency was found, but I recommend monitoring Router R1 and the A-B fiber path.";
}

export default function AiCopilotPage() {
  const [input, setInput] = useState("");
  const [lastUpdated, setLastUpdated] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "user", text: "Why is the network down?", time: "now" },
    { role: "copilot", text: "I found that Router R1 is down. This has caused the outage impacting the network. Would you like to see the affected nodes?", time: "now" },
    { role: "user", text: "Yes, show impacted nodes.", time: "now" },
    { role: "copilot", text: "Router R1 failure is affecting 1 switch, 2 fiber links, and 1 internet gateway. Issue identified: Interface Loss of Signal.", time: "now" }
  ]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLastUpdated((value) => (value + 1) % 60);
      setTick((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const latestCopilot = useMemo(() => [...messages].reverse().find((message) => message.role === "copilot")?.text ?? "", [messages]);

  const sendMessage = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const time = `${lastUpdated}s ago`;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed, time },
      { role: "copilot", text: getCopilotReply(trimmed), time: "just now" }
    ]);
    setInput("");
  };

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
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-black">AI Operations Copilot</h2>
                <p className="text-sm font-semibold text-slate-700">Ask, diagnose, automate, and review live network context from one workspace.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Online</span>
              <span className="rounded-md border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">R1 Incident Active</span>
              <span className="rounded-md border border-border bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">Live {lastUpdated}s</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid overflow-hidden rounded-lg border border-border bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-4">
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
          {[
            ["Active Incident", "Router R1 Down", "1 switch, 2 fiber links, 1 gateway impacted", TriangleAlert, "border-red-200 bg-red-50 text-red-700"],
            ["Copilot Status", "Context Ready", "Telemetry, RCA, and topology loaded", Sparkles, "border-green-200 bg-green-50 text-green-700"],
            ["Automation Queue", "2 Pending", "Diagnostics and restart awaiting approval", Play, "border-blue-200 bg-blue-50 text-blue-700"]
          ].map(([label, value, detail, Icon, tone]) => {
            const CardIcon = Icon as typeof Bot;

            return (
              <div className="rounded-lg border border-border bg-white p-4 shadow-soft" key={label as string}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label as string}</p>
                    <p className="mt-1 text-lg font-bold text-black">{value as string}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{detail as string}</p>
                  </div>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${tone as string}`}>
                    <CardIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-black">AI Copilot</h2>
                  <p className="text-sm font-semibold text-slate-700">Real-time AI assistant for telecom operations.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MiniButton><Activity className="h-3.5 w-3.5" /> Live {lastUpdated}s</MiniButton>
                  <MiniButton><ClipboardList className="h-3.5 w-3.5" /> Logs</MiniButton>
                  <MiniButton><Settings className="h-3.5 w-3.5" /></MiniButton>
                </div>
              </div>

              <div className="border-b border-border p-3">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      className="rounded-md border border-border bg-slate-50 px-3 py-1.5 text-xs font-bold text-black hover:border-[#0B2B32] hover:bg-white"
                      key={action}
                      onClick={() => sendMessage(action)}
                      type="button"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="rounded-lg border border-border bg-slate-50 p-4">
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`} key={`${message.role}-${index}`}>
                        {message.role === "copilot" && (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B2B32] text-white">
                            <Bot className="h-5 w-5" />
                          </span>
                        )}
                        <div className={`max-w-[78%] rounded-lg border px-4 py-3 text-sm font-semibold shadow-sm ${message.role === "user" ? "border-blue-200 bg-blue-50 text-black" : "border-border bg-white text-black"}`}>
                          <p>{message.text}</p>
                          <p className="mt-2 text-[10px] font-bold text-slate-500">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2 rounded-lg border border-slate-300 bg-white p-2">
                    <input
                      className="h-9 min-w-0 flex-1 bg-transparent px-2 text-sm font-semibold outline-none placeholder:text-slate-500"
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") sendMessage();
                      }}
                      placeholder="Ask a question or enter command..."
                      value={input}
                    />
                    <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700" type="button">
                      <Mic className="h-4 w-4" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0B2B32] text-white" onClick={() => sendMessage()} type="button">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-lg font-bold text-black">Command History</h2>
              </div>
              <div className="grid gap-2 p-4 md:grid-cols-2">
                {quickActions.map((action) => (
                  <button
                    className="flex items-center gap-2 rounded-md border border-border bg-slate-50 px-3 py-2 text-left text-xs font-bold text-black hover:bg-white"
                    key={action}
                    onClick={() => sendMessage(action)}
                    type="button"
                  >
                    <MessageSquare className="h-4 w-4 text-[#0B2B32]" />
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white p-4 shadow-soft">
              <h2 className="text-base font-bold text-black">24h Signal Summary</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-orange-200 bg-orange-50 p-3">
                  <p className="text-2xl font-bold text-black">13,450</p>
                  <p className="text-xs font-bold text-orange-700">Events analyzed</p>
                </div>
                <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                  <p className="text-2xl font-bold text-black">652K</p>
                  <p className="text-xs font-bold text-blue-700">Linked signals</p>
                </div>
              </div>
              <TrafficMiniChart tick={tick} />
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Insights</h2>
                <MoreHorizontal className="h-5 w-5 text-black" />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Top Issue Detected</p>
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-lg font-bold text-black">Router R1 Down</p>
                  <p className="mt-1 text-xs font-semibold text-red-700">Detected 3 min ago</p>
                </div>
                <div className="mt-4 rounded-lg border border-border bg-slate-50 p-3">
                  <svg className="h-28 w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                    <path d="M12 36 L45 18 L84 36" fill="none" stroke="#EF4444" strokeLinecap="round" strokeWidth="2" />
                    <path d="M45 18 L84 24" fill="none" stroke="#16A34A" strokeLinecap="round" strokeWidth="2" />
                    <circle cx="12" cy="36" fill="#0B2B32" r="6" />
                    <circle cx="45" cy="18" fill="#DC2626" r="8" />
                    <circle cx="84" cy="24" fill="#16A34A" r="6" />
                    <text fill="#0F172A" fontSize="5" fontWeight="700" textAnchor="middle" x="45" y="20">R1</text>
                  </svg>
                </div>
                <div className="mt-4 space-y-2 text-xs font-bold text-slate-700">
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" /> Switch S2 loss of signal</p>
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" /> Fiber Link A-6 degraded</p>
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500" /> Internet gateway service down</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Suggested Actions</h2>
              </div>
              <div className="grid gap-2 p-4">
                <button className="h-9 rounded-md bg-[#0B2B32] text-xs font-bold text-white" onClick={() => sendMessage("Restart interface Ge0/1 on Router R1")} type="button">Execute Action</button>
                <button className="h-9 rounded-md border border-slate-300 bg-white text-xs font-bold text-black" onClick={() => sendMessage("Run diagnostics for Router R1")} type="button">Run Diagnostics</button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white shadow-soft">
              <div className="border-b border-border p-4">
                <h2 className="text-base font-bold text-black">Analysis Logs</h2>
              </div>
              <div className="space-y-3 p-4">
                {[
                  ["Incident identified: Router R1 Failure", "2 min ago"],
                  ["User asked: Show impacted nodes", "4 min ago"],
                  ["Copilot verified dependencies", "5 min ago"]
                ].map(([log, time]) => (
                  <div className="flex gap-3" key={log}>
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#0B2B32]" />
                    <div>
                      <p className="text-xs font-bold text-black">{log}</p>
                      <p className="text-xs font-semibold text-slate-600">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 shadow-soft">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-700" />
                <h2 className="text-base font-bold text-black">Predicted Failure</h2>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-700">{latestCopilot || "Router R1 requires attention."}</p>
              <p className="mt-3 text-xs font-bold text-orange-700">11:00 AM analysis window</p>
            </div>
          </aside>
        </section>
        </main>
      </div>
    </div>
  );
}
