// Loading skeleton for list-based panels (Activity Feed, AI Insights, Sessions)

interface ListSkeletonProps {
  // The section title to show while loading
  title: string;
}

export function ListSkeleton({ title }: ListSkeletonProps) {
  return (
    <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6">
      {/* Placeholder for the section title */}
      <div className="mb-4 h-5 w-36 rounded shimmer" />
      {/* Create 4 placeholder list items */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Placeholder dot */}
            <div className="mt-1 h-3 w-3 shrink-0 rounded-full shimmer" />
            {/* Placeholder text lines */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full rounded shimmer" />
              <div className="h-3 w-24 rounded shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
