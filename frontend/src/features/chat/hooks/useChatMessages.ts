import { useState } from "react";
import { SessionMessage } from "../types";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<SessionMessage[]>([]);

  const addMessage = (message: SessionMessage) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === message.id)) return prev;
      return [...prev, message];
    });
  };

  const markMessagesRead = (userId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.senderId === userId && !m.readAt
          ? { ...m, readAt: new Date().toISOString() }
          : m
      )
    );
  };

  return {
    messages,
    setMessages,
    addMessage,
    markMessagesRead,
  };
};