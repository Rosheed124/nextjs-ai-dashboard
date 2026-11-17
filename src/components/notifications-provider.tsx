// Notifications Context & State Provider
// Provides global state so clicking the notification bell or "Mark all as read" syncs everywhere
"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Notification item structure
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "purchase" | "signup" | "review" | "support" | "anomaly";
}

// Initial mock notifications
const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Enterprise Plan Conversion",
    message: "Sarah Chen completed purchase of Enterprise Plan ($2,400/yr).",
    timestamp: "2 minutes ago",
    read: false,
    type: "purchase",
  },
  {
    id: "notif-2",
    title: "Trial Onboarding",
    message: "Marcus Johnson signed up for a 14-day free trial.",
    timestamp: "5 minutes ago",
    read: false,
    type: "signup",
  },
  {
    id: "notif-3",
    title: "AI Anomaly Detected",
    message: "Sign-ups from Southeast Asia increased +340% month-over-month.",
    timestamp: "15 minutes ago",
    read: false,
    type: "anomaly",
  },
  {
    id: "notif-4",
    title: "Support Ticket #4521",
    message: "David Kim opened ticket: 'Webhook timeout on bulk export'.",
    timestamp: "25 minutes ago",
    read: false,
    type: "support",
  },
];

interface NotificationsContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({} as any);

export function useNotifications() {
  return useContext(NotificationsContext);
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  // Unread count is calculated dynamically
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Toggle notification popover dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  // Mark an individual notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        isOpen,
        toggleDropdown,
        closeDropdown,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
