"use client";

import { usePathname } from "next/navigation";

export function useActiveLink() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `text-sm font-medium transition ${
      isActive(href)
        ? "text-black"
        : "text-gray-600 hover:text-black"
    }`;

  return { isActive, linkClass };
}