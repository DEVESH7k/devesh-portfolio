function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Orb 1 — top-left violet */}
      <div
        className="aurora-orb"
        style={{
          width: "900px",
          height: "750px",
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.22) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)",
          top: "-280px",
          left: "-280px",
          animation: "aurora1 28s ease-in-out infinite",
        }}
      />
      {/* Orb 2 — right pink */}
      <div
        className="aurora-orb"
        style={{
          width: "700px",
          height: "650px",
          background:
            "radial-gradient(ellipse at center, rgba(232,121,249,0.14) 0%, rgba(192,132,252,0.05) 40%, transparent 70%)",
          top: "15%",
          right: "-220px",
          animation: "aurora2 34s ease-in-out infinite",
        }}
      />
      {/* Orb 3 — bottom-center blue */}
      <div
        className="aurora-orb"
        style={{
          width: "650px",
          height: "550px",
          background:
            "radial-gradient(ellipse at center, rgba(96,165,250,0.1) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)",
          bottom: "-120px",
          left: "28%",
          animation: "aurora3 24s ease-in-out infinite",
        }}
      />
      {/* Orb 4 — center dim pulse */}
      <div
        className="aurora-orb"
        style={{
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(167,139,250,0.07) 0%, transparent 70%)",
          top: "45%",
          left: "45%",
          transform: "translate(-50%,-50%)",
          animation: "aurora1 38s ease-in-out infinite reverse",
        }}
      />
      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.018,
          backgroundImage:
            "radial-gradient(rgba(167,139,250,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

export default AuroraBackground;
