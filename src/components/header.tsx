"use client";
// Client component — handles search, notification dropdown popover, and theme toggle

import { Search, Bell, Moon, Sun, CheckCheck, ExternalLink } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useNotifications } from "./notifications-provider";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// The top header bar with search, interactive notifications, and dark mode toggle
export function Header() {
  const { theme, toggleTheme } = useTheme();
  const {
    notifications,
    unreadCount,
    isOpen,
    toggleDropdown,
    closeDropdown,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  return (
    <header className="flex h-16 items-center justify-between border-b border-dashboard-border bg-dashboard-card px-4 md:px-6 relative">
      {/* Search bar on the left side */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dashboard-muted" />
        <input
          type="text"
          placeholder="Search analytics, reports, users..."
          className="w-full rounded-lg border border-dashboard-border bg-dashboard-bg py-2 pl-10 pr-4 text-sm text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent"
        />
      </div>

      {/* Right side: notification bell and theme toggle */}
      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        {/* Interactive Notification Bell Button */}
        <button
          onClick={toggleDropdown}
          className={cn(
            "relative rounded-lg p-2 text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text transition-colors",
            isOpen && "bg-dashboard-bg text-dashboard-accent"
          )}
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          {/* Dynamic unread dot + count badge: only appears if there are unread items */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-dashboard-danger px-1 text-[10px] font-bold text-white shadow-sm animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Popover Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-xl border border-dashboard-border bg-dashboard-card shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Dropdown Header */}
            <div className="flex items-center justify-between border-b border-dashboard-border p-3.5 bg-dashboard-bg/50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-dashboard-text">Notifications</span>
                {unreadCount > 0 ? (
                  <span className="rounded-full bg-dashboard-accent/10 px-2 py-0.5 text-[11px] font-medium text-dashboard-accent">
                    {unreadCount} new
                  </span>
                ) : (
                  <span className="rounded-full bg-dashboard-success/10 px-2 py-0.5 text-[11px] font-medium text-dashboard-success">
                    All caught up
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs text-dashboard-accent hover:underline"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification Items List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-dashboard-border">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-dashboard-muted">
                  No notifications to display.
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={cn(
                      "p-3.5 transition-colors cursor-pointer hover:bg-dashboard-bg flex items-start gap-3",
                      !item.read ? "bg-dashboard-accent/[0.04]" : "opacity-75"
                    )}
                  >
                    {/* Status Dot */}
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        !item.read ? "bg-dashboard-accent" : "bg-dashboard-border"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className={cn("text-xs font-semibold", !item.read ? "text-dashboard-text" : "text-dashboard-muted")}>
                          {item.title}
                        </p>
                        <span className="text-[10px] text-dashboard-muted shrink-0">{item.timestamp}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-dashboard-muted leading-relaxed line-clamp-2">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Dropdown Footer */}
            <div className="border-t border-dashboard-border p-2.5 bg-dashboard-bg/50 text-center">
              <Link
                href="/notifications"
                onClick={closeDropdown}
                className="flex items-center justify-center gap-1.5 text-xs font-medium text-dashboard-accent hover:underline"
              >
                <span>View all notifications</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Dark mode / Light mode toggle button */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text transition-colors"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}
