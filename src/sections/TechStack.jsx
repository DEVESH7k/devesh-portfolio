import { techGroups } from "../constants";
import AnimatedSection, { Reveal, SectionHeading } from "../components/AnimatedSection";
import TechMark from "../components/TechMark";

export default function TechStack() {
  return (
    <AnimatedSection id="skills" label="Technology stack">
      <div className="shell">
        <SectionHeading
          eyebrow="Stack"
          title="The tools I reach for."
          accent={["tools"]}
        >
          Grouped the way I actually use them — from the cloud underneath to the
          scanners that gate every release.
        </SectionHeading>

        <div className="mt-14 lg:mt-20">
          {techGroups.map((group, groupIndex) => (
            <div key={group.id} className="border-t border-line py-10 lg:py-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <Reveal amount={0.4} delay={0.02}>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-chalk sm:text-2xl">
                      {group.title}
                    </h3>
                    <p className="mt-2 max-w-[34ch] text-sm text-mist/80">{group.blurb}</p>
                    <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.22em] text-mist/75">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                  </Reveal>
                </div>

                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
                  {group.items.map((item, i) => (
                    <Reveal
                      as="li"
                      key={item.name}
                      delay={0.04 * i}
                      amount={0.2}
                      className="group relative overflow-hidden rounded-2xl border border-line/70 p-5 transition-[border-color,transform] duration-500 ease-expo hover:-translate-y-1 hover:border-line-strong"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-expo group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(80% 70% at 50% 0%, rgba(0,223,162,0.13), transparent 72%)",
                        }}
                      />
                      <span className="relative flex h-full flex-col justify-between gap-6">
                        <TechMark
                          name={item.name}
                          className="h-9 w-9 text-mist/65 transition-[color,transform] duration-500 ease-expo group-hover:scale-105 group-hover:text-chalk"
                        />
                        <span className="block">
                          <span className="block text-[15px] font-medium tracking-[-0.015em] text-chalk">
                            {item.name}
                          </span>
                          <span className="mt-1 block text-[12px] leading-snug text-mist/75">
                            {item.note}
                          </span>
                        </span>
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </AnimatedSection>
  );
}
