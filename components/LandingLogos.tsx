"use client";

import { motion } from "framer-motion";

const logos = [
  "Verizon",
  "T-Mobile",
  "AT&T",
  "Vodafone",
  "Orange",
  "Telefonica",
];

export function LandingLogos() {
  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
          Trusted by the world&apos;s leading telecommunications providers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-30 grayscale">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-2xl font-black tracking-tighter text-[#1F2C30] italic"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
