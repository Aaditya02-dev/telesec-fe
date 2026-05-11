"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Cpu, Zap, BarChart } from "lucide-react";

const steps = [
  {
    title: "Data Ingestion",
    description: "Connect your global infrastructure to our edge collectors. We ingest petabytes of telemetry with zero overhead.",
    icon: <Download className="h-6 w-6" />,
  },
  {
    title: "AI Analysis",
    description: "Our proprietary AI engine correlates billions of events in real-time to identify the needle in the haystack.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Autonomous Resolution",
    description: "Detected anomalies are automatically resolved via playbooks, or escalated with full root-cause context.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Global Optimization",
    description: "Continuous learning loops optimize your network's long-term performance and capacity planning.",
    icon: <BarChart className="h-6 w-6" />,
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-12">
      <div className="container mx-auto px-6">
        {/* Minimalist Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Process</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-5xl lg:text-6xl tracking-tight uppercase italic">
            How It Works
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group rounded-[24px] bg-[#1B2629]/[0.02] border border-slate-100 p-8 transition-all hover:bg-white hover:shadow-2xl hover:border-[#41bf63]/30"
            >
              {/* Large Faint Number Background */}
              <span className="absolute top-4 right-6 text-6xl font-black text-[#1B2629] opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity">
                0{index + 1}
              </span>

              <div className="relative z-10">
                {/* Minimalist Icon Indicator */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F2C30] text-[#41bf63] shadow-lg transition-transform group-hover:scale-110">
                  {step.icon}
                </div>

                <h3 className="mb-4 text-base font-bold text-[#1F2C30] tracking-tight uppercase">
                  {step.title}
                </h3>
                <p className="text-[12px] font-medium leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
