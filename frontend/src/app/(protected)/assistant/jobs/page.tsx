"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useProtectedPageGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  IndianRupee,
  Info,
  MessageSquare,
  MoreVertical,
  Search,
  ShieldCheck,
  User
} from "lucide-react";
import { useState } from "react";

export default function MyJobsPage() {
  const { isLoading } = useProtectedPageGaurd();
  const { user } = useAuthStatus();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  if (isLoading) return <Loader text="Synchronizing your projects..." />;
  if (!user) return null;

  const isAssistant = user.role.toLowerCase() === "assistant";

  // Dummy Job Data
  const jobs = {
    active: [
      { id: "1", title: "Physics Doubt Session", client: "Rahul Mehta", role: "Assistant", status: "In Progress", date: "Today, 4:00 PM", amount: "₹650", type: "Tutoring" },
      { id: "2", title: "Business Strategy Consultation", client: "Sneha Kapoor", role: "Assistant", status: "Starting Soon", date: "Tomorrow, 10:00 AM", amount: "₹1,200", type: "Advisory" },
    ],
    history: [
      { id: "3", title: "Math Help Session", client: "Priya Sharma", role: "Assistant", status: "Completed", date: "22 Feb, 2026", amount: "₹800", type: "Tutoring" },
      { id: "4", title: "Resume Review & Polish", client: "Amit Goel", role: "Assistant", status: "Completed", date: "20 Feb, 2026", amount: "₹500", type: "Career" },
      { id: "5", title: "React Debugging Session", client: "Vikram Singh", role: "Assistant", status: "Completed", date: "18 Feb, 2026", amount: "₹1,500", type: "Tech Support" },
    ]
  };

  const currentJobs = activeTab === "active" ? jobs.active : jobs.history;

  return (
    <div className="min-h-screen bg-[#FDFCFE] pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-tight text-sm uppercase">
              <Briefcase className="w-4 h-4" />
              Project Management
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {isAssistant ? "My Service Portfolio" : "My Hired Assistance"}
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Manage, track and optimize your active sessions and project history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 h-12 rounded-xl border-none ring-1 ring-black/5 bg-white text-sm font-medium w-64 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <Button variant="outline" className="h-12 px-4 rounded-xl border-slate-200">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Main List Area */}
          <div className="lg:col-span-3 space-y-8">

            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
              <button
                onClick={() => setActiveTab("active")}
                className={cn(
                  "px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === "active" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Active ({jobs.active.length})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === "history" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                History ({jobs.history.length})
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <Card key={job.id} className="border-none shadow-sm ring-1 ring-black/5 hover:ring-indigo-100 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Job Icon/Type */}
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
                        activeTab === "active" ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"
                      )}>
                        {job.type === "Tutoring" && <Clock className="w-7 h-7" />}
                        {job.type === "Advisory" && <Briefcase className="w-7 h-7" />}
                        {job.type === "Career" && <FileText className="w-7 h-7" />}
                        {job.type === "Tech Support" && <ExternalLink className="w-7 h-7" />}
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                              job.status === "In Progress" && "bg-emerald-50 text-emerald-600",
                              job.status === "Starting Soon" && "bg-amber-50 text-amber-600",
                              job.status === "Completed" && "bg-slate-100 text-slate-500",
                            )}>
                              {job.status}
                            </span>
                            <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {job.client}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="w-4 h-4" />
                            {job.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-indigo-600/70">
                            <IndianRupee className="w-4 h-4" />
                            {job.amount}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-black font-bold">
                          {activeTab === "active" ? "Join Session" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {currentJobs.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-400">No jobs found in this section.</h3>
                <Button variant="outline" className="rounded-xl">Browse Opportunities</Button>
              </div>
            )}
          </div>

          {/* Sidebar Context */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm ring-1 ring-black/5 bg-indigo-50/30 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black text-indigo-900 flex items-center gap-2 uppercase tracking-widest">
                  <Info className="w-4 h-4" />
                  Session Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-indigo-800/70 leading-relaxed font-medium">
                  All AssistMate sessions are recorded for quality assurance and safety.
                  Ensure you have a stable connection before joining live sessions.
                </p>
                <ul className="space-y-3">
                  {[
                    "Sessions start exactly on time",
                    "Payments are auto-released",
                    "Verified ID may be required",
                    "24/7 Support available"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px] font-bold text-indigo-900/60 uppercase tracking-tight">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Security Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Never share your account password or personal payment details outside of AssistMate's secure checkout.
                </p>
                <Button variant="link" className="text-xs p-0 h-auto font-bold text-indigo-600 hover:text-indigo-700">
                  Learn about Safety Center →
                </Button>
              </CardContent>
            </Card>

            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-500">Need Assistance?</h4>
              <p className="text-sm font-medium leading-relaxed text-slate-300">
                Facing issues with a job or a client? Our dispute resolution team is here 24/7.
              </p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl h-12">
                Contact Support
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
