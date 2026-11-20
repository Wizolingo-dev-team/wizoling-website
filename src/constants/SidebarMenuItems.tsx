"use client";

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  PackageCheck,
  BadgePercent,
  Heart,
  Settings,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { ROUTES } from "@src/constants/routes";

export type SidebarMenuItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const MENU_ITEMS: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: ROUTES.DASHBOARD,
  },
  {
    label: "Order Management",
    icon: PackageCheck,
    href: ROUTES.ORDERS,
  },
  {
    label: "My Deals",
    icon: BadgePercent,
    href: ROUTES.DEALS,
  },
  {
    label: "Wishlist",
    icon: Heart,
    href: ROUTES.WISHLIST,
  },
];

export const BOTTOM_MENU_ITEMS: SidebarMenuItem[] = [
  {
    label: "Back to Store",
    icon: ShoppingBag,
    href: ROUTES.SHOP,
  },
  {
    label: "User Settings",
    icon: Settings,
    href: ROUTES.SETTINGS,
  },
];

export const LOGOUT_ITEM: SidebarMenuItem = {
  label: "Logout",
  icon: LogOut,
  href: ROUTES.LOGOUT,
};

