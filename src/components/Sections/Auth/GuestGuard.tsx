"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import { ROUTES } from "@src/constants/routes";
import { getAuthToken } from "@src/utils/auth";
import DashboardLoader from "@src/components/_atoms/DashboardLoader";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const { data: user, isLoading } = useGetLoggedInUser();

  const redirectParam = searchParams.get("redirect");
  const destination =
    redirectParam && redirectParam.startsWith("/")
      ? redirectParam
      : ROUTES.DASHBOARD;

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted && Boolean(getAuthToken());

  useEffect(() => {
    if (!mounted || !hasToken) return;
    if (!isLoading && user) {
      router.replace(destination);
    }
  }, [mounted, hasToken, isLoading, user, destination, router]);

  if (hasToken && (isLoading || user)) {
    return <DashboardLoader />;
  }

  return <>{children}</>;
}

