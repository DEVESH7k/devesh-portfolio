import { useEffect, useRef } from "react";

function AuroraBackground() {
  const dotRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (dotRef.current) {
        dotRef.current.style.backgroundPositionY = `${window.scrollY * 0.25}px`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Dot grid with parallax */}
      <div ref={dotRef} className="dot-grid-bg" aria-hidden="true" />
      {/* Subtle purple vignette top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(106,27,218,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Subtle purple vignette bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 50% 40% at 100% 100%, rgba(106,27,218,0.08) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

export default AuroraBackground;
