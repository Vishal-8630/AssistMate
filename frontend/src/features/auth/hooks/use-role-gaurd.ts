import { UserRole } from "@/types/user";
import { useRouter } from "next/navigation";
import { useAuthStatus } from "./use-auth-status";
import { useEffect } from "react";

export const useRoleGaurd = (allowRole: UserRole) => {
  const router = useRouter();
  const { user, status } = useAuthStatus();

  useEffect(() => {
    if (status === "authenticated" && user?.role.toLowerCase() !== allowRole) {
      router.replace("/dashboard");
    }
  }, [user, status, allowRole, router]);
};
