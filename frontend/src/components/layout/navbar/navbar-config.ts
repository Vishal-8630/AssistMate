import { UserRole } from "@/types/user";
import {
  Home,
  LayoutDashboard,
  Search,
  User,
  Briefcase,
  LucideIcon
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  order: number;
  icon: LucideIcon;
  protected?: boolean;
  roles?: UserRole[],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", order: 1, icon: Home },
  { label: "Services", href: "/services", order: 2, icon: Search, roles: ["client"] as UserRole[] },
  { label: "Dashboard", href: "/dashboard", order: 3, icon: LayoutDashboard, protected: true },
  { label: "Profile", href: "/profile", order: 4, icon: User, protected: true },
  { label: "My Jobs", href: "/assistant/jobs", order: 2, icon: Briefcase, protected: true, roles: ["assistant"] as UserRole[] },
];