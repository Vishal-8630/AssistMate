import { cn } from "@/lib/utils";

interface Props {
  counts: {
    Requested: number;
    Active: number;
    Completed: number;
    Rejected: number;
  };
}

export function JobsStats({ counts }: Props) {
  const stats = [
    { label: "Pending", count: counts.Requested, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active", count: counts.Active, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Completed", count: counts.Completed, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Rejected", count: counts.Rejected, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className={cn("rounded-2xl p-4 flex flex-col gap-1", stat.bg)}>
          <span className={cn("text-2xl font-black", stat.color)}>{stat.count}</span>
          <span className="text-xs font-bold text-slate-500">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}