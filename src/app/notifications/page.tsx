"use client";

// Notifications Page — displays list of all notification events with read/unread interactive toggles
import { useNotifications } from "@/components/notifications-provider";
import { Bell, CheckCheck, CheckCircle2, ShieldAlert, ShoppingCart, UserPlus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();

  // Map notification type to icon
  const getIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-dashboard-success" />;
      case "signup":
        return <UserPlus className="h-4 w-4 text-dashboard-accent" />;
      case "anomaly":
        return <ShieldAlert className="h-4 w-4 text-dashboard-danger" />;
      case "support":
        return <HelpCircle className="h-4 w-4 text-dashboard-warning" />;
      default:
        return <Bell className="h-4 w-4 text-dashboard-accent" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
            Notifications
          </h1>
          <p className="mt-1 text-dashboard-muted">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`
              : "All caught up! Zero unread notifications."}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 rounded-lg border border-dashboard-border bg-dashboard-card px-3.5 py-2 text-xs font-semibold text-dashboard-accent hover:bg-dashboard-bg transition-colors shadow-sm"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="rounded-xl border border-dashboard-border bg-dashboard-card overflow-hidden shadow-sm">
        <div className="divide-y divide-dashboard-border">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={cn(
                "p-4 flex items-start justify-between gap-4 transition-colors cursor-pointer hover:bg-dashboard-bg",
                !item.read ? "bg-dashboard-accent/[0.04]" : "opacity-80"
              )}
            >
              <div className="flex items-start gap-3.5">
                <div className="rounded-lg bg-dashboard-bg p-2 mt-0.5 border border-dashboard-border">
                  {getIcon(item.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={cn("text-sm font-semibold", !item.read ? "text-dashboard-text" : "text-dashboard-muted")}>
                      {item.title}
                    </p>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-dashboard-danger animate-pulse" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-dashboard-muted leading-relaxed">
                    {item.message}
                  </p>
                  <p className="mt-1.5 text-[10px] text-dashboard-muted font-mono">
                    {item.timestamp}
                  </p>
                </div>
              </div>

              {!item.read ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(item.id);
                  }}
                  className="rounded-lg border border-dashboard-border bg-dashboard-bg px-2.5 py-1 text-[11px] font-medium text-dashboard-muted hover:text-dashboard-text hover:border-dashboard-accent transition-colors shrink-0"
                >
                  Mark read
                </button>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-dashboard-success font-medium shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Read
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
