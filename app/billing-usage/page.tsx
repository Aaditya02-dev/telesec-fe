"use client";

import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  CreditCard,
  Download,
  Filter,
  HardDrive,
  Plus,
  Receipt,
  Rocket,
  Server,
  ShieldCheck
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

const usageMetrics = [
  { label: "API Requests Used", value: "8,500 / 10,000", percent: 85, icon: Activity },
  { label: "Storage Used", value: "2 GB / 5 GB", percent: 40, icon: HardDrive },
  { label: "Monitored Devices", value: "1,248 / 1,500", percent: 83, icon: Server }
];

const invoices = [
  { date: "May 03, 2026", description: "Enterprise Plan - Monthly", amount: "$499.00", status: "Paid", action: "Download Invoice" },
  { date: "Apr 03, 2026", description: "Enterprise Plan - Monthly", amount: "$499.00", status: "Paid", action: "Download Invoice" },
  { date: "Mar 03, 2026", description: "Enterprise Plan - Monthly", amount: "$499.00", status: "Paid", action: "Download Invoice" }
];

export default function BillingUsagePage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72 flex h-screen flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#13161F] p-6 shadow-2xl lg:px-8">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[#41bf63]/10 blur-3xl" />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#41bf63]/8 via-transparent to-transparent" />

            <div className="relative max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1.5">
                <CreditCard className="h-3.5 w-3.5 text-[#41bf63]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#41bf63]">Billing & Usage</span>
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white lg:text-[28px]">Subscription Control Center</h1>
              <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-400">
                Manage your TeleRoot subscription, track network usage limits, review billing history, and update payment details in one place.
              </p>
            </div>
          </div>

          <section className="mt-6 space-y-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_1.15fr]">
              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-5 shadow-xl">
                <div className="flex items-start justify-between border-b border-white/5 pb-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Current Plan</p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#41bf63]/25 bg-[#41bf63]/10">
                        <Rocket className="h-5 w-5 text-[#41bf63]" />
                      </span>
                      <div>
                        <h2 className="text-xl font-black text-white">Enterprise</h2>
                        <p className="text-xs font-semibold text-slate-500">Built for production network operations</p>
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#41bf63]/20 bg-[#41bf63]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#41bf63]">Active</span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Monthly Cost</p>
                    <p className="mt-1 text-3xl font-black text-white">$499<span className="text-sm font-semibold text-slate-500"> / month</span></p>
                  </div>
                  <Link href="/pricing" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#41bf63] px-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-[#bce628]">
                    Upgrade <Rocket className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-5 shadow-xl">
                <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Usage Summary</p>
                    <h2 className="mt-1 text-sm font-bold text-white">Current billing cycle</h2>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">May 2026</span>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {usageMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <metric.icon className="h-4 w-4 text-[#41bf63]" />
                        <span className="text-[10px] font-black text-slate-500">{metric.percent}%</span>
                      </div>
                      <p className="text-sm font-black text-white">{metric.value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
                      <div className="mt-3 h-1.5 rounded-full bg-white/10">
                        <span className="block h-full rounded-full bg-[#41bf63]" style={{ width: `${metric.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Billing History</p>
                  <h2 className="mt-1 text-sm font-bold text-white">Recent invoices and payment status</h2>
                </div>
                <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-white transition hover:bg-white/10">
                  Filter <Filter className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="border-b border-white/5 bg-white/[0.03] text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Description</th>
                      <th className="px-5 py-3">Amount</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {invoices.map((invoice) => (
                      <tr key={invoice.date} className="transition hover:bg-white/[0.02]">
                        <td className="px-5 py-4 font-semibold text-slate-300">{invoice.date}</td>
                        <td className="px-5 py-4 font-bold text-white">{invoice.description}</td>
                        <td className="px-5 py-4 font-semibold text-slate-300">{invoice.amount}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#41bf63]/20 bg-[#41bf63]/10 px-2.5 py-1 text-[10px] font-black uppercase text-[#41bf63]">
                            <CheckCircle2 className="h-3 w-3" />
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#41bf63] transition hover:text-[#bce628]">
                            {invoice.action} <Download className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="relative overflow-hidden rounded-2xl border border-[#41bf63]/20 bg-[#10221a] p-5 shadow-xl">
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#41bf63]/20 blur-3xl" />
                <div className="relative flex h-44 flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black italic tracking-wider text-white">VISA</p>
                    <CreditCard className="h-5 w-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-[0.18em] text-white">1520 0100 3356 6888</p>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Name</p>
                        <p className="text-xs font-bold text-white">TeleRoot Admin</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Valid Thru</p>
                        <p className="text-xs font-bold text-white">24/11</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[#13161F] text-slate-400 transition hover:border-[#41bf63]/40 hover:bg-[#41bf63]/5 hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                  <Plus className="h-5 w-5" />
                </span>
                <span className="text-xs font-black uppercase tracking-widest">Add New Card</span>
              </button>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#13161F] p-5 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#41bf63]/10 text-[#41bf63]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">Secure Billing</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Payment details are encrypted and billing events are logged for audit-ready telecom operations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
