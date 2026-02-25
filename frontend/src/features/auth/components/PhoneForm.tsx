"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

interface Props {
  phone: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const PhoneForm = ({
  phone,
  onChange,
  onSubmit,
  isLoading,
  error,
}: Props) => {
  const isValid = phone.length === 10;

  return (
    <div className="space-y-5">
      {/* Phone Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Phone Number
        </label>

        <Input
          type="tel"
          inputMode="numeric"
          placeholder="Enter 10-digit phone number"
          value={phone}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          maxLength={10}
          className="h-11 text-base"
        />

        <p className="text-xs text-muted-foreground">
          We'll send a verification code to this number.
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
            Sending OTP...
          </span>
        ) : (
          "Send OTP"
        )}
      </Button>
    </div>
  );
};