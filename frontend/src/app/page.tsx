import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Globe,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Verified,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#FDFDFD]">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-8 animate-bounce">
            <Sparkles className="w-4 h-4" />
            Live Assistance Marketplace
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-slate-900">
            Real-time help.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
              From real people.
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Instantly connect with verified experts for tutoring, professional guidance,
            and on-demand support. No queues, no hassle — just immediate results.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/services">
              <Button size="lg" className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 group">
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl text-lg font-bold border-slate-200 hover:bg-slate-50">
                Join as Assistant
              </Button>
            </Link>
          </div>

          {/* Social Proof / Trust Banner */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40">
            <div className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-widest">
              <Globe className="w-6 h-6" /> GLOBAL
            </div>
            <div className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-widest">
              VERIFIED
            </div>
            <div className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-widest">
              REALTIME
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-white">50K+</h3>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Sessions Done</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-white">12K+</h3>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Verified Experts</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-white">4.9/5</h3>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Avg. Rating</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-white">3 Min</h3>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Response Time</p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            How AssistMate Works
          </h2>

          <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            We've simplified the process of getting expert help into three seamless steps.
          </p>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-indigo-50">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="font-black text-2xl text-slate-900">01. Discover</h3>
              <p className="text-slate-500 font-medium">
                Browse through thousands of specialized categories and find the perfect match instantly.
              </p>
            </div>

            <div className="group space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-purple-50">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h3 className="font-black text-2xl text-slate-900">02. Connect</h3>
              <p className="text-slate-500 font-medium">
                Engage in direct, real-time communication via our secure chat platform. No long waitlists.
              </p>
            </div>

            <div className="group space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-50">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="font-black text-2xl text-slate-900">03. Grow</h3>
              <p className="text-slate-500 font-medium">
                Succeed with expert guidance, rate your experience, and contribute to the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-black text-slate-900">Uncompromising Platform Features</h2>
            <p className="text-slate-500 font-medium mt-4">Everything you need for a professional exchange of value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Secure Payments", desc: "Automated escrow system ensuring fair payouts for all parties.", icon: ShieldCheck, color: "emerald" },
              { title: "Live Tracking", desc: "Real-time updates on task progress and session duration.", icon: Activity, color: "blue" },
              { title: "Expert Vetting", desc: "Every assistant goes through a rigorous qualification check.", icon: Verified, color: "indigo" },
              { title: "Growth Analytics", desc: "Detailed insights into your performance and earnings.", icon: TrendingUp, color: "purple" },
              { title: "Instant Chat", desc: "Built-in low latency communication channel for smooth sessions.", icon: MessageSquare, color: "rose" },
              { title: "Job Marketplace", desc: "A vibrant hub for finding and requesting specialized help.", icon: Briefcase, color: "amber" },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl ring-1 ring-black/5 hover:shadow-xl transition-all duration-300 group">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                  feature.color === "emerald" && "bg-emerald-50 text-emerald-600",
                  feature.color === "blue" && "bg-blue-50 text-blue-600",
                  feature.color === "indigo" && "bg-indigo-50 text-indigo-600",
                  feature.color === "purple" && "bg-purple-50 text-purple-600",
                  feature.color === "rose" && "bg-rose-50 text-rose-600",
                  feature.color === "amber" && "bg-amber-50 text-amber-600",
                )}>
                  <feature.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-black text-xl text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DUAL AUDIENCE ================= */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">

          {/* For Clients */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Designed for <br />
                <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Results-Oriented</span> Clients.
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Connect with verified professionals who help you solve complex problems,
                learn new skills, and move your projects forward — instantly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Verified Experts Only", "Transparent Ratings", "On-Demand Sessions", "Secure Communication"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-50">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="font-bold text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="h-14 px-8 rounded-2xl bg-indigo-600 font-bold">Start Searching</Button>
            </div>
            <div className="flex-1 w-full lg:max-w-md bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-8 border border-indigo-200 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <Users className="w-48 h-48 -mr-16 -mt-16 text-indigo-600" />
              </div>
              <div className="relative z-10 space-y-6 text-indigo-900/40 font-black uppercase tracking-widest text-[10px]">
                <span>Client Experience</span>
                <div className="h-4 w-full bg-indigo-900/5 rounded-full" />
                <div className="h-4 w-3/4 bg-indigo-900/5 rounded-full" />
                <div className="h-4 w-1/2 bg-indigo-600/20 rounded-full" />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-slate-100" />

          {/* For Assistants */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Empowering the <br />
                <span className="text-purple-600 underline decoration-purple-200 underline-offset-8">Knowledge Economy</span> for Assistants.
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Monetize your expertise on your own schedule. Build your reputation, track your growth,
                and receive instant payments for your valuable time and knowledge.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Flexible Schedules", "Fast Payouts", "Career Reputation", "Quality Lead Match"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-50">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="font-bold text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="h-14 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 font-bold">Start Earning</Button>
            </div>
            <div className="flex-1 w-full lg:max-w-md bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border border-purple-200 shadow-2xl relative overflow-hidden group text-right">
              <div className="absolute top-0 left-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <Zap className="w-48 h-48 -ml-16 -mt-16 text-purple-600" />
              </div>
              <div className="relative z-10 space-y-6 text-purple-900/40 font-black uppercase tracking-widest text-[10px] flex flex-col items-end">
                <span>Assistant Performance</span>
                <div className="h-4 w-full bg-purple-900/5 rounded-full" />
                <div className="h-4 w-2/3 bg-purple-900/5 rounded-full" />
                <div className="h-4 w-1/3 bg-purple-600/20 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto rounded-[40px] bg-slate-900 p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/20 to-transparent blur-[120px] rounded-full" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight">
              Ready to experience <br />the future of help?
            </h2>

            <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
              Join thousands of users who are already saving time and growing their skills with AssistMate.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link href="/login">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 text-xl font-black shadow-2xl">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2 text-xl font-black tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span>AssistMate</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Empowering global real-time collaboration through expert assistance and secure live commerce.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Platform</h4>
            <ul className="space-y-2 text-sm font-bold text-slate-500">
              <li><Link href="/services" className="hover:text-indigo-600 transition-colors">Marketplace</Link></li>
              <li><Link href="/login" className="hover:text-indigo-600 transition-colors">Become Assistant</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm font-bold text-slate-500">
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Newsletter</h4>
            <div className="flex bg-slate-100 p-1.5 rounded-xl">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent border-none outline-none px-3 py-2 text-sm w-full font-medium"
              />
              <Button className="bg-slate-900 text-white rounded-lg px-4 font-bold text-xs h-9">Join</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">© 2026 AssistMate Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
