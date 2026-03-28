import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "../constants";
import useCountUp from "../hooks/useCountUp";

const titles = [
  "DevSecOps Engineer",
  "Cloud Security Builder",
  "CI/CD Pipeline Architect",
  "Shift-Left Advocate",
];

const LOG_LINES = [
  { ts: "08:42:01", text: "Incoming webhook — main branch push detected", type: "info" },
  { ts: "08:42:02", text: "Starting pipeline: netflix-clone-devsecops #47", type: "info" },
  { ts: "08:42:03", text: "Stage 1/5 · Source Checkout ................. ✓", type: "success" },
  { ts: "08:42:08", text: "Stage 2/5 · SonarQube SAST .................. ✓  (0 bugs · 0 vulns)", type: "success" },
  { ts: "08:42:19", text: "Stage 3/5 · Docker Build ..................... ✓  devesh/netflix:2.4.1", type: "success" },
  { ts: "08:42:26", text: "Stage 4/5 · Trivy CVE Scan .................. ✓  CRITICAL: 0 · HIGH: 0", type: "success" },
  { ts: "08:42:33", text: "Stage 5/5 · EKS Rolling Deploy .............. ✓  3/3 pods healthy", type: "success" },
  { ts: "08:42:34", text: "✅  Pipeline SUCCESS — 33s — all security gates passed", type: "done" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function StatItem({ value, label }) {
  const { ref, displayValue } = useCountUp(value, 1400, true);
  return (
    <div ref={ref}>
      <p className="text-[30px] sm:text-[34px] font-bold font-outfit text-white leading-none tabular-nums">
        {displayValue}
      </p>
      <p className="text-[11px] font-mono text-[#b4aec8] uppercase tracking-[0.15em] mt-1">{label}</p>
    </div>
  );
}

function CicdTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  // cycle counter is the real driver — incrementing it restarts the animation
  const [cycle, setCycle] = useState(0);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(LOG_LINES.length);
      setIsRunning(false);
      return;
    }

    setVisibleCount(0);
    setIsRunning(true);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= LOG_LINES.length) {
        clearInterval(interval);
        setIsRunning(false);
        setTimeout(() => setCycle((c) => c + 1), 4000);
      }
    }, 520);
    return () => clearInterval(interval);
  }, [cycle]); // eslint-disable-line react-hooks/exhaustive-deps

  const lineColor = (type) => {
    if (type === "success") return "#34d399";
    if (type === "done") return "#a78bfa";
    return "#b4aec8";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="animate-float relative w-full max-w-[480px]"
    >
      <div className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-br from-accent/20 to-accentPink/10 scale-110 pointer-events-none" aria-hidden="true" />

      <div className="relative rounded-2xl border border-white/[0.08] bg-[#07040f]/95 backdrop-blur-sm overflow-hidden shadow-card">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-3 text-[11px] font-mono text-[#b4aec8]">jenkins — pipeline console</span>
          {isRunning && visibleCount > 0 && visibleCount < LOG_LINES.length && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-[#febc2e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e] animate-pulse" aria-hidden="true" />
              RUNNING
            </span>
          )}
          {!isRunning && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-[#34d399]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" aria-hidden="true" />
              SUCCESS
            </span>
          )}
        </div>

        {/* Log body */}
        <div className="p-4 font-mono text-[11.5px] leading-[1.85] min-h-[224px] overflow-hidden" aria-label="CI/CD pipeline log output">
          {LOG_LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex gap-2 items-baseline"
            >
              <span className="text-[#4a3d66] flex-shrink-0 text-[10px]">[{line.ts}]</span>
              <span style={{ color: lineColor(line.type) }}>{line.text}</span>
            </motion.div>
          ))}
          {isRunning && visibleCount < LOG_LINES.length && (
            <span className="inline-block w-[2px] h-[13px] bg-accent animate-pulse ml-1" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* Floating status badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-4 -right-3 px-3 py-1.5 rounded-full bg-[#07040f] border border-accent/30 text-[10.5px] font-mono text-accent flex items-center gap-1.5 shadow-glow"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
        156+ Pipelines
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-4 -left-3 px-3 py-1.5 rounded-full bg-[#07040f] border border-[#34d399]/30 text-[10.5px] font-mono text-[#34d399] flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" aria-hidden="true" />
        All gates passed
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 68);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 38);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((i) => (i + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Cursor glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-[-5%] left-[-8%] w-[580px] h-[580px] rounded-full opacity-[0.07] blur-[110px] bg-accent" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[5%] right-[-8%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] bg-accentPink" aria-hidden="true" />
      <div className="pointer-events-none absolute top-[55%] left-[38%] w-[320px] h-[320px] rounded-full opacity-[0.04] blur-[80px] bg-accentPink" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-14 md:gap-8 items-center">

          {/* LEFT */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Status badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07040f] border border-white/[0.08] text-[11px] font-mono text-[#b4aec8]">
                <span className="text-[#34d399]" aria-hidden="true">●</span>
                ProTechmanize · DevSecOps Engineer
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] text-[11px] font-mono text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Open to opportunities
              </div>
            </motion.div>

            {/* Label */}
            <motion.p variants={itemVariants} className="section-label">
              Hello, I'm Devesh
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[40px] sm:text-[52px] md:text-[58px] lg:text-[64px] font-bold font-outfit leading-[1.06] mt-2"
            >
              Engineering
              <br />
              <span className="hero-gradient-text">Secure&nbsp;</span>
              <span className="hero-gradient-text-alt">Cloud&#8209;Native</span>
              <br />
              <span className="text-white">Pipelines.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="mt-5 h-[30px] flex items-center">
              <span
                aria-live="polite"
                aria-atomic="true"
                className="text-[16px] sm:text-[19px] font-mono text-accent"
              >
                &gt;&nbsp;{titles[titleIndex].slice(0, charIndex)}
              </span>
              <span className="inline-block w-[2px] h-[17px] bg-accent ml-0.5 animate-pulse" aria-hidden="true" />
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-8 sm:gap-12">
              <StatItem value="156+" label="CI/CD Pipelines" />
              <StatItem value="50+" label="Cloud Environments" />
              <div>
                <p className="text-[30px] sm:text-[34px] font-bold font-outfit text-white leading-none">24/7</p>
                <p className="text-[11px] font-mono text-[#b4aec8] uppercase tracking-[0.15em] mt-1">On-Call Coverage</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>
              <a
                href="#contact"
                className="px-7 py-3 rounded-full border border-white/[0.12] text-[#b4aec8] font-outfit font-semibold text-[14px] hover:border-accent hover:text-accent transition-all duration-300"
              >
                Contact
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="mt-7 flex items-center gap-3">
              {[
                {
                  href: socialLinks.github, label: "GitHub",
                  icon: <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
                },
                {
                  href: socialLinks.linkedin, label: "LinkedIn",
                  icon: <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                },
                {
                  href: `mailto:${socialLinks.email}`, label: "Email",
                  icon: <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-[#b4aec8] hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
              <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* RIGHT: CI/CD terminal — shown on md+ and on mobile below the fold */}
          <div className="flex justify-center md:justify-end md:pr-2">
            <CicdTerminal />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-2">
          <div className="w-[26px] h-[44px] rounded-full border-2 border-[#b4aec8]/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }}
              className="w-[5px] h-[5px] rounded-full bg-accent"
              aria-hidden="true"
            />
          </div>
          <span className="text-[10px] font-mono text-[#b4aec8]/50 uppercase tracking-widest">Scroll</span>
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;
