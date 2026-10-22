import type { ReactNode } from "react";

import { DrawRule, Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: string;
}

/**
 * Every sheet opens the same way: a drawn rule, a numbered annotation, then
 * the title. The repetition is the point — it makes the asymmetry inside each
 * section read as deliberate rather than accidental.
 */
export function SectionHeader({
  index,
  label,
  title,
  lede,
  meta,
}: SectionHeaderProps) {
  return (
    <header className="mb-14 md:mb-20">
      <DrawRule />
      <div className="mt-4 flex items-baseline justify-between gap-6">
        <p className="mono-label flex items-baseline gap-3">
          <span className="text-accent">({index})</span>
          <span className="text-ink">{label}</span>
        </p>
        {meta ? (
          <p className="mono-meta hidden text-right sm:block">{meta}</p>
        ) : null}
      </div>

      <Reveal distance={14}>
        <h2 className="display-section mt-7 md:mt-9">{title}</h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.1}>
          <div className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-soft">
            {lede}
          </div>
        </Reveal>
      ) : null}
    </header>
  );
}
