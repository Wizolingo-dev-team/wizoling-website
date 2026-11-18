import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Skeleton */}
        <div className="lg:col-span-7 border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
          <SkeletonBox className="h-6 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-full" />
          </div>
          <SkeletonBox className="h-11 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-full" />
          </div>
          <SkeletonBox className="h-24 w-full" />
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-5 border border-neutral-200 bg-white p-6 sm:p-8 space-y-5">
          <SkeletonBox className="h-6 w-40" />
          {[1, 2].map((item) => (
            <div key={item} className="flex justify-between gap-4 py-2">
              <SkeletonBox className="h-4 w-2/3" />
              <SkeletonBox className="h-4 w-16" />
            </div>
          ))}
          <div className="border-t border-neutral-200 pt-4 space-y-3">
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-6 w-full" />
          </div>
          <SkeletonBox className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

