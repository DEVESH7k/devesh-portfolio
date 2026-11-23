import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, socialLinks } from "../constants";
import { EASE_EXPO, useActiveSection } from "../hooks/useScrollAnimation";

const SECTION_IDS = navLinks.map((link) => link.id);

function Monogram({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect
        x="1.6"
        y="1.6"
        width="36.8"
        height="36.8"
        rx="11"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.4"
      />
      <text
        x="20"
        y="21.4"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, sans-serif"
        fontSize="14.5"
        fontWeight="600"
        letterSpacing="-0.6"
        fill="currentColor"
      >
        DK
      </text>
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useMotionValueEvent(scrollY, "change", (value) => {
    setSolid(value > 24);
  });

  /* Lock the page while the mobile sheet is open. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_EXPO }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ease-expo ${
            solid
              ? "border-b border-line bg-ink/65 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className="shell flex h-[68px] items-center justify-between gap-6"
          >
            <a
              href="#hero"
              className="flex items-center gap-2.5 text-chalk transition-opacity duration-300 hover:opacity-80"
              aria-label="Devesh Khatik — back to top"
            >
              <Monogram className="h-9 w-9" />
              <span className="sr-only">Devesh Khatik</span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[13px] tracking-[-0.01em] transition-colors duration-300 ${
                        isActive ? "text-chalk" : "text-mist hover:text-chalk"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-chalk/[0.07]"
                          transition={{ duration: 0.5, ease: EASE_EXPO }}
                        />
                      )}
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost sheen hidden h-10 px-5 text-[13px] sm:inline-flex"
              >
                Download Resume
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-line text-chalk transition-colors duration-300 hover:bg-chalk/5 lg:hidden"
              >
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  {menuOpen ? (
                    <path d="m6 6 12 12M18 6 6 18" />
                  ) : (
                    <path d="M4 9h16M4 15h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            className="fixed inset-0 z-40 bg-ink/92 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="shell flex h-full flex-col justify-center gap-1 pb-16"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-3xl font-medium tracking-[-0.03em] text-chalk"
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
                }}
                className="mt-8"
              >
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-solid w-full"
                >
                  Download Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
