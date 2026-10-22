import { links } from "@/lib/content/links";

import { MaskLine, Reveal } from "@/components/motion/Reveal";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { ActionLink } from "@/components/ui/ActionLink";

const specs = [
  { label: "Based", value: "Philippines" },
  { label: "Practising since", value: "2014" },
  { label: "Core stack", value: "Laravel · Next.js" },
];

export function Hero() {
  return (
    <section id="hero" aria-label="Introduction" className="relative pt-14 md:pt-16">
      <div className="shell-line">
        <div className="shell flex min-h-[calc(100svh-3.5rem)] flex-col md:min-h-[calc(100svh-4rem)]">
          <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
            <p className="mono-label">Portfolio — Vol. 05</p>
            <p className="mono-label hidden text-accent sm:block">
              Full-stack / DevOps
            </p>
            <p className="mono-label tabular">2026</p>
          </div>

          <div className="grid flex-1 items-center gap-12 py-12 md:grid-cols-12 md:gap-8 md:py-14 lg:py-16">
            <div className="md:col-span-7">
              <h1 className="display-hero">
                <MaskLine delay={0.05}>Romnick</MaskLine>
                <MaskLine delay={0.17}>
                  <span className="italic">Sevilla</span>
                  <span className="text-accent">.</span>
                </MaskLine>
              </h1>

              <div className="mt-8 max-w-[52ch] md:mt-10">
                <Reveal delay={0.36} distance={12}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink">
                    Full-Stack Web Developer{" "}
                    <span className="text-accent">/</span> DevOps Enthusiast
                  </p>
                </Reveal>

                <Reveal delay={0.46} distance={12}>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
                    A decade building the systems companies actually run on — internal
                    management information systems, ERPs and reporting — and the
                    public-facing sites they are judged by. Laravel and Next.js, end to
                    end.
                  </p>
                </Reveal>

                <Reveal delay={0.56} distance={12}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ActionLink href="#work" variant="solid">
                      Selected work
                    </ActionLink>
                    <ActionLink href={links.cv} variant="outline" download>
                      Download CV
                    </ActionLink>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="md:col-span-5 md:pl-4 lg:pl-12">
              <Reveal delay={0.28} distance={22}>
                <HeroPortrait />
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-rule md:grid-cols-4">
            {specs.map((spec) => (
              <div key={spec.label} className="border-r border-rule/70 py-4 pr-4 last:border-r-0 md:py-5">
                <p className="mono-label">{spec.label}</p>
                <p className="mono-meta mt-2 !text-ink">{spec.value}</p>
              </div>
            ))}

            <div className="col-span-2 flex items-center justify-between py-4 pl-0 md:col-span-1 md:justify-end md:pr-1">
              <p className="mono-label">Scroll</p>
              <span aria-hidden="true" className="cue-line ml-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
