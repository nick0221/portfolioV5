import { links } from "@/lib/content/links";

import { Reveal } from "@/components/motion/Reveal";
import { EmailCopy } from "@/components/sections/EmailCopy";
import { SectionHeader } from "@/components/ui/SectionHeader";

const channels = [
  { label: "GitHub", href: links.github, note: "Code, including this site" },
  { label: "LinkedIn", href: links.linkedin, note: "Professional history" },
  { label: "Curriculum vitae", href: links.cv, note: "PDF, one page" },
].filter((channel): channel is { label: string; href: string; note: string } =>
  Boolean(channel.href),
);

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-rule">
      <div className="shell-line">
        <div className="shell py-20 md:py-28">
          <SectionHeader
            index="07"
            label="Contact"
            meta="Sheet 07 — Correspondence"
            title={
              <>
                Let&rsquo;s build something that{" "}
                <span className="italic text-accent">holds up</span>.
              </>
            }
            lede="Available for freelance work — business systems, web applications, or a site that has to look as good as it performs. Email is the fastest way to reach me."
          />

          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Reveal>
                <EmailCopy />
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <p className="mono-label">Elsewhere</p>
              <ul className="mt-4 border-t border-rule">
                {channels.map((channel) => (
                  <li key={channel.label} className="border-b border-rule">
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block text-[0.95rem] text-ink transition-colors group-hover:text-accent">
                          {channel.label}
                        </span>
                        <span className="mono-meta mt-0.5 block">{channel.note}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mono-label text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mono-meta mt-6">Philippines · UTC+8</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
