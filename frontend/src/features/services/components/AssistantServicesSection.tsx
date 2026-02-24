"use client";

import { useEffect, useState } from "react";
import { useServices, useMyServices, useUpdateMyServices } from "../hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { usePathname, useRouter } from "next/navigation";

export function AssistantServicesSection() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: services, isLoading: loadingServices } = useServices();
  const { data: myServices, isLoading: loadingMine } = useMyServices();
  const updateMyServices = useUpdateMyServices();

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (myServices) {
      setSelected(myServices.map((s) => s.id));
    }
  }, [myServices]);

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    updateMyServices.mutate(
      { serviceIds: selected },
      {
        onSuccess: () => {
          if (pathname === "/onboarding") {
            router.push("/dashboard");
          }
        },
      },
    );
  };

  if (loadingServices || loadingMine) {
    return <Loader text="Loading services..." />;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Select Services You Provide</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {services?.map((service) => {
            const isSelected = selected.includes(service.id);

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  isSelected ? "border-primary bg-primary/5" : "hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{service.name}</span>
                  <input type="checkbox" checked={isSelected} readOnly />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          disabled={updateMyServices.isPending}
          className="mt-6 w-full rounded-lg bg-primary py-2 text-white disabled:opacity-50"
        >
          {updateMyServices.isPending ? "Saving..." : "Save Services"}
        </button>
      </CardContent>
    </Card>
  );
}
