"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { authApi } from "@/lib/api";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await authApi.resetPassword({ uid, token, password });
      setMessage(data.detail || "Password reset successfully. You can now sign in.");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const missingToken = !uid || !token;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1F2C30] px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <Link className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#41bf63]" href="/login">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
        <div className="mb-6">
          <h1 className="text-2xl font-black uppercase tracking-tight">Create New Password</h1>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-400">
            Choose a new password for your TeleSec account.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-xl border border-[#41bf63]/25 bg-[#41bf63]/10 p-3 text-sm font-semibold text-[#41bf63]">
            <CheckCircle2 className="mr-2 inline h-4 w-4" />
            {message}
          </div>
        )}

        {(error || missingToken) && (
          <div className="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm font-semibold text-red-400">
            {missingToken ? "Reset link is missing required information." : error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">New password</span>
            <span className="relative block">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-11 text-sm font-semibold text-white outline-none placeholder:text-white/20 focus:border-[#41bf63]/50"
                disabled={missingToken}
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                onClick={() => setShowPassword((value) => !value)}
                type="button"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>
          <button
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#41bf63] text-xs font-black uppercase tracking-widest text-black transition hover:bg-[#bce628] disabled:opacity-60"
            disabled={isLoading || missingToken}
            type="submit"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#1F2C30]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
