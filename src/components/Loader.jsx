import { useState, useEffect } from "react";

function Loader({ onComplete }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(() => onComplete && onComplete(), 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader-container ${hidden ? "hidden" : ""}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="loader-logo">DK</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-[11px] font-mono text-[#4a3d66] uppercase tracking-[0.2em]">
          Loading portfolio
        </p>
      </div>
    </div>
  );
}

export default Loader;
