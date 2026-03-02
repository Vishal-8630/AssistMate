import { Inbox, Clock, CheckCircle2, Briefcase, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterTab } from "../utils/sessionFilters";

interface Props {
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
  counts: Record<string, number>;
}

const TABS = [
  { id: "All", label: "All", icon: Inbox },
  { id: "Requested", label: "Requests", icon: Clock },
  { id: "Active", label: "Active", icon: CheckCircle2 },
  { id: "Completed", label: "Completed", icon: Briefcase },
  { id: "Rejected", label: "Rejected", icon: XCircle },
] as const;

export function JobsTabs({ activeTab, setActiveTab, counts }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const count = counts[tab.id as keyof typeof counts];

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as FilterTab)}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                : "bg-white text-slate-500 ring-1 ring-black/5 hover:bg-slate-50"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {tab.label}
            {count > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-600">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}