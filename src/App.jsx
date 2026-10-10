import { useState, useCallback } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import SocialRails from "./components/SocialRails";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";

import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Writing from "./sections/Writing";
import Contact from "./sections/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} onComplete={handleComplete} />

      <div
        className={`bg-navy text-slate min-h-screen flex flex-col justify-between selection:bg-navy-lightest selection:text-teal font-sans transition-opacity duration-700 ${
          isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        <Navbar />
        <SocialRails />

        <main
          id="content"
          className="flex-grow w-full max-w-[1000px] mx-auto px-6 sm:px-12 md:px-24 xl:px-0"
        >
          <Hero isLoaded={!isLoading} />
          <About />
          <Experience />
          <Projects />
          <Writing />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
