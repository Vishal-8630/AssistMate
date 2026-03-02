export interface SessionMessage {
    id: string;
    sessionId: string;
    senderId: string;
    content: string;
    createdAt: string;
    readAt?: string | null;
}