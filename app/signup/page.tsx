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
  CheckCircle2,
  ShieldCheck,
  Monitor,
  Cpu,
  User
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { GoogleLoginModal } from "@/components/GoogleLoginModal";
import { authApi } from "@/lib/api";
import { iamCompanyEmailMessage, isPersonalEmail } from "@/lib/email-validation";

function getSignupUserType(): "root" | "iam" {
  return "root";
}

function SignupContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const searchParams = useSearchParams();
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessEmail(null);
    setIsLoading(true);

    const userType = getSignupUserType();

    if (userType === "iam" && isPersonalEmail(formData.email)) {
      setError(iamCompanyEmailMessage);
      setIsLoading(false);
      return;
    }

    try {
      await authApi.register({
        username: formData.email, // using email as username
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        company_name: formData.companyName,
        user_type: userType, // default for signup
      });

      setSuccessEmail(formData.email);
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        password: "",
      });
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
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
    localStorage.setItem("user_type", "root");
    
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
    localStorage.setItem("user_type", "root");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#1F2C30] text-white flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-hidden">
      <div className={`transition-opacity duration-300 ${(!isMounted || isCheckingAuth) ? 'opacity-0' : 'opacity-100'} w-full max-w-7xl grid grid-cols-1 md:grid-cols-[38%_62%] gap-6 lg:gap-10 items-stretch h-[90vh] max-h-[900px]`}>
        
        {/* Left Side - Form Section */}
        <div className="flex flex-col justify-center px-4 lg:px-8 xl:px-12 py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#41bf63] text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 19V5H14C16.2091 5 18 6.79086 18 9C18 11.2091 16.2091 13 14 13H7M7 13L18 19" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.1em] uppercase leading-none">TELESEC</span>
              <span className="text-[6px] font-bold text-[#41bf63] uppercase tracking-[0.2em] mt-1">THE NETWORK AI INFRASTRUCTURE PLATFORM</span>
            </div>
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Create an Account</h1>
            <p className="text-slate-400 text-xs">Start your journey with TeleSec today</p>
          </div>

          {/* Social Logins */}
          <div className="space-y-4 mb-5">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative z-10 bg-[#1F2C30] px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Sign up with
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => handleSocialLogin('google')}
                disabled={!!loadingProvider}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 transition-all hover:bg-white/10 disabled:opacity-50"
              >
                {loadingProvider === 'google' ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-[11px] font-bold">Google</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => handleSocialLogin('github')}
                disabled={!!loadingProvider}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 transition-all hover:bg-white/10 disabled:opacity-50"
              >
                {loadingProvider === 'github' ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Github className="h-4 w-4 text-white" />
                    <span className="text-[11px] font-bold">GitHub</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => handleSocialLogin('sso')}
                disabled={!!loadingProvider}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 transition-all hover:bg-white/10 disabled:opacity-50"
              >
                {loadingProvider === 'sso' ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <span className="text-[11px] font-bold">SSO</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative mb-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative z-10 bg-[#1F2C30] px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">OR</span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold text-center">
              {error}
            </div>
          )}

          {successEmail && (
            <div className="mb-3 rounded-lg border border-[#41bf63]/25 bg-[#41bf63]/10 p-3 text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-[#41bf63]">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Check your email</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed text-slate-300">
                We sent a verification link to {successEmail}. Verify your email before signing in.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                <Input 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="pl-11 h-10 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                <Input 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                  placeholder="john@company.com"
                  className="pl-11 h-10 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                <Input 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="TeleSec Inc."
                  className="pl-11 h-10 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl text-sm"
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
                  placeholder="Create a strong password"
                  className="pl-11 pr-11 h-10 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-[#41bf63] text-black font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all hover:bg-[#bce628] disabled:opacity-50 group"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account? <Link href={`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`} className="font-bold text-[#41bf63] hover:underline uppercase tracking-wider text-[10px]">Sign in</Link>
          </p>

          <div className="mt-auto pt-6 flex flex-col items-center">
             <div className="flex items-center gap-2 text-slate-600">
                <Lock className="h-2.5 w-2.5" />
                <p className="text-[9px] leading-relaxed text-center">
                  By joining, you agree to Telesec's<br />
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
              Join the <br />
              <span className="text-[#41bf63]">Future of Networking</span> <br />
              with TeleSec AI
            </h2>
            
            <div className="h-0.5 w-10 bg-[#41bf63] mb-6" />

            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md">
              Unlock the power of unified network intelligence. Hardware, software, and AI working together to ensure your infrastructure never sleeps.
            </p>

            <div className="grid grid-cols-3 gap-0 border-t border-white/10 pt-8">
              <div className="flex flex-col items-center text-center px-2">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#41bf63] mb-3">
                  <Monitor className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-tight">Full Visibility</span>
              </div>
              <div className="flex flex-col items-center text-center px-2 border-l border-white/10">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#41bf63] mb-3">
                  <Cpu className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-tight">AI Insights</span>
              </div>
              <div className="flex flex-col items-center text-center px-2 border-l border-white/10">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#41bf63] mb-3">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-tight">Zero Downtime</span>
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1F2C30]" />}>
      <SignupContent />
    </Suspense>
  );
}

