import { useState } from "react";

export const useChatPresence = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const setInitialUsers = (users: string[], currentUserId?: string) => {
    const filtered = users
      .map((id) => id.toLowerCase())
      .filter((id) => id !== currentUserId?.toLowerCase());

    setOnlineUsers(filtered);
  };

  const userOnline = (userId: string) => {
    const normalized = userId.toLowerCase();

    setOnlineUsers((prev) =>
      prev.includes(normalized) ? prev : [...prev, normalized]
    );
  };

  const userOffline = (userId: string) => {
    const normalized = userId.toLowerCase();

    setOnlineUsers((prev) => prev.filter((id) => id !== normalized));
  };

  return {
    onlineUsers,
    setInitialUsers,
    userOnline,
    userOffline,
    setOnlineUsers,
  };
};