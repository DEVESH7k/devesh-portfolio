import About from "./About";
import Experience from "./Experience";
import TechStack from "./TechStack";
import DevSecOpsLifecycle from "../components/DevSecOpsLifecycle";
import Projects from "./Projects";
import Terminal from "../components/Terminal";
import Writing from "./Writing";
import Contact from "./Contact";

/* Everything below the fold ships as a single extra chunk: the hero
   can paint and become interactive without parsing the rest of the
   page, and one request avoids the layout churn of per-section
   splitting. App prefetches this immediately after mount. */
export default function BelowFold() {
  return (
    <>
      <About />
      <div className="shell"><div className="hairline" /></div>
      <Experience />
      <TechStack />
      <DevSecOpsLifecycle />
      <Projects />
      <div className="shell"><div className="hairline" /></div>
      <Terminal />
      <Writing />
      <Contact />
    </>
  );
}
