"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What exactly does TeleRoot do?",
    answer: "TeleRoot is an enterprise-grade network monitoring and automation platform. We provide real-time 3D topology mapping, AI-driven root-cause analysis, and auto-remediation for complex telecom and cloud infrastructures."
  },
  {
    question: "How does the AI Copilot work?",
    answer: "Our AI Copilot is powered by a proprietary Large Language Model (LLM) trained specifically on network telemetry, syslogs, and routing tables. You can ask it plain-English questions about latency or hardware health, and it instantly analyzes millions of logs to provide the exact root cause and suggested fixes."
  },
  {
    question: "Can TeleRoot integrate with our existing hardware?",
    answer: "Yes. TeleRoot is completely vendor-agnostic. We support seamless integrations with legacy hardware (Cisco, Juniper, Arista) and modern cloud-native orchestrators via secure APIs, SNMP, and custom webhooks."
  },
  {
    question: "What is the typical deployment time?",
    answer: "For standard cloud architectures, our zero-touch provisioning allows you to deploy and start ingesting telemetry within 24 hours. Custom enterprise deployments with strict on-premise requirements typically take 1 to 2 weeks."
  },
  {
    question: "Do you offer on-premise deployment for high-security environments?",
    answer: "Absolutely. While we offer a robust fully-managed cloud solution, our Enterprise plan includes options for dedicated private cloud or completely isolated, air-gapped on-premise deployments to meet strict compliance and security needs."
  }
];

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* Left Column: Header & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#85B100]">Support</h2>
            <h3 className="mb-6 text-3xl font-bold text-[#1F2C30] sm:text-5xl tracking-tight leading-[1.1]">
              Frequently <br /> Asked Questions
            </h3>
            <p className="mb-8 text-base font-medium leading-relaxed text-slate-500 max-w-md">
              Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <div>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="border-b border-slate-200">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
                    >
                      <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? "text-[#85B100]" : "text-[#1F2C30] group-hover:text-slate-600"}`}>
                        {faq.question}
                      </span>
                      <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "border-[#85B100] bg-[#D4F84A]/10 text-[#85B100]" : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"}`}>
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-12 text-[15px] leading-relaxed text-slate-500">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
