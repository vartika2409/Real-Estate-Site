import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PropertyFilters, PropertyStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, status: PropertyStatus): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
  return status === "For Rent" ? `${formatted}/mo` : formatted;
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + "…";
}

export function buildFilterQuery(filters: Partial<PropertyFilters>): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("query", filters.query);
  if (filters.type && filters.type !== "All") params.set("type", filters.type);
  if (filters.status && filters.status !== "All") params.set("status", filters.status);
  if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
  if (filters.city) params.set("city", filters.city);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  return params.toString();
}

export function parseFilterQuery(
  searchParams: Record<string, string | string[] | undefined>
): Partial<PropertyFilters> {
  const get = (key: string) => {
    const val = searchParams[key];
    return Array.isArray(val) ? val[0] : val;
  };
  return {
    query: get("query") ?? "",
    type: (get("type") as PropertyFilters["type"]) ?? "All",
    status: (get("status") as PropertyFilters["status"]) ?? "All",
    minPrice: Number(get("minPrice") ?? 0),
    maxPrice: Number(get("maxPrice") ?? 10_000_000),
    city: get("city") ?? "",
    sortBy: (get("sortBy") as PropertyFilters["sortBy"]) ?? "newest",
  };
}
