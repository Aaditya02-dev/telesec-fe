"use client";

import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import {
  User, Shield, Users, Key, Smartphone, Monitor, Lock,
  Building, FileText, Network, Bell, Clock, ShieldAlert,
  DownloadCloud, ArrowRight, UserCheck, ClipboardCheck,
  Hexagon, HeartHandshake, Box, Activity, ArrowUpRight, CheckCircle2, ChevronRight, Database
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {/* Header Title section (To match the exact text under the top bar if needed) */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-sm text-slate-400">Manage your account, workspace and platform preferences.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
            {/* Left Promotional Column */}
            <div className="xl:col-span-3">
              <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl bg-[#13161F] border border-[#41bf63]/20 shadow-[0_0_30px_rgba(65,191,99,0.05)] p-5 flex flex-col">
                {/* Glowing Background Elements */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(65,191,99,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(65,191,99,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-[#41bf63]/20 blur-[50px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0B0C10] to-transparent z-0" />
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#41bf63] to-transparent opacity-50" />

                {/* Side Banner Image */}
                <div className="relative z-10 flex-1 py-2">
                  <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0C10] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <div className="absolute inset-y-0 left-1/2 w-[135%] -translate-x-1/2">
                      <Image
                        src="/sidebanner.png"
                        alt="Teleroot settings banner"
                        fill
                        priority
                        sizes="(min-width: 1280px) 34vw, 135vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/15 to-transparent" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 mt-auto pt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">Intelligent Network.</h3>
                    <h3 className="text-lg font-bold text-slate-300 leading-tight">Proactive Operations.</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Teleroot combines observability and AI to help you detect issues, analyze root causes, and automate resolutions faster than ever.
                  </p>
                  <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold text-[#41bf63] hover:text-[#bce628] transition-colors mt-2">
                    Learn more about Teleroot
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Main Content Column */}
            <div className="xl:col-span-9 space-y-4">

              {/* Profile & Identity Card */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-4 sm:p-5 shadow-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <User className="h-4 w-4 text-[#41bf63]" />
                  <div>
                    <h2 className="text-base font-bold text-white">Profile & Identity</h2>
                    <p className="text-xs text-slate-400">Manage your personal information and login details.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* Personal Info Box */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 relative">
                        <span className="text-lg font-bold text-slate-400">AS</span>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#13161F] border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5">
                          <User className="h-2.5 w-2.5 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-bold text-white">Admin</p>
                        <p className="text-[11px] text-slate-400">admin@teleroot.com</p>
                        <span className="inline-flex mt-1 items-center rounded bg-[#41bf63]/10 px-2 py-0.5 text-[10px] font-bold text-[#41bf63] border border-[#41bf63]/20">
                          Organization Admin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings Box */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2 flex flex-col justify-center gap-1">
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="h-7 w-7 shrink-0 rounded-md bg-[#41bf63]/10 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-[#41bf63]" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-[#41bf63] transition-colors truncate">Change Password</p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#41bf63]" />
                    </button>

                    <div className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="h-7 w-7 shrink-0 rounded-md bg-[#41bf63]/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-[#41bf63]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">Two-Factor Auth</p>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${twoFactorEnabled ? 'bg-[#41bf63]' : 'bg-slate-700'}`}
                      >
                        <span className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${twoFactorEnabled ? 'translate-x-3' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="h-7 w-7 shrink-0 rounded-md bg-[#41bf63]/10 flex items-center justify-center">
                        <Monitor className="h-4 w-4 text-[#41bf63]" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-[#41bf63] transition-colors truncate">Active Sessions</p>
                      </div>
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300">3 Active</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Observability & Agents Card */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-4 sm:p-5 shadow-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <Activity className="h-4 w-4 text-[#41bf63]" />
                  <div>
                    <h2 className="text-base font-bold text-white">Observability & Agents</h2>
                    <p className="text-xs text-slate-400">Configure network telemetry, agent deployments, and monitoring thresholds.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { title: "Agent Management", desc: "Deploy and configure scanning nodes", icon: Box },
                    { title: "Telemetry Ingestion", desc: "Manage log formats and pipelines", icon: Database },
                    { title: "Fiber Monitoring", desc: "Adjust optical signal thresholds", icon: Activity },
                    { title: "Topology Maps", desc: "Configure mapping frequency", icon: Network }
                  ].map((item) => (
                    <button key={item.title} className="flex items-center gap-3 text-left p-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-[#41bf63]/30 transition-all group overflow-hidden">
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-[#41bf63]/10 flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-[#41bf63]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-white group-hover:text-[#41bf63] transition-colors truncate">{item.title}</h3>
                        <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-slate-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Engine & Automation Card */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-4 sm:p-5 shadow-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <Hexagon className="h-4 w-4 text-[#41bf63]" />
                  <div>
                    <h2 className="text-base font-bold text-white">AI Engine & Automation</h2>
                    <p className="text-xs text-slate-400">Tune the AI Copilot and manage automated resolution playbooks.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { title: "AI Copilot", desc: "Adjust analysis depth and responses", icon: HeartHandshake },
                    { title: "Automation Playbooks", desc: "Manage auto-remediation scripts", icon: FileText },
                    { title: "Fraud Detection", desc: "Configure anomaly thresholds", icon: ShieldAlert },
                    { title: "Root Cause Insight", desc: "Tune correlation algorithms", icon: Clock }
                  ].map((item) => (
                    <button key={item.title} className="flex items-center gap-3 text-left p-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-[#41bf63]/30 transition-all group overflow-hidden">
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-[#41bf63]/10 flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-[#41bf63]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-white group-hover:text-[#41bf63] transition-colors truncate">{item.title}</h3>
                        <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-slate-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Alerts & Integrations Card */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-4 sm:p-5 shadow-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <Bell className="h-4 w-4 text-[#41bf63]" />
                  <div>
                    <h2 className="text-base font-bold text-white">Alerts & Integrations</h2>
                    <p className="text-xs text-slate-400">Configure escalation policies and third-party webhook integrations.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { title: "Notification Channels", desc: "Manage Slack and Email alerts", icon: Bell },
                    { title: "Escalation Policies", desc: "Set rules for critical alerts", icon: ArrowUpRight },
                    { title: "API Webhooks", desc: "Configure third-party integrations", icon: Network },
                    { title: "System Audit", desc: "View playbook execution logs", icon: FileText }
                  ].map((item) => (
                    <button key={item.title} className="flex items-center gap-3 text-left p-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-[#41bf63]/30 transition-all group overflow-hidden">
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-[#41bf63]/10 flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-[#41bf63]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-white group-hover:text-[#41bf63] transition-colors truncate">{item.title}</h3>
                        <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-slate-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Need Help Footer Card */}
              <div className="rounded-xl border border-[#41bf63]/20 bg-[#41bf63]/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-lg bg-[#41bf63]/20 flex items-center justify-center shrink-0">
                    <HeartHandshake className="h-5 w-5 text-[#41bf63]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Need help?</h3>
                    <p className="text-xs text-slate-400">Visit our Help Center or contact support for assistance.</p>
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#13161F] text-xs font-bold text-white hover:bg-white/5 transition-colors">
                  Visit Help Center
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
