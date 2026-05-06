import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingHero } from "@/components/LandingHero";
import { LandingLogos } from "@/components/LandingLogos";
import { LandingProblem } from "@/components/LandingProblem";
import { LandingSolutions } from "@/components/LandingSolutions";
import { LandingHowItWorks } from "@/components/LandingHowItWorks";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingBenefits } from "@/components/LandingBenefits";
import { LandingPricing } from "@/components/LandingPricing";
import { LandingAiAdvantage } from "@/components/LandingAiAdvantage";
import { LandingTestimonials } from "@/components/LandingTestimonials";
import { LandingFAQ } from "@/components/LandingFAQ";
import { LandingFooter } from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingNavbar />
      
      <main className="flex-grow">
        <LandingHero />
        <LandingLogos />
        <LandingProblem />
        <LandingSolutions />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingBenefits />
        <LandingPricing />
        <LandingAiAdvantage />
        <LandingTestimonials />
        <LandingFAQ />
        
        {/* Final CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-[40px] bg-[#1F2C30] p-12 lg:p-20 shadow-2xl">
              {/* Decorative Glow */}
              <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#D4F84A]/30 blur-[100px]" />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
                <div className="max-w-2xl text-left">
                  <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl uppercase">
                    Take control of your <br className="hidden sm:block" /> network infrastructure.
                  </h2>
                  <p className="text-lg text-slate-300">
                    Join hundreds of engineers who use TeleRoot to manage global 
                    telecom deployments with confidence.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard" className="group flex h-16 items-center rounded-full bg-[#D4F84A] pl-8 pr-2 text-base font-bold text-black transition-all hover:bg-[#bce628]">
                    <span className="mr-6">Get Started Free</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2C30] text-[#D4F84A] transition-transform group-hover:scale-105">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </Link>
                  <button className="h-16 rounded-full border border-white/10 bg-transparent px-10 text-base font-semibold text-white transition-all hover:bg-white/5">
                    Book a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Massive Brand Ghost Text */}
        <div className="w-full bg-white overflow-hidden flex justify-center items-end pt-12 pb-0 select-none pointer-events-none">
          <h1 className="text-[13vw] font-black leading-[0.75] tracking-tighter uppercase bg-gradient-to-b from-slate-400 via-slate-200 to-white bg-clip-text text-transparent">
            TELEROOT AI
          </h1>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
