import { motion } from "framer-motion";
import { certifications } from "../constants";

const targetProgress = {
  "AWS Solutions Architect Associate": 35,
  "Certified Kubernetes Administrator": 20,
  "HashiCorp Terraform Associate": 15,
  "Certified DevSecOps Professional": 10,
};

function ProgressRing({ pct, color }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" stroke={`${color}18`} strokeWidth="4" />
      <motion.circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 right-[15%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Credentials &amp; Roadmap</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Cert<span className="orange-text-gradient">ifications</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Industry certifications I'm actively pursuing to validate my cloud and security skills. Each one
          maps directly to tools I use in production every day.
        </p>
      </motion.div>

      {/* Roadmap progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 relative"
      >
        {/* Connecting line */}
        <div className="hidden sm:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-white/[0.05]">
          <motion.div
            className="h-full green-pink-gradient rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Timeline dots + labels */}
        <div className="hidden sm:grid grid-cols-4 mb-10">
          {certifications.map((cert, i) => (
            <div key={cert.name} className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 260 }}
                className="w-[14px] h-[14px] rounded-full border-[3px] border-[#050816] z-10"
                style={{ background: cert.color }}
              />
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{cert.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cert cards */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {certifications.map((cert, i) => {
          const pct = targetProgress[cert.name] ?? 10;
          return (
            <motion.a
              key={cert.name}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
              }}
              className="group relative rounded-2xl p-[1px] overflow-hidden block"
            >
              {/* Spinning conic border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${cert.color}40, transparent 30%)`,
                  animation: "spin 6s linear infinite",
                }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />

              <div className="relative rounded-2xl bg-bg1 p-7 h-full flex flex-col items-center text-center gap-4 hover:bg-bg2 transition-colors duration-300">
                {/* Progress ring + icon */}
                <div className="relative flex items-center justify-center">
                  <ProgressRing pct={pct} color={cert.color} />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-[20px]"
                    style={{ lineHeight: 1 }}
                  >
                    {cert.icon}
                  </div>
                </div>

                {/* Status badge */}
                <span
                  className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider"
                  style={{
                    backgroundColor:
                      cert.status === "earned" ? `${cert.color}20` : "rgba(250,204,21,0.08)",
                    color: cert.status === "earned" ? cert.color : "#facc15",
                    border: `1px solid ${cert.status === "earned" ? `${cert.color}30` : "rgba(250,204,21,0.2)"}`,
                  }}
                >
                  {cert.status === "earned" ? "✓ Earned" : "🎯 In Progress"}
                </span>

                {/* Name */}
                <h3 className="text-[14px] font-outfit font-semibold text-white leading-snug group-hover:text-accent transition-colors duration-300">
                  {cert.name}
                </h3>

                {/* Issuer + year */}
                <div className="mt-auto space-y-1">
                  <p className="text-[12px] font-mono text-[#9488aa]">{cert.issuer}</p>
                  <p className="text-[11px] font-mono text-muted">Target: {cert.date}</p>
                </div>

                {/* Progress label */}
                <div className="w-full">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Progress</span>
                    <span className="text-[10px] font-mono" style={{ color: cert.color }}>{pct}%</span>
                  </div>
                  <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: cert.color }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}

export default Certifications;
