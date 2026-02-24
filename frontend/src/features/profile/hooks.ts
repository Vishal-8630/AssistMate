import { useAuthStore } from "@/store/auth.store";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UpdateProfileRequest, UpdateProfileResponse } from "./types";
import { updateProfile } from "./api";
import { setAccessToken } from "@/lib/token-manager";

export const useUpdateProfile = (): UseMutationResult<
  UpdateProfileResponse,
  Error,
  UpdateProfileRequest
> => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      setAccessToken(response.accessToken);
      setAuthenticated(response.user);
    },
  });
};
