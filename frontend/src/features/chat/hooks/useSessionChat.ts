import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "@/lib/api-client";
import { getAccessToken } from "@/lib/token-manager";
import { SessionMessage } from "../types";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";

export const useSessionChat = (sessionId: string) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentUserIdRef = useRef<string | undefined>(undefined);

  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [otherParticipant, setOtherParticipant] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user } = useAuthStatus();

  // Keep latest user id
  useEffect(() => {
    currentUserIdRef.current = user?.id;
  }, [user?.id]);

  // Cleanup on logout
  useEffect(() => {
    if (!user) {
      const connection = connectionRef.current;
      if (connection) {
        connection.stop().catch(() => {});
        connectionRef.current = null;
      }
      setIsConnected(false);
      setOnlineUsers([]);
    }
  }, [user]);

  useEffect(() => {
    if (!sessionId) return;

    let isMounted = true;

    const safeInvoke = async (method: string, ...args: any[]) => {
      const connection = connectionRef.current;
      if (!connection) return;
      if (connection.state !== signalR.HubConnectionState.Connected) return;

      try {
        await connection.invoke(method, ...args);
      } catch (error) {
        console.warn(`${method} skipped:`, error);
      }
    };

    const init = async () => {
      try {
        // 1️⃣ Load chat history
        const { data } = await axios.get<SessionMessage[]>(
          `/sessions/${sessionId}/messages`,
        );

        if (!isMounted) return;
        setMessages(data);

        // 1.5️⃣ Fetch session details
        const { data: sessionInfo } = await axios.get<any>(
          `/sessions/${sessionId}`,
        );

        if (isMounted && sessionInfo) {
          const currentId = currentUserIdRef.current?.toLowerCase();

          const assistantId = (
            sessionInfo.assistantId || sessionInfo.AssistantId
          )?.toLowerCase();
          const assistantName =
            sessionInfo.assistantName ||
            sessionInfo.AssistantName ||
            "Assistant";

          const clientId = (
            sessionInfo.clientId || sessionInfo.ClientId
          )?.toLowerCase();
          const clientName =
            sessionInfo.clientName || sessionInfo.ClientName || "Client";

          const isAssistant = assistantId === currentId;

          const participant = isAssistant
            ? { id: clientId, name: clientName }
            : { id: assistantId, name: assistantName };

          setOtherParticipant(participant);
        }

        // 2️⃣ Create connection
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(`${process.env.NEXT_PUBLIC_SIGNALR_URL}/hubs/session`, {
            accessTokenFactory: () => getAccessToken() ?? "",
          })
          .withAutomaticReconnect()
          .build();

        connectionRef.current = connection;

        // 🔁 Reconnect Handling
        connection.onreconnecting(() => {
          setIsConnected(false);
        });

        connection.onreconnected(async () => {
          if (!isMounted) return;

          setIsConnected(true);

          if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.invoke("JoinSession", sessionId);
          }
        });

        connection.onclose(() => {
          setIsConnected(false);
        });

        // 📩 LISTENERS

        connection.on("InitialOnlineUsers", (users: string[]) => {
          const filteredUsers = users
            .map((id) => id.toLowerCase())
            .filter((id) => id !== currentUserIdRef.current?.toLowerCase());

          setOnlineUsers(filteredUsers);
        });

        connection.on("UserOnline", (userId: string) => {
          const normalizedId = userId.toLowerCase();

          setOnlineUsers((prev) =>
            prev.includes(normalizedId) ? prev : [...prev, normalizedId],
          );
        });

        connection.on("UserOffline", (userId: string) => {
          const normalizedId = userId.toLowerCase();

          setOnlineUsers((prev) => prev.filter((id) => id !== normalizedId));
        });

        connection.on("ReceiveMessage", (message: SessionMessage) => {
          setMessages((prev) => {
            if (prev.some((m) => m.id === message.id)) return prev;

            return [...prev, message];
          });

          if (message.senderId !== currentUserIdRef.current) {
            safeInvoke("MarkAsRead", sessionId);
          }
        });

        connection.on("UserTyping", (userId: string) => {
          if (userId !== currentUserIdRef.current) {
            setIsTyping(true);

            setTimeout(() => {
              setIsTyping(false);
            }, 2500);
          }
        });

        connection.on(
          "MessagesRead",
          (sessionIdFromServer: string, userId: string) => {
            if (sessionIdFromServer !== sessionId) return;

            if (userId === currentUserIdRef.current) return;

            setMessages((prev) =>
              prev.map((m) =>
                m.senderId === currentUserIdRef.current && !m.readAt
                  ? {
                      ...m,
                      readAt: new Date().toISOString(),
                    }
                  : m,
              ),
            );
          },
        );

        // 🚀 START CONNECTION
        await connection.start();

        if (!isMounted) return;

        setIsConnected(true);

        await connection.invoke("JoinSession", sessionId);

        setTimeout(() => {
          safeInvoke("MarkAsRead", sessionId);
        }, 100);
      } catch (error) {
        console.error("SignalR init error:", error);
      }
    };

    init();

    // 🧹 CLEANUP
    return () => {
      isMounted = false;

      const connection = connectionRef.current;

      if (connection) {
        if (connection.state === signalR.HubConnectionState.Connected) {
          connection.invoke("LeaveSession", sessionId).catch(() => {});
        }

        connection.stop().catch(() => {});
        connectionRef.current = null;
      }

      setIsConnected(false);
      setOnlineUsers([]);
    };
  }, [sessionId]);

  // ✉️ Send Message
  const sendMessage = async (content: string) => {
    const connection = connectionRef.current;
    if (!connection) return;

    if (connection.state !== signalR.HubConnectionState.Connected) return;

    await connection.invoke("SendMessage", sessionId, content);
  };

  // ⌨️ Send Typing
  const sendTyping = () => {
    const connection = connectionRef.current;
    if (!connection) return;

    if (connection.state !== signalR.HubConnectionState.Connected) return;

    if (typingTimeoutRef.current) return;

    connection.invoke("Typing", sessionId);

    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
    }, 2000);
  };

  const disconnect = async () => {
    const connection = connectionRef.current;
    if (!connection) return;

    await connection.stop();
    connectionRef.current = null;
  };

  return {
    messages,
    sendMessage,
    sendTyping,
    isConnected,
    isTyping,
    onlineUsers,
    otherParticipant,
    disconnect,
  };
};
