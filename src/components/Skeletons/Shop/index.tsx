import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function ShopSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-3 space-y-6 border border-neutral-200 bg-white p-6">
          <SkeletonBox className="h-10 w-full" />
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-3 border-t border-neutral-200 pt-5">
              <SkeletonBox className="h-4 w-28" />
              <div className="space-y-2">
                <SkeletonBox className="h-3.5 w-full" />
                <SkeletonBox className="h-3.5 w-4/5" />
                <SkeletonBox className="h-3.5 w-3/5" />
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-neutral-200 bg-white p-4">
            <SkeletonBox className="h-4 w-40" />
            <SkeletonBox className="h-9 w-48" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="border border-neutral-200 bg-white overflow-hidden"
              >
                <SkeletonBox className="aspect-[4/5] w-full" />
                <div className="p-5 space-y-3">
                  <SkeletonBox className="h-3 w-20" />
                  <SkeletonBox className="h-5 w-4/5" />
                  <div className="flex items-center justify-between pt-2">
                    <SkeletonBox className="h-4 w-16" />
                    <SkeletonBox className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

