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

  if (isLoading) return <Loader text="Verifying OTP" />

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        maxLength={6}
      />

      <Button
        className="w-full"
        onClick={onSubmit}
        disabled={isLoading || otp.length != 6}
      >
        Verify OTP
      </Button>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};
