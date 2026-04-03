import { useState, lazy, Suspense, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import AuroraBackground from "./components/AuroraBackground";
import CommandPalette from "./components/CommandPalette";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";

const About          = lazy(() => import("./sections/About"));
const Skills         = lazy(() => import("./sections/Skills"));
const Experience     = lazy(() => import("./sections/Experience"));
const Projects       = lazy(() => import("./sections/Projects"));
const Architecture   = lazy(() => import("./sections/Architecture"));
const Writing        = lazy(() => import("./sections/Challenge"));
const Testimonials   = lazy(() => import("./sections/Testimonials"));
const Contact        = lazy(() => import("./sections/Contact"));

function SectionFallback() {
  return (
    <div className="section-padding flex items-center justify-center min-h-[200px]">
      <div className="w-5 h-5 border border-accent/40 border-t-accent animate-spin" aria-label="Loading section" />
    </div>
  );
}


function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(pct > 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center border border-accent/40 bg-[#080808]/80 backdrop-blur-sm text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 text-lg"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  // Always enforce dark mode — remove any stale light theme from localStorage
  localStorage.removeItem("theme");
  document.documentElement.classList.remove("light");

  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setPaletteOpen((o) => !o);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Grain / noise texture */}
      <div className="noise-layer" aria-hidden="true" />

      <BackToTop />

        {loading && <Loader onComplete={() => setLoading(false)} />}

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

        <div className={`relative bg-primary ${loading ? "overflow-hidden h-screen" : ""}`}>
          <AuroraBackground />

          <div className="relative z-10">
            <Navbar onOpenPalette={() => setPaletteOpen(true)} />
            <main>
              <Hero />
              <Suspense fallback={<SectionFallback />}>
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Architecture />
                <Writing />
                <Testimonials />
                <Contact />
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
    </>
  );
}

export default App;
