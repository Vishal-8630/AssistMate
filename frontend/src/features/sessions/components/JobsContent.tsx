"use client";

import { AlertCircle, Inbox } from "lucide-react";
import { SessionCard } from "./SessionCard";
import { SessionDto } from "../types";
import { useUnreadCounts } from "../hooks";

interface Props {
  isLoading: boolean;
  isError: boolean;
  sessions: SessionDto[];
  activeTab: string;
  refetch: () => void;
  viewMode: "assistant" | "client";
}

export function JobsContent({
  isLoading,
  isError,
  sessions,
  activeTab,
  refetch,
  viewMode,
}: Props) {
  const { data: unreadCounts } = useUnreadCounts();

  const unreadMap =
    unreadCounts?.reduce<Record<string, number>>((acc, item) => {
      acc[item.sessionId] = item.unreadCount;
      return acc;
    }, {}) ?? {};

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-2xl ring-1 ring-black/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-center">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="font-bold text-slate-700">Failed to load jobs</p>
        <button
          onClick={refetch}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-center">
        <Inbox className="w-8 h-8 text-slate-300" />
        <p className="font-bold text-slate-700">No sessions here</p>
        <p className="text-sm text-slate-400">
          {activeTab === "all"
            ? "No sessions yet."
            : `No ${activeTab.toLowerCase()} sessions.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <SessionCard
          key={session.sessionId}
          session={session}
          viewMode={viewMode}
          unreadCount={unreadMap[session.sessionId] ?? 0}
        />
      ))}
    </div>
  );
}