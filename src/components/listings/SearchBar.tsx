"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  initialQuery?: string;
  variant?: "hero" | "page";
}

export function SearchBar({ initialQuery = "", variant = "page" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/listings?query=${encodeURIComponent(q)}` : "/listings");
  }

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "flex gap-2",
        variant === "hero"
          ? "flex-col sm:flex-row bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 shadow-2xl"
          : "flex-row"
      )}
    >
      <div className="relative flex-1">
        <MapPin
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
            variant === "hero" ? "text-brand-accent" : "text-slate-400"
          )}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city or keyword..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-primary"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary/90 transition-colors shrink-0"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
