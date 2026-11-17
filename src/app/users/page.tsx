// Users Page — team members and active accounts directory
import { Suspense } from "react";
import { ActiveSessions } from "@/components/active-sessions";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import { Users as UsersIcon, UserCheck, UserPlus, ShieldCheck } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          Users & Accounts
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Real-time member status, active user sessions, and permission tiers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm flex items-center gap-4">
          <div className="rounded-xl bg-dashboard-accent/10 p-3">
            <UsersIcon className="h-6 w-6 text-dashboard-accent" />
          </div>
          <div>
            <p className="text-sm text-dashboard-muted">Total Registered</p>
            <p className="text-xl font-bold text-dashboard-text">2,847</p>
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm flex items-center gap-4">
          <div className="rounded-xl bg-dashboard-success/10 p-3">
            <UserCheck className="h-6 w-6 text-dashboard-success" />
          </div>
          <div>
            <p className="text-sm text-dashboard-muted">Active Today</p>
            <p className="text-xl font-bold text-dashboard-text">1,492</p>
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-6 shadow-sm flex items-center gap-4">
          <div className="rounded-xl bg-dashboard-warning/10 p-3">
            <UserPlus className="h-6 w-6 text-dashboard-warning" />
          </div>
          <div>
            <p className="text-sm text-dashboard-muted">New This Week</p>
            <p className="text-xl font-bold text-dashboard-text">+184</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<ListSkeleton title="Active Sessions" />}>
        <ActiveSessions />
      </Suspense>
    </div>
  );
}
