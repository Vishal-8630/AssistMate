"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useProtectedPageGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock,
  CreditCard,
  IndianRupee,
  LayoutDashboard,
  Plus,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { isLoading } = useProtectedPageGaurd();
  const { user } = useAuthStatus();

  if (isLoading) return <Loader text="Loading your workspace..." />;
  if (!user) return null;

  const isAssistant = user.role.toLowerCase() === "assistant";

  // Dummy Dashboard Data
  const stats = isAssistant ? [
    { label: "Total Earnings", value: "₹12,500", icon: IndianRupee, trend: "+12.5%", color: "emerald" },
    { label: "Active Jobs", value: "3", icon: Activity, trend: "Stable", color: "blue" },
    { label: "Completed", value: "24", icon: CheckCircle2, trend: "+2", color: "indigo" },
    { label: "Avg Rating", value: "4.8", icon: Star, trend: "Top 5%", color: "amber" },
  ] : [
    { label: "Total Spent", value: "₹8,400", icon: IndianRupee, trend: "-15%", color: "rose" },
    { label: "Active Requests", value: "2", icon: Activity, trend: "Stable", color: "blue" },
    { label: "Hired Total", value: "12", icon: Users, trend: "+1", color: "indigo" },
    { label: "Satisfaction", value: "100%", icon: Star, trend: "Great", color: "amber" },
  ];

  const recentActivity = [
    { title: "Session with Priya S.", time: "2 hours ago", type: "completed", amount: "₹800" },
    { title: "Documentation Review", time: "5 hours ago", type: "ongoing", amount: null },
    { title: "New Message from Arjun", time: "1 day ago", type: "message", amount: null },
    { title: "Payout Processed", time: "2 days ago", type: "payment", amount: "₹4,200" },
  ];

  const upcomingSessions = [
    { user: "Rahul Mehta", topic: "Mathematics Help", time: "Tomorrow, 10:00 AM", duration: "60 mins" },
    { user: "Sneha Kapoor", topic: "General Consultation", time: "26 Feb, 04:30 PM", duration: "30 mins" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFE] pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-tight text-sm uppercase">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user.firstName || "Friend"}!
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              You have <span className="text-indigo-600 font-bold">{isAssistant ? "3 active jobs" : "2 active requests"}</span> to look at today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200">
              <Bell className="w-5 h-5" />
            </Button>
            <Button className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100">
              <Plus className="w-5 h-5 mr-2" />
              {isAssistant ? "Find New Jobs" : "Request Assistant"}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden group hover:ring-indigo-200 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "p-3 rounded-2xl",
                    stat.color === "emerald" && "bg-emerald-50 text-emerald-600",
                    stat.color === "blue" && "bg-blue-50 text-blue-600",
                    stat.color === "indigo" && "bg-indigo-50 text-indigo-600",
                    stat.color === "amber" && "bg-amber-50 text-amber-600",
                    stat.color === "rose" && "bg-rose-50 text-rose-600",
                  )}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                    stat.trend.startsWith("+") ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-500"
                  )}>
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content: Activity & Chart Placeholder */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Chart Area */}
            <Card className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Performance Trend</CardTitle>
                    <p className="text-sm text-slate-500 font-medium">Monthly engagement and output</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                    +22% this week
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {/* Visual Placeholder for a Chart */}
                <div className="h-48 w-full flex items-end gap-2 pt-4">
                  {[45, 60, 30, 80, 50, 90, 70, 40, 65, 85, 55, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-indigo-100 rounded-t-lg hover:bg-indigo-500 transition-all duration-300 relative group"
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 font-bold">View History</Button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl ring-1 ring-black/5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center font-bold",
                        act.type === "completed" && "bg-green-50 text-green-600",
                        act.type === "ongoing" && "bg-blue-50 text-blue-600",
                        act.type === "message" && "bg-purple-50 text-purple-600",
                        act.type === "payment" && "bg-amber-50 text-amber-600",
                      )}>
                        {act.type === "completed" && <CheckCircle2 className="w-5 h-5" />}
                        {act.type === "ongoing" && <Clock className="w-5 h-5" />}
                        {act.type === "message" && <Bell className="w-5 h-5" />}
                        {act.type === "payment" && <CreditCard className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{act.title}</p>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{act.time}</p>
                      </div>
                    </div>
                    {act.amount && (
                      <div className="text-right">
                        <p className="font-black text-slate-900">{act.amount}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Success</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area: Upcoming & Quick Actions */}
          <div className="space-y-8">
            <Card className="border-none shadow-xl ring-1 ring-black/5 overflow-hidden bg-indigo-900 text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-300" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingSessions.map((session, i) => (
                  <div key={i} className="space-y-2 group cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-indigo-100 group-hover:text-white transition-colors">{session.user}</p>
                      <ArrowUpRight className="w-4 h-4 text-indigo-400" />
                    </div>
                    <p className="text-xs font-medium text-indigo-300">{session.topic}</p>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1.5 rounded-lg w-fit">
                      {session.time} • {session.duration}
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-white text-indigo-900 hover:bg-slate-100 font-bold border-none shadow-lg">
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">System Status</h3>
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">API Latency</p>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[95%]" />
                </div>
                <p className="text-[10px] font-bold text-slate-500">All systems operational in your region.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <Link href="/profile" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white ring-1 ring-black/5 hover:bg-indigo-50 transition-colors group">
                <Users className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Teams</span>
              </Link>
              <Link href="/profile" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white ring-1 ring-black/5 hover:bg-indigo-50 transition-colors group">
                <TrendingUp className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Growth</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
