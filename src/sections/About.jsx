import { motion } from "framer-motion";
import useCountUp from "../hooks/useCountUp";

function StatCard({ value, label, icon }) {
  const isSpecial = value === "24/7";
  const { ref, displayValue } = useCountUp(value, 2000, true);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 via-transparent to-accentPink/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div ref={ref} className="relative rounded-2xl bg-bg1 p-6 h-full flex flex-col items-start gap-2">
        <span className="text-2xl">{icon}</span>
        <p className="text-[32px] font-bold font-outfit text-white leading-none">
          {isSpecial ? "24/7" : displayValue}
        </p>
        <p className="text-[12px] font-mono text-[#9488aa] uppercase tracking-wider leading-tight">{label}</p>
      </div>
    </motion.div>
  );
}

const stats = [
  { value: "156+", label: "CI/CD Pipelines", icon: "⚙️" },
  { value: "50+", label: "Cloud Environments", icon: "☁️" },
  { value: "24/7", label: "On-Call & Incident Ops", icon: "🔥" },
  { value: "3500+", label: "LinkedIn Community", icon: "🤝" },
];

const fadeIn = (direction, delay) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
  },
  show: { opacity: 1, x: 0, y: 0, transition: { type: "spring", duration: 1.2, delay } },
});

function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

      <motion.div variants={fadeIn("down", 0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <p className="section-label">Introduction</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          About <span className="orange-text-gradient">Me</span>
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <motion.div variants={fadeIn("right", 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex-1">
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light">
            I'm a DevSecOps Engineer based in Mumbai, working at ProTechmanize where I own the security and reliability of{" "}
            <span className="text-accent font-medium">156+ CI/CD pipelines</span> spanning AWS CodePipeline, Azure DevOps, and Jenkins.
          </p>
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light mt-5">
            My day-to-day is a blend of hands-on infrastructure work — integrating SonarQube SAST and Trivy container scanning into every pipeline, managing 50+ EC2 hosts, and responding to production incidents on a 24/7 on-call rotation. I believe security should be baked in from the first commit, not bolted on before release.
          </p>
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light mt-5">
            Before this, I spent over a year at <span className="text-accent font-medium">HERE Technologies</span> as a Data Specialist, working on global mapping datasets and location intelligence. That role sharpened my data instincts and gave me a solid foundation in AWS infrastructure at scale.
          </p>
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light mt-5">
            Outside of work, I document everything I learn. I recently completed a{" "}
            <span className="text-accentPink font-medium">30 Days of DevSecOps</span> LinkedIn challenge — 30 consecutive posts covering real projects, production war stories, and 2026 industry trends. I'm building in public and sharing the journey.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-2 gap-5 lg:w-[380px] flex-shrink-0 self-start"
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
