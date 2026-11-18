"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Camera,
} from "lucide-react";
import { useRegisterCustomer } from "@src/hooks/authManagement";
import AuthSplitShell from "@src/components/Sections/Auth/AuthSplitShell";

export default function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate: register, isPending } = useRegisterCustomer();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("email", email.trim());
    formData.append("phoneNumber", phoneNumber.trim());
    formData.append("address", address.trim());
    formData.append("password", password);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    register(formData, {
      onSuccess: () => {
        router.push(
          `/verify-email?email=${encodeURIComponent(email.trim())}`
        );
      },
    });
  };

  return (
    <AuthSplitShell
      breadcrumbLabel="Register"
      eyebrow="Join Wizolingo"
      title="CREATE ACCOUNT"
      subtitle="Unlock instant digital music downloads, merch tracking, and exclusive fan releases."
      imageSrc="/images/gallery/wizolingo3.jpg"
      imageAlt="Wiz Ofuasia Studio Portrait"
      quote="Experience Official Wiz Ofuasia Merch & Music."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4 pb-2">
          <label
            htmlFor="register-avatar"
            className="relative flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-neutral-100 text-neutral-500 transition-colors hover:border-[#D70E1D]"
          >
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            ) : (
              <Camera className="size-5" />
            )}
            <input
              id="register-avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="sr-only"
            />
          </label>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
              Profile Photo (Optional)
            </p>
            <p className="text-[11px] text-neutral-500">
              Displayed in your account &amp; navigation profile
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="register-firstName"
              className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
            >
              First Name *
            </label>
            <input
              id="register-firstName"
              type="text"
              required
              maxLength={32}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-lastName"
              className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
            >
              Last Name *
            </label>
            <input
              id="register-lastName"
              type="text"
              required
              maxLength={32}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="register-email"
              className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
            >
              Email Address *
            </label>
            <input
              id="register-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-phone"
              className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
            >
              Phone Number
            </label>
            <input
              id="register-phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="register-address"
            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
          >
            Delivery Address (Optional)
          </label>
          <input
            id="register-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, Country"
            className="w-full border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
          >
            Password (min. 6 characters) *
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              maxLength={64}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a secure password"
              className="w-full border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 pr-11 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
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

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>CREATING ACCOUNT...</span>
            </>
          ) : (
            <>
              <span>REGISTER</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p className="pt-1 text-center text-xs text-neutral-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold uppercase tracking-wider text-[#111111] underline decoration-[#D70E1D] underline-offset-4 hover:text-[#D70E1D]"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthSplitShell>
  );
}

