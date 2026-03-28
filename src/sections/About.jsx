import { motion } from "framer-motion";
import useCountUp from "../hooks/useCountUp";

const stats = [
  { value: "156+", label: "CI/CD Pipelines", icon: "⚙️", color: "#a78bfa" },
  { value: "50+", label: "Cloud Environments", icon: "☁️", color: "#60a5fa" },
  { value: "24/7", label: "On-Call & Incident Ops", icon: "🔥", color: "#f87171" },
  { value: "3500+", label: "LinkedIn Community", icon: "🤝", color: "#34d399" },
];

const pillars = [
  {
    icon: "🛡️",
    title: "Security by Default",
    desc: "SAST, CVE scanning, and least-privilege are non-negotiable — not afterthoughts.",
  },
  {
    icon: "⚡",
    title: "Automate Everything",
    desc: "If I do it twice manually, I automate it. Pipelines should be faster than humans.",
  },
  {
    icon: "📢",
    title: "Build in Public",
    desc: "30-day content challenge, open GitHub repos — learning out loud accelerates growth.",
  },
];

const fadeIn = (direction, delay) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
  },
  show: {
    opacity: 1, x: 0, y: 0,
    transition: { type: "spring", duration: 1.1, delay },
  },
});

function StatCard({ value, label, icon, color }) {
  const isSpecial = value === "24/7";
  const { ref, displayValue } = useCountUp(value, 2000, true);
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}30, transparent 60%, ${color}15)` }}
      />
      <div ref={ref} className="relative rounded-2xl bg-bg1 p-5 h-full flex flex-col gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px]"
          style={{ background: `${color}15`, border: `1px solid ${color}20` }}
        >
          {icon}
        </div>
        <p className="text-[30px] font-bold font-outfit text-white leading-none">
          {isSpecial ? "24/7" : displayValue}
        </p>
        <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider leading-tight">{label}</p>
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
      />

      <motion.div variants={fadeIn("down", 0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <p className="section-label">Introduction</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          About <span className="orange-text-gradient">Me</span>
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: text */}
        <motion.div
          variants={fadeIn("right", 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex-1 space-y-5"
        >
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light">
            I'm a DevSecOps Engineer based in Mumbai, working at ProTechmanize where I own the security and
            reliability of{" "}
            <span className="text-accent font-medium">156+ CI/CD pipelines</span> spanning AWS CodePipeline,
            Azure DevOps, and Jenkins.
          </p>
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light">
            My day-to-day is a blend of hands-on infrastructure work — integrating{" "}
            <span className="text-accent font-medium">SonarQube SAST</span> and{" "}
            <span className="text-accent font-medium">Trivy container scanning</span> into every pipeline,
            managing 50+ EC2 hosts, and responding to production incidents on a 24/7 on-call rotation.
          </p>
          <p className="text-[#9488aa] text-[17px] leading-[1.85] font-outfit font-light">
            Before this, I spent over a year at{" "}
            <span className="text-accent font-medium">HERE Technologies</span> as a Data Specialist, working
            on global mapping datasets and location intelligence — sharpening my data instincts and AWS
            infrastructure foundations at scale.
          </p>

          {/* Philosophy callout */}
          <div className="mt-8 rounded-2xl border border-accent/15 bg-accent/[0.04] p-6">
            <p className="text-[11px] font-mono text-accent uppercase tracking-[0.18em] mb-4">Core Principles</p>
            <div className="space-y-4">
              {pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="text-[18px] mt-0.5 flex-shrink-0">{p.icon}</span>
                  <div>
                    <p className="text-[14px] font-outfit font-semibold text-white">{p.title}</p>
                    <p className="text-[13px] font-outfit font-light text-[#9488aa] mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-2 gap-4 lg:w-[360px] flex-shrink-0 self-start"
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}

          {/* Currently building strip */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="col-span-2 rounded-2xl bg-bg1 border border-white/[0.06] p-5 flex items-center gap-4"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <div>
              <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">Currently building</p>
              <p className="text-[14px] font-outfit font-medium text-white mt-0.5">
                30 Days of DevSecOps challenge — public on LinkedIn
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
