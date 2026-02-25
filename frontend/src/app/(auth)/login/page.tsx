"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSendOtp } from "@/features/auth/hooks/api-hooks";
import { PhoneForm } from "@/features/auth/components/PhoneForm";
import { validatePhone } from "@/features/auth/validation";
import { Loader } from "@/components/ui/loader";
import { usePublicPageGaurd } from "@/features/auth/hooks/use-page-gaurds";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  MessageSquare,
  Users,
  Trophy,
  ArrowRight
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const sendOtp = useSendOtp();
  const { isLoading } = usePublicPageGaurd();

  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  if (isLoading) return <Loader text="Securing your gateway..." />;

  const handleSubmit = () => {
    const validationError = validatePhone(phone);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);

    sendOtp.mutate(
      { phoneNumber: phone },
      {
        onSuccess: () => {
          router.push(`/verify?phone=${phone}`);
        },
        onError: (error: any) => {
          setFormError(
            error?.response?.data?.message ||
            "Failed to send OTP. Please check your network."
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#FDFDFD] relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-12">

        {/* Left Marketing Section */}
        <div className="hidden lg:block space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              Join 12,000+ Verified Users
            </div>
            <h1 className="text-5xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[0.95]">
              Real-time help.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                From real people.
              </span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-lg leading-relaxed">
              Connect instantly with professional assistants for tutoring,
              guidance, and on-demand support — all live within seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {[
              { title: "Live Sessions", icon: MessageSquare, desc: "Direct 1-on-1 interaction" },
              { title: "Secure Payouts", icon: ShieldCheck, desc: "Automated escrow safety" },
              { title: "Vetted Experts", icon: Users, desc: "Professionally qualified" },
              { title: "Success Rate", icon: Trophy, desc: "98% satisfaction score" },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                  <p className="text-slate-400 text-[11px] font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-6 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Trusted By Early Adopters Across India</p>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          <Card className="w-full shadow-2xl border-none rounded-[2rem] overflow-hidden bg-white ring-1 ring-black/5 relative">
            <CardHeader className="pt-10 pb-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                  <Zap className="w-8 h-8 fill-white" />
                </div>
              </div>
              <CardTitle className="text-center text-3xl font-black text-slate-900 tracking-tight">
                Welcome to AssistMate
              </CardTitle>
              <p className="text-center text-slate-500 font-medium text-sm mt-2">
                Continue with your phone number to proceed
              </p>
            </CardHeader>

            <CardContent className="space-y-8 p-10 pt-0">
              <PhoneForm
                phone={phone}
                onChange={setPhone}
                onSubmit={handleSubmit}
                isLoading={sendOtp.isPending}
                error={formError}
              />

              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="h-px w-8 bg-slate-100" />
                  Security Protocols Active
                  <span className="h-px w-8 bg-slate-100" />
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium text-slate-500 leading-normal">
                      One-time password (OTP) verification for account safety.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium text-slate-500 leading-normal">
                      By continuing, you agree to our <span className="text-indigo-600 font-bold">Terms of Service</span>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
