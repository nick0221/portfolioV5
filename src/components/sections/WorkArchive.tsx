"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { projects } from "@/lib/content/projects";
import { usePointerFine } from "@/lib/hooks/useMediaQuery";
import { cn, shortTitle } from "@/lib/utils";

import { ProjectModal } from "@/components/sections/ProjectModal";

/**
 * The project archive. Rows, not cards: thirteen cover images stacked into a
 * grid would fight each other and turn the page into a gallery wall. The list
 * stays typographic and the image arrives under the cursor, one at a time,
 * the way a drawing gets pulled out of a plan chest.
 */
export function WorkArchive() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const pointerFine = usePointerFine();

  const previewRef = useRef<HTMLDivElement | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });

  /** Filters are derived from the data, most common stack first. */
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.technologies ?? []) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, []);

  const visible = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index }))
        .filter(
          ({ project }) =>
            filter === null || (project.technologies ?? []).includes(filter),
        ),
    [filter],
  );

  const openIndex = open;
  const openProject = openIndex !== null ? projects[openIndex] : undefined;
  const position =
    openIndex !== null ? visible.findIndex((item) => item.index === openIndex) : -1;

  const previewProject = hovered !== null ? projects[hovered] : undefined;

  const movePreview = (clientX: number, clientY: number) => {
    pointRef.current = { x: clientX + 28, y: clientY - 96 };
    const element = previewRef.current;
    if (element) {
      element.style.transform = `translate3d(${pointRef.current.x}px, ${pointRef.current.y}px, 0)`;
    }
  };

  // First paint of the preview lands where the pointer already is.
  useLayoutEffect(() => {
    const element = previewRef.current;
    if (!element) return;
    const { x, y } = pointRef.current;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [hovered]);

  const step = (delta: number) => {
    if (visible.length === 0 || position < 0) return;
    const next = (position + delta + visible.length) % visible.length;
    const target = visible[next];
    if (target) setOpen(target.index);
  };

  return (
    <>
      <div className="flex items-baseline justify-between border-b border-ink pb-3">
        <p className="mono-label text-ink">Index of work</p>
        <p className="mono-meta tabular">
          {String(visible.length).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")} shown
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-rule py-3">
        <span className="mono-label mr-1">Filter</span>
        <button
          type="button"
          onClick={() => setFilter(null)}
          aria-pressed={filter === null}
          className={cn(
            "mono-label min-h-9 border px-2.5 py-2 transition-colors",
            filter === null
              ? "border-ink bg-ink text-paper"
              : "border-rule text-muted hover:border-ink hover:text-ink",
          )}
        >
          All
        </button>
        {filters.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setFilter(filter === item.name ? null : item.name)}
            aria-pressed={filter === item.name}
            className={cn(
              "mono-label min-h-9 border px-2.5 py-2 transition-colors",
              filter === item.name
                ? "border-ink bg-ink text-paper"
                : "border-rule text-muted hover:border-ink hover:text-ink",
            )}
          >
            {item.name}
            <span className="ml-1.5 tabular opacity-60">{item.count}</span>
          </button>
        ))}
      </div>

      <ul
        className="border-b border-rule"
        onPointerMove={(event) => {
          if (pointerFine) movePreview(event.clientX, event.clientY);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {visible.map(({ project, index }, position2) => {
          const { lead, rest } = shortTitle(project.title);
          const live = Boolean(project.projectUrl);

          return (
            <li
              key={project.title}
              className="row-enter border-b border-rule last:border-b-0"
              style={{ animationDelay: `${Math.min(position2 * 35, 280)}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpen(index)}
                onPointerEnter={(event) => {
                  setHovered(index);
                  if (pointerFine) movePreview(event.clientX, event.clientY);
                }}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                aria-label={`Open project sheet: ${project.title}`}
                className="group relative grid w-full grid-cols-[2.25rem_1fr] items-baseline gap-x-3 gap-y-3 py-6 text-left md:grid-cols-12 md:gap-x-4 md:py-7"
              >
                <span aria-hidden="true" className="mono-meta tabular pt-1 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="md:col-span-6">
                  <span className="block font-display text-[1.6rem] leading-[1.08] transition-colors duration-300 group-hover:text-accent md:text-[2rem]">
                    {lead}
                  </span>
                  {rest ? (
                    <span className="mono-meta mt-1.5 block leading-relaxed">{rest}</span>
                  ) : null}
                </span>

                <span className="col-start-2 flex flex-wrap gap-x-2 gap-y-1 md:col-span-3 md:col-start-auto">
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
                  <span className="relative col-start-2 mt-1 block aspect-[16/9] overflow-hidden border border-rule bg-paper-deep md:hidden">
                    <Image
                      src={project.imageUrl}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </span>
                ) : null}

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="mono-meta py-8">
          No sheets under that stack yet.{" "}
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="link-draw !text-ink"
          >
            Clear the filter
          </button>
        </p>
      ) : null}

      <p className="mono-meta mt-5">
        {pointerFine
          ? "Hover a row to preview — click to open the sheet."
          : "Tap a row to open the sheet."}
      </p>

      {/* Cursor-follow preview (fine pointers only) */}
      {pointerFine && previewProject?.imageUrl && open === null ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="preview-follow pointer-events-none fixed left-0 top-0 z-30 hidden w-[300px] md:block"
        >
          <div className="border border-ink/15 bg-paper p-1.5 shadow-[0_18px_40px_-24px_rgba(18,21,15,0.55)]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={previewProject.imageUrl}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <p className="mono-meta mt-1.5 px-1 pb-0.5">
              {previewProject.technologies?.[0] ?? "Case study"}
            </p>
          </div>
        </div>
      ) : null}

      {openProject && openIndex !== null ? (
        <ProjectModal
          project={openProject}
          index={openIndex}
          position={position >= 0 ? position + 1 : 1}
          total={visible.length}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
