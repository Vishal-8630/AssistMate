"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/api-hooks";
import { useProtectedPageGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { Loader } from "@/components/ui/loader";

export default function DashboardPage() {
  const router = useRouter();
  const logout = useLogout();

  const { isLoading } = useProtectedPageGaurd();
  const { user } = useAuthStatus();

  if (isLoading) return <Loader text="Loading dashboard..." />;
  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">
        Welcome to AssistMate Dashboard
      </h1>

      <div className="space-y-1 text-center text-sm text-muted-foreground">
        <p>
          <strong>Phone:</strong> {user.phoneNumber}
        </p>
        <p>
          <strong>Name:</strong> {user.firstName ?? "-"} {user.lastName ?? ""}
        </p>
        <p>
          <strong>Email:</strong> {user.email ?? "-"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      <div className="space-y-3 text-center">
        <Button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
