"use client";

import { Service } from "@/features/services/types";
import { cn } from "@/lib/utils";

interface Props {
  services: Service[];
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
        Select Service
      </h3>

      <div className="space-y-2">
        {services.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border transition-all",
                isSelected
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
              )}
            >
              <p className="font-semibold">{service.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}