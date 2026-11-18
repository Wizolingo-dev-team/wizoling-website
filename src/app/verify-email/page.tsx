import React, { Suspense } from "react";
import type { Metadata } from "next";
import VerifyEmailForm from "@src/components/Sections/Auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify Email",
  description:
    "Verify your email address with your OTP to activate your Wiz Ofuasia (Wizolingo) account.",
  alternates: { canonical: "/verify-email" },
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <VerifyEmailForm />
    </Suspense>
  );
}

