import { motion } from "framer-motion";
import { challengePosts, socialLinks } from "../constants";
import useCountUp from "../hooks/useCountUp";

const phases = [
  { name: "Foundations", days: "1–7", color: "#a78bfa", desc: "Core concepts, first pipelines" },
  { name: "Going Deeper", days: "8–14", color: "#c084fc", desc: "Code snippets, real blockers" },
  { name: "Production Reality", days: "15–21", color: "#e879f9", desc: "War stories, incident debugging" },
  { name: "2026 Trends", days: "22–30", color: "#f0abfc", desc: "Karpenter, OTel, LLMOps, Sigstore" },
];

function ChallengeStatCard({ value, label }) {
  const { ref, displayValue } = useCountUp(value, 1800, true);
  return (
    <div ref={ref} className="rounded-2xl bg-bg1 border border-white/[0.06] p-6 text-center">
      <p className="text-[36px] font-bold font-outfit text-white leading-none">{displayValue}</p>
      <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider mt-2">{label}</p>
    </div>
  );
}

function Challenge() {
  return (
    <section id="challenge" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #e879f9 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <p className="section-label">Content creation</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          30 Days of <span className="orange-text-gradient">DevSecOps</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          30 consecutive days of LinkedIn posts — real projects, production blockers, tool deep-dives, and 2026 industry trends. Zero days missed.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5">
        <ChallengeStatCard value="30" label="Posts Published" />
        <ChallengeStatCard value="3541" label="Followers Reached" />
        <ChallengeStatCard value="598" label="Top Impressions" />
        <div className="rounded-2xl bg-bg1 border border-white/[0.06] p-6 text-center">
          <p className="text-[36px] font-bold font-outfit text-white leading-none">0</p>
          <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider mt-2">Days Missed</p>
        </div>
      </div>

      {/* Phases */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <div key={phase.name} className="rounded-xl bg-bg1 border border-white/[0.06] p-5 group hover:border-accent/20 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: phase.color }} />
              <span className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">Days {phase.days}</span>
            </div>
            <p className="text-[16px] font-outfit font-semibold text-white">{phase.name}</p>
            <p className="text-[12px] font-outfit font-light text-muted mt-1">{phase.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Top posts */}
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {challengePosts.map((post) => (
          <motion.a
            key={post.day}
            href={socialLinks.linkedinActivity}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="group rounded-2xl bg-bg1 border border-white/[0.06] p-6 hover:border-accent/30 transition-all duration-300 card-hover block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/15">Day {post.day}</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accentPink/10 text-accentPink border border-accentPink/15">{post.tag}</span>
            </div>
            <h4 className="text-[16px] font-outfit font-semibold text-white leading-snug group-hover:text-accent transition-colors duration-300">{post.title}</h4>
            {post.impressions !== "—" && (
              <p className="mt-3 text-[12px] font-mono text-[#9488aa]">{post.impressions} impressions</p>
            )}
          </motion.a>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 text-center">
        <a href={socialLinks.linkedinActivity} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/[0.12] text-[#9488aa] font-outfit font-semibold text-[14px] hover:border-accent hover:text-accent transition-all duration-300">
          View all 30 posts on LinkedIn
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </motion.div>
    </section>
  );
}

export default Challenge;
