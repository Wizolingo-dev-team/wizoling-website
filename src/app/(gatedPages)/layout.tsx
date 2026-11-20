"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedLayout from "@src/layouts/AuthenticatedLayout";
import DashboardLoader from "@src/components/_atoms/DashboardLoader";
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
    return <DashboardLoader />;
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </SidebarProvider>
  );
}

