"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useInView, animate, motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ target, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toLocaleString() + suffix;
        }
      },
    });
    return controls.stop;
  }, [isInView, motionValue, target, suffix, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      0{suffix}
    </motion.span>
  );
}
