"use client";

import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";
import { User, Briefcase, CheckCircle2 } from "lucide-react";

interface Props {
  role: UserRole;
  onChange: (role: UserRole) => void;
}

export const RoleSelector = ({ role, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Your Purpose</label>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange("client")}
          className={cn(
            "relative flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300 group",
            role === "client"
              ? "bg-indigo-50 border-indigo-600 shadow-lg shadow-indigo-100/50"
              : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
            role === "client" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
          )}>
            <User className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className={cn("font-black text-sm uppercase tracking-wider", role === "client" ? "text-indigo-900" : "text-slate-600")}>Client</p>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">I need help</p>
          </div>
          {role === "client" && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-white" />
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange("assistant")}
          className={cn(
            "relative flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300 group",
            role === "assistant"
              ? "bg-indigo-50 border-indigo-600 shadow-lg shadow-indigo-100/50"
              : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
            role === "assistant" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
          )}>
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className={cn("font-black text-sm uppercase tracking-wider", role === "assistant" ? "text-indigo-900" : "text-slate-600")}>Assistant</p>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">I want to help</p>
          </div>
          {role === "assistant" && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-white" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
