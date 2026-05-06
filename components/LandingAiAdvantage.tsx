"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Activity, Search, MessageSquare, ShieldAlert, Server } from "lucide-react";

const aiAdvantages = [
  {
    title: "Automation and Efficiency",
    icon: <Zap className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[20%] left-[10%]",
    textAlign: "right-full mr-6 text-right top-1/2 -translate-y-1/2"
  },
  {
    title: "Enhanced Decision Making",
    icon: <Brain className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[45%] left-[5%]",
    textAlign: "right-full mr-6 text-right top-1/2 -translate-y-1/2"
  },
  {
    title: "Predictive Health",
    icon: <Activity className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[70%] left-[20%]",
    textAlign: "right-full mr-6 text-right top-1/2 -translate-y-1/2"
  },
  {
    title: "Root-Cause Analysis",
    icon: <Search className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[85%] left-1/2 -translate-x-1/2",
    textAlign: "top-full mt-6 left-1/2 -translate-x-1/2 text-center w-48"
  },
  {
    title: "Natural Language Queries",
    icon: <MessageSquare className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[70%] right-[20%]",
    textAlign: "left-full ml-6 text-left top-1/2 -translate-y-1/2"
  },
  {
    title: "Increased Cybersecurity",
    icon: <ShieldAlert className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[45%] right-[5%]",
    textAlign: "left-full ml-6 text-left top-1/2 -translate-y-1/2"
  },
  {
    title: "Sustainable Infrastructure",
    icon: <Server className="h-8 w-8 text-[#1F2C30]" />,
    pos: "top-[20%] right-[10%]",
    textAlign: "left-full ml-6 text-left top-1/2 -translate-y-1/2"
  }
];

export function LandingAiAdvantage() {
  return (
    <section className="bg-white py-16 overflow-hidden relative border-b border-slate-100">
      <div className="container mx-auto px-6">

        {/* Global Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Capabilities</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-4xl tracking-tight uppercase italic">
            The AI Advantage
          </h3>
        </div>

        {/* Mobile View (Hidden on LG) */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-8 items-center">
            {aiAdvantages.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4">
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center">
                  <div className="absolute inset-[-6px] rounded-full border-[1.5px] border-dashed border-slate-400 border-l-transparent rotate-[30deg]" />
                  <div className="absolute inset-0 rounded-full border-[5px] border-[#0F8A8A]" />
                  <div className="absolute inset-[3px] rounded-full border border-slate-300" />
                  <div className="relative z-10 scale-75">{item.icon}</div>
                </div>
                <h3 className="font-bold text-slate-800 text-base w-48">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Circular Layout (Visible on LG) */}
        <div className="hidden lg:block relative max-w-[850px] h-[450px] mx-auto mt-8">
          
          {/* Center Graphic */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] flex items-center justify-center">
            {/* Outer broken rings */}
            <div className="absolute inset-[-24px] rounded-full border-[2px] border-slate-200 border-t-transparent -rotate-45 opacity-60" />
            <div className="absolute inset-[-12px] rounded-full border-[4px] border-slate-100 border-l-transparent rotate-12" />
            <div className="absolute inset-0 rounded-full border-[8px] border-[#F1F5F9]" />
            <div className="absolute inset-[8px] rounded-full bg-white shadow-inner flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-[15px] font-bold text-[#1F2C30] leading-snug">
                Advantages <br/> of TeleRoot AI
              </h2>
            </div>
          </div>

          {/* 7 Surrounding Nodes */}
          {aiAdvantages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className={`absolute ${item.pos.replace('top-[15%]', 'top-[10%]').replace('top-[40%]', 'top-[45%]').replace('top-[65%]', 'top-[75%]').replace('top-[80%]', 'top-[90%]')} w-20 h-20 rounded-full flex items-center justify-center bg-white group hover:scale-105 transition-transform duration-300`}
            >
              {/* Outer dashed ring with gap */}
              <div className="absolute inset-[-8px] rounded-full border-[1.5px] border-dashed border-slate-800 border-b-transparent rotate-[15deg] group-hover:rotate-[180deg] transition-transform duration-700" />
              
              {/* Thick Teal/Cyan Ring */}
              <div className="absolute inset-0 rounded-full border-[7px] border-[#14B8A6] shadow-sm" />
              
              {/* Inner thin black ring */}
              <div className="absolute inset-[4px] rounded-full border-[1px] border-slate-800" />
              
              {/* Icon */}
              <div className="relative z-10 transition-transform group-hover:scale-110 scale-75">
                {item.icon}
              </div>

              {/* Text Label */}
              <div className={`absolute ${item.textAlign} w-44`}>
                <h3 className="font-bold text-slate-800 text-[15px] leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
