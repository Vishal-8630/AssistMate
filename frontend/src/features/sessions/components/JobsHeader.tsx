"use client";

import { RefreshCw, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobsHeaderProps {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export function JobsHeader({
  title = "My Jobs",
  subtitle = "Manage incoming service requests and active sessions.",
  badgeLabel = "Assistant Portal",
  isRefreshing = false,
  onRefresh,
}: JobsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      {/* Left Section */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">
          <Briefcase className="w-3.5 h-3.5" />
          {badgeLabel}
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-slate-500 font-medium">
          {subtitle}
        </p>
      </div>

      {/* Right Section */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
                     border border-slate-200 text-slate-600 bg-white hover:bg-slate-50
                     transition-all disabled:opacity-50 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw
            className={cn("w-4 h-4", isRefreshing && "animate-spin")}
          />
          Refresh
        </button>
      )}
    </div>
  );
}