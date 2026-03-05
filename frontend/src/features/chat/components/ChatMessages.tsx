import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { SessionMessage } from "../types";

interface Props {
  messages: SessionMessage[];
  user: any;
  isTyping: boolean;
  otherParticipant: { id: string; name: string } | null;
}

export const ChatMessages = ({ messages, user, isTyping, otherParticipant }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
      className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent relative"
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

      {messages.map((msg, idx) => {
        const isMine = msg.senderId === user?.id;
        const isLastMine = msg.id === lastMyMessageId;
        const showTime =
          idx === 0 ||
          new Date(msg.createdAt).getTime() -
          new Date(messages[idx - 1].createdAt).getTime() >
          300000;

        return (
          <MessageBubble
            key={msg.id}
            msg={msg}
            user={user}
            isLastMine={isLastMine}
            showTime={showTime}
          />
        );
      })}

      {isTyping && <TypingIndicator name={otherParticipant?.name} />}

      <div ref={bottomRef} className="h-2" />
    </div>
  );
};