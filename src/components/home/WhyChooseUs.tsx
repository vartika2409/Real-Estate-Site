"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, Clock, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURES = [
  {
    icon: Shield,
    title: "Trusted Agents",
    description:
      "Our licensed agents are background-checked, award-winning, and fully committed to your best interests at every step.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description:
      "We analyze the market daily to ensure you never overpay. If you find a better deal, we'll match it or beat it.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Real estate doesn't run on a 9-to-5 schedule. Our team is available around the clock to answer your questions.",
  },
  {
    icon: TrendingUp,
    title: "Market Expertise",
    description:
      "15 years of hyper-local market data and insights give our clients an unmatched edge in every transaction.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Luxury home interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-4 border-dashed border-brand-accent/40"
            />
            <div className="absolute -bottom-5 -left-5 bg-brand-primary text-white rounded-2xl p-5 shadow-xl">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm text-white/80 mt-1">Years of Excellence</p>
            </div>
          </motion.div>

          <div>
            <SectionHeader
              eyebrow="Why Choose Us"
              title="We Make Finding Home Simple"
              subtitle="At LuxEstate, we combine local expertise with cutting-edge technology to deliver a seamless property experience."
            />
            <div className="mt-10 space-y-8">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-5"
                >
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10">
                    <feature.icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
