"use client";

import {
    CheckCheck,
    MessageSquare,
    Calendar,
    Star,
    Info,
    ChevronRight,
    Inbox
} from "lucide-react";
import { NotificationDto, NotificationType } from "../types";
import { cn } from "@/lib/utils";
import { useNotificationClick } from "../utils/useNotificationClick";

interface Props {
    notifications: NotificationDto[];
    isLoading: boolean;
    onClose: () => void;
}

const getNotificationIcon = (type?: NotificationType) => {
    switch (type) {
        case "SessionCreated":
            return <Calendar className="w-4 h-4 text-blue-500" />;
        case "SessionCompleted":
            return <CheckCheck className="w-4 h-4 text-emerald-500" />;
        case "NewMessage":
            return <MessageSquare className="w-4 h-4 text-indigo-500" />;
        case "ReviewCreated":
            return <Star className="w-4 h-4 text-amber-500" />;
        default:
            return <Info className="w-4 h-4 text-slate-400" />;
    }
};

const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export function NotificationDropdown({ notifications, isLoading, onClose }: Props) {
    const { handleClick } = useNotificationClick();

    return (
        <div className="absolute right-0 mt-3 w-[360px] bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl z-50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                    Notifications
                    {notifications.filter(n => !n.isRead).length > 0 && (
                        <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            {notifications.filter(n => !n.isRead).length}
                        </span>
                    )}
                </h3>
                <button
                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors"
                    onClick={() => {/* Mark all logic if available */ }}
                >
                    Recent
                </button>
            </div>

            {/* Content */}
            <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    <div className="p-10 flex flex-col items-center gap-3 text-slate-400">
                        <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                        <p className="text-xs font-bold uppercase tracking-widest">Loading...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-12 flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                            <Inbox className="w-8 h-8 text-slate-200" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-slate-800">All caught up!</p>
                            <p className="text-xs text-slate-400">No new notifications for you right now.</p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => handleClick(n)}
                                className={cn(
                                    "p-4 flex gap-4 cursor-pointer transition-all hover:bg-slate-50 relative group",
                                    !n.isRead && "bg-indigo-50/30"
                                )}
                            >
                                {/* Icon Container */}
                                <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                                    !n.isRead ? "bg-white shadow-sm ring-1 ring-black/5" : "bg-slate-100"
                                )}>
                                    {getNotificationIcon(n.type)}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0 space-y-0.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={cn(
                                            "text-sm tracking-tight truncate",
                                            !n.isRead ? "font-black text-slate-900" : "font-semibold text-slate-600"
                                        )}>
                                            {n.title}
                                        </p>
                                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                                            {getRelativeTime(n.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                                        {n.message}
                                    </p>
                                </div>

                                {!n.isRead && (
                                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-full" />
                                )}

                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                <button
                    onClick={onClose}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                >
                    Dismiss All
                </button>
            </div>
        </div>
    );
}
