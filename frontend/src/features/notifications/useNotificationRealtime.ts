"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { NotificationDto } from "./types";
import { notificationsKeys } from "./hooks";

export const useNotificationRealtime = (accessToken: string | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accessToken) return;

    let connection: signalR.HubConnection | null = null;

    const start = async () => {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_SIGNALR_URL}/hubs/notifications`, {
          accessTokenFactory: () => accessToken,
        })
        .withAutomaticReconnect()
        .build();

      connection.on("ReceiveNotification", (notification: NotificationDto) => {
        console.log("🔔 New Notification:", notification);

        queryClient.setQueryData<NotificationDto[]>(
          notificationsKeys.all,
          (old) => {
            if (!old) return [notification];

            // prevent duplicates (important!)
            const exists = old.some((n) => n.id === notification.id);
            if (exists) return old;

            return [notification, ...old];
          },
        );
      });

      try {
        await connection.start();
        console.log("🔔 NotificationHub connected");
      } catch (error) {
        console.error("NotificationHub connection error:", error);
      }
    };

    start();

    return () => {
      if (connection) {
        connection.stop();
        console.log("🔌 NotificationHub disconnected");
      }
    };
  }, [accessToken, queryClient]);
};
