// Server Component — renders AI-powered insights
import { fetchInsights } from "@/lib/data";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Map priority levels to their visual styles
const priorityStyles = {
  high: "border-l-dashboard-danger bg-dashboard-danger/5",
  medium: "border-l-dashboard-warning bg-dashboard-warning/5",
  low: "border-l-dashboard-success bg-dashboard-success/5",
};

// Badge colors for the priority labels
const priorityBadge = {
  high: "bg-dashboard-danger/10 text-dashboard-danger",
  medium: "bg-dashboard-warning/10 text-dashboard-warning",
  low: "bg-dashboard-success/10 text-dashboard-success",
};

// Displays AI-generated insights about the business
export async function AIInsightsPanel() {
  // Fetch AI insights from the server
  const insights = await fetchInsights();

  return (
    <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
      {/* Section header with sparkle icon */}
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-dashboard-accent" />
        <h2 className="text-lg font-semibold text-dashboard-text">
          AI Insights
        </h2>
      </div>
      {/* List of insight cards */}
      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              // Left border color indicates priority, subtle background tint
              "rounded-lg border-l-4 p-4",
              priorityStyles[insight.priority]
            )}
          >
            {/* Insight header: title and priority badge */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-dashboard-text">
                {insight.title}
              </h3>
              {/* Priority badge (e.g., "HIGH", "MEDIUM") */}
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                  priorityBadge[insight.priority]
                )}
              >
                {insight.priority.toUpperCase()}
              </span>
            </div>
            {/* Detailed description of the insight */}
            <p className="mt-1.5 text-sm leading-relaxed text-dashboard-muted">
              {insight.description}
            </p>
            {/* Category tag */}
            <span className="mt-2 inline-block rounded-md bg-dashboard-bg px-2 py-0.5 text-xs text-dashboard-muted">
              {insight.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
