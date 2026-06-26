"use client";

import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/listings?query=${encodeURIComponent(query)}`);
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-sm font-semibold tracking-widest text-brand-accent uppercase"
        >
          Your Trusted Real Estate Partner
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl font-extrabold text-white sm:text-5xl lg:text-7xl leading-tight"
        >
          Find Your{" "}
          <span className="text-brand-accent">Dream Home</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
        >
          Explore thousands of premium properties across India. From urban penthouses to
          serene beachfront estates — your perfect home is waiting.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={handleSearch}
          className="mt-10 flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl"
        >
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-accent" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, neighborhood, or keyword..."
              className="w-full rounded-xl bg-white py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-primary text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-8 py-4 font-semibold text-white hover:bg-brand-primary/90 transition-colors shrink-0"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </motion.form>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } } }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            "12,000+ Properties",
            "500+ Happy Clients",
            "15 Years Experience",
          ].map((stat) => (
            <motion.span
              key={stat}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-sm text-white backdrop-blur-sm"
            >
              <TrendingUp className="h-4 w-4 text-brand-accent" />
              {stat}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mt-16"
        >
          <Link
            href="/listings"
            className="inline-flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors text-xs"
          >
            <span>Explore Properties</span>
            <span className="block w-px h-8 bg-white/40" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
