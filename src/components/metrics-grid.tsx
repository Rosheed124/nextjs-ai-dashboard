// Server Component — this runs on the server and sends ready HTML to the browser
// No "use client" = server component (the default in Next.js App Router)
import { fetchMetrics } from "@/lib/data";
import { DollarSign, Users, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Map icon names (strings) to actual icon components
const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
};

// This component fetches metrics data on the server, then renders the cards
export async function MetricsGrid() {
  // Fetch data on the server (this await happens server-side, not in the browser)
  const metrics = await fetchMetrics();

  return (
    // Grid layout: 1 column on mobile, 2 on medium screens, 4 on large screens
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        // Look up the right icon component from our map
        const IconComponent = iconMap[metric.icon] || DollarSign;

        return (
          // Each metric card
          <div
            key={metric.id}
            className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Top row: title and icon */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-dashboard-muted">
                {metric.title}
              </p>
              {/* Icon with accent background circle */}
              <div className="rounded-lg bg-dashboard-accent/10 p-2">
                <IconComponent className="h-4 w-4 text-dashboard-accent" />
              </div>
            </div>
            {/* Main value (big number) */}
            <p className="mt-3 text-2xl font-bold text-dashboard-text">
              {metric.value}
            </p>
            {/* Change indicator (green for up, red for down) */}
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                metric.trend === "up"
                  ? "text-dashboard-success"
                  : "text-dashboard-danger"
              )}
            >
              {/* Arrow symbol: up-right for up, down-right for down */}
              {metric.trend === "up" ? "↗" : "↘"} {metric.change} from last month
            </p>
          </div>
        );
      })}
    </div>
  );
}
