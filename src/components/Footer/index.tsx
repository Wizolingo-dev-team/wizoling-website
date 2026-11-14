"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Youtube, Instagram, Disc3, Twitter } from "lucide-react";

const FOOTER_SOCIALS = [
  {
    label: "YOUTUBE",
    href: "https://www.youtube.com/@wiz_ofuasia",
    icon: Youtube,
  },
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/wizofuasia/",
    icon: Instagram,
  },
  {
    label: "VEVO",
    href: "https://www.youtube.com/@wizboyyVEVO",
    icon: Disc3,
  },
  {
    label: "THREADS",
    href: "https://www.threads.com/@wizofuasia?xmt=AQG0dH14npSpoXkylf7lOm8yRAV6FXk4Z-dxhFXJBVroc3g",
    icon: Twitter,
  },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:px-8">
        {/* Centered Social Row (Micdrop style) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20">
          {FOOTER_SOCIALS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:text-[#D70E1D]"
              >
                <Icon className="size-4 text-white/90 transition-colors group-hover:text-[#D70E1D]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Centered Copyright */}
        <div className="mt-10 text-center text-[11px] tracking-wide text-white/55">
          &copy; {new Date().getFullYear()} Wiz Ofuasia, All Rights Reserved
        </div>
      </div>

      {/* Functional Scroll-to-Top Arrow on the Left Side */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-20 left-5 lg:bottom-6 lg:left-6 z-40 inline-flex size-10 items-center justify-center bg-[#D70E1D] text-white shadow-lg transition-all hover:bg-[#B50B18] active:scale-95"
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </footer>
  );
}
