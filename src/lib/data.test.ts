// Unit tests for data generation and mock fetchers
import { describe, it, expect } from "vitest";
import {
  fetchDashboardData,
  fetchMetrics,
  fetchRevenueData,
  fetchInsights,
} from "./data";
import { cn } from "./utils";

describe("Utility functions", () => {
  it("should merge tailwind classes properly using cn()", () => {
    // Basic concatenation
    expect(cn("px-2", "py-2")).toBe("px-2 py-2");
    // Conflict resolution: last class wins
    expect(cn("px-2 py-2", "px-4")).toBe("py-2 px-4");
    // Falsy value filtering
    expect(cn("text-sm", false && "font-bold", undefined, "text-blue-500")).toBe(
      "text-sm text-blue-500"
    );
  });
});

describe("Data Services (/lib/data)", () => {
  it("should fetch metrics list with 4 valid KPI cards", async () => {
    const metrics = await fetchMetrics();
    expect(metrics).toHaveLength(4);
    metrics.forEach((m) => {
      expect(m).toHaveProperty("id");
      expect(m).toHaveProperty("title");
      expect(m).toHaveProperty("value");
      expect(m).toHaveProperty("change");
      expect(["up", "down"]).toContain(m.trend);
    });
  });

  it("should fetch 12 months of revenue and profit points", async () => {
    const revenue = await fetchRevenueData();
    expect(revenue).toHaveLength(12);
    expect(revenue[0].month).toBe("Jan");
    expect(revenue[11].month).toBe("Dec");
    revenue.forEach((point) => {
      expect(point.revenue).toBeGreaterThan(0);
      expect(point.profit).toBeGreaterThan(0);
      // Profit shouldn't exceed total revenue
      expect(point.profit).toBeLessThan(point.revenue);
    });
  });

  it("should fetch AI insights with valid priorities", async () => {
    const insights = await fetchInsights();
    expect(insights.length).toBeGreaterThan(0);
    insights.forEach((insight) => {
      expect(["high", "medium", "low"]).toContain(insight.priority);
      expect(insight.title.length).toBeGreaterThan(3);
    });
  });

  it("should bundle complete dashboard data accurately", async () => {
    const data = await fetchDashboardData();
    expect(data.metrics).toBeDefined();
    expect(data.revenueData).toBeDefined();
    expect(data.activities).toBeDefined();
    expect(data.insights).toBeDefined();
    expect(data.activeSessions).toBeDefined();
  });
});
