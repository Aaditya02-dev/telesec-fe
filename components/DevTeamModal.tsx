"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, Github, Globe, Cpu, Braces, ArrowRight, CheckCircle2, Terminal, GitMerge, Layers, Activity, Users, Rocket, Star, Info, Lock } from "lucide-react";

interface DevTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  { id: "frontend", label: "Frontend Engineer", icon: Layers, desc: "React / Next.js / TypeScript" },
  { id: "backend", label: "Backend Engineer", icon: Terminal, desc: "Python / Django / REST APIs" },
  { id: "devops", label: "DevOps / Platform", icon: Cpu, desc: "CI/CD / Docker / K8s" },
  { id: "ai", label: "AI / ML Engineer", icon: Braces, desc: "LLMs / Model Training / Inference" },
  { id: "fullstack", label: "Full Stack", icon: GitMerge, desc: "End-to-end development" },
];

export function DevTeamModal({ isOpen, onClose }: DevTeamModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", github: "", portfolio: "", message: "", previousWork: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setForm({ name: "", email: "", github: "", portfolio: "", message: "", previousWork: "" }); setSelectedRole(null); }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/90 p-3 backdrop-blur-md sm:p-4"
          onClick={handleClose}
        >
          {/* Modal Container - Split Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid h-[min(800px,calc(100vh-24px))] w-full max-w-[1240px] grid-cols-1 overflow-hidden rounded-[10px] border border-white/10 bg-[#071018] shadow-[0_40px_100px_rgba(0,0,0,0.8)] lg:grid-cols-[43%_57%]"
          >
            {/* Left Column: Mission & Visuals */}
            <div className="relative hidden overflow-hidden border-r border-white/10 bg-[#030813] lg:flex">
              <Image
                src="/image.png"
                alt="Developer working inside a green network intelligence command center"
                fill
                priority
                sizes="45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,19,0.96)_0%,rgba(3,8,19,0.72)_42%,rgba(3,8,19,0.1)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030813] via-[#030813]/80 to-transparent" />

              {/* Logo Area */}
              <div className="absolute left-8 top-7 z-10 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-xl font-black text-white">Teleroot</span>
              </div>

              <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 pt-24 xl:p-9 xl:pt-24">
                <div>
                  <span className="mb-5 inline-block rounded-[10px] bg-[#10202a]/90 px-4 py-2 text-[11px] font-black uppercase text-[#24ff75]">
                    Dev-Team Program
                  </span>
                  <h2 className="max-w-md text-3xl font-black leading-tight text-white xl:text-4xl">
                    Build the future of <br />
                    <span className="text-[#41bf63]">network intelligence</span>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                    Join DevTeam and contribute to Teleroot's open-source infrastructure platform. 
                    Collaborate, innovate, and make an impact.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-5">
                  <div className="space-y-4">
                    {[
                      { icon: Code2, title: "Open Source Impact", desc: "Contribute to real-world infrastructure and empower the community." },
                      { icon: Users, title: "Collaborate with Experts", desc: "Work alongside passionate engineers and industry experts." },
                      { icon: Rocket, title: "Early Access", desc: "Get early access to new features and upcoming tools." },
                      { icon: Star, title: "Recognition", desc: "Earn recognition and showcase your contributions." }
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-white/5 bg-[#10202a]/80 text-[#24ff75]">
                          <benefit.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="mb-0.5 text-sm font-semibold text-white">{benefit.title}</h4>
                          <p className="max-w-xs text-xs leading-relaxed text-slate-300">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Highlight Card */}
                  <div className="flex max-w-sm items-start gap-3 rounded-[8px] border border-white/5 bg-[#10202a]/70 p-4">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center text-[#24ff75]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium leading-relaxed text-white">
                      Your contributions help shape the future of intelligent infrastructure.
                    </p>
                  </div>

                  {/* Stats Footer */}
                  <div className="grid grid-cols-4 gap-3 rounded-[8px] border border-white/5 bg-[#10202a]/80 p-3">
                    {[
                      { label: "Contributors", value: "1,200+", icon: Users },
                      { label: "Projects", value: "300+", icon: Code2 },
                      { label: "Commits", value: "50K+", icon: Globe },
                      { label: "Stars on GitHub", value: "10K+", icon: Star }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex min-w-0 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#24ff75]/10 text-[#24ff75]">
                          <stat.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-black leading-none text-white">{stat.value}</p>
                          <span className="mt-1 block truncate text-[10px] text-slate-300">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="flex min-h-0 flex-col overflow-y-auto bg-[#08111b] p-4 sm:p-5 xl:p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
              {!submitted ? (
                <>
                  {/* Header Mobile Only */}
                  <div className="lg:hidden mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#41bf63] text-black">
                        <Activity className="h-5 w-5" />
                      </div>
                      <span className="text-base font-black uppercase tracking-widest text-white">TeleRoot</span>
                    </div>
                  </div>

                  {/* Form Header */}
                  <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#41bf63]/10 bg-[#41bf63]/10 text-[#24ff75]">
                        <Code2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black uppercase tracking-wide text-white">Join Dev-Team</h3>
                        <p className="text-xs font-medium text-slate-300">Contribute to Teleroot's open-source infrastructure platform</p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full border border-purple-500/10 bg-purple-500/10 px-4 py-2 sm:flex">
                      <Users className="h-3.5 w-3.5 text-purple-400" />
                      <span className="whitespace-nowrap text-xs font-semibold text-purple-200">Open to all developers</span>
                    </div>
                    <button onClick={handleClose} className="absolute right-5 top-5 text-slate-500 transition-colors hover:text-white">
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Role Selector */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white">Select Your Role <span className="text-red-400">*</span></p>
                      <div className="grid grid-cols-2 gap-2 xl:grid-cols-5">
                        {roles.map((role) => (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setSelectedRole(role.id)}
                            className={`group flex min-h-[64px] flex-col justify-between rounded-[8px] border p-2.5 text-left transition-all ${
                              selectedRole === role.id 
                                ? "border-[#41bf63] bg-[#41bf63]/5 ring-1 ring-[#41bf63]/20" 
                                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <role.icon className={`h-3.5 w-3.5 ${selectedRole === role.id ? "text-[#41bf63]" : "text-slate-500"}`} />
                              {selectedRole === role.id && <CheckCircle2 className="h-3.5 w-3.5 text-[#41bf63]" />}
                            </div>
                            <div className="min-w-0">
                              <p className={`truncate text-[9px] font-black uppercase tracking-wide ${selectedRole === role.id ? "text-white" : "text-slate-300"}`}>{role.label}</p>
                              <p className="mt-0.5 line-clamp-1 text-[8px] text-slate-500 transition-colors group-hover:text-slate-400">{role.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Details */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-white">Full Name <span className="text-red-400">*</span></label>
                        <input
                          type="text" required placeholder="Your name" name="name" value={form.name} onChange={handleChange}
                          className="h-9 w-full rounded-[8px] border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all focus:border-[#41bf63]/40 focus:bg-white/[0.05]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-white">Email <span className="text-red-400">*</span></label>
                        <input
                          type="email" required placeholder="you@example.com" name="email" value={form.email} onChange={handleChange}
                          className="h-9 w-full rounded-[8px] border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all focus:border-[#41bf63]/40 focus:bg-white/[0.05]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-white">GitHub Profile</label>
                        <div className="relative">
                          <Github className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                          <input
                            type="text" placeholder="github.com/username" name="github" value={form.github} onChange={handleChange}
                            className="h-9 w-full rounded-[8px] border border-white/10 bg-white/[0.03] pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-[#41bf63]/40 focus:bg-white/[0.05]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-white">Portfolio / Website</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                          <input
                            type="text" placeholder="yoursite.com" name="portfolio" value={form.portfolio} onChange={handleChange}
                            className="h-9 w-full rounded-[8px] border border-white/10 bg-white/[0.03] pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-[#41bf63]/40 focus:bg-white/[0.05]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Essay Questions */}
                    <div className="space-y-2">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-[0.16em] text-white">Tell me your past work <span className="text-red-400">*</span></label>
                        <textarea
                          required rows={2} placeholder="Share previous projects, open-source work, or technical experience..."
                          name="previousWork" value={form.previousWork} onChange={handleChange}
                          className="h-[48px] w-full resize-none rounded-[8px] border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white outline-none transition-all focus:border-[#41bf63]/40 focus:bg-white/[0.05]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-white">Why do you want to contribute? <span className="text-red-400">*</span></label>
                        <textarea
                          required rows={3} placeholder="Tell us about your skills, what you'd like to work on, and why Teleroot interests you..." 
                          name="message" value={form.message} onChange={handleChange}
                          className="h-[58px] w-full resize-none rounded-[8px] border border-white/10 bg-white/[0.03] p-3 text-sm text-white outline-none transition-all focus:border-[#41bf63]/40 focus:bg-white/[0.05]"
                        />
                      </div>
                    </div>

                    {/* Terms & Policies */}
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white">Terms & Policies <span className="text-red-400">*</span></p>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-3">
                          <input id="devteam-terms" type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[#41bf63] focus:ring-[#41bf63]/30" />
                          <span className="text-sm text-slate-200">
                            <label htmlFor="devteam-terms" className="cursor-pointer transition-colors hover:text-white">
                              I agree to the DevTeam Program
                            </label>{" "}
                            <Link href="/devteam-terms" className="text-[#24ff75] hover:underline">
                              Terms & Conditions
                            </Link>
                            .
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <input id="devteam-privacy" type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[#41bf63] focus:ring-[#41bf63]/30" />
                          <span className="text-sm text-slate-200">
                            <label htmlFor="devteam-privacy" className="cursor-pointer transition-colors hover:text-white">
                              I have read and agree to the
                            </label>{" "}
                            <Link href="/devteam-privacy" className="text-[#24ff75] hover:underline">
                              Privacy Policy
                            </Link>
                            .
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Alert */}
                    <div className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.02] p-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-500/50 text-blue-400">
                        <Info className="h-4 w-4" />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        We respect your privacy. Your information will only be used to review your application and communicate with you regarding the DevTeam program.
                      </p>
                    </div>

                    {/* Submit Section */}
                    <div>
                      <button
                        type="submit"
                        disabled={!selectedRole}
                        className="group relative h-10 w-full overflow-hidden rounded-[8px] bg-[#16b957] text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#24c862] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Submit Application
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                      <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                        <Lock className="h-3 w-3" />
                        <span>We review all applications within 3-5 business days.</span>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#41bf63]/10 border border-[#41bf63]/20">
                    <CheckCircle2 className="h-12 w-12 text-[#41bf63]" />
                  </div>
                  <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-white leading-tight">
                    Application <br /> Submitted!
                  </h3>
                  <p className="mb-10 max-w-sm text-[15px] font-medium text-slate-400 leading-relaxed">
                    Thanks for your interest in joining the Teleroot DevTeam. We've received your application and our team will get back to you soon.
                  </p>
                  <button
                    onClick={handleClose}
                    className="h-12 px-10 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
