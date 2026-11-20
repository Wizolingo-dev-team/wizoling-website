"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Dashboard breadcrumb" className="flex items-center gap-2.5 text-xs">
      <Link
        href="/"
        className="font-semibold uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#111111]"
      >
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

        return (
          <React.Fragment key={href}>
            <ChevronRight className="size-3.5 text-neutral-400" />
            {isLast ? (
              <span className="font-bold uppercase tracking-[0.18em] text-[#D70E1D]">
                {segment.replace(/-/g, " ")}
              </span>
            ) : (
              <Link
                href={href}
                className="font-semibold uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#111111]"
              >
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

