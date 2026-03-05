import { Check, CheckCheck, Heart, MoreHorizontal, Reply, SmilePlus, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionMessage } from "../types";

interface Props {
  msg: SessionMessage;
  user: any;
  isLastMine: boolean;
  showTime: boolean;
}

export const MessageBubble = ({ msg, user, isLastMine, showTime }: Props) => {
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

  return (
    <div className="space-y-1 group/bubble">
      {showTime && (
        <div className="flex justify-center my-4">
          <span className="px-3 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
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
          <div className="relative group/msg">
            <div
              className={cn(
                "px-5 py-3.5 text-sm transition-all duration-200 backdrop-blur-sm",
                onlyEmoji
                  ? "bg-transparent shadow-none text-5xl p-0"
                  : isMine
                    ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl rounded-tr-none shadow-indigo-100/50 shadow-sm"
                    : "bg-white/80 text-slate-700 rounded-3xl rounded-tl-none border border-slate-100 shadow-slate-200/50 shadow-sm"
              )}
            >
              {msg.content}
            </div>

            {/* Quick Reactions Bar - Appears on Hover */}
            <div
              className={cn(
                "absolute -top-10 opacity-0 group-hover/msg:opacity-100 transition-all duration-200 z-10 flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-xl",
                isMine ? "right-0" : "left-0"
              )}
            >
              <button className="text-xs hover:scale-125 transition-transform">
                <ThumbsUp className="w-3.5 h-3.5 text-indigo-500" />
              </button>
              <button className="text-xs hover:scale-125 transition-transform">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
              </button>
              <button className="text-xs hover:scale-125 transition-transform">
                <SmilePlus className="w-3.5 h-3.5 text-amber-500" />
              </button>
              <div className="w-px h-3 bg-slate-200 mx-1" />
              <button className="text-xs hover:scale-125 transition-transform">
                <Reply className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button className="text-xs hover:scale-125 transition-transform">
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
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