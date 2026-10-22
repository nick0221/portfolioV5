"use client";

import { experience } from "@/lib/content/experience";
import { useScrollProgressVar } from "@/lib/hooks/useScrollProgress";

/** A line that follows the roles into view, exactly as far as you have read. */
export function ExperienceTimeline() {
  const ref = useScrollProgressVar<HTMLDivElement>("--progress", 0.72, 0.65);

  return (
    <div ref={ref} className="relative pl-7 md:pl-0">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px bg-rule md:left-[10.5rem]"
      />
      <div
        aria-hidden="true"
        className="timeline-progress absolute bottom-0 left-0 top-0 w-px origin-top bg-accent md:left-[10.5rem]"
      />

      {experience.map((role) => (
        <article
          key={`${role.company}-${role.date}`}
          className="relative border-b border-rule py-10 last:border-b-0 md:grid md:grid-cols-[9rem_1fr] md:gap-12 md:py-12"
        >
          <div className="md:pt-1.5">
            <p className="mono-meta tabular">{role.date}</p>
          </div>

          <div className="mt-3 md:mt-0">
            <h3 className="font-display text-[1.6rem] leading-[1.1] md:text-[2rem]">
              {role.title}
            </h3>

            <p className="mono-meta mt-1.5">
              {role.companyUrl ? (
                <a
                  href={role.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw !text-ink"
                >
                  {role.company} ↗
                </a>
              ) : (
                role.company
              )}
            </p>

            <ul className="mt-4 max-w-[60ch] space-y-2">
              {role.description.map((line, index) => {
                const isLeadIn = line.trimEnd().endsWith(":");

                return isLeadIn ? (
                  <li
                    key={`${index}-${line.slice(0, 12)}`}
                    className="mono-label pt-2 !text-[0.66rem] !text-muted"
                  >
                    {line}
                  </li>
                ) : (
                  <li
                    key={`${index}-${line.slice(0, 12)}`}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-1 w-1 shrink-0 bg-accent"
                    />
                    <span>{line}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <span
            aria-hidden="true"
            className="absolute left-0 top-[3.35rem] h-[7px] w-[7px] -translate-x-1/2 border border-ink bg-paper md:left-[10.5rem] md:top-[3.7rem]"
          />
        </article>
      ))}
    </div>
  );
}
