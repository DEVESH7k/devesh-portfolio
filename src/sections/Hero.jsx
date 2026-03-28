import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "../constants";

const titles = [
  "DevSecOps Engineer",
  "Cloud Security Builder",
  "CI/CD Pipeline Architect",
  "Shift-Left Advocate",
];

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const sectionRef = useRef(null);

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
    <section ref={sectionRef} className="relative w-full h-screen flex items-center overflow-hidden">
    

      {/* Cursor glow */}
      <div className="cursor-glow hidden md:block" style={{ left: mousePos.x, top: mousePos.y }} />

      <div className="pointer-events-none absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.07] blur-3xl bg-accent" />
      <div className="pointer-events-none absolute bottom-[15%] right-[5%] w-[350px] h-[350px] rounded-full opacity-[0.05] blur-3xl bg-accentPink" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="section-label">
          Hello, I'm Devesh
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="text-[42px] sm:text-[56px] md:text-[68px] font-bold font-outfit leading-[1.08] mt-2">
          I build <span className="orange-text-gradient">secure</span>
          <br />
          cloud-native pipelines.
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-5 h-[32px]">
          <span className="text-[18px] sm:text-[22px] font-mono text-accent">
            {">"} {titles[titleIndex].slice(0, charIndex)}
          </span>
          <span className="inline-block w-[2px] h-[20px] bg-accent ml-1 animate-pulse align-middle" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }} className="mt-10 flex flex-wrap gap-8 sm:gap-12">
          {[
            { val: "156+", label: "CI/CD Pipelines" },
            { val: "50+", label: "Cloud Environments" },
            { val: "3.5K+", label: "LinkedIn Followers" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[28px] sm:text-[34px] font-bold font-outfit text-white leading-none">{s.val}</p>
              <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-[0.15em] mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="px-7 py-3 rounded-full green-pink-gradient text-white font-outfit font-semibold text-[14px] hover:opacity-90 transition-opacity">
            View Projects
          </a>
          <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="px-7 py-3 rounded-full border border-accent/40 text-accent font-outfit font-semibold text-[14px] hover:bg-accent/10 transition-all duration-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Resume
          </a>
          <a href="#contact" className="px-7 py-3 rounded-full border border-white/[0.12] text-[#9488aa] font-outfit font-semibold text-[14px] hover:border-accent hover:text-accent transition-all duration-300">
            Get in Touch
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#about" className="flex flex-col items-center gap-2">
            <div className="w-[28px] h-[48px] rounded-full border-2 border-[#9488aa]/40 flex justify-center pt-2">
              <motion.div animate={{ y: [0, 16, 0] }} transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }} className="w-[6px] h-[6px] rounded-full bg-accent" />
            </div>
            <span className="text-[10px] font-mono text-[#9488aa]/60 uppercase tracking-widest">Scroll</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
