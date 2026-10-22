"use client";

import { useCallback, useEffect, useState } from "react";

import { links } from "@/lib/content/links";
import { SECTION_IDS, sections } from "@/lib/content/sections";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { useDocumentProgressVar } from "@/lib/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const activeSheet = sections.find((section) => section.id === active);
  const progressRef = useDocumentProgressVar<HTMLDivElement>();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/92 print:hidden">
        <div className="shell-line">
          <div className="shell flex h-14 items-center justify-between md:h-16">
            <a
              href="#hero"
              className="mono-label !text-[0.72rem] !tracking-[0.2em] text-ink transition-colors hover:text-accent"
            >
              NICKDEVS<span className="text-accent">.</span>
            </a>

            <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "true" : undefined}
                  className={cn(
                    "mono-label transition-colors duration-300 hover:text-ink",
                    active === section.id ? "text-accent" : "text-muted",
                  )}
                >
                  {section.label}
                </a>
              ))}
              <span
                aria-hidden="true"
                className="mono-label tabular text-muted"
                title="Current sheet"
              >
                {activeSheet?.index ?? "01"} / {String(sections.length + 1).padStart(2, "0")}
              </span>
              <a
                href={links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label border border-ink/20 px-3 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                CV ↗
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-index"
              className="mono-label text-ink lg:hidden"
            >
              {open ? "CLOSE" : "INDEX"}
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          aria-hidden="true"
          className="nav-progress absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        />
      </header>

      {open ? (
        <div
          id="mobile-index"
          role="dialog"
          aria-modal="true"
          aria-label="Section index"
          className="fixed inset-0 z-40 flex flex-col bg-paper lg:hidden"
        >
          <div className="shell flex flex-1 flex-col justify-center pt-16">
            <ul>
              {sections.map((section, index) => (
                <li
                  key={section.id}
                  className="overlay-item border-b border-rule"
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <a
                    href={`#${section.id}`}
                    onClick={close}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="mono-label text-accent">{section.index}</span>
                    <span className="font-display text-[2rem] leading-none">
                      {section.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={links.cv}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mono-label inline-flex items-center gap-2 text-ink"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <a
                href={links.email}
                onClick={close}
                className="mono-label inline-flex items-center gap-2 text-muted"
              >
                Email <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
