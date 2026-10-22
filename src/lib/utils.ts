export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Turn a project title into a stable DOM id / slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Strip the leading article/qualifier noise some project titles carry. */
export function shortTitle(title: string): { lead: string; rest: string } {
  const split = title.split(/\s[-–—]\s/);
  if (split.length > 1) {
    return { lead: split[0] ?? title, rest: split.slice(1).join(" — ") };
  }
  return { lead: title, rest: "" };
}
