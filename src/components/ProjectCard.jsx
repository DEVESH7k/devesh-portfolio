import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProjectCard({ project, index }) {
  const [tab, setTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-[1px] overflow-hidden card-hover"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/35 via-transparent to-accentPink/25 opacity-25 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] green-pink-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-2xl bg-bg1 p-6 h-full flex flex-col">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="text-[36px] leading-none">{project.icon}</span>
          <div className="flex items-center gap-2 mt-1 flex-shrink-0">
            {project.live_demo && (
              <a
                href={project.live_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-3 rounded-lg bg-accent/10 border border-accent/20 flex items-center gap-1.5 text-[11px] font-mono text-accent hover:bg-accent/20 transition-colors duration-200"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3 rounded-lg bg-bg3 border border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-[#9488aa] hover:bg-accent/15 hover:text-accent hover:border-accent/25 transition-all duration-200"
              aria-label="View on GitHub"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-bold font-outfit text-white leading-snug group-hover:text-accent transition-colors duration-300">
          {project.name}
        </h3>

        {/* Tab switcher */}
        <div className="flex gap-1 mt-4 mb-4 p-1 rounded-lg bg-bg3/60 w-fit">
          {["overview", "architecture"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all duration-200"
              style={{
                background: tab === t ? "rgba(167,139,250,0.15)" : "transparent",
                color: tab === t ? "#a78bfa" : "#9488aa",
                border: tab === t ? "1px solid rgba(167,139,250,0.25)" : "1px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-[80px]">
          <AnimatePresence mode="wait">
            {tab === "overview" ? (
              <motion.p
                key="overview"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="text-[#9488aa] text-[13.5px] leading-[1.75] font-outfit font-light"
              >
                {project.description}
              </motion.p>
            ) : (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-[13px] font-outfit font-light text-[#9488aa] leading-[1.75] mb-4">
                  {project.architecture}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pipeline visualization */}
        {project.pipeline && (
          <div className="mt-5 pt-4 border-t border-white/[0.05]">
            <p className="text-[9px] font-mono text-[#4a3d66] uppercase tracking-[0.15em] mb-3">Pipeline</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {project.pipeline.map((tool, i) => (
                <div key={tool} className="flex items-center gap-1.5">
                  <span className="px-2 py-1 rounded text-[10px] font-mono text-[#9488aa] bg-white/[0.04] border border-white/[0.06] hover:text-accent hover:border-accent/25 transition-colors duration-200">
                    {tool}
                  </span>
                  {i < project.pipeline.length - 1 && (
                    <svg className="w-2.5 h-2.5 text-[#4a3d66] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DevSecOps highlights */}
        {project.highlights && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono text-accentPink border border-accentPink/20 bg-accentPink/5"
              >
                <span className="w-1 h-1 rounded-full bg-accentPink flex-shrink-0" />
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent/8 text-accent border border-accent/15">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
