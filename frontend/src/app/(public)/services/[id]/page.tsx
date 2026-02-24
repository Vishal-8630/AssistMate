"use client";

import { Loader } from "@/components/ui/loader";
import { useAssistantsByService } from "@/features/services/hooks";
import { useParams, useRouter } from "next/navigation";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useAssistantsByService(id);

  if (isLoading) return <Loader text="Loading Assistants..." />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-muted-foreground hover:underline cursor-pointer"
      >
        ← Back to Services
      </button>

      <h1 className="text-3xl font-semibold mb-8">Available Assistants</h1>

      {data && data.length === 0 && (
        <p className="text-muted-foreground">
          No assistants available for this service.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((assistant: any) => (
          <div
            key={assistant.id}
            onClick={() => router.push(`/assistant/${assistant.id}`)}
            className="rounded-2xl border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
          >
            <h2 className="text-lg font-medium">
              {assistant.firstName} {assistant.lastName}
            </h2>

            {assistant.bio && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {assistant.bio}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
