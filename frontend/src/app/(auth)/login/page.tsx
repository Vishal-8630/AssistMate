"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSendOtp } from "@/features/auth/hooks";
import { PhoneForm } from "@/features/auth/components/PhoneForm";
import { validatePhone } from "@/features/auth/validation";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const sendOtp = useSendOtp();

  const { status } = useAuthStore();

  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return null;
  if (status === "authenticated") return null;

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
