import { motion } from "framer-motion";
import { socialLinks } from "../constants";

const testimonials = [
  {
    quote: "Devesh brought real maturity to our DevSecOps pipeline work. He didn't just implement security tooling — he designed the gates, educated the team on why they matter, and made security feel like a feature, not a blocker.",
    name: "Engineering Lead",
    role: "Team Lead · ProTechmanize",
    initials: "EL",
    color: "#a78bfa",
  },
  {
    quote: "The 30-day LinkedIn challenge Devesh ran is a perfect reflection of how he approaches work — consistent, clear, and always adding value. The content was technically sharp and genuinely useful for the community.",
    name: "Senior DevOps Engineer",
    role: "Community Connection · LinkedIn",
    initials: "SD",
    color: "#0077B5",
  },
  {
    quote: "What stood out about Devesh at HERE Technologies was his ability to turn data quality problems into automated solutions. He moved fast, documented well, and always had a second eye on edge cases.",
    name: "Data Engineering Manager",
    role: "Manager · HERE Technologies",
    initials: "DM",
    color: "#34d399",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/3 left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">What others say</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Recommendations
        </h2>
        <p className="mt-4 text-[#b4aec8] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Kind words from colleagues, managers, and community members.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
            className="group relative rounded-2xl p-[1px] overflow-hidden card-hover"
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"
              style={{ background: `linear-gradient(135deg, ${t.color}30, transparent 60%, ${t.color}15)` }}
            />
            <div className="relative rounded-2xl bg-bg1 border border-white/[0.06] p-7 h-full flex flex-col gap-5 group-hover:border-transparent transition-all duration-300">
              {/* Quote mark */}
              <div
                className="text-[56px] font-outfit font-bold leading-none -mt-2 -ml-1 select-none"
                style={{ color: `${t.color}30` }}
                aria-hidden="true"
              >
                "
              </div>

              {/* Quote text */}
              <p className="text-[14px] font-outfit font-light text-[#b4aec8] leading-[1.8] flex-1 -mt-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-outfit font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-outfit font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] font-mono text-muted mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA to LinkedIn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-mono text-[#b4aec8] hover:text-accent transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          View recommendations on LinkedIn
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

export default Testimonials;
