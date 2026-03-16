"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { AssistantHero } from "@/features/assistant/components/AssistantHero";
import { AssistantReviews } from "@/features/assistant/components/AssistantReviews";
import { AssistantSidebar } from "@/features/assistant/components/AssistantSidebar";
import { AssistantStats } from "@/features/assistant/components/AssistantStats";
import { useAssistant } from "@/features/assistant/hooks";
import { AssistantProfile } from "@/features/assistant/types";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useAssistantReviews } from "@/features/review/hooks";
import { useParams, useRouter } from "next/navigation";

export default function AssistantProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStatus();

  const { data, isLoading } = useAssistant(id);
  const assistant = data as AssistantProfile;

  const { data: reviewsData, isLoading: reviewsLoading } = useAssistantReviews(id);

  if (isLoading) return <Loader text="Loading Profile..." />;

  if (!data)
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Assistant not found</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          The profile you're looking for might have been moved or deleted.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/assistants")}
          className="mt-8"
        >
          Browse Assistants
        </Button>
      </div>
    );

  // Realistic Dummy Data (to be replaced by API props)
  const meta = {
    rating: reviewsData?.averageRating ?? 0,
    totalReviews: reviewsData?.totalReviews ?? 0,
    jobsCompleted: 218,
    successRate: "99%",
    responseTime: "Typically 15 minutes",
    experience: "5+ Years",
    location: "Mumbai, India",
    languages: ["English", "Hindi", "Marathi"],
    joinedDate: "October 2023",
    verified: true,
    isAvailable: true,
  };

  const handleStartConversation = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role.toLowerCase() !== "client") {
      router.push("/dashboard");
      return;
    }

    console.log("Starting session with: ", assistant.id);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <AssistantHero
        assistant={assistant}
        meta={{
          rating: meta.rating,
          totalReviews: meta.totalReviews,
          location: meta.location,
          joinedDate: meta.joinedDate,
          verified: meta.verified,
          isAvailable: meta.isAvailable,
          languages: meta.languages,
          responseTime: meta.responseTime,
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <AssistantStats
              jobsCompleted={meta.jobsCompleted}
              successRate={meta.successRate}
              experience={meta.experience}
              rating={meta.rating}
            />

            <AssistantReviews reviews={reviewsData?.reviews ?? []} isLoading={reviewsLoading}/>
          </div>

          {/* Right Column */}
          <AssistantSidebar
            services={assistant.services}
            assistantId={assistant.id}
            firstName={assistant.firstName}
            onMessage={handleStartConversation}
          />
        </div>
      </main>
    </div>
  );
}
