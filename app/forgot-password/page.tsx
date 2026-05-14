"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await authApi.forgotPassword({ email });
      setMessage(data.detail || "If this email exists, a reset link has been sent.");
    } catch (err: any) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1F2C30] px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <Link className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#41bf63]" href="/login">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
        <div className="mb-6">
          <h1 className="text-2xl font-black uppercase tracking-tight">Reset Password</h1>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-400">
            Enter your account email and we will send a secure reset link.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-xl border border-[#41bf63]/25 bg-[#41bf63]/10 p-3 text-sm font-semibold text-[#41bf63]">
            <CheckCircle2 className="mr-2 inline h-4 w-4" />
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm font-semibold text-red-400">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Email address</span>
            <span className="relative block">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm font-semibold text-white outline-none placeholder:text-white/20 focus:border-[#41bf63]/50"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                required
                type="email"
                value={email}
              />
            </span>
          </label>
          <button
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#41bf63] text-xs font-black uppercase tracking-widest text-black transition hover:bg-[#bce628] disabled:opacity-60"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
          </button>
        </form>
      </section>
    </main>
  );
}
