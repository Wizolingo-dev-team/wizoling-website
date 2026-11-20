import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function WishlistSkeleton() {
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <SkeletonBox className="h-8 w-48" />
          <SkeletonBox className="h-4 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-neutral-200 bg-white shadow-sm overflow-hidden"
          >
            <SkeletonBox className="aspect-[4/3] w-full" />
            <div className="p-5 space-y-3">
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-5 w-4/5" />
              <SkeletonBox className="h-5 w-20" />
              <div className="flex gap-2.5 pt-2">
                <SkeletonBox className="h-10 flex-1" />
                <SkeletonBox className="h-10 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

