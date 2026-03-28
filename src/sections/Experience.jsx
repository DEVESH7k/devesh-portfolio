import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import { experiences } from "../constants";

function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

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
        <div className="timeline-line" />
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.title} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Experience;
