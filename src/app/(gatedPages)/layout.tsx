"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AuthenticatedLayout from "@src/layouts/AuthenticatedLayout";
import { SidebarProvider } from "@src/context/sidebar-context";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import { ROUTES } from "@src/constants/routes";
import { getAuthToken } from "@src/utils/auth";

export default function GatedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { data: user, isLoading, isError } = useGetLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const token = getAuthToken();
    if (!token || (!isLoading && (isError || !user))) {
      router.push(ROUTES.LOGIN);
    }
  }, [mounted, user, isLoading, isError, router]);

  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50">
        <Loader2 className="size-10 animate-spin text-[#D70E1D]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </SidebarProvider>
  );
}

