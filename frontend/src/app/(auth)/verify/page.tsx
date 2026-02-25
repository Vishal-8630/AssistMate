"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { OtpForm } from "@/features/auth/components/OtpForm";
import { useVerifyOtp } from "@/features/auth/hooks/api-hooks";
import { usePublicPageWithQueryGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { validateOtp } from "@/features/auth/validation";
import { VerifyOtpResponse } from "@/types/auth";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  Clock,
  Fingerprint
} from "lucide-react";
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

  if (isLoading) return <Loader text="Verifying credentials..." />;
  if (!phone) return null;

  const handleSubmit = () => {
    const validationError = validateOtp(otp);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);

    verifyOtp.mutate(
      { phoneNumber: phone, otp },
      {
        onSuccess: (data: VerifyOtpResponse) => {
          router.push(
            data.user.isProfileCompleted ? "/dashboard" : "/onboarding"
          );
        },
        onError: (error: any) => {
          setFormError(
            error?.response?.data?.message ||
            "Invalid or expired code. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#FDFDFD] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -translate-y-1/2 -ml-64 z-0" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-12">

        {/* Left Security Section */}
        <div className="hidden lg:block space-y-12">
          <div className="space-y-6">
            <button
              onClick={() => router.push("/login")}
              className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to login
            </button>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Two-Factor <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Verification.
              </span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-sm leading-relaxed">
              We've sent a 6-digit secure code to your registered mobile number for extra protection.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { text: "Identity Encryption", icon: Fingerprint, color: "text-blue-600", bg: "bg-blue-50" },
              { text: "Real-time Verification", icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
              { text: "Automatic Session Timeout", icon: Clock, color: "text-slate-600", bg: "bg-slate-50" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", feature.bg, feature.color)}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 ring-1 ring-slate-100 overflow-hidden" />
              ))}
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Joined by 12,000+ others</p>
          </div>
        </div>

        {/* OTP Card */}
        <div className="w-full max-w-md mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          <Card className="w-full shadow-2xl border-none rounded-[2rem] overflow-hidden bg-white ring-1 ring-black/5 relative">
            <CardHeader className="pt-10 pb-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                  <Lock className="w-8 h-8 fill-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
                  Verify Number
                </CardTitle>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <p className="text-slate-500 font-medium text-sm">Sent to</p>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-sm">
                    {phone}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 p-10 pt-0">
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

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="h-px w-8 bg-slate-100" />
                  Code expires in 02:59
                  <span className="h-px w-8 bg-slate-100" />
                </div>

                <p className="text-xs text-center text-slate-400 font-medium">
                  Didn’t receive the code? {" "}
                  <button className="text-indigo-600 font-bold hover:underline">Resend Code</button>
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] font-medium text-slate-500 leading-normal">
                    Verification codes are valid for a single use only.
                    Do not share this code with anyone to maintain account security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
