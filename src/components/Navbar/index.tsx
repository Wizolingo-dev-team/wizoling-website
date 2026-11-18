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
  Youtube,
  Radio,
  Disc3,
  Instagram,
  Film,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@src/constants/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@src/components/ui/sheet";
import BookingModal from "@src/components/BookingModal";
import CartDrawer from "@src/components/CartDrawer";
import UserMenu from "@src/components/Navbar/UserMenu";
import { isWhiteBackgroundRoute } from "@src/constants/pageBackgrounds";
import { cn } from "@src/lib/utils";

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@wiz_ofuasia",
    icon: Youtube,
    external: true,
  },
  {
    label: "wizboyyVEVO",
    href: "https://www.youtube.com/@wizboyyVEVO",
    icon: Radio,
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/wizofuasia/",
    icon: Instagram,
    external: true,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@wizofuasia?xmt=AQG0dH14npSpoXkylf7lOm8yRAV6FXk4Z-dxhFXJBVroc3g",
    icon: Disc3,
    external: true,
  },
  { label: "Songs", href: "/songs", icon: Music, external: false },
  { label: "Videos", href: "/videos", icon: Film, external: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const isWhiteBg = isWhiteBackgroundRoute(pathname);
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

  return (
    <>
      {/* Fixed Navbar (Micdrop Band-Home desktop layout + Wiz Ofuasia brand colors) */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300",
          scrolled || isWhiteBg
            ? "border-b border-white/10 bg-[#141414]/95 backdrop-blur-md shadow-xl text-white"
            : "border-none bg-transparent text-white"
        )}
      >
        <div className="mx-auto flex h-16 lg:h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Left: Brand Wordmark */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#D70E1D]">
              Wiz Ofuasia
            </span>
          </Link>

          {/* Center: Desktop Uppercase Navigation Links (Micdrop layout) */}
          <nav
            aria-label="Desktop Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
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
                        "relative flex items-center gap-1 py-1 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                        isActive
                          ? "text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#D70E1D]"
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform duration-200",
                          isDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "relative py-1 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                        isActive
                          ? "text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#D70E1D]"
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown support */}
                  {hasSub && isDropdownOpen && link.subItems && (
                    <div className="absolute left-0 top-full pt-3 z-50 min-w-[220px]">
                      <div className="border border-white/10 bg-[#222222]/95 backdrop-blur-md p-2 shadow-2xl">
                        {link.subItems.map((sub) => {
                          const isSubExactActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href + sub.label}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                "flex items-center justify-between gap-4 px-4 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors",
                                isSubExactActive
                                  ? "bg-[#D70E1D] text-white"
                                  : "text-white/85 hover:bg-[#D70E1D] hover:text-white"
                              )}
                            >
                              <span>{sub.label}</span>
                              {sub.hasRightArrow && (
                                <ChevronRight className="size-3.5 shrink-0 opacity-80" />
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

          {/* Right: Cart Drawer + Login/Avatar -> + Hamburger Slide-In Sheet when scrolled */}
          <div className="hidden lg:flex items-center justify-end gap-4 min-w-[160px] shrink-0">
            <CartDrawer />
            <UserMenu />
            {scrolled && (
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open side info panel"
                    className="group flex flex-col items-end justify-center gap-[6px] p-2 focus:outline-none"
                  >
                    <span className="block h-[1.5px] w-7 bg-white transition-colors group-hover:bg-[#D70E1D]" />
                    <span className="block h-[1.5px] w-7 bg-white transition-colors group-hover:bg-[#D70E1D]" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex flex-col items-center justify-center text-center bg-[#0D0D0D] border-l border-white/10"
                >
                  <div className="space-y-6">
                    <SheetTitle className="font-display text-2xl font-extrabold tracking-tight text-white">
                      Wiz Ofuasia
                    </SheetTitle>
                    <SheetDescription className="space-y-1.5 text-xs leading-relaxed text-white/75">
                      <span className="block">Management &amp; Bookings</span>
                      <a
                        href="mailto:wizofuasia@gmail.com"
                        className="block transition-colors hover:text-[#D70E1D]"
                      >
                        wizofuasia@gmail.com
                      </a>
                    </SheetDescription>

                    <div className="flex items-center justify-center gap-4 pt-2">
                      {SOCIAL_LINKS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            aria-label={item.label}
                            title={item.label}
                            className="text-white/75 hover:text-[#D70E1D] transition-colors"
                          >
                            <Icon className="size-4" />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-4">
                      <BookingModal
                        trigger={
                          <button
                            type="button"
                            className="inline-flex items-center justify-center bg-[#D70E1D] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#B50B18]"
                          >
                            BOOKING INQUIRY
                          </button>
                        }
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Mobile Top Right: Cart Drawer, User/Login & Bookings Modal Trigger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <CartDrawer />
            <UserMenu />
            <BookingModal
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-[#D70E1D] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#B50B18]"
                >
                  Bookings
                </button>
              }
            />
          </div>
        </div>
      </header>

      {/* Mobile App Bottom Tab Bar (< lg only — maintained from sparkwebsite) */}
      <nav
        aria-label="Mobile App Tabs"
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-white/10 bg-[#222222]/95 backdrop-blur-xl text-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.45)]"
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

      {/* Off-Canvas Mobile Drawer (< lg — maintained from sparkwebsite) */}
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
                  className="font-display text-lg font-bold tracking-tight text-white"
                >
                  Wiz Ofuasia
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
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
