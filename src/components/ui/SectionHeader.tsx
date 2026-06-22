"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(centered ? "text-center" : "", className)}
    >
      {eyebrow && (
        <motion.p
          variants={item}
          className="mb-2 text-sm font-semibold tracking-widest text-brand-accent uppercase"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={item}
        className="text-3xl font-bold text-slate-900 sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.div variants={item} className={cn("mt-1", centered ? "flex justify-center" : "")}>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "block h-1 w-12 rounded-full bg-brand-accent origin-left",
            centered && "origin-center"
          )}
        />
      </motion.div>
      {subtitle && (
        <motion.p
          variants={item}
          className="mt-4 max-w-2xl text-slate-500 text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
