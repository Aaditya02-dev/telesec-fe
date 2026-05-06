"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Starter Plan",
    price: "$995/m",
    description: "For Individuals. Pause or cancel anytime.",
    features: [
      "Up to 50 active nodes",
      "Real-time Topology Dashboard",
      "Standard Alert Deduplication",
      "Secure API Access & SSL",
      "Slack & Teams Integration",
      "Basic Role Management",
      "Business Hours Support"
    ],
    featured: false,
    topBg: "bg-slate-100",
    textColor: "text-slate-900",
    buttonBg: "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
  },
  {
    name: "Standard Plan",
    price: "$2,495/m",
    description: "For Teams. Pause or cancel anytime.",
    badge: "POPULAR",
    features: [
      "Up to 500 active nodes",
      "Real-time Topology Dashboard",
      "AI Root-Cause Analysis",
      "Secure API Access & SSL",
      "Custom Webhook Integration",
      "Advanced RBAC Controls",
      "24/7 Priority Support"
    ],
    featured: true,
    topBg: "bg-[#1F2C30]",
    textColor: "text-white",
    buttonBg: "bg-white border-white text-slate-900 hover:bg-slate-50"
  },
  {
    name: "Enterprise Plan",
    price: "$9,995/m",
    description: "For Organizations. Pause or cancel anytime.",
    features: [
      "Unlimited active nodes",
      "Global Multi-Region Dashboard",
      "Predictive Failure Models",
      "Dedicated Private Cloud & SSL",
      "Custom Workflow Automation",
      "Enterprise Single Sign-On (SSO)",
      "Dedicated Technical Account Manager"
    ],
    featured: false,
    topBg: "bg-slate-100",
    textColor: "text-slate-900",
    buttonBg: "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
  }
];

export function LandingPricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section id="pricing" className="bg-[#F8FAFC] py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header section */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1F2C30] sm:text-5xl">
            Essential Pricing Plans For<br /> Team Of Any Sizes
          </h2>
          <p className="text-sm font-medium text-slate-500 max-w-xl mx-auto leading-relaxed">
            Simple, transparent pricing to power your growth - with all the tools and support you need.
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-16 flex justify-center">
          <div className="inline-flex rounded-full border border-[#D4F84A]/30 bg-white p-1 shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                billing === "monthly" ? "bg-[#D4F84A] text-[#1F2C30]" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                billing === "yearly" ? "bg-[#D4F84A] text-[#1F2C30]" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] ${
                tier.featured ? "scale-105 z-10 border border-[#D4F84A]" : "border border-slate-100 mt-4 md:mt-0"
              }`}
            >
              {/* Top Section */}
              <div className={`relative px-8 pt-10 pb-8 ${tier.topBg} ${tier.textColor}`}>
                {tier.badge && (
                  <span className="absolute right-6 top-8 rotate-[15deg] rounded bg-[#D4F84A] px-2.5 py-1 text-[10px] font-black text-[#1F2C30] uppercase tracking-widest shadow-sm">
                    {tier.badge}
                  </span>
                )}
                <h4 className="mb-4 text-[15px] font-semibold">{tier.name}</h4>
                <div className="mb-4 font-bold tracking-tight text-[40px] leading-none">
                  {tier.price}
                </div>
                <p className={`mb-8 text-[13px] font-medium ${tier.featured ? "text-slate-300" : "text-slate-500"}`}>
                  {tier.description}
                </p>
                <button className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-bold shadow-sm transition-all ${tier.buttonBg}`}>
                  Get Started
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1F2C30] text-white">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              </div>

              {/* Separator / What you will get */}
              <div className="relative flex justify-center py-6 bg-white">
                <div className="absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 bg-slate-200"></div>
                <div className="relative z-10 rounded-full border border-slate-200 bg-white px-4 py-1 text-[11px] font-bold text-slate-500">
                  What you will get
                </div>
              </div>

              {/* Bottom Features Section */}
              <div className="px-8 pb-10 bg-white flex-grow">
                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rotate-45 bg-[#1F2C30]" />
                      <span className="text-[13px] font-semibold text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
