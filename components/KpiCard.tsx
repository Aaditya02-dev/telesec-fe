"use client";

import {
  Activity,
  AlertTriangle,
  Bot,
  Clock3,
  Network,
  ShieldAlert
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap = {
  activity: Activity,
  alertTriangle: AlertTriangle,
  bot: Bot,
  clock3: Clock3,
  network: Network,
  shieldAlert: ShieldAlert
};

export type KpiIconName = keyof typeof iconMap;

interface KpiCardProps {
  title: string;
  value: string;
  icon: KpiIconName;
  color?: string;
  data: Array<{ value: number }>;
}

export function KpiCard({ title, value, icon, color }: KpiCardProps) {
  // Icon is removed per user request

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[12px] p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,248,74,0.15)] hover:-translate-y-0.5 group",
        "bg-[#1F2C30]/90 backdrop-blur-xl border border-white/10 shadow-md"
      )}
    >
      {/* Decorative Glow based on landing page */}
      <div className="absolute -inset-10 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-[#D4F84A] blur-[30px]" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center min-h-[60px]">
        <div>
          <p className="text-2xl font-black tracking-tight text-white drop-shadow-sm leading-none mb-1">
            {value}
          </p>
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 group-hover:text-slate-300 transition-colors">
            {title}
          </p>
        </div>
      </div>
      
      {/* Decorative Brand Accent - Landing Page Theme */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5 transition-colors duration-300 group-hover:bg-[#D4F84A]" />
    </div>
  );
}
