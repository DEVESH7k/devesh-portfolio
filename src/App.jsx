import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import SocialRails from "./components/SocialRails";
import Hero from "./sections/Hero";
import TechnologyShowcase from "./components/TechnologyShowcase";
import Footer from "./components/Footer";

const BelowFold = lazy(() => import("./sections/BelowFold"));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = useCallback(() => setIsLoading(false), []);

  /* Warm the below-the-fold chunk as soon as the hero is on screen,
     so the split costs parse time rather than a visible wait. */
  useEffect(() => {
    const warm = () => import("./sections/BelowFold");
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(warm, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} onComplete={handleComplete} />

      <div
        className={`flex min-h-screen flex-col bg-ink text-mist transition-opacity duration-700 ease-expo ${
          isLoading ? "h-screen overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <SocialRails />

        <main id="content" className="flex-1">
          <Hero isLoaded={!isLoading} />
          <TechnologyShowcase />
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <BelowFold />
          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  );
}
