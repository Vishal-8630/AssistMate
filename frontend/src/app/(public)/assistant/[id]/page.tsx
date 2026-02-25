"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useAssistant } from "@/features/assistant/hooks";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { Service } from "@/features/services/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Flag,
  Heart,
  Languages,
  MapPin,
  MessageSquare,
  Share2,
  Star,
  Verified
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Assistant {
  id: string;
  firstName: string;
  lastName: string;
  bio?: string;
  services: Service[];
}

export default function AssistantProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStatus();
  const [isSaved, setIsSaved] = useState(false);

  const { data, isLoading } = useAssistant(id);
  const assistant = data as Assistant;

  if (isLoading) return <Loader text="Loading Profile..." />;

  if (!data)
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Assistant not found</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          The profile you're looking for might have been moved or deleted.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/assistants")}
          className="mt-8"
        >
          Browse Assistants
        </Button>
      </div>
    );

  // Realistic Dummy Data (to be replaced by API props)
  const profileDetails = {
    rating: 4.9,
    totalReviews: 142,
    jobsCompleted: 218,
    successRate: "99%",
    responseTime: "Typically 15 minutes",
    experience: "5+ Years",
    location: "Mumbai, India",
    languages: ["English", "Hindi", "Marathi"],
    joinedDate: "October 2023",
    verified: true,
    isAvailable: true,
  };

  const handleStartConversation = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role.toLowerCase() !== "client") {
      router.push("/dashboard");
      return;
    }

    console.log("Starting session with: ", assistant.id);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Hero Banner Section */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Profile Info & Bio */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border-none shadow-xl ring-1 ring-black/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Profile Image / Initials */}
                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg ring-4 ring-white">
                      {assistant.firstName?.[0]}{assistant.lastName?.[0]}
                    </div>
                    {profileDetails.isAvailable && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full title='Available Now'" />
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-4xl font-bold tracking-tight text-slate-900 group">
                        {assistant.firstName} {assistant.lastName}
                        {profileDetails.verified && (
                          <Verified className="inline-block ml-2 w-6 h-6 text-blue-500" />
                        )}
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>{profileDetails.rating}</span>
                        <span className="text-slate-400 font-normal">({profileDetails.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{profileDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Joined {profileDetails.joinedDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {assistant.services.map((service) => (
                        <span
                          key={service.id}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold uppercase tracking-wider border border-indigo-100"
                        >
                          {service.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {assistant.bio ||
                      "I am a results-driven professional committed to delivering exceptional support and high-quality assistance. With years of experience across various domains, I specialize in streamlining complex tasks and providing real-time solutions tailored to unique client requirements. My approach is defined by efficiency, reliability, and a passion for excellence."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Languages className="w-5 h-5 text-indigo-500" />
                        Languages
                      </h3>
                      <p className="text-slate-600">{profileDetails.languages.join(", ")}</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-500" />
                        Response Time
                      </h3>
                      <p className="text-slate-600">{profileDetails.responseTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Jobs Finished", value: profileDetails.jobsCompleted, icon: Briefcase, color: "blue" },
                { label: "Success Rate", value: profileDetails.successRate, icon: CheckCircle2, color: "green" },
                { label: "Experience", value: profileDetails.experience, icon: Clock, color: "purple" },
                { label: "Avg. Rating", value: profileDetails.rating, icon: Star, color: "amber" },
              ].map((stat, i) => (
                <Card key={i} className="border-none shadow-sm ring-1 ring-black/5">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={cn(
                      "p-3 rounded-2xl mb-4",
                      stat.color === "blue" && "bg-blue-50 text-blue-600",
                      stat.color === "green" && "bg-green-50 text-green-600",
                      stat.color === "purple" && "bg-purple-50 text-purple-600",
                      stat.color === "amber" && "bg-amber-50 text-amber-600",
                    )}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonials Placeholder */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Recent Reviews</h2>
                <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700">View all</Button>
              </div>

              <div className="space-y-4">
                {[1, 2].map((review) => (
                  <Card key={review} className="border-none shadow-sm ring-1 ring-black/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                          {review === 1 ? "JD" : "AM"}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900">{review === 1 ? "John Doe" : "Alice Miller"}</h4>
                            <span className="text-sm text-slate-400">2 weeks ago</span>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                          <p className="text-slate-600">
                            "Excellent work! Very professional and delivered everything ahead of schedule. Would definitely recommend for anyone looking for high quality assistance."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions (Sticky) */}
          <div className="space-y-6">
            <div className="sticky top-8">
              <Card className="border-none shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="h-2 bg-indigo-600" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    Interested in working with {assistant.firstName}? Start a conversation now to discuss your projects.
                  </p>

                  <div className="space-y-3 pt-2">
                    <Button
                      className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100"
                      onClick={handleStartConversation}
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Message Now
                    </Button>

                    <Button variant="outline" className="w-full h-12 text-lg">
                      <Calendar className="w-5 h-5 mr-2" />
                      Choose a Slot
                    </Button>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">Standard Rate</span>
                      <span className="text-slate-900 font-bold">$25/hr</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-green-600 font-semibold">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Secure Payment
                      </span>
                      <span>Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <div className="mt-6 flex flex-wrap gap-6 justify-center">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={cn(
                    "flex items-center gap-2 transition-colors text-sm font-semibold",
                    isSaved ? "text-rose-600" : "text-slate-500 hover:text-rose-600"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isSaved && "fill-rose-600")} />
                  {isSaved ? "Saved" : "Save Assistant"}
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-semibold">
                  <Flag className="w-4 h-4" /> Report
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .52-.88l7-4a1 1 0 0 1 .96 0l7 4A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
