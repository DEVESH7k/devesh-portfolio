import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import { experiences, education } from "../constants";

function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-20 left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Where I've worked</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Work <span className="orange-text-gradient">Experience</span>
        </h2>
      </motion.div>

      <div className="mt-16 relative">
        <div className="timeline-line" aria-hidden="true" />
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.title} experience={exp} index={index} />
        ))}
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-20"
      >
        <p className="section-label">Education</p>
        <h2 className="text-[32px] sm:text-[38px] font-bold font-outfit leading-tight">
          Academic <span className="orange-text-gradient">Background</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 group relative rounded-2xl p-[1px] overflow-hidden max-w-2xl"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accentPink/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
          <div className="relative rounded-2xl bg-bg1 p-7">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-[22px]" aria-hidden="true">
                🎓
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[20px] font-bold font-outfit text-white leading-tight">{education.degree}</h3>
                <p className="text-accent font-outfit font-medium text-[15px] mt-1">{education.institution}</p>
                <p className="text-[12px] font-mono text-[#b4aec8] mt-1">{education.period}</p>
                {education.highlights && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {education.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-accent/8 text-accent border border-accent/15"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Experience;
