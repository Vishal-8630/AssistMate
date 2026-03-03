"use client";

import { Loader } from "@/components/ui/loader";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useProtectedPageGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { useMySessions } from "@/features/sessions/hooks";
import { FilterTab, filterSessionsByStatus, getSessionCounts } from "@/features/sessions/utils/sessionFilters";
import { JobsHeader } from "@/features/sessions/components/JobsHeader";
import { JobsStats } from "@/features/sessions/components/JobsStats";
import { JobsTabs } from "@/features/sessions/components/JobsTabs";
import { JobsContent } from "@/features/sessions/components/JobsContent";
import { useMemo, useState } from "react";

export default function AssistantJobsPage() {
  const { isLoading: authLoading } = useProtectedPageGaurd();
  const { user } = useAuthStatus();
  const { data: sessions, isLoading, isError, refetch, isFetching } = useMySessions();

  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filtered = useMemo(
    () => filterSessionsByStatus(sessions, activeTab),
    [sessions, activeTab]
  );

  const counts = useMemo(
    () => getSessionCounts(sessions),
    [sessions]
  );

  if (authLoading) return <Loader text="Loading your jobs..." />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pb-24">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <JobsHeader
          badgeLabel="Assistant Portal"
          title="My Jobs"
          subtitle="Manage incoming service requests and active sessions."
          isRefreshing={isFetching}
          onRefresh={refetch}
        />

        <JobsStats counts={counts} />

        <JobsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />

        <JobsContent
          isLoading={isLoading}
          isError={isError}
          sessions={filtered}
          activeTab={activeTab}
          refetch={refetch}
          viewMode="assistant"
        />

      </main>
    </div>
  );
}