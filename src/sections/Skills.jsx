import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../constants";

const categories = ["All", "Cloud", "Security", "CI/CD", "Containers", "Monitoring", "Scripting", "Foundation"];

const categoryMeta = {
  All:        { color: "#a78bfa", desc: "The full toolkit I use daily across cloud, security, automation, and observability." },
  Cloud:      { color: "#FF9900", desc: "Multi-cloud platforms — provisioning, managing, and securing workloads at scale." },
  Security:   { color: "#4E9BCD", desc: "Shift-left tools — SAST and CVE scanning baked into every pipeline." },
  "CI/CD":    { color: "#7B42BC", desc: "Automation engines — Terraform for IaC, Jenkins and GitHub Actions for delivery pipelines." },
  Containers: { color: "#326CE5", desc: "Container orchestration — from image builds to production cluster management." },
  Monitoring: { color: "#F46800", desc: "Observability stack — metrics, alerting, and production health dashboards." },
  Scripting:  { color: "#3776AB", desc: "Automation languages — Python and Bash for infrastructure tooling, scripts, and CI/CD utilities." },
  Foundation: { color: "#F05032", desc: "The bedrock — Linux system administration and version-controlled GitOps workflows." },
};

const levelColors = {
  Expert:     "#34d399",
  Advanced:   "#a78bfa",
  Proficient: "#60a5fa",
};

function SkillCard({ skill }) {
  const lc = levelColors[skill.levelLabel] || "#9488aa";
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${skill.color}40, transparent 55%, ${skill.color}20)` }}
      />

      <div className="relative rounded-2xl bg-bg1 border border-white/[0.06] group-hover:border-transparent p-5 flex flex-col gap-4 h-full transition-all duration-300 group-hover:bg-bg2 overflow-hidden">
        {/* Spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, ${skill.color}14, transparent 80%)`,
          }}
        />

        {/* Header: logo + name + level badge */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center p-2.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${skill.color}12`, border: `1px solid ${skill.color}20` }}
          >
            <img src={skill.logo} alt={`${skill.name}`} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-outfit font-semibold text-white truncate">{skill.name}</p>
            <span
              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded mt-0.5 inline-block"
              style={{ background: `${lc}15`, color: lc, border: `1px solid ${lc}25` }}
            >
              {skill.levelLabel}
            </span>
          </div>
        </div>

        {/* Context description */}
        <p className="text-[11.5px] font-outfit font-light text-[#9488aa] leading-[1.6] flex-1">
          {skill.context}
        </p>

        {/* Proficiency bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] font-mono text-[#4a3d66] uppercase tracking-wider">Proficiency</span>
            <span className="text-[10px] font-mono" style={{ color: lc }}>{skill.level}%</span>
          </div>
          <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}90)` }}
              initial={{ width: "0%" }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);
  const meta = categoryMeta[active];

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

      {/* Marquee tool strip */}
      <div className="mt-12 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #050816 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #050816 0%, transparent 100%)" }} />
        <div className="flex gap-5 marquee-track" style={{ width: "max-content" }}>
          {[...skills, ...skills].map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-bg1 flex-shrink-0"
            >
              <img src={skill.logo} alt={skill.name} className="w-5 h-5 object-contain" loading="lazy" />
              <span className="text-[12px] font-mono text-[#9488aa] whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="mt-10 flex flex-wrap gap-2"
      >
        {categories.map((cat) => {
          const isActive = active === cat;
          const color = categoryMeta[cat].color;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-full text-[11.5px] font-mono uppercase tracking-wider transition-all duration-300"
              style={{
                background: isActive ? `${color}18` : "transparent",
                border: `1px solid ${isActive ? color : "rgba(255,255,255,0.07)"}`,
                color: isActive ? color : "#9488aa",
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Dynamic description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-5 text-[#9488aa] text-[15px] font-outfit font-light max-w-2xl leading-relaxed"
        >
          {meta.desc}
        </motion.p>
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 flex flex-wrap gap-x-6 gap-y-2"
      >
        {Object.entries(levelColors).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2 text-[11px] font-mono text-[#9488aa]">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
            {label}
          </div>
        ))}
      </motion.div>

      {/* Skills grid */}
      <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
