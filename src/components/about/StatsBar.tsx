"use client";

import { Calendar, Key, ThumbsUp, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const STATS = [
  { icon: Calendar, label: "Years in Business", target: 15, suffix: "+" },
  { icon: Key, label: "Properties Sold", target: 1200, suffix: "+" },
  { icon: ThumbsUp, label: "Client Satisfaction", target: 98, suffix: "%" },
  { icon: Users, label: "Expert Agents", target: 50, suffix: "+" },
];

export function StatsBar() {
  return (
    <section className="bg-brand-primary py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, label, target, suffix }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-3">
                <Icon className="h-8 w-8 text-brand-accent" />
              </div>
              <p className="text-4xl font-extrabold text-white">
                <AnimatedCounter target={target} suffix={suffix} duration={2} />
              </p>
              <p className="mt-1 text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
