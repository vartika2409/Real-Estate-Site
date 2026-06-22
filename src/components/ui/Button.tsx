"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm",
  ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/10",
  outline: "border border-brand-primary text-brand-primary hover:bg-brand-primary/10",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...(props as object)}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  );
}
