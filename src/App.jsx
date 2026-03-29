import { useState, lazy, Suspense, useEffect, useCallback } from "react";
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
const SecurityDashboard = lazy(() => import("./sections/SecurityDashboard"));
const CodeSnippets   = lazy(() => import("./sections/CodeSnippets"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Writing        = lazy(() => import("./sections/Challenge"));
const Testimonials   = lazy(() => import("./sections/Testimonials"));
const Contact        = lazy(() => import("./sections/Contact"));

function SectionFallback() {
  return (
    <div className="section-padding flex items-center justify-center min-h-[200px]">
      <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" aria-label="Loading section" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global ⌘K / Ctrl+K listener
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
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <div className={`relative bg-[#050816] ${loading ? "overflow-hidden h-screen" : ""}`}>
        {/* Aurora replaces the old StarsCanvas */}
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
              <SecurityDashboard />
              <CodeSnippets />
              <Certifications />
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
