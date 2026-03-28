import { motion } from "framer-motion";
import { blogPosts, socialLinks } from "../constants";

const tagColors = {
  "CI/CD": "#a78bfa",
  Kubernetes: "#326CE5",
  Career: "#e879f9",
  Monitoring: "#E6522C",
  Docker: "#2496ED",
  Growth: "#10b981",
};

function Blog() {
  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/4 left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Latest writing</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          From the <span className="orange-text-gradient">Blog</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          My most recent posts from the 30 Days of DevSecOps challenge. Real lessons from real production systems.
        </p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        {blogPosts.map((post, i) => {
          const color = tagColors[post.tag] || "#a78bfa";
          return (
            <motion.a
              key={post.day}
              href={socialLinks.linkedinActivity}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="group relative rounded-2xl overflow-hidden card-hover block"
            >
              {/* Top accent bar */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />

              <div className="bg-bg1 border border-white/[0.06] border-t-0 rounded-b-2xl p-7 h-full flex flex-col">
                {/* Meta row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-muted uppercase tracking-wider">Day {post.day}</span>
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
                    style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}25` }}
                  >
                    {post.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-outfit font-semibold text-white leading-snug group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] font-outfit font-light text-[#9488aa] leading-[1.7] mt-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-5 flex items-center gap-2 text-[12px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read on LinkedIn
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 text-center">
        <a
          href={socialLinks.linkedinActivity}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full green-pink-gradient text-white font-outfit font-semibold text-[14px] hover:opacity-90 transition-opacity"
        >
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Follow on LinkedIn
        </a>
      </motion.div>
    </section>
  );
}

export default Blog;
