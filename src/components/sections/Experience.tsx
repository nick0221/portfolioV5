import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-rule">
      <div className="shell-line">
        <div className="shell py-20 md:py-28">
          <SectionHeader
            index="05"
            label="Experience"
            meta="Sheet 05 — Three roles since 2014"
            title={
              <>
                Seven years inside a manufacturer, then the{" "}
                <span className="italic text-accent">open market</span>.
              </>
            }
            lede="An ERP integrator, a manufacturer's internal systems programmer, and — since 2023 — a freelancer delivering client work end to end."
          />

          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
}
