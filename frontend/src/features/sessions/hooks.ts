import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptSession,
  createSession,
  getMySessions,
  rejectSession,
} from "./api";
import { CreateSessionRequest } from "./types";

export const useMySessions = () =>
  useQuery({
    queryKey: ["my-sessions"],
    queryFn: getMySessions,
  });

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSessionRequest) => createSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-sessions"] });
    }
  });
};

export const useAcceptSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => acceptSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-sessions"] });
    },
  });
};

export const useRejectSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => rejectSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-sessions"] });
    },
  });
};
