"use client";

import Image from "next/image";

import { profile } from "@/lib/content/profile";
import { useScrollProgressVar } from "@/lib/hooks/useScrollProgress";

/**
 * The portrait plate. Only the image moves on scroll, and only slightly —
 * text parallax is a motion-sickness tax with no informational payoff. The
 * movement is a CSS transform driven by a single custom property, so React
 * never re-renders while the page scrolls.
 */
export function HeroPortrait() {
  const ref = useScrollProgressVar<HTMLDivElement>("--progress", 1, 0.35);

  return (
    <div ref={ref} className="relative">
      <div className="ticks relative overflow-hidden bg-paper-deep">
        <div className="relative aspect-[4/5] w-full">
          <div className="parallax-plate absolute inset-0">
            <Image
              src={profile.imageUrl ?? "/profile-pic.webp"}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 38vw"
              className="object-cover object-top grayscale-[18%] contrast-[1.02]"
            />
          </div>
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
