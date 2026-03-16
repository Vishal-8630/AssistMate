import { Check, CheckCheck, Heart, MoreHorizontal, Reply, SmilePlus, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionMessage } from "../types";

interface Props {
  msg: SessionMessage;
  user: any;
  isLastMine: boolean;
  showTime: boolean;
  isSameAsPrev?: boolean;
  onReply?: (msg: SessionMessage) => void;
  onReaction?: (messageId: string, emoji: string) => void;
}

export const MessageBubble = ({ msg, user, isLastMine, showTime, isSameAsPrev, onReply, onReaction }: Props) => {
  const isMine = msg.senderId === user?.id;

  const isOnlyEmojis = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|\ufe0f)/g;
    const emojis = trimmed.match(emojiRegex);
    const withoutEmojis = trimmed.replace(emojiRegex, "").trim();
    return (
      withoutEmojis.length === 0 &&
      (emojis?.length || 0) > 0 &&
      (emojis?.length || 0) <= 6
    );
  };

  const onlyEmoji = isOnlyEmojis(msg.content);

  // Group reactions by emoji
  const reactions = msg.reactions || [];
  const groupedReactions = reactions.reduce((acc, curr) => {
    acc[curr.emoji] = (acc[curr.emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={cn("group/bubble", isSameAsPrev ? "mt-0.5" : "mt-4")}>
      {showTime && (
        <div className="flex justify-center my-4">
          <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 shadow-sm">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      )}

      <div className={cn("flex", isMine ? "justify-end" : "justify-start")}>
        <div
          className={cn(
            "flex flex-col max-w-[80%] md:max-w-[70%]",
            isMine ? "items-end" : "items-start"
          )}
        >
          {/* Parent Message Preview (Threaded Reply) */}
          {msg.parentMessage && (
            <div className={cn(
              "mb-1 px-3 py-2 bg-slate-100/50 border border-slate-200 rounded-2xl text-[11px] text-slate-500 max-w-full truncate animate-in slide-in-from-bottom-1 duration-300",
              isMine ? "mr-4 rounded-br-none" : "ml-4 rounded-bl-none"
            )}>
              <span className="font-bold block mb-0.5 text-indigo-500 text-[9px] uppercase tracking-wider">
                {msg.parentMessage.senderId === user?.id ? "You" : "Them"}
              </span>
              {msg.parentMessage.content}
            </div>
          )}

          <div className="relative group/msg">
            <div
              className={cn(
                "px-5 py-3.5 text-sm transition-all duration-200 backdrop-blur-sm relative",
                onlyEmoji
                  ? "bg-transparent shadow-none text-5xl p-0"
                  : isMine
                    ? cn("bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl shadow-indigo-100/50 shadow-sm", isSameAsPrev ? "rounded-tr-md" : "rounded-tr-none")
                    : cn("bg-white/80 text-slate-700 rounded-3xl border border-slate-100 shadow-slate-200/50 shadow-sm", isSameAsPrev ? "rounded-tl-md" : "rounded-tl-none")
              )}
            >
              {msg.content}

              {/* Reactions Display */}
              {Object.keys(groupedReactions).length > 0 && (
                <div className={cn(
                  "absolute -bottom-3 flex items-center gap-1 bg-white border border-slate-100 px-2 py-0.5 rounded-full shadow-md z-10 animate-in zoom-in duration-200",
                  isMine ? "right-2" : "left-2"
                )}>
                  {Object.entries(groupedReactions).map(([emoji, count]) => (
                    <div key={emoji} className="flex items-center gap-1">
                      <span className="text-[10px]">{emoji}</span>
                      {count > 1 && <span className="text-[9px] font-bold text-slate-400">{count}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Reactions Bar - Appears on Hover */}
            <div
              className={cn(
                "absolute -top-10 opacity-0 group-hover/msg:opacity-100 transition-all duration-200 z-10 flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-xl",
                isMine ? "right-0" : "left-0"
              )}
            >
              {["👍", "❤️", "😊", "🔥"].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => onReaction?.(msg.id, emoji)}
                  className="text-sm hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
              <div className="w-px h-3 bg-slate-200 mx-1" />
              <button
                onClick={() => onReply?.(msg)}
                className="p-1 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-indigo-500"
              >
                <Reply className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {isMine && isLastMine && (
            <div className="flex items-center gap-1 mt-1.5 px-2">
              <span className="text-[10px] text-slate-400 font-medium">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
};