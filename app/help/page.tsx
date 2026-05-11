"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { 
  Search, 
  BookOpen, 
  Code2, 
  ShieldCheck, 
  LifeBuoy, 
  MessageSquare, 
  Mail, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileText,
  Zap,
  Network,
  Lock,
  ArrowUpRight
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  if (!isMounted) return null;

  const categories = [
    {
      title: "Getting Started",
      desc: "Learn the basics of Teleroot and set up your network command center.",
      icon: Zap,
      color: "text-[#41bf63]",
      bg: "bg-[#41bf63]/10",
      link: "#"
    },
    {
      title: "Network Intelligence",
      desc: "Deep dive into topology mapping, root cause analysis, and fiber monitoring.",
      icon: Network,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      link: "#"
    },
    {
      title: "Security & Fraud",
      desc: "Configure fraud detection signatures and security audit logging.",
      icon: ShieldCheck,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      link: "#"
    },
    {
      title: "API & SDK",
      desc: "Integrate Teleroot with your existing stack using our robust API.",
      icon: Code2,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      link: "#"
    }
  ];

  const faqs = [
    {
      q: "How do I set up a new Recon Agent?",
      a: "Go to the Agent Management section, click 'Add Agent', and follow the terminal installation guide for your specific OS."
    },
    {
      q: "What does a 'Fiber Attenuation Drift' alert mean?",
      a: "This indicates a potential physical layer issue in your fiber ring, usually caused by environmental stress or splice degradation."
    },
    {
      q: "How can I export my network reports?",
      a: "Navigate to the Reports page and use the 'Export All' button at the top right to download data in PDF or CSV format."
    },
    {
      q: "Is Teleroot compliant with SOC2/GDPR?",
      a: "Yes, Teleroot follows strict enterprise compliance standards. You can view our security posture in the Settings > Compliance tab."
    }
  ];

  const recentArticles = [
    "Integrating AI Copilot with Slack",
    "Optimizing Metro Ring Latency",
    "New: Smart Alerts v2.0 Guide",
    "Managing RBAC for IAM Users"
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header & Search */}
          <section className="relative overflow-hidden rounded-3xl bg-[#13161F] border border-white/5 shadow-2xl p-8 lg:p-12">
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-[#41bf63]/5 blur-[100px] pointer-events-none" />
            
            <div className="relative max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#41bf63]/25 bg-[#41bf63]/10 px-4 py-2">
                <HelpCircle className="h-4 w-4 text-[#41bf63]" />
                <span className="text-[10px] font-black text-[#41bf63] uppercase tracking-[0.2em]">Teleroot Support Hub</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                How can we{" "}
                <span className="bg-gradient-to-r from-[#41bf63] to-[#6ee7a0] bg-clip-text text-transparent">
                  help you
                </span>{" "}
                today?
              </h1>
              
              <div className="relative group max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500 group-focus-within:text-[#41bf63] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search documentation, guides, and troubleshooting..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[#0B0D14] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#41bf63]/50 focus:ring-4 focus:ring-[#41bf63]/10 transition-all text-sm font-medium"
                />
              </div>
              
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Popular topics: <span className="text-slate-300 hover:text-[#41bf63] cursor-pointer transition-colors">Recon Agents</span>, <span className="text-slate-300 hover:text-[#41bf63] cursor-pointer transition-colors">MTTR Optimization</span>, <span className="text-slate-300 hover:text-[#41bf63] cursor-pointer transition-colors">API Keys</span>
              </p>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat.title}
                className="group relative rounded-2xl border border-white/5 bg-[#13161F] p-6 hover:border-[#41bf63]/30 transition-all hover:translate-y-[-4px] shadow-xl"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">{cat.desc}</p>
                <button className="flex items-center gap-2 text-[10px] font-black text-[#41bf63] uppercase tracking-widest hover:underline">
                  View Guides
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </section>

          {/* Main Content: FAQ & Recent */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-[2px] rounded-full bg-[#41bf63]" />
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i}
                    className="rounded-2xl border border-white/5 bg-[#13161F] p-6 hover:bg-white/[0.02] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#41bf63] transition-colors">{faq.q}</h4>
                      <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-all group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Support */}
            <div className="space-y-6">
              
              {/* Contact Card */}
              <div className="rounded-2xl border border-[#41bf63]/20 bg-[#41bf63]/5 p-8 text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#41bf63] text-black">
                  <LifeBuoy className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Need more help?</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">Our network engineers are available 24/7 for enterprise support.</p>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-3 rounded-xl bg-[#41bf63] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#bce628] transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Live Chat Support
                  </button>
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </button>
                </div>
              </div>

              {/* Recent Updates */}
              <div className="rounded-2xl border border-white/5 bg-[#13161F] p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-4 w-4 text-[#41bf63]" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Recent Updates</h3>
                </div>
                <div className="space-y-4">
                  {recentArticles.map((art, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">{art}</span>
                      <ExternalLink className="h-3 w-3 text-slate-600 group-hover:text-[#41bf63] transition-all" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
