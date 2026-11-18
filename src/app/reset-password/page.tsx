import React, { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@src/components/Sections/Auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your Wiz Ofuasia (Wizolingo) account.",
  alternates: { canonical: "/reset-password" },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

