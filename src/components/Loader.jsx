import { useEffect } from "react";

export default function Loader({ isLoading, onComplete }) {
  useEffect(() => {
    // Finish loading exactly when the CSS sequence completes (2.7s)
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div
      id="loader-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020c1b]"
      aria-label="Loading portfolio"
    >
      <div
        id="loader-logo-wrapper"
        className="relative flex items-center justify-center w-24 h-24 select-none"
      >
        <svg
          id="logo"
          viewBox="0 0 100 100"
          className="w-full h-full text-teal overflow-visible select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Loader Logo</title>
          {/* Brittany Chiang v4 Exact Hexagon Coordinates */}
          <path
            id="loader-hexagon"
            d="M 50, 5
               L 11, 27
               L 11, 72
               L 50, 95
               L 89, 73
               L 89, 28 z"
            stroke="#64ffda"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Centered Monogram D */}
          <text
            id="loader-letter"
            x="50"
            y="53"
            fill="#64ffda"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-mono), monospace"
            fontSize="34"
            fontWeight="bold"
          >
            D
          </text>
        </svg>
      </div>
    </div>
  );
}
