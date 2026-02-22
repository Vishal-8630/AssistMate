export type UserRole = "client" | "assistant";

export interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber: string;
    role: UserRole;
    isActive: boolean;
    isProfileCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}