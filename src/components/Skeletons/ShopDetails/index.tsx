import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function ShopDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Gallery Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <SkeletonBox className="aspect-square w-full" />
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((thumb) => (
              <SkeletonBox key={thumb} className="aspect-square w-full" />
            ))}
          </div>
        </div>

        {/* Right Details Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <SkeletonBox className="h-5 w-28" />
          <SkeletonBox className="h-10 w-4/5" />
          <SkeletonBox className="h-7 w-24" />
          <div className="space-y-2 pt-2">
            <SkeletonBox className="h-3.5 w-full" />
            <SkeletonBox className="h-3.5 w-11/12" />
            <SkeletonBox className="h-3.5 w-3/4" />
          </div>
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <SkeletonBox className="h-4 w-24" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((opt) => (
                <SkeletonBox key={opt} className="h-10 w-14" />
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <SkeletonBox className="h-12 w-32" />
            <SkeletonBox className="h-12 flex-1" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="border-t border-neutral-200 pt-10 space-y-4">
        <div className="flex gap-6">
          <SkeletonBox className="h-8 w-32" />
          <SkeletonBox className="h-8 w-32" />
          <SkeletonBox className="h-8 w-32" />
        </div>
        <SkeletonBox className="h-32 w-full" />
      </div>
    </div>
  );
}

