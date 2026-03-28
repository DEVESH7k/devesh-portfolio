import { useState, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import StarsCanvas from "./components/StarsCanvas";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";

const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Experience = lazy(() => import("./sections/Experience"));
const Projects = lazy(() => import("./sections/Projects"));
const Architecture = lazy(() => import("./sections/Architecture"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Writing = lazy(() => import("./sections/Challenge"));
const Contact = lazy(() => import("./sections/Contact"));

function SectionFallback() {
  return (
    <div className="section-padding flex items-center justify-center min-h-[200px]">
      <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" aria-label="Loading section" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`relative bg-[#050816] ${loading ? "overflow-hidden h-screen" : ""}`}>
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <StarsCanvas />
        </div>
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<SectionFallback />}>
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Architecture />
              <Certifications />
              <Writing />
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
