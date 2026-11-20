"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowUp, ArrowRight, Youtube, Instagram, Disc3, Twitter } from "lucide-react";
import { subscribeToNewsletter } from "@src/utils/subscribeNewsletter";
import { subscribeNewsletterSchema } from "@src/validations/newsletterManagement";

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
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const validated = await subscribeNewsletterSchema.validate(
        { email, source: "footer" },
        { abortEarly: true }
      );
      await subscribeToNewsletter(validated.email);
      toast.success("Thank you for subscribing to Wiz Ofuasia's newsletter!");
      setEmail("");
    } catch (err) {
      if (err instanceof Error && err.name === "ValidationError") {
        toast.error(err.message);
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:px-8 space-y-12">
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

        {/* Footer Newsletter Form */}
        <div className="mx-auto max-w-lg border-t border-white/10 pt-10 text-center space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D70E1D]">
            Stay Updated
          </p>
          <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
            SUBSCRIBE TO THE NEWSLETTER
          </h3>
          <form
            noValidate
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Newsletter email address"
              className="flex-1 border border-white/20 bg-white/[0.04] px-4 py-3 text-xs text-white placeholder:text-white/45 focus:border-[#D70E1D] focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111] disabled:opacity-60 shrink-0"
            >
              <span>{submitting ? "SENDING..." : "SUBSCRIBE"}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </form>
        </div>

        {/* Centered Copyright */}
        <div className="text-center text-[11px] tracking-wide text-white/55">
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
