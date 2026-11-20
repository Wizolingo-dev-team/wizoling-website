"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@src/lib/utils";
import { useSidebar } from "@src/context/sidebar-context";
import { useLogoutCustomer } from "@src/hooks/authManagement";
import {
  MENU_ITEMS,
  BOTTOM_MENU_ITEMS,
  LOGOUT_ITEM,
  type SidebarMenuItem,
} from "@src/constants/SidebarMenuItems";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@src/components/ui/sheet";

type NavItemProps = {
  item: SidebarMenuItem;
  isCollapsed: boolean;
  isActive: boolean;
  isLogout?: boolean;
  onClick?: () => void;
};

const NavItem = ({
  item,
  isCollapsed,
  isActive,
  isLogout,
  onClick,
}: NavItemProps) => {
  const Icon = item.icon;

  const itemStyles = cn(
    "group flex w-full cursor-pointer items-center gap-3.5 border px-4 py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200",
    isActive && !isLogout
      ? "border-[#D70E1D] bg-[#D70E1D] text-white shadow-md"
      : "border-transparent text-white/75 hover:border-white/15 hover:bg-white/[0.06] hover:text-white",
    isCollapsed && "justify-center px-2",
    isLogout &&
      "mt-4 border-red-500/30 bg-red-500/10 text-red-400 hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
  );

  const inner = (
    <div onClick={onClick} title={isCollapsed ? item.label : undefined} className={itemStyles}>
      <Icon className="size-5 shrink-0" />
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </div>
  );

  if (isLogout) {
    return inner;
  }

  return <Link href={item.href}>{inner}</Link>;
};

export default function Sidebar() {
  const { isCollapsed, isMobile, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const logout = useLogoutCustomer();

  const renderSidebarBody = (collapsed: boolean, onNavigate?: () => void) => (
    <div className="flex h-full flex-col bg-[#111111] text-white border-r border-white/10">
      {/* Brand Header */}
      <div
        className={cn(
          "flex h-20 items-center border-b border-white/10 transition-all duration-300",
          collapsed ? "justify-center px-2" : "px-6"
        )}
      >
        <Link
          href="/"
          onClick={onNavigate}
          className="font-display text-lg font-extrabold uppercase tracking-tight text-white transition-colors hover:text-[#D70E1D]"
        >
          {collapsed ? "WIZ" : "Wiz Ofuasia"}
        </Link>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        {!collapsed && (
          <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
            Member Portal
          </p>
        )}
        <div className="space-y-2.5">
          {MENU_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isCollapsed={collapsed}
              isActive={
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/dashboard")
              }
              onClick={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* Bottom Menu & Logout */}
      <div
        className={cn(
          "mt-auto space-y-2 border-t border-white/10 bg-[#0D0D0D] p-4",
          collapsed && "px-2"
        )}
      >
        {!collapsed && (
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
            Account &amp; Store
          </p>
        )}
        {BOTTOM_MENU_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isCollapsed={collapsed}
            isActive={pathname === item.href}
            onClick={onNavigate}
          />
        ))}
        <NavItem
          item={LOGOUT_ITEM}
          isCollapsed={collapsed}
          isActive={false}
          isLogout
          onClick={() => {
            onNavigate?.();
            logout();
          }}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={!isCollapsed} onOpenChange={toggleSidebar}>
        <SheetContent
          side="left"
          className="w-[280px] border-r border-white/15 bg-[#111111] p-0 text-white"
        >
          <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate your Wizolingo account dashboard
          </SheetDescription>
          {renderSidebarBody(false, toggleSidebar)}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden lg:block transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {renderSidebarBody(isCollapsed)}
    </aside>
  );
}

