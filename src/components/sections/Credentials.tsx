import { certifications } from "@/lib/content/certifications";
import { education } from "@/lib/content/education";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Credentials() {
  const degree = education[0];

  return (
    <section id="credentials" className="scroll-mt-16 border-t border-rule">
      <div className="shell-line">
        <div className="shell py-20 md:py-28">
          <SectionHeader
            index="06"
            label="Credentials"
            meta="Sheet 06 — Education & certification"
            title={
              <>
                Where it started, and what I keep{" "}
                <span className="italic text-accent">adding</span> to it.
              </>
            }
            lede="A degree earned in 2014, and four certifications since — the two most recent completed with Google this year."
          />

          {degree ? (
            <Reveal>
              <div className="grid gap-6 border-y border-ink py-8 md:grid-cols-12 md:items-baseline">
                <p className="mono-label md:col-span-2">{degree.year}</p>
                <div className="md:col-span-7">
                  <h3 className="font-display text-[1.7rem] leading-tight md:text-[2.2rem]">
                    {degree.degree}
                  </h3>
                  <p className="mono-meta mt-2">{degree.institution}</p>
                </div>
                <p className="mono-label md:col-span-3 md:text-right">Education</p>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-12">
            <div className="flex items-baseline justify-between">
              <p className="mono-label text-ink">Certifications</p>
              <p className="mono-meta tabular">
                {String(certifications.length).padStart(2, "0")} on record
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {certifications.map((certification, index) => (
                <Reveal
                  key={certification.title}
                  delay={Math.min(index * 0.06, 0.24)}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col border border-rule bg-paper-soft/40 p-5 transition-colors duration-300 hover:border-ink sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="mono-label !text-[0.66rem] text-accent">
                        {certification.issuer}
                      </span>
                      <span className="mono-meta tabular">{certification.date}</span>
                    </div>

                    <h4 className="mt-4 font-display text-[1.35rem] leading-[1.15] sm:text-[1.5rem]">
                      {certification.title}
                    </h4>

                    {certification.shortDescription ? (
                      <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                        {certification.shortDescription}
                      </p>
                    ) : null}

                    <div className="mt-auto pt-6">
                      {certification.credentialUrl ? (
                        <a
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label inline-flex min-h-11 items-center gap-2 text-ink transition-colors hover:text-accent"
                        >
                          View credential
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            ↗
                          </span>
                        </a>
                      ) : (
                        <span className="mono-meta">No public credential link</span>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
