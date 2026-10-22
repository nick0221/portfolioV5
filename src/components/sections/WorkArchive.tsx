"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { projects } from "@/lib/content/projects";
import { usePointerFine } from "@/lib/hooks/usePointerFine";
import { shortTitle } from "@/lib/utils";

import { ProjectModal } from "@/components/sections/ProjectModal";

/**
 * The project archive. Rows, not cards: thirteen cover images stacked into a
 * grid would fight each other and turn the page into a gallery wall. Instead
 * the list stays typographic and the image arrives under the cursor, one at a
 * time, the way a drawing gets pulled out of a plan chest.
 */
export function WorkArchive() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const pointerFine = usePointerFine();
  const listRef = useRef<HTMLUListElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.45 });

  const rows = useMemo(
    () =>
      projects.map((project, index) => ({
        project,
        index,
        ...shortTitle(project.title),
        live: Boolean(project.projectUrl),
      })),
    [],
  );

  const activeProject = hovered !== null ? projects[hovered] : undefined;
  const openProject = open !== null ? projects[open] : undefined;

  return (
    <>
      <div className="flex items-baseline justify-between border-b border-ink pb-3">
        <p className="mono-label text-ink">Index of work</p>
        <p className="mono-meta tabular">
          {String(projects.length).padStart(2, "0")} entries
        </p>
      </div>

      <ul
        ref={listRef}
        className="border-b border-rule"
        onPointerMove={(event) => {
          if (!pointerFine) return;
          x.set(event.clientX + 28);
          y.set(event.clientY - 96);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {rows.map(({ project, index, lead, rest, live }) => (
          <li key={project.title} className="border-b border-rule last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(index)}
              onPointerEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              aria-label={`Open project sheet: ${project.title}`}
              className="group relative grid w-full grid-cols-[2.25rem_1fr] items-baseline gap-x-3 gap-y-3 py-6 text-left md:grid-cols-12 md:gap-x-4 md:py-7"
            >
              <span
                aria-hidden="true"
                className="mono-meta tabular pt-1 md:col-span-1"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="md:col-span-5">
                <span className="block font-display text-[1.6rem] leading-[1.08] transition-colors duration-300 group-hover:text-accent md:text-[2rem]">
                  {lead}
                </span>
                {rest ? (
                  <span className="mono-meta mt-1.5 block leading-relaxed">{rest}</span>
                ) : null}
              </span>

              <span className="col-start-2 flex flex-wrap gap-x-2 gap-y-1 md:col-span-4 md:col-start-auto">
                {project.technologies?.map((tech, techIndex) => (
                  <span key={tech} className="mono-meta">
                    {tech}
                    {techIndex < (project.technologies?.length ?? 0) - 1 ? (
                      <span className="text-rule"> / </span>
                    ) : null}
                  </span>
                ))}
              </span>

              <span className="col-start-2 flex items-center gap-4 md:col-span-2 md:justify-end">
                <span className="mono-label">{live ? "Live" : "Case"}</span>
                <span
                  aria-hidden="true"
                  className="mono-label text-muted transition-colors duration-300 group-hover:text-accent"
                >
                  Open ↗
                </span>
              </span>

              {project.imageUrl ? (
                <span className="col-start-2 mt-1 block overflow-hidden border border-rule bg-paper-deep md:hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static local asset */}
                  <img
                    src={project.imageUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover"
                  />
                </span>
              ) : null}

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </button>
          </li>
        ))}
      </ul>

      <p className="mono-meta mt-5">
        {pointerFine ? "Hover a row to preview — click to open the sheet." : "Tap a row to open the sheet."}
      </p>

      {/* Cursor-follow preview (fine pointers only) */}
      <AnimatePresence>
        {pointerFine && activeProject?.imageUrl && open === null ? (
          <motion.div
            key={activeProject.title}
            aria-hidden="true"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[300px] md:block"
          >
            <div className="border border-ink/15 bg-paper p-1.5 shadow-[0_18px_40px_-24px_rgba(18,21,15,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static local asset */}
              <img
                src={activeProject.imageUrl}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
              <p className="mono-meta mt-1.5 px-1 pb-0.5">
                {activeProject.technologies?.[0] ?? "Case study"}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {openProject && open !== null ? (
          <ProjectModal
            project={openProject}
            index={open}
            onClose={() => setOpen(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
