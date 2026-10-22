"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { profile } from "@/lib/content/profile";

/**
 * The portrait plate. Only the image moves on scroll, and only slightly —
 * text parallax is a motion-sickness tax with no informational payoff.
 */
export function HeroPortrait() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 56]);

  return (
    <div ref={ref} className="relative">
      <div className="ticks relative overflow-hidden bg-paper-deep">
        <div className="aspect-[4/5] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, sized by CSS */}
          <motion.img
            src={profile.imageUrl ?? "/profile-pic.webp"}
            alt={`Portrait of ${profile.name}`}
            width={400}
            height={500}
            fetchPriority="high"
            style={reduced ? undefined : { y }}
            className="h-full w-full scale-[1.04] object-cover object-top grayscale-[18%] contrast-[1.02]"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-accent/8 mix-blend-multiply"
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="mono-meta">Fig. 01 — Subject</p>
        <p className="mono-meta tabular">PH · 2026</p>
      </div>
    </div>
  );
}
