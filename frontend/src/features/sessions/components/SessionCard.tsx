"use client";

import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { SessionDto } from "../types";
import { useAcceptSession, useRejectSession } from "../hooks";
import { SESSION_META } from "../constants/sessionMeta";
import { useRouter } from "next/navigation";

// ─── Helpers ───────────────────────────────────────────────

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ─── Status Badge ───────────────────────────────────────────

function StatusBadge({ status }: { status: SessionDto["status"] }) {
  const meta = SESSION_META[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-tight",
        meta.badgeBg,
        meta.badgeText,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

// ─── Actions ─────────────────────────────────────────────────

function AssistantActions({
  session,
  unreadCount,
}: {
  session: SessionDto;
  unreadCount: number;
}) {
  const router = useRouter();
  const { mutate: accept, isPending: accepting } = useAcceptSession();
  const { mutate: reject, isPending: rejecting } = useRejectSession();

  const isBusy = accepting || rejecting;

  if (session.status === "Requested") {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => reject(session.sessionId)}
          disabled={isBusy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
            border border-red-200 text-red-600 bg-red-50
            hover:bg-red-100 transition-all disabled:opacity-50"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>

        <button
          onClick={() => accept(session.sessionId)}
          disabled={isBusy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
            bg-emerald-500 text-white hover:bg-emerald-600
            transition-all disabled:opacity-50 shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          {accepting ? "Accepting…" : "Accept"}
        </button>
      </div>
    );
  }

  if (session.status === "Active") {
    return (
      <button
        onClick={() => router.push(`/sessions/${session.sessionId}`)}
        className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
          bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
      >
        <MessageSquare className="w-4 h-4" />
        Go to Chat
        {unreadCount > 0 && (
          <span
            className="absolute -top-2 -right-3 min-w-[18px] h-[18px]
              flex items-center justify-center rounded-full
              bg-red-500 text-white text-[10px] font-bold px-1"
          >
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  if (session.status === "Completed") {
    return (
      <button
        onClick={() => router.push(`/sessions/${session.sessionId}`)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
          border border-indigo-200 text-indigo-600 bg-indigo-50
          hover:bg-indigo-100 transition-all"
      >
        <MessageSquare className="w-4 h-4" />
        View Chat
      </button>
    );
  }

  return null;
}

function ClientActions({
  session,
  unreadCount,
}: {
  session: SessionDto;
  unreadCount: number;
}) {
  const router = useRouter();

  if (session.status === "Requested") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
        <Clock className="w-4 h-4 animate-pulse" />
        Waiting for assistant…
      </span>
    );
  }

  if (session.status === "Active") {
    return (
      <button
        onClick={() => router.push(`/sessions/${session.sessionId}`)}
        className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
          bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
      >
        <MessageSquare className="w-4 h-4" />
        Go to Chat
        {unreadCount > 0 && (
          <span
            className="absolute -top-2 -right-3 min-w-[18px] h-[18px]
              flex items-center justify-center rounded-full
              bg-red-500 text-white text-[10px] font-bold px-1"
          >
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  if (session.status === "Rejected") {
    return (
      <span className="text-sm font-semibold text-red-500 flex items-center gap-1.5">
        <XCircle className="w-4 h-4" />
        Request rejected
      </span>
    );
  }

  if (session.status === "Completed") {
    return (
      <button
        onClick={() => router.push(`/sessions/${session.sessionId}`)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
          border border-indigo-200 text-indigo-600 bg-indigo-50
          hover:bg-indigo-100 transition-all"
      >
        <MessageSquare className="w-4 h-4" />
        View Chat
      </button>
    );
  }

  return null;
}

// ─── Session Card ───────────────────────────────────────────

interface SessionCardProps {
  session: SessionDto;
  viewMode: "assistant" | "client";
  unreadCount?: number;
}

export function SessionCard({
  session,
  viewMode,
  unreadCount,
}: SessionCardProps) {
  const meta = SESSION_META[session.status];

  return (
    <div
      className="group relative bg-white rounded-2xl ring-1 ring-black/5 shadow-sm
        hover:ring-indigo-200 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Accent Strip */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl",
          meta.accent,
        )}
      />

      <div className="pl-5 pr-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
            meta.iconBg,
            meta.iconText,
          )}
        >
          <BriefcaseBusiness className="w-5 h-5" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {session.serviceName}
            </h3>
            <StatusBadge status={session.status} />
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(session.createdAt)}
            </span>

            <span className="text-slate-200">·</span>

            <span className="font-mono text-[10px] text-slate-300 truncate max-w-[120px]">
              {session.sessionId.slice(0, 8)}…
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {viewMode === "assistant" ? (
            <AssistantActions session={session} unreadCount={unreadCount ?? 0} />
          ) : (
            <ClientActions session={session} unreadCount={unreadCount ?? 0} />
          )}

          <button
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
