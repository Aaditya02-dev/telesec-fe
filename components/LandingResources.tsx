"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, BookOpen, FileText, PlayCircle } from "lucide-react";

const resources = [
  {
    type: "Whitepaper",
    title: "AI in Telecom: Predicting Fiber Failures with 99% Accuracy",
    description: "Learn how our neural networks analyze micro-vibrations to detect infrastructure degradation.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    type: "Case Study",
    title: "MetroTel Operations: 40% Reduction in Mean-Time-To-Repair",
    description: "A deep dive into how a Tier-1 operator automated their incident response using TeleRoot.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  },
  {
    type: "Video Demo",
    title: "Automating BGP Peer Restarts in Critical Failures",
    description: "A technical walkthrough of our self-healing playbooks in action during a core routing incident.",
    icon: PlayCircle,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2070&auto=format&fit=crop",
  },
];

export function LandingResources() {
  return (
    <section id="resources" className="bg-[#0F171A] py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 lg:flex-row">
          <div className="max-w-2xl text-left">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D4F84A]">
              Knowledge Center
            </h2>
            <h3 className="text-4xl font-black tracking-tight text-white sm:text-5xl uppercase">
              Insights & <span className="text-slate-500">Resources</span>
            </h3>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white transition-all hover:text-[#D4F84A]">
            View all resources
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white/5 border border-white/10 transition-all hover:bg-white/10"
            >
              {/* Image Placeholder with Overlay */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F171A] to-transparent z-10" />
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-50"
                />
                <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                  <resource.icon className="h-3 w-3" />
                  {resource.type}
                </div>
              </div>

              <div className="relative z-20 -mt-12 flex flex-1 flex-col p-8">
                <h4 className="mb-4 text-xl font-bold text-white group-hover:text-[#D4F84A] transition-colors leading-tight">
                  {resource.title}
                </h4>
                <p className="mb-8 text-sm text-slate-400 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-all">
                  Read article
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
