import api from "@/lib/api-client";
import {
  RefreshTokenResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth";
import { User } from "@/types/user";

export const sendOtp = async (
  payload: SendOtpRequest,
): Promise<SendOtpResponse> => {
  const { data } = await api.post<SendOtpResponse>("/auth/send-otp", payload);
  return data;
};

export const verifyOtp = async (
  payload: VerifyOtpRequest,
): Promise<VerifyOtpResponse> => {
  const { data } = await api.post<VerifyOtpResponse>(
    "/auth/verify-otp",
    payload,
  );
  return data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const { data } = await api.post<RefreshTokenResponse>("/auth/refresh-token");
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
}

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<{ user: User }>("/users/me");
  return data.user;
};
