import { Input } from "@/components/ui/input";
import { ProfileFormValues } from "../types";
import { RoleSelector } from "./RoleSelector";
import { Button } from "@/components/ui/button";

interface Props {
  values: ProfileFormValues;
  onChange: (values: ProfileFormValues) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const ProfileForm = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  error,
}: Props) => {
  const update = <K extends keyof ProfileFormValues>(
    key: K,
    value: ProfileFormValues[K],
  ) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="First Name"
        value={values.firstName}
        onChange={(e) => update("firstName", e.target.value)}
      />

      <Input
        placeholder="Last Name"
        value={values.lastName}
        onChange={(e) => update("lastName", e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
      />

      <RoleSelector
        role={values.role}
        onChange={(role) => update("role", role)}
      />

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save & Continue"}
      </Button>
    </div>
  );
};
