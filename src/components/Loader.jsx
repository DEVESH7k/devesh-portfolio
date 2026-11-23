import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   The intro. Driven entirely by CSS keyframes (see
   styles/animations.css) so it starts painting before React
   hydrates and never waits on JS timing. The timer below only
   releases the page underneath once the curtain has lifted.
   ────────────────────────────────────────────────────────────── */

const SEQUENCE_MS = 2350;
const REDUCED_MS = 550;

export default function Loader({ isLoading, onComplete }) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(
      () => onComplete?.(),
      prefersReduced ? REDUCED_MS : SEQUENCE_MS
    );
    return () => clearTimeout(timer);
  }, [onComplete, prefersReduced]);

  if (!isLoading) return null;

  return (
    <div
      id="intro-curtain"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink"
      role="status"
      aria-label="Loading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 50%, rgba(0,223,162,0.14), transparent 70%)",
        }}
      />

      <div id="intro-stack" className="relative h-28 w-28 select-none">
        <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="intro-stroke" x1="0" y1="0" x2="120" y2="120">
              <stop offset="0" stopColor="#00DFA2" />
              <stop offset="1" stopColor="#55C8FF" />
            </linearGradient>
          </defs>

          <circle
            id="intro-ring"
            cx="60"
            cy="60"
            r="51"
            fill="none"
            stroke="url(#intro-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />

          <text
            id="intro-mark"
            x="60"
            y="62"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter, sans-serif"
            fontSize="30"
            fontWeight="500"
            letterSpacing="-1.5"
            fill="#F5F5F7"
          >
            DK
          </text>
        </svg>
      </div>

      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}
