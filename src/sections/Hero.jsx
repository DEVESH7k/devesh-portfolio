import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "../constants";

const TERMINAL_CYCLES = [
  {
    run: "#47", branch: "main", status: "SUCCESS",
    lines: [
      { ts: "08:42:01", text: "Incoming webhook — main branch push detected", type: "info" },
      { ts: "08:42:02", text: "Starting pipeline: netflix-clone-devsecops #47", type: "info" },
      { ts: "08:42:03", text: "Stage 1/5 · Source Checkout ................. ✓", type: "success" },
      { ts: "08:42:08", text: "Stage 2/5 · SonarQube SAST .................. ✓  (0 bugs · 0 vulns)", type: "success" },
      { ts: "08:42:19", text: "Stage 3/5 · Docker Build ..................... ✓  devesh/netflix:2.4.1", type: "success" },
      { ts: "08:42:26", text: "Stage 4/5 · Trivy CVE Scan .................. ✓  CRITICAL: 0 · HIGH: 0", type: "success" },
      { ts: "08:42:33", text: "Stage 5/5 · EKS Rolling Deploy .............. ✓  3/3 pods healthy", type: "success" },
      { ts: "08:42:34", text: "✅  Pipeline SUCCESS — 33s — all security gates passed", type: "done" },
    ],
  },
  {
    run: "#48", branch: "feature/update-deps", status: "BLOCKED",
    lines: [
      { ts: "14:17:01", text: "Incoming webhook — feature/update-deps push", type: "info" },
      { ts: "14:17:03", text: "Stage 1/5 · Source Checkout ................. ✓", type: "success" },
      { ts: "14:17:08", text: "Stage 2/5 · SonarQube SAST .................. ✓  (0 bugs · 0 vulns)", type: "success" },
      { ts: "14:17:19", text: "Stage 3/5 · Docker Build ..................... ✓  devesh/netflix:2.4.2", type: "success" },
      { ts: "14:17:26", text: "Stage 4/5 · Trivy CVE Scan .................. ✗  CRITICAL: 2 found", type: "fail" },
      { ts: "14:17:26", text: "  ↳ CVE-2024-4577 [CRITICAL] php:8.2 — RCE via arg injection", type: "fail" },
      { ts: "14:17:27", text: "⛔  Pipeline BLOCKED — 2 CRITICAL CVEs, deploy prevented", type: "blocked" },
    ],
  },
  {
    run: "#49", branch: "fix/cve-remediation", status: "SUCCESS",
    lines: [
      { ts: "14:31:05", text: "Hotfix: python:3.12-alpine base + certifi≥2024.2", type: "info" },
      { ts: "14:31:14", text: "Stage 2/5 · SonarQube SAST .................. ✓  (0 bugs · 0 vulns)", type: "success" },
      { ts: "14:31:21", text: "Stage 3/5 · Docker Build ..................... ✓  devesh/netflix:2.4.3", type: "success" },
      { ts: "14:31:28", text: "Stage 4/5 · Trivy CVE Scan .................. ✓  CRITICAL: 0 · HIGH: 0", type: "success" },
      { ts: "14:31:35", text: "Stage 5/5 · EKS Rolling Deploy .............. ✓  3/3 pods healthy", type: "success" },
      { ts: "14:31:36", text: "✅  CVEs remediated & deployed — 14 min MTTR", type: "done" },
    ],
  },
];

const lineColor = (type) => {
  if (type === "success") return "#34d399";
  if (type === "done") return "#9d5ff5";
  if (type === "fail") return "#f87171";
  if (type === "blocked") return "#fb923c";
  return "#666";
};

function CicdTerminal() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [tick, setTick] = useState(0);
  const cycle = TERMINAL_CYCLES[cycleIndex];

  useEffect(() => {
    setVisibleCount(0);
    setIsRunning(true);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= cycle.lines.length) {
        clearInterval(interval);
        setIsRunning(false);
        setTimeout(() => {
          setCycleIndex((c) => (c + 1) % TERMINAL_CYCLES.length);
          setTick((t) => t + 1);
        }, cycleIndex === 1 ? 3000 : 4000);
      }
    }, 480);
    return () => clearInterval(interval);
  }, [tick]); // eslint-disable-line react-hooks/exhaustive-deps

  const statusBadge = () => {
    if (isRunning && visibleCount > 0 && visibleCount < cycle.lines.length) {
      return <span className="ml-auto text-[9px] font-mono text-yellow-400 tracking-widest">RUNNING</span>;
    }
    if (!isRunning && cycle.status === "BLOCKED") {
      return <span className="ml-auto text-[9px] font-mono text-orange-400 tracking-widest">BLOCKED</span>;
    }
    if (!isRunning && cycle.status === "SUCCESS") {
      return <span className="ml-auto text-[9px] font-mono text-green-400 tracking-widest">SUCCESS</span>;
    }
    return null;
  };

  return (
    <div className="relative w-full max-w-[460px]">
      {/* Glow */}
      <div className="absolute inset-0 blur-2xl bg-accent/10 scale-105 pointer-events-none" aria-hidden="true" />

      <div className="relative border border-white/[0.07] bg-[#0a0a0a] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] font-mono text-white/30">jenkins — pipeline console</span>
          {statusBadge()}
        </div>
        {/* Branch */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-white/[0.03]">
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-wider">branch</span>
          <span className="text-[10px] font-mono text-accent">{cycle.branch}</span>
          <span className="text-[9px] font-mono text-white/20 ml-auto">run {cycle.run}</span>
        </div>
        {/* Log */}
        <div className="p-4 font-mono text-[11px] leading-[1.9] min-h-[200px] overflow-hidden">
          {cycle.lines.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={`${cycleIndex}-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="flex gap-2"
            >
              <span className="text-white/20 flex-shrink-0 text-[9px]">[{line.ts}]</span>
              <span style={{ color: lineColor(line.type) }}>{line.text}</span>
            </motion.div>
          ))}
          {isRunning && visibleCount < cycle.lines.length && (
            <span className="inline-block w-[2px] h-[12px] bg-accent animate-pulse ml-1" />
          )}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 pb-3 pt-1">
          {TERMINAL_CYCLES.map((c, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === cycleIndex
                  ? (c.status === "BLOCKED" ? "#fb923c" : "#34d399")
                  : "rgba(255,255,255,0.1)",
                transform: i === cycleIndex ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 px-3 py-1 border border-accent/40 bg-[#0a0a0a] text-[10px] font-mono text-accent">
        156+ Pipelines
      </div>
      <div className="absolute -bottom-3 -left-3 px-3 py-1 border border-green-500/30 bg-[#0a0a0a] text-[10px] font-mono text-green-400">
        0 CRITICAL CVEs
      </div>
    </div>
  );
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 14" fill="none">
    <path d="M7.088 0.164V1.746c0 .09.039.176.107.237L12.123 6.258H1.125A.125.125 0 001 6.414v1.172c0 .086.07.156.125.156H12.123L7.195 12.018a.172.172 0 00-.107.236v1.582c0 .133.158.205.258.117l7.47-6.482a1.03 1.03 0 000-1.542L7.346.047c-.1-.088-.258-.016-.258.117z" fill="currentColor"/>
  </svg>
);

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">

      {/* TOP SECTION — 3-column editorial layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1.1fr_0.6fr] border-b border-white/[0.05] min-h-[calc(100vh-180px)]">

        {/* LEFT column */}
        <div className="flex flex-col justify-between p-8 md:p-12 pt-28 md:pt-28 border-r border-white/[0.05]">
          {/* Descriptor */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent text-sm">/</span>
              <p
                className="text-[11px] text-white/40 uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Chakra Petch', monospace" }}
              >
                Professional DevSecOps engineer providing full-stack cloud security engineering and CI/CD automation
              </p>
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 border border-green-500/20 px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">Open to opportunities</span>
            </div>
          </motion.div>

          {/* Bottom of left col — stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {[
              { val: "156+", label: "CI/CD Pipelines" },
              { val: "50+", label: "Cloud Environments" },
              { val: "24/7", label: "On-Call Coverage" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-baseline gap-3 border-t border-white/[0.05] pt-4">
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                >
                  {val}
                </span>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{label}</span>
              </div>
            ))}

            {/* Social links */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { href: socialLinks.github, label: "GitHub", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg> },
                { href: socialLinks.linkedin, label: "LinkedIn", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: `mailto:${socialLinks.email}`, label: "Email", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-8 h-8 border border-white/[0.08] flex items-center justify-center text-white/40 hover:border-accent/60 hover:text-accent transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CENTER column — terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center p-8 md:p-12 pt-28 md:pt-28 border-r border-white/[0.05]"
        >
          <CicdTerminal />
        </motion.div>

        {/* RIGHT column — cloud providers + descriptor */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col justify-between p-8 pt-28"
        >
          {/* Cloud tags */}
          <div className="flex flex-col gap-3">
            {["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"].map((tag, i) => (
              <div
                key={tag}
                className="flex items-center gap-3 border border-white/[0.06] px-3 py-2 hover:border-accent/30 transition-colors duration-300"
              >
                <span className="text-[10px] font-mono text-white/20">0{i + 1}</span>
                <span className="text-[12px] text-white/60 uppercase tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>{tag}</span>
              </div>
            ))}
          </div>

          {/* Bottom descriptor */}
          <div className="text-right">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] rotate-0">
              Innovation at every turn
            </p>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM — large display headline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-12 py-8 border-b border-white/[0.05] flex flex-col gap-0 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1
              className="text-[clamp(42px,8vw,110px)] font-bold leading-[0.92] uppercase text-white"
              style={{ fontFamily: "'Chakra Petch', sans-serif", letterSpacing: "-0.02em" }}
            >
              Turn Vulns
            </h1>
            <h1
              className="text-[clamp(42px,8vw,110px)] font-bold leading-[0.92] uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                letterSpacing: "-0.02em",
                color: "#888",
              }}
            >
              into{" "}
              <span className="text-white">
                / Strength /
              </span>
            </h1>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 pb-2">
            <a href="#contact" className="xizt-btn">
              Let&apos;s Talk
              <span className="arrow-wrap">
                <ArrowIcon />
                <ArrowIcon />
              </span>
            </a>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-mono text-white/40 uppercase tracking-wider hover:text-white transition-colors duration-300"
            >
              / Resume
            </a>
          </div>
        </div>
      </motion.div>

      {/* ProTechmanize tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="px-8 md:px-12 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">Currently at</span>
          <span
            className="text-[12px] text-white/50 uppercase tracking-[0.15em]"
            style={{ fontFamily: "'Chakra Petch', sans-serif" }}
          >
            ProTechmanize
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/10 uppercase tracking-wider hidden md:block">
          Mumbai · India
        </span>
      </motion.div>
    </section>
  );
}

export default Hero;
