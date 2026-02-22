import { useRouter } from "next/navigation";
import { useAuthStatus } from "./use-auth-status";
import { useEffect } from "react";

export const useRequireAuth = (redirectTo: string = "/login") => {
  const router = useRouter();
  const { isUnauthenticated, isLoading } = useAuthStatus();

  useEffect(() => {
    if (!isLoading && isUnauthenticated) {
      router.replace(redirectTo);
    }
  }, [isUnauthenticated, isLoading, router, redirectTo]);
};

export const useRequireProfileCompletion = (
  redirectTo: string = "/profile",
) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (isAuthenticated && !user?.isProfileCompleted) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, user, router, redirectTo]);
};

export const useRequireQueryParam = (
  value: string | null,
  redirectTo: string,
) => {
  const router = useRouter();
  const { isLoading } = useAuthStatus();

  useEffect(() => {
    if (!isLoading && !value) {
      router.replace(redirectTo);
    }
  }, [value, isLoading, router, redirectTo]);
};
