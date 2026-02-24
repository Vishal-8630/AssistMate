import api from "@/lib/api-client";
import { Service, UpdateAssistantServiceRequest } from "./types";

export const getAllServices = async (): Promise<Service[]> => {
  const { data } = await api.get<Service[]>("/services");
  return data;
};

export const getMyServices = async (): Promise<Service[]> => {
  const { data } = await api.get<Service[]>("/services/me");
  return data;
};

export const updateMyServices = async (
  payload: UpdateAssistantServiceRequest,
): Promise<void> => {
  await api.put("/services/me", payload);
};

export const getAssistantsByService = async (serviceId: string) => {
  const { data } = await api.get(`/services/${serviceId}/assistants`);
  return data;
};
