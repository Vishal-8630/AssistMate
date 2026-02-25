import Link from "next/link";
import { Zap } from "lucide-react";

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter group">
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
        <Zap className="w-5 h-5 fill-white" />
      </div>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 font-bold">
        AssistMate
      </span>
    </Link>
  );
}