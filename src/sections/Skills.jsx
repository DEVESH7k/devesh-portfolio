import { motion } from "framer-motion";
import { skills } from "../constants";

function SkillCard({ skill, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, delay: index * 0.06 },
        },
      }}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${skill.color}40, transparent 60%, ${skill.color}20)`,
        }}
      />

      <div className="relative rounded-2xl bg-bg1 border border-white/[0.06] group-hover:border-transparent p-6 flex flex-col items-center gap-4 transition-all duration-300 group-hover:bg-bg2 group-hover:shadow-lg h-full">
        {/* Logo image */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${skill.color}12`,
            border: `1px solid ${skill.color}20`,
          }}
        >
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Name */}
        <span
          className="text-[13px] font-outfit font-semibold transition-colors duration-300"
          style={{ color: skill.color }}
        >
          {skill.name}
        </span>

        {/* Bottom glow on hover */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, #e879f9 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">What I work with</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Tech <span className="orange-text-gradient">Stack</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          From infrastructure provisioning to runtime security — these are the
          tools I use every day in production.
        </p>
      </motion.div>

      {/* Skills grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="mt-14 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
      >
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
