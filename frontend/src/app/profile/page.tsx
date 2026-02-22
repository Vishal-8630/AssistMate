"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useUpdateProfile } from "@/features/profile/hooks";
import {
  ProfileFormValues,
  UpdateProfileRequest,
} from "@/features/profile/types";
import { validateProfile } from "@/features/profile/validation";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const updateProfile = useUpdateProfile();
  const { user, status } = useAuthStore();

  const [values, setValues] = useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    role: "client",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (user && user.firstName && user.lastName && user.role) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = () => {
    const validationError = validateProfile(values);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const payload: UpdateProfileRequest = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim() || null,
      role: values.role,
    };

    updateProfile.mutate(payload, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Failed to udpate profile");
      },
    });
  };

  if (status === "loading") {
    return null; // loader
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Complete Your Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProfileForm
            values={values}
            onChange={setValues}
            onSubmit={handleSubmit}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
