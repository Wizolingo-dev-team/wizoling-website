import React, { Suspense } from "react";
import type { Metadata } from "next";
import RegisterForm from "@src/components/Sections/Auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Register for a Wiz Ofuasia (Wizolingo) account to shop official merchandise and download studio releases.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RegisterForm />
    </Suspense>
  );
}

