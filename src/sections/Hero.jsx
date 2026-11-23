import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { heroData, socialLinks } from "../constants";
import { EASE_EXPO, staggerVariants, useMagnetic, wordVariants } from "../hooks/useScrollAnimation";
import { ArrowIcon, GithubIcon, LinkedinIcon } from "../components/Icons";

/* The canvas scene is the heaviest thing on the page — split it out
   so the headline and copy paint first. */
const HeroVisual = lazy(() => import("../components/HeroVisual"));

const lineVariants = staggerVariants(0.05, 0.1);

function Headline({ text, accent, isLoaded, delay }) {
  const accentSet = new Set(accent.map((w) => w.toLowerCase().replace(/[.,]/g, "")));
  return (
    <motion.span
      className="block"
      variants={staggerVariants(0.055, delay)}
      initial="hidden"
      animate={isLoaded ? "show" : "hidden"}
    >
      {text.split(" ").map((word, i, arr) => {
        const bare = word.toLowerCase().replace(/[.,]/g, "");
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${accentSet.has(bare) ? "ink-gradient" : ""}`}
            >
              {word}
            </motion.span>
            {i < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
}

function MagneticButton({ href, children, variant = "solid", external = false }) {
  const magnetic = useMagnetic(0.2);
  return (
    <a
      {...magnetic}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn sheen ${variant === "solid" ? "btn-solid" : "btn-ghost"}`}
    >
      {children}
    </a>
  );
}

export default function Hero({ isLoaded = true }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EXPO } },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-32"
    >
      {/* Ambient field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 28%, rgba(0,223,162,0.1), transparent 70%), radial-gradient(45% 45% at 12% 8%, rgba(71,123,255,0.09), transparent 72%)",
        }}
      />

      <div className="shell grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)] lg:gap-10">
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="order-2 lg:order-1"
        >
          <motion.p variants={item} className="eyebrow">
            {heroData.eyebrow}
          </motion.p>

          <h1 className="mt-7 text-hero font-semibold text-chalk">
            <Headline text={heroData.headline[0]} accent={["Secure"]} isLoaded={isLoaded} delay={0.2} />
            <Headline text={heroData.headline[1]} accent={[]} isLoaded={isLoaded} delay={0.34} />
            <Headline
              text={heroData.headlineAccent}
              accent={["Everything."]}
              isLoaded={isLoaded}
              delay={0.46}
            />
          </h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE_EXPO }}
            className="mt-7 max-w-[54ch] text-base leading-relaxed text-mist sm:text-lg"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.9, delay: 0.88, ease: EASE_EXPO }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href={heroData.primaryCta.href} variant="solid">
              {heroData.primaryCta.label}
              <ArrowIcon className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={heroData.secondaryCta.href} variant="ghost">
              {heroData.secondaryCta.label}
            </MagneticButton>

            <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-line-strong sm:block" />

            <div className="flex items-center gap-1">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors duration-300 hover:bg-chalk/5 hover:text-chalk"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors duration-300 hover:bg-chalk/5 hover:text-chalk"
              >
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE_EXPO }}
          className="order-1 lg:order-2"
        >
          <Suspense
            fallback={
              <div className="mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[560px]" />
            }
          >
            <HeroVisual />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-max items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-mist/80 transition-colors duration-300 hover:text-chalk lg:flex"
      >
        Scroll
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          className="block h-3 w-px bg-current"
        />
      </motion.a>
    </section>
  );
}
