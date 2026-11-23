import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { aboutData } from "../constants";
import useCountUp from "../hooks/useCountUp";
import AnimatedSection, { Reveal, SectionHeading } from "../components/AnimatedSection";
import { EASE_EXPO } from "../hooks/useScrollAnimation";

function Stat({ value, suffix, label, detail, index }) {
  const { ref, displayValue } = useCountUp(`${value}${suffix}`, 1900, true);

  return (
    <Reveal
      delay={index * 0.08}
      amount={0.4}
      className="relative pt-7 sm:pt-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-line-strong to-transparent"
      />
      <span
        ref={ref}
        className="block text-stat font-semibold tabular-nums text-chalk"
      >
        {displayValue}
      </span>
      <span className="mt-3 block text-sm font-medium text-chalk/85">{label}</span>
      <span className="mt-1 block text-[13px] leading-snug text-mist/80">{detail}</span>
    </Reveal>
  );
}

export default function About() {
  const imageWrap = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageWrap,
    offset: ["start end", "end start"],
  });
  /* A very shallow parallax — the photo settles as the section passes. */
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <AnimatedSection id="about" label="About Devesh Khatik">
      <div className="shell">
        <SectionHeading
          eyebrow={aboutData.eyebrow}
          title={aboutData.headline}
          accent={["secure", "resilient"]}
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <motion.div
              ref={imageWrap}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: EASE_EXPO }}
              className="group relative mx-auto w-full max-w-[380px] lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-[22px] bg-gradient-to-br from-emerald/40 via-cyan/15 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="relative overflow-hidden rounded-[22px] bg-ink-soft">
                <motion.img
                  src="/me.jpg"
                  alt="Devesh Khatik"
                  width="760"
                  height="950"
                  loading="lazy"
                  decoding="async"
                  style={prefersReduced ? undefined : { y: imageY, scale: imageScale }}
                  className="aspect-[4/5] w-full object-cover object-top saturate-[0.75] transition-[filter] duration-700 ease-expo group-hover:saturate-100"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80"
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4 px-1">
                <span className="text-sm font-medium text-chalk">Devesh Khatik</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist/80">
                  Mumbai, IN
                </span>
              </div>
            </motion.div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            <Reveal as="p" className="max-w-prose text-xl leading-snug text-chalk sm:text-2xl">
              {aboutData.lede}
            </Reveal>

            <div className="mt-10 space-y-6">
              {aboutData.paragraphs.map((paragraph, i) => (
                <Reveal
                  as="p"
                  key={paragraph.slice(0, 32)}
                  delay={0.06 * i}
                  amount={0.15}
                  className="max-w-prose text-[15px] leading-relaxed text-mist sm:text-base"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Career highlights, as editorial figures rather than cards */}
        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 lg:mt-24 lg:grid-cols-4 lg:gap-x-10">
          {aboutData.stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
