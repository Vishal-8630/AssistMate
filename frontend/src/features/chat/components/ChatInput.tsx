import { Send, Smile, Paperclip, Mic, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ChatInput = ({
  sendMessage,
  sendTyping,
  isConnected,
  sessionStatus,
}: any) => {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const isCompleted = sessionStatus === "completed";

  const commonEmojis = ["😊", "😂", "🥰", "👍", "❤️", "😮", "🙏", "🔥", "✨", "💯", "🎉", "🔥", "😜"];

  const handleSend = async () => {
    if (!input.trim() || !isConnected || isCompleted) return;

    await sendMessage(input.trim());
    setInput("");
  };

  const handleChange = (val: string) => {
    if (isCompleted) return;
    setInput(val);
    if (val.trim()) sendTyping();
  };

  const addEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-6 bg-white/70 backdrop-blur-md border-t border-slate-100">
      {!isCompleted ? (
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
            placeholder={
              isConnected
                ? "Write a message..."
                : "Connecting to secure server..."
            }
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-14 pr-28 py-4 text-sm 
                       focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 
                       transition-all shadow-inner placeholder:text-slate-400"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <div className="relative">
              {showEmojiPicker && (
                <div className="absolute bottom-16 right-0 bg-white border border-slate-100 rounded-2xl shadow-2xl p-3 grid grid-cols-5 gap-2 z-50 min-w-[240px] animate-in slide-in-from-bottom-2 duration-200">
                  {commonEmojis.map((emoji) => (
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
                  showEmojiPicker
                    ? "text-amber-500 bg-amber-50"
                    : "text-slate-400 hover:text-amber-500 hover:bg-amber-50",
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
      ) : (
        <div className="flex flex-col items-center justify-center py-4 px-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-1">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Session Completed</span>
          </div>
          <p className="text-[11px] text-slate-400">
            This conversation has been closed and is now read-only.
          </p>
        </div>
      )}
      <p className="mt-3 text-[10px] text-center text-slate-400 font-medium uppercase tracking-[0.2em]">
        End-to-end Encrypted Session
      </p>
    </div>
  );
};