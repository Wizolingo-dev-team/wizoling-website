"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Heart,
  UserCog,
  Download,
  Trash2,
  X,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ActivityLog } from "@src/types/activityManagement";
import {
  useClearAllActivityLogs,
  useDeleteActivityLog,
} from "@src/hooks/activityManagement";
import { cn } from "@src/lib/utils";

const getActionConfig = (type: string) => {
  switch (type) {
    case "LOGIN":
      return {
        Icon: ShieldCheck,
        color: "text-blue-600 bg-blue-50 border-blue-200",
        title: "Secure Login",
      };
    case "ORDER_CREATED":
      return {
        Icon: ShoppingBag,
        color: "text-[#D70E1D] bg-red-50 border-red-200",
        title: "Order Placed",
      };
    case "PAYMENT_COMPLETED":
      return {
        Icon: CreditCard,
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        title: "Payment Confirmed",
      };
    case "DIGITAL_DOWNLOADED":
      return {
        Icon: Download,
        color: "text-purple-600 bg-purple-50 border-purple-200",
        title: "Digital Music Downloaded",
      };
    case "WISHLIST_UPDATED":
      return {
        Icon: Heart,
        color: "text-[#D70E1D] bg-red-50 border-red-200",
        title: "Wishlist Updated",
      };
    case "PROFILE_UPDATED":
    case "PASSWORD_CHANGED":
      return {
        Icon: UserCog,
        color: "text-amber-600 bg-amber-50 border-amber-200",
        title:
          type === "PASSWORD_CHANGED" ? "Password Changed" : "Profile Updated",
      };
    default:
      return {
        Icon: Activity,
        color: "text-neutral-700 bg-neutral-100 border-neutral-200",
        title: "Activity Logged",
      };
  }
};

export default function CustomerFeeds({ logs }: { logs: ActivityLog[] }) {
  const [selectedDate, setSelectedDate] = useState("");
  const { mutate: deleteLog, isPending: isDeleting } = useDeleteActivityLog();
  const { mutate: clearAll, isPending: isClearing } = useClearAllActivityLogs();

  const filteredLogs = useMemo(() => {
    if (!selectedDate) return logs;
    return logs.filter(
      (log) => log.createdAt.slice(0, 10) === selectedDate
    );
  }, [logs, selectedDate]);

  return (
    <div className="flex h-full min-h-[460px] flex-col border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-[#111111] text-[#D70E1D]">
            <Activity className="size-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
              Customer Feeds
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Live Activity Log
            </p>
          </div>
        </div>

        {/* Filter & Clear Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex items-center">
            <Calendar className="pointer-events-none absolute left-3 size-3.5 text-[#D70E1D]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              aria-label="Filter activities by date"
              className="border border-neutral-300 bg-neutral-50 pl-9 pr-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#111111] focus:border-[#D70E1D] focus:outline-none"
            />
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate("")}
                className="ml-2 text-[10px] font-bold uppercase tracking-wider text-[#D70E1D] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {logs.length > 0 && (
            <button
              type="button"
              onClick={() => clearAll()}
              disabled={isClearing}
              className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D70E1D] transition-colors hover:bg-[#D70E1D] hover:text-white disabled:opacity-50"
            >
              <Trash2 className="size-3.5" />
              <span>{isClearing ? "Clearing..." : "Clear All"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => {
            const config = getActionConfig(log.action);
            const ActionIcon = config.Icon;

            return (
              <div key={log._id} className="group relative flex gap-5">
                {index !== filteredLogs.length - 1 && (
                  <div className="absolute bottom-[-24px] left-[21px] top-11 w-[1.5px] bg-neutral-200" />
                )}

                <div
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center border transition-transform duration-300 group-hover:scale-105",
                    config.color
                  )}
                >
                  <ActionIcon className="size-5" />
                </div>

                <div className="flex flex-1 flex-col justify-center pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-display text-xs font-extrabold uppercase tracking-wide text-[#111111] group-hover:text-[#D70E1D]">
                        {config.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-neutral-600">
                        {log.details}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        {formatDistanceToNow(new Date(log.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteLog(log._id)}
                        disabled={isDeleting}
                        title="Delete entry"
                        className="p-1 text-neutral-400 opacity-0 transition-all hover:text-[#D70E1D] group-hover:opacity-100"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="size-1.5 bg-[#D70E1D]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {new Date(log.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Activity className="size-10 text-neutral-300" />
            <p className="font-display text-sm font-bold uppercase tracking-wider text-[#111111]">
              No matching activities
            </p>
            <p className="text-xs text-neutral-500">
              No activity records found for the selected criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

