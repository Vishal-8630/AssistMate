"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useAssistant } from "@/features/assistant/hooks";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useParams, useRouter } from "next/navigation";

export default function AssistantProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStatus();

  const { data, isLoading } = useAssistant(id);

  if (isLoading) return <Loader text="Loading Profile..." />;

  if (!data) return <div>Assistant not found.</div>;

  const handleStartConversation = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role.toLowerCase() !== "client") {
      router.push("/dashboard");
      return;
    }

    console.log("Start session with: ", data.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-semibold">
        {data.firstName} {data.lastName}
      </h1>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-3">Services</h2>
        <div className="flex flex-wrap gap-2">
          {data.services.map((service: any) => (
            <span
              key={service.id}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full"
            >
              {service.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Button onClick={handleStartConversation}>Start Conversation</Button>
      </div>
    </div>
  );
}
