import { NotificationDto, NotificationType } from "../types";
import { useMarkNotificationAsRead } from "../hooks";
import { useRouter } from "next/navigation";

type Handler = (notification: NotificationDto) => void;

export const useNotificationClick = () => {
  const router = useRouter();
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const handlers: Record<NotificationType, Handler> = {
    SessionCreated: () => {
      router.push("/assistant/jobs");
    },

    SessionAccepted: () => {
      router.push("/client/requests");
    },

    SessionRejected: () => {
      router.push("/client/requests");
    },

    SessionCompleted: () => {
      router.push("/dashboard");
    },

    NewMessage: (notification) => {
      if (!notification.relatedEntityId) return;

      router.push(`/sessions/${notification.relatedEntityId}`);
    },

    ReviewCreated: () => {
      // no-op for now
    },
  };

  const handleClick = (notification: NotificationDto) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    const handler = handlers[notification.type];
    if (handler) {
      handler(notification);
    }
  };

  return { handleClick }
};
