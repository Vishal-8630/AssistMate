"use client";

import { Loader } from "@/components/ui/loader";
import { useMe } from "@/features/auth/hooks/api-hooks";
import { useNotificationRealtime } from "@/features/notifications/useNotificationRealtime";
import { getAccessToken } from "@/lib/token-manager";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode, useEffect, useMemo } from "react";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setAuthenticated, setUnauthenticated, status } = useAuthStore();

  const { data, isSuccess, isError, isLoading } = useMe();

  const accessToken = useMemo(() => {
    if (status !== "authenticated") return null;
    return getAccessToken();
  }, [status]);
  
  useNotificationRealtime(accessToken);

  useEffect(() => {
    if (isSuccess && data) {
      setAuthenticated(data);
    }

    if (isError) {
      setUnauthenticated();
    }
  }, [isSuccess, isError, setAuthenticated, setUnauthenticated]);

  if (status === "loading" || isLoading) {
    return <Loader text="Loading..." />;
  }

  return <>{children}</>;
};
