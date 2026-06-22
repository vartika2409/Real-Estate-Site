"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageSquare, Star, Award } from "lucide-react";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  propertyId?: string;
}

export function AgentCard({ agent, propertyId }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
    >
      <div className="text-center mb-6">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="object-cover rounded-full"
            sizes="80px"
          />
        </div>
        <h3 className="font-bold text-slate-900">{agent.name}</h3>
        <p className="text-sm text-slate-500">{agent.title}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.round(agent.rating) ? "fill-brand-accent text-brand-accent" : "text-slate-200"}`}
            />
          ))}
          <span className="text-xs text-slate-400 ml-1">{agent.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500 justify-center mb-6">
        <div className="flex items-center gap-1">
          <Award className="h-3.5 w-3.5 text-brand-primary" />
          {agent.yearsExperience} yrs exp
        </div>
        <span className="w-px h-4 bg-slate-200" />
        <div>{agent.propertiesSold}+ sold</div>
      </div>

      <div className="space-y-3">
        <motion.a
          href={`tel:${agent.phone}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-primary text-white py-3 text-sm font-semibold hover:bg-brand-primary/90 transition-colors"
        >
          <Phone className="h-4 w-4" />
          {agent.phone}
        </motion.a>

        <motion.a
          href={`mailto:${agent.email}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 text-slate-700 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Email Agent
        </motion.a>

        <Link
          href={`/contact${propertyId ? `?propertyId=${propertyId}` : ""}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-accent/10 text-brand-accent py-3 text-sm font-semibold hover:bg-brand-accent/20 transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          Send Message
        </Link>
      </div>
    </motion.div>
  );
}
