"use client";

import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";
import Link from "next/link";

export function NavbarLinks() {
  const { isAuthenticated } = useAuthStatus();

  return (
    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
      <Link href="/services" className="hover:text-black transition">
        Services
      </Link>

      <Link href="/about" className="hover:text-black transition">
        About
      </Link>

      <Link href="/privacy" className="hover:text-black transition">
        Privacy
      </Link>

      {!isAuthenticated ? (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          Login
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
}