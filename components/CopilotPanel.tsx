"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CopilotPanel() {
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  function submitMessage() {
    const nextMessage = message.trim();

    if (!nextMessage) {
      return;
    }

    setNotes((currentNotes) => [nextMessage, ...currentNotes].slice(0, 3));
    setMessage("");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-[#85B100]/20">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Issue detected</p>
          <p className="mt-1.5 text-sm font-bold text-[#1F2C30]">Core-RTR-01 shows sustained packet loss.</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-[#85B100]/20">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Impact</p>
          <p className="mt-1.5 text-sm font-bold text-[#1F2C30]">West metro traffic may see elevated latency.</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-[#D4F84A]/5 p-4 transition-all duration-300 hover:border-[#85B100]/20">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#85B100]">Suggested action</p>
          <p className="mt-1.5 text-sm font-bold text-[#1F2C30]">Execute BGP peer reset and reroute playbook.</p>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="rounded-xl border border-[#85B100]/10 bg-[#85B100]/5 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#85B100]">Operator notes</p>
          <div className="mt-3 space-y-2">
            {notes.map((note) => (
              <p className="rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-[#1F2C30] shadow-sm" key={note}>
                {note}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Input
          className="h-12 border-slate-200 bg-white px-4 font-bold text-[#1F2C30] placeholder:text-slate-300 focus:border-[#85B100] focus:ring-[#D4F84A]/20 rounded-xl transition-all"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitMessage();
            }
          }}
          placeholder="Ask Copilot or add note..."
          value={message}
        />
        <Button
          className="h-12 w-full bg-[#1F2C30] text-white hover:bg-[#2a3c41] rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          onClick={submitMessage}
          type="button"
        >
          <SendHorizonal className="h-4 w-4" />
          Execute Resolution
        </Button>
      </div>
    </div>
  );
}
