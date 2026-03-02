import { SessionDto, SessionStatus } from "../types";

export type FilterTab = "All" | SessionStatus;

export const filterSessionsByStatus = (
  sessions: SessionDto[] | undefined,
  tab: FilterTab,
): SessionDto[] => {
  if (!sessions || sessions.length === 0) return [];

  if (tab === "All") return sessions;

  return sessions.filter((session) => session.status === tab);
};

export const getSessionCounts = (sessions: SessionDto[] | undefined) => {
  if (!sessions || sessions.length === 0) {
    return {
      All: 0,
      Requested: 0,
      Active: 0,
      Completed: 0,
      Rejected: 0,
      Cancelled: 0,
    };
  }

  return {
    All: sessions.length,
    Requested: sessions.filter((s) => s.status === "Requested").length,
    Active: sessions.filter((s) => s.status === "Active").length,
    Completed: sessions.filter((s) => s.status === "Completed").length,
    Rejected: sessions.filter((s) => s.status === "Rejected").length,
    Cancelled: sessions.filter((s) => s.status === "Cancelled").length,
  };
};
