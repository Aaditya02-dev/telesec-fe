"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

export function LandingTopology() {
  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-6">
                <Share2 className="h-4 w-4" />
                <span>Live Visualization</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
                Understand Your Network <br />
                In Every Dimension
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl">
                Teleroot's proprietary topology engine maps thousands of nodes in real-time, 
                giving you a 360-degree view of your fiber segments, router clusters, 
                and edge devices.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Dynamic node-link relationship mapping",
                  "Real-time health pulse indicators",
                  "Automated fiber path discovery",
                  "Instant risk-zone isolation"
                ].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-white font-medium"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm shadow-2xl"
            >
              {/* Mock Topology Visualization */}
              <div className="aspect-square bg-black rounded-xl overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* Animated Circles/Nodes */}
                   {[1, 2, 3].map((i) => (
                     <motion.div
                       key={i}
                       animate={{
                         scale: [1, 1.2, 1],
                         opacity: [0.1, 0.3, 0.1]
                       }}
                       transition={{
                         repeat: Infinity,
                         duration: 4,
                         delay: i * 1.3
                       }}
                       className="absolute border border-primary rounded-full"
                       style={{ width: `${i * 150}px`, height: `${i * 150}px` }}
                     />
                   ))}
                   
                   <div className="relative z-10 flex flex-wrap justify-center items-center gap-8 p-12">
                      {[1, 2, 3, 4, 5, 6].map((node) => (
                        <motion.div
                          key={node}
                          animate={{
                            y: [0, -10, 0],
                            boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 20px rgba(37,99,235,0.4)", "0 0 0px rgba(37,99,235,0)"]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3 + node,
                            ease: "easeInOut"
                          }}
                          className="h-12 w-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-primary"
                        >
                          <Share2 className="h-6 w-6" />
                        </motion.div>
                      ))}
                   </div>
                </div>
                {/* Overlay Scanning Line */}
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-20"
                />
              </div>
              
              {/* Float Tags */}
              <div className="absolute -top-4 -right-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md">
                Health: 100%
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-bold text-blue-400 backdrop-blur-md">
                Active Nodes: 1,402
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
