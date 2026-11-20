import React from "react";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Top 2-Column Widgets: TotalOrders & PendingOrders */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="size-9 rounded-full" />
          </div>
          <SkeletonBox className="h-9 w-24" />
          <div className="flex items-end gap-2 h-20 pt-2">
            {[45, 75, 55, 90, 65, 80, 50].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full bg-neutral-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <SkeletonBox className="h-4 w-40" />
        </div>

        <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <SkeletonBox className="h-4 w-36" />
            <SkeletonBox className="size-9 rounded-full" />
          </div>
          <SkeletonBox className="h-9 w-20" />
          <SkeletonBox className="h-3 w-full rounded-full" />
          <div className="flex justify-between">
            <SkeletonBox className="h-3.5 w-28" />
            <SkeletonBox className="h-3.5 w-16" />
          </div>
        </div>
      </div>

      {/* Middle 2-Column Widgets: DeliveredOrders & CanceledOrders */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2].map((card) => (
          <div
            key={card}
            className="border border-neutral-200 bg-white p-6 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-2.5">
              <SkeletonBox className="h-4 w-36" />
              <SkeletonBox className="h-8 w-16" />
              <SkeletonBox className="h-3 w-28" />
            </div>
            <SkeletonBox className="size-12 rounded-full" />
          </div>
        ))}
      </div>

      {/* Bottom Slot: CustomerFeeds */}
      <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <SkeletonBox className="h-5 w-44" />
          <SkeletonBox className="h-4 w-20" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between gap-4 border border-neutral-100 bg-neutral-50 px-4 py-3"
            >
              <div className="flex items-center gap-3 flex-1">
                <SkeletonBox className="size-8 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <SkeletonBox className="h-3.5 w-2/3" />
                  <SkeletonBox className="h-3 w-1/3" />
                </div>
              </div>
              <SkeletonBox className="h-3 w-20 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
