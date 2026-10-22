import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[100svh] flex-col">
      <div className="shell-line flex flex-1">
        <div className="shell flex flex-1 flex-col justify-center py-24">
          <p className="mono-label flex items-center gap-3">
            <span className="text-accent">(404)</span>
            <span>Sheet not found</span>
          </p>

          <h1 className="display-hero mt-8">
            Wrong
            <br />
            <span className="italic text-accent">drawing</span>.
          </h1>

          <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">
            This sheet was never filed, or it has been redrawn. The index of work
            lives one page back.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="mono-label inline-flex min-h-11 items-center gap-3 bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent"
            >
              Back to the portfolio <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#work"
              className="mono-label inline-flex min-h-11 items-center gap-3 border border-ink/25 px-5 py-3 text-ink transition-colors hover:border-ink"
            >
              Index of work
            </Link>
          </div>

          <div aria-hidden="true" className="mt-16 flex items-end gap-1">
            {Array.from({ length: 12 }, (_, index) => (
              <span
                key={index}
                className="h-px flex-1 bg-rule"
                style={{ opacity: 0.35 + index * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
