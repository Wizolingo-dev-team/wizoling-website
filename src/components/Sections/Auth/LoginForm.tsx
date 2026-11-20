"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useCustomerLogin } from "@src/hooks/authManagement";
import { useToast } from "@src/hooks/useToast";
import { loginSchema } from "@src/validations/authManagement";
import AuthSplitShell from "@src/components/Sections/Auth/AuthSplitShell";

export default function LoginForm() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectTo =
    redirectParam && redirectParam.startsWith("/")
      ? redirectParam
      : "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { mutate: login, isPending } = useCustomerLogin(redirectTo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validated = await loginSchema.validate(
        { email, password },
        { abortEarly: true }
      );
      login({ email: validated.email, password: validated.password });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <AuthSplitShell
      breadcrumbLabel="Login"
      eyebrow="My Account"
      title="SIGN IN"
      subtitle="Access your Wizolingo orders, digital music downloads, and wishlist."
      imageSrc="/images/gallery/wizolingo1.jpg"
      imageAlt="Wiz Ofuasia (Wizboyy)"
      quote="Afrobeats. Highlife. A Legacy of Sound."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Email Address *
          </label>
          <input
            id="login-email"
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
            htmlFor="login-password"
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700"
          >
            Password *
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 pr-11 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
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
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 border-neutral-300 bg-white accent-[#D70E1D]"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D70E1D] transition-colors hover:text-[#111111]"
          >
            Lost your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>SIGNING IN...</span>
            </>
          ) : (
            <>
              <span>LOG IN</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p className="pt-2 text-center text-xs text-neutral-600">
          New to Wizolingo Store?{" "}
          <Link
            href="/register"
            className="font-bold uppercase tracking-wider text-[#111111] underline decoration-[#D70E1D] underline-offset-4 hover:text-[#D70E1D]"
          >
            Create an Account
          </Link>
        </p>
      </form>
    </AuthSplitShell>
  );
}

