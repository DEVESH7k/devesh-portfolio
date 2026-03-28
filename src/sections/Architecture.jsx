import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { architectureDiagrams } from "../constants";

function FlowArrow({ delay }) {
  return (
    <div className="hidden sm:flex flex-col items-center justify-center flex-shrink-0 w-10 gap-1">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        className="w-full h-[1px] bg-gradient-to-r from-white/10 via-accent/40 to-white/10 origin-left"
      />
      <motion.svg
        initial={{ opacity: 0, x: -4 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.15 }}
        className="w-3 h-3 text-accent flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </motion.svg>
    </div>
  );
}

function StageNode({ stage, index, total }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 0.12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Mobile arrow (below each except last) */}
      {index < total - 1 && (
        <div className="sm:hidden flex justify-center my-2">
          <svg className="w-4 h-4 text-accent/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative rounded-xl border border-white/[0.08] bg-[#0a0618] p-4 flex flex-col items-center text-center gap-2.5 cursor-default transition-all duration-300 hover:border-opacity-60 w-[110px] sm:w-[120px]"
        style={{ borderColor: hovered ? `${stage.color}50` : undefined, boxShadow: hovered ? `0 0 20px ${stage.color}15` : undefined }}
      >
        {/* Number badge */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center border"
          style={{ background: `${stage.color}20`, borderColor: `${stage.color}40`, color: stage.color }}
        >
          {index + 1}
        </div>

        {/* Icon */}
        <span className="text-[26px] mt-1">{stage.icon}</span>

        {/* Stage name */}
        <p className="text-[12px] font-outfit font-semibold text-white leading-tight">{stage.name}</p>

        {/* Tool name */}
        <span
          className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider"
          style={{ background: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}25` }}
        >
          {stage.tool}
        </span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-20 w-[200px] rounded-xl border border-white/[0.08] bg-[#0f0a1e]/95 backdrop-blur-sm p-4 shadow-xl pointer-events-none"
          >
            <p className="text-[12px] font-outfit text-white leading-relaxed">{stage.detail}</p>
            <div
              className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-l border-t border-white/[0.08] rounded-sm"
              style={{ background: "#0f0a1e" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Architecture() {
  const [activeId, setActiveId] = useState("cicd");
  const active = architectureDiagrams.find((d) => d.id === activeId);

  return (
    <section id="architecture" className="section-padding relative overflow-hidden">
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">System Design</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Architecture <span className="orange-text-gradient">Diagrams</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Visual breakdowns of the systems I design and operate daily — from pipeline orchestration to cloud
          infrastructure and shift-left security. Hover each stage for detail.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        {architectureDiagrams.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveId(d.id)}
            className="px-5 py-2.5 rounded-xl text-[13px] font-outfit font-medium transition-all duration-300"
            style={{
              background: activeId === d.id ? "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(232,121,249,0.08))" : "transparent",
              border: `1px solid ${activeId === d.id ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: activeId === d.id ? "#f5f0ff" : "#9488aa",
            }}
          >
            {d.title}
          </button>
        ))}
      </motion.div>

      {/* Diagram card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 relative rounded-2xl border border-white/[0.07] bg-[#07040f]/60 backdrop-blur-sm p-8 overflow-hidden"
        >
          {/* Subtle corner accent */}
          <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full opacity-[0.04] blur-3xl bg-accent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full opacity-[0.04] blur-3xl bg-accentPink pointer-events-none" />

          {/* Diagram title */}
          <div className="mb-8">
            <h3 className="text-[20px] font-outfit font-bold text-white">{active.title}</h3>
            <p className="text-[14px] font-outfit font-light text-[#9488aa] mt-1">{active.subtitle}</p>
          </div>

          {/* Flow diagram — horizontal scrollable */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start gap-0 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
              {active.stages.map((stage, i) => (
                <div key={stage.name} className="flex items-center">
                  <StageNode stage={stage} index={i} total={active.stages.length} />
                  {i < active.stages.length - 1 && <FlowArrow delay={i * 0.12 + 0.3} />}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-wrap gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-[12px] font-mono text-[#9488aa]">
              <span className="w-3 h-[1px] bg-accent/40 inline-block" />
              Automated handoff
            </div>
            <div className="flex items-center gap-2 text-[12px] font-mono text-[#9488aa]">
              <span className="w-4 h-4 rounded border border-accent/30 bg-accent/10 inline-block" />
              Stage node (hover for detail)
            </div>
            <div className="flex items-center gap-2 text-[12px] font-mono text-[#9488aa]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              Active in production
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default Architecture;
