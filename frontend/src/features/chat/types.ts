export interface SessionMessage {
    id: string;
    sessionId: string;
    senderId: string;
    content: string;
    createdAt: string;
    readAt?: string | null;
    parentMessageId?: string | null;
    parentMessage?: {
        id: string;
        content: string;
        senderId: string;
    } | null;
    reactions?: Array<{ userId: string; emoji: string }>;
}