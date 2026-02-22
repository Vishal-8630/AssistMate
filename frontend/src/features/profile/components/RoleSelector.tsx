"use client";

import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";

interface Props {
  role: UserRole;
  onChange: (role: UserRole) => void;
}

export const RoleSelector = ({ role, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Role</label>

      <div className="flex gap-4">
        <Button
          type="button"
          variant={role === "client" ? "default" : "outline"}
          onClick={() => onChange("client")}
        >
          Client
        </Button>

        <Button
          type="button"
          variant={role === "assistant" ? "default" : "outline"}
          onClick={() => onChange("assistant")}
        >
          Assistant
        </Button>
      </div>
    </div>
  );
};
