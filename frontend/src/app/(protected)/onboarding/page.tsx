"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useProfileIncompleteGuard } from "@/features/auth/hooks/use-page-gaurds";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useUpdateProfile } from "@/features/profile/hooks";
import {
  ProfileFormValues,
  UpdateProfileRequest,
} from "@/features/profile/types";
import { validateProfile } from "@/features/profile/validation";
import { AssistantServicesSection } from "@/features/services/components/AssistantServicesSection";
import { cn } from "@/lib/utils";
import {
  User,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Zap,
  Globe,
  Settings,
  UserPlus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const updateProfile = useUpdateProfile();
  const { isLoading } = useProfileIncompleteGuard();

  const [values, setValues] = useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    role: "client",
  });

  const [error, setError] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);

  if (isLoading) return <Loader text="Preparing your personalized workspace..." />;

  const handleSubmit = () => {
    const validationError = validateProfile(values);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const payload: UpdateProfileRequest = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim() || null,
      role: values.role,
    };

    updateProfile.mutate(payload, {
      onSuccess: async () => {
        if (values.role === "assistant") {
          setProfileSaved(true);
        } else {
          router.replace("/dashboard");
        }
      },
      onError: (error: any) => {
        setError(
          error.response?.data?.message ||
          "Failed to update profile. Please try again."
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent z-0" />

      <main className="max-w-7xl mx-auto px-6 pt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left Side – Motivation & Progress */}
          <div className="lg:col-span-2 space-y-10 py-4">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest shadow-sm">
                <Sparkles className="w-4 h-4" />
                Step 1 of 2
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Welcome to <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">AssistMate.</span>
              </h1>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Configure your identity to unlock expert-led real-time assistance tailored to your specific goals.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: "Define Your Path", desc: "Choose between being an Assistant or a Client.", icon: User },
                { title: "Personalize Experience", icon: Settings, desc: "Tell us who you are for better matches." },
                { title: "Global Network", icon: Globe, desc: "Connect with verified users in seconds." },
              ].map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900">{step.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-[2rem] bg-slate-900 text-white space-y-6 relative overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-lg">Trust Guaranteed</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Your account is secured with end-to-end encryption.
                  We prioritize your privacy in every interaction.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="lg:col-span-3 space-y-10">

            {/* Profile Form Card */}
            <div className={cn(
              "p-1 bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 ring-1 ring-black/5 transition-all duration-700",
              profileSaved ? "opacity-40 scale-95 pointer-events-none grayscale" : "opacity-100 scale-100"
            )}>
              <div className="p-10 sm:p-14">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Setup Account</h2>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Identification Phase</p>
                  </div>
                </div>

                <ProfileForm
                  values={values}
                  onChange={setValues}
                  onSubmit={handleSubmit}
                  error={error}
                />
              </div>
            </div>

            {/* Assistant Extra Step */}
            {profileSaved && values.role === "assistant" && (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <Card className="shadow-2xl border-none rounded-[3rem] overflow-hidden ring-2 ring-indigo-500/20 bg-white">
                  <header className="px-10 sm:px-14 pt-14 pb-0 bg-indigo-50/30">
                    <div className="flex items-center justify-between mb-8">
                      <div className="space-y-1">
                        <h2 className="text-3xl font-black text-indigo-900 tracking-tight">Define Services</h2>
                        <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Capability Mapping</p>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
                        <Zap className="w-4 h-4" />
                        Final Step
                      </div>
                    </div>
                  </header>

                  <CardContent className="px-10 sm:px-14 pb-14 pt-0">
                    <AssistantServicesSection />

                    <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest leading-none">Configuration Ready</span>
                      </div>
                      <button
                        onClick={() => router.replace("/dashboard")}
                        className="group h-16 px-10 rounded-2xl bg-slate-900 text-white font-black text-base hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-3 active:scale-[0.98]"
                      >
                        Enter Marketplace
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
