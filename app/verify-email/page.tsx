"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    if (!uid || !token) {
      setStatus("error");
      setMessage("Verification link is missing required information.");
      return;
    }

    authApi
      .verifyEmail({ uid, token })
      .then((data) => {
        setStatus("success");
        setMessage(data.detail || "Email verified successfully. You can now sign in.");
      })
      .catch((err: Error) => {
        setStatus("error");
        setMessage(err.message || "Verification link is invalid or expired.");
      });
  }, [searchParams]);

  const Icon = status === "loading" ? Loader2 : status === "success" ? CheckCircle2 : AlertCircle;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1F2C30] px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#41bf63]/20 bg-[#41bf63]/10">
          <Icon className={`h-7 w-7 ${status === "loading" ? "animate-spin text-[#41bf63]" : status === "success" ? "text-[#41bf63]" : "text-red-400"}`} />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight">
          {status === "loading" ? "Verifying Email" : status === "success" ? "Email Verified" : "Verification Failed"}
        </h1>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-400">{message}</p>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#41bf63] px-6 text-xs font-black uppercase tracking-widest text-black transition hover:bg-[#bce628]"
          href="/login"
        >
          Go to Login
        </Link>
      </section>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#1F2C30]" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
