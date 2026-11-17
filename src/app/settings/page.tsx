// Settings Page — allows user to configure dashboard preferences and account settings
"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Save, Check } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  // Theme context for direct control
  const { theme, toggleTheme } = useTheme();

  // Local state for notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiDigest, setAiDigest] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  // Profile input states
  const [name, setName] = useState("Fagbenro Rosheed Iyiola");
  const [email, setEmail] = useState("rosheediyiola2004@gmail.com");
  const [role, setRole] = useState("Frontend & Automation Engineer");

  // Save feedback state
  const [saved, setSaved] = useState(false);

  // Handle save action with feedback timer
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          Account & Preferences
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Manage your personal profile, notification triggers, and interface theme.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-dashboard-border pb-3">
            <User className="h-5 w-5 text-dashboard-accent" />
            <h2 className="text-lg font-semibold text-dashboard-text">Profile Information</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-dashboard-muted mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-dashboard-border bg-dashboard-bg px-3 py-2 text-sm text-dashboard-text focus:border-dashboard-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dashboard-muted mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-dashboard-border bg-dashboard-bg px-3 py-2 text-sm text-dashboard-text focus:border-dashboard-accent focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-dashboard-muted mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-dashboard-border bg-dashboard-bg px-3 py-2 text-sm text-dashboard-text focus:border-dashboard-accent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-dashboard-border pb-3">
            <Bell className="h-5 w-5 text-dashboard-accent" />
            <h2 className="text-lg font-semibold text-dashboard-text">Notifications & Alerts</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dashboard-text">Real-time Anomaly Alerts</p>
                <p className="text-xs text-dashboard-muted">Get notified immediately when AI detects sudden revenue or traffic anomalies.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-dashboard-border text-dashboard-accent focus:ring-dashboard-accent"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dashboard-text">Daily AI Digest</p>
                <p className="text-xs text-dashboard-muted">Receive a morning summary of top insights and performance metrics.</p>
              </div>
              <input
                type="checkbox"
                checked={aiDigest}
                onChange={(e) => setAiDigest(e.target.checked)}
                className="h-4 w-4 rounded border-dashboard-border text-dashboard-accent focus:ring-dashboard-accent"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dashboard-text">Weekly Executive Summary</p>
                <p className="text-xs text-dashboard-muted">Detailed PDF report of weekly revenue, churn risks, and traffic growth.</p>
              </div>
              <input
                type="checkbox"
                checked={weeklyReport}
                onChange={(e) => setWeeklyReport(e.target.checked)}
                className="h-4 w-4 rounded border-dashboard-border text-dashboard-accent focus:ring-dashboard-accent"
              />
            </div>
          </div>
        </div>

        {/* Appearance Card */}
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-dashboard-border pb-3">
            <Palette className="h-5 w-5 text-dashboard-accent" />
            <h2 className="text-lg font-semibold text-dashboard-text">Appearance & Theme</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dashboard-text">Theme Mode</p>
              <p className="text-xs text-dashboard-muted">Currently active theme: <span className="font-semibold capitalize text-dashboard-accent">{theme}</span></p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-dashboard-border bg-dashboard-bg px-4 py-2 text-sm font-medium text-dashboard-text hover:bg-dashboard-card transition-colors"
            >
              Toggle to {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-dashboard-accent px-5 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition-opacity"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
