"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "VP of Network Eng, GlobalTel",
    content: "TeleRoot completely transformed how we manage our core network. The AI observability reduced our MTTR by 60% within the first month.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Lead DevOps, NextGen Infra",
    content: "We ingest terabytes of logs daily. TeleRoot's data processing is shockingly fast, and the autonomous playbooks save my team countless hours.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Dir of Infrastructure, CloudNet",
    content: "Finally, a platform that understands telecom networks. The topology mapping combined with real-time anomaly detection is an absolute game-changer.",
    rating: 5,
  },
  {
    name: "Michael Chang",
    role: "Senior NOC Eng, TelcoPlus",
    content: "The interface is beautiful and extremely intuitive. But more importantly, the underlying intelligence is rock solid. We caught three major outages before they happened.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "CTO, Horizon Comms",
    content: "Deploying TeleRoot was incredibly smooth. The integrations worked out of the box, and the insights provided by the AI engine are unmatched.",
    rating: 5,
  }
];

function TestimonialCard({ testimonial, idx }: { testimonial: any, idx: number }) {
  const cardColors = ["bg-[#85B100]", "bg-[#0ea5e9]", "bg-[#f59e0b]", "bg-[#8b5cf6]", "bg-[#ec4899]"];
  return (
    <div className="relative w-[360px] shrink-0 bg-white border border-slate-100 p-10 pt-12 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 group rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl my-4 ml-6">
      {/* Left Quote Badge */}
      <div className={`absolute -left-6 top-12 h-14 w-14 rounded-full flex items-center justify-center text-white shadow-lg ${cardColors[idx % cardColors.length]}`}>
        <Quote className="h-6 w-6 fill-current" />
      </div>

      <div className="flex flex-col items-center text-center relative z-10">
        <h4 className="text-[18px] font-bold text-[#1F2C30]">
          {testimonial.name}
        </h4>
        <p className="text-[12px] font-medium text-slate-500 mb-3">
          {testimonial.role}
        </p>

        <div className="flex gap-1 mb-6 text-[#f59e0b]">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current transition-transform group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />
          ))}
        </div>

        <p className="text-[13px] font-medium leading-[1.8] text-slate-500 px-2">
          {testimonial.content}
        </p>
      </div>

      {/* Bottom Right Faint Quote */}
      <div className="absolute bottom-6 right-6 opacity-[0.03] pointer-events-none">
        <Quote className="h-16 w-16 fill-current text-slate-900 rotate-180" />
      </div>
    </div>
  );
}

export function LandingTestimonials() {
  return (
    <section className="bg-[#FAF6F0] py-24 overflow-hidden border-y border-slate-100">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h3 className="text-4xl font-bold text-[#1F2C30] sm:text-5xl lg:text-[56px] tracking-tight mb-4">
          Client Feedback & <span className="text-[#f59e0b]">Testimonial</span>
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-[14px] text-slate-500 leading-relaxed">
          See how industry-leading engineers use TeleRoot's AI-driven observability 
          to prevent outages, reduce MTTR, and scale their infrastructure with confidence.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden py-4">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes custom-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-custom-marquee {
            animation: custom-marquee 40s linear infinite;
          }
        `}} />
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#FAF6F0] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#FAF6F0] to-transparent pointer-events-none" />

        <div className="flex w-max animate-custom-marquee hover:[animation-play-state:paused] py-4">
          {/* First Set */}
          <div className="flex gap-10 px-5 pr-5">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={`set1-${idx}`} testimonial={testimonial} idx={idx} />
            ))}
          </div>

          {/* Second Set (Duplicate for seamless loop) */}
          <div className="flex gap-10 px-5 pr-5">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={`set2-${idx}`} testimonial={testimonial} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
