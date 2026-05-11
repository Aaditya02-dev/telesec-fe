"use client";

import {
  Activity,
  AlertTriangle,
  Bot,
  Clock,
  Network,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  activity: Activity,
  alertTriangle: AlertTriangle,
  bot: Bot,
  clock: Clock,
  network: Network,
  shieldAlert: ShieldAlert
};

export type KpiIconName = keyof typeof iconMap;

interface KpiCardProps {
  title: string;
  value: string;
  icon: KpiIconName;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  color?: string;
}

export function KpiCard({ title, value, icon, trend, trendType, color }: KpiCardProps) {
  const Icon = iconMap[icon] || Activity;

  const trendColor =
    trendType === "neutral"
      ? "text-slate-500"
      : "text-[#41bf63]";

  return (
    <div className="relative flex items-center gap-3 rounded-xl border border-white/8 bg-[#13161F] px-4 py-3 transition-all duration-200 hover:border-[#41bf63]/30 hover:bg-[#1a1e29] group overflow-hidden">
      
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-[#41bf63]/30 transition-all">
        <Icon className="h-[18px] w-[18px] text-[#41bf63]" />
      </div>

      {/* Text block */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-center">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-none truncate">
          {title}
        </span>
        <span className={cn(
          "text-2xl font-black leading-tight tracking-tight",
          color ? "text-[#41bf63]" : "text-white"
        )}>
          {value}
        </span>
        {trend && (
          <div className={cn("flex items-center justify-center gap-1 mt-0.5", trendColor)}>
            {trendType === "up"      && <TrendingUp   className="h-3 w-3 shrink-0" />}
            {trendType === "down"    && <TrendingDown  className="h-3 w-3 shrink-0" />}
            {trendType === "neutral" && <Minus         className="h-3 w-3 shrink-0" />}
            <span className="text-[10px] font-bold leading-none truncate">{trend}</span>
          </div>
        )}
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#41bf63] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
