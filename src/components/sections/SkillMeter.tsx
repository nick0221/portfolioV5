"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const DOTS = 20;

interface SkillMeterProps {
  name: string;
  level: number;
}

/**
 * Dotted calibration meter. Each dot is a discrete unit of confidence, lit in
 * sequence — a bar chart would imply precision this scale does not have.
 */
export function SkillMeter({ name, level }: SkillMeterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const filled = Math.round((level / 100) * DOTS);

  return (
    <div
      ref={ref}
      className="flex items-center justify-between gap-3 border-b border-rule/70 py-2 last:border-b-0"
    >
      <span className="text-[0.9rem] leading-snug text-ink-soft">{name}</span>

      <span className="flex shrink-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex items-center gap-[3px]"
          title={`${level} of 100`}
        >
          {Array.from({ length: DOTS }, (_, index) => (
            <span
              key={index}
              style={{ transitionDelay: `${index * 14}ms` }}
              className={cn(
                "h-2 w-[3px] transition-colors duration-300",
                inView && index < filled ? "bg-accent" : "bg-rule",
              )}
            />
          ))}
        </span>
        <span className="mono-meta tabular w-5 text-right !text-ink">{level}</span>
      </span>
    </div>
  );
}
