import { motion } from "framer-motion";

function ExperienceCard({ experience, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-12 ${
      isLeft ? "md:flex-row" : "md:flex-row-reverse"
    }`}>
      <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 w-[14px] h-[14px] rounded-full bg-gradient-to-br from-accent to-accentPink border-[3px] border-[#050816] z-10" />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className="group relative rounded-2xl p-[1px] overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accentPink/15 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative rounded-2xl bg-bg1 p-7">
            {experience.current && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent/15 text-accent border border-accent/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Current Role
              </span>
            )}
            <h3 className="text-[22px] font-bold font-outfit text-white leading-tight">{experience.title}</h3>
            <p className="text-accent font-outfit font-medium text-[15px] mt-1">{experience.company}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span className="text-[12px] font-mono text-[#9488aa]">{experience.date}</span>
              <span className="text-[12px] font-mono text-muted">{experience.location}</span>
            </div>
            <ul className="mt-5 space-y-3">
              {experience.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] w-[6px] h-[6px] rounded-full bg-accent/60 flex-shrink-0" />
                  <span className="text-[#9488aa] text-[14px] leading-[1.7] font-outfit font-light">{point}</span>
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
