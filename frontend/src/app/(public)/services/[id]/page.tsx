"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useAssistantsByService, useServices } from "@/features/services/hooks";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Search,
  Star,
  MapPin,
  MessageSquare,
  Zap,
  ShieldCheck,
  MoreHorizontal,
  Briefcase,
  ChevronRight,
  Filter
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: assistants, isLoading: loadingAssistants } = useAssistantsByService(id);
  const { data: allServices, isLoading: loadingServices } = useServices();
  const [search, setSearch] = useState("");

  if (loadingAssistants || loadingServices) return <Loader text="Scouting top-tier assistants..." />;

  const service = allServices?.find(s => s.id === id);
  const filteredAssistants =
    assistants?.filter((assistant: any) =>
      `${assistant.firstName} ${assistant.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) ?? [];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">

      {/* ================= HEADER / BREADCRUMB ================= */}
      <section className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-bold">
            <button
              onClick={() => router.push("/services")}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Explorer
            </button>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-900">{service?.name || "Service Details"}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            Active Marketplace
          </div>
        </div>
      </section>

      {/* ================= HERO ================= */}
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Available <span className="text-indigo-600 uppercase italic">Experts</span> for {service?.name}
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl">
              {service?.description || "Connect with pre-vetted professionals specialized in this domain for immediate, high-quality assistance."}
            </p>
          </div>
          <div className="lg:col-span-1">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search specialists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 h-14 rounded-2xl bg-white ring-1 ring-black/5 shadow-xl shadow-indigo-100/30 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 font-black text-slate-900 uppercase text-[10px] tracking-widest">
            <Filter className="w-4 h-4 text-indigo-600" />
            Scanned {filteredAssistants.length} Potential Matches
          </div>
        </div>

        {filteredAssistants.length === 0 ? (
          <Card className="border-none bg-slate-50 border-2 border-dashed border-slate-200 py-32 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm mb-6">
              <Briefcase className="w-8 h-8 text-slate-200" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Technician Not Found</h2>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">
              Our top-tier experts for this specific niche are currently unavailable or match your query.
            </p>
            <Button onClick={() => setSearch("")} variant="outline" className="rounded-xl border-slate-200 font-bold px-8">Refresh Listings</Button>
          </Card>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssistants.map((assistant: any, i: number) => {
              const rating = (4.7 + Math.random() * 0.3).toFixed(1);
              const isTopMatch = i === 0;

              return (
                <Card
                  key={assistant.id}
                  className={cn(
                    "group border-none shadow-sm ring-1 ring-black/5 hover:ring-indigo-100 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer",
                    isTopMatch && "ring-indigo-600/50 shadow-2xl shadow-indigo-100"
                  )}
                  onClick={() => router.push(`/assistant/${assistant.id}`)}
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {isTopMatch && (
                      <div className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 flex items-center justify-between">
                        Top Marketplace Match
                        <Zap className="w-3.5 h-3.5 fill-white" />
                      </div>
                    )}

                    <div className="p-8 space-y-6 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-black/10 ring-4 ring-white">
                          {assistant.firstName?.[0]}{assistant.lastName?.[0]}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {assistant.firstName} {assistant.lastName}
                            </h2>
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-black text-slate-900">{rating}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">• 24+ Sessions</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                        {assistant.bio || "High-performance professional committed to delivering exceptional results and real-time support."}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <MapPin className="w-4 h-4 text-slate-300" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Mumbai, India</span>
                      </div>
                    </div>

                    <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-indigo-600">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Chat Active</span>
                      </div>
                      <Button className="rounded-xl bg-slate-900 group-hover:bg-indigo-600 transition-colors h-10 px-6 font-bold shadow-lg">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

    </div>
  );
}
