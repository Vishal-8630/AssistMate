"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssistantServicesSection } from "@/features/services/components/AssistantServicesSection";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  User,
  Verified
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuthStatus();

  if (!user) return null;

  const isAssistant = user.role.toLowerCase() === "assistant";
  const completionPercentage = user.isProfileCompleted ? 100 : 85;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Header / Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-900 p-8 md:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-black/20">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-xl ring-4 ring-slate-900 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-4xl font-black tracking-tight">
                  {user.firstName} {user.lastName}
                </h1>
                {user.role === "assistant" && <Verified className="w-6 h-6 text-blue-400" />}
              </div>
              <p className="text-indigo-200 text-lg font-medium opacity-90">
                {user.role === "assistant" ? "Premium Professional Assistant" : "Privileged Client Member"}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg text-sm border border-white/10">
                  <Mail className="w-4 h-4 text-indigo-300" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg text-sm border border-white/10">
                  <Phone className="w-4 h-4 text-indigo-300" />
                  {user.phoneNumber}
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-48 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-indigo-300">
                <span>Profile Strength</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${completionPercentage}%` }} />
              </div>
              <p className="text-[10px] text-white/50 font-medium">Keep your details updated for better visibility.</p>
            </div>
          </div>

          {/* Abstract decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -mr-20 -mt-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="md:col-span-2 space-y-8">
            {/* Core Info */}
            <Card className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between py-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Personal Information
                </CardTitle>
                <Button variant="ghost" className="text-indigo-600 font-bold text-sm">Update Information</Button>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</p>
                    <p className="text-slate-900 font-bold text-lg">{user.firstName || "--"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</p>
                    <p className="text-slate-900 font-bold text-lg">{user.lastName || "--"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                    <p className="text-slate-900 font-bold text-lg">{user.email || "--"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-slate-900 font-bold text-lg">{user.phoneNumber}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Professional Bio</p>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    User Bio placeholder. Manage your professional narrative here to help others understand your expertise and value in the AssistMate ecosytem.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Assistant Specific - Services */}
            {isAssistant && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Service Offerings</h2>
                  <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Live Status: Active
                  </div>
                </div>
                <AssistantServicesSection />
                <div className="pt-2 flex gap-4">
                  <Link href="/assistant/jobs" className="flex-1">
                    <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl shadow-lg shadow-indigo-100">
                      <Briefcase className="w-5 h-5 mr-2" />
                      View Project History
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* Account Status */}
            <Card className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <CardTitle className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50 text-green-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Verification</span>
                  </div>
                  <span className="text-xs font-black text-green-600 uppercase tracking-wider">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <Settings className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Two-Factor</span>
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Disabled</span>
                </div>
              </CardContent>
            </Card>

            {/* Payments */}
            <Card className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <CardTitle className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  Payment Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Connect your bank account or digital wallet to start receiving payments for your assistance sessions.
                </p>
                <Button variant="outline" className="w-full mt-4 h-11 font-bold rounded-xl border-slate-200">
                  Setup Wallet
                </Button>
              </CardContent>
            </Card>

            {/* Location / Presence */}
            <Card className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden border-indigo-100 bg-indigo-50/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 ring-1 ring-black/5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Base Location</h4>
                    <p className="text-slate-700 font-bold">Mumbai, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
