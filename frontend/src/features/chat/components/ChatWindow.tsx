import { useSessionChat } from "../hooks/useSessionChat";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface Props {
  sessionId: string;
}

export const ChatWindow = ({ sessionId }: Props) => {
  const chat = useSessionChat(sessionId);
  const { user } = useAuthStatus();

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-100">
      <ChatHeader
        user={user}
        otherParticipant={chat.otherParticipant}
        onlineUsers={chat.onlineUsers}
        sessionStatus={chat.sessionStatus}
        sessionId={sessionId}
      />

      <ChatMessages
        messages={chat.messages}
        isTyping={chat.isTyping}
        user={user}
        otherParticipant={chat.otherParticipant}
      />

      <ChatInput
        sendMessage={chat.sendMessage}
        sendTyping={chat.sendTyping}
        isConnected={chat.isConnected}
        sessionStatus={chat.sessionStatus}
      />
    </div>
  );
};