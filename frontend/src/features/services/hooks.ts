"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllServices,
  getAssistantsByService,
  getMyServices,
  updateMyServices,
} from "./api";
import { UpdateAssistantServiceRequest } from "./types";

const SERVICE_QUERY_KEYS = {
  all: ["services"] as const,
  mine: ["services", "me"] as const,
  assistants: (serviceId: string) =>
    ["services", serviceId, "assistants"] as const,
};

export const useServices = () => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.all,
    queryFn: getAllServices,
  });
};

export const useMyServices = () => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.mine,
    queryFn: getMyServices,
  });
};

export const useUpdateMyServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAssistantServiceRequest) =>
      updateMyServices(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVICE_QUERY_KEYS.mine,
      });
    },
  });
};

export const useAssistantsByService = (serviceId: string) => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.assistants(serviceId),
    queryFn: () => getAssistantsByService(serviceId),
    enabled: !!serviceId,
  });
};
