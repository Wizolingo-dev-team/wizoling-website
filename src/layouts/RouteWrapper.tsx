import React, { type ReactNode } from "react";
import { cn } from "@src/lib/utils";

type RouteWrapperProps = {
  topLeftSlot?: ReactNode;
  topRightSlot?: ReactNode;
  middleSlot?: ReactNode;
  children?: ReactNode;
};

const baseStyles = {
  top: "flex flex-col items-start gap-4 border border-neutral-200 bg-white p-6 text-[#111111] shadow-sm",
  middle: "grid grid-cols-1 gap-6",
  children: "flex flex-col flex-1 min-h-0 w-full",
};

export default function RouteWrapper({
  topLeftSlot,
  topRightSlot,
  middleSlot,
  children,
}: RouteWrapperProps = {}) {
  const hasSlots = Boolean(topLeftSlot || topRightSlot || middleSlot);

  return (
    <section
      className={cn(
        "flex h-full w-full flex-col gap-6",
        !hasSlots && "gap-0 p-0"
      )}
    >
      {(Boolean(topLeftSlot) || Boolean(topRightSlot)) && (
        <div className="grid shrink-0 grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
          {Boolean(topLeftSlot) && (
            <div className={cn(baseStyles.top, "lg:col-span-3")}>
              {topLeftSlot}
            </div>
          )}
          {Boolean(topRightSlot) && (
            <div className={cn(baseStyles.top, "lg:col-span-1")}>
              {topRightSlot}
            </div>
          )}
        </div>
      )}

      {Boolean(middleSlot) && (
        <div className={cn(baseStyles.middle, "shrink-0")}>{middleSlot}</div>
      )}

      {children && <div className={cn(baseStyles.children)}>{children}</div>}
    </section>
  );
}

