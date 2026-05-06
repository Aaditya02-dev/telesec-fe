"use client";

import { motion } from "framer-motion";
import { Clock, TrendingDown, Activity, ShieldCheck, Cpu } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="h-10 w-10 text-[#1B2629]" />,
    text: "Reduce Mean Time To Resolution (MTTR) from hours to seconds with AI-driven correlation."
  },
  {
    icon: <TrendingDown className="h-10 w-10 text-[#1B2629]" />,
    text: "Eliminate alert fatigue by deduplicating millions of signals into single actionable incidents."
  },
  {
    icon: <Activity className="h-10 w-10 text-[#1B2629]" />,
    text: "Automate Tier-1 and Tier-2 triage to free up engineering resources for strategic growth."
  },
  {
    icon: <Cpu className="h-10 w-10 text-[#1B2629]" />,
    text: "Move from reactive firefighting to proactive maintenance using predictive health models."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-[#1B2629]" />,
    text: "Ensure 99.999% uptime for global infrastructure with self-healing network protocols."
  }
];

export function LandingBenefits() {
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden z-10">
      
      {/* Decorative Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#1B2629]">
        <div className="absolute -top-12 left-0 w-full h-24 bg-slate-50 rounded-b-[100%]" style={{ transform: "scaleX(1.5)" }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Value</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-4xl lg:text-5xl tracking-tight">
            Benefits of <span className="text-[#85B100]">TeleRoot</span> for Enterprise
          </h3>
        </div>

        {/* 5-Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-transparent hover:border-[#D4F84A] hover:ring-1 hover:ring-[#D4F84A] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon Container with subtle gradient/accent */}
              <div className="mb-8 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#D4F84A]/30 blur-xl rounded-full" />
                <div className="relative z-10">
                  {benefit.icon}
                </div>
              </div>

              {/* Text */}
              <p className="text-[13px] font-semibold leading-relaxed text-slate-700">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
