export type NotificationType =
  | "SessionCreated"
  | "SessionAccepted"
  | "SessionRejected"
  | "SessionCompleted"
  | "ReviewCreated"
  | "NewMessage";

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
  relatedEntityId?: string;
}