// Loading skeleton for the metrics grid — shows animated placeholder cards
// This appears while the real MetricsGrid data is being fetched on the server

export function MetricsSkeleton() {
  return (
    // Same grid layout as the real metrics grid
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Create 4 placeholder cards using Array.from */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-dashboard-border bg-dashboard-card p-6"
        >
          {/* Placeholder for the title and icon row */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded shimmer" />
            <div className="h-8 w-8 rounded-lg shimmer" />
          </div>
          {/* Placeholder for the big number */}
          <div className="mt-3 h-8 w-32 rounded shimmer" />
          {/* Placeholder for the change percentage */}
          <div className="mt-2 h-4 w-40 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}
