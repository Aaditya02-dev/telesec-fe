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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10">
          {/* Welcome Header */}
          <div className="mb-6 relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#1B2629] to-[#1F2C30] border border-white/5 shadow-xl">
            
            <div className="relative p-6 lg:px-8 lg:py-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              <div className="space-y-2">
                {/* Eyebrow text for technical feel */}
                <div className="flex items-center gap-2 text-[#D4F84A] text-[10px] font-bold tracking-[0.2em] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4F84A] animate-pulse" />
                  System Active
                </div>
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
                    Network Operations <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4F84A] to-[#85B100]">Control</span>
                  </h1>
                  <p className="mt-1 max-w-2xl text-sm font-medium text-slate-400 leading-snug">
                    Live incident posture, topology health, automation, and real-time risk signals 
                    across your global infrastructure.
                  </p>
                </div>
              </div>
              
              {/* Right side stats & actions */}
              <div className="flex flex-col sm:flex-row items-stretch rounded-[12px] border border-white/10 bg-[#0F171A]/60 backdrop-blur-md overflow-hidden shadow-lg">
                
                {/* Availability Stat */}
                <div className="flex flex-col justify-center px-5 py-3 sm:border-r border-b sm:border-b-0 border-white/10">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-0.5">Availability</span>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" />
                    <span className="text-lg font-black text-white tracking-tight">99.92%</span>
                  </div>
                </div>
                
                {/* Risks Stat */}
                <div className="flex flex-col justify-center px-5 py-3 sm:border-r border-b sm:border-b-0 border-white/10 bg-white/[0.02]">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-0.5">Open Risks</span>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                    <span className="text-lg font-black text-white tracking-tight">4</span>
                  </div>
                </div>
                
                {/* Export Button */}
                <button className="flex items-center justify-center px-6 py-3 sm:py-0 text-[13px] font-bold text-white transition-all bg-white/5 hover:bg-[#D4F84A] hover:text-black">
                  Export Report
                </button>
                
              </div>
            </div>
            
            {/* Subtle Decorative Glow */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#D4F84A]/5 to-transparent pointer-events-none blur-3xl" />
          </div>

          {/* Service Health Section */}
          <div className="mb-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-[#85B100] rounded-full" />
                <h2 className="text-lg font-bold text-[#1F2C30] uppercase tracking-wider">Service Health</h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                Updated just now
              </div>
            </div>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {kpis.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} />
              ))}
            </section>
          </div>

          {/* Main Content Grid */}
          <div className="mt-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1 bg-[#1F2C30] rounded-full" />
              <h2 className="text-lg font-bold text-[#1F2C30] uppercase tracking-wider">Operations Workspace</h2>
            </div>
            
            <section className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              <div className="space-y-8 xl:col-span-2">
                <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-[#1F2C30]">Critical Incidents</h3>
                    <button className="text-xs font-bold text-[#85B100] hover:underline">View All</button>
                  </div>
                  <div className="p-2 flex-1">
                    <AlertsTable />
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] border border-white/5 bg-gradient-to-b from-[#1B2629] to-[#0F171A] shadow-xl overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold text-white">Network Traffic Analysis</h3>
                  </div>
                  <div className="p-6 flex-1">
                    <TrafficChart />
                  </div>
                </div>

                <div className="mb-4 mt-8 flex items-center gap-3">
                  <div className="h-8 w-1 bg-[#85B100] rounded-full" />
                  <h2 className="text-lg font-bold text-[#1F2C30] uppercase tracking-wider">Intelligence Hub</h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <h3 className="font-bold text-[#1F2C30]">Network Topology Health</h3>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">Live Pulse</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <TopologyGraph />
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <h3 className="font-bold text-[#1F2C30]">Root Cause Insight</h3>
                      <div className="flex items-center gap-2 rounded-full border border-[#D4F84A]/30 bg-[#D4F84A]/10 px-3 py-1">
                        <span className="text-[10px] font-bold text-[#85B100] uppercase">AI Reasoning</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <RootCauseCard />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-[24px] border border-slate-200 bg-white p-1 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-[#1F2C30]">Automation Playbooks</h3>
                  </div>
                  <div className="p-4">
                    <PlaybooksCard />
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-1 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-[#1F2C30]">AI Copilot</h3>
                  </div>
                  <div className="p-4">
                    <CopilotPanel />
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-1 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-[#1F2C30]">Risk Signals</h3>
                  </div>
                  <div className="p-4">
                    <RiskPanel />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
