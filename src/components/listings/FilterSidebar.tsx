"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn, buildFilterQuery } from "@/lib/utils";
import type { PropertyFilters, PropertyType, PropertyStatus } from "@/types";

interface FilterSidebarProps {
  initialFilters: Partial<PropertyFilters>;
}

const TYPES: (PropertyType | "All")[] = ["All", "House", "Apartment", "Villa", "Studio", "Commercial"];
const STATUSES: (PropertyStatus | "All")[] = ["All", "For Sale", "For Rent", "Sold"];
const SORT_OPTIONS: { label: string; value: PropertyFilters["sortBy"] }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];
const BUDGET_RANGES = [
  { label: "All", min: 0, max: 0 },
  { label: "Under ₹50 Lakh", min: 0, max: 5_000_000 },
  { label: "₹50 L – ₹1 Cr", min: 5_000_000, max: 10_000_000 },
  { label: "₹1 Cr – ₹3 Cr", min: 10_000_000, max: 30_000_000 },
  { label: "Above ₹3 Cr", min: 30_000_000, max: 0 },
];

export function FilterSidebar({ initialFilters }: FilterSidebarProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<Partial<PropertyFilters>>({
    type: "All",
    status: "All",
    sortBy: "newest",
    minPrice: 0,
    maxPrice: 0,
    city: "",
    ...initialFilters,
  });

  function activeBudgetIndex(): number {
    const min = filters.minPrice ?? 0;
    const max = filters.maxPrice ?? 0;
    if (min === 0 && max === 5_000_000) return 1;
    if (min === 5_000_000 && max === 10_000_000) return 2;
    if (min === 10_000_000 && max === 30_000_000) return 3;
    if (min === 30_000_000) return 4;
    return 0;
  }
  const [open, setOpen] = useState(false);

  function apply(updated: Partial<PropertyFilters>) {
    setFilters(updated);
    router.push(`/listings?${buildFilterQuery(updated)}`);
  }

  function reset() {
    const clean: Partial<PropertyFilters> = { type: "All", status: "All", sortBy: "newest" };
    setFilters(clean);
    router.push("/listings");
  }

  const SidebarContent = (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <SlidersHorizontal className="h-4 w-4 text-brand-primary" />
          Filters
        </div>
        <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors">
          <X className="h-3 w-3" /> Reset
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Property Type</label>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => apply({ ...filters, type: t })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                filters.type === t
                  ? "bg-brand-primary border-brand-primary text-white"
                  : "border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Status</label>
        <div className="space-y-2">
          {STATUSES.map((s) => (
            <label key={s} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={filters.status === s}
                onChange={() => apply({ ...filters, status: s })}
                className="accent-brand-primary"
              />
              <span className="text-sm text-slate-700">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">City</label>
        <input
          type="text"
          value={filters.city ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
          onBlur={() => apply(filters)}
          placeholder="e.g. Mumbai, Delhi..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Budget</label>
        <div className="flex flex-wrap gap-2">
          {BUDGET_RANGES.map((r, i) => (
            <button
              key={r.label}
              onClick={() => apply({ ...filters, minPrice: r.min, maxPrice: r.max })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                activeBudgetIndex() === i
                  ? "bg-brand-primary border-brand-primary text-white"
                  : "border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sort By</label>
        <div className="relative">
          <select
            value={filters.sortBy ?? "newest"}
            onChange={(e) => apply({ ...filters, sortBy: e.target.value as PropertyFilters["sortBy"] })}
            className="w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 pr-8 text-sm outline-none focus:ring-2 focus:ring-brand-primary bg-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-6 shadow-xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      <aside className="hidden md:block w-64 shrink-0 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm self-start sticky top-24">
        {SidebarContent}
      </aside>
    </>
  );
}
