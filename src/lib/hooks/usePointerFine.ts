"use client";

import { useEffect, useState } from "react";

/**
 * True only for devices with a real pointing device. Used to gate
 * cursor-follow and hover-preview behaviours so touch users never get
 * half-working interactions.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
