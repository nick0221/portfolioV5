import { skills } from "@/lib/content/skills";

import { Reveal } from "@/components/motion/Reveal";
import { SkillMeter } from "@/components/sections/SkillMeter";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-16 border-t border-rule">
      <div className="shell-line">
        <div className="shell py-20 md:py-28">
          <SectionHeader
            index="04"
            label="Capabilities"
            meta="Sheet 04 — Calibration, self-assessed"
            title={
              <>
                What I reach for, and how{" "}
                <span className="italic text-accent">honestly</span> I rate it.
              </>
            }
            lede="These are self-assessed levels — a calibration of day-to-day confidence, not a benchmark score. The stack below is what actually ships my work."
          />

          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((group, groupIndex) => (
              <Reveal key={group.category} delay={Math.min(groupIndex * 0.05, 0.2)}>
                <div className="border-t border-ink pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="mono-label !text-[0.7rem] text-ink">
                      {group.category}
                    </h3>
                    <span className="mono-meta tabular">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-3">
                    {group.skills.map((skill) => (
                      <SkillMeter
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mono-meta mt-10 max-w-[62ch] border-t border-rule pt-5">
              Legend — each tick is 5 points of confidence; the numeral is the
              self-rated level out of 100.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
