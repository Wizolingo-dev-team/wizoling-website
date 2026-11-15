"use client";

import React, { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Navbar from "@src/components/Navbar";
import Footer from "@src/components/Footer";
import PageBackgroundOverlay from "@src/components/PageBackgroundOverlay";
import { getPageBackground } from "@src/constants/pageBackgrounds";

const NO_FOOTER_ROUTES = ["/biography"];

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const background = getPageBackground(pathname);
  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-transparent text-white pb-20 lg:pb-0 selection:bg-[#D70E1D] selection:text-white">
      {/* Reusable, Dynamic Fixed Background Image Overlay per Route */}
      {background && <PageBackgroundOverlay {...background} />}

      <Navbar />
      <main className="relative z-10 flex-1 w-full">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
