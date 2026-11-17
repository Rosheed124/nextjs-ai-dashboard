// Root layout — this wraps EVERY page in our app
// It sets up the HTML structure, fonts, metadata, and global providers
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationsProvider } from "@/components/notifications-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

// Load the Inter font from Google Fonts (clean, modern look)
const inter = Inter({ subsets: ["latin"] });

// SEO metadata — this shows up in browser tabs and search results
export const metadata: Metadata = {
  title: "AI Analytics Dashboard | Next.js 15",
  description:
    "Real-time AI-powered analytics dashboard built with Next.js 15, React Server Components, and TypeScript",
};

// The root layout component — every page renders inside this
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The 'suppressHydrationWarning' prevents a warning when dark mode class is added
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider manages light/dark mode across the entire app */}
        <ThemeProvider>
          {/* NotificationsProvider manages notification stream and unread badge */}
          <NotificationsProvider>
            {/* Main layout: sidebar on the left, content on the right */}
            <div className="flex h-screen overflow-hidden">
              {/* Navigation sidebar */}
              <Sidebar />
              {/* Main content area */}
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top header bar with search, notifications, and theme toggle */}
                <Header />
                {/* Page content — scrollable area where each page renders */}
                <main className="flex-1 overflow-y-auto bg-dashboard-bg p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </div>
            </div>
          </NotificationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
