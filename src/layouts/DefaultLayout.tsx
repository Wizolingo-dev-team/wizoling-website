"use client";

import React, { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Navbar from "@src/components/Navbar";
import Footer from "@src/components/Footer";
import NewsletterPopup from "@src/components/NewsletterPopup";
import PageBackgroundOverlay from "@src/components/PageBackgroundOverlay";
import {
  getPageBackground,
  isWhiteBackgroundRoute,
} from "@src/constants/pageBackgrounds";
import { isStandaloneShellRoute } from "@src/constants/routes";
import { cn } from "@src/lib/utils";

const NO_FOOTER_ROUTES = ["/biography"];

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandalone = isStandaloneShellRoute(pathname);
  const background = getPageBackground(pathname);
  const isWhiteBg = isWhiteBackgroundRoute(pathname);
  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

  if (isStandalone) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  }

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col overflow-x-clip pb-20 lg:pb-0 selection:bg-[#D70E1D] selection:text-white",
        isWhiteBg ? "bg-white text-[#111111]" : "bg-transparent text-white"
      )}
    >
      {/* Reusable, Dynamic Fixed Background Image Overlay per Route */}
      {background && <PageBackgroundOverlay {...background} />}

      <Navbar />
      <main className="relative z-10 flex-1 w-full">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </main>
      {showFooter && <Footer />}
      <NewsletterPopup />
    </div>
  );
}
