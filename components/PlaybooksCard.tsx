"use client";

import { useState } from "react";
import { playbooks } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PlaybooksCard() {
  const [items, setItems] = useState(playbooks);

  function togglePlaybook(title: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.title === title
          ? {
              ...item,
              enabled: !item.enabled,
              status: item.enabled ? "Paused" : "Ready"
            }
          : item
      )
    );
  }

  return (
    <div className="space-y-4">
      {items.map((playbook) => (
        <div
          key={playbook.title}
          className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:border-[#85B100]/30 hover:shadow-md group"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#1F2C30]">{playbook.title}</p>
            <p className="mt-1 truncate text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{playbook.action}</p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Badge tone={playbook.enabled ? "success" : "warning"}>
              {playbook.status}
            </Badge>
            <button
              aria-pressed={playbook.enabled}
              aria-label={`${playbook.title} toggle`}
              className={cn(
                "relative h-6 w-11 rounded-full border transition-all duration-300",
                playbook.enabled ? "border-[#85B100]/40 bg-[#D4F84A]/10" : "border-slate-200 bg-slate-50"
              )}
              onClick={() => togglePlaybook(playbook.title)}
              type="button"
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full transition-all duration-300 shadow-sm",
                  playbook.enabled ? "left-6 bg-[#85B100]" : "left-1 bg-white border border-slate-300"
                )}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
