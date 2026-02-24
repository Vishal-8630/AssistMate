import { User, UserRole } from "@/types/user";

export interface ProfileFormValues {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}

export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    email?: string | null;
    role: UserRole;
}

export interface UpdateProfileResponse {
    accessToken: string;
    user: User
}