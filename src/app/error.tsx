"use client";

import { useEffect } from "react";

/**
 * Error boundary. Styled with the same tokens as the site so a failure never
 * drops the reader into a page that looks like a different product.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the failure for monitoring instead of swallowing it.
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="relative flex min-h-[100svh] flex-col">
      <div className="shell-line flex flex-1">
        <div className="shell flex flex-1 flex-col justify-center py-24">
          <p className="mono-label flex items-center gap-3">
            <span className="text-accent">(ERR)</span>
            <span>Sheet damaged</span>
          </p>

          <h1 className="display-hero mt-8">
            Something
            <br />
            <span className="italic text-accent">tore</span>.
          </h1>

          <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">
            The page failed to render. Reloading usually re-files it; if it keeps
            happening, the address is worth reporting.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="mono-label inline-flex min-h-11 items-center gap-3 bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent"
            >
              Try again <span aria-hidden="true">↻</span>
            </button>
            <a
              href="/"
              className="mono-label inline-flex min-h-11 items-center gap-3 border border-ink/25 px-5 py-3 text-ink transition-colors hover:border-ink"
            >
              Back to the portfolio
            </a>
          </div>

          {error.digest ? (
            <p className="mono-meta mt-8">Reference: {error.digest}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
