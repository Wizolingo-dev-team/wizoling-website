"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PanelLeft,
  Bell,
  BellOff,
  Check,
  Trash2,
} from "lucide-react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useSidebar } from "@src/context/sidebar-context";
import DashboardBreadcrumbs from "@src/components/_atoms/DashboardBreadcrumbs";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import {
  useGetAllNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  useDeleteNotification,
} from "@src/hooks/notificationManagement";
import { getGreeting } from "@src/utils/getGreeting";
import env from "@src/env";
import { cn } from "@src/lib/utils";

export default function DashboardNavbar() {
  const { toggleSidebar } = useSidebar();
  const { data: user } = useGetLoggedInUser();
  const { data: notifications = [] } = useGetAllNotifications();
  const queryClient = useQueryClient();

  const { mutate: markAllRead } = useMarkAllNotificationsAsRead();
  const { mutate: markOneRead } = useMarkNotificationAsRead();
  const { mutate: deleteNotify } = useDeleteNotification();

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const greeting = getGreeting();
  const GreetingIcon = greeting.Icon;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const socketUrl = env.NEXT_PUBLIC_ADMIN_API_BASE_URL.replace(/\/api\/?$/, "");
    const socket = io(socketUrl, {
      transports: ["websocket"],
    });

    socket.emit("join", user._id);

    socket.on("new-notification", () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, queryClient]);

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "W";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur-md lg:px-8">
      {/* Left: Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle dashboard sidebar"
          className="border border-neutral-200 bg-neutral-50 p-2.5 text-[#111111] transition-colors hover:border-[#D70E1D] hover:text-[#D70E1D]"
        >
          <PanelLeft className="size-4" />
        </button>
        <div className="hidden sm:block">
          <DashboardBreadcrumbs />
        </div>
      </div>

      {/* Center: Dynamic Greeting */}
      <div className="hidden lg:flex items-center gap-2 border border-neutral-200 bg-neutral-50 px-4 py-2">
        <GreetingIcon className="size-3.5 text-[#D70E1D]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#111111]">
          {greeting.text}, {user?.firstName}
        </span>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4">
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((prev) => !prev)}
            aria-label="Open notifications"
            className="relative border border-neutral-200 bg-neutral-50 p-2.5 text-[#111111] transition-colors hover:border-[#D70E1D] hover:text-[#D70E1D]"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[#D70E1D] px-1 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 border border-neutral-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#111111]">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => markAllRead()}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#D70E1D] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={cn(
                        "group flex items-start justify-between gap-3 p-4 transition-colors hover:bg-neutral-50",
                        !n.read && "bg-red-50/40"
                      )}
                    >
                      <Link
                        href={n.onClick || "/dashboard"}
                        onClick={() => {
                          if (!n.read) markOneRead(n._id);
                          setNotifOpen(false);
                        }}
                        className="min-w-0 flex-1 space-y-1"
                      >
                        <p className="text-xs font-bold text-[#111111]">
                          {n.title}
                        </p>
                        <p className="text-[11px] leading-relaxed text-neutral-600">
                          {n.description}
                        </p>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </Link>

                      <div className="flex flex-col gap-1.5">
                        {!n.read && (
                          <button
                            type="button"
                            onClick={() => markOneRead(n._id)}
                            title="Mark as read"
                            className="border border-neutral-200 bg-white p-1 text-emerald-600 hover:bg-emerald-50"
                          >
                            <Check className="size-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteNotify(n._id)}
                          title="Delete notification"
                          className="border border-neutral-200 bg-white p-1 text-[#D70E1D] hover:bg-red-50"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-36 flex-col items-center justify-center text-center text-neutral-400">
                    <BellOff className="mb-2 size-6" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                      No Notifications
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Link
          href="/user-settings"
          className="flex items-center gap-3 border-l border-neutral-200 pl-4"
        >
          <div className="hidden text-right md:block">
            <p className="font-display text-xs font-bold uppercase tracking-wide text-[#111111]">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D70E1D]">
              {user?.role} Member
            </p>
          </div>
          {user?.avatar?.url ? (
            <Image
              src={user.avatar.url}
              alt={user.firstName}
              width={40}
              height={40}
              className="size-10 rounded-full border border-neutral-300 object-cover"
            />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-[#D70E1D] text-xs font-bold text-white">
              {initials}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

