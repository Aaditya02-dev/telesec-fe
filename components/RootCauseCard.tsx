import { CheckCircle2, Router, Server, TriangleAlert } from "lucide-react";

export function RootCauseCard() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-black">
          Core-RTR-01
        </span>
        <span className="rounded-md border border-danger/30 bg-danger/10 px-3 py-1 text-xs font-bold text-danger">
          3 services impacted
        </span>
        <span className="rounded-md border border-border px-3 py-1 text-xs font-bold text-black">
          8 evidence signals
        </span>
      </div>

      <div className="relative mt-4 h-56 overflow-hidden rounded-lg border border-border bg-white">
        <svg className="absolute inset-0 h-full w-full" role="img" viewBox="0 0 100 100">
          <defs>
            <pattern height="8" id="rcaGrid" patternUnits="userSpaceOnUse" width="8">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#E2E8F0" strokeWidth="0.45" />
            </pattern>
          </defs>
          <rect fill="url(#rcaGrid)" height="100" opacity="0.75" width="100" />

          <path className="rca-flow rca-flow-good" d="M 21 70 C 35 58, 38 50, 50 50" fill="none" />
          <path className="rca-flow rca-flow-bad" d="M 50 50 C 62 50, 68 42, 80 32" fill="none" />
          <path className="rca-flow rca-flow-bad" d="M 50 50 C 63 58, 69 68, 82 76" fill="none" />
          <path className="rca-flow rca-flow-warn" d="M 50 50 C 48 36, 46 28, 50 18" fill="none" />

          <circle className="rca-packet rca-packet-good" r="1.5">
            <animateMotion dur="2.6s" path="M 21 70 C 35 58, 38 50, 50 50" repeatCount="indefinite" />
          </circle>
          <circle className="rca-packet rca-packet-bad" r="1.5">
            <animateMotion dur="2.2s" path="M 50 50 C 62 50, 68 42, 80 32" repeatCount="indefinite" />
          </circle>
          <circle className="rca-packet rca-packet-bad" r="1.5">
            <animateMotion dur="2.4s" path="M 50 50 C 63 58, 69 68, 82 76" repeatCount="indefinite" />
          </circle>
        </svg>

        <div className="absolute left-[50%] top-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <div className="relative">
            <span className="rca-critical-pulse absolute inset-0 rounded-full bg-danger" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-danger text-white shadow-md">
              <Router className="h-5 w-5" />
            </span>
          </div>
          <div className="rounded-md border border-danger/30 bg-white px-2 py-1 text-center shadow-sm">
            <p className="text-xs font-bold text-black">Core-RTR-01</p>
          </div>
        </div>

        <div className="absolute left-[21%] top-[70%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-success text-white shadow-md">
            <Server className="h-4 w-4" />
          </span>
          <p className="rounded-md border border-border bg-white px-2 py-1 text-[10px] font-bold text-black shadow-sm">
            Switch A
          </p>
        </div>

        <div className="absolute left-[50%] top-[18%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-warning text-white shadow-md">
            <TriangleAlert className="h-4 w-4" />
          </span>
          <p className="rounded-md border border-border bg-white px-2 py-1 text-[10px] font-bold text-black shadow-sm">
            CPU Spike
          </p>
        </div>

        <div className="absolute left-[80%] top-[32%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-danger text-white shadow-md">
            <Server className="h-4 w-4" />
          </span>
          <p className="rounded-md border border-border bg-white px-2 py-1 text-[10px] font-bold text-black shadow-sm">
            API Edge
          </p>
        </div>

        <div className="absolute left-[82%] top-[76%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-danger text-white shadow-md">
            <Server className="h-4 w-4" />
          </span>
          <p className="rounded-md border border-border bg-white px-2 py-1 text-[10px] font-bold text-black shadow-sm">
            Metro West
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-success/30 bg-success/10 p-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
          <div>
            <p className="text-sm font-bold text-black">Suggested fix: Restart BGP peer on Core-RTR-01.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
