// Type definitions for the entire dashboard
// These are like blueprints that describe the shape of our data

// Represents a single data point on the revenue chart
export interface RevenueDataPoint {
  // The month label (e.g., "Jan", "Feb")
  month: string;
  // Revenue amount in dollars
  revenue: number;
  // Profit amount in dollars
  profit: number;
}

// Represents a single metric card on the dashboard (e.g., "Total Users")
export interface MetricCard {
  // Unique identifier for this metric
  id: string;
  // Display title (e.g., "Total Revenue")
  title: string;
  // The main value to display (e.g., "$45,231")
  value: string;
  // How much it changed from last period (e.g., "+12.5%")
  change: string;
  // Whether the change is positive (green) or negative (red)
  trend: "up" | "down";
  // Name of the icon to show (from lucide-react)
  icon: string;
}

// Represents a row in the recent activity feed
export interface ActivityItem {
  // Unique identifier for this activity
  id: string;
  // Who performed the action
  user: string;
  // What they did (e.g., "completed a purchase")
  action: string;
  // When it happened (e.g., "2 minutes ago")
  timestamp: string;
  // Category of the activity
  type: "purchase" | "signup" | "review" | "support";
}

// Represents data for the AI insights section
export interface AIInsight {
  // Unique identifier
  id: string;
  // Short title of the insight
  title: string;
  // Detailed description of what the AI found
  description: string;
  // How important this insight is
  priority: "high" | "medium" | "low";
  // Which category this insight falls into
  category: string;
}

// Represents a user session for the active users panel
export interface UserSession {
  // Unique identifier
  id: string;
  // User's display name
  name: string;
  // User's email address
  email: string;
  // Which page they're currently viewing
  currentPage: string;
  // How long they've been on the site
  duration: string;
  // Their country of origin
  country: string;
}

// The overall dashboard data structure that holds everything
export interface DashboardData {
  // Array of metric cards to display at the top
  metrics: MetricCard[];
  // Revenue chart data points
  revenueData: RevenueDataPoint[];
  // Recent activity feed items
  activities: ActivityItem[];
  // AI-generated insights
  insights: AIInsight[];
  // Currently active user sessions
  activeSessions: UserSession[];
}
