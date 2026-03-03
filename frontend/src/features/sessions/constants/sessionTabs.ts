import { FilterTab } from "../utils/sessionFilters";
import {
  Inbox,
  Clock,
  CheckCircle2,
  Briefcase,
  XCircle,
} from "lucide-react";

export const SESSION_TABS: {
  id: FilterTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "All", label: "All", icon: Inbox },
  { id: "Requested", label: "Requests", icon: Clock },
  { id: "Active", label: "Active", icon: CheckCircle2 },
  { id: "Completed", label: "Completed", icon: Briefcase },
  { id: "Rejected", label: "Rejected", icon: XCircle },
];