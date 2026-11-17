// Server Component wrapper — fetches data on server, passes to client chart
import { fetchRevenueData } from "@/lib/data";
import { RevenueChartClient } from "./revenue-chart-client";

// This runs on the server: fetch data, then hand it to the client chart
export async function RevenueChart() {
  // Get revenue data from our data source (runs on server)
  const data = await fetchRevenueData();

  return (
    // Card container for the chart
    <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
      {/* Card header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-dashboard-text">
          Revenue & Profit
        </h2>
        <p className="text-sm text-dashboard-muted">Monthly overview for 2026</p>
      </div>
      {/* Client-side chart component (needs browser for interactivity) */}
      <RevenueChartClient data={data} />
    </div>
  );
}
