import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { terminalScript } from "../constants";
import AnimatedSection, { Reveal, SectionHeading } from "./AnimatedSection";
import { useInViewOnce } from "../hooks/useScrollAnimation";

/* Flatten the script into an ordered list of printable rows. */
const ROWS = terminalScript.flatMap((step) => [
  { kind: "command", text: step.command },
  ...step.output.map((text) => ({ kind: "output", text })),
]);

const CHAR_MS = 42;
const OUTPUT_MS = 170;
const STEP_PAUSE_MS = 380;

export default function Terminal() {
  const prefersReduced = useReducedMotion();
  const [stageRef, inView] = useInViewOnce({ threshold: 0.35 });
  const [rows, setRows] = useState([]);
  const [done, setDone] = useState(false);

  /* With reduced motion the whole transcript is simply present. */
  const visibleRows = prefersReduced ? ROWS : rows;
  const finished = prefersReduced || done;

  useEffect(() => {
    if (!inView || prefersReduced) return undefined;

    let cancelled = false;
    let timer;
    let rowIndex = 0;
    let charIndex = 0;
    const printed = [];

    const schedule = (fn, ms) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const tick = () => {
      if (rowIndex >= ROWS.length) {
        setDone(true);
        return;
      }

      const row = ROWS[rowIndex];

      if (row.kind === "output") {
        printed.push(row);
        setRows([...printed]);
        rowIndex += 1;
        charIndex = 0;
        schedule(tick, OUTPUT_MS);
        return;
      }

      charIndex += 1;
      const partial = { kind: "command", text: row.text.slice(0, charIndex) };
      const next = [...printed, partial];
      setRows(next);

      if (charIndex >= row.text.length) {
        printed.push(row);
        rowIndex += 1;
        charIndex = 0;
        schedule(tick, STEP_PAUSE_MS);
      } else {
        schedule(tick, CHAR_MS);
      }
    };

    schedule(tick, 320);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inView, prefersReduced]);

  return (
    <AnimatedSection id="terminal" label="Terminal introduction">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="whoami"
              title="A short introduction, in the shell."
              accent={["shell."]}
            >
              Most of my day happens here — between a pipeline log, a cluster, and
              a scan report that has to come back clean.
            </SectionHeading>
          </div>

          <Reveal className="lg:col-span-7" amount={0.15}>
            <div
              ref={stageRef}
              className="glass overflow-hidden rounded-2xl shadow-lift"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-[10px] w-[10px] rounded-full bg-chalk/15" />
                  <span className="h-[10px] w-[10px] rounded-full bg-chalk/15" />
                  <span className="h-[10px] w-[10px] rounded-full bg-chalk/15" />
                </span>
                <span className="font-mono text-[11px] text-mist/75">
                  devesh@devsecops — zsh
                </span>
              </div>

              <div
                className="min-h-[300px] px-5 py-5 font-mono text-[13px] leading-[1.9] sm:min-h-[330px] sm:px-6 sm:text-sm"
                aria-live="polite"
              >
                {visibleRows.map((row, i) => (
                  <div key={`${row.kind}-${i}-${row.text}`}>
                    {row.kind === "command" ? (
                      <p className="text-chalk">
                        <span className="select-none text-emerald">$ </span>
                        {row.text}
                        {i === visibleRows.length - 1 && !finished && (
                          <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-caret bg-emerald align-middle" />
                        )}
                      </p>
                    ) : (
                      <p className="pl-[1.1em] text-mist">{row.text}</p>
                    )}
                  </div>
                ))}

                {finished && (
                  <p className="text-chalk">
                    <span className="select-none text-emerald">$ </span>
                    <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-caret bg-emerald align-middle" />
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </AnimatedSection>
  );
}
