"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  duration?: number;
  pad?: number;
  className?: string;
}

/**
 * Integer tween that runs once on entry. Hand-rolled rAF rather than a motion
 * value so it costs nothing when off-screen and can be read by SSR as the
 * final value (no CLS from a 0 → 92 swap after hydration).
 */
export function Counter({ to, duration = 1100, pad = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduced) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    setValue(0);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {String(value).padStart(pad, "0")}
    </span>
  );
}
