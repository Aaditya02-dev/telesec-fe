"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative w-full bg-[#1B2629] pt-24 pb-12 lg:pt-32 lg:pb-16 flex items-center overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Tagline */}
          <span className="mb-6 inline-flex items-center rounded-full border border-[#D4F84A]/30 bg-[#D4F84A]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D4F84A]">
            The Network AI Infrastructure Platform
          </span>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-white md:text-6xl lg:text-[76px] tracking-tight">
            Transforming Telecom Networks <br className="hidden md:block" />
            into Intelligent Systems
          </h1>

          {/* Divider */}
          <div className="mx-auto mb-8 h-px w-20 bg-[#D4F84A]/30" />

          {/* Structured Description */}
          <p className="mx-auto mb-10 max-w-2xl text-[14px] font-medium leading-relaxed text-slate-400 md:text-base tracking-normal">
            TeleRoot unifies network intelligence — hardware, software, and AI — with
            real-time observability to speed up engineering and improve resiliency against
            outages in production infrastructure.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="h-12 w-full sm:w-auto min-w-[180px] flex items-center justify-center rounded-full bg-[#D4F84A] px-8 text-[13px] font-bold text-black transition-all hover:bg-[#bce628] shadow-lg">
              Get Started Free
            </Link>
            <button className="h-12 w-full sm:w-auto min-w-[180px] rounded-full border border-white/10 bg-white/5 px-8 text-[13px] font-bold text-white transition-all hover:bg-white/10">
              Book a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

