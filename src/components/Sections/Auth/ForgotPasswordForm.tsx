"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Loader2 } from "lucide-react";
import { useForgotPassword } from "@src/hooks/authManagement";
import AuthSingleShell from "@src/components/Sections/Auth/AuthSingleShell";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { mutate: sendReset, isPending, isSuccess } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    sendReset({ email: email.trim() });
  };

  return (
    <AuthSingleShell
      breadcrumbLabel="Forgot Password"
      eyebrow="Password Recovery"
      title="FORGOT PASSWORD"
      subtitle="Lost your password? Enter your account email and we will send you a password reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="forgot-email"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Email Address *
          </label>
          <input
            id="forgot-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
          />
        </div>

        {isSuccess && (
          <p className="border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
            Check your inbox for the password reset instructions.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>SENDING LINK...</span>
            </>
          ) : (
            <>
              <Mail className="size-4" />
              <span>RESET PASSWORD</span>
            </>
          )}
        </button>

        <p className="pt-2 text-center text-xs text-neutral-600">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-bold uppercase tracking-wider text-[#111111] underline decoration-[#D70E1D] underline-offset-4 hover:text-[#D70E1D]"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </AuthSingleShell>
  );
}

