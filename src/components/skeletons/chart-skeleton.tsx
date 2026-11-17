// Loading skeleton for the revenue chart — shows an animated placeholder

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6">
      {/* Placeholder for the chart title */}
      <div className="mb-4">
        <div className="h-5 w-36 rounded shimmer" />
        <div className="mt-1 h-4 w-48 rounded shimmer" />
      </div>
      {/* Large placeholder block where the chart will appear */}
      <div className="h-[350px] rounded-lg shimmer" />
    </div>
  );
}
