import axios from "@/lib/api-client";
import { User, Phone, Video, MoreVertical, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  user: any;
  otherParticipant: { id: string; name: string } | null;
  onlineUsers: string[];
  sessionStatus: "active" | "completed";
  sessionId: string;
}

export const ChatHeader = ({
  user,
  otherParticipant,
  onlineUsers,
  sessionStatus,
  sessionId,
}: Props) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const isCompleted = sessionStatus === "completed";

  const isOtherOnline = otherParticipant
    ? onlineUsers.includes(otherParticipant.id)
    : false;

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

  const handleCompleteSession = async () => {
    if (!confirm("Are you sure you want to complete this session? This will make the chat read-only for both participants.")) return;

    setIsCompleting(true);

    try {
      await axios.post(`/sessions/${sessionId}/complete`);
    } catch (error) {
      console.error("Failed to complete session:", error);
      alert("Failed to complete session. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex justify-between items-center shadow-sm z-30">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white transition-transform group-hover:scale-105 duration-200">
            {otherParticipant?.name ? (
              getInitials(otherParticipant.name)
            ) : (
              <User className="w-6 h-6" />
            )}
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
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                isOtherOnline ? "text-green-500" : "text-slate-400"
              )}
            >
              {isOtherOnline ? "Online Now" : "Offline"}
            </span>
            {isCompleted && (
              <>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Completed
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isCompleted && user?.role.toLowerCase() === "client" && (
          <button
            onClick={handleCompleteSession}
            disabled={isCompleting}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-2xl font-bold text-[10px] uppercase tracking-wider transition-all border border-emerald-100 shadow-sm mr-2 active:scale-95 disabled:opacity-50"
          >
            {isCompleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {isCompleting ? "Processing..." : "Finish Session"}
          </button>
        )}

        {!isCompleted && (
          <>
            <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100 group">
              <Phone className="w-5 h-5 transition-transform group-active:scale-90" />
            </button>

            <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100 group">
              <Video className="w-5 h-5 transition-transform group-active:scale-90" />
            </button>
          </>
        )}

        <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 transition-all border border-transparent hover:border-slate-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};