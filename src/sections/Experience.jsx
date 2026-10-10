import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../constants";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab((prev) => (prev + 1) % experiences.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((prev) => (prev - 1 + experiences.length) % experiences.length);
    }
  };

  const exp = experiences[activeTab];

  return (
    <section id="experience" className="px-6 sm:px-12 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading">
          <span className="text-teal font-mono text-xl sm:text-2xl mr-3 font-normal">
            02.
          </span>
          Where I&apos;ve Worked
        </h2>

        <div className="mt-8 flex flex-col md:flex-row gap-8 items-start min-h-[340px]">
          {/* Tab List */}
          <div
            role="tablist"
            aria-label="Job experience tabs"
            className="relative flex md:flex-col overflow-x-auto md:overflow-visible w-full md:w-48 border-b-2 md:border-b-0 md:border-l-2 border-navy-lightest flex-shrink-0"
          >
            {/* Animated Teal Active Indicator */}
            <div
              className="absolute bg-teal transition-all duration-300 ease-portfolio z-10 hidden md:block w-[2px] left-[-2px] h-11"
              style={{
                transform: `translateY(${activeTab * 44}px)`,
              }}
              aria-hidden="true"
            />
            <div
              className="absolute bg-teal transition-all duration-300 ease-portfolio z-10 md:hidden h-[2px] bottom-[-2px] w-36"
              style={{
                transform: `translateX(${activeTab * 144}px)`,
              }}
              aria-hidden="true"
            />

            {experiences.map((item, index) => {
              const isSelected = activeTab === index;
              return (
                <button
                  key={item.company}
                  role="tab"
                  id={`tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${index}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`h-11 px-5 text-left font-mono text-xs whitespace-nowrap transition-all duration-200 flex items-center min-w-[144px] md:w-full focus-visible:outline-none focus-visible:text-teal ${
                    isSelected
                      ? "text-teal bg-navy-light/60 font-medium"
                      : "text-slate hover:text-teal hover:bg-navy-light/30"
                  }`}
                >
                  {item.company}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 w-full md:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
              >
                <h3 className="text-xl font-medium text-slate-lightest font-sans flex flex-wrap items-baseline gap-1.5">
                  <span>{exp.role}</span>
                  <span className="text-teal font-normal">
                    @{" "}
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline focus-visible:underline text-teal inline-block"
                    >
                      {exp.company}
                    </a>
                  </span>
                </h3>

                <p className="font-mono text-xs text-slate-light mt-1 mb-6">
                  {exp.range}
                </p>

                <ul className="space-y-3 p-0 list-none text-slate text-sm sm:text-[15px] leading-relaxed">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-teal text-xs mt-1 leading-none select-none">
                        ▹
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
