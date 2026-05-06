"use client";

import { useMemo, useState, useEffect } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api";

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
  "/settings": "System Settings",
  "/reports": "Analytics & Reports",
  "/help": "Help Center"
};

export function Navbar() {
  const pathname = usePathname();
  const [environment, setEnvironment] = useState("Prod");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const currentTitle = pageTitles[pathname] || "Dashboard";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
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
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1B2629]/80 text-white backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Branding & Page Title */}
        <div className="flex items-center gap-4">
          <Button aria-label="Open navigation" className="lg:hidden text-white hover:bg-white/10" size="icon" variant="ghost">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-[#3FC3D1] uppercase tracking-wider">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Right Side: Environment, Search & Profile */}
        <div className="flex items-center gap-3">
          {/* Environment Toggles */}
          <div className="hidden lg:flex overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm">
            {["Dev", "Beta", "Prod"].map((item) => (
              <button
                className={`h-10 px-4 text-xs font-bold transition-all duration-200 ${
                  environment === item
                    ? "bg-[#3FC3D1] text-white"
                    : "bg-transparent text-white/60 hover:bg-white/10 hover:text-white"
                }`}
                key={item}
                onClick={() => setEnvironment(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 border-white/10 bg-white/5 pl-9 text-xs font-semibold text-white placeholder:text-slate-500 focus:border-[#3FC3D1] focus:ring-[#3FC3D1]/20 rounded-xl transition-all w-full"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              value={search}
            />
            {search && (
              <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-white/10 bg-[#1B2629] text-white shadow-2xl">
                {results.length > 0 ? (
                  results.map((result) => (
                    <button
                      className="block w-full px-4 py-3 text-left text-xs font-semibold text-white transition-all duration-200 hover:bg-white/5"
                      key={result}
                      onClick={() => setSearch(result)}
                      type="button"
                    >
                      {result}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-xs font-semibold text-slate-500">No results</p>
                )}
              </div>
            )}
          </div>
        <Button aria-label="Notifications" className="relative h-10 w-10 text-white border-white/10 bg-white/5 hover:bg-white/10 rounded-xl" variant="outline">
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#E84E4E] border-2 border-[#1B2629]" />
        </Button>
        
        <div className="relative group cursor-pointer">
          <Avatar className="h-10 w-10 border border-[#3FC3D1]/30 transition-all group-hover:border-[#3FC3D1] ring-2 ring-transparent group-hover:ring-[#3FC3D1]/20">
            <AvatarFallback className="bg-gradient-to-br from-[#1B2629] to-[#0F171A] text-[#3FC3D1] font-black text-sm border border-white/10">{initials}</AvatarFallback>
          </Avatar>
          
          {/* Professional Mega-Dropdown */}
          <div className="absolute right-0 top-14 w-64 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
            <div className="rounded-[20px] border border-white/10 bg-[#1B2629] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Profile Header */}
              <div className="bg-gradient-to-b from-white/5 to-transparent p-5 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#3FC3D1]/10 flex items-center justify-center border border-[#3FC3D1]/20">
                    <span className="text-xs font-black text-[#3FC3D1]">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{user?.username || "Teleroot Admin"}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Sections */}
              <div className="p-2 space-y-0.5">
                <p className="px-3 pt-3 pb-1 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Account Settings</p>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all group/item">
                  <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover/item:bg-[#3FC3D1]/10 group-hover/item:text-[#3FC3D1]">
                    <Search className="h-3 w-3" /> {/* Replace with User icon if available */}
                  </div>
                  Personal Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all group/item">
                  <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover/item:bg-[#3FC3D1]/10 group-hover/item:text-[#3FC3D1]">
                    <Bell className="h-3 w-3" />
                  </div>
                  Security & Access
                </button>

                <p className="px-3 pt-4 pb-1 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Workspace</p>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all group/item">
                  <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover/item:bg-[#3FC3D1]/10 group-hover/item:text-[#3FC3D1]">
                    <Menu className="h-3 w-3" />
                  </div>
                  Team Management
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all group/item">
                  <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover/item:bg-[#3FC3D1]/10 group-hover/item:text-[#3FC3D1]">
                    <Search className="h-3 w-3" />
                  </div>
                  Billing & Usage
                </button>
              </div>

              {/* Footer Actions */}
              <div className="mt-2 p-2 border-t border-white/5 bg-black/10">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-black text-rose-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all uppercase tracking-widest"
                >
                  Terminate Session
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}
