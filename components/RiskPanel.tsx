import { fraudAlerts, fiberRiskNodes } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const dotClass = {
  danger: "bg-danger",
  warning: "bg-warning",
  success: "bg-success"
};

function RiskList({
  title,
  items
}: {
  title: string;
  items: Array<{ label: string; status: string }>;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-sm font-bold text-[#1F2C30] transition-all duration-300 hover:border-[#85B100]/20 hover:shadow-sm"
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", dotClass[item.status as keyof typeof dotClass])} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskPanel() {
  return (
    <div className="space-y-8">
      <RiskList items={fraudAlerts} title="Fraud Detection" />
      <RiskList items={fiberRiskNodes} title="Fiber Infrastructure" />
    </div>
  );
}
