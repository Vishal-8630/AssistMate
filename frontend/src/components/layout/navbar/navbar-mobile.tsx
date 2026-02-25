"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NAV_ITEMS } from "./navbar-config";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import { useLogout } from "@/features/auth/hooks/api-hooks";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight, User as UserIcon } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function NavbarMobile({ open, onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStatus();
  const logout = useLogout();
  const role = user?.role.toLowerCase() as UserRole;

  const handleLogout = async () => {
    await logout();
    router.push("/");
    onClose();
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
    <div className={cn(
      "md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 origin-top overflow-hidden",
      open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
    )}>
      <div className="px-6 py-8 space-y-6">

        {/* User Profile Summary (If authenticated) */}
        {isAuthenticated && user && (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1">
          {sortedNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl text-base font-bold transition-all",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                  {item.label}
                </div>
                <ChevronRight className={cn("w-4 h-4 opacity-50", isActive ? "text-indigo-600" : "text-slate-300")} />
              </Link>
            );
          })}
        </nav>

        {/* Actions Area */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          {!isAuthenticated ? (
            <>
              <Link href="/login" onClick={onClose} className="block w-full text-center p-4 text-slate-600 font-bold hover:text-slate-900 transition-colors">
                Log in
              </Link>
              <Link href="/login" onClick={onClose}>
                <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-lg shadow-xl shadow-indigo-100 uppercase tracking-widest">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}