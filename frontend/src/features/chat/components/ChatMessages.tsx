import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowDown, MessageSquareHeart } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { SessionMessage } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  messages: SessionMessage[];
  user: any;
  isTyping: boolean;
  isLoading: boolean;
  otherParticipant: { id: string; name: string } | null;
  onReply: (msg: SessionMessage) => void;
  onReaction: (messageId: string, emoji: string) => void;
}

export const ChatMessages = ({ messages, user, isTyping, isLoading, otherParticipant, onReply, onReaction }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // ... (getDateLabel and scrollToBottom preserved)

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    // If within current week
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined });
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
    setShowScrollButton(false);
  };

  const lastMyMessageId = useMemo(() => {
    const myMessages = messages.filter((m) => m.senderId === user?.id);
    return myMessages.length > 0 ? myMessages[myMessages.length - 1].id : null;
  }, [messages, user?.id]);

  useEffect(() => {
    if (messages.length === 0) return;

    if (isInitialLoad) {
      scrollToBottom("auto");
      setIsInitialLoad(false);
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const isMine = lastMessage.senderId === user?.id;

    if (isMine) {
      scrollToBottom("smooth");
      return;
    }

    const container = scrollContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 150;
      if (isAtBottom) {
        scrollToBottom("smooth");
      } else {
        setShowScrollButton(true);
      }
    }
  }, [messages, user?.id, isInitialLoad]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 50;
    if (isAtBottom && showScrollButton) {
      setShowScrollButton(false);
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent relative flex flex-col gap-1"
    >
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-full shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all animate-bounce"
        >
          <ArrowDown className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            New Messages
          </span>
        </button>
      )}

      {isLoading && (
        <div className="space-y-6 animate-pulse p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={cn("flex items-end gap-3", i % 2 === 0 ? "flex-row" : "flex-row-reverse")}>
              <div className="w-8 h-8 rounded-full bg-slate-100" />
              <div className={cn("h-16 rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm", i % 2 === 0 ? "w-2/3" : "w-1/2")} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-1 min-h-[300px] text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-2 shadow-inner group">
            <MessageSquareHeart className="w-12 h-12 text-indigo-300 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">No messages yet</h3>
            <p className="text-slate-400 max-w-[200px] mx-auto text-sm leading-relaxed">
              Start a friendly conversation with your {user?.role?.toLowerCase() === "assistant" ? "client" : "assistant"}.
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => {
        const isMine = msg.senderId === user?.id;
        const isLastMine = msg.id === lastMyMessageId;
        const showTime =
          idx === 0 ||
          new Date(msg.createdAt).getTime() -
          new Date(messages[idx - 1].createdAt).getTime() >
          300000;

        const lastMessage = idx > 0 ? messages[idx - 1] : null;
        const isSameAsPrev = lastMessage?.senderId === msg.senderId && !showTime;

        const isNewDay = !lastMessage ||
          new Date(msg.createdAt).toDateString() !== new Date(lastMessage.createdAt).toDateString();

        return (
          <div key={msg.id} className="contents">
            {isNewDay && (
              <div className="flex justify-center my-6 sticky top-0 z-30 pointer-events-none">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-slate-100 shadow-sm pointer-events-auto">
                  {getDateLabel(msg.createdAt)}
                </span>
              </div>
            )}
            <MessageBubble
              msg={msg}
              user={user}
              isLastMine={isLastMine}
              showTime={showTime}
              isSameAsPrev={isSameAsPrev}
              onReply={onReply}
              onReaction={onReaction}
            />
          </div>
        );
      })}

      {isTyping && <TypingIndicator name={otherParticipant?.name} />}

      <div ref={bottomRef} className="h-2" />
    </div>
  );
};