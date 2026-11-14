"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Home,
  Music,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@src/constants/navigation";
import CustomButton from "@src/components/CustomButton";
import { cn } from "@src/lib/utils";

// Routes that have a dark hero section (#222222 / #333132)
const DARK_HERO_ROUTES = [
  "/",
  "/songs",
  "/events",
  "/gallery",
  "/biography",
  "/news",
  "/podcast",
  "/booking",
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Lock body scroll & handle Escape key for off-canvas mobile drawer
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 120);
  };

  const hasDarkHero = DARK_HERO_ROUTES.includes(pathname);

  // Determine light mode navbar appearance when unscrolled on light routes
  const isLight = !scrolled && !hasDarkHero;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-[#222222]/95 backdrop-blur-md shadow-xl text-white"
            : hasDarkHero
            ? "border-none bg-[#222222] text-white"
            : "border-none bg-background dark:bg-[#222222] text-[#222222] dark:text-white"
        )}
      >
        <div className="container mx-auto flex h-16 lg:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo Placeholder (Navbar/index.tsx) */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span
              className={cn(
                "font-display text-lg sm:text-xl font-bold tracking-wider uppercase transition-colors",
                isLight ? "text-[#222222]" : "text-white"
              )}
            >
              Navbar/Logo
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const hasSub = Boolean(link.subItems && link.subItems.length > 0);
              const isDropdownOpen = openDropdown === link.label;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasSub && handleMouseEnter(link.label)}
                  onMouseLeave={() => hasSub && handleMouseLeave()}
                >
                  {hasSub ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === link.label ? null : link.label
                        )
                      }
                      aria-expanded={isDropdownOpen}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                        isActive
                          ? "text-[#D70E1D]"
                          : isLight
                          ? "text-[#222222]/85 hover:text-[#D70E1D]"
                          : "text-white/90 hover:text-[#D70E1D]"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                        isActive
                          ? "text-[#D70E1D]"
                          : isLight
                          ? "text-[#222222]/85 hover:text-[#D70E1D]"
                          : "text-white/90 hover:text-[#D70E1D]"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown / Mega-menu support */}
                  {hasSub && isDropdownOpen && link.subItems && (
                    <div className="absolute left-0 top-full pt-2 z-50 min-w-[240px]">
                      <div className="rounded-2xl border border-white/10 bg-[#333132] p-2 shadow-2xl">
                        {link.subItems.map((sub) => {
                          const isSubExactActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href + sub.label}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                "flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                                isSubExactActive
                                  ? "bg-[#D70E1D] text-white font-semibold"
                                  : "text-white/90 hover:bg-[#D70E1D] hover:text-white"
                              )}
                            >
                              <span>{sub.label}</span>
                              {sub.hasRightArrow && (
                                <ChevronRight className="size-4 shrink-0 opacity-80" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="/booking">
              <CustomButton
                variant="primary"
                size="sm"
                rounded="full"
                withArrow
                className="px-5 font-bold shadow-md shadow-[#D70E1D]/20"
              >
                Booking
              </CustomButton>
            </Link>
          </div>

          {/* Mobile Top Right Placeholder / Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              className={cn(
                "inline-flex items-center justify-center rounded-xl p-2 transition-colors",
                isLight
                  ? "text-[#222222] hover:bg-black/5"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile App Bottom Tab Bar (< lg only) */}
      <nav
        aria-label="Mobile App Tabs"
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-white/10 bg-[#222222]/95 backdrop-blur-xl text-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.3)]"
      >
        <div className="grid grid-cols-4 h-16 items-center px-2">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors",
              pathname === "/"
                ? "text-[#D70E1D]"
                : "text-white/70 hover:text-white"
            )}
          >
            <Home className="size-5" />
            <span className="text-[11px] font-semibold">Home</span>
          </Link>

          <Link
            href="/songs"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors",
              pathname.startsWith("/songs")
                ? "text-[#D70E1D]"
                : "text-white/70 hover:text-white"
            )}
          >
            <Music className="size-5" />
            <span className="text-[11px] font-semibold">Songs</span>
          </Link>

          <Link
            href="/events"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors",
              pathname.startsWith("/events")
                ? "text-[#D70E1D]"
                : "text-white/70 hover:text-white"
            )}
          >
            <Calendar className="size-5" />
            <span className="text-[11px] font-semibold">Events</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open full navigation menu"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors",
              isOpen ? "text-[#D70E1D]" : "text-white/70 hover:text-white"
            )}
          >
            <Menu className="size-5" />
            <span className="text-[11px] font-semibold">Menu</span>
          </button>
        </div>
      </nav>

      {/* Off-Canvas Mobile Drawer (< lg) with smooth scrolling & Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              aria-label="Mobile Navigation Drawer"
              className="fixed right-0 top-0 bottom-0 z-[71] flex w-full max-w-sm flex-col bg-[#222222] text-white shadow-2xl border-l border-white/10"
            >
              {/* Drawer Header */}
              <div className="flex h-16 items-center justify-between px-5 border-b border-white/10 shrink-0">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-display text-lg font-bold tracking-wider uppercase text-white"
                >
                  Navbar/Logo
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-xl p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Scrollable Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
                {NAV_LINKS.map((link) => {
                  const hasSub = Boolean(link.subItems && link.subItems.length > 0);
                  const isExpanded = mobileExpanded === link.label;

                  if (!hasSub) {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-[#D70E1D]/15 text-[#D70E1D] font-bold"
                            : "text-white/90 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="size-4 opacity-50" />
                      </Link>
                    );
                  }

                  return (
                    <div key={link.label} className="space-y-1">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded((prev) =>
                            prev === link.label ? null : link.label
                          )
                        }
                        aria-expanded={isExpanded}
                        className={cn(
                          "w-full flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isExpanded
                            ? "bg-white/5 text-[#D70E1D] font-bold"
                            : "text-white/90 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>

                      {isExpanded && link.subItems && (
                        <div className="ml-4 pl-3 border-l border-white/15 space-y-1 py-1">
                          {link.subItems.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href + sub.label}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                                  isSubActive
                                    ? "bg-[#D70E1D] text-white font-semibold"
                                    : "text-white/75 hover:bg-white/10 hover:text-white"
                                )}
                              >
                                <span>{sub.label}</span>
                                {sub.hasRightArrow && (
                                  <ChevronRight className="size-3.5 opacity-70" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="p-5 border-t border-white/10 space-y-3 bg-[#1A1A1A] shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <CustomButton
                    variant="primary"
                    size="lg"
                    rounded="xl"
                    withArrow
                    className="w-full justify-center font-bold"
                  >
                    Booking
                  </CustomButton>
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

