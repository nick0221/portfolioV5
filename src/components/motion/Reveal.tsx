"use client";

import type { CSSProperties, ReactNode } from "react";

import { useInViewOnce } from "@/lib/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

/**
 * Entrance primitives.
 *
 * All three are CSS transitions toggled by a data attribute — the browser
 * animates, React flips one flag once. Hidden states are scoped under `.js`
 * (set by an inline script before paint), so with JavaScript disabled every
 * element renders in its final position instead of staying invisible.
 */

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, distance = 18, className }: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-in={inView ? "" : undefined}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-distance": `${distance}px`,
          transitionDelay: `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

interface MaskLineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** A line of display type that rises out of its own baseline mask. */
export function MaskLine({ children, delay = 0, className }: MaskLineProps) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      data-in={inView ? "" : undefined}
      className={cn("mask-line block", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="mask-line-inner block">{children}</span>
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
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-5% 0px");

  const color =
    tone === "ink" ? "bg-ink" : tone === "accent" ? "bg-accent" : "bg-rule";

  return (
    <div
      ref={ref}
      data-in={inView ? "" : undefined}
      className={cn("rule-grow h-px w-full origin-left", color, className)}
      style={{ transitionDelay: `${delay}s` }}
    />
  );
}
