import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { caseStudies, otherProjects } from "../constants";
import AnimatedSection, { Reveal, RevealGroup, RevealItem, SectionHeading, Words } from "../components/AnimatedSection";
import ProjectVisual from "../components/ProjectVisual";
import TechMark from "../components/TechMark";
import { ArrowIcon, GithubIcon, ExternalIcon } from "../components/Icons";

function Visual({ project, className = "" }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* The plate settles from slightly over-scaled as it enters view. */
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1.08, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-[26px] border border-line bg-ink-soft ${className}`}
    >
      <motion.div
        style={prefersReduced ? undefined : { scale, y }}
        className="origin-center"
      >
        {/* Below large screens the diagram would shrink its labels past
            legibility, so it scrolls sideways at a readable size instead.
            tabIndex keeps the scroll region reachable from the keyboard. */}
        <div
          role="group"
          tabIndex={0}
          aria-label={`${project.title} architecture diagram, scrollable`}
          className="mask-x overflow-x-auto overscroll-x-contain lg:mask-none lg:overflow-visible"
        >
          <div className="min-w-[620px] lg:min-w-0">
            <ProjectVisual variant={project.visual} title={project.title} />
          </div>
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-expo group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(0,223,162,0.12), transparent 70%)",
        }}
      />
    </motion.div>
  );
}

function Details({ project, align = "left" }) {
  return (
    <div className={align === "right" ? "lg:text-right" : ""}>
      <Reveal as="p" y={12} amount={0.4} className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald/80">
        {project.index} — {project.kicker}
      </Reveal>

      <Words
        text={project.title}
        as="h3"
        delay={0.06}
        amount={0.3}
        className={`mt-5 text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-chalk ${
          align === "right" ? "lg:ml-auto" : ""
        }`}
      />

      <Reveal as="p" delay={0.12} amount={0.25} className="mt-5 max-w-prose text-[15px] leading-relaxed text-mist lg:inline-block">
        {project.description}
      </Reveal>

      <RevealGroup
        as="ul"
        stagger={0.06}
        delay={0.1}
        amount={0.2}
        className={`mt-7 space-y-3 ${align === "right" ? "lg:ml-auto" : ""} max-w-prose`}
      >
        {project.highlights.map((highlight) => (
          <RevealItem
            as="li"
            key={highlight}
            className={`flex gap-3 text-[14px] leading-relaxed text-mist/85 ${
              align === "right" ? "lg:flex-row-reverse lg:text-right" : ""
            }`}
          >
            <span aria-hidden="true" className="mt-[0.62em] h-px w-3.5 shrink-0 bg-emerald/60" />
            <span>{highlight}</span>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal
        delay={0.16}
        amount={0.2}
        className={`mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 ${
          align === "right" ? "lg:justify-end" : ""
        }`}
      >
        {project.tech.map((tech) => (
          <span key={tech} className="inline-flex items-center gap-1.5 text-[12px] text-mist/80">
            <TechMark name={tech} className="h-[15px] w-[15px] text-mist/60" />
            {tech}
          </span>
        ))}
      </Reveal>

      <Reveal
        delay={0.2}
        amount={0.2}
        className={`mt-8 flex flex-wrap items-center gap-3 ${
          align === "right" ? "lg:justify-end" : ""
        }`}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost sheen h-10 px-5 text-[13px]"
        >
          <GithubIcon className="h-4 w-4" />
          View source
        </a>
        {project.external && (
          <a
            href={project.external}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost sheen h-10 px-5 text-[13px]"
          >
            <ExternalIcon className="h-4 w-4" />
            Live demo
          </a>
        )}
      </Reveal>
    </div>
  );
}

export default function Projects() {
  const [first, second, third, fourth] = caseStudies;

  return (
    <AnimatedSection id="projects" label="Selected projects">
      <div className="shell">
        <SectionHeading eyebrow="Projects" title="Pipelines, clusters and the code that provisions them." accent={["provisions"]}>
          Four builds that show how I wire security, delivery and infrastructure
          together. Every one is public — the source is a click away.
        </SectionHeading>
      </div>

      {/* 01 — text left, visual right */}
      <div className="shell mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Details project={first} />
        </div>
        <Visual project={first} className="lg:col-span-7" />
      </div>

      {/* 02 — visual left, text right */}
      <div className="shell mt-24 grid items-center gap-10 lg:mt-36 lg:grid-cols-12 lg:gap-14">
        <Visual project={second} className="lg:order-1 lg:col-span-7" />
        <div className="lg:order-2 lg:col-span-5">
          <Details project={second} align="right" />
        </div>
      </div>

      {/* 03 — full-width cinematic showcase */}
      <div className="mt-24 lg:mt-36">
        <div className="shell">
          <Visual project={third} className="w-full" />
        </div>
        <div className="shell mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal as="p" y={12} amount={0.4} className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald/80">
              {third.index} — {third.kicker}
            </Reveal>
            <Words
              text={third.title}
              as="h3"
              delay={0.06}
              amount={0.3}
              className="mt-5 text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-chalk"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal as="p" amount={0.25} className="max-w-prose text-[15px] leading-relaxed text-mist">
              {third.description}
            </Reveal>
            <RevealGroup as="ul" stagger={0.06} amount={0.2} className="mt-7 grid gap-3 sm:grid-cols-2">
              {third.highlights.map((highlight) => (
                <RevealItem
                  as="li"
                  key={highlight}
                  className="flex gap-3 text-[14px] leading-relaxed text-mist/85"
                >
                  <span aria-hidden="true" className="mt-[0.62em] h-px w-3.5 shrink-0 bg-emerald/60" />
                  <span>{highlight}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.16} amount={0.2} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              {third.tech.map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1.5 text-[12px] text-mist/80">
                  <TechMark name={tech} className="h-[15px] w-[15px] text-mist/60" />
                  {tech}
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.2} amount={0.2} className="mt-8">
              <a
                href={third.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost sheen h-10 px-5 text-[13px]"
              >
                <GithubIcon className="h-4 w-4" />
                View source
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 04 — text left, visual right */}
      <div className="shell mt-24 grid items-center gap-10 lg:mt-36 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Details project={fourth} />
        </div>
        <Visual project={fourth} className="lg:col-span-7" />
      </div>

      {/* Supporting work */}
      <div className="shell mt-28 lg:mt-40">
        <Reveal as="h3" amount={0.4} className="text-xl font-semibold tracking-[-0.02em] text-chalk sm:text-2xl">
          More things I&apos;ve built
        </Reveal>

        <RevealGroup
          as="ul"
          stagger={0.07}
          amount={0.1}
          className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2"
        >
          {otherProjects.map((project) => (
            <RevealItem as="li" key={project.title} className="bg-ink">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-7 p-7 transition-colors duration-500 ease-expo hover:bg-ink-soft sm:p-8"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-medium tracking-[-0.02em] text-chalk">
                      {project.title}
                    </h4>
                    <ArrowIcon className="mt-1 h-4 w-4 shrink-0 text-mist transition-[transform,color] duration-500 ease-expo group-hover:translate-x-1 group-hover:text-emerald" />
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-mist">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="inline-flex items-center gap-1.5 text-[11.5px] text-mist/80">
                      <TechMark name={tech} className="h-[14px] w-[14px] text-mist/60" />
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal amount={0.4} className="mt-10 flex justify-center">
          <a
            href="https://github.com/DEVESH7k?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost sheen"
          >
            <GithubIcon className="h-4 w-4" />
            All repositories
          </a>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}
