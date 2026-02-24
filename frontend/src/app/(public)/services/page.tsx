"use client";

import { Loader } from "@/components/ui/loader";
import { useServices } from "@/features/services/hooks";

export default function ServicesPage() {
  const { data, isLoading } = useServices();

  if (isLoading) return <Loader text="Loading Services..." />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Available Services</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-medium">{service.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
