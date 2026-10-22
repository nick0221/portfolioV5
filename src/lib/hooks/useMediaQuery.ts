"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as external state — no mount-time setState, no hydration
 * mismatch. The server snapshot is always `false`, so server HTML renders the
 * un-enhanced path and the client upgrades it.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const usePointerFine = () => useMediaQuery("(pointer: fine)");
