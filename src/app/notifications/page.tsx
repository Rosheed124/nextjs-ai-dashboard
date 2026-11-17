// Notifications Page — central stream of alerts and system notices
import { ActivityFeed } from "@/components/activity-feed";
import { Suspense } from "react";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import { Bell, CheckCheck } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
            Notifications
          </h1>
          <p className="mt-1 text-dashboard-muted">
            All system logs, webhook dispatches, and user event notifications.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-dashboard-border bg-dashboard-card px-3 py-1.5 text-xs font-medium text-dashboard-muted hover:text-dashboard-text"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
      </div>

      <Suspense fallback={<ListSkeleton title="Notifications Stream" />}>
        <ActivityFeed />
      </Suspense>
    </div>
  );
}
