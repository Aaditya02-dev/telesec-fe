"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Activity, Search, MessageSquare, ShieldAlert, Server } from "lucide-react";

const aiAdvantages = [
  {
    title: "Automation and Efficiency",
    icon: <Zap className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[20%] left-[10%]",
    textAlign: "right-full mr-6 text-right top-1/2 -translate-y-1/2"
  },
  {
    title: "Enhanced Decision Making",
    icon: <Brain className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[45%] left-[5%]",
    textAlign: "right-full mr-6 text-right top-1/2 -translate-y-1/2"
  },
  {
    title: "Predictive Health",
    icon: <Activity className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[70%] left-[20%]",
    textAlign: "right-full mr-6 text-right top-1/2 -translate-y-1/2"
  },
  {
    title: "Root-Cause Analysis",
    icon: <Search className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[85%] left-[44%] -translate-x-1/2",
    textAlign: "top-full mt-6 left-1/2 -translate-x-1/2 text-center w-48"
  },
  {
    title: "Natural Language Queries",
    icon: <MessageSquare className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[70%] right-[20%]",
    textAlign: "left-full ml-6 text-left top-1/2 -translate-y-1/2"
  },
  {
    title: "Increased Cybersecurity",
    icon: <ShieldAlert className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[45%] right-[5%]",
    textAlign: "left-full ml-6 text-left top-1/2 -translate-y-1/2"
  },
  {
    title: "Sustainable Infrastructure",
    icon: <Server className="h-7 w-7 text-[#1F2C30]" />,
    pos: "top-[20%] right-[10%]",
    textAlign: "left-full ml-6 text-left top-1/2 -translate-y-1/2"
  }
];

/* ─── Center circle — layered rings with per-gap spinning green arcs ──────── */
function CenterCircle() {
  return (
    <div className="relative w-[190px] h-[190px] flex items-center justify-center group cursor-pointer">

      {/* ── LAYER ORDER (back → front):
           Ring4 (z1) → Arc1-in-gap (z2) → Ring3 (z3) → Arc2-in-gap (z4)
           → Ring2 (z5) → Arc3-in-gap (z6) → Ring1 (z7)
      ── */}

      {/* Ring 4 – outermost white halo  [z:1] */}
      <div
        className="absolute rounded-full bg-white transition-all duration-500 group-hover:scale-[1.06]"
        style={{
          zIndex: 1,
          width: 270, height: 270,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.10), 0 3px 10px rgba(0,0,0,0.06)"
        }}
      />

      {/* Arc 1 — sits in gap between Ring4(270) & Ring3(236), midpoint ≈253px  [z:2] */}
      {/* Arc radius=124, circumference≈779; ~120° arc = dash 260, gap 519 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ zIndex: 2, width: 253, height: 253, left: "50%", top: "50%", marginLeft: -126.5, marginTop: -126.5 }}
      >
        <svg width="253" height="253" viewBox="0 0 253 253" fill="none">
          <circle cx="126.5" cy="126.5" r="124"
            stroke="#41bf63" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="260 519" fill="none" opacity="0.95"
          />
        </svg>
      </motion.div>

      {/* Ring 3  [z:3] */}
      <div
        className="absolute rounded-full bg-white transition-all duration-500"
        style={{
          zIndex: 3,
          width: 236, height: 236,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.09), 0 3px 8px rgba(0,0,0,0.06)"
        }}
      />

      {/* Arc 2 — sits in gap between Ring3(236) & Ring2(210), midpoint ≈223px  [z:4] */}
      {/* Arc radius=109, circumference≈685; ~120° arc = dash 228, gap 457 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ zIndex: 4, width: 223, height: 223, left: "50%", top: "50%", marginLeft: -111.5, marginTop: -111.5 }}
      >
        <svg width="223" height="223" viewBox="0 0 223 223" fill="none">
          <circle cx="111.5" cy="111.5" r="109"
            stroke="#41bf63" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="228 457" fill="none" opacity="0.85"
          />
        </svg>
      </motion.div>

      {/* Ring 2  [z:5] */}
      <div
        className="absolute rounded-full bg-white transition-all duration-500"
        style={{
          zIndex: 5,
          width: 210, height: 210,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)"
        }}
      />

      {/* Arc 3 — sits in gap between Ring2(210) & Ring1(178), midpoint ≈194px  [z:6] */}
      {/* Arc radius=95, circumference≈597; ~120° arc = dash 199, gap 398 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ zIndex: 6, width: 194, height: 194, left: "50%", top: "50%", marginLeft: -97, marginTop: -97 }}
      >
        <svg width="194" height="194" viewBox="0 0 194 194" fill="none">
          <circle cx="97" cy="97" r="95"
            stroke="#41bf63" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="199 398" fill="none" opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Ring 1 – innermost raised content bubble  [z:7] */}
      <div
        className="absolute rounded-full bg-white flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:scale-105 px-4"
        style={{
          zIndex: 7,
          width: 178, height: 178,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 3px rgba(255,255,255,0.9)"
        }}
      >
        <h2 className="text-[14px] font-bold text-[#1F2C30] leading-snug transition-colors duration-300 group-hover:text-[#1a7a40]">
          Advantages <br /> of TeleRoot AI
        </h2>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export function LandingAiAdvantage() {
  return (
    <section id="ai-advantage" className="bg-white py-16 overflow-hidden relative border-b border-slate-100">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Capabilities</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-4xl tracking-tight uppercase italic">
            The AI Advantage
          </h3>
        </div>

        {/* ── Mobile View ── */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-8 items-center">
            {aiAdvantages.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4">
                {/* Outline-only circles — mobile */}
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-transparent">
                  <div className="absolute inset-[-10px] rounded-full border border-slate-300" />
                  <div className="absolute inset-[-4px] rounded-full border border-dashed border-slate-400 border-b-transparent rotate-[45deg]" />
                  <div className="absolute inset-0 rounded-full border-2 border-slate-700" />
                  <div className="absolute inset-[6px] rounded-full border border-slate-300" />
                  <div className="relative z-10">{item.icon}</div>
                </div>
                <h3 className="font-bold text-slate-800 text-base w-48">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop Circular Layout ── */}
        <div className="hidden lg:block relative max-w-[850px] h-[480px] mx-auto mt-8">

          {/* Center — 3D layered rings */}
          <div id="ai-advantage-center" className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
            <CenterCircle />
          </div>

          {/* 7 Surrounding Nodes — outline-only circles (previous style) */}
          {aiAdvantages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className={`absolute ${item.pos} w-[80px] h-[80px] rounded-full flex items-center justify-center bg-transparent group hover:scale-105 transition-transform duration-300`}
            >
              {/* Outermost thin ring */}
              <div className="absolute inset-[-12px] rounded-full border border-slate-200" />

              {/* Dashed rotating ring */}
              <div className="absolute inset-[-6px] rounded-full border border-dashed border-slate-400 border-b-transparent rotate-[20deg] group-hover:rotate-[200deg] transition-transform duration-700" />

              {/* Main circle — outline only, no fill */}
              <div className="absolute inset-0 rounded-full border-2 border-slate-700 bg-transparent" />

              {/* Inner accent ring */}
              <div className="absolute inset-[8px] rounded-full border border-slate-300" />

              {/* Icon */}
              <div className="relative z-10 transition-transform group-hover:scale-110">
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
