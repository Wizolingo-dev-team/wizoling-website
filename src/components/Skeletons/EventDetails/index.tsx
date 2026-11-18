import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function EventDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 space-y-10">
      <SkeletonBox className="h-12 w-72 bg-white/10" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <SkeletonBox className="lg:col-span-4 aspect-[3/4] w-full bg-white/10" />
        <SkeletonBox className="lg:col-span-8 min-h-[380px] w-full bg-white/10" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-3">
          <SkeletonBox className="h-6 w-32 bg-white/10" />
          <SkeletonBox className="h-4 w-full bg-white/10" />
          <SkeletonBox className="h-4 w-4/5 bg-white/10" />
          <SkeletonBox className="h-11 w-40 bg-white/10" />
        </div>
        <div className="lg:col-span-8 space-y-3">
          <SkeletonBox className="h-6 w-48 bg-white/10" />
          <SkeletonBox className="h-4 w-full bg-white/10" />
          <SkeletonBox className="h-4 w-full bg-white/10" />
          <SkeletonBox className="h-4 w-3/4 bg-white/10" />
        </div>
      </div>
    </div>
  );
}

