"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NAV_ITEMS } from "./navbar-config";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useLogout } from "@/features/auth/hooks/api-hooks";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight } from "lucide-react";

export function NavbarDesktop() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStatus();
  const logout = useLogout();
  const role = user?.role.toLowerCase() as UserRole;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const sortedNav = [...NAV_ITEMS]
    .sort((a, b) => a.order - b.order)
    .filter((item) => {
      // Protected check
      if (item.protected && !isAuthenticated) return false;

      // Role restriction check
      if (item.roles) {
        if (!role) return false;
        return item.roles.includes(role);
      }

      return true;
    });

  return (
    <div className="hidden md:flex items-center gap-2">
      <nav className="flex items-center gap-1 mr-4">
        {sortedNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300",
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 transition-transform group-hover:scale-110",
                isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
        {!isAuthenticated ? (
          <>
            <Link href="/login">
              <Button variant="ghost" className="font-bold text-slate-600 rounded-xl hover:bg-slate-50">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button className="font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-100 px-6">
                Get Started
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                {user?.role}
              </p>
              <p className="text-sm font-bold text-slate-900 leading-none">
                {user?.firstName}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md ring-1 ring-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300 ml-1"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}