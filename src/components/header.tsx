"use client";
// Client component — needs interactivity for search and theme toggle

import { Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

// The top header bar with search, notifications, and dark mode toggle
export function Header() {
  // Get the current theme and the function to switch it
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-dashboard-border bg-dashboard-card px-4 md:px-6">
      {/* Search bar on the left side */}
      <div className="relative w-full max-w-md">
        {/* Search icon inside the input field */}
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dashboard-muted" />
        {/* The actual search input */}
        <input
          type="text"
          placeholder="Search analytics, reports, users..."
          className="w-full rounded-lg border border-dashboard-border bg-dashboard-bg py-2 pl-10 pr-4 text-sm text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent"
        />
      </div>

      {/* Right side: notification bell and theme toggle */}
      <div className="flex items-center gap-2">
        {/* Notification bell button */}
        <button
          className="relative rounded-lg p-2 text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          {/* Red dot indicating unread notifications */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-dashboard-danger" />
        </button>

        {/* Dark mode / Light mode toggle button */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {/* Show moon icon in light mode, sun icon in dark mode */}
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
