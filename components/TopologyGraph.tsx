"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Router, Server, Wifi } from "lucide-react";

const nodes = [
  { label: "OLT-7", x: 50, y: 15, status: "healthy", latency: 12, load: 42, icon: Wifi },
  { label: "BNG-14", x: 17, y: 44, status: "healthy", latency: 18, load: 58, icon: Server },
  { label: "Core-01", x: 50, y: 49, status: "critical", latency: 86, load: 91, icon: Router, central: true },
  { label: "Edge-22", x: 83, y: 42, status: "healthy", latency: 21, load: 49, icon: Server },
  { label: "Hub-W18", x: 33, y: 82, status: "healthy", latency: 16, load: 36, icon: Server },
  { label: "Fraud-03", x: 70, y: 78, status: "warning", latency: 44, load: 73, icon: Activity }
];

const links = [
  { from: "OLT-7", to: "Core-01", utilization: 71, status: "healthy", duration: "2.8s" },
  { from: "BNG-14", to: "Core-01", utilization: 64, status: "healthy", duration: "3.2s" },
  { from: "Edge-22", to: "Core-01", utilization: 52, status: "healthy", duration: "3.6s" },
  { from: "Hub-W18", to: "Core-01", utilization: 39, status: "healthy", duration: "4s" },
  { from: "Fraud-03", to: "Core-01", utilization: 83, status: "warning", duration: "2.4s" }
];

const statusStyle = {
  critical: {
    bg: "bg-danger",
    border: "border-danger",
    fill: "#DC2626",
    line: "#DC2626",
    text: "text-danger"
  },
  healthy: {
    bg: "bg-success",
    border: "border-success",
    fill: "#16A34A",
    line: "#16A34A",
    text: "text-success"
  },
  warning: {
    bg: "bg-warning",
    border: "border-warning",
    fill: "#D97706",
    line: "#D97706",
    text: "text-warning"
  }
};

export function TopologyGraph() {
  const [secondsAgo, setSecondsAgo] = useState(0);
  const byLabel = useMemo(() => Object.fromEntries(nodes.map((node) => [node.label, node])), []);
  const healthyNodes = nodes.filter((node) => node.status === "healthy").length;
  const riskyLinks = links.filter((link) => link.status !== "healthy").length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsAgo((value) => (value + 1) % 10);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Healthy</p>
          <p className="mt-1 text-lg font-bold text-black">{healthyNodes}/6</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Risk Links</p>
          <p className="mt-1 text-lg font-bold text-black">{riskyLinks}</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Core Load</p>
          <p className="mt-1 text-lg font-bold text-danger">91%</p>
        </div>
      </div>

      <div className="relative mt-4 h-80 overflow-hidden rounded-lg border border-border bg-white">
        <svg className="absolute inset-0 h-full w-full" role="img" viewBox="0 0 100 100">
          <defs>
            <pattern height="8" id="topologyGrid" patternUnits="userSpaceOnUse" width="8">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#E2E8F0" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect fill="url(#topologyGrid)" height="100" opacity="0.75" width="100" />
          {links.map((link) => {
            const from = byLabel[link.from];
            const to = byLabel[link.to];
            const tone = statusStyle[link.status as keyof typeof statusStyle];

            return (
              <g key={`${link.from}-${link.to}`}>
                <line
                  className="topology-link"
                  stroke={tone.line}
                  strokeLinecap="round"
                  strokeOpacity="0.42"
                  strokeWidth="1.4"
                  x1={from.x}
                  x2={to.x}
                  y1={from.y}
                  y2={to.y}
                />
                <circle fill={tone.fill} r="1.2">
                  <animate attributeName="cx" dur={link.duration} repeatCount="indefinite" values={`${from.x};${to.x}`} />
                  <animate attributeName="cy" dur={link.duration} repeatCount="indefinite" values={`${from.y};${to.y}`} />
                </circle>
                <text
                  fill="#0F172A"
                  fontSize="3"
                  fontWeight="700"
                  textAnchor="middle"
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 2}
                >
                  {link.utilization}%
                </text>
              </g>
            );
          })}
        </svg>
        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative">
              <span className={`topology-pulse absolute inset-0 rounded-full ${statusStyle[node.status as keyof typeof statusStyle].bg}`} />
              <span
                className={`relative flex items-center justify-center rounded-full border-2 border-white bg-white shadow-md ${
                  node.central ? "h-14 w-14" : "h-11 w-11"
                }`}
              >
                <node.icon className={`h-5 w-5 ${statusStyle[node.status as keyof typeof statusStyle].text}`} />
              </span>
            </div>
            <div className="rounded-md border border-border bg-white px-2 py-1 text-center text-xs font-bold text-black shadow-sm">
              <p>{node.label}</p>
              <p className="text-[10px] font-semibold text-slate-600">
                {node.latency}ms / {node.load}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
