"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Flag,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useCreateSession } from "@/features/sessions/hooks";
import { Service } from "@/features/services/types";

interface Props {
  assistantId: string;
  firstName: string;
  services: Service[];
  onMessage: () => void;
}

export function AssistantSidebar({
  assistantId,
  firstName,
  services,
  onMessage,
}: Props) {
  const router = useRouter();
  const { user } = useAuthStatus();
  const { mutate: createSession, isPending } = useCreateSession();

  const [isSaved, setIsSaved] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  const handleRequestService = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role.toLowerCase() !== "client") {
      router.push("/dashboard");
      return;
    }

    if (!selectedServiceId) return;

    createSession(
      {
        assistantId,
        serviceId: selectedServiceId,
      },
      {
        onSuccess: () => {
          router.push("/client/requests");
        },
        onError: (error: any) => {
          const message = error?.response?.data?.message || "Unable to create session. Please try again.";
          console.log("Error while creating session: ", message);
        }
      }
    );
  };

  return (
    <div className="sticky top-8 space-y-6">
      <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className="h-2 bg-indigo-600" />

        <div className="p-8 space-y-6">
          <h3 className="text-2xl font-bold">Connect</h3>

          <p className="text-slate-600 text-sm">
            Interested in working with {firstName}? Select a service and send a request.
          </p>

          {/* ── Service Selection ───────────────────────────── */}
          {services?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Select Service
              </h4>

              <div className="space-y-2">
                {services.map((service) => {
                  const isSelected = selectedServiceId === service.id;

                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold",
                        isSelected
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                      )}
                    >
                      {service.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Action Buttons ───────────────────────────── */}
          <div className="space-y-3 pt-2">
            <Button
              disabled={!selectedServiceId || isPending}
              onClick={handleRequestService}
              className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 font-bold disabled:opacity-50"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {isPending ? "Sending Request..." : "Request Service"}
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 text-lg font-bold"
              onClick={onMessage}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Message First
            </Button>
          </div>

          {/* ── Pricing & Trust ───────────────────────────── */}
          <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Standard Rate</span>
              <span className="text-slate-900 font-bold">$25/hr</span>
            </div>

            <div className="flex items-center justify-between text-sm text-green-600 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Secure Payment
              </span>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ───────────────────────────── */}
      <div className="flex flex-wrap gap-6 justify-center">
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={cn(
            "flex items-center gap-2 transition-colors text-sm font-semibold",
            isSaved
              ? "text-rose-600"
              : "text-slate-500 hover:text-rose-600"
          )}
        >
          <Heart
            className={cn("w-4 h-4", isSaved && "fill-rose-600")}
          />
          {isSaved ? "Saved" : "Save Assistant"}
        </button>

        <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold">
          <Share2 className="w-4 h-4" /> Share
        </button>

        <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-semibold">
          <Flag className="w-4 h-4" /> Report
        </button>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .52-.88l7-4a1 1 0 0 1 .96 0l7 4A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}