import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { lifecycleStages } from "../constants";
import AnimatedSection, { Reveal, SectionHeading } from "./AnimatedSection";
import TechMark from "./TechMark";
import { EASE_EXPO } from "../hooks/useScrollAnimation";

/* ──────────────────────────────────────────────────────────────
   Geometry for the desktop flow. Nodes sit on a gentle wave so the
   track reads as a path rather than a progress bar.
   ────────────────────────────────────────────────────────────── */
const VIEW_W = 1200;
const VIEW_H = 240;
const PAD_X = 74;

const NODES = lifecycleStages.map((stage, i) => {
  const step = (VIEW_W - PAD_X * 2) / (lifecycleStages.length - 1);
  return {
    ...stage,
    x: PAD_X + i * step,
    y: VIEW_H / 2 + Math.sin(i * 0.92) * 22,
  };
});

/* Catmull-Rom through the nodes, emitted as cubic beziers. */
function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const TRACK_D = smoothPath(NODES);

function StageDetail({ stage, active }) {
  return (
    <div
      className={`transition-opacity duration-500 ease-expo ${
        active ? "opacity-100" : "opacity-45"
      }`}
    >
      <span
        className={`block font-mono text-[9.5px] uppercase leading-tight tracking-[0.13em] transition-colors duration-500 ${
          active ? "text-chalk" : "text-mist/70"
        }`}
      >
        {stage.label}
      </span>
      <span className="mt-1.5 flex items-center justify-center gap-1.5">
        {stage.tools.map((tool) => (
          <TechMark
            key={tool}
            name={tool}
            title={tool}
            className={`h-3.5 w-3.5 transition-colors duration-500 ${
              active ? "text-emerald" : "text-mist/55"
            }`}
          />
        ))}
      </span>
    </div>
  );
}

export default function DevSecOpsLifecycle() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(prefersReduced ? NODES.length - 1 : -1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const scrollDrawn = useTransform(progress, (v) => Math.max(0.001, v));
  const drawn = prefersReduced ? 1 : scrollDrawn;

  /* One state update per stage boundary rather than per frame. */
  useMotionValueEvent(progress, "change", (value) => {
    if (prefersReduced) return;
    const index = Math.min(
      NODES.length - 1,
      Math.floor(value * NODES.length + 0.18) - 1
    );
    setActiveIndex(index);
  });

  const reached = (i) => (prefersReduced ? true : i <= activeIndex);

  return (
    <AnimatedSection id="lifecycle" label="The DevSecOps lifecycle" className="bg-ink-soft/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Lifecycle"
          title="Security at every stage, not the last one."
          accent={["every", "stage,"]}
        >
          The shape of the pipelines I build: eight stages where each gate has to
          pass before the next one starts.
        </SectionHeading>

        <div ref={ref} className="mt-16 lg:mt-20">
          {/* ── Desktop: horizontal flow ── */}
          <div className="relative hidden lg:block">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="w-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="flow-grad" x1="0" y1="0" x2={VIEW_W} y2="0">
                  <stop offset="0" stopColor="#00DFA2" />
                  <stop offset="0.5" stopColor="#55C8FF" />
                  <stop offset="1" stopColor="#477BFF" />
                </linearGradient>
              </defs>

              {/* Unlit track */}
              <path
                d={TRACK_D}
                stroke="rgba(245,245,247,0.16)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="1 7"
              />

              {/* Illuminated path, drawn by scroll */}
              <motion.path
                d={TRACK_D}
                stroke="url(#flow-grad)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeOpacity="0.14"
                style={{ pathLength: drawn }}
              />
              <motion.path
                d={TRACK_D}
                stroke="url(#flow-grad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ pathLength: drawn }}
              />
            </svg>

            {/* Nodes overlaid as HTML for crisp labels */}
            {NODES.map((stage, i) => (
              <div
                key={stage.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(stage.x / VIEW_W) * 100}%`,
                  top: `${(stage.y / VIEW_H) * 100}%`,
                }}
              >
                <div className="flex flex-col items-center">
                  <motion.span
                    animate={{
                      scale: reached(i) ? 1 : 0.72,
                      opacity: reached(i) ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.55, ease: EASE_EXPO }}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
                      reached(i)
                        ? "border-emerald/50 bg-ink"
                        : "border-line bg-ink-soft"
                    } ${stage.emphasis ? "ring-1 ring-emerald/25 ring-offset-4 ring-offset-ink-soft" : ""}`}
                  >
                    {reached(i) && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: EASE_EXPO }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(0,223,162,0.22), transparent 70%)",
                        }}
                      />
                    )}
                    <span
                      className={`relative font-mono text-[10px] font-medium transition-colors duration-500 ${
                        reached(i) ? "text-chalk" : "text-mist/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.span>

                  <div className="mt-4 w-[128px] text-center">
                    <StageDetail stage={stage} active={reached(i)} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active stage note, desktop */}
          <div className="mt-8 hidden h-6 text-center lg:block">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="text-sm text-mist"
            >
              {NODES[Math.max(0, activeIndex)]?.note}
            </motion.p>
          </div>

          {/* ── Below desktop: a vertical read of the same pipeline ── */}
          <ol className="relative space-y-7 lg:hidden">
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[21px] top-3 w-px bg-gradient-to-b from-emerald via-cyan to-azure opacity-30"
            />
            {NODES.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.id}
                delay={0.04 * i}
                amount={0.3}
                className="relative flex gap-4"
              >
                <span
                  className={`relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border bg-ink font-mono text-[10px] ${
                    stage.emphasis
                      ? "border-emerald/50 text-chalk"
                      : "border-line text-mist"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-chalk">
                    {stage.label}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-mist">{stage.note}</p>
                  <div className="mt-2.5 flex items-center gap-3">
                    {stage.tools.map((tool) => (
                      <span key={tool} className="flex items-center gap-1.5 text-[11px] text-mist/80">
                        <TechMark name={tool} title={tool} className="h-3.5 w-3.5 text-emerald/80" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </AnimatedSection>
  );
}
