"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Languages,
  MapPin,
  Star,
  Verified,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AssistantProfile } from "../types";

interface ProfileMeta {
  rating: number;
  totalReviews: number;
  location: string;
  joinedDate: string;
  verified?: boolean;
  isAvailable?: boolean;
  languages: string[];
  responseTime: string;
}

interface Props {
  assistant: AssistantProfile;
  meta: ProfileMeta;
}

export function AssistantHero({ assistant, meta }: Props) {
  const router = useRouter();

  const fallbackBio =
    "I am a results-driven professional committed to delivering exceptional support and high-quality assistance. With years of experience across various domains, I specialize in streamlining complex tasks and providing real-time solutions tailored to unique client requirements. My approach is defined by efficiency, reliability, and a passion for excellence.";

  return (
    <>
      {/* ── Banner ───────────────────────────────────────────────── */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white
                       transition-colors bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full
                       text-sm font-medium border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* ── Profile Card (overlaps banner) ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-black/5 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600
                              flex items-center justify-center text-4xl font-bold text-white
                              shadow-lg ring-4 ring-white">
                {assistant.firstName?.[0]}{assistant.lastName?.[0]}
              </div>
              {meta.isAvailable && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"
                  title="Available Now" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  {assistant.firstName} {assistant.lastName}
                  {meta.verified && (
                    <Verified className="inline-block ml-2 w-6 h-6 text-blue-500" />
                  )}
                </h1>
              </div>

              {/* Rating · Location · Joined */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{meta.rating}</span>
                  <span className="text-slate-400 font-normal">({meta.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{meta.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Joined {meta.joinedDate}</span>
                </div>
              </div>

              {/* Service tags */}
              {assistant.services.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {assistant.services.map((service) => (
                    <span
                      key={service.id}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs
                                 font-semibold uppercase tracking-wider border border-indigo-100"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── About Section ── */}
          <div className="mt-10 pt-10 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {assistant.bio || fallbackBio}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-indigo-500" />
                  Languages
                </h3>
                <p className="text-slate-600">{meta.languages.join(", ")}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  Response Time
                </h3>
                <p className="text-slate-600">{meta.responseTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}