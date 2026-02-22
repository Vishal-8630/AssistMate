"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OtpForm } from "@/features/auth/components/OtpForm";
import { useVerifyOtp } from "@/features/auth/hooks";
import { validateOtp } from "@/features/auth/validation";
import { useAuthStore } from "@/store/auth.store";
import { VerifyOtpResponse } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { status } = useAuthStore();

  const phone = searchParams.get("phone");
  const verifyOtp = useVerifyOtp();

  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    if (!phone && status !== "loading") {
      router.replace("/login");
    }
  }, [phone, status, router]);

  if (status === "loading") return null;
  if (!phone) return null;

  const handleSubmit = () => {
    const validationError = validateOtp(otp);

    if (validationError) {
      setFormError(validationError);
      return null;
    }

    setFormError(null);

    verifyOtp.mutate(
      { phoneNumber: phone, otp },
      {
        onSuccess: (data: VerifyOtpResponse) => {
          if (!data.user.isProfileCompleted) {
            router.push("/profile");
          } else {
            router.push("/dashboard");
          }
        },
        onError: (error: any) => {
          setFormError(
            error?.response?.data?.message || "Invalid OTP. Please try again.",
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
            Verify OTP
          </CardTitle>
        </CardHeader>

        <CardContent>
          <OtpForm
            otp={otp}
            onChange={(value) => {
              setOtp(value);
              setFormError(null);
            }}
            onSubmit={handleSubmit}
            isLoading={verifyOtp.isPending}
            error={formError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
