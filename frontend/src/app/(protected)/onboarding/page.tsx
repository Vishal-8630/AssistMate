"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useProfileIncompleteGuard } from "@/features/auth/hooks/use-page-gaurds";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useUpdateProfile } from "@/features/profile/hooks";
import {
  ProfileFormValues,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/features/profile/types";
import { validateProfile } from "@/features/profile/validation";
import { AssistantServicesSection } from "@/features/services/components/AssistantServicesSection";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const updateProfile = useUpdateProfile();
  const { isLoading } = useProfileIncompleteGuard();

  const [values, setValues] = useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    role: "client",
  });

  const [error, setError] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);

  if (isLoading) return <Loader text="Preparing your account..." />;

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
      onSuccess: async () => {
        if (values.role == "assistant") {
          setProfileSaved(true);
        } else {
          router.replace("/dashboard");
        }
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Failed to update profile");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Complete Your Account
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

        {profileSaved && values.role === "assistant" && (
          <AssistantServicesSection />
        )}
      </div>
    </div>
  );
}
