// Main dashboard page — this is a React Server Component (RSC)
// It runs on the server and streams UI to the browser progressively
import { Suspense } from "react";
import { MetricsGrid } from "@/components/metrics-grid";
import { RevenueChart } from "@/components/revenue-chart";
import { ActivityFeed } from "@/components/activity-feed";
import { AIInsightsPanel } from "@/components/ai-insights-panel";
import { ActiveSessions } from "@/components/active-sessions";
import { MetricsSkeleton } from "@/components/skeletons/metrics-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";

// This page component runs on the server — no "use client" directive
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Real-time analytics powered by AI insights
        </p>
      </div>

      {/* Metrics cards row — wrapped in Suspense for streaming */}
      {/* While data loads, the MetricsSkeleton shows a loading animation */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsGrid />
      </Suspense>

      {/* Two-column layout: chart on the left, activity on the right */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>
        {/* Activity feed takes up 1 column */}
        <div>
          <Suspense fallback={<ListSkeleton title="Recent Activity" />}>
            <ActivityFeed />
          </Suspense>
        </div>
      </div>

      {/* Bottom row: AI insights and active sessions side by side */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ListSkeleton title="AI Insights" />}>
          <AIInsightsPanel />
        </Suspense>
        <Suspense fallback={<ListSkeleton title="Active Sessions" />}>
          <ActiveSessions />
        </Suspense>
      </div>
    </div>
  );
}
