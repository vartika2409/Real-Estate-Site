"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "James & Claire Whitmore",
    role: "Home Buyers — Austin, TX",
    quote:
      "LuxEstate found us our dream home in under three weeks. Sarah's knowledge of the Austin market was extraordinary, and she negotiated $45,000 off the asking price. We couldn't be happier.",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priya Nair",
    role: "Property Investor — Miami, FL",
    quote:
      "I've worked with many agencies, but LuxEstate is truly in a class of its own. Their data-driven approach helped me identify a waterfront property with exceptional appreciation potential. Already up 22%.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
  },
  {
    id: "t3",
    name: "Robert Chen",
    role: "Corporate Renter — New York, NY",
    quote:
      "Relocating for work is stressful, but LuxEstate made it effortless. They arranged virtual tours, handled all paperwork remotely, and we were settled in our Upper West Side apartment within days of arriving.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  }

  return (
    <section className="py-24 bg-brand-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Real stories from clients who found their perfect properties with LuxEstate."
          centered
          className="mb-14"
        />

        <div className="hidden md:grid grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <Quote className="h-8 w-8 text-brand-accent mb-4" />
              <p className="text-slate-600 leading-relaxed text-sm mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <div className="overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
              >
                <Quote className="h-8 w-8 text-brand-accent mb-4" />
                <p className="text-slate-600 leading-relaxed text-sm mb-6">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: TESTIMONIALS[current].rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={TESTIMONIALS[current].avatar}
                    alt={TESTIMONIALS[current].name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{TESTIMONIALS[current].name}</p>
                    <p className="text-xs text-slate-400">{TESTIMONIALS[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-brand-primary" : "bg-slate-300"}`}
              />
            ))}
            <button onClick={next} className="p-2 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
