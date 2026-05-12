"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  BookOpen,
  Layout,
  FileCheck,
  Video,
  GraduationCap,
  FileText,
  Type,
  Monitor,
  Calculator,
  FileSearch,
  Zap,
  Users,
  RefreshCw,
  ShieldAlert,
  Lock,
  Key,
  Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DevTeamModal } from "./DevTeamModal";

const productsMenu = {
  intelligence: [
    { title: "Project Dashboard", desc: "Unified view of health", icon: Layout },
    { title: "Topology Mapping", desc: "Real-time 3D visualization", icon: Monitor },
    { title: "Root Cause AI", desc: "Intelligent troubleshooting", icon: FileSearch },
  ],
  automation: [
    { title: "Playbook Engine", icon: Zap },
    { title: "Agent Orchestrator", icon: Users },
    { title: "Network CI/CD", icon: RefreshCw },
  ],
  security: [
    { title: "Fraud Detection", icon: ShieldAlert },
    { title: "Audit Logging", icon: Lock },
    { title: "RBAC Control", icon: Key },
  ]
};

const resourcesMenu = {
  discover: [
    { title: "Resource Center", desc: "Explore Teleroot Resources", icon: BookOpen },
    { title: "Blog", desc: "Latest industry insights", icon: Layout },
    { title: "Case Studies", desc: "Customer success stories", icon: FileCheck },
    { title: "Webinars & Events", desc: "Join our live sessions", icon: Video },
  ],
  learn: [
    { title: "Learning Guides", icon: GraduationCap },
    { title: "Solution Sheets", icon: FileText },
    { title: "Glossary", icon: Type },
    { title: "Product Tours", icon: Monitor },
    { title: "ROI Calculator", icon: Calculator },
  ],
  support: [
    { title: "Documentation", icon: FileSearch },
  ]
};

const navLinks = [
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Solutions", href: "#solutions" },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Join Dev-Team", href: "#", isDevTeam: true },
];

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDevTeamModalOpen, setIsDevTeamModalOpen] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("access_token") || localStorage.getItem("token") || localStorage.getItem("refresh_token"))
      : null;
    if (token) {
      router.push("/pricing");
    } else {
      router.push("/signup");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 pt-4 px-4 md:px-8 transition-all duration-300">
      <div
        className={`mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between rounded-full px-3 lg:px-4 xl:px-10 transition-all duration-500 ${scrolled
          ? "bg-[#1F2C30]/90 backdrop-blur-xl shadow-2xl border border-white/10"
          : "bg-black/20 backdrop-blur-md border border-white/20 shadow-lg"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-lg lg:text-base xl:text-xl font-bold tracking-[0.2em] text-white uppercase">TeleRoot</span>
        </Link>

        {/* Desktop Nav & Action Buttons Wrapper */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 shrink-0">
          {/* Desktop Nav */}
          <nav className="flex items-center gap-4 xl:gap-8 shrink-0">
          {navLinks.map((link) => (
            <div
              key={link.label}
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative py-4"
            >
              {link.hasDropdown ? (
                <button
                  className="flex items-center gap-1 text-[11px] xl:text-[13px] font-semibold uppercase tracking-widest text-white transition-all hover:text-[#41bf63] outline-none"
                >
                  {link.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
              ) : link.label === "Join Dev-Team" ? (
                <button
                  onClick={() => setIsDevTeamModalOpen(true)}
                  className="px-3 xl:px-6 py-1.5 xl:py-2 rounded-xl border-2 border-[#41bf63] text-white hover:bg-[#41bf63] hover:text-black transition-all text-[10px] xl:text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 xl:gap-2 whitespace-nowrap"
                >
                  <Code2 className="h-3 w-3 xl:h-4 xl:w-4" />
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[11px] xl:text-[13px] font-semibold uppercase tracking-widest text-white transition-all hover:text-[#41bf63]"
                >
                  {link.label}
                </Link>
              )}

              {/* Products Mega Menu */}
              <AnimatePresence>
                {activeDropdown === "Products" && link.label === "Products" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed left-0 right-0 top-[88px] z-[-1] px-4 md:px-8"
                  >
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0F171A] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                      <div className="grid grid-cols-3 divide-x divide-white/5">

                        {/* Intelligence Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#41bf63]">Project Intelligence</p>
                          </div>
                          <div className="flex flex-col gap-6">
                            {productsMenu.intelligence.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-start gap-4">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all group-hover:bg-[#41bf63] group-hover:text-black">
                                  <item.icon className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white transition-colors group-hover:text-[#41bf63]">{item.title}</p>
                                  {item.desc && <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-400">{item.desc}</p>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Automation Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#41bf63]">Automation & Scale</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {productsMenu.automation.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#41bf63]">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[13px] font-medium text-slate-400 transition-colors group-hover:text-white">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Security Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#41bf63]">Security & Control</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {productsMenu.security.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#41bf63]">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[13px] font-medium text-slate-400 transition-colors group-hover:text-white">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                      </div>

                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#41bf63]/30 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Resources Mega Menu - Full Width */}
              <AnimatePresence>
                {activeDropdown === "Resources" && link.label === "Resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed left-0 right-0 top-[88px] z-[-1] px-4 md:px-8"
                  >
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0F171A] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                      <div className="grid grid-cols-3 divide-x divide-white/5">

                        {/* DISCOVER Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#41bf63]">Discover</p>
                          </div>
                          <div className="flex flex-col gap-6">
                            {resourcesMenu.discover.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-start gap-4">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all group-hover:bg-[#41bf63] group-hover:text-black">
                                  <item.icon className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white transition-colors group-hover:text-[#41bf63]">{item.title}</p>
                                  {item.desc && <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-400">{item.desc}</p>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* LEARN Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#41bf63]">Learn</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {resourcesMenu.learn.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#41bf63]">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[13px] font-medium text-slate-400 transition-colors group-hover:text-white">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* GET SUPPORT Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#41bf63]">Get Support</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {resourcesMenu.support.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#41bf63]">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[13px] font-medium text-slate-400 transition-colors group-hover:text-white">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Bottom Accent */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#41bf63]/30 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 xl:gap-8 shrink-0">
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="px-3 xl:px-6 py-1.5 xl:py-2 rounded-xl border-2 border-[#41bf63] text-white hover:bg-[#41bf63] hover:text-black transition-all text-[10px] xl:text-[13px] font-bold uppercase tracking-widest flex items-center justify-center whitespace-nowrap"
          >
            {isLoggedIn ? "Go to Dashboard" : "Go to Console"}
          </Link>
          <button
            onClick={handleGetStarted}
            className="group flex items-center rounded-full bg-[#41bf63] text-[10px] xl:text-[12px] font-bold uppercase tracking-wider text-black transition-all hover:bg-[#bce628] hover:shadow-[0_0_20px_rgba(65,191,99,0.3)] whitespace-nowrap"
          >
            <span className="pl-3 xl:pl-6 pr-2 xl:pr-4 py-1.5 xl:py-2.5">{isLoggedIn ? "Upgrade Plan" : "Get Started Free"}</span>
            <div className="flex h-7 w-7 xl:h-9 xl:w-9 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-3 w-3 xl:h-4 xl:w-4" />
            </div>
          </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-md p-2 text-white lg:hidden shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl bg-[#223135] p-4 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.label === "Join Dev-Team" ? (
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setIsDevTeamModalOpen(true);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-[#41bf63] hover:bg-[#41bf63]/10"
                    >
                      <span className="flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        {link.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-[#41bf63]"
                      onClick={() => !link.hasDropdown && setMobileOpen(false)}
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-3 px-4 pb-4">
                <Link
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  className="flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 py-3 text-sm font-bold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {isLoggedIn ? "Dashboard" : "Console"}
                </Link>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#41bf63] py-3 text-sm font-bold text-black"
                  onClick={() => {
                    setMobileOpen(false);
                    handleGetStarted();
                  }}
                >
                  {isLoggedIn ? "Upgrade Plan" : "Get Started Free"}
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DevTeamModal isOpen={isDevTeamModalOpen} onClose={() => setIsDevTeamModalOpen(false)} />
    </header>
  );
}

