"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useRoleGaurd } from "@/features/auth/hooks/use-role-gaurd";
import { useServices, useServiceCategories } from "@/features/services/hooks";
import { cn } from "@/lib/utils";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronDown,
  BookOpen,
  Code,
  Briefcase,
  Heart,
  Settings,
  Layers,
  LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  education: BookOpen,
  tech: Code,
  business: Briefcase,
  lifestyle: Heart,
  other: Settings,
  default: Layers,
};

export default function ServicesPage() {
  useRoleGaurd("client");

  const router = useRouter();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useServiceCategories();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    if (!categoriesData)
      return [{ id: "all", label: "All Services", icon: Sparkles }];

    const dynamic = categoriesData.map((cat) => ({
      id: cat.toLowerCase(),
      label: cat,
      icon: ICON_MAP[cat.toLowerCase()] || ICON_MAP.default,
    }));

    return [{ id: "all", label: "All Services", icon: Sparkles }, ...dynamic];
  }, [categoriesData]);

  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "all" ||
        service.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [services, search, activeCategory]);

  const counts = useMemo(() => {
    if (!services) return {};
    return services.reduce((acc: any, s) => {
      const cat = s.category.toLowerCase();
      acc[cat] = (acc[cat] || 0) + 1;
      acc["all"] = (acc["all"] || 0) + 1;
      return acc;
    }, {});
  }, [services]);

  if (servicesLoading || categoriesLoading)
    return <Loader text="Unlocking professional potential..." />;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      {/* ================= HERO & SEARCH ================= */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest shadow-sm mx-auto">
            <Zap className="w-4 h-4" />
            Find Expertise Instantly
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              Explore Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Expert Hub
              </span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Connect with verified specialists for real-time collaboration,
              tutoring, and professional support.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="What are you looking for? (e.g. React Debugging, Physics Tutor)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 h-16 rounded-[2rem] bg-white border-none ring-1 ring-black/5 shadow-2xl shadow-indigo-100/50 text-base font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* ================= SIDEBAR / FILTERS ================= */}
        <aside className="lg:col-span-1 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Service Categories
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative",
                    activeCategory === cat.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <cat.icon
                    className={cn(
                      "w-5 h-5 transition-transform group-hover:scale-110",
                      activeCategory === cat.id
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                  <span className="flex-1 text-left">{cat.label}</span>
                  <span
                    className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded-full",
                      activeCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {counts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Card className="border-none shadow-sm ring-1 ring-black/5 bg-slate-900 text-white overflow-hidden p-8 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-lg">Verified Safety</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Every assistant is vetted through our rigorous certification
                process.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-slate-700 bg-transparent text-white hover:bg-white hover:text-slate-900 font-bold rounded-xl h-11"
            >
              How Trust Works
            </Button>
          </Card>

          <div className="p-4 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Global Trends
            </h3>
            <div className="space-y-4">
              {["Math Tutoring", "Resume Writing", "Code Review"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-indigo-100 rounded-full" />
                    <span className="text-sm font-bold text-slate-600">
                      {item}
                    </span>
                    <span className="ml-auto text-[10px] font-black text-emerald-500 uppercase">
                      +12%
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </aside>

        {/* ================= SERVICES GRID ================= */}
        <section className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Available Experts
              </h2>
              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                {filteredServices.length} Results
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              Sort by:{" "}
              <span className="text-slate-900 flex items-center gap-1 cursor-pointer">
                Relevance <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-32 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm mb-6">
                <Search className="w-8 h-8 text-slate-200" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                No results matching your query
              </h2>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">
                Try using more general keywords or explore different categories
                from the sidebar.
              </p>
              <Button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl px-8"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => {
                const Icon =
                  ICON_MAP[service.category.toLowerCase()] || ICON_MAP.default;
                return (
                  <Card
                    key={service.id}
                    className="group border-none shadow-sm ring-1 ring-black/5 hover:ring-indigo-300 transition-all duration-300 overflow-hidden bg-white flex flex-col"
                  >
                    <CardContent className="p-8 flex flex-col flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Pricing
                          </p>
                          <p className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                            ₹{service.price}
                            <span className="text-xs text-slate-400 font-bold">
                              /session
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                          {service.name}
                        </h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                          {service.category}
                        </p>
                      </div>

                      <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {service.description ||
                          "Expert-level professional assistance tailored perfectly to your specific needs and timeline."}
                      </p>

                      <div className="pt-4 mt-auto">
                        <Button
                          onClick={() => router.push(`/services/${service.id}`)}
                          className="w-full rounded-xl bg-slate-900 hover:bg-indigo-600 transition-all active:scale-[0.98] h-11 font-bold cursor-pointer transition-colors"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
