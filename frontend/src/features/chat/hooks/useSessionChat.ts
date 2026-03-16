import { useEffect, useRef, useState } from "react";
import axios from "@/lib/api-client";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useSignalRConnection } from "./useSignalRConnection";
import { useChatMessages } from "./useChatMessages";
import { useChatPresence } from "./useChatPresence";
import { SessionMessage } from "../types";
import { useQueryClient } from "@tanstack/react-query";

export const useSessionChat = (sessionId: string) => {
  const { user } = useAuthStatus();

  const { connectionRef, connect, disconnect, isConnected } =
    useSignalRConnection();

  const { messages, setMessages, addMessage, markMessagesRead } =
    useChatMessages();

  const { onlineUsers, setInitialUsers, userOnline, userOffline } =
    useChatPresence();

  const [isTyping, setIsTyping] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [sessionStatus, setSessionStatus] = useState<"active" | "completed">(
    "active",
  );

  const [otherParticipant, setOtherParticipant] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [replyingTo, setReplyingTo] = useState<SessionMessage | null>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!sessionId) return;

    let isMounted = true;

    const init = async () => {
      try {
        // 1️⃣ Load message history
        const { data } = await axios.get(`/sessions/${sessionId}/messages`);
        if (!isMounted) return;
        setMessages(data);
        setIsMessagesLoading(false);

        // 2️⃣ Load session info
        const { data: sessionInfo } = await axios.get(`/sessions/${sessionId}`);

        if (isMounted && sessionInfo) {
          const currentId = user?.id?.toLowerCase();

          const assistantId = sessionInfo.assistantId?.toLowerCase();
          const assistantName = sessionInfo.assistantName || "Assistant";

          const clientId = sessionInfo.clientId?.toLowerCase();
          const clientName = sessionInfo.clientName || "Client";

          const isAssistant = assistantId === currentId;

          const participant = isAssistant
            ? { id: clientId, name: clientName }
            : { id: assistantId, name: assistantName };

          setOtherParticipant(participant);

          if (sessionInfo.status?.toLowerCase() === "completed") {
            setSessionStatus("completed");
          }
        }

        // 3️⃣ Connect SignalR
        const connection = await connect();
        if (!connection) return;

        connection.on("InitialOnlineUsers", (users: string[]) => {
          setInitialUsers(users, user?.id);
        });

        connection.on("UserOnline", userOnline);

        connection.on("UserOffline", userOffline);

        connection.on("ReceiveMessage", (message) => {
          addMessage(message);

          queryClient.invalidateQueries({
            queryKey: ["sessions", "unread-counts"],
          });

          if (message.senderId !== user?.id) {
            connection.invoke("MarkAsRead", sessionId);
          }
        });

        connection.on(
          "ReceiveReaction",
          (messageId: string, reactions: any[]) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === messageId ? { ...m, reactions } : m)),
            );
          },
        );

        connection.on(
          "MessagesRead",
          (sessionIdFromServer: string, userId: string) => {
            if (sessionIdFromServer !== sessionId) return;
            if (userId === user?.id) return;

            markMessagesRead(user?.id ?? "");
            queryClient.invalidateQueries({
              queryKey: ["sessions", "unread-counts"],
            });
          },
        );

        connection.on("SessionCompleted", (completedSessionId: string) => {
          if (completedSessionId === sessionId) {
            setSessionStatus("completed");
          }
        });

        connection.on("UserTyping", (userId: string) => {
          if (userId === user?.id) return;

          setIsTyping(true);

          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }

          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 2500);
        });

        await connection.invoke("JoinSession", sessionId);

        setTimeout(() => {
          connection.invoke("MarkAsRead", sessionId);

          queryClient.invalidateQueries({
            queryKey: ["sessions", "unread-counts"],
          });
        }, 100);
      } catch (error) {
        console.error("Chat init error:", error);
        setIsMessagesLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
      disconnect();
    };
  }, [sessionId]);

  const sendMessage = async (content: string) => {
    if (sessionStatus === "completed") return;

    const connection = connectionRef.current;
    if (!connection) return;

    await connection.invoke(
      "SendMessage",
      sessionId,
      content,
      replyingTo?.id || null,
    );
    setReplyingTo(null);
  };

  const sendReaction = async (messageId: string, emoji: string) => {
    const connection = connectionRef.current;
    if (!connection) return;

    await connection.invoke("SendReaction", sessionId, messageId, emoji);
  };

  const sendTyping = () => {
    if (sessionStatus === "completed") return;

    const connection = connectionRef.current;
    if (!connection) return;

    connection.invoke("Typing", sessionId);
  };

  return {
    messages,
    isMessagesLoading,
    sendMessage,
    sendReaction,
    sendTyping,
    isConnected,
    isTyping,
    onlineUsers,
    otherParticipant,
    sessionStatus,
    replyingTo,
    setReplyingTo,
  };
};
