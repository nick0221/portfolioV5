"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress written straight onto an element as a CSS custom property.
 *
 * The browser does the animation (transform inside the stylesheet); React
 * never re-renders while scrolling. One rAF-throttled listener per consumer,
 * passive, removed on unmount.
 */
export function useScrollProgressVar<T extends HTMLElement = HTMLDivElement>(
  cssVar = "--progress",
  startRatio = 0.72,
  endRatio = 0.65,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * startRatio;
      const end = viewport * endRatio;
      const span = Math.max(rect.height + (start - end), 1);
      const progress = Math.min(1, Math.max(0, (start - rect.top) / span));
      element.style.setProperty(cssVar, progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cssVar, startRatio, endRatio]);

  return ref;
}

/** Whole-document progress, for the nav hairline. */
export function useDocumentProgressVar<T extends HTMLElement = HTMLDivElement>(
  cssVar = "--progress",
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      element.style.setProperty(cssVar, progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cssVar]);

  return ref;
}
