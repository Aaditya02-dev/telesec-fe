"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  GitBranch,
  LayoutDashboard,
  Network,
  RadioTower,
  ShieldAlert,
  Siren,
  Workflow,
  Settings,
  BarChart3,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", badge: null },
  { label: "Alerts & Incidents", icon: Siren, href: "/alerts", badge: { count: 8, color: "bg-[#00ADEF]" } },
  { label: "Root Cause Analysis", icon: BrainCircuit, href: "/root-cause", badge: null },
  { label: "Network Topology", icon: Network, href: "/network-topology", badge: { count: 5, color: "bg-[#E84E4E]" }, hasDropdown: true },
  { label: "Fiber Monitoring", icon: RadioTower, href: "/fiber-monitoring", badge: null },
  { label: "Fraud Detection", icon: ShieldAlert, href: "/fraud-detection", badge: null, hasDropdown: true },
  { label: "Optimization", icon: ChartNoAxesCombined, href: "/optimization", badge: null },
  { label: "AI Copilot", icon: Bot, href: "/ai-copilot", badge: null },
  { label: "Agent Management", icon: GitBranch, href: "/agent-management", badge: null },
  { label: "Automation Playbooks", icon: Workflow, href: "/automation-playbooks", badge: null },
  { label: "Settings", icon: Settings, href: "/settings", badge: null },
  { label: "Reports", icon: BarChart3, href: "/reports", badge: null },
  { label: "Help Center", icon: HelpCircle, href: "/help", badge: null }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden bg-[#1B2629] transition-all duration-300 lg:block border-r border-black/20 flex flex-col h-full",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Collapse Toggle */}
      <button
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
        className="absolute -right-3 top-12 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#1B2629] text-white/50 shadow-md transition-all duration-200 hover:bg-[#3FC3D1] hover:text-white"
        onClick={() => setCollapsed((value) => !value)}
        type="button"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </button>

      {/* Brand/Logo Area */}
      <div className={cn("flex h-20 items-center border-b border-white/5 shrink-0", collapsed ? "justify-center px-3" : "px-6")}>
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-[#3FC3D1]">
            <Activity className="h-6 w-6" />
          </span>
          <div className={collapsed ? "hidden" : "block"}>
            <span className="block text-xl font-bold tracking-tight text-white uppercase">TeleRoot</span>
          </div>
        </Link>
      </div>

      <nav 
        className="sidebar-scrollbar overscroll-contain overflow-y-scroll"
        style={{ height: 'calc(100vh - 160px)' }}
      >
        {/* Navigation Header */}
        <p className={cn(
          "px-6 py-4 text-[13px] font-medium text-white/30 uppercase tracking-widest border-b border-white/5",
          collapsed && "sr-only"
        )}>
          Navigation
        </p>

        <div className="flex flex-col">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center h-[56px] transition-all duration-200 border-b border-black/10 shrink-0 group",
                  isActive 
                    ? "bg-[#3FC3D1] text-white" 
                    : "text-white/70 hover:bg-black/10 hover:text-white",
                  collapsed ? "justify-center" : "px-6"
                )}
              >
                {/* Icon */}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-white" : "text-white/40 group-hover:text-white"
                )} />

                {/* Label & Extras */}
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between ml-4">
                    <span className="text-[12px] font-bold uppercase tracking-wide">{item.label}</span>
                    
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className={cn(
                          "flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white",
                          item.badge.color
                        )}>
                          {item.badge.count}
                        </span>
                      )}
                      
                      {item.hasDropdown && (
                        <ChevronDown className="h-3 w-3 opacity-40" />
                      )}
                    </div>
                  </div>
                )}

                {/* Active Indicator Triangle */}
                {isActive && !collapsed && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer / Environment info */}
      {!collapsed && (
        <div className="shrink-0 p-6">
          <div className="p-4 rounded bg-black/20 border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Network Node</p>
            <p className="mt-1 text-xs font-bold text-[#3FC3D1] uppercase">Production v2.4</p>
          </div>
        </div>
      )}
    </aside>
  );
}
