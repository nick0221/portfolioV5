export default function Loading() {
  return (
    <div className="shell-line flex min-h-[100svh] items-center">
      <div className="shell">
        <p className="mono-label flex items-center gap-3">
          <span className="text-accent">(··)</span>
          <span>Pulling the sheet</span>
        </p>
        <div aria-hidden="true" className="mt-6 h-px w-full bg-rule">
          <div className="cue-line-bar h-px w-1/3 bg-accent" />
        </div>
      </div>
    </div>
  );
}
