import React, { Suspense } from "react";
import type { Metadata } from "next";
import ForgotPasswordForm from "@src/components/Sections/Auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Request a password reset link for your Wiz Ofuasia (Wizolingo) account.",
  alternates: { canonical: "/forgot-password" },
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ForgotPasswordForm />
    </Suspense>
  );
}

