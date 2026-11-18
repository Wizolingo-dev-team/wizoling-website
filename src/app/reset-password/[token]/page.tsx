import React, { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@src/components/Sections/Auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your Wiz Ofuasia (Wizolingo) account.",
};

export default async function ResetPasswordTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResetPasswordForm tokenFromPath={token} />
    </Suspense>
  );
}

