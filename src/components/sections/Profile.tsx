import { links } from "@/lib/content/links";
import { profile } from "@/lib/content/profile";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const spec = [
  { label: "Based", value: "Philippines" },
  { label: "Practising", value: "2014 — present" },
  { label: "Focus", value: "Business systems & web apps" },
  { label: "Current", value: "Freelance, since 2023" },
];

export function Profile() {
  return (
    <section id="profile" className="scroll-mt-16 border-t border-rule">
      <div className="shell-line">
        <div className="shell py-20 md:py-28">
          <SectionHeader
            index="02"
            label="Profile"
            meta="Sheet 02 — Notes on the practice"
            title={
              <>
                Systems built to survive{" "}
                <span className="italic text-accent">Monday morning</span>.
              </>
            }
          />

          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="order-2 md:order-1 md:col-span-4">
              <div className="md:sticky md:top-24">
                <p className="mono-label">Particulars</p>
                <dl className="mt-5 border-t border-rule">
                  {spec.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                    >
                      <dt className="mono-meta">{item.label}</dt>
                      <dd className="mono-meta text-right !text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-col gap-2">
                  <a href={links.email} className="link-draw mono-meta !text-ink">
                    {profile.email}
                  </a>
                  <a
                    href={links.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw mono-meta !text-ink"
                  >
                    Curriculum vitae (PDF)
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 md:col-span-7 md:col-start-6">
              <Reveal>
                <p className="display-quote">
                  I started in 2014 writing tooling against a NetSuite ERP. A decade
                  later the stack has changed; the job has not — take a messy internal
                  process and make it something a real person can use on a Monday.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
                  <p>
                    Seven of those years were at Yamaha Motor Philippines, where I
                    rebuilt the Time Commitment Service into a standalone web
                    application and built the department management information systems
                    and reporting that fed it. Since 2023 I have been freelancing,
                    delivering client sites and business applications end to end.
                  </p>
                  <p>
                    My default stack is Laravel and Livewire on the server, Next.js and
                    React on the front, MySQL underneath. I care about the unglamorous
                    parts: correct data, fast pages, and interfaces a non-technical
                    colleague can use without being trained on them.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10 border-t border-rule pt-6">
                  <p className="mono-label">Working principles</p>
                  <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-ink-soft">
                    <li className="flex gap-3">
                      <span aria-hidden="true" className="mono-meta text-accent">
                        01
                      </span>
                      Ship the part that has to be right before the part that looks good.
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden="true" className="mono-meta text-accent">
                        02
                      </span>
                      Write it so the next developer — or future me — can read it.
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden="true" className="mono-meta text-accent">
                        03
                      </span>
                      Measure the page, not the mockup.
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
