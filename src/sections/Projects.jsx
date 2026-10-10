import { useState } from "react";
import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "../constants";
import ProjectDiagram from "../components/ProjectDiagram";

export default function Projects() {
  const [showMore, setShowMore] = useState(false);
  const displayedOtherProjects = showMore ? otherProjects : otherProjects.slice(0, 6);

  return (
    <section id="projects" className="px-6 sm:px-12 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading">
          <span className="text-teal font-mono text-xl sm:text-2xl mr-3 font-normal">
            03.
          </span>
          Some Things I&apos;ve Built
        </h2>

        {/* Featured Projects List (Alternating Left/Right) */}
        <div className="space-y-24 md:space-y-28 mt-12">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.title}
                className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-4"
              >
                {/* Project Visual (Image or Diagram) */}
                <div
                  className={`relative col-span-1 md:col-span-8 h-[280px] sm:h-[340px] md:h-[360px] rounded overflow-hidden shadow-card group md:row-start-1 md:row-end-2 bg-teal ${
                    isEven ? "md:col-start-1" : "md:col-start-5"
                  }`}
                >
                  <a
                    href={project.external || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} preview and source code`}
                    className="block w-full h-full relative overflow-hidden bg-teal group-hover:bg-transparent transition-colors duration-300"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center filter grayscale contrast-100 brightness-90 mix-blend-multiply group-hover:filter-none group-hover:mix-blend-normal transition-all duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <ProjectDiagram type={project.diagramType} />
                    )}

                    {/* Dark navy overlay with mix-blend-screen that clears on hover */}
                    <div
                      className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-all duration-300 mix-blend-screen pointer-events-none"
                      aria-hidden="true"
                    />
                    {/* Subtle teal overlay that fades on hover */}
                    <div
                      className="absolute inset-0 bg-teal/20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Project Details Content */}
                <div
                  className={`relative z-20 col-span-1 md:col-span-7 flex flex-col md:row-start-1 md:row-end-2 mt-4 md:mt-0 ${
                    isEven
                      ? "md:col-start-6 md:items-end md:text-right"
                      : "md:col-start-1 md:items-start md:text-left"
                  }`}
                >
                  <p className="font-mono text-teal text-xs tracking-wider mb-1">
                    Featured Project
                  </p>

                  <h3 className="text-slate-lightest font-bold text-2xl font-sans hover:text-teal transition-colors mb-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </h3>

                  {/* Description Card */}
                  <div
                    className={`bg-navy-light p-5 sm:p-6 rounded shadow-card text-slate text-sm sm:text-[14.5px] leading-relaxed mb-4 max-w-lg ${
                      isEven ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <p>{project.description}</p>
                  </div>

                  {/* Tech Stack List */}
                  <ul
                    className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-slate-light list-none p-0 mb-4 max-w-md ${
                      isEven ? "md:justify-end md:ml-auto" : "md:justify-start md:mr-auto"
                    }`}
                  >
                    {project.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  {/* Icon Links */}
                  <div
                    className={`flex items-center gap-4 text-slate-lightest ${
                      isEven ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub Repository for ${project.title}`}
                        className="text-slate-light hover:text-teal transition-colors p-1"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={project.external || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`External link for ${project.title}`}
                      className="text-slate-light hover:text-teal transition-colors p-1"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Noteworthy Projects Section */}
        <div className="mt-32">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-lightest font-sans">
              Other Noteworthy Projects
            </h3>
            <a
              href="https://github.com/DEVESH7k?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-sm text-teal hover:underline mt-2 tracking-wide"
            >
              view the archive
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {displayedOtherProjects.map((item) => (
              <div
                key={item.title}
                className="bg-navy-light p-8 rounded flex flex-col justify-between shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group"
              >
                <div>
                  {/* Card Header: Folder icon on left, GitHub & external link icons on right */}
                  <div className="flex items-center justify-between mb-8">
                    <svg
                      className="w-10 h-10 text-teal"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>

                    <div className="flex items-center gap-3 text-slate-light">
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${item.title}`}
                          className="text-slate-light hover:text-teal transition-colors p-1"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </a>
                      )}
                      <a
                        href={item.external || item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`External link for ${item.title}`}
                        className="text-slate-light hover:text-teal transition-colors p-1"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-lightest group-hover:text-teal transition-colors mb-3 font-sans leading-snug">
                    <a
                      href={item.external || item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </h4>

                  <p className="text-slate text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tech Stack List */}
                <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-slate-light/70 list-none p-0 mt-auto">
                  {item.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Toggle Button */}
          {otherProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowMore(!showMore)}
                className="btn-teal text-xs px-7 py-3.5 rounded font-mono"
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
