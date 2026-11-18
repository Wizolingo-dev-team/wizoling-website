import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function EventsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/15 pb-4">
        <SkeletonBox className="h-8 w-56 bg-white/10" />
        <div className="flex gap-2">
          <SkeletonBox className="size-10 bg-white/10" />
          <SkeletonBox className="size-10 bg-white/10" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((card) => (
          <div key={card} className="border border-white/10 bg-white/[0.03]">
            <SkeletonBox className="aspect-[3/4] w-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

