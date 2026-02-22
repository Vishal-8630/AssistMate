"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import {
  useProfileIncompleteGaurd,
  useProtectedPageGaurd,
} from "@/features/auth/hooks/use-page-gaurds";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useUpdateProfile } from "@/features/profile/hooks";
import {
  ProfileFormValues,
  UpdateProfileRequest,
} from "@/features/profile/types";
import { validateProfile } from "@/features/profile/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const updateProfile = useUpdateProfile();

  const { isLoading } = useProfileIncompleteGaurd();

  const [values, setValues] = useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    role: "client",
  });

  const [error, setError] = useState<string | null>(null);

  if (isLoading) return <Loader text="Loading profile..." />;

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
