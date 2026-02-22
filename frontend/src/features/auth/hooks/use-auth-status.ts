"use client"

import { useAuthStore } from "@/store/auth.store"

export const useAuthStatus = () => {
    const { status, user } = useAuthStore();

    return {
        status, 
        user,
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated",
        isUnauthenticated: status === "unauthenticated"
    };
};