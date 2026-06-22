"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Bed, Bath, Square, Heart, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, truncate, cn } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  variant?: "grid" | "featured";
  className?: string;
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        "group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full h-full">
          <Image
            src={property.images?.[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"}
            alt={property.images?.[0]?.alt || property.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute top-3 left-3">
          <Badge status={property.status} />
        </div>
        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label="Toggle favorite"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", liked ? "fill-red-500 text-red-500" : "text-slate-400")}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-brand-primary">
              {formatPrice(property.price, property.status)}
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900 leading-snug">
              {truncate(property.title, 40)}
            </h3>
          </div>
          <Link
            href={`/listings/${property.id}`}
            className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-brand-primary hover:text-white text-slate-500 transition-colors"
            aria-label="View property"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-1 mt-2 text-sm text-slate-400">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{property.location.address}, {property.location.city}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-5 text-sm text-slate-500">
          {property.specs.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              {property.specs.bedrooms} Beds
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            {property.specs.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Square className="h-4 w-4" />
            {property.specs.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </motion.div>
  );
}
