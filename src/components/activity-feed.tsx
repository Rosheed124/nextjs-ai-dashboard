// Server Component — fetches and renders the recent activity feed
import { fetchActivities } from "@/lib/data";
import { cn } from "@/lib/utils";

// Map activity types to their display colors
const typeColors = {
  purchase: "bg-dashboard-success",
  signup: "bg-dashboard-accent",
  review: "bg-dashboard-warning",
  support: "bg-dashboard-danger",
};

// Renders a list of recent user activities
export async function ActivityFeed() {
  // Fetch activity data on the server
  const activities = await fetchActivities();

  return (
    <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
      {/* Section title */}
      <h2 className="mb-4 text-lg font-semibold text-dashboard-text">
        Recent Activity
      </h2>
      {/* List of activity items */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            {/* Colored dot indicating the type of activity */}
            <div
              className={cn(
                "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                typeColors[activity.type]
              )}
            />
            {/* Activity details */}
            <div className="min-w-0 flex-1">
              {/* Who did what */}
              <p className="text-sm text-dashboard-text">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              {/* When it happened */}
              <p className="mt-0.5 text-xs text-dashboard-muted">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
