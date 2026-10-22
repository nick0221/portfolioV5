import { links } from "@/lib/content/links";
import { profile } from "@/lib/content/profile";

const socials = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "Email", href: links.email },
].filter((item): item is { label: string; href: string } => Boolean(item.href));

/**
 * The title block of a technical drawing: who made it, what it is, when.
 */
export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell-line">
        <div className="shell py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="mono-label !tracking-[0.2em] text-ink">
                NICKDEVS<span className="text-accent">.</span>
              </p>
              <p className="mt-5 max-w-[24ch] font-display text-3xl leading-[1.05] md:text-4xl">
                {profile.name}
              </p>
              <p className="mono-meta mt-3">{profile.title}</p>
            </div>

            <div className="md:col-span-3">
              <p className="mono-label">Elsewhere</p>
              <ul className="mt-5 space-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="link-draw mono-meta !text-ink"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="mono-label">Document</p>
              <ul className="mono-meta mt-5 space-y-3">
                <li>Portfolio — Vol. 05</li>
                <li>Drawn 2026</li>
                <li>Set in Instrument Serif &amp; Geist</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="mono-meta">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <a
              href="#hero"
              className="mono-label inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
            >
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
