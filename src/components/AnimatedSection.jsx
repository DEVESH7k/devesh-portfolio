import { motion } from "framer-motion";
import {
  EASE_EXPO,
  revealVariants,
  staggerVariants,
  wordVariants,
} from "../hooks/useScrollAnimation";

/**
 * A single element that rises into place the first time it is framed.
 * `delay` offsets it inside a group; `as` keeps the markup semantic.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
  amount = 0.25,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: EASE_EXPO }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that releases children with `revealVariants` one by one. */
export function RevealGroup({
  children,
  stagger = 0.08,
  delay = 0,
  className = "",
  amount = 0.2,
  as = "div",
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={staggerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className = "", as = "div", ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={revealVariants} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Splits a headline into words and lifts them in sequence. Each word
 * sits in an overflow-hidden box so the text appears to rise out of
 * the baseline rather than simply fading.
 *
 * `accent` marks words that take the gradient treatment.
 */
export function Words({
  text,
  className = "",
  accent = [],
  stagger = 0.055,
  delay = 0,
  as = "h2",
  amount = 0.4,
}) {
  const Tag = motion[as] ?? motion.h2;
  const words = text.split(" ");
  const accentSet = new Set(accent.map((w) => w.toLowerCase().replace(/[.,]/g, "")));

  return (
    <Tag
      className={className}
      variants={staggerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {words.map((word, i) => {
        const bare = word.toLowerCase().replace(/[.,]/g, "");
        const isAccent = accentSet.has(bare);
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isAccent ? "ink-gradient" : ""}`}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}

/** The eyebrow + headline pair that opens every chapter. */
export function SectionHeading({ eyebrow, title, accent = [], children, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal as="p" y={12} className="eyebrow" amount={0.6}>
        {eyebrow}
      </Reveal>
      <Words
        text={title}
        accent={accent}
        as="h2"
        delay={0.08}
        className="mt-5 max-w-[22ch] text-section font-semibold text-chalk"
      />
      {children && (
        <Reveal as="p" delay={0.18} className="mt-6 max-w-prose text-base text-mist sm:text-lg">
          {children}
        </Reveal>
      )}
    </div>
  );
}

/** Full-bleed chapter wrapper with consistent vertical rhythm. */
export default function AnimatedSection({ id, children, className = "", label }) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative py-24 sm:py-28 lg:py-36 ${className}`}
    >
      {children}
    </section>
  );
}
