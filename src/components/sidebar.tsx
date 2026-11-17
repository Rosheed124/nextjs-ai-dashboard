"use client";
// Client component with dynamic route highlighting and responsive collapse state

import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Bell,
  FileText,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNotifications } from "./notifications-provider";

// Define all the navigation links for the sidebar
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Sparkles, label: "AI Insights", href: "/insights" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-dashboard-border bg-dashboard-card transition-all duration-300 select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-dashboard-border px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-dashboard-accent flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              AI
            </div>
            <span className="text-base font-bold text-dashboard-text tracking-tight group-hover:text-dashboard-accent transition-colors">
              AI Dashboard
            </span>
          </Link>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-lg p-1.5 text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text transition-colors",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation links list */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {navItems.map((item) => {
          // Dynamic active check based on actual URL pathname
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-dashboard-accent/10 text-dashboard-accent font-semibold shadow-xs"
                  : "text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-dashboard-accent" : "text-dashboard-muted group-hover:text-dashboard-text"
                )}
              />

              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}

              {/* Notification badge inside sidebar if there are unread items */}
              {item.href === "/notifications" && unreadCount > 0 && (
                <span
                  className={cn(
                    "flex h-4 min-w-4 items-center justify-center rounded-full bg-dashboard-danger text-[10px] font-bold text-white px-1 shadow-xs",
                    collapsed && "absolute top-1.5 right-1.5"
                  )}
                >
                  {unreadCount}
                </span>
              )}

              {/* Hover Tooltip when sidebar is collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 hidden rounded-md bg-dashboard-card border border-dashboard-border px-2 py-1 text-xs font-semibold text-dashboard-text shadow-lg group-hover:block z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-dashboard-border p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg p-1.5 hover:bg-dashboard-bg transition-colors group",
            collapsed && "justify-center"
          )}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-dashboard-accent/20 flex items-center justify-center text-dashboard-accent font-bold text-xs ring-2 ring-transparent group-hover:ring-dashboard-accent/30 transition-all">
            FR
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold text-dashboard-text group-hover:text-dashboard-accent transition-colors">
                Fagbenro Rosheed
              </p>
              <p className="truncate text-[10px] text-dashboard-muted">
                rosheediyiola2004@gmail.com
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
