import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function OrderListSkeleton() {
  return (
    <div className="w-full border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SkeletonBox className="h-7 w-48" />
        <SkeletonBox className="h-10 w-64" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex h-16 w-full items-center gap-6 border border-neutral-100 bg-neutral-50 px-5"
          >
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-2.5 flex-1" />
            <SkeletonBox className="h-6 w-24" />
            <SkeletonBox className="h-8 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

