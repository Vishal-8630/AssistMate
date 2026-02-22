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
  
  if (isLoading) return <Loader text="Sending OTP..." />

  return (
    <div className="space-y-4">
      <Input
        type="tel"
        placeholder="Enter 10-digit phone number"
        value={phone}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        maxLength={10}
      />

      <Button className="w-full" onClick={onSubmit} disabled={isLoading || phone.length != 10}>
        Send OTP
      </Button>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};
