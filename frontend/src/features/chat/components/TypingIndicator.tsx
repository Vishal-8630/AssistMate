import { cn } from "@/lib/utils";

interface Props {
  name?: string;
}

export const TypingIndicator = ({ name }: Props) => {
  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="bg-white border border-slate-100 px-5 py-3 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
        </div>
        <span className="text-xs font-medium text-slate-400 italic">
          {name || "Someone"} is typing...
        </span>
      </div>
    </div>
  );
};