import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experiences } from "../constants";
import AnimatedSection, { Reveal, SectionHeading } from "../components/AnimatedSection";
import TechMark from "../components/TechMark";
import { ExternalIcon } from "../components/Icons";

export default function Experience() {
  const timeline = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timeline,
    offset: ["start 72%", "end 68%"],
  });
  /* The rail fills as the reader moves through the roles. */
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <AnimatedSection id="experience" label="Professional experience" className="bg-ink-soft/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="A career built on automation."
          accent={["automation."]}
        >
          From large-scale data operations to running the pipelines and hosts that
          customers depend on every day.
        </SectionHeading>

        <div ref={timeline} className="relative mt-16 lg:mt-20">
          {/* Rail */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block"
          />
          <motion.span
            aria-hidden="true"
            style={prefersReduced ? { scaleY: 1 } : { scaleY: progress }}
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-emerald via-cyan to-azure sm:block"
          />

          <ol className="space-y-16 sm:space-y-20">
            {experiences.map((job, index) => (
              <li key={job.company} className="relative sm:pl-12">
                {/* Node */}
                <Reveal
                  amount={0.5}
                  y={0}
                  delay={0.05}
                  className="absolute left-0 top-[0.55rem] hidden sm:block"
                >
                  <span className="relative block h-[15px] w-[15px] rounded-full border border-line bg-ink">
                    <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-emerald to-cyan" />
                  </span>
                </Reveal>

                <Reveal amount={0.2} className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="text-2xl font-semibold tracking-[-0.025em] text-chalk sm:text-3xl">
                    {job.role}
                  </h3>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-base text-emerald sm:text-lg"
                  >
                    {job.company}
                    <ExternalIcon className="h-3.5 w-3.5" />
                  </a>
                </Reveal>

                <Reveal
                  as="p"
                  delay={0.06}
                  amount={0.2}
                  className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist/80"
                >
                  {job.range} · {job.location}
                </Reveal>

                <ul className="mt-7 max-w-prose space-y-4">
                  {job.bullets.map((bullet, i) => (
                    <Reveal
                      as="li"
                      key={bullet.slice(0, 28)}
                      delay={0.05 + i * 0.05}
                      amount={0.1}
                      className="flex gap-3.5 text-[15px] leading-relaxed text-mist"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-px w-4 shrink-0 bg-emerald/60"
                      />
                      <span>{bullet}</span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal
                  delay={0.1}
                  amount={0.1}
                  className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
                >
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="group inline-flex items-center gap-2 text-[12px] text-mist/80 transition-colors duration-500 hover:text-chalk"
                    >
                      <TechMark
                        name={tech}
                        className="h-4 w-4 text-mist/60 transition-colors duration-500 group-hover:text-emerald"
                      />
                      {tech}
                    </span>
                  ))}
                </Reveal>

                {index < experiences.length - 1 && (
                  <div aria-hidden="true" className="hairline mt-16 sm:hidden" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AnimatedSection>
  );
}
