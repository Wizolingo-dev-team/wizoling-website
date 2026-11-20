"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, RefreshCw, Loader2 } from "lucide-react";
import {
  useResendOtp,
  useVerifyCustomerOtp,
} from "@src/hooks/authManagement";
import { useToast } from "@src/hooks/useToast";
import {
  resendOtpSchema,
  verifyOtpSchema,
} from "@src/validations/authManagement";
import AuthSingleShell from "@src/components/Sections/Auth/AuthSingleShell";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [otp, setOtp] = useState("");

  const { mutate: verifyOtp, isPending: verifying } = useVerifyCustomerOtp();
  const { mutate: resendOtp, isPending: resending } = useResendOtp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validated = await verifyOtpSchema.validate(
        { email, otp },
        { abortEarly: true }
      );
      verifyOtp({ email: validated.email, otp: validated.otp });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleResend = async () => {
    try {
      const validated = await resendOtpSchema.validate(
        { email },
        { abortEarly: true }
      );
      resendOtp({ email: validated.email });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <AuthSingleShell
      breadcrumbLabel="Verify Email"
      eyebrow="Account Verification"
      title="VERIFY EMAIL"
      subtitle="Enter the verification OTP sent to your email address to activate your Wizolingo account."
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="verify-email"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Email Address *
          </label>
          <input
            id="verify-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="verify-otp"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Verification OTP *
          </label>
          <input
            id="verify-otp"
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-center font-display text-lg tracking-[0.35em] text-[#111111] placeholder:text-xs placeholder:tracking-normal placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={verifying}
          className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
        >
          {verifying ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>VERIFYING...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="size-4" />
              <span>VERIFY ACCOUNT</span>
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <button
            type="button"
            disabled={resending || !email.trim()}
            onClick={handleResend}
            className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.16em] text-[#D70E1D] hover:text-[#111111] disabled:opacity-50"
          >
            <RefreshCw className="size-3.5" />
            <span>{resending ? "SENDING..." : "RESEND OTP"}</span>
          </button>

          <Link
            href="/login"
            className="uppercase tracking-[0.16em] text-neutral-600 hover:text-[#111111]"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </AuthSingleShell>
  );
}

