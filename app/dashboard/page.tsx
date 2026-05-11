"use client";

import { AlertsTable } from "@/components/AlertsTable";
import { CopilotPanel } from "@/components/CopilotPanel";
import { KpiCard } from "@/components/KpiCard";
import { Navbar } from "@/components/Navbar";
import { PlaybooksCard } from "@/components/PlaybooksCard";
import { RiskPanel } from "@/components/RiskPanel";
import { RootCauseCard } from "@/components/RootCauseCard";
import { Sidebar } from "@/components/Sidebar";
import { TopologyGraph } from "@/components/TopologyGraph";
import { TrafficChart } from "@/components/TrafficChart";
import { kpis } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Sparkles, Zap, Brain, Target } from "lucide-react";
import { IamTermsModal } from "@/components/IamTermsModal";

export default function DashboardPage() {
  const [isBetaUser, setIsBetaUser] = useState(false);
  const [showIamModal, setShowIamModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const beta = localStorage.getItem("isBetaUser") === "true";
    setIsBetaUser(beta);

    const userType = localStorage.getItem("user_type");
    const hasAcceptedTerms = localStorage.getItem("iam_dashboard_terms_accepted") === "true";

    if (userType === "iam" && !hasAcceptedTerms) {
      setShowIamModal(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem("iam_dashboard_terms_accepted", "true");
    setShowIamModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <IamTermsModal isOpen={isMounted && showIamModal} onAccept={handleAcceptTerms} />
      
      {/* Hide dashboard content while IAM modal is active or during initial hydration to prevent flash */}
      <div className={`transition-opacity duration-500 ${(!isMounted || showIamModal) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Sidebar />
        <div className="app-shell lg:pl-72 flex flex-col h-screen overflow-hidden">
          <Navbar />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
          {/* Welcome Header */}
          <div className="relative overflow-hidden rounded-2xl bg-[#13161F] border border-white/5 shadow-2xl">
            {/* Grid texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
            {/* Green glow top-left */}
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#41bf63]/10 blur-3xl pointer-events-none" />
            {/* Green gradient right */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#41bf63]/8 via-transparent to-transparent pointer-events-none" />

            <div className="relative p-6 lg:px-8 lg:py-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#41bf63] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#41bf63]" />
                  </span>
                  <span className="text-[10px] font-black text-[#41bf63] uppercase tracking-[0.2em]">Production Environment Active</span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl lg:text-[28px] font-black tracking-tight text-white uppercase leading-tight">
                    Network Operations{" "}
                    <span className="bg-gradient-to-r from-[#41bf63] to-[#6ee7a0] bg-clip-text text-transparent">
                      Command Center
                    </span>
                  </h1>
                  <p className="mt-1.5 text-[13px] font-medium text-slate-500 max-w-xl leading-relaxed">
                    Real-time incident posture · Topology health · Automation pipelines · Risk intelligence
                  </p>
                </div>
              </div>

              {/* Right: Status Pills */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 rounded-xl bg-[#41bf63]/10 border border-[#41bf63]/20 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#41bf63] shadow-[0_0_6px_rgba(65,191,99,0.8)]" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#41bf63]/70 uppercase tracking-widest leading-none">Uptime</span>
                    <span className="text-sm font-black text-white leading-tight">92% Available</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-orange-500/70 uppercase tracking-widest leading-none">Open</span>
                    <span className="text-sm font-black text-white leading-tight">4 Active Risks</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2.5">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Last Sync</span>
                    <span className="text-sm font-black text-white leading-tight">Just Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beta Insider Banner */}
          {isBetaUser && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#41bf63]/20 via-[#41bf63]/5 to-transparent border border-[#41bf63]/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#41bf63] text-black">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Insider Beta Mode Active</h3>
                    <p className="text-[10px] font-medium text-slate-500">You have access to experimental topology AI and predictive automation playbooks.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#41bf63]/20 px-2 py-1 text-[8px] font-black text-[#41bf63] uppercase">v0.9-Insider</span>
                </div>
              </div>
            </div>
          )}

          {/* Service Health Grid */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-[2px] rounded-full bg-[#41bf63]" />
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Service Health</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Updated just now</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#41bf63] shadow-[0_0_6px_rgba(65,191,99,0.6)]" />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {kpis.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} />
              ))}
            </div>
          </section>


          {/* Main Content Grid */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Left & Middle: Detailed Operations */}
            <div className="xl:col-span-2 space-y-6">
              {/* Alerts Table */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Alerts Requiring Attention</h3>
                  <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">View All</button>
                </div>
                <div className="p-1">
                  <AlertsTable />
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Performance Metrics</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#41bf63]" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Network Traffic</span>
                    </div>
                    <select className="bg-transparent text-[10px] font-bold text-slate-400 uppercase tracking-widest outline-none border-none">
                      <option>24 Hours</option>
                    </select>
                  </div>
                </div>
                <div className="p-6">
                  <TrafficChart />
                </div>
              </div>

              {/* Bottom Row: Topology & RCA */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Network Topology</h3>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#41bf63] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#41bf63] uppercase">Live</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <TopologyGraph />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Root Cause Identified</h3>
                    <span className="rounded bg-[#41bf63]/10 px-2 py-0.5 text-[10px] font-bold text-[#41bf63] uppercase">94% Confidence</span>
                  </div>
                  <div className="p-6">
                    <RootCauseCard />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Action Panels */}
            <div className="space-y-6">
              {/* Automation Playbooks */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automation Playbooks</h3>
                </div>
                <div className="p-5">
                  <PlaybooksCard />
                </div>
              </div>

              {/* AI Copilot Suggestion */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Copilot</h3>
                </div>
                <div className="p-5">
                  <CopilotPanel />
                </div>
              </div>

              {/* Fraud & Fiber Risk */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fraud & Fiber Risk</h3>
                </div>
                <div className="p-5">
                  <RiskPanel />
                </div>
              </div>

              {/* Beta-only Card */}
              {isBetaUser && (
                <div className="rounded-2xl border border-[#41bf63]/20 bg-[#13161F] shadow-xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-3">
                    <Sparkles className="h-4 w-4 text-[#41bf63]" />
                  </div>
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Predictive Insights</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded bg-blue-500/10 text-blue-400">
                        <Brain className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white uppercase">Traffic Anomaly Detected</p>
                        <p className="text-[9px] text-slate-500">AI predicts 15% packet loss in Mumbai node within 2 hours.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded bg-yellow-500/10 text-yellow-400">
                        <Target className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white uppercase">Optimization Target</p>
                        <p className="text-[9px] text-slate-500">Rerouting Segment-04 could save 40ms latency.</p>
                      </div>
                    </div>
                    <button className="w-full py-2.5 rounded-lg bg-[#41bf63] text-black text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#bce628]">
                      Apply Beta Fix
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      </div>
    </div>
  );
}
