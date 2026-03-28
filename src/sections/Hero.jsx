import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { socialLinks } from "../constants";

const titles = [
  "DevSecOps Engineer",
  "Cloud Security Builder",
  "CI/CD Pipeline Architect",
  "Shift-Left Advocate",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const terminalLines = [
  { prompt: "$", text: "trivy image nginx:latest", color: "#f5f0ff" },
  { prompt: "", text: "✓ No critical CVEs found", color: "#a78bfa" },
  { prompt: "$", text: "kubectl get pods -n prod", color: "#f5f0ff" },
  { prompt: "", text: "nginx-7f8d9b   Running  ✓", color: "#34d399" },
  { prompt: "$", text: "sonar-scanner --project=api", color: "#f5f0ff" },
  { prompt: "", text: "Quality Gate: PASSED  ✓", color: "#34d399" },
];

function TerminalCard() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= terminalLines.length) clearInterval(interval);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="animate-float relative w-full max-w-[400px]"
    >
      {/* Card glow */}
      <div className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-br from-accent/20 to-accentPink/10 scale-110" />

      {/* Card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0618]/95 backdrop-blur-sm overflow-hidden shadow-card">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.015]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[11px] font-mono text-[#9488aa]">
            pipeline-check.sh
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-[13px] leading-[1.9] min-h-[196px]">
          {terminalLines.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-2"
            >
              {line.prompt ? (
                <span className="text-accentPink select-none">{line.prompt}</span>
              ) : (
                <span className="w-[9px]" />
              )}
              <span style={{ color: line.color }}>{line.text}</span>
            </motion.div>
          ))}
          {visibleCount < terminalLines.length && (
            <div className="flex gap-2">
              <span className="text-accentPink">$</span>
              <span className="w-[2px] h-[14px] bg-accent animate-pulse mt-1 inline-block" />
            </div>
          )}
        </div>
      </div>

      {/* Floating badge — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-[#0a0618] border border-accent/30 text-[11px] font-mono text-accent flex items-center gap-1.5 shadow-glow"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        156+ Pipelines
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-[#0a0618] border border-accentPink/30 text-[11px] font-mono text-accentPink flex items-center gap-1.5 shadow-glowPink"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accentPink animate-pulse" />
        50+ Environments
      </motion.div>
    </motion.div>
  );
}

function useCountUp(target, inView, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(Math.floor(eased * target), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function StatItem({ numVal, suffix, label, inView }) {
  const count = useCountUp(numVal, inView);
  return (
    <div>
      <p className="text-[30px] sm:text-[34px] font-bold font-outfit text-white leading-none tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-[0.15em] mt-1">
        {label}
      </p>
    </div>
  );
}

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 70);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((i) => (i + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Cursor glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-[0%] left-[-8%] w-[560px] h-[560px] rounded-full opacity-[0.07] blur-[100px] bg-accent" />
      <div className="pointer-events-none absolute bottom-[5%] right-[-8%] w-[480px] h-[480px] rounded-full opacity-[0.06] blur-[100px] bg-accentPink" />
      <div className="pointer-events-none absolute top-[50%] left-[35%] w-[320px] h-[320px] rounded-full opacity-[0.04] blur-[80px] bg-accentPink" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-14 md:gap-10 items-center">

          {/* ── Left: text content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full border border-accent/20 bg-accent/[0.06] text-[12px] font-mono text-accent"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for new opportunities
            </motion.div>

            {/* Label */}
            <motion.p variants={itemVariants} className="section-label">
              Hello, I'm Devesh
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[40px] sm:text-[52px] md:text-[58px] lg:text-[66px] font-bold font-outfit leading-[1.08] mt-2"
            >
              I build{" "}
              <span className="orange-text-gradient">secure</span>
              <br />
              cloud-native
              <br />
              pipelines.
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={itemVariants}
              className="mt-5 h-[32px] flex items-center gap-0"
            >
              <span className="text-[17px] sm:text-[20px] font-mono text-accent">
                {">"}&nbsp;{titles[titleIndex].slice(0, charIndex)}
              </span>
              <span className="inline-block w-[2px] h-[18px] bg-accent ml-0.5 animate-pulse" />
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-9 sm:gap-14"
            >
              <StatItem
                numVal={156}
                suffix="+"
                label="CI/CD Pipelines"
                inView={statsInView}
              />
              <StatItem
                numVal={50}
                suffix="+"
                label="Cloud Environments"
                inView={statsInView}
              />
              <div>
                <p className="text-[30px] sm:text-[34px] font-bold font-outfit text-white leading-none">
                  3.5K+
                </p>
                <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-[0.15em] mt-1">
                  LinkedIn Followers
                </p>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="px-7 py-3 rounded-full green-pink-gradient text-white font-outfit font-semibold text-[14px] hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
              >
                View Projects
              </a>
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full border border-accent/40 text-accent font-outfit font-semibold text-[14px] hover:bg-accent/10 transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
              </a>
              <a
                href="#contact"
                className="px-7 py-3 rounded-full border border-white/[0.12] text-[#9488aa] font-outfit font-semibold text-[14px] hover:border-accent hover:text-accent transition-all duration-300"
              >
                Contact
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex items-center gap-3"
            >
              {[
                {
                  href: socialLinks.github,
                  label: "GitHub",
                  icon: (
                    <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  href: socialLinks.linkedin,
                  label: "LinkedIn",
                  icon: (
                    <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: `mailto:${socialLinks.email}`,
                  label: "Email",
                  icon: (
                    <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-[#9488aa] hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
              <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
            </motion.div>
          </motion.div>

          {/* ── Right: terminal card ── */}
          <div className="hidden md:flex justify-center md:justify-end pr-4">
            <TerminalCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-2">
          <div className="w-[26px] h-[44px] rounded-full border-2 border-[#9488aa]/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }}
              className="w-[5px] h-[5px] rounded-full bg-accent"
            />
          </div>
          <span className="text-[10px] font-mono text-[#9488aa]/50 uppercase tracking-widest">
            Scroll
          </span>
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;
