"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const FAKE_OTP = "123456";
  const isValidPhone = /^\d{10}$/.test(phone.trim());
  const isValidOtp = /^\d{6}$/.test(otp.trim());

  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setPhone(numericValue);
    setError("");
  }

  const handleOtpChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setOtp(numericValue);
    setError("");
  }

  const handleSendOtp = () => {
    if (!isValidPhone) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    setLoading(true);

    // simulate API delay for sending OTP
    setTimeout(() => {
        setLoading(false);
        setOtpSent(true);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (!isValidOtp) {
      setError("OTP must be 6 digits");
      return;
    }

    if (otp.trim() !== FAKE_OTP) {
        setError("Invalid OTP");
        return;
    }

    // Temporary: client login without real backend verification
    login(phone, "client");
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to AssistMate
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              <Input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={10}
              />
              <Button className="w-full" onClick={handleSendOtp}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                maxLength={6}
              />
              <Button className="w-full" onClick={handleVerifyOtp}>
                Verify OTP
              </Button>
            </>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
