"use client";

// Users Page with active search filter, role badges, interactive user status modal/toggle
import { useState } from "react";
import { Users as UsersIcon, UserCheck, UserPlus, Search, Shield, MoreHorizontal, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Developer" | "Analyst" | "Viewer";
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

const initialUsers: UserRecord[] = [
  { id: "u-1", name: "Fagbenro Rosheed Iyiola", email: "rosheediyiola2004@gmail.com", role: "Admin", status: "Active", lastActive: "Just now" },
  { id: "u-2", name: "Sarah Chen", email: "sarah.chen@enterprise.io", role: "Developer", status: "Active", lastActive: "12m ago" },
  { id: "u-3", name: "Marcus Johnson", email: "m.johnson@fintech.com", role: "Analyst", status: "Active", lastActive: "45m ago" },
  { id: "u-4", name: "Elena Rodriguez", email: "elena@compliance.org", role: "Viewer", status: "Invited", lastActive: "2 days ago" },
  { id: "u-5", name: "David Kim", email: "dkim@techsystems.co", role: "Developer", status: "Active", lastActive: "1 hour ago" },
  { id: "u-6", name: "Aisha Patel", email: "aisha@globalops.net", role: "Analyst", status: "Suspended", lastActive: "1 week ago" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Toggle user status
  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text md:text-3xl">
          Users & Accounts
        </h1>
        <p className="mt-1 text-dashboard-muted">
          Real-time member status, active user sessions, and permission tiers.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-xl bg-dashboard-accent/10 p-3">
            <UsersIcon className="h-6 w-6 text-dashboard-accent" />
          </div>
          <div>
            <p className="text-xs text-dashboard-muted">Total Directory</p>
            <p className="text-xl font-bold text-dashboard-text">{users.length} Members</p>
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-xl bg-dashboard-success/10 p-3">
            <UserCheck className="h-6 w-6 text-dashboard-success" />
          </div>
          <div>
            <p className="text-xs text-dashboard-muted">Active Now</p>
            <p className="text-xl font-bold text-dashboard-text">
              {users.filter((u) => u.status === "Active").length} Online
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-card p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-xl bg-dashboard-warning/10 p-3">
            <UserPlus className="h-6 w-6 text-dashboard-warning" />
          </div>
          <div>
            <p className="text-xs text-dashboard-muted">Pending Invites</p>
            <p className="text-xl font-bold text-dashboard-text">
              {users.filter((u) => u.status === "Invited").length} Pending
            </p>
          </div>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="rounded-xl border border-dashboard-border bg-dashboard-card shadow-sm overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-dashboard-border flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-dashboard-bg/30">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dashboard-muted" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-dashboard-border bg-dashboard-card pl-9 pr-4 py-1.5 text-xs text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1">
            {["All", "Admin", "Developer", "Analyst"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                  roleFilter === role
                    ? "bg-dashboard-accent text-white"
                    : "text-dashboard-muted hover:bg-dashboard-bg hover:text-dashboard-text"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-dashboard-border bg-dashboard-bg/50 text-dashboard-muted uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 pl-4">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Active</th>
                <th className="p-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashboard-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-dashboard-muted">
                    No users matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-dashboard-bg/50 transition-colors">
                    <td className="p-3.5 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-dashboard-accent/15 flex items-center justify-center font-bold text-dashboard-accent text-xs shrink-0">
                          {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-dashboard-text truncate">{user.name}</p>
                          <p className="text-[11px] text-dashboard-muted truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="rounded-md bg-dashboard-bg border border-dashboard-border px-2 py-0.5 text-[11px] font-medium text-dashboard-text">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          user.status === "Active" && "bg-dashboard-success/15 text-dashboard-success",
                          user.status === "Invited" && "bg-dashboard-warning/15 text-dashboard-warning",
                          user.status === "Suspended" && "bg-dashboard-danger/15 text-dashboard-danger"
                        )}
                      >
                        <span className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          user.status === "Active" && "bg-dashboard-success",
                          user.status === "Invited" && "bg-dashboard-warning",
                          user.status === "Suspended" && "bg-dashboard-danger"
                        )} />
                        {user.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-dashboard-muted font-mono text-[11px]">
                      {user.lastActive}
                    </td>

                    <td className="p-3.5 pr-4 text-right">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className="rounded-lg border border-dashboard-border bg-dashboard-bg px-2.5 py-1 text-[11px] font-medium text-dashboard-text hover:border-dashboard-accent transition-colors"
                      >
                        {user.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
