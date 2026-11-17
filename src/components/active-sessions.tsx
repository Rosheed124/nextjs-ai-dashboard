// Server Component — shows currently active user sessions
import { fetchActiveSessions } from "@/lib/data";
import { Globe } from "lucide-react";

// Displays a table of users currently on the platform
export async function ActiveSessions() {
  // Fetch session data on the server
  const sessions = await fetchActiveSessions();

  return (
    <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
      {/* Section header with globe icon and live count */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-dashboard-accent" />
          <h2 className="text-lg font-semibold text-dashboard-text">
            Active Sessions
          </h2>
        </div>
        {/* Green pulsing dot = live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            {/* Animated ping effect behind the dot */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dashboard-success opacity-75" />
            {/* Solid green dot on top */}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-dashboard-success" />
          </span>
          <span className="text-sm font-medium text-dashboard-success">
            {sessions.length} online
          </span>
        </div>
      </div>

      {/* Table of active sessions */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-lg bg-dashboard-bg p-3"
          >
            {/* Left side: user info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-dashboard-text">
                {session.name}
              </p>
              <p className="truncate text-xs text-dashboard-muted">
                {session.email}
              </p>
            </div>
            {/* Middle: what page they're on */}
            <div className="hidden text-center sm:block">
              <p className="text-xs text-dashboard-muted">Page</p>
              <p className="text-sm font-mono text-dashboard-text">
                {session.currentPage}
              </p>
            </div>
            {/* Right side: session duration and country */}
            <div className="text-right">
              <p className="text-sm font-medium text-dashboard-text">
                {session.duration}
              </p>
              <p className="text-xs text-dashboard-muted">{session.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
