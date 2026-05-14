"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Github, 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Monitor,
  Cpu
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { GoogleLoginModal } from "@/components/GoogleLoginModal";
import { authApi } from "@/lib/api";
import { iamCompanyEmailMessage, isPersonalEmail } from "@/lib/email-validation";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [userType, setUserType] = useState<"root" | "iam" | null>(null);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = redirectPath;
    } else {
      setIsCheckingAuth(false);
    }
  }, [redirectPath]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (userType === "iam" && isPersonalEmail(formData.identifier)) {
      setError(iamCompanyEmailMessage);
      setIsLoading(false);
      return;
    }

    try {
      // For Django JWT, we usually send 'username' and 'password'
      // Since identifier can be email or account ID, we use it as username in our simple setup
      const response = await authApi.login({
        username: formData.identifier,
        password: formData.password,
        user_type: userType || "root",
      });
      
      // Store tokens (simple localStorage for demo, usually cookies/context)
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      localStorage.setItem("user_type", userType || "root");
      
      window.location.href = redirectPath;
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      setIsGoogleModalOpen(true);
      return;
    }
    setLoadingProvider(provider);
    
    // Set demo tokens for testing purpose
    localStorage.setItem("access_token", `demo_${provider}_token_${Math.random().toString(36).substring(7)}`);
    localStorage.setItem("user_type", userType || "root");
    
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  const handleGoogleSelect = (email: string) => {
    setIsGoogleModalOpen(false);
    setLoadingProvider('google');
    
    // Set demo tokens for testing purpose
    localStorage.setItem("access_token", `demo_google_token_${Math.random().toString(36).substring(7)}`);
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_type", userType || "root");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#1F2C30] text-white flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-hidden">
      <div className={`transition-opacity duration-300 ${(!isMounted || isCheckingAuth) ? 'opacity-0' : 'opacity-100'} w-full max-w-7xl grid grid-cols-1 md:grid-cols-[38%_62%] gap-6 lg:gap-10 items-stretch h-[90vh] max-h-[900px]`}>
        
        {/* Left Side - Form Section */}
        <div className="flex flex-col justify-center px-4 lg:px-6 xl:px-10 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-5">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.1em] uppercase leading-none">TELESEC</span>
              <span className="text-[6px] font-bold text-[#41bf63] uppercase tracking-[0.2em] mt-1">THE NETWORK AI INFRASTRUCTURE PLATFORM</span>
            </div>
          </Link>

          <div className="mb-4">
            <h1 className="text-xl lg:text-2xl font-bold mb-0.5">Sign in to Telesec</h1>
            <div className="flex items-center gap-2">
              <p className="text-slate-400 text-[11px]">Access your account to continue</p>
              <div className="flex items-center gap-1 rounded-full bg-[#41bf63]/10 px-1.5 py-0.5 border border-[#41bf63]/20">
                <span className="h-1 w-1 rounded-full bg-[#41bf63] animate-pulse" />
                <span className="text-[8px] font-black text-[#41bf63] uppercase">Insider Beta</span>
              </div>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">User type</span>
              <span className="text-[10px] text-[#41bf63] underline cursor-pointer">(not sure?)</span>
            </div>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setUserType("root")}
                className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                  userType === "root"
                    ? "border-[#41bf63] bg-[#41bf63]/5"
                    : "border-white/10 bg-white/5 hover:bg-white/8"
                }`}
              >
                <div className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                  userType === "root" ? "border-[#41bf63]" : "border-white/30"
                }`}>
                  {userType === "root" && <div className="h-1.5 w-1.5 rounded-full bg-[#41bf63]" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Root user</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Account owner that performs tasks requiring unrestricted access.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUserType("iam")}
                className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                  userType === "iam"
                    ? "border-[#41bf63] bg-[#41bf63]/5"
                    : "border-white/10 bg-white/5 hover:bg-white/8"
                }`}
              >
                <div className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                  userType === "iam" ? "border-[#41bf63]" : "border-white/30"
                }`}>
                  {userType === "iam" && <div className="h-1.5 w-1.5 rounded-full bg-[#41bf63]" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">IAM user</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">User within an account that performs daily tasks.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Show rest only after user type selected */}
          {userType && (
            <>
              {/* Social Logins */}
              <div className="space-y-2 mb-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <span className="relative z-10 bg-[#1F2C30] px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Sign in with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handleSocialLogin('google')} disabled={!!loadingProvider}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 transition-all hover:bg-white/10 disabled:opacity-50">
                    {loadingProvider === 'google' ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                      <><svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg><span className="text-[11px] font-bold">Google</span></>
                    )}
                  </button>
                  <button onClick={() => handleSocialLogin('github')} disabled={!!loadingProvider}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 transition-all hover:bg-white/10 disabled:opacity-50">
                    {loadingProvider === 'github' ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                      <><Github className="h-4 w-4 text-white" /><span className="text-[11px] font-bold">GitHub</span></>
                    )}
                  </button>
                  <button onClick={() => handleSocialLogin('sso')} disabled={!!loadingProvider}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 transition-all hover:bg-white/10 disabled:opacity-50">
                    {loadingProvider === 'sso' ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                      <><Building2 className="h-4 w-4 text-slate-400" /><span className="text-[11px] font-bold">SSO</span></>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative mb-3 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <span className="relative z-10 bg-[#1F2C30] px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">OR</span>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold text-center">
                  {error}
                </div>
              )}

              {/* Credentials Form */}
              <form onSubmit={handleLogin} className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {userType === "root" ? "Root Email / Account ID" : "IAM Username"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                    <Input 
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleInputChange}
                      required
                      placeholder={userType === "root" ? "Enter your root email" : "Enter IAM username"}
                      className="pl-10 h-9 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl text-xs" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                    <Input 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-9 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl text-xs" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex h-4 w-4 items-center justify-center rounded border border-white/20 bg-white/5 transition-all group-hover:border-[#41bf63]/50">
                      <input type="checkbox" className="peer absolute opacity-0 cursor-pointer" />
                      <div className="h-2 w-2 scale-0 rounded-[1px] bg-[#41bf63] transition-transform peer-checked:scale-100" />
                    </div>
                    <span className="text-[11px] text-slate-400">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-[#41bf63] hover:underline">Forgot password?</Link>
                </div>

                {userType === "iam" && (
                  <div className="pt-2 pb-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-white mb-3 block">
                      TERMS & POLICIES <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-white transition-all shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                          <input type="checkbox" required className="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
                          <div className="absolute inset-0 flex items-center justify-center scale-0 transition-transform duration-200 peer-checked:scale-100">
                            <svg className="h-3 w-3 text-[#41bf63] drop-shadow-[0_0_3px_rgba(65,191,99,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <span className="text-xs text-white">
                          I agree to the Telesec <Link href="/terms" className="text-[#41bf63] hover:underline">Terms & Conditions</Link>.
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-white transition-all shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                          <input type="checkbox" required className="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
                          <div className="absolute inset-0 flex items-center justify-center scale-0 transition-transform duration-200 peer-checked:scale-100">
                            <svg className="h-3 w-3 text-[#41bf63] drop-shadow-[0_0_3px_rgba(65,191,99,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <span className="text-xs text-white">
                          I have read and agree to the <Link href="/privacy" className="text-[#41bf63] hover:underline">Privacy Policy</Link>.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 rounded-xl bg-[#41bf63] text-black font-bold text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all hover:bg-[#bce628] disabled:opacity-50 group"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In as {userType === "root" ? "Root User" : "IAM User"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="mt-5 text-center text-xs text-slate-500">
            Don't have an account? <Link href="/signup" className="font-bold text-[#41bf63] hover:underline uppercase tracking-wider text-[10px]">Sign up</Link>
          </p>

          <div className="mt-auto pt-4 flex flex-col items-center">
             <div className="flex items-center gap-2 text-slate-600">
                <Lock className="h-2.5 w-2.5" />
                <p className="text-[9px] leading-relaxed text-center">
                  By continuing, you agree to Telesec's<br />
                  <Link href="#" className="text-[#41bf63] hover:underline">Terms of Service</Link>, <Link href="#" className="text-[#41bf63] hover:underline">Privacy Policy</Link> and <Link href="#" className="text-[#41bf63] hover:underline">Cookie Policy</Link>.
                </p>
             </div>
          </div>
        </div>

        {/* Right Side - Hero Card */}
        <div className="relative overflow-hidden rounded-[40px] bg-[#162124] border border-white/5 p-10 lg:p-14 flex flex-col justify-end min-h-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/login-hero.png" 
              alt="Network Infrastructure" 
              className="h-full w-full object-cover object-[70%_center] opacity-90"
            />
            {/* Subtle overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#162124] via-[#162124]/40 to-transparent" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-[40px] font-bold leading-tight mb-4">
              Transforming <br />
              <span className="text-[#41bf63]">Telecom Networks</span> <br />
              into Intelligent Systems
            </h2>
            
            <div className="h-0.5 w-10 bg-[#41bf63] mb-6" />

            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md">
              Telesec unifies network intelligence â€” hardware, software, and AI â€” with real-time observability to speed up engineering and improve resiliency against outages in production infrastructure.
            </p>

            <div className="grid grid-cols-3 gap-0 border-t border-white/10 pt-8">
              <div className="flex flex-col items-center text-center px-2">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#41bf63] mb-3">
                  <Monitor className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-tight">Real-time<br />Observability</span>
              </div>
              <div className="flex flex-col items-center text-center px-2 border-l border-white/10">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#41bf63] mb-3">
                  <Cpu className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-tight">AI-Powered<br />Intelligence</span>
              </div>
              <div className="flex flex-col items-center text-center px-2 border-l border-white/10">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#41bf63] mb-3">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-tight">Resilient<br />Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer copyright */}
      <div className="fixed bottom-4 left-0 right-0 text-center z-20 pointer-events-none">
        <p className="text-[10px] text-slate-700 font-medium tracking-wider">
          Â© 2026 Telesec. All rights reserved.
        </p>
      </div>
      <GoogleLoginModal 
        isOpen={isGoogleModalOpen} 
        onClose={() => setIsGoogleModalOpen(false)}
        onSelect={handleGoogleSelect}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1F2C30]" />}>
      <LoginContent />
    </Suspense>
  );
}

