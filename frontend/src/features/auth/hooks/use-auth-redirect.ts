"use client";

import { useRouter } from "next/navigation";
import { useAuthStatus } from "./use-auth-status";
import { useEffect } from "react";

export const useRedirectIfAuthenticated = (
  redirectTo: string = "/dashboard",
) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);
};

export const useRedirectIfUnauthenticated = (redirectTo: string = "/login") => {
  const router = useRouter();
  const { isUnauthenticated } = useAuthStatus();

  useEffect(() => {
    if (isUnauthenticated) {
      router.replace(redirectTo);
    }
  }, [isUnauthenticated, router, redirectTo]);
};
