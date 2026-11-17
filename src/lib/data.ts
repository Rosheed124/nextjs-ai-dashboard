// Mock data generator — simulates a real API or database
// In a production app, this would fetch from a real backend
import {
  DashboardData,
  MetricCard,
  RevenueDataPoint,
  ActivityItem,
  AIInsight,
  UserSession,
} from "./types";

// Simulate a network delay (like fetching from a real API)
// The 'ms' parameter controls how long to wait in milliseconds
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate the four main metric cards shown at the top of the dashboard
function generateMetrics(): MetricCard[] {
  return [
    {
      id: "total-revenue",
      title: "Total Revenue",
      // Format as a dollar amount
      value: "$48,352.90",
      change: "+14.2%",
      // Revenue is going up — that's good!
      trend: "up",
      icon: "DollarSign",
    },
    {
      id: "active-users",
      title: "Active Users",
      value: "2,847",
      change: "+7.1%",
      trend: "up",
      icon: "Users",
    },
    {
      id: "conversion-rate",
      title: "Conversion Rate",
      value: "3.24%",
      change: "-0.4%",
      // Conversion went down slightly — that's not ideal
      trend: "down",
      icon: "TrendingUp",
    },
    {
      id: "avg-session",
      title: "Avg. Session Duration",
      value: "4m 32s",
      change: "+12.8%",
      trend: "up",
      icon: "Clock",
    },
  ];
}

// Generate monthly revenue and profit data for the chart
function generateRevenueData(): RevenueDataPoint[] {
  return [
    { month: "Jan", revenue: 18500, profit: 4200 },
    { month: "Feb", revenue: 22300, profit: 5100 },
    { month: "Mar", revenue: 19800, profit: 4800 },
    { month: "Apr", revenue: 27400, profit: 7200 },
    { month: "May", revenue: 31200, profit: 8900 },
    { month: "Jun", revenue: 28700, profit: 7600 },
    { month: "Jul", revenue: 35100, profit: 10200 },
    { month: "Aug", revenue: 33400, profit: 9800 },
    { month: "Sep", revenue: 38900, profit: 12100 },
    { month: "Oct", revenue: 42100, profit: 13500 },
    { month: "Nov", revenue: 45600, profit: 14800 },
    { month: "Dec", revenue: 48352, profit: 15900 },
  ];
}

// Generate recent activity feed items
function generateActivities(): ActivityItem[] {
  return [
    {
      id: "act-1",
      user: "Sarah Chen",
      action: "completed a purchase of Enterprise Plan",
      timestamp: "2 minutes ago",
      type: "purchase",
    },
    {
      id: "act-2",
      user: "Marcus Johnson",
      action: "signed up for a free trial",
      timestamp: "5 minutes ago",
      type: "signup",
    },
    {
      id: "act-3",
      user: "Elena Rodriguez",
      action: "left a 5-star review",
      timestamp: "12 minutes ago",
      type: "review",
    },
    {
      id: "act-4",
      user: "David Kim",
      action: "opened a support ticket #4521",
      timestamp: "18 minutes ago",
      type: "support",
    },
    {
      id: "act-5",
      user: "Aisha Patel",
      action: "upgraded to Professional Plan",
      timestamp: "25 minutes ago",
      type: "purchase",
    },
    {
      id: "act-6",
      user: "Tom Williams",
      action: "signed up via referral link",
      timestamp: "31 minutes ago",
      type: "signup",
    },
  ];
}

// Generate AI-powered insights (simulates what an AI engine would produce)
function generateInsights(): AIInsight[] {
  return [
    {
      id: "insight-1",
      title: "Revenue Spike Detected",
      description:
        "Revenue increased 23% this week compared to the 30-day moving average. Primary driver: Enterprise Plan conversions from the email campaign launched on Monday.",
      priority: "high",
      category: "Revenue",
    },
    {
      id: "insight-2",
      title: "Churn Risk Identified",
      description:
        "14 accounts showing reduced engagement patterns that historically precede cancellation. Recommend targeted outreach within 48 hours.",
      priority: "high",
      category: "Retention",
    },
    {
      id: "insight-3",
      title: "Performance Optimization Opportunity",
      description:
        "The /pricing page has an LCP of 3.2s on mobile devices. Optimizing hero image delivery could improve conversion by an estimated 8-12%.",
      priority: "medium",
      category: "Performance",
    },
    {
      id: "insight-4",
      title: "Geographic Expansion Signal",
      description:
        "Sign-ups from Southeast Asia increased 340% month-over-month. Consider localized pricing and regional payment methods.",
      priority: "medium",
      category: "Growth",
    },
  ];
}

// Generate active user session data
function generateActiveSessions(): UserSession[] {
  return [
    {
      id: "session-1",
      name: "Alex Thompson",
      email: "alex@company.co",
      currentPage: "/dashboard",
      duration: "12m 34s",
      country: "United States",
    },
    {
      id: "session-2",
      name: "Yuki Tanaka",
      email: "yuki@startup.jp",
      currentPage: "/analytics",
      duration: "8m 12s",
      country: "Japan",
    },
    {
      id: "session-3",
      name: "Fatima Al-Rashid",
      email: "fatima@enterprise.ae",
      currentPage: "/settings",
      duration: "3m 45s",
      country: "UAE",
    },
    {
      id: "session-4",
      name: "Lucas Müller",
      email: "lucas@tech.de",
      currentPage: "/reports",
      duration: "22m 08s",
      country: "Germany",
    },
    {
      id: "session-5",
      name: "Priya Sharma",
      email: "priya@saas.in",
      currentPage: "/billing",
      duration: "1m 56s",
      country: "India",
    },
  ];
}

// Main function: fetches all dashboard data at once
// This simulates a server-side API call with a realistic delay
export async function fetchDashboardData(): Promise<DashboardData> {
  // Wait 800ms to simulate network latency (makes streaming UI visible)
  await delay(800);

  // Return all the generated data bundled together
  return {
    metrics: generateMetrics(),
    revenueData: generateRevenueData(),
    activities: generateActivities(),
    insights: generateInsights(),
    activeSessions: generateActiveSessions(),
  };
}

// Fetch just the metrics (used for independent streaming)
export async function fetchMetrics(): Promise<MetricCard[]> {
  // Shorter delay — metrics load first
  await delay(400);
  return generateMetrics();
}

// Fetch just the revenue chart data
export async function fetchRevenueData(): Promise<RevenueDataPoint[]> {
  // Medium delay — chart loads second
  await delay(600);
  return generateRevenueData();
}

// Fetch the activity feed
export async function fetchActivities(): Promise<ActivityItem[]> {
  // Slightly longer delay
  await delay(900);
  return generateActivities();
}

// Fetch AI insights (takes longest — simulates AI processing time)
export async function fetchInsights(): Promise<AIInsight[]> {
  // AI analysis takes more time
  await delay(1200);
  return generateInsights();
}

// Fetch active sessions
export async function fetchActiveSessions(): Promise<UserSession[]> {
  await delay(700);
  return generateActiveSessions();
}
