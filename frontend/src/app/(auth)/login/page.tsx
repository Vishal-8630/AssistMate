"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSendOtp } from "@/features/auth/hooks/api-hooks";
import { PhoneForm } from "@/features/auth/components/PhoneForm";
import { validatePhone } from "@/features/auth/validation";
import { Loader } from "@/components/ui/loader";
import { usePublicPageGaurd } from "@/features/auth/hooks/use-page-gaurds";

export default function LoginPage() {
  const router = useRouter();
  const sendOtp = useSendOtp();

  const { isLoading } = usePublicPageGaurd();

  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  if (isLoading) return <Loader text="Loading..." />;

  const handleSubmit = () => {
    const validationError = validatePhone(phone);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);

    sendOtp.mutate(
      { phoneNumber: phone },
      {
        onSuccess: () => {
          router.push(`/verify?phone=${phone}`);
        },
        onError: (error: any) => {
          setFormError(
            error?.response?.data?.message ||
              "Failed to send OTP. Please try again",
          );
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to AssistMate
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <PhoneForm
            phone={phone}
            onChange={setPhone}
            onSubmit={handleSubmit}
            isLoading={sendOtp.isPending}
            error={formError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
