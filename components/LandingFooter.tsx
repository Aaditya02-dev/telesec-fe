import Link from "next/link";
import { Activity, Twitter, Linkedin, Github } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Dashboard Overview", href: "/dashboard" },
      { label: "Network Topology", href: "/dashboard" },
      { label: "AI Copilot", href: "/dashboard" },
      { label: "Automation Playbooks", href: "/dashboard" },
      { label: "Fraud Detection", href: "/dashboard" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Fiber Monitoring", href: "/dashboard" },
      { label: "Root Cause Analysis", href: "/dashboard" },
      { label: "Agent Management", href: "/dashboard" },
      { label: "Optimization", href: "/dashboard" },
      { label: "Alerts & Incidents", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Security", href: "#" },
      { label: "Status Page", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-[#172124] text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top Row */}
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-xl font-bold text-white uppercase tracking-widest">TeleRoot</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Autonomous AI-powered network intelligence for modern telecommunications.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-[#D4F84A] hover:text-black">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-[#D4F84A] hover:text-black">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-[#D4F84A] hover:text-black">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#D4F84A]">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} TeleRoot AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-white">Terms of Service</Link>
            <Link href="#" className="transition-colors hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
