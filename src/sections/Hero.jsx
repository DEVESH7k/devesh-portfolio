import { motion } from "framer-motion";
import { heroData } from "../constants";

export default function Hero({ isLoaded = true }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-start pt-24 pb-16 px-6 sm:px-12 md:px-0 max-w-[1000px] mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="w-full flex flex-col items-start"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-teal text-sm sm:text-base mb-5 tracking-wide"
        >
          {heroData.greeting}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-slate-lightest font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] font-sans"
        >
          {heroData.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-slate font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] mt-2 sm:mt-3 font-sans"
        >
          {heroData.subtitle}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-slate text-base sm:text-lg max-w-[540px] mt-6 leading-relaxed"
        >
          {heroData.description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <a
            href="#projects"
            className="btn-teal text-sm px-8 py-4 rounded font-mono"
          >
            {heroData.ctaText}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
