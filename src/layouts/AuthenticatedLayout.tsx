"use client";

import React from "react";
import Sidebar from "@src/components/Sidebar";
import DashboardNavbar from "@src/components/_atoms/DashboardNavbar";
import { useSidebar } from "@src/context/sidebar-context";
import { cn } from "@src/lib/utils";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-neutral-50 text-[#111111]">
      <Sidebar />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          isCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"
        )}
      >
        <DashboardNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

