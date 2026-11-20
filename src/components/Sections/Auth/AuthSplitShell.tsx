import React, { type ReactNode } from "react";
import Image from "next/image";
import Breadcrumb from "@src/components/Breadcrumb";
import GuestGuard from "@src/components/Sections/Auth/GuestGuard";

type AuthSplitShellProps = {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
  children: ReactNode;
};

export default function AuthSplitShell({
  breadcrumbLabel,
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  quote,
  children,
}: AuthSplitShellProps) {
  return (
    <GuestGuard>
      <div className="pt-24 pb-20 sm:pt-28 lg:pt-36 bg-white text-[#111111]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-8">
        <Breadcrumb
          variant="light"
          items={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-200 bg-white shadow-xl overflow-hidden">
          {/* Left Editorial Image */}
          <div className="relative hidden lg:block lg:col-span-6 min-h-[580px] bg-[#141414]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <span className="inline-block bg-[#D70E1D] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                WIZOLINGO OFFICIAL
              </span>
              <p className="font-display text-xl font-extrabold uppercase tracking-wide leading-snug text-white">
                {quote}
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-7 bg-white">
            <div className="space-y-2 border-b border-neutral-200 pb-5">
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
    </div>
    </GuestGuard>
  );
}
