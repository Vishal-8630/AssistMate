import { useState } from "react";
import { useSessionChat } from "../hooks/useSessionChat";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useSessionReview } from "@/features/review/hooks";
import ReviewModal from "@/features/review/components/ReviewModal";

interface Props {
  sessionId: string;
}

export const ChatWindow = ({ sessionId }: Props) => {
  const chat = useSessionChat(sessionId);
  const { user } = useAuthStatus();

  const { data: existingReview, isLoading: reviewLoading } =
    useSessionReview(sessionId);

  const [reviewOpen, setReviewOpen] = useState(false);

  const handleOpenReview = () => {
    if (!existingReview) {
      setReviewOpen(true);
    }
  };

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

      {chat.sessionStatus === "completed" && (
        <div className="p-4 border-t bg-white flex justify-center">

          <button
            onClick={handleOpenReview}
            disabled={!!existingReview || reviewLoading}
            className={`px-4 py-2 rounded-lg text-white transition
              ${
                existingReview
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {existingReview ? "Review Submitted" : "Leave Review"}
          </button>

        </div>
      )}

      <ChatInput
        sendMessage={chat.sendMessage}
        sendTyping={chat.sendTyping}
        isConnected={chat.isConnected}
        sessionStatus={chat.sessionStatus}
      />

      <ReviewModal
        sessionId={sessionId}
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
      />

    </div>
  );
};