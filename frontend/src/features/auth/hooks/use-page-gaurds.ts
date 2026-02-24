import { useRouter } from "next/navigation";
import {
  useRequireAuth,
  useRequireProfileCompletion,
  useRequireQueryParam,
} from "./use-auth-gaurds";
import { useRedirectIfAuthenticated } from "./use-auth-redirect";
import { useAuthStatus } from "./use-auth-status";
import { useEffect } from "react";

export const usePublicPageGaurd = () => {
  useRedirectIfAuthenticated("/dashboard");
  const { isLoading } = useAuthStatus();

  return { isLoading };
};

export const useProtectedPageGaurd = () => {
  useRequireAuth("/login");
  const { isLoading } = useAuthStatus();

  return { isLoading };
};

export const useProfileRequiredGaurd = () => {
  useRequireAuth("/login");
  useRequireProfileCompletion("/profile");
  const { isLoading } = useAuthStatus();

  return { isLoading };
};

export const useProfileIncompleteGuard = (
  loginRedirect: string = "/login",
  completeRedirect?: string,
) => {
  const router = useRouter();
  const { user, isLoading } = useAuthStatus();

  useRequireAuth(loginRedirect);

  useEffect(() => {
    if (completeRedirect && !isLoading && user?.isProfileCompleted) {
      router.replace(completeRedirect);
    }
  }, [user, isLoading, router, completeRedirect]);

  return { isLoading };
};

export const usePublicPageWithQueryGaurd = (
  queryValue: string | null,
  fallback: string,
) => {
  useRedirectIfAuthenticated("/dashboard");
  useRequireQueryParam(queryValue, fallback);
  const { isLoading } = useAuthStatus();

  return { isLoading };
};
