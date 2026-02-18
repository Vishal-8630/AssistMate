"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated, phone, role } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) {
    return null; // or loading spinner
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">
        Welcome to AssistMate Dashboard
      </h1>

      <p>Phone: {phone}</p>
      <p>Role: {role}</p>
    </div>
  );
}
