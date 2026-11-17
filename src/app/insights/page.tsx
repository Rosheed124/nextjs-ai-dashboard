"use client";

// AI Insights Page with interactive filter tabs, severity sorting, and simulated instant AI re-analysis trigger
import { useState } from "react";
import { Sparkles, BrainCircuit, ShieldAlert, Cpu, RefreshCw, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardData {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "Revenue" | "Retention" | "Performance" | "Growth";
  impact: string;
  actionLabel: string;
}

const initialInsights: InsightCardData[] = [
  {
    id: "insight-1",
    title: "Revenue Spike Detected",
    description: "Revenue increased 23% this week compared to the 30-day moving average. Primary driver: Enterprise Plan conversions from the email campaign.",
    priority: "high",
    category: "Revenue",
    impact: "+$12.4k ARR",
    actionLabel: "Analyze Campaign",
  },
  {
    id: "insight-2",
    title: "Churn Risk Identified",
    description: "14 accounts showing reduced engagement patterns that historically precede cancellation. Recommend automated re-engagement sequence.",
    priority: "high",
    category: "Retention",
    impact: "14 At-Risk Accounts",
    actionLabel: "Trigger n8n Outreach",
  },
  {
    id: "insight-3",
    title: "Performance Optimization Opportunity",
    description: "The /pricing route has an LCP of 3.2s on mobile devices. Optimizing hero image delivery could improve conversion by 8-12%.",
    priority: "medium",
    category: "Performance",
    impact: "+10% Conversion Est.",
    actionLabel: "Run Lighthouse Audit",
  },
  {
    id: "insight-4",
    title: "Geographic Expansion Signal",
    description: "Sign-ups from Southeast Asia increased 340% month-over-month. Consider localized pricing and regional payment methods.",
    priority: "medium",
    category: "Growth",
    impact: "340% Volume Surge",
    actionLabel: "View Regional Map",
  },
];

export default function InsightsPage() {
  const [insights, setInsights] = useState<InsightCardData[]>(initialInsights);
  const [filter, setFilter] = useState<string>("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  // Filter items
  const filtered = filter === "All"
    ? insights
    : insights.filter((i) => i.category === filter);

  // Trigger simulated AI re-analysis
  const handleTriggerAnalysis = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  // Toggle resolve action
  const handleResolveAction = (id: string) => {
    setResolvedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
            AI Intelligence Hub
          </h1>
          <p className="mt-1 text-dashboard-muted">
            Autonomous pattern detection, revenue forecasting, and retention telemetry.
          </p>
        </div>

        {/* Live Re-analyze Button */}
        <button
          type="button"
          disabled={isRefreshing}
          onClick={handleTriggerAnalysis}
          className="flex items-center gap-2 rounded-xl bg-dashboard-accent px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")} />
          <span>{isRefreshing ? "Scanning Telemetry..." : "Run AI Analysis"}</span>
        </button>
      </div>

      {/* Model Health KPIs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-dashboard-accent mb-2">
            <BrainCircuit className="h-5 w-5" />
            <h3 className="font-semibold text-dashboard-text">Model Precision</h3>
          </div>
          <p className="text-2xl font-bold text-dashboard-text">99.4%</p>
          <p className="text-xs text-dashboard-muted mt-1">Evaluated across 15,000+ data points</p>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-dashboard-success mb-2">
            <Cpu className="h-5 w-5" />
            <h3 className="font-semibold text-dashboard-text">Automated Actions</h3>
          </div>
          <p className="text-2xl font-bold text-dashboard-text">142</p>
          <p className="text-xs text-dashboard-muted mt-1">Dispatched via n8n & API webhooks</p>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-dashboard-warning mb-2">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="font-semibold text-dashboard-text">Critical Alerts</h3>
          </div>
          <p className="text-2xl font-bold text-dashboard-text">0 Critical</p>
          <p className="text-xs text-dashboard-muted mt-1">All live metrics operating inside baseline</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", "Revenue", "Retention", "Performance", "Growth"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === category
                ? "bg-dashboard-accent text-white shadow-xs"
                : "border border-dashboard-border bg-dashboard-card text-dashboard-muted hover:text-dashboard-text hover:bg-dashboard-bg"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Insight Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => {
          const isResolved = resolvedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm transition-all flex flex-col justify-between",
                item.priority === "high" && "border-l-4 border-l-dashboard-danger",
                item.priority === "medium" && "border-l-4 border-l-dashboard-warning",
                item.priority === "low" && "border-l-4 border-l-dashboard-success",
                isResolved && "opacity-60 bg-dashboard-bg/50"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-dashboard-muted">
                    {item.category}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      item.priority === "high" && "bg-dashboard-danger/10 text-dashboard-danger",
                      item.priority === "medium" && "bg-dashboard-warning/10 text-dashboard-warning",
                      item.priority === "low" && "bg-dashboard-success/10 text-dashboard-success"
                    )}
                  >
                    {item.priority.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-dashboard-text mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-dashboard-muted leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-dashboard-border flex items-center justify-between">
                <span className="text-xs font-semibold text-dashboard-accent font-mono">
                  {item.impact}
                </span>

                <button
                  type="button"
                  onClick={() => handleResolveAction(item.id)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                    isResolved
                      ? "border-dashboard-success/30 bg-dashboard-success/10 text-dashboard-success"
                      : "border-dashboard-border bg-dashboard-bg text-dashboard-text hover:border-dashboard-accent"
                  )}
                >
                  {isResolved ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Resolved
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5 text-dashboard-accent" />
                      {item.actionLabel}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
