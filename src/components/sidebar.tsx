"use client";
// Client component because it needs interactivity (hover, active states)

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
import { cn } from "@/lib/utils";

// Define all the navigation links for the sidebar
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Sparkles, label: "AI Insights", href: "/insights" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

// The sidebar component — shows navigation links on the left side
export function Sidebar() {
  // Track whether the sidebar is collapsed (icons only) or expanded
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        // Base styles: full height, flex column, border on the right
        "flex h-screen flex-col border-r border-dashboard-border bg-dashboard-card transition-all duration-300",
        // Width changes based on collapsed state
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo / Brand area at the top */}
      <div className="flex h-16 items-center justify-between border-b border-dashboard-border px-4">
        {/* Only show the full text when not collapsed */}
        {!collapsed && (
          <span className="text-lg font-bold text-dashboard-accent">
            AI Dashboard
          </span>
        )}
        {/* Button to collapse/expand the sidebar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              // Rotate the arrow when collapsed (points right instead of left)
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation links list */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              // Base styles for each nav link
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              // Highlight the active page with accent color
              item.active
                ? "bg-dashboard-accent/10 text-dashboard-accent"
                : "text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text",
              // Center the icon when sidebar is collapsed
              collapsed && "justify-center px-2"
            )}
          >
            {/* The icon for this nav item */}
            <item.icon className="h-5 w-5 shrink-0" />
            {/* Only show the text label when not collapsed */}
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Bottom section: user profile area */}
      <div className="border-t border-dashboard-border p-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          {/* User avatar circle */}
          <div className="h-8 w-8 shrink-0 rounded-full bg-dashboard-accent/20 flex items-center justify-center">
            <span className="text-xs font-bold text-dashboard-accent">U</span>
          </div>
          {/* User info — hidden when collapsed */}
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-dashboard-text">
                Admin User
              </p>
              <p className="truncate text-xs text-dashboard-muted">
                admin@dashboard.io
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
