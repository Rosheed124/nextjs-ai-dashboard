"use client";

// Interactive Analytics Page with time-range filtering, comparison cards, and interactive charts
import { useState, useEffect } from "react";
import { RevenueChartClient } from "@/components/revenue-chart-client";
import { fetchRevenueData } from "@/lib/data";
import { RevenueDataPoint } from "@/lib/types";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { BarChart2, TrendingUp, DollarSign, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  // Timeframe filter state
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "12m">("12m");
  const [chartData, setChartData] = useState<RevenueDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch chart data client-side in this interactive component
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const data = await fetchRevenueData();
      if (isMounted) {
        setChartData(data);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Multiplier simulation for interactive timeframe switching
  const multipliers: Record<string, { arr: string; ltv: string; churn: string; margin: string }> = {
    "7d": { arr: "$11,250", ltv: "$2,480", churn: "0.8%", margin: "81.2%" },
    "30d": { arr: "$48,350", ltv: "$2,460", churn: "1.0%", margin: "79.8%" },
    "90d": { arr: "$144,900", ltv: "$2,450", churn: "1.1%", margin: "79.0%" },
    "12m": { arr: "$580,230", ltv: "$2,450", churn: "1.12%", margin: "78.4%" },
  };

  const current = multipliers[timeframe];

  return (
    <div className="space-y-6">
      {/* Page Title & Timeframe Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
            Analytics & Performance
          </h1>
          <p className="mt-1 text-dashboard-muted">
            Deep-dive breakdown of conversion rates, revenue trends, and system performance.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1 rounded-xl border border-dashboard-border bg-dashboard-card p-1 shadow-xs self-start sm:self-auto">
          {(["7d", "30d", "90d", "12m"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all capitalize",
                timeframe === t
                  ? "bg-dashboard-accent text-white shadow-xs"
                  : "text-dashboard-muted hover:text-dashboard-text hover:bg-dashboard-bg"
              )}
            >
              {t === "12m" ? "12 Months" : t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Highlights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">
              {timeframe === "12m" ? "Annual Run Rate" : "Period Revenue"}
            </p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <DollarSign className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">{current.arr}</p>
          <p className="mt-1 flex items-center text-xs font-medium text-dashboard-success">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +18.4% vs prev period
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Customer LTV</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <Target className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">{current.ltv}</p>
          <p className="mt-1 flex items-center text-xs font-medium text-dashboard-success">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +6.2% QoQ
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Net Churn</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <TrendingUp className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">{current.churn}</p>
          <p className="mt-1 flex items-center text-xs font-medium text-dashboard-success">
            <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" /> -0.3% improvement
          </p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-muted">Gross Margin</p>
            <div className="rounded-lg bg-dashboard-accent/10 p-2">
              <BarChart2 className="h-4 w-4 text-dashboard-accent" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-dashboard-text">{current.margin}</p>
          <p className="mt-1 flex items-center text-xs font-medium text-dashboard-success">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +2.1%
          </p>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-dashboard-text">
            Revenue & Profit
          </h2>
          <p className="text-sm text-dashboard-muted">Monthly overview for 2026</p>
        </div>
        {loading ? (
          <div className="h-[350px] rounded-lg shimmer" />
        ) : (
          <RevenueChartClient data={chartData} />
        )}
      </div>
    </div>
  );
}
