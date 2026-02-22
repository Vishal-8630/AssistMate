import api from "@/lib/api-client";
import { UpdateProfileRequest, UpdateProfileResponse } from "./types";

export const updateProfile = async (
  payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  console.log("Profile data: ", payload);
  const { data } = await api.put<UpdateProfileResponse>(
    "/users/profile",
    payload,
  );

  return data;
};
