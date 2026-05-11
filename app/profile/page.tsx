"use client";

import { useState, useEffect, Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { User, Shield, Users, Key, Smartphone, HardDrive } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["settings", "security", "team"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/profile?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-[#13161F] border border-white/5 shadow-2xl mb-6 p-6 lg:px-8">
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#41bf63]/10 blur-3xl pointer-events-none" />
            
            <div className="relative flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#41bf63] to-[#bce628] p-0.5">
                <div className="h-full w-full rounded-full bg-[#0B0C10] flex items-center justify-center">
                  <User className="h-8 w-8 text-[#41bf63]" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">Account Preferences</h1>
                <p className="text-xs font-medium text-slate-400 mt-1">Manage your enterprise settings, security, and team access.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1 space-y-2">
              <button
                onClick={() => handleTabChange("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "settings" ? "bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20 shadow-[0_0_15px_rgba(65,191,99,0.15)]" : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
              >
                <User className="h-4 w-4" />
                Profile Settings
              </button>
              <button
                onClick={() => handleTabChange("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "security" ? "bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20 shadow-[0_0_15px_rgba(65,191,99,0.15)]" : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
              >
                <Shield className="h-4 w-4" />
                Security & Access
              </button>
              <button
                onClick={() => handleTabChange("team")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "team" ? "bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20 shadow-[0_0_15px_rgba(65,191,99,0.15)]" : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
              >
                <Users className="h-4 w-4" />
                Team Management
              </button>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/5 bg-[#13161F] shadow-2xl p-6 lg:p-8 min-h-[500px]">
                {activeTab === "settings" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <h2 className="text-lg font-black text-white uppercase tracking-wider">Personal Information</h2>
                      <p className="text-xs text-slate-400 mb-6">Update your personal details and public profile.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
                        <input type="text" defaultValue="Admin User" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41bf63]/50 focus:ring-1 focus:ring-[#41bf63]/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                        <input type="email" defaultValue="admin@teleroot.io" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41bf63]/50 focus:ring-1 focus:ring-[#41bf63]/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Role</label>
                        <input type="text" defaultValue="Network Operations Lead" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41bf63]/50 focus:ring-1 focus:ring-[#41bf63]/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Timezone</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41bf63]/50 focus:ring-1 focus:ring-[#41bf63]/50 transition-all appearance-none">
                          <option className="bg-[#13161F]">UTC (Universal Coordinated Time)</option>
                          <option className="bg-[#13161F]">EST (Eastern Standard Time)</option>
                          <option className="bg-[#13161F]">PST (Pacific Standard Time)</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button className="px-6 py-2.5 rounded-xl bg-[#41bf63] text-black text-xs font-black uppercase tracking-widest hover:bg-[#bce628] transition-colors shadow-[0_0_20px_rgba(65,191,99,0.3)]">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <h2 className="text-lg font-black text-white uppercase tracking-wider">Security & Access</h2>
                      <p className="text-xs text-slate-400 mb-6">Manage authentication methods and security logs.</p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Password */}
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                            <Key className="h-5 w-5 text-slate-300" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">Password</h3>
                            <p className="text-xs text-slate-400">Last changed 3 months ago</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all">Update</button>
                      </div>

                      {/* 2FA */}
                      <div className="flex items-center justify-between p-4 rounded-xl border border-[#41bf63]/20 bg-[#41bf63]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-full w-1 bg-[#41bf63]" />
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-[#41bf63]/20 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-[#41bf63]" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              Two-Factor Authentication
                              <span className="bg-[#41bf63]/20 text-[#41bf63] px-1.5 py-0.5 rounded text-[10px] uppercase font-black">Enabled</span>
                            </h3>
                            <p className="text-xs text-slate-400">Authenticator app configured</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all">Manage</button>
                      </div>
                      
                      {/* Sessions */}
                      <div className="pt-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Active Sessions</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-3">
                              <HardDrive className="h-4 w-4 text-slate-400" />
                              <div>
                                <p className="text-xs font-bold text-white">MacBook Pro - Chrome</p>
                                <p className="text-[10px] text-slate-500">192.168.1.1 · Active now</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#41bf63] font-bold">Current</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-black text-white uppercase tracking-wider">Team Management</h2>
                        <p className="text-xs text-slate-400">Invite members and manage roles.</p>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/30 text-xs font-black uppercase tracking-widest hover:bg-[#41bf63] hover:text-black transition-colors">
                        + Invite Member
                      </button>
                    </div>

                    <div className="rounded-xl border border-white/5 overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400 font-black">
                          <tr>
                            <th className="px-4 py-3">Member</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-white/[0.02]">
                          <tr>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#41bf63] to-[#bce628] flex items-center justify-center text-black font-black text-xs">
                                  AD
                                </div>
                                <div>
                                  <p className="font-bold text-white">Admin User</p>
                                  <p className="text-[10px] text-slate-400">admin@teleroot.io</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-slate-300">Owner</td>
                            <td className="px-4 py-4">
                              <span className="bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20 px-2 py-1 rounded text-[10px] font-black uppercase">Active</span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button className="text-slate-400 hover:text-white text-xs font-bold">Edit</button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white font-black text-xs">
                                  SJ
                                </div>
                                <div>
                                  <p className="font-bold text-white">Sarah Jenkins</p>
                                  <p className="text-[10px] text-slate-400">s.jenkins@teleroot.io</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-slate-300">Operator</td>
                            <td className="px-4 py-4">
                              <span className="bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20 px-2 py-1 rounded text-[10px] font-black uppercase">Active</span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button className="text-slate-400 hover:text-white text-xs font-bold">Edit</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0C10]" />}>
      <ProfileContent />
    </Suspense>
  );
}
