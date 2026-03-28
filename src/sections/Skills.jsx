import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../constants";

const categories = ["All", "Cloud", "Security", "CI/CD", "Containers", "Monitoring", "Foundation"];

const categoryColors = {
  Cloud: "#FF9900",
  Security: "#4E9BCD",
  "CI/CD": "#7B42BC",
  Containers: "#326CE5",
  Monitoring: "#F46800",
  Foundation: "#FCC624",
};

const categoryDescriptions = {
  All: "The full toolkit I use daily across cloud, security, automation, and observability.",
  Cloud: "Multi-cloud platforms — provisioning, managing, and securing workloads at scale.",
  Security: "Shift-left tools — SAST and CVE scanning baked into every pipeline.",
  "CI/CD": "Automation engines — Terraform for IaC, Jenkins for delivery pipelines.",
  Containers: "Container orchestration — from image builds to production cluster management.",
  Monitoring: "Observability stack — metrics, alerting, and production health dashboards.",
  Foundation: "The bedrock — Linux system administration and version-controlled workflows.",
};

function SkillCard({ skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${skill.color}40, transparent 60%, ${skill.color}20)` }}
      />
      <div className="relative rounded-2xl bg-bg1 border border-white/[0.06] group-hover:border-transparent p-5 flex flex-col items-center gap-3 transition-all duration-300 group-hover:bg-bg2 h-full">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${skill.color}12`, border: `1px solid ${skill.color}20` }}
        >
          <img src={skill.logo} alt={`${skill.name} logo`} className="w-full h-full object-contain" loading="lazy" />
        </div>
        <span className="text-[13px] font-outfit font-semibold transition-colors duration-300" style={{ color: skill.color }}>
          {skill.name}
        </span>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.035]"
        style={{ background: "radial-gradient(circle, #e879f9 0%, transparent 70%)" }}
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
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 flex flex-wrap gap-2"
      >
        {categories.map((cat) => {
          const isActive = active === cat;
          const color = cat === "All" ? "#a78bfa" : categoryColors[cat];
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-full text-[12px] font-mono uppercase tracking-wider transition-all duration-300"
              style={{
                background: isActive ? `${color}20` : "transparent",
                border: `1px solid ${isActive ? color : "rgba(255,255,255,0.08)"}`,
                color: isActive ? color : "#9488aa",
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Category description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-5 text-[#9488aa] text-[15px] font-outfit font-light max-w-2xl leading-relaxed"
        >
          {categoryDescriptions[active]}
        </motion.p>
      </AnimatePresence>

      {/* Skills grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
      >
        <AnimatePresence>
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Skills;
