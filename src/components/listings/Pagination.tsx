"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

function buildHref(basePath: string, page: number, searchParams: Record<string, string>) {
  const params = new URLSearchParams({ ...searchParams, page: String(page) });
  return `${basePath}?${params.toString()}`;
}

function getPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPages(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1 mt-10" aria-label="Pagination">
      <Link
        href={buildHref(basePath, Math.max(1, currentPage - 1), searchParams)}
        className={cn(
          "p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors",
          currentPage === 1 && "pointer-events-none opacity-40"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-slate-400">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ) : (
          <motion.div key={p} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={buildHref(basePath, p, searchParams)}
              className={cn(
                "inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                p === currentPage
                  ? "bg-brand-primary text-white shadow-sm"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {p}
            </Link>
          </motion.div>
        )
      )}

      <Link
        href={buildHref(basePath, Math.min(totalPages, currentPage + 1), searchParams)}
        className={cn(
          "p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors",
          currentPage === totalPages && "pointer-events-none opacity-40"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
