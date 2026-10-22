"use client";

import { useState } from "react";

import { links } from "@/lib/content/links";
import { profile } from "@/lib/content/profile";

/**
 * Copy-to-clipboard on the address itself. The mailto fallback is not a
 * decoration: clipboard permissions fail on insecure origins and in some
 * embedded browsers, and an unreachable contact section is a dead end.
 */
export function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setFailed(true);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCopy}
        className="group flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-y border-ink py-5 text-left"
      >
        <span className="font-display text-[clamp(1.35rem,4.2vw,2.9rem)] leading-none transition-colors duration-300 group-hover:text-accent">
          {profile.email}
        </span>
        <span className="mono-label shrink-0 text-muted" aria-live="polite">
          {copied ? "Copied ✓" : "Click to copy"}
        </span>
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a href={links.email} className="mono-label text-ink transition-colors hover:text-accent">
          Open mail app ↗
        </a>
        {failed ? (
          <span className="mono-meta text-accent">
            Clipboard blocked — use the mail link.
          </span>
        ) : null}
      </div>
    </div>
  );
}
