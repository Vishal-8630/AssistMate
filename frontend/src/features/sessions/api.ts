import api from "@/lib/api-client";
import {
  AcceptSessionResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  GetMySessionsResponse,
  RejectSessionResponse,
  UnreadCountsDto,
} from "./types";

export const createSession = async (
  payload: CreateSessionRequest,
): Promise<CreateSessionResponse> => {
  const { data } = await api.post<CreateSessionResponse>("/sessions", payload);
  return data;
};

export const acceptSession = async (
  sessionId: string,
): Promise<AcceptSessionResponse> => {
  const { data } = await api.post<AcceptSessionResponse>(
    `/sessions/${sessionId}/accept`,
  );
  return data;
};

export const rejectSession = async (
  sessionId: string,
): Promise<RejectSessionResponse> => {
  const { data } = await api.post<RejectSessionResponse>(
    `/sessions/${sessionId}/reject`,
  );
  return data;
};

export const getMySessions = async (): Promise<GetMySessionsResponse> => {
  const { data } = await api.get<GetMySessionsResponse>("/sessions/my");
  return data;
};

export const getUnreadCounts = async (): Promise<UnreadCountsDto[]> => {
  const { data } = await api.get<UnreadCountsDto[]>("/sessions/unread-counts");
  return data;
};
