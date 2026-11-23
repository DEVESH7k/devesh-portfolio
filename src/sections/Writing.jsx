import { challengePhases, socialLinks, writingChannels } from "../constants";
import AnimatedSection, { Reveal, RevealGroup, RevealItem, SectionHeading } from "../components/AnimatedSection";
import { ArrowIcon } from "../components/Icons";

export default function Writing() {
  return (
    <AnimatedSection id="writing" label="Writing and continuous learning" className="bg-ink-soft/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Writing"
          title="Thirty days of writing down what I learned."
          accent={["learned."]}
        >
          A public technical sprint, published daily — and the places where the
          rest of the work gets written up.
        </SectionHeading>

        {/* Featured programme */}
        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal amount={0.3}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald-dim px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald">
                <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-emerald" />
                Completed
              </span>
              <h3 className="mt-6 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-chalk">
                30 Days of DevSecOps
              </h3>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-mist">
                A thirty-day publishing sprint on LinkedIn covering real production
                systems, incident post-mortems, and shift-left automation, split
                across four phases.
              </p>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-sm text-chalk"
              >
                <span className="link-underline">Read the series on LinkedIn</span>
                <ArrowIcon className="h-4 w-4 text-emerald transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <RevealGroup as="ol" stagger={0.08} amount={0.12} className="lg:col-span-8">
            {challengePhases.map((phase) => (
              <RevealItem
                as="li"
                key={phase.phase}
                className="group grid gap-3 border-t border-line py-7 sm:grid-cols-[auto_1fr] sm:gap-8 lg:py-8"
              >
                <div className="flex items-baseline gap-4 sm:w-[132px] sm:flex-col sm:gap-1">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-emerald/80">
                    {phase.phase}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist/75">
                    {phase.days}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-medium tracking-[-0.02em] text-chalk">
                    {phase.title}
                  </h4>
                  <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-mist">
                    {phase.summary}
                  </p>
                </div>
              </RevealItem>
            ))}
            <li aria-hidden="true" className="border-t border-line" />
          </RevealGroup>
        </div>

        {/* Where the writing lives */}
        <RevealGroup
          as="ul"
          stagger={0.08}
          amount={0.2}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 lg:mt-20"
        >
          {writingChannels.map((channel) => (
            <RevealItem as="li" key={channel.name} className="bg-ink">
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-3 p-7 transition-colors duration-500 ease-expo hover:bg-ink-soft sm:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-medium text-chalk">{channel.name}</span>
                  <ArrowIcon className="h-4 w-4 text-mist transition-[transform,color] duration-500 ease-expo group-hover:translate-x-1 group-hover:text-emerald" />
                </div>
                <span className="font-mono text-[11px] text-mist/75">{channel.handle}</span>
                <p className="mt-1 text-[13.5px] leading-relaxed text-mist">
                  {channel.description}
                </p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </AnimatedSection>
  );
}
