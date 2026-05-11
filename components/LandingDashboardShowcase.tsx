"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function LandingDashboardShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale from 0.75 to 0.95 for a clearer and more structured look
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.75, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-white z-20">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Header Text */}
        <motion.div 
            style={{ opacity }}
            className="mb-12 text-center max-w-3xl relative z-20"
        >
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Experience</h2>
          <h3 className="text-3xl font-bold text-[#1F2C30] sm:text-5xl tracking-tight uppercase italic">
            Unified Network Control
          </h3>
        </motion.div>

        {/* Side Dashboard Previews */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-[1%] lg:px-[3%]">
          {/* Left Preview */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.45, 0.6], [0, 1, 1, 0]), 
              x: useTransform(scrollYProgress, [0, 0.3, 0.6], [-400, 0, -400]),
              scale: useTransform(scrollYProgress, [0, 0.3], [0.85, 1])
            }}
            className="hidden lg:block w-[30%]"
          >
            <Image src="/leftdash.png" alt="Analytics View" width={800} height={600} className="w-full h-auto" quality={100} />
          </motion.div>

          {/* Right Preview */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.45, 0.6], [0, 1, 1, 0]), 
              x: useTransform(scrollYProgress, [0, 0.3, 0.6], [400, 0, 400]),
              scale: useTransform(scrollYProgress, [0, 0.3], [0.85, 1])
            }}
            className="hidden lg:block w-[30%]"
          >
            <Image src="/rightdash.png" alt="Security View" width={800} height={600} className="w-full h-auto" quality={100} />
          </motion.div>
        </div>

        {/* Dashboard Image Container */}
        <motion.div
          style={{ scale, opacity }}
          className="relative z-10 w-full max-w-4xl"
        >
          {/* Dashboard Image */}
          <Image
            src="/Dashboard.png"
            alt="TeleRoot Enterprise Dashboard"
            width={1920}
            height={1080}
            className="h-auto w-full object-contain"
            priority
          />
        </motion.div>


      </div>
    </section>
  );
}
