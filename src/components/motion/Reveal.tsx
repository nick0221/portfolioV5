"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

/** Fade + rise on first entry. The default entrance for everything on the page. */
export function Reveal({
  children,
  delay = 0,
  distance = 18,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface MaskLineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Italic display lines sit lower than their box; compensate the clip. */
  pad?: boolean;
}

/**
 * A line of display type that rises out of its own baseline mask. Used for
 * the hero and section titles — the only place type is animated, because it
 * is the one place where the words ARE the layout.
 */
export function MaskLine({ children, delay = 0, className, pad = true }: MaskLineProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span
      className={cn(
        "block overflow-hidden",
        pad && "pb-[0.18em] -mb-[0.18em]",
        className,
      )}
    >
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface DrawRuleProps {
  className?: string;
  delay?: number;
  tone?: "rule" | "ink" | "accent";
}

/** A hairline that draws itself across on entry — the drafting gesture. */
export function DrawRule({ className, delay = 0, tone = "rule" }: DrawRuleProps) {
  const reduced = useReducedMotion();
  const color =
    tone === "ink" ? "bg-ink" : tone === "accent" ? "bg-accent" : "bg-rule";

  if (reduced) {
    return <div className={cn("h-px w-full", color, className)} />;
  }

  return (
    <motion.div
      className={cn("h-px w-full origin-left", color, className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
