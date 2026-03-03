import { SessionStatus } from "../types";

export const SESSION_META: Record<
  SessionStatus,
  {
    label: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
    dot: string;
    iconBg: string;
    iconText: string;
  }
> = {
  Requested: {
    label: "Requested",
    accent: "bg-amber-400",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    dot: "bg-amber-400",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
  },
  Active: {
    label: "Active",
    accent: "bg-emerald-400",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    dot: "bg-emerald-400",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
  },
  Rejected: {
    label: "Rejected",
    accent: "bg-red-400",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    dot: "bg-red-400",
    iconBg: "bg-red-50",
    iconText: "text-red-500",
  },
  Completed: {
    label: "Completed",
    accent: "bg-blue-400",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    dot: "bg-blue-400",
    iconBg: "bg-blue-50",
    iconText: "text-blue-500",
  },
  Cancelled: {
    label: "Cancelled",
    accent: "bg-slate-300",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-500",
    dot: "bg-slate-400",
    iconBg: "bg-slate-100",
    iconText: "text-slate-400",
  },
};