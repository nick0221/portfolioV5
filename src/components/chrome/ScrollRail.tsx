"use client";

import { SECTION_IDS, sections } from "@/lib/content/sections";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * Sheet index down the left margin. Wide screens only — it is an annotation,
 * not navigation the layout depends on.
 */
export function ScrollRail() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <aside
      aria-label="Sheet index"
      className="pointer-events-none fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 min-[1680px]:block print:hidden"
    >
      <ul className="pointer-events-auto flex flex-col gap-4 pl-5">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${section.label} — sheet ${section.index}`}
                className="group flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "w-7 bg-accent"
                      : "w-3 bg-rule group-hover:w-5 group-hover:bg-muted",
                  )}
                />
                <span
                  className={cn(
                    "mono-label tabular transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted/70 group-hover:text-ink",
                  )}
                >
                  {section.index}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
