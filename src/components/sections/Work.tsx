import { WorkArchive } from "@/components/sections/WorkArchive";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 border-t border-rule">
      <div className="shell-line">
        <div className="shell py-20 md:py-28">
          <SectionHeader
            index="03"
            label="Selected Work"
            meta="Sheet 03 — 13 plates on file"
            title={
              <>
                Thirteen builds, and the systems{" "}
                <span className="italic text-accent">behind</span> them.
              </>
            }
            lede="Client sites for real estate, lending and retail; the internal systems a
            municipality, a pharmacy and a manufacturer actually run on. Each entry
            opens into its stack and screenshots."
          />

          <WorkArchive />
        </div>
      </div>
    </section>
  );
}
