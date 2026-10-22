import type { SectionLink } from "@/types/content";

/** Order and numbering of the drawing sheets. Hero is 01 and has no nav entry. */
export const sections: SectionLink[] = [
  { id: "profile", label: "Profile", index: "02" },
  { id: "work", label: "Selected Work", index: "03" },
  { id: "capabilities", label: "Capabilities", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "credentials", label: "Credentials", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

/** Stable array identity — safe as a hook dependency. */
export const SECTION_IDS: string[] = ["hero", ...sections.map((s) => s.id)];
