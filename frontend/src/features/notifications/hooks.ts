import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationDto } from "./types";
import { getNotifications, markNotificationAsRead } from "./api";

export const notificationsKeys = {
  all: ["notifications"] as const,
};

export const useNotifications = () => {
  return useQuery<NotificationDto[]>({
    queryKey: notificationsKeys.all,
    queryFn: getNotifications,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: notificationsKeys.all,
      });

      const previous = queryClient.getQueryData<NotificationDto[]>(
        notificationsKeys.all,
      );

      queryClient.setQueryData<NotificationDto[]>(
        notificationsKeys.all,
        (old) => {
          if (!old) return old;

          return old.map((n): NotificationDto => (n.id === id ? { ...n, isRead: true } : n));
        },
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationsKeys.all, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      });
    },
  });
};
