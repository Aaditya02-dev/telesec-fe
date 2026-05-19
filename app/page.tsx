// CI/CD Test - 2026-05-19 - Live Deployment Verified
<!-- CI/CD Test - 2026-05-19 - Live Deployment Verified -->
import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingHero } from "@/components/LandingHero";
import { LandingLogos } from "@/components/LandingLogos";
import { LandingProblem } from "@/components/LandingProblem";
import { LandingSolutions } from "@/components/LandingSolutions";
import { LandingHowItWorks } from "@/components/LandingHowItWorks";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingDashboardShowcase } from "@/components/LandingDashboardShowcase";
import { LandingBenefits } from "@/components/LandingBenefits";
import { LandingAiAdvantage } from "@/components/LandingAiAdvantage";
import { LandingGlobalMap } from "@/components/LandingGlobalMap";
import { LandingTestimonials } from "@/components/LandingTestimonials";
import { LandingFAQ } from "@/components/LandingFAQ";
import { LandingCTA } from "@/components/LandingCTA";
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
        <LandingDashboardShowcase />
        <LandingBenefits />
        <LandingAiAdvantage />
        <LandingGlobalMap />
        <LandingTestimonials />
        <LandingFAQ />

        <LandingCTA />

        {/* Massive Brand Ghost Text */}
        <div className="w-full bg-white overflow-hidden flex justify-center items-end pt-12 pb-0 select-none pointer-events-none">
          <h1 className="text-[13vw] font-black leading-[0.75] tracking-tighter uppercase bg-gradient-to-b from-slate-400 via-slate-200 to-white bg-clip-text text-transparent">
            TELESEC AI
          </h1>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}



