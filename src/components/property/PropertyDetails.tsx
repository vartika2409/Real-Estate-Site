"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Square, Calendar, Car, Layers, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyDetailsProps {
  property: Property;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const { specs } = property;

  const specItems = [
    ...(specs.bedrooms > 0 ? [{ icon: Bed, label: "Bedrooms", value: specs.bedrooms }] : []),
    { icon: Bath, label: "Bathrooms", value: specs.bathrooms },
    { icon: Square, label: "Square Feet", value: specs.sqft.toLocaleString() },
    ...(specs.yearBuilt ? [{ icon: Calendar, label: "Year Built", value: specs.yearBuilt }] : []),
    ...(specs.garage ? [{ icon: Car, label: "Garage", value: `${specs.garage} car` }] : []),
    ...(specs.floors ? [{ icon: Layers, label: "Floors", value: specs.floors }] : []),
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Badge status={property.status} />
        <span className="text-sm text-slate-400 bg-slate-100 rounded-full px-3 py-1">{property.type}</span>
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-brand-primary"
      >
        {formatPrice(property.price, property.status)}
      </motion.p>

      <h1 className="mt-2 text-2xl font-bold text-slate-900">{property.title}</h1>

      <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
        <MapPin className="h-4 w-4 shrink-0 text-brand-accent" />
        <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {specItems.map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
            variants={item}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm text-center"
          >
            <Icon className="h-5 w-5 text-brand-primary" />
            <span className="text-lg font-bold text-slate-900">{value}</span>
            <span className="text-xs text-slate-400">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">About This Property</h2>
        <p className="text-slate-600 leading-relaxed text-sm">{property.description}</p>
      </div>

      {property.features.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Features & Amenities</h2>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2"
          >
            {property.features.map((feature) => (
              <motion.div
                key={feature}
                variants={item}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 shrink-0">
                  <Check className="h-3 w-3 text-emerald-600" />
                </div>
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
