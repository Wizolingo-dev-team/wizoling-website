import React, { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@src/components/Sections/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Wiz Ofuasia (Wizolingo) account to manage orders, merch deliveries, and digital music downloads.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  );
}

