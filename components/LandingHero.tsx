"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Award, Sparkles, ArrowRight } from "lucide-react";
import { BookDemoModal } from "./BookDemoModal";

export function LandingHero() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

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
          <span className="mb-6 inline-flex items-center rounded-full border border-[#41bf63]/30 bg-[#41bf63]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#41bf63]">
            The Network AI Infrastructure Platform
          </span>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-white md:text-6xl lg:text-[76px] tracking-tight">
            Transforming Telecom Networks <br className="hidden md:block" />
            into Intelligent Systems
          </h1>

          {/* Divider */}
          <div className="mx-auto mb-8 h-px w-20 bg-[#41bf63]/30" />

          {/* Structured Description */}
          <p className="mx-auto mb-10 max-w-2xl text-[14px] font-medium leading-relaxed text-slate-400 md:text-base tracking-normal">
            TeleRoot unifies network intelligence — hardware, software, and AI — with
            real-time observability to speed up engineering and improve resiliency against
            outages in production infrastructure.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="h-12 w-full sm:w-auto min-w-[180px] flex items-center justify-center rounded-full bg-[#41bf63] px-8 text-[13px] font-bold text-black transition-all hover:bg-[#bce628] shadow-lg">
              Get Started Free
            </Link>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="h-12 w-full sm:w-auto min-w-[180px] rounded-full border border-white/10 bg-white/5 px-8 text-[13px] font-bold text-white transition-all hover:bg-white/10"
            >
              Book a Demo
            </button>
          </div>

          {/* Insider Beta Announcement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <div className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white/5 px-4 py-1.5 border border-white/10 transition-all hover:bg-white/10">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#41bf63]/20 text-[#41bf63]">
                <Sparkles className="h-3 w-3" />
              </span>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white">
                Teleroot Insider Beta is now live — Early users can access experimental AI features.
              </p>
              <button
                onClick={() => {
                  localStorage.setItem("isBetaUser", "true");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-1 text-[10px] font-black uppercase text-[#41bf63] hover:underline"
              >
                Join as Beta User
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </section>
  );
}

