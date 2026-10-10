import { useState, useEffect, useCallback, useRef } from "react";
import { navLinks, socialLinks } from "../constants";

export default function Navbar() {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrolledToTop(currentScrollY < 50);

    if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
      // Scrolling down
      setVisible(false);
    } else {
      // Scrolling up
      setVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolledToTop
          ? "bg-navy/80 backdrop-blur-sm h-24"
          : "bg-navy/90 backdrop-blur-md h-20 shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)]"
      }`}
    >
      <div className="w-full h-full px-6 sm:px-12 md:px-14 flex items-center justify-between">
        {/* Hexagon Logo */}
        <a
          href="#"
          className="group relative flex items-center justify-center w-11 h-11 text-teal focus:outline-none"
          aria-label="Devesh Khatik Home"
        >
          <svg
            viewBox="0 0 84 96"
            className="w-full h-full transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon
              points="42 3, 81 25.5, 81 70.5, 42 93, 3 70.5, 3 25.5"
              className="group-hover:fill-teal/10 transition-colors duration-300"
            />
          </svg>
          <span className="absolute font-mono font-bold text-teal text-base select-none">
            D
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          <ol className="flex items-center gap-7 list-none m-0 p-0 font-mono text-[13px]">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-slate-lightest hover:text-teal transition-colors duration-200 py-2 inline-flex items-center group"
                >
                  <span className="text-teal mr-1.5 font-normal text-xs">
                    {link.number}.
                  </span>
                  <span className="text-slate-lightest group-hover:text-teal transition-colors duration-200">
                    {link.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-teal ml-3 text-xs px-4 py-2.5 rounded"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-50 p-2 text-teal focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="w-7 h-5 flex flex-col justify-between items-end">
            <span
              className={`h-[2px] bg-teal rounded transition-all duration-300 ${
                menuOpen ? "w-7 -rotate-45 translate-y-[9px]" : "w-7"
              }`}
            />
            <span
              className={`h-[2px] bg-teal rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 w-7" : "w-5"
              }`}
            />
            <span
              className={`h-[2px] bg-teal rounded transition-all duration-300 ${
                menuOpen ? "w-7 rotate-45 -translate-y-[9px]" : "w-6"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Sidebar Overlay & Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop blur */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Slide-in Menu Panel */}
        <aside
          className={`absolute top-0 right-0 h-screen w-[min(75vw,360px)] bg-navy-light shadow-[-10px_0_30px_-15px_rgba(2,12,27,0.7)] flex flex-col justify-center items-center px-8 transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="w-full text-center" aria-label="Mobile Navigation">
            <ol className="flex flex-col gap-6 list-none m-0 p-0 font-mono text-base">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex flex-col items-center py-1 text-slate-lightest hover:text-teal transition-colors"
                  >
                    <span className="text-teal text-sm mb-1">{link.number}.</span>
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-teal text-sm px-8 py-3.5 inline-block"
              >
                Resume
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
