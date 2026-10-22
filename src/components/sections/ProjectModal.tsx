"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project;
  index: number;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Project detail sheet. Scrolls as one document rather than a nested
 * lightbox — a gallery inside a modal inside a page is three scroll contexts
 * fighting each other.
 */
export function ProjectModal({ project, index, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      restoreRef.current?.focus();
    };
  }, [handleKey]);

  const gallery = project.projectGallery ?? [];
  const cover = project.imageUrl;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/60 p-0 backdrop-blur-[1px] sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative my-0 w-full max-w-5xl border border-rule bg-paper sm:my-6"
      >
        <div className="sticky top-0 z-10 border-b border-rule bg-paper/95">
          <div className="flex items-start justify-between gap-6 px-5 py-4 sm:px-8">
            <div>
              <p className="mono-label flex items-center gap-3">
                <span className="text-accent">
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <span>Project sheet</span>
              </p>
              <h2
                id="project-modal-title"
                className="mt-2 font-display text-[1.65rem] leading-tight sm:text-4xl"
              >
                {project.title}
              </h2>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project sheet"
              className="mono-label mt-1 shrink-0 border border-ink/20 px-3 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              Close ✕
            </button>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 border-b border-rule pb-6 sm:grid-cols-2">
            <div>
              <p className="mono-label">Stack</p>
              <p className="mono-meta mt-2 !text-ink">
                {project.technologies?.join(" / ") ?? "—"}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="mono-label">Status</p>
              <p className="mono-meta mt-2 !text-ink">
                {project.projectUrl ? "Live" : "Case study"}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-[68ch] text-[1rem] leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.projectUrl ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label inline-flex min-h-11 items-center gap-2 bg-ink px-4 py-3 text-paper transition-colors hover:bg-accent"
              >
                Visit live site ↗
              </a>
            ) : null}
            {project.codeUrl ? (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label inline-flex min-h-11 items-center gap-2 border border-ink/25 px-4 py-3 text-ink transition-colors hover:border-ink"
              >
                Source ↗
              </a>
            ) : null}
          </div>

          <div className="mt-10">
            <div className="flex items-baseline justify-between">
              <p className="mono-label">Plates</p>
              <p className="mono-meta tabular">
                {String(gallery.length || (cover ? 1 : 0)).padStart(2, "0")} attached
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {gallery.length > 0
                ? gallery.map((image, i) => (
                    <figure key={`${image.urlImage}-${i}`} className="group">
                      <div className="relative aspect-[2/1] overflow-hidden border border-rule bg-paper-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset */}
                        <img
                          src={image.urlImage}
                          alt={`${project.title} — ${image.label}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                        />
                      </div>
                      <figcaption className="mono-meta mt-2">
                        <span className="text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        {image.label}
                      </figcaption>
                    </figure>
                  ))
                : cover
                  ? (
                      <figure className="sm:col-span-2">
                        <div className="relative aspect-[2/1] overflow-hidden border border-rule bg-paper-deep">
                          {/* eslint-disable-next-line @next/next/no-img-element -- static local asset */}
                          <img
                            src={cover}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <figcaption className="mono-meta mt-2">
                          Cover plate
                        </figcaption>
                      </figure>
                    )
                  : (
                      <p className="mono-meta">No plates archived for this project.</p>
                    )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
