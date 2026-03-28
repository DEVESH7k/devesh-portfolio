import { motion } from "framer-motion";

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-[1px] overflow-hidden card-hover"
    >
      {/* Gradient border — visible on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/35 via-transparent to-accentPink/25 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] green-pink-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-2xl bg-bg1 p-7 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-5 gap-4">
          <span className="text-[38px] leading-none">{project.icon}</span>
          <a
            href={project.source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-bg3 border border-white/[0.06] flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 transition-all duration-300 flex-shrink-0 mt-1"
            aria-label="View on GitHub"
          >
            <svg className="w-4 h-4 text-[#9488aa] group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Title + description */}
        <h3 className="text-[19px] font-bold font-outfit text-white leading-snug group-hover:text-accent transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-[#9488aa] text-[14px] leading-[1.75] font-outfit font-light mt-3 flex-1">
          {project.description}
        </p>

        {/* DevSecOps highlights */}
        {project.highlights && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono text-accentPink border border-accentPink/20 bg-accentPink/5"
              >
                <span className="w-1 h-1 rounded-full bg-accentPink" />
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent/8 text-accent border border-accent/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
