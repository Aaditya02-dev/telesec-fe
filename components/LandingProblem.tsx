"use client";

import { motion } from "framer-motion";

export function LandingProblem() {
  return (
    <section className="bg-[#1B2629] py-14 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Side: Structured Problem List */}
          <div className="flex-1 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-l border-[#D4F84A]/20 pl-6 md:pl-10"
            >
              <span className="mb-3 block text-[9px] font-black uppercase tracking-[0.4em] text-[#D4F84A]">
                The Problem
              </span>
              <h2 className="mb-6 text-3xl font-bold leading-[1.05] text-white md:text-4xl lg:text-5xl tracking-tight uppercase italic">
                Complexity <br /> is Killing <br /> Performance.
              </h2>
              
              <div className="space-y-7">
                <div className="group relative">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#D4F84A] text-[9px] font-bold ring-1 ring-white/10 group-hover:bg-[#D4F84A] group-hover:text-black transition-all">
                      01
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1.5">Metric Sprawl</h3>
                      <p className="text-[12px] font-medium leading-relaxed text-slate-400 max-w-sm">
                        Disconnected dashboards lead to fragmented visibility and 
                        "Swivel Chair" management.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#D4F84A] text-[9px] font-bold ring-1 ring-white/10 group-hover:bg-[#D4F84A] group-hover:text-black transition-all">
                      02
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1.5">Manual Remediation</h3>
                      <p className="text-[12px] font-medium leading-relaxed text-slate-400 max-w-sm">
                        Root cause analysis still relies on manual intervention 
                        causing extended downtime.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#D4F84A] text-[9px] font-bold ring-1 ring-white/10 group-hover:bg-[#D4F84A] group-hover:text-black transition-all">
                      03
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1.5">Infrastructure Lag</h3>
                      <p className="text-[12px] font-medium leading-relaxed text-slate-400 max-w-sm">
                        Legacy monitoring simply can't scale to handle modern 
                        cloud-native network volume.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Framed Video */}
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="h-full w-full object-cover"
              >
                <source src="https://website.goteleport.com/_uploads/Teleport_Marketing_Website_Credential_Sprawl_cd4f0ca340.mp4" type="video/mp4" />
              </video>
              
              {/* Decorative Frame Elements */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
