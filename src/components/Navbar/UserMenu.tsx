"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  LogOut,
  LayoutDashboard,
  PackageCheck,
  BadgePercent,
  Settings,
} from "lucide-react";
import {
  useGetLoggedInUser,
  useLogoutCustomer,
} from "@src/hooks/authManagement";
import { getAuthToken } from "@src/utils/auth";

export default function UserMenu() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useGetLoggedInUser();
  const logout = useLogoutCustomer();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const hasToken = mounted && Boolean(getAuthToken());

  if (!mounted || !hasToken || !user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 border border-white/25 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
      >
        <UserIcon className="size-3.5" />
        <span>LOGIN</span>
      </Link>
    );
  }

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() ||
    "W";
  const avatarUrl = user.avatar?.url;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Open account menu"
        className="flex items-center gap-2 rounded-full border border-white/25 p-0.5 transition-colors hover:border-[#D70E1D]"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-8 items-center justify-center rounded-full bg-[#D70E1D] text-[11px] font-bold text-white">
            {initials}
          </span>
        )}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-56 border border-white/15 bg-[#141414]/95 p-2 shadow-2xl backdrop-blur-md">
          <div className="border-b border-white/10 px-3 py-2.5">
            <p className="truncate font-display text-xs font-bold uppercase tracking-wide text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-[11px] text-white/55">{user.email}</p>
          </div>

          <div className="py-1.5 space-y-0.5">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <LayoutDashboard className="size-3.5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/order-management"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <PackageCheck className="size-3.5" />
              <span>Orders &amp; Downloads</span>
            </Link>
            <Link
              href="/my-deals"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <BadgePercent className="size-3.5" />
              <span>My Deals</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <Heart className="size-3.5" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <ShoppingBag className="size-3.5" />
              <span>My Cart</span>
            </Link>
            <Link
              href="/user-settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <Settings className="size-3.5" />
              <span>User Settings</span>
            </Link>
          </div>

          <div className="border-t border-white/10 pt-1.5">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs uppercase tracking-[0.16em] text-[#D70E1D] transition-colors hover:bg-[#D70E1D] hover:text-white"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

