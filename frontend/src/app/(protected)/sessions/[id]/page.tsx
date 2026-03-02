"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/api-client";
import { ChatWindow } from "@/features/chat/components/ChatWindow";
import { useProtectedPageGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { Loader } from "@/components/ui/loader";

export default function SessionChatPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading } = useProtectedPageGaurd();

  if (isLoading) return <Loader text="Loading session..." />;

  return (
    <div className="h-[calc(100vh-120px)] p-6 flex justify-center">
      <div className="w-full max-w-4xl h-full">
        <ChatWindow sessionId={id} />
      </div>
    </div>
  );
}