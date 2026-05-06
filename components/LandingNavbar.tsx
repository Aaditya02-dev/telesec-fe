"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  Key
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
];

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 pt-4 px-4 md:px-8 transition-all duration-300">
      <div 
        className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-full px-8 transition-all duration-500 ${
          scrolled 
          ? "bg-[#1F2C30]/90 backdrop-blur-xl shadow-2xl border border-white/10" 
          : "bg-black/20 backdrop-blur-md border border-white/20 shadow-lg"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-xl font-bold tracking-[0.2em] text-white uppercase">TeleRoot</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.label}
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative py-4"
            >
              {link.hasDropdown ? (
                <button
                  className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest text-white transition-all hover:text-[#D4F84A] outline-none"
                >
                  {link.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest text-white transition-all hover:text-[#D4F84A]"
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
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4F84A]">Project Intelligence</p>
                          </div>
                          <div className="flex flex-col gap-6">
                            {productsMenu.intelligence.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-start gap-4">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all group-hover:bg-[#D4F84A] group-hover:text-black">
                                  <item.icon className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white transition-colors group-hover:text-[#D4F84A]">{item.title}</p>
                                  {item.desc && <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-400">{item.desc}</p>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Automation Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4F84A]">Automation & Scale</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {productsMenu.automation.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#D4F84A]">
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
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4F84A]">Security & Control</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {productsMenu.security.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#D4F84A]">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[13px] font-medium text-slate-400 transition-colors group-hover:text-white">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                      </div>

                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4F84A]/30 to-transparent" />
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
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4F84A]">Discover</p>
                          </div>
                          <div className="flex flex-col gap-6">
                            {resourcesMenu.discover.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-start gap-4">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all group-hover:bg-[#D4F84A] group-hover:text-black">
                                  <item.icon className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white transition-colors group-hover:text-[#D4F84A]">{item.title}</p>
                                  {item.desc && <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-400">{item.desc}</p>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* LEARN Column */}
                        <div className="p-6">
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4F84A]">Learn</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {resourcesMenu.learn.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#D4F84A]">
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
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4F84A]">Get Support</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {resourcesMenu.support.map((item) => (
                              <Link key={item.title} href="#" className="group flex items-center gap-3 py-0.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 transition-all group-hover:bg-white/10 group-hover:text-[#D4F84A]">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[13px] font-medium text-slate-400 transition-colors group-hover:text-white">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Bottom Accent */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4F84A]/30 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-6 py-2 rounded-xl border-2 border-[#D4F84A] text-white hover:bg-[#D4F84A] hover:text-black transition-all text-[13px] font-bold uppercase tracking-widest flex items-center justify-center"
          >
            Login
          </Link>
          <Link 
            href="/login" 
            className="group flex items-center rounded-full bg-[#D4F84A] text-[12px] font-bold uppercase tracking-wider text-black transition-all hover:bg-[#bce628] hover:shadow-[0_0_20px_rgba(212,248,74,0.3)]"
          >
            <span className="pl-6 pr-4 py-2.5">Get Started Free</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-md p-2 text-white md:hidden"
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
            className="mx-auto mt-2 max-w-7xl rounded-2xl bg-[#223135] p-4 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-[#D4F84A]"
                    onClick={() => !link.hasDropdown && setMobileOpen(false)}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-3 px-4 pb-4">
                <Link 
                  href="/login" 
                  className="flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 py-3 text-sm font-bold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/login" 
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D4F84A] py-3 text-sm font-bold text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started Free
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

