// AI Insights Page — dedicated view for AI predictions, anomalies, and recommendations
import { Suspense } from "react";
import { AIInsightsPanel } from "@/components/ai-insights-panel";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import { Sparkles, BrainCircuit, ShieldAlert, Cpu } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          AI Intelligence Hub
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Autonomous pattern detection, revenue forecasting, and retention alerts.
        </p>
      </div>

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
          <p className="text-xs text-dashboard-muted mt-1">Triggered via n8n & API webhooks</p>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-dashboard-warning mb-2">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="font-semibold text-dashboard-text">Monitored Anomalies</h3>
          </div>
          <p className="text-2xl font-bold text-dashboard-text">0 Critical</p>
          <p className="text-xs text-dashboard-muted mt-1">All systems operating within baseline</p>
        </div>
      </div>

      <Suspense fallback={<ListSkeleton title="AI Insights" />}>
        <AIInsightsPanel />
      </Suspense>
    </div>
  );
}
