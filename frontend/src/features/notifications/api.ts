import api from "@/lib/api-client";
import { NotificationDto } from "./types";

export const getNotifications = async (): Promise<NotificationDto[]> => {
  const { data } = await api.get<NotificationDto[]>("/notifications");
  return data;
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  await api.post(`/notifications/${id}/read`);
};
