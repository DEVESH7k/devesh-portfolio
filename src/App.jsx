import { useState, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";

// Lazy load heavier sections for performance
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Experience = lazy(() => import("./sections/Experience"));
const Projects = lazy(() => import("./sections/Projects"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Challenge = lazy(() => import("./sections/Challenge"));
const Blog = lazy(() => import("./sections/Blog"));
const Contact = lazy(() => import("./sections/Contact"));

function SectionFallback() {
  return (
    <div className="section-padding flex items-center justify-center min-h-[200px]">
      <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`relative bg-[#050816] ${loading ? "overflow-hidden h-screen" : ""}`}>
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Challenge />
          <Blog />
          <Contact />
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

export default App;
