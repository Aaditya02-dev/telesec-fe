"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const pricingFaqs = [
  {
    question: "How is the billing cycle managed?",
    answer: "Our billing is flexible. You can choose between monthly or yearly billing cycles. Yearly plans offer a significant discount of up to 20% compared to the monthly subscription rate."
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, you can change your plan at any point through your dashboard. When upgrading, the new features and limits will be available immediately, and your billing will be adjusted proportionally for the remainder of the cycle."
  },
  {
    question: "What are the project-based tokens?",
    answer: "Tokens are used to power advanced AI analysis and automation tasks within your projects. Each plan includes a base number of tokens, and you can easily purchase top-ups if your project requirements scale unexpectedly."
  },
  {
    question: "Do you offer custom enterprise pricing?",
    answer: "Absolutely. For large-scale infrastructure or complex multi-regional deployments, we offer tailored enterprise solutions. Contact our team to discuss specific SLA and data sovereignty requirements."
  },
  {
    question: "Is there a limit to the number of users on my plan?",
    answer: "Starter and Professional plans have set user limits as outlined in the pricing table. The Enterprise and Custom plans offer unlimited user seats to support large, collaborative network operations teams."
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="pricing-faq" className="bg-white py-24 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* Left Column: Header */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Support</h2>
            <h3 className="mb-6 text-3xl font-bold text-[#1F2C30] sm:text-5xl tracking-tight leading-[1.1]">
              Frequently <br /> Asked Questions
            </h3>
            <p className="text-base font-medium leading-relaxed text-slate-500 max-w-md">
              Everything you need to know about our project pricing and infrastructure plans. Find answers to common billing and scalability questions.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-slate-200">
              {pricingFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="border-b border-slate-200">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
                    >
                      <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? "text-blue-600" : "text-[#1F2C30] group-hover:text-slate-600"}`}>
                        {faq.question}
                      </span>
                      <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"}`}>
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
