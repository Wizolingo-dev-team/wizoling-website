"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, RefreshCw, Loader2 } from "lucide-react";
import {
  useResendOtp,
  useVerifyCustomerOtp,
} from "@src/hooks/authManagement";
import {
  resendOtpSchema,
  verifyOtpSchema,
} from "@src/validations/authManagement";
import { validateWithSchema } from "@src/utils/validation";
import FieldError from "@src/components/_atoms/FieldError";
import AuthSingleShell from "@src/components/Sections/Auth/AuthSingleShell";

const OTP_LENGTH = 6;

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [otpDigits, setOtpDigits] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { mutate: verifyOtp, isPending: verifying } = useVerifyCustomerOtp();
  const { mutate: resendOtp, isPending: resending } = useResendOtp();

  const otp = otpDigits.join("");

  const handleDigitChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (fieldErrors.otp) {
      setFieldErrors((prev) => ({ ...prev, otp: "" }));
    }
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const nextDigits = Array.from(
      { length: OTP_LENGTH },
      (_, idx) => pasted[idx] ?? ""
    );
    setOtpDigits(nextDigits);
    if (fieldErrors.otp) {
      setFieldErrors((prev) => ({ ...prev, otp: "" }));
    }
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await validateWithSchema(verifyOtpSchema, { email, otp });
    if (!result.success) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});
    verifyOtp({ email: result.data.email, otp: result.data.otp });
  };

  const handleResend = async () => {
    const result = await validateWithSchema(resendOtpSchema, { email });
    if (!result.success) {
      setFieldErrors((prev) => ({ ...prev, ...result.errors }));
      return;
    }
    setFieldErrors({});
    resendOtp({ email: result.data.email });
  };

  return (
    <AuthSingleShell
      breadcrumbLabel="Verify Email"
      eyebrow="Account Verification"
      title="VERIFY EMAIL"
      subtitle={
        email
          ? `Enter the 6-digit verification OTP sent to ${email} to activate your Wizolingo account.`
          : "Enter the 6-digit verification OTP sent to your email address to activate your Wizolingo account."
      }
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="verify-otp-0"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Verification OTP *
          </label>
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                id={`verify-otp-${index}`}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                aria-label={`OTP digit ${index + 1}`}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleDigitKeyDown(index, e)}
                onPaste={handlePaste}
                className={`h-12 sm:h-14 w-full border bg-neutral-50 text-center font-display text-lg sm:text-xl font-bold text-[#111111] focus:border-[#D70E1D] focus:bg-white focus:outline-none ${
                  fieldErrors.otp ? "border-[#D70E1D]" : "border-neutral-300"
                }`}
              />
            ))}
          </div>
          <FieldError message={fieldErrors.otp} />
          <FieldError message={fieldErrors.email} />
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

