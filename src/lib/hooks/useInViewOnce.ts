"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first enters the viewport. Returns a ref to
 * attach and a boolean to drive CSS state.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  margin = "-10% 0px -10% 0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      // Async so the first paint is never blocked by a state flush.
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: margin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, inView]);

  return { ref, inView };
}
