"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { getMe, logoutUser, sendOtp, verifyOtp } from "./api";
import { useAuthStore } from "@/store/auth.store";
import { clearAccessToken, setAccessToken } from "@/lib/token-manager";
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth";
import { User } from "@/types/user";
import { useEffect } from "react";

export const useSendOtp = (): UseMutationResult<
  SendOtpResponse,
  Error,
  SendOtpRequest
> => {
  return useMutation<SendOtpResponse, Error, SendOtpRequest>({
    mutationFn: sendOtp,
  });
};

export const useVerifyOtp = (): UseMutationResult<
  VerifyOtpResponse,
  Error,
  VerifyOtpRequest
> => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: verifyOtp,
    onSuccess: (data: VerifyOtpResponse) => {
      setAccessToken(data.accessToken);
      setAuthenticated(data.user);
    },
  });
};

export const useMe = (): UseQueryResult<User, Error> => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setUnauthenticated = useAuthStore((s) => s.setUnauthenticated);

  const query = useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setAuthenticated(query.data);
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    setAuthenticated,
    setUnauthenticated,
  ]);

  return query;
};

export const useLogout = (): (() => Promise<void>) => {
  const queryClient = useQueryClient();
  const setUnauthenticated = useAuthStore((s) => s.setUnauthenticated);

  return async (): Promise<void> => {
    try {
      await logoutUser();
    } catch (error: any) {
      console.log("Error logging out: ", error);
    }
    clearAccessToken();
    setUnauthenticated();
    queryClient.clear();
  };
};
