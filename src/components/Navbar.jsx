import { useState, useEffect, useCallback } from "react";
import { navLinks, socialLinks } from "../constants";

function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(totalHeight > 0 ? (y / totalHeight) * 100 : 0);

    // Scroll-spy: find the section currently in view
    const sectionEls = navLinks
      .map((l) => ({ id: l.id, title: l.title, el: document.getElementById(l.id) }))
      .filter((s) => s.el);

    for (let i = sectionEls.length - 1; i >= 0; i--) {
      const { el, title } = sectionEls[i];
      if (el.getBoundingClientRect().top <= 120) {
        setActive(title);
        return;
      }
    }
    setActive("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#050816]/90 backdrop-blur-lg border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#"
            onClick={() => { setActive(""); window.scrollTo(0, 0); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accentPink flex items-center justify-center text-white font-bold font-outfit text-sm group-hover:scale-110 transition-transform duration-300">
              DK
            </div>
            <span className="text-white font-outfit font-semibold text-[17px] hidden sm:block">
              Devesh Khatik
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setActive(link.title)}
                    className={`text-[12px] font-mono uppercase tracking-[0.12em] transition-colors duration-200 hover:text-accent ${
                      active === link.title ? "text-accent" : "text-[#9488aa]"
                    }`}
                  >
                    {link.title}
                  </a>
                  {active === link.title && (
                    <span className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </li>
              ))}
            </ul>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-[7px] rounded-full text-[11px] font-mono uppercase tracking-wider border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-300"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-[#9488aa] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-6 h-[2px] bg-[#9488aa] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-[#9488aa] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-[72px] left-0 w-full bg-[#0a0618]/97 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-[500px] py-6" : "max-h-0 py-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => { setActive(link.title); setMenuOpen(false); }}
                  className={`text-[14px] font-mono uppercase tracking-[0.12em] transition-colors duration-200 ${
                    active === link.title ? "text-accent" : "text-[#9488aa]"
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-[12px] font-mono uppercase tracking-wider border border-accent/40 text-accent"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
