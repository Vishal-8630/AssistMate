"use client";

import { Input } from "@/components/ui/input";
import { ProfileFormValues } from "../types";
import { RoleSelector } from "./RoleSelector";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { User, Mail, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  values: ProfileFormValues;
  onChange: (values: ProfileFormValues) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const ProfileForm = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  error,
}: Props) => {
  const update = <K extends keyof ProfileFormValues>(
    key: K,
    value: ProfileFormValues[K],
  ) => {
    onChange({ ...values, [key]: value });
  };

  if (isLoading) return <Loader text="Synchronizing profile data..." />;

  const InputWrapper = ({ label, icon: Icon, children }: { label: string, icon: any, children: React.ReactNode }) => (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-indigo-600 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 border-r border-slate-100 pr-3 group-focus-within:text-indigo-600 group-focus-within:border-indigo-100 transition-all">
          <Icon className="w-4 h-4" />
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">

      <RoleSelector
        role={values.role}
        onChange={(role) => update("role", role)}
      />

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InputWrapper label="First Name" icon={User}>
            <Input
              placeholder="e.g. John"
              value={values.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="pl-14 h-14 rounded-2xl bg-white border-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
            />
          </InputWrapper>

          <InputWrapper label="Last Name" icon={User}>
            <Input
              placeholder="e.g. Doe"
              value={values.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="pl-14 h-14 rounded-2xl bg-white border-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
            />
          </InputWrapper>
        </div>

        <InputWrapper label="Communication Interface" icon={Mail}>
          <Input
            type="email"
            placeholder="johndoe@example.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="pl-14 h-14 rounded-2xl bg-white border-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
          />
        </InputWrapper>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-[11px] font-bold text-center animate-in fade-in zoom-in-95">
            {error}
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full h-16 rounded-[1.5rem] bg-slate-900 text-white font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group"
        >
          Initialize Account
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
