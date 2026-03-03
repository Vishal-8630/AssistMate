import { useEffect, useMemo, useRef, useState } from "react";
import { useSessionChat } from "../hooks/useSessionChat";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import {
  Send,
  User,
  MoreVertical,
  CheckCheck,
  Check,
  Phone,
  Video,
  ArrowDown,
  Paperclip,
  Smile,
  Mic,
  MoreHorizontal,
  ThumbsUp,
  Heart,
  SmilePlus,
  Reply
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  sessionId: string;
}

export const ChatWindow = ({ sessionId }: Props) => {
  const {
    messages,
    sendMessage,
    sendTyping,
    isConnected,
    isTyping,
    onlineUsers,
    otherParticipant,
  } = useSessionChat(sessionId);

  const { user } = useAuthStatus();
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const commonEmojis = ["😊", "😂", "🥰", "👍", "❤️", "😮", "🙏", "🔥", "✨", "💯", "🎉", "🔥", "😜"];

  const isOtherOnline = otherParticipant ? onlineUsers.includes(otherParticipant.id) : false;

  const lastMyMessageId = useMemo(() => {
    const myMessages = messages.filter((m) => m.senderId === user?.id);
    return myMessages.length > 0 ? myMessages[myMessages.length - 1].id : null;
  }, [messages, user?.id]);

  const addEmoji = (emoji: string) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const isOnlyEmojis = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    // Updated regex to handle variation selectors (like for red heart) and a wider range of emojis
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|\ufe0f)/g;
    const emojis = trimmed.match(emojiRegex);
    const withoutEmojis = trimmed.replace(emojiRegex, '').trim();
    return withoutEmojis.length === 0 && (emojis?.length || 0) > 0 && (emojis?.length || 0) <= 6;
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
    setShowScrollButton(false);
  };

  // 1️⃣ Scroll Logic on New Messages
  useEffect(() => {
    if (messages.length === 0) return;

    // Handle initial load jump
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

    // Checking if user is at bottom
    const container = scrollContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 150;
      if (isAtBottom) {
        scrollToBottom("smooth");
      } else {
        setShowScrollButton(true);
      }
    }
  }, [messages, user?.id, isInitialLoad]);

  // 2️⃣ Monitor scroll to hide button if manual scroll to bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
    if (isAtBottom && showScrollButton) {
      setShowScrollButton(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !isConnected) return;
    await sendMessage(input.trim());
    setInput("");
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value.trim()) sendTyping();
  };

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-100">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white">
              {otherParticipant?.name ? getInitials(otherParticipant.name) : <User className="w-6 h-6" />}
            </div>
            {isOtherOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm ring-1 ring-green-100 animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">
              {otherParticipant?.name || "Loading..."}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                isOtherOnline ? "text-green-500" : "text-slate-400"
              )}>
                {isOtherOnline ? "Online Now" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent relative"
      >
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={() => scrollToBottom("smooth")}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-full shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all animate-bounce"
          >
            <ArrowDown className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">New Messages</span>
          </button>
        )}
        {messages.map((msg, idx) => {
          const isMine = msg.senderId === user?.id;
          const isLastMine = msg.id === lastMyMessageId;
          const showTime = idx === 0 || new Date(msg.createdAt).getTime() - new Date(messages[idx - 1].createdAt).getTime() > 300000;

          return (
            <div key={msg.id} className="space-y-1">
              {showTime && (
                <div className="flex justify-center my-4">
                  <span className="px-3 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
              <div className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "flex flex-col max-w-[80%] md:max-w-[70%]",
                  isMine ? "items-end" : "items-start"
                )}>
                  <div className="relative group/msg">
                    <div className={cn(
                      "px-5 py-3.5 text-sm transition-all duration-200 backdrop-blur-sm",
                      isOnlyEmojis(msg.content)
                        ? "bg-transparent shadow-none text-5xl p-0"
                        : isMine
                          ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl rounded-tr-none shadow-indigo-100/50 shadow-sm"
                          : "bg-white/80 text-slate-700 rounded-3xl rounded-tl-none border border-slate-100 shadow-slate-200/50 shadow-sm"
                    )}>
                      {msg.content}
                    </div>

                    {/* Quick Reactions Bar - Appears on Hover */}
                    <div className={cn(
                      "absolute -top-10 opacity-0 group-hover/msg:opacity-100 transition-all duration-200 z-10 flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-xl",
                      isMine ? "right-0" : "left-0"
                    )}>
                      <button className="text-xs hover:scale-125 transition-transform"><ThumbsUp className="w-3.5 h-3.5 text-indigo-500" /></button>
                      <button className="text-xs hover:scale-125 transition-transform"><Heart className="w-3.5 h-3.5 text-rose-500" /></button>
                      <button className="text-xs hover:scale-125 transition-transform"><SmilePlus className="w-3.5 h-3.5 text-amber-500" /></button>
                      <div className="w-px h-3 bg-slate-200 mx-1" />
                      <button className="text-xs hover:scale-125 transition-transform"><Reply className="w-3.5 h-3.5 text-slate-400" /></button>
                      <button className="text-xs hover:scale-125 transition-transform"><MoreHorizontal className="w-3.5 h-3.5 text-slate-400" /></button>
                    </div>
                  </div>

                  {isMine && isLastMine && (
                    <div className="flex items-center gap-1 mt-1.5 px-2">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        {msg.readAt ? "Seen" : "Delivered"}
                      </span>
                      {msg.readAt ? (
                        <CheckCheck className="w-3 h-3 text-indigo-500" />
                      ) : (
                        <Check className="w-3 h-3 text-slate-300" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="bg-white border border-slate-100 px-5 py-3 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
              </div>
              <span className="text-xs font-medium text-slate-400 italic">Typing...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div className="p-6 bg-white/70 backdrop-blur-md border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative group"
        >
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <Paperclip className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            disabled={!isConnected}
            placeholder={isConnected ? "Write a message..." : "Connecting to secure server..."}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-14 pr-28 py-4 text-sm 
                       focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 
                       transition-all shadow-inner placeholder:text-slate-400"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <div className="relative">
              {showEmojiPicker && (
                <div className="absolute bottom-16 right-0 bg-white border border-slate-100 rounded-2xl shadow-2xl p-3 grid grid-cols-5 gap-2 z-50 min-w-[240px] animate-in slide-in-from-bottom-2 duration-200">
                  {commonEmojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="text-2xl p-2 hover:bg-slate-50 rounded-xl transition-all hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  showEmojiPicker ? "text-amber-500 bg-amber-50" : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                )}
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={!isConnected || !input.trim()}
              className="w-11 h-11 bg-indigo-600 text-white rounded-xl 
                         flex items-center justify-center hover:bg-indigo-700 disabled:opacity-30 
                         disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 active:scale-95 ml-1"
            >
              <Send className="w-5 h-5 fill-current" />
            </button>
          </div>
        </form>
        <p className="mt-3 text-[10px] text-center text-slate-400 font-medium uppercase tracking-[0.2em]">
          End-to-end Encrypted Session
        </p>
      </div>
    </div>
  );
};