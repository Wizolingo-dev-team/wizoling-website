import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function UserSettingsSkeleton() {
  return (
    <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
      {/* Left: Avatar Card Skeleton */}
      <div className="flex w-full flex-col items-center gap-4 border border-neutral-200 bg-white p-6 shadow-sm lg:w-64">
        <SkeletonBox className="size-32 rounded-full" />
        <SkeletonBox className="h-5 w-36" />
        <SkeletonBox className="h-3.5 w-44" />
        <SkeletonBox className="h-9 w-full mt-2" />
      </div>

      {/* Right: Profile & Password Forms Skeleton */}
      <div className="flex-1 w-full border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm space-y-10">
        {/* Basic Info Section */}
        <div className="flex flex-col gap-8 border-b border-neutral-200 pb-8 md:flex-row">
          <div className="w-full space-y-2 md:w-1/3">
            <SkeletonBox className="h-6 w-40" />
            <SkeletonBox className="h-4 w-52" />
          </div>
          <div className="w-full space-y-4 md:max-w-[550px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonBox className="h-11 w-full" />
              <SkeletonBox className="h-11 w-full" />
            </div>
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-24 w-full" />
            <SkeletonBox className="h-11 w-36" />
          </div>
        </div>

        {/* Change Password Section */}
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full space-y-2 md:w-1/3">
            <SkeletonBox className="h-6 w-40" />
            <SkeletonBox className="h-4 w-52" />
          </div>
          <div className="w-full space-y-4 md:max-w-[550px]">
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-full" />
            <SkeletonBox className="h-11 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

