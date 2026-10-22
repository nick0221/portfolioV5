import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "quiet";
  external?: boolean;
  download?: boolean;
  className?: string;
}

/**
 * Text-first action. No rounded pills, no gradients — a rectangle drawn with
 * hairline rules that fills with ink on hover.
 */
export function ActionLink({
  href,
  children,
  variant = "outline",
  external = false,
  download = false,
  className,
}: ActionLinkProps) {
  const base =
    "group inline-flex min-h-11 items-center gap-3 px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-300";

  const styles = {
    solid: "bg-ink text-paper hover:bg-accent",
    outline:
      "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
    quiet: "text-ink hover:text-accent",
  } as const;

  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={download || undefined}
      className={cn(base, styles[variant], className)}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="translate-y-px text-[0.8em] transition-transform duration-300 group-hover:translate-x-1"
      >
        {download ? "↓" : "→"}
      </span>
    </a>
  );
}
