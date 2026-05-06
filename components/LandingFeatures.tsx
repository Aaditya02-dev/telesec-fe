"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    badge: "AI Copilot",
    title: "Save Hours with AI-Powered Operations",
    description: "Reduce manual troubleshooting with smart automation that identifies bottlenecks in seconds, freeing up time for what matters most.",
    linkText: "Explore AI",
    bgColor: "bg-[#FFF4E5]",
    hoverBorder: "hover:border-orange-300 hover:ring-orange-300",
    graphic: (
      <div className="absolute -right-8 -bottom-8 flex h-48 w-48 flex-wrap items-center justify-center gap-2 opacity-40">
        <div className="h-20 w-20 rounded-2xl bg-[#FFD8A8] rotate-45" />
        <div className="h-20 w-20 rounded-2xl bg-[#FFD8A8] rotate-45" />
        <div className="h-20 w-20 rounded-2xl bg-[#FFD8A8] rotate-45" />
        <div className="h-20 w-20 rounded-2xl bg-[#FFD8A8] rotate-45" />
      </div>
    )
  },
  {
    badge: "Auto-Healing",
    title: "Resolve Faults Automatically",
    description: "Bring your network reliability to the next level. TeleRoot detects anomalies and self-corrects infrastructure before users notice.",
    linkText: "Try It Now",
    bgColor: "bg-[#EBF3FF]",
    hoverBorder: "hover:border-blue-300 hover:ring-blue-300",
    graphic: (
      <div className="absolute -right-4 -bottom-4 h-56 w-56 opacity-40">
        <div className="absolute top-0 right-0 h-28 w-28 rounded-tl-full bg-[#C2DBFF]" />
        <div className="absolute bottom-0 right-0 h-28 w-28 rounded-bl-full bg-[#C2DBFF]" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-br-full bg-[#C2DBFF]" />
      </div>
    )
  },
  {
    badge: "Global Topology",
    title: "Map Your Entire Infrastructure",
    description: "Maintain a living, 3D map of your entire network. Visualize physical fiber layers and logical cloud orchestrations instantly.",
    linkText: "View Topology",
    bgColor: "bg-[#F3E8FF]",
    hoverBorder: "hover:border-purple-300 hover:ring-purple-300",
    graphic: (
      <div className="absolute -right-12 -bottom-12 h-64 w-64 opacity-40">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-[#D8B4FE]" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-[#D8B4FE]" />
      </div>
    )
  },
  {
    badge: "Predictive Analytics",
    title: "Make Data-Driven Decisions",
    description: "Gain insights with real-time analytics and hardware degradation reports, helping you optimize performance and predict failures.",
    linkText: "View Insights",
    bgColor: "bg-[#ECFDF5]",
    hoverBorder: "hover:border-emerald-300 hover:ring-emerald-300",
    graphic: (
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 h-48 w-48 opacity-40">
        <div className="absolute inset-0 bg-[#A7F3D0] rounded-[40px] rotate-45 transform origin-center" />
        <div className="absolute inset-4 bg-[#ECFDF5] rounded-[28px] rotate-45 transform origin-center" />
      </div>
    )
  },
  {
    badge: "Zero-Latency",
    title: "Process Petabytes at the Edge",
    description: "Our edge-ingestion pipeline processes billions of telemetry points with sub-millisecond overhead, built for global scale.",
    linkText: "Learn More",
    bgColor: "bg-[#FFF1F2]",
    hoverBorder: "hover:border-rose-300 hover:ring-rose-300",
    graphic: (
      <div className="absolute -right-8 -bottom-8 flex h-56 w-56 items-center justify-center opacity-40">
        <div className="absolute h-full w-full rounded-full border-[16px] border-[#FECDD3]" />
        <div className="absolute h-3/4 w-3/4 rounded-full border-[16px] border-[#FECDD3]" />
      </div>
    )
  },
  {
    badge: "Security Shield",
    title: "Detect Threats in Real-Time",
    description: "Integrate native threat detection that blocks malicious traffic patterns and DDoS attempts autonomously.",
    linkText: "Explore Security",
    bgColor: "bg-[#F0FDF4]",
    hoverBorder: "hover:border-green-300 hover:ring-green-300",
    graphic: (
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex h-56 w-56 flex-col gap-4 opacity-40">
        <div className="h-12 w-full rounded-full bg-[#BBF7D0]" />
        <div className="h-12 w-3/4 rounded-full bg-[#BBF7D0]" />
        <div className="h-12 w-1/2 rounded-full bg-[#BBF7D0]" />
      </div>
    )
  }
];

export function LandingFeatures() {
  return (
    <section id="capabilities" className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Capabilities</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-5xl tracking-tight uppercase italic">
            Platform Features
          </h3>
        </div>

        {/* 3-Column Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.badge}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-[40px] p-6 lg:p-8 border border-transparent hover:ring-1 ${feature.bgColor} ${feature.hoverBorder} transition-all hover:-translate-y-1 duration-300`}
            >
              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <span className="inline-block rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                    {feature.badge}
                  </span>
                  <h3 className="mt-6 mb-3 text-[18px] font-bold leading-[1.25] text-[#1F2C30] tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mb-8 text-[13px] font-medium leading-relaxed text-slate-600 max-w-[95%]">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link 
                    href="/dashboard" 
                    className="group inline-flex items-center gap-1 border-b border-[#1F2C30] pb-0.5 text-[13px] font-bold text-[#1F2C30] transition-opacity hover:opacity-70"
                  >
                    {feature.linkText}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Abstract Graphic Background */}
              {feature.graphic}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
