import { motion } from "framer-motion";

function ExperienceCard({ experience, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-start w-full mb-14">
      {/* Timeline dot */}
      <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-7 w-[16px] h-[16px] rounded-full bg-gradient-to-br from-accent to-accentPink border-[3px] border-[#050816] z-10 shadow-glow" />

      {/* Spacer for opposite side on desktop */}
      {!isLeft && <div className="hidden md:block md:w-[45%]" />}

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`ml-10 md:ml-0 w-[calc(100%-40px)] md:w-[45%] ${isLeft ? "md:pr-10" : "md:pl-10"}`}
      >
        <div className="group relative rounded-2xl p-[1px] overflow-hidden">
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accentPink/15 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative rounded-2xl bg-bg1 p-7">
            {/* Current role badge */}
            {experience.current && (
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-green-400/10 text-green-400 border border-green-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Current Role
                </span>
              </div>
            )}

            {/* Role + company */}
            <h3 className="text-[22px] font-bold font-outfit text-white leading-tight">{experience.title}</h3>
            <p className="text-accent font-outfit font-medium text-[15px] mt-1">{experience.company}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span className="text-[12px] font-mono text-[#9488aa]">{experience.date}</span>
              <span className="text-[12px] font-mono text-muted">{experience.location}</span>
            </div>

            {/* Highlight chips */}
            {experience.highlights && (
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-accent/8 text-accent border border-accent/15"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            {/* Bullet points */}
            <ul className="mt-5 space-y-3">
              {experience.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-accent/50 flex-shrink-0" />
                  <span className="text-[#9488aa] text-[14px] leading-[1.75] font-outfit font-light">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ExperienceCard;
