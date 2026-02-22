"use client";

import { Loader } from "@/components/ui/loader";
import { useMe } from "@/features/auth/hooks/api-hooks";
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
    return <Loader text="Loading..." />;
  }

  return <>{children}</>;
};
