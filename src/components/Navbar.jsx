import { useState, useEffect, useCallback } from "react";
import { navLinks, socialLinks } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.088 0.164V1.746c0 .09.039.176.107.237L12.123 6.258H1.125A.125.125 0 001 6.414v1.172c0 .086.07.156.125.156H12.123L7.195 12.018a.172.172 0 00-.107.236v1.582c0 .133.158.205.258.117l7.47-6.482a1.03 1.03 0 000-1.542L7.346.047c-.1-.088-.258-.016-.258.117z" fill="currentColor"/>
  </svg>
);

function Navbar({ onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("");

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 40);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(totalHeight > 0 ? (y / totalHeight) * 100 : 0);

    const sectionEls = navLinks
      .map((l) => ({ id: l.id, title: l.title, el: document.getElementById(l.id) }))
      .filter((s) => s.el);
    for (let i = sectionEls.length - 1; i >= 0; i--) {
      if (sectionEls[i].el.getBoundingClientRect().top <= 120) {
        setActive(sectionEls[i].title);
        return;
      }
    }
    setActive("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Top nav bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#080808]/90 backdrop-blur-lg border-b border-white/[0.05]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#"
            onClick={() => { setActive(""); window.scrollTo(0, 0); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 flex items-center justify-center border border-accent/50 group-hover:border-accent transition-colors duration-300">
              <span className="text-accent font-bold text-xs tracking-wider" style={{ fontFamily: "'Chakra Petch', monospace" }}>DK</span>
            </div>
            <span className="text-white/80 text-sm tracking-[0.15em] uppercase hidden sm:block" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              Devesh Khatik
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Open to work */}
            <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/40" style={{ fontFamily: "'Chakra Petch', monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              Open to work
            </div>

            {/* Hamburger — z-[200] keeps it above the overlay */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex flex-col justify-center gap-[5px] w-10 h-10 group relative z-[200]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-[1px] bg-white/60 group-hover:bg-white block"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="w-2/3 h-[1px] bg-white/60 group-hover:bg-white block origin-left"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-[1px] bg-white/60 group-hover:bg-white block"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay open"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full flex flex-col md:flex-row max-w-[1440px] mx-auto px-8 sm:px-12 py-8 h-full">

              {/* Left column */}
              <div className="flex flex-col justify-between md:w-1/3 pb-8 md:pb-0 border-b md:border-b-0 md:border-r border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 flex items-center justify-center border border-accent/50">
                      <span className="text-accent font-bold text-xs" style={{ fontFamily: "'Chakra Petch', monospace" }}>DK</span>
                    </div>
                    <span className="text-white/80 text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                      Devesh Khatik
                    </span>
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed max-w-[260px] mb-8" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    DevSecOps Engineer · Mumbai, India<br />
                    Securing cloud-native pipelines at scale.
                  </p>
                  <div className="flex flex-col gap-2 text-[12px] text-white/40 tracking-wider uppercase" style={{ fontFamily: "'Chakra Petch', monospace" }}>
                    <span>/ deveshkhatik@gmail.com</span>
                    <span>/ Mumbai, India</span>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-4 mt-8">
                  {[
                    { href: socialLinks.github, label: "GH" },
                    { href: socialLinks.linkedin, label: "LI" },
                    { href: `mailto:${socialLinks.email}`, label: "EM" },
                  ].map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={label !== "EM" ? "_blank" : undefined}
                      rel={label !== "EM" ? "noopener noreferrer" : undefined}
                      className="text-[10px] tracking-[0.2em] text-white/30 hover:text-accent transition-colors duration-200 uppercase"
                      style={{ fontFamily: "'Chakra Petch', monospace" }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right column — nav links */}
              <div className="flex-1 flex flex-col justify-center md:pl-16 pt-8 md:pt-0">
                <div className="flex justify-between items-center mb-10 md:mb-16">
                  <span className="text-white/20 text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Chakra Petch', monospace" }}>
                    / Menu
                  </span>
                </div>

                <nav>
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <a
                          href={`#${link.id}`}
                          onClick={() => { setActive(link.title); setMenuOpen(false); }}
                          className={`group flex items-center justify-between py-3 border-b border-white/[0.05] hover:border-accent/30 transition-colors duration-200 ${
                            active === link.title ? "text-accent" : "text-white/60 hover:text-white"
                          }`}
                        >
                          <span
                            className="text-2xl md:text-3xl font-semibold tracking-tight uppercase transition-all duration-200 group-hover:translate-x-2"
                            style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                          >
                            {link.title}
                          </span>
                          <span className="text-white/20 text-[11px] tracking-widest" style={{ fontFamily: "'Chakra Petch', monospace" }}>
                            0{i + 1}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-10">
                  <a
                    href={socialLinks.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="xizt-btn"
                  >
                    Download Resume
                    <span className="arrow-wrap">
                      <ArrowIcon />
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
