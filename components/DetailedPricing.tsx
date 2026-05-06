"use client";

import { useState } from "react";
import { Check, X, User, Monitor, Database, Bot, Search, Settings, ShieldAlert, Wifi, Users, Key, Headphones, Clock, ShieldCheck, RefreshCw, Lock, Zap } from "lucide-react";

export function DetailedPricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800 flex items-center justify-center relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400 rounded-full blur-[150px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-400 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-cyan-300 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Intelligent Project Pricing Solutions
          </h1>
          <p className="text-slate-500 mb-5 text-sm">
            Empower your enterprise with scalable, project-based plans tailored for strategic network management.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-colors ${
                  billing === "monthly" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-colors ${
                  billing === "yearly" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Yearly
              </button>
            </div>
            <div className="flex items-center text-green-500 text-xs font-medium">
              <span className="mr-1">⟷</span> Save up to 20% with yearly billing
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6 items-stretch">
          
          {/* Plan Features Column */}
          <div className="hidden lg:flex flex-col w-60 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm overflow-hidden mt-4">
            <div className="h-[210px] p-5 flex flex-col justify-end pb-8">
              <div className="bg-[#1F2C30] rounded-xl p-4 shadow-2xl border border-white/10">
                <h3 className="text-white font-black text-[16px] tracking-widest uppercase text-center">
                  PLAN FEATURES
                </h3>
              </div>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] font-bold text-slate-900">
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><User className="w-3.5 h-3.5 text-blue-600" /> Active Agents</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Monitor className="w-3.5 h-3.5 text-blue-600" /> Devices Monitored</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Database className="w-3.5 h-3.5 text-blue-600" /> Data Retention</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Bot className="w-3.5 h-3.5 text-blue-600" /> AI Agents</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Search className="w-3.5 h-3.5 text-blue-600" /> Root Cause Analysis</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Settings className="w-3.5 h-3.5 text-blue-600" /> Automation Engine</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Fraud Detection</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Wifi className="w-3.5 h-3.5 text-blue-600" /> Fiber Prediction</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Users className="w-3.5 h-3.5 text-blue-600" /> Multi-User Access</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Key className="w-3.5 h-3.5 text-blue-600" /> Role-Based Access</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Headphones className="w-3.5 h-3.5 text-blue-600" /> Support</div>
              <div className="flex items-center gap-2.5 px-5 h-[38px] border-t border-slate-200/50"><Clock className="w-3.5 h-3.5 text-blue-600" /> SLA</div>
            </div>
            
            <div className="h-[74px] border-t border-slate-100 bg-transparent"></div>
          </div>

          {/* Starter Card */}
          <div className="flex-1 flex flex-col rounded-[20px] border border-slate-200 overflow-visible bg-white text-center shadow-sm relative mt-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-teal-400 group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-white rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-teal-400 text-white font-bold px-5 py-1.5 rounded-r-md shadow-md text-xs tracking-wider z-10">
                STARTER
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-teal-600 border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-3xl font-black text-slate-900">
                  {billing === "monthly" ? "₹999" : "₹833"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">/ Per Month</div>
              
              <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px]">
                <span className="text-slate-600 font-bold">₹9,990 / yr</span>
                <span className="bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded text-[9px] font-bold">Save 20%</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                Perfect for getting started.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-600 font-medium bg-white">
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Up to 50</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">100</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">7 days</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Limited (2)</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Community</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
            </div>
            
            <div className="h-[74px] border-t border-slate-100 bg-white rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#1F2C30] hover:bg-[#2a3c42] text-white font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-md">
                Get Started
              </button>
            </div>
          </div>

          {/* Professional Card (Most Popular) */}
          <div className="flex-1 flex flex-col rounded-[20px] border-2 border-blue-400 overflow-visible bg-white text-center shadow-xl relative z-10 mt-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-600 group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-white rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-blue-500 text-white font-bold px-5 py-1.5 rounded-r-md shadow-md text-xs tracking-wider z-10">
                PROFESSIONAL
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-blue-700 border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[9px] font-bold px-3 py-1.5 rounded-bl-lg rounded-tr-[18px] uppercase tracking-wider">
                Most Popular
              </div>
              
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-3xl font-black text-slate-900">
                  {billing === "monthly" ? "₹2,499" : "₹2,083"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">/ Per Month</div>
              
              <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px]">
                <span className="text-slate-600 font-bold">₹24,990 / yr</span>
                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-bold">Save 20%</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                For growing teams.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-700 font-medium bg-white">
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Up to 200</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">500</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">30 days</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Full</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-blue-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-blue-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-blue-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-blue-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-blue-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-blue-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Standard</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><X className="w-4 h-4 text-slate-300" /></div>
            </div>
            
            <div className="h-[74px] border-t border-slate-100 bg-white rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#1F2C30] hover:bg-[#2a3c42] text-white font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-md">
                Get Started
              </button>
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="flex-1 flex flex-col rounded-[20px] border border-slate-200 overflow-visible bg-white text-center shadow-sm relative mt-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-500 group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-white rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-purple-500 text-white font-bold px-5 py-1.5 rounded-r-md shadow-md text-xs tracking-wider z-10">
                ENTERPRISE
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-purple-700 border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-3xl font-black text-slate-900">
                  {billing === "monthly" ? "₹5,999" : "₹4,999"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">/ Per Month</div>
              
              <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px]">
                <span className="text-slate-600 font-bold">₹59,990 / yr</span>
                <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[9px] font-bold">Save 20%</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                For advanced operations.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-600 font-medium bg-white">
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Unlimited</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">2000+</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">90 days</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Full + Adv.</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Priority</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-purple-500" /></div>
            </div>
            
            <div className="h-[74px] border-t border-slate-100 bg-white rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#1F2C30] hover:bg-[#2a3c42] text-white font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-md">
                Get Started
              </button>
            </div>
          </div>

          {/* Custom Card */}
          <div className="flex-1 flex flex-col rounded-[20px] border border-slate-200 overflow-visible bg-white text-center shadow-sm relative mt-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-pink-500 group">
            <div className="h-[210px] p-5 pt-16 flex flex-col items-center justify-center relative bg-white rounded-t-[20px]">
              {/* Ribbon */}
              <div className="absolute top-6 left-[-8px] bg-pink-500 text-white font-bold px-5 py-1.5 rounded-r-md shadow-md text-xs tracking-wider z-10">
                CUSTOM
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-t-pink-700 border-l-[8px] border-l-transparent"></div>
              </div>
              
              <div className="flex items-baseline justify-center mb-1 mt-2">
                <span className="text-xl font-black text-slate-900">Custom Pricing</span>
              </div>
              
              <p className="text-[11px] text-slate-500 px-2 leading-relaxed mt-4">
                Tailored for your business. Contact us for a quote.
              </p>
            </div>
            
            <div className="flex flex-col flex-grow text-[13px] text-slate-600 font-medium bg-white">
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Custom</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100">Dedicated</div>
              <div className="flex items-center justify-center h-[38px] border-t border-slate-100"><Check className="w-4 h-4 text-pink-500" /></div>
            </div>
            
            <div className="h-[74px] border-t border-slate-100 bg-white rounded-b-[20px] flex items-center justify-center p-4">
              <button className="w-full bg-[#1F2C30] hover:bg-[#2a3c42] text-white font-bold py-2.5 rounded-full text-[12px] uppercase tracking-wider transition-colors shadow-md">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Footer Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 rounded-xl border border-slate-200 bg-white p-5 items-start mt-8">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Token Based</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Pay for what you use. No hidden costs.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Flexible</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Upgrade, downgrade anytime.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Secure</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Enterprise data protection.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">Instant Access</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Get started in minutes.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-0.5">24/7 Support</h4>
              <p className="text-[10px] text-slate-500 leading-tight">We're here to support you.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
