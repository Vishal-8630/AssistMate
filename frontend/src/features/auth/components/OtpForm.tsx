"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

interface Props {
  otp: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const OtpForm = ({
  otp,
  onChange,
  onSubmit,
  isLoading,
  error,
}: Props) => {
  const isValid = otp.length === 6;

  return (
    <div className="space-y-5">
      {/* OTP Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Verification Code
        </label>

        <Input
          type="text"
          inputMode="numeric"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          className="h-11 text-base tracking-widest text-center"
        />

        <p className="text-xs text-muted-foreground">
          Enter the 6-digit code sent to your phone.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 text-center font-medium">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <Button
        className="w-full h-11 text-base font-semibold"
        onClick={onSubmit}
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader text="" />
            Verifying...
          </span>
        ) : (
          "Verify Code"
        )}
      </Button>
    </div>
  );
};