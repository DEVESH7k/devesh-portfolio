import { motion } from "framer-motion";
import { challengePhases, socialLinks } from "../constants";

export default function WritingCertifications() {
  return (
    <section id="writing" className="px-6 sm:px-12 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading">
          <span className="text-teal font-mono text-xl sm:text-2xl mr-3 font-normal">
            ~/
          </span>
          30 Days of DevSecOps
        </h2>

        {/* 30 Days of DevSecOps Challenge Summary */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-lightest font-sans">
              30 Days of DevSecOps Challenge
            </h3>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-teal hover:underline flex items-center gap-1"
            >
              <span>View series on LinkedIn</span>
              <span>→</span>
            </a>
          </div>

          <p className="text-slate text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            A 30-day technical publishing sprint covering real production systems,
            incident post-mortems, and shift-left automation across 4 distinct phases:
          </p>

          {/* 4 Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challengePhases.map((phase) => (
              <div
                key={phase.phase}
                className="bg-navy-light p-6 rounded border border-navy-lightest hover:border-teal/40 transition-colors duration-200"
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-teal font-semibold">Phase {phase.phase}</span>
                  <span className="text-slate-light/80">{phase.days}</span>
                </div>
                <h4 className="text-base font-semibold text-slate-lightest font-sans mb-2">
                  {phase.title}
                </h4>
                <p className="text-slate text-xs sm:text-sm leading-relaxed">
                  {phase.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
