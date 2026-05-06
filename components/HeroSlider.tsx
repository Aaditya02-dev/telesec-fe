"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const images = [
  "/hero-1.png",
  "/hero-2.png",
  "/hero-3.png",
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            Revolutionizing Network <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Intelligence with AI
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
            Teleroot provides enterprise-grade autonomous monitoring and real-time 
            topology insights for global telecommunications networks.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 rounded-full bg-primary px-10 text-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90">
                Explore Dashboard
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 rounded-full border-white/20 px-10 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10">
              Technical Whitepaper
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Scroll to Explore</span>
          <div className="h-12 w-6 rounded-full border-2 border-white/20 p-1">
            <motion.div 
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-2 w-full rounded-full bg-primary"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
