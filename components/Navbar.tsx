"use client";

import { useMemo, useState, useEffect } from "react";
import { Bell, Menu, Search, User, Shield, Users, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api";
import Link from "next/link";

import { usePathname } from "next/navigation";

const searchableItems = [
  "Core-RTR-01",
  "OLT-Mumbai-7",
  "BNG-Edge-14",
  "Fraud-GW-03",
  "Packet loss spike",
  "Fiber attenuation drift",
  "Restart BGP Peer",
  "Reroute Fiber Segment"
];

const pageTitles: { [key: string]: string } = {
  "/dashboard": "Network Overview",
  "/alerts": "Alerts & Incidents",
  "/root-cause": "Root Cause Analysis",
  "/network-topology": "Network Topology",
  "/fiber-monitoring": "Fiber Monitoring",
  "/fraud-detection": "Fraud Detection",
  "/optimization": "Network Optimization",
  "/ai-copilot": "AI Copilot",
  "/agent-management": "Agent Management",
  "/automation-playbooks": "Automation Playbooks",
  "/billing-usage": "Billing & Usage",
  "/settings": "System Settings",
  "/reports": "Analytics & Reports",
  "/help": "Help Center",
  "/profile": "User Profile"
};

export function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [isBetaUser, setIsBetaUser] = useState(false);

  const currentTitle = pageTitles[pathname] || "Dashboard";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      setIsBetaUser(localStorage.getItem("isBetaUser") === "true");
      if (token) {
        try {
          const userData = await authApi.getMe(token);
          setUser(userData);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      }
    };
    fetchUser();
  }, []);

  const initials = useMemo(() => {
    if (!user?.username) return "TR";
    return user.username.substring(0, 2).toUpperCase();
  }, [user]);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return searchableItems.filter((item) => item.toLowerCase().includes(query)).slice(0, 5);
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("isBetaUser");
    localStorage.removeItem("user_type");
    localStorage.removeItem("iam_dashboard_terms_accepted");
    window.location.href = "/login";
  };

  return (
    <header
      className="sticky top-0 z-20 text-white"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Page Title */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <div className="h-4 w-0.5 rounded-full bg-[#41bf63] shadow-[0_0_8px_rgba(65,191,99,0.6)]" />
          <h1 className="text-[13px] font-black text-white uppercase tracking-[0.15em] truncate">
            {currentTitle}
          </h1>
          {isBetaUser && (
            <span className="flex h-5 items-center rounded-full bg-[#41bf63]/20 px-2 text-[9px] font-black text-[#41bf63] shadow-[0_0_10px_rgba(65,191,99,0.2)] border border-[#41bf63]/30">
              BETA
            </span>
          )}
        </div>

        {/* Center: Search Bar */}
        <div className="flex items-center flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <Input
              className="h-9 border-white/[0.08] bg-white/[0.06] pl-9 text-[11px] font-bold text-white placeholder:text-slate-500 focus:border-[#41bf63]/50 focus:bg-white/10 focus:ring-0 rounded-xl transition-all w-full tracking-wider"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search devices, incidents, playbooks..."
              value={search}
            />
            {search && (
              <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-xl border border-white/10 bg-[#13161F]/95 backdrop-blur-xl text-white shadow-2xl">
                {results.length > 0 ? (
                  results.map((result) => (
                    <button
                      className="block w-full px-4 py-3 text-left text-[11px] font-bold text-white transition-all duration-200 hover:bg-white/5 hover:text-[#41bf63]"
                      key={result}
                      onClick={() => setSearch(result)}
                      type="button"
                    >
                      {result}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-[11px] font-bold text-slate-500">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Alerts & Profile */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-l border-white/5 pl-6">
            <button aria-label="Notifications" className="relative text-slate-400 hover:text-[#41bf63] transition-colors group">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#0B0D14]" />
            </button>
            
            {isBetaUser && (
              <div className="flex flex-col items-end mr-2 hidden sm:flex">
                <span className="text-[9px] font-black text-[#41bf63] uppercase tracking-tighter">Experimental Build</span>
                <span className="text-[8px] font-medium text-slate-500 uppercase tracking-tighter">v0.9 Insider</span>
              </div>
            )}

            <div className="relative group cursor-pointer">
              <Avatar className="h-8 w-8 border border-white/10 transition-all group-hover:border-[#41bf63]/50">
                <AvatarFallback className="bg-[#13161F] text-white font-black text-[10px] uppercase">{initials}</AvatarFallback>
              </Avatar>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full w-64 pt-3 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="rounded-xl border border-white/10 bg-[#13161F]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-white truncate">{user?.username || "Admin"}</p>
                      {isBetaUser && (
                        <span className="rounded bg-[#41bf63]/10 px-1.5 py-0.5 text-[9px] font-black text-[#41bf63] border border-[#41bf63]/20">BETA</span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-400 truncate">{user?.email || "admin@teleroot.io"}</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/profile?tab=settings" className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <User className="h-4 w-4 text-[#41bf63]" />
                      Profile Settings
                    </Link>
                    <Link href="/profile?tab=security" className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <Shield className="h-4 w-4 text-[#41bf63]" />
                      Security & Access
                    </Link>
                    <Link href="/profile?tab=team" className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <Users className="h-4 w-4 text-[#41bf63]" />
                      Team Management
                    </Link>
                  </div>
                  <div className="p-2 border-t border-white/5 bg-black/20">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
