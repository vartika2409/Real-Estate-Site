"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PropertyCard } from "@/components/listings/PropertyCard";
import type { Property } from "@/types";

interface FeaturedListingsProps {
  properties: Property[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function FeaturedListings({ properties }: FeaturedListingsProps) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Featured"
            title="Hand-Picked Properties"
            subtitle="Our agents' top selections — curated for quality, value, and location."
          />
          <Link
            href="/listings"
            className="shrink-0 flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3 transition-all"
          >
            View All Listings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
