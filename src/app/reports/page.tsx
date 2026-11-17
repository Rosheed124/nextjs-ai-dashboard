// Reports Page — exportable business and audit logs
import { FileText, Download, CheckCircle, Clock } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { title: "Q3 2026 Executive Financial Report", size: "2.4 MB", date: "Nov 15, 2026", status: "Ready" },
    { title: "WCAG 2.2 Accessibility Compliance Audit", size: "1.1 MB", date: "Nov 10, 2026", status: "Ready" },
    { title: "Infrastructure SLA & Uptime Telemetry", size: "4.8 MB", date: "Nov 01, 2026", status: "Ready" },
    { title: "AI Model Evaluation & Prompt Drift Logs", size: "850 KB", date: "Oct 28, 2026", status: "Ready" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          Reports & Documentation
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Download compliance audits, financial summaries, and platform telemetry.
        </p>
      </div>

      <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-dashboard-text mb-4">Generated Files</h2>
        <div className="divide-y divide-dashboard-border">
          {reports.map((report, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-dashboard-accent/10 p-2">
                  <FileText className="h-5 w-5 text-dashboard-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dashboard-text">{report.title}</p>
                  <p className="text-xs text-dashboard-muted">{report.date} • {report.size}</p>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-dashboard-border bg-dashboard-bg px-3 py-1.5 text-xs font-medium text-dashboard-text hover:bg-dashboard-card transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
