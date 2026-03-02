import { cn } from "@/lib/utils";
import { Briefcase, CheckCircle2, Clock, LucideIcon, Star } from "lucide-react";

interface StatItem {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: "blue" | "green" | "purple" | "amber";
}

interface Props {
    jobsCompleted: number;
    successRate: string;
    experience: string;
    rating: number;
}

const COLOR_MAP = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    green: { bg: "bg-green-50", text: "text-green-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-600" },
};

export function AssistantStats({ jobsCompleted, successRate, experience, rating }: Props) {
    const stats: StatItem[] = [
        { label: "Jobs Finished", value: jobsCompleted, icon: Briefcase, color: "blue" },
        { label: "Success Rate", value: successRate, icon: CheckCircle2, color: "green" },
        { label: "Experience", value: experience, icon: Clock, color: "purple" },
        { label: "Avg. Rating", value: rating, icon: Star, color: "amber" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const { bg, text } = COLOR_MAP[stat.color];
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6
                       flex flex-col items-center text-center"
                    >
                        <div className={cn("p-3 rounded-2xl mb-4", bg, text)}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                    </div>
                );
            })}
        </div>
    );
}
