"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { useResetPassword } from "@src/hooks/authManagement";
import { useToast } from "@src/hooks/useToast";
import { resetPasswordSchema } from "@src/validations/authManagement";
import { validateWithSchema } from "@src/utils/validation";
import FieldError from "@src/components/_atoms/FieldError";
import AuthSingleShell from "@src/components/Sections/Auth/AuthSingleShell";

type ResetPasswordFormProps = {
  tokenFromPath?: string;
};

export default function ResetPasswordForm({
  tokenFromPath,
}: ResetPasswordFormProps) {
  const searchParams = useSearchParams();
  const toast = useToast();
  const token = tokenFromPath ?? searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("Missing or invalid password reset token.");
      return;
    }
    const result = await validateWithSchema(resetPasswordSchema, {
      password,
      confirmPassword,
    });
    if (!result.success) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});
    resetPassword({ password: result.data.password, token });
  };

  return (
    <AuthSingleShell
      breadcrumbLabel="Reset Password"
      eyebrow="Security Update"
      title="RESET PASSWORD"
      subtitle="Choose a new password (minimum 6 characters) for your Wizolingo account."
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="reset-password"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            New Password *
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              placeholder="Enter new password"
              className={`w-full border bg-neutral-50 px-4 py-3 pr-11 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none ${
                fieldErrors.password ? "border-[#D70E1D]" : "border-neutral-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#111111]"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          <FieldError message={fieldErrors.password} />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reset-confirm-password"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Confirm New Password *
          </label>
          <input
            id="reset-confirm-password"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (fieldErrors.confirmPassword) {
                setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
            }}
            placeholder="Re-enter new password"
            className={`w-full border bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none ${
              fieldErrors.confirmPassword
                ? "border-[#D70E1D]"
                : "border-neutral-300"
            }`}
          />
          <FieldError message={fieldErrors.confirmPassword} />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>UPDATING...</span>
            </>
          ) : (
            <>
              <KeyRound className="size-4" />
              <span>UPDATE PASSWORD</span>
            </>
          )}
        </button>

        <p className="pt-2 text-center text-xs text-neutral-600">
          <Link
            href="/login"
            className="font-bold uppercase tracking-wider text-[#111111] underline decoration-[#D70E1D] underline-offset-4 hover:text-[#D70E1D]"
          >
            Return to Login
          </Link>
        </p>
      </form>
    </AuthSingleShell>
  );
}

