import { useAuthStore } from "@/store/auth.store";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UpdateProfileRequest, UpdateProfileResponse } from "./types";
import { updateProfile } from "./api";

export const useUpdateProfile = (): UseMutationResult<
  UpdateProfileResponse,
  Error,
  UpdateProfileRequest
> => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      setAuth(response.user);
    },
  });
};
