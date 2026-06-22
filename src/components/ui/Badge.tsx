import { cn } from "@/lib/utils";
import type { PropertyStatus } from "@/types";

interface BadgeProps {
  status: PropertyStatus;
  className?: string;
}

const statusStyles: Record<PropertyStatus, string> = {
  "For Sale": "bg-emerald-100 text-emerald-800",
  "For Rent": "bg-sky-100 text-sky-800",
  Sold: "bg-red-100 text-red-800",
};

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
