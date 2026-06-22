"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Phone, Mail, Linkedin } from "lucide-react";
import type { Agent } from "@/types";

interface TeamSectionProps {
  agents: Agent[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TeamSection({ agents }: TeamSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-2">Our Team</p>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Meet Our Experts</h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              variants={card}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="relative h-56">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900">{agent.name}</h3>
                <p className="text-sm text-brand-primary mt-0.5">{agent.title}</p>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.round(agent.rating) ? "fill-brand-accent text-brand-accent" : "text-slate-200"}`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">{agent.propertiesSold} sold</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href={`tel:${agent.phone}`}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-brand-primary hover:border-brand-primary transition-colors"
                    aria-label="Call"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-brand-primary hover:border-brand-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-brand-primary hover:border-brand-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
