// Analytics Page — detailed metrics breakdown and charts
import { Suspense } from "react";
import { RevenueChart } from "@/components/revenue-chart";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { BarChart2, TrendingUp, DollarSign, Target } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          Analytics & Performance
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Deep-dive breakdown of conversion rates, revenue trends, and system performance.
        </p>
      </div>

      {/* Analytics KPI Highlights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Annual Run Rate</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <DollarSign className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">$580,230</p>
          <p className="mt-1 text-sm font-medium text-dashboard-success">↗ +18.4% YoY</p>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Customer LTV</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <Target className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">$2,450</p>
          <p className="mt-1 text-sm font-medium text-dashboard-success">↗ +6.2% QoQ</p>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Net Churn</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <TrendingUp className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">1.12%</p>
          <p className="mt-1 text-sm font-medium text-dashboard-success">↘ -0.3% improvement</p>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Gross Margin</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <BarChart2 className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">78.4%</p>
          <p className="mt-1 text-sm font-medium text-dashboard-success">↗ +2.1%</p>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>
    </div>
  );
}
