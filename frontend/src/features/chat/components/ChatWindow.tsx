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
        onReply={chat.setReplyingTo}
        onReaction={chat.sendReaction}
      />

      {chat.sessionStatus === "completed" && (
        <div className="bg-gradient-to-r from-emerald-50 to-indigo-50 border-b border-indigo-100 p-3 shadow-inner z-10">
          <div className="flex justify-center animate-in slide-in-from-top-2 fade-in duration-500">
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-md border border-indigo-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-slate-700">Session Complete</span>
              </div>
              <div className="w-px h-5 bg-slate-200" />
              <button
                onClick={handleOpenReview}
                disabled={!!existingReview || reviewLoading}
                className={`text-sm font-bold uppercase tracking-wider transition-colors
                  ${existingReview
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-indigo-600 hover:text-indigo-700 hover:scale-105 active:scale-95"
                  }`}
              >
                {existingReview ? "Review Submitted" : "Leave Review →"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ChatInput
        sendMessage={chat.sendMessage}
        sendTyping={chat.sendTyping}
        isConnected={chat.isConnected}
        sessionStatus={chat.sessionStatus}
        replyingTo={chat.replyingTo}
        onCancelReply={() => chat.setReplyingTo(null)}
      />

      <ReviewModal
        sessionId={sessionId}
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
      />

    </div>
  );
};