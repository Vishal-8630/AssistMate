"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { OtpForm } from "@/features/auth/components/OtpForm";
import { useVerifyOtp } from "@/features/auth/hooks/api-hooks";
import { usePublicPageWithQueryGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { validateOtp } from "@/features/auth/validation";
import { VerifyOtpResponse } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  const { isLoading } = usePublicPageWithQueryGaurd(phone, "/login");

  const verifyOtp = useVerifyOtp();
  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  if (isLoading) return <Loader text="Loading..." />;
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
          router.push(data.user.isProfileCompleted ? "/dashboard" : "/profile");
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
