import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function CartSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-8 space-y-4">
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-neutral-200 bg-white p-5"
            >
              <SkeletonBox className="size-24 shrink-0" />
              <div className="flex-1 space-y-2.5 w-full">
                <SkeletonBox className="h-3 w-20" />
                <SkeletonBox className="h-5 w-2/3" />
                <SkeletonBox className="h-4 w-24" />
              </div>
              <SkeletonBox className="h-10 w-28" />
              <SkeletonBox className="h-6 w-20" />
            </div>
          ))}
        </div>

        {/* Cart Summary Skeleton */}
        <div className="lg:col-span-4 border border-neutral-200 bg-white p-6 space-y-5">
          <SkeletonBox className="h-6 w-36" />
          <div className="space-y-3 border-t border-neutral-200 pt-4">
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-6 w-full" />
          </div>
          <SkeletonBox className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

