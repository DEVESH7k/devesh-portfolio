import { motion } from "framer-motion";
import { certifications } from "../constants";

function Certifications() {
  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-[15%] w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

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
          Industry certifications I'm pursuing to validate my cloud and security skills. Each one maps to tools I use daily in production.
        </p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {certifications.map((cert, i) => (
          <motion.a
            key={cert.name}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } },
            }}
            className="group relative rounded-2xl p-[1px] overflow-hidden card-hover block"
          >
            {/* Spinning conic border on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${cert.color}40, transparent 30%)`,
                animation: "spin 6s linear infinite",
              }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-2xl bg-bg1 p-7 h-full flex flex-col items-center text-center gap-4">
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-[28px] transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cert.color}15`, border: `1px solid ${cert.color}25` }}
              >
                {cert.icon}
              </div>

              {/* Status badge */}
              <span
                className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider"
                style={{
                  backgroundColor: cert.status === "earned" ? `${cert.color}20` : "rgba(250,204,21,0.1)",
                  color: cert.status === "earned" ? cert.color : "#facc15",
                  border: `1px solid ${cert.status === "earned" ? `${cert.color}30` : "rgba(250,204,21,0.2)"}`,
                }}
              >
                {cert.status === "earned" ? "✓ Earned" : "🎯 In Progress"}
              </span>

              {/* Name */}
              <h3 className="text-[15px] font-outfit font-semibold text-white leading-snug group-hover:text-accent transition-colors duration-300">
                {cert.name}
              </h3>

              {/* Issuer & year */}
              <div className="mt-auto">
                <p className="text-[12px] font-mono text-[#9488aa]">{cert.issuer}</p>
                <p className="text-[11px] font-mono text-muted mt-1">{cert.date}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

export default Certifications;
