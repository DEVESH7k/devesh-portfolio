import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { showcaseTech } from "../constants";
import TechMark from "./TechMark";
import { EASE_EXPO } from "../hooks/useScrollAnimation";

/* A quiet band of marks between the hero and the story. Not a
   marquee: the row drifts a few pixels as the band passes through
   the viewport and otherwise holds still. */
export default function TechnologyShowcase() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["2.5%", "-2.5%"]);

  return (
    <div ref={ref} className="relative border-y border-line py-12 sm:py-14">
      <div className="shell">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          className="mb-9 text-center font-mono text-[10px] uppercase tracking-[0.26em] text-mist/75"
        >
          Daily toolchain
        </motion.p>

        <motion.ul
          style={prefersReduced ? undefined : { x: drift }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-3 items-center gap-y-9 sm:gap-y-11 lg:flex lg:justify-between lg:gap-x-6"
        >
          {showcaseTech.map((name) => (
            <motion.li
              key={name}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
              }}
              className="group flex flex-col items-center gap-2.5"
            >
              <TechMark
                name={name}
                className="h-7 w-7 text-mist/60 transition-[color,transform] duration-500 ease-expo group-hover:scale-110 group-hover:text-chalk sm:h-8 sm:w-8"
              />
              <span className="text-center text-[11px] tracking-[-0.01em] text-mist/75 transition-colors duration-500 group-hover:text-mist">
                {name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
