"use client";

import { useMe } from "@/features/auth/hooks";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setAuthenticated, setUnauthenticated, status } = useAuthStore();

  const { data, isSuccess, isError, isLoading } = useMe();

  useEffect(() => {
    if (isSuccess && data) {
      setAuthenticated(data);
    }

    if (isError) {
      setUnauthenticated();
    }
  }, [isSuccess, isError, setAuthenticated, setUnauthenticated]);

  if (status === "loading" || isLoading) {
    return null; // or loader
  }

  return <>{children}</>;
};
