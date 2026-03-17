"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { useNotifications, useMarkNotificationAsRead } from "../hooks";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "./NotificationDropdown";

export function NotificationBell() {
  const [open, setOpen] = useState(false);

  const { data: notifications, isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();

  const unreadCount =
    notifications?.filter((n) => !n.isRead).length ?? 0;

  return (
    <div className="relative">
      {/* 🔔 Bell Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "relative p-2.5 rounded-2xl transition-all active:scale-95 group",
          open
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
            : "text-slate-500 hover:bg-slate-100"
        )}
      >
        <Bell className={cn("w-5 h-5", !open && "group-hover:rotate-12 transition-transform")} />

        {/* 🔴 Badge */}
        {unreadCount > 0 && (
          <span className={cn(
            "absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-black border-2 transition-colors",
            open
              ? "bg-emerald-500 text-white border-indigo-600"
              : "bg-red-500 text-white border-white"
          )}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* 📩 Dropdown */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <NotificationDropdown
            notifications={notifications ?? []}
            isLoading={isLoading}
            onClose={() => setOpen(false)}
          />
        </>
      )}
    </div>
  );
}