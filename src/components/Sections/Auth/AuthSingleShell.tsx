import React, { type ReactNode } from "react";
import Breadcrumb from "@src/components/Breadcrumb";

type AuthSingleShellProps = {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthSingleShell({
  breadcrumbLabel,
  eyebrow,
  title,
  subtitle,
  children,
}: AuthSingleShellProps) {
  return (
    <div className="pt-24 pb-20 sm:pt-28 lg:pt-36 bg-white text-[#111111]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-10">
        <Breadcrumb
          variant="light"
          items={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]}
        />

        <div className="mx-auto max-w-lg border border-neutral-200 bg-white p-6 sm:p-10 shadow-xl space-y-7">
          <div className="space-y-2 border-b border-neutral-200 pb-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D70E1D]">
              {eyebrow}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#111111]">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
