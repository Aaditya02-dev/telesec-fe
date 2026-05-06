"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Cpu 
} from "lucide-react";

const solutions = [
  {
    title: "Real-time Observability",
    description: "Deep-packet inspection and flow analysis for complete network visibility across global deployments.",
    icon: <Activity className="h-6 w-6" />,
  },
  {
    title: "Autonomous RCA",
    description: "AI-driven Root Cause Analysis that identifies network anomalies and faults in seconds, not hours.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Auto-Remediation",
    description: "Self-healing network protocols that automatically resolve common infrastructure faults without intervention.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Global Scalability",
    description: "Engineered to process petabytes of telemetry data with zero latency across distributed cloud nodes.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Predictive Analytics",
    description: "Anticipate capacity bottlenecks and hardware failures before they impact your service delivery.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: "Unified Integration",
    description: "Seamlessly connects with your existing hardware stack and modern cloud-native orchestrators.",
    icon: <Cpu className="h-6 w-6" />,
  },
];

export function LandingSolutions() {
  return (
    <section id="solutions" className="bg-white py-12 border-b border-slate-100">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Solutions</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-5xl lg:text-6xl tracking-tight uppercase italic">
            Everything you need for <br />
            Enterprise Network Operations
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-[#1F2C30] p-8 transition-all hover:border-[#D4F84A] hover:ring-1 hover:ring-[#D4F84A] hover:translate-y-[-4px] shadow-xl hover:shadow-[0_0_40px_rgba(212,248,74,0.15)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[#D4F84A] ring-1 ring-white/10 group-hover:bg-[#D4F84A] group-hover:text-black transition-all duration-300">
                {solution.icon}
              </div>
              <h4 className="mb-3 text-lg font-bold text-white uppercase tracking-tight italic">{solution.title}</h4>
              <p className="text-sm font-medium leading-relaxed text-slate-400">
                {solution.description}
              </p>
              
              {/* Subtle decorative element */}
              <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-[#D4F84A]/5 blur-2xl group-hover:bg-[#D4F84A]/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
