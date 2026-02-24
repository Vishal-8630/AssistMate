"use client";

import { Loader } from "@/components/ui/loader";
import { useRoleGaurd } from "@/features/auth/hooks/use-role-gaurd";
import { useServices } from "@/features/services/hooks";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  useRoleGaurd("client");
  
  const router = useRouter();

  const { data, isLoading } = useServices();

  if (isLoading) return <Loader text="Loading Services..." />;

  if (!data || data.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold mb-4">Available Services</h1>
        <p className="text-muted-foreground">
          No services available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Available Services</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map((service) => (
          <div
            key={service.id}
            onClick={() => router.push(`/services/${service.id}`)}
            className="rounded-2xl border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
          >
            <h2 className="text-lg font-medium mb-2">{service.name}</h2>

            {service.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {service.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
