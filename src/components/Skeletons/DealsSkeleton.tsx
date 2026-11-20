import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function DealsSkeleton() {
  return (
    <section className="w-full space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex flex-wrap items-center gap-4">
          <SkeletonBox className="h-8 w-64" />
          <SkeletonBox className="h-7 w-36" />
        </div>
        <SkeletonBox className="h-4 w-44" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="border border-neutral-200 bg-white shadow-sm overflow-hidden"
          >
            <SkeletonBox className="aspect-square w-full" />
            <div className="p-4 space-y-3">
              <SkeletonBox className="h-3 w-20" />
              <SkeletonBox className="h-5 w-3/4" />
              <div className="flex items-center justify-between pt-1">
                <SkeletonBox className="h-5 w-16" />
                <SkeletonBox className="h-4 w-20" />
              </div>
              <SkeletonBox className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

