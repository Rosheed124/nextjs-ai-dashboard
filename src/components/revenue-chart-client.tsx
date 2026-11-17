"use client";
// "use client" because Recharts (the charting library) needs browser APIs

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { RevenueDataPoint } from "@/lib/types";

// Props: this component receives the chart data from its server parent
interface RevenueChartClientProps {
  data: RevenueDataPoint[];
}

// The actual chart visualization — renders an area chart with two data series
export function RevenueChartClient({ data }: RevenueChartClientProps) {
  return (
    // ResponsiveContainer makes the chart resize with its parent
    <ResponsiveContainer width="100%" height={350}>
      {/* Area chart with the revenue data */}
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {/* Define gradient fills for the areas */}
        <defs>
          {/* Gradient fill for the revenue area (blue, fading down) */}
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          {/* Gradient fill for the profit area (green, fading down) */}
          <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* Grid lines behind the chart for readability */}
        <CartesianGrid strokeDasharray="3 3" stroke="var(--dashboard-border)" />
        {/* X-axis shows month labels at the bottom */}
        <XAxis
          dataKey="month"
          stroke="var(--dashboard-muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        {/* Y-axis shows dollar amounts on the left */}
        <YAxis
          stroke="var(--dashboard-muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
        />
        {/* Tooltip appears when hovering over data points */}
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--dashboard-card)",
            border: "1px solid var(--dashboard-border)",
            borderRadius: "8px",
            color: "var(--dashboard-text)",
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
        />
        {/* Legend at the bottom shows what each color means */}
        <Legend />
        {/* Revenue area (blue) — smooth curved line with gradient fill */}
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          fill="url(#revenueGradient)"
          strokeWidth={2}
          name="Revenue"
        />
        {/* Profit area (green) — smooth curved line with gradient fill */}
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#22c55e"
          fill="url(#profitGradient)"
          strokeWidth={2}
          name="Profit"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
