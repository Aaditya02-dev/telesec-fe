"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  BarChart3, 
  Lock 
} from "lucide-react";

const products = [
  {
    title: "Intelligence Hub",
    description: "Full-spectrum network visibility with real-time topology mapping and performance telemetry.",
    icon: Globe,
    color: "#D4F84A",
  },
  {
    title: "Automation Engine",
    description: "Self-healing network playbooks that resolve common infrastructure failures in milliseconds.",
    icon: Zap,
    color: "#00E5FF",
  },
  {
    title: "Risk Guardian",
    description: "Proactive risk detection using AI to identify fiber cuts and hardware degradation before they happen.",
    icon: Shield,
    color: "#FF3D00",
  },
  {
    title: "AI Co-pilot",
    description: "Natural language interface for complex network querying and root cause analysis reasoning.",
    icon: Cpu,
    color: "#B065E0",
  },
  {
    title: "Fraud Shield",
    description: "Advanced SIM box and IMEI velocity detection to protect your network revenue streams.",
    icon: Lock,
    color: "#FFD600",
  },
  {
    title: "Optima Analytics",
    description: "Deep-dive traffic analysis and capacity planning powered by predictive neural networks.",
    icon: BarChart3,
    color: "#16A34A",
  },
];

export function LandingProducts() {
  return (
    <section id="products" className="relative bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#1F2C30]">
            Our Ecosystem
          </h2>
          <h3 className="text-4xl font-black tracking-tight text-[#1F2C30] sm:text-5xl uppercase">
            Integrated <span className="text-slate-400">Product Suite</span>
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            A modular platform designed to handle every layer of modern 
            telecommunications infrastructure management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200"
            >
              <div 
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${product.color}20`, color: product.color }}
              >
                <product.icon className="h-7 w-7" />
              </div>
              
              <h4 className="mb-3 text-xl font-bold text-[#1F2C30]">
                {product.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8 flex items-center text-sm font-bold text-[#1F2C30] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
