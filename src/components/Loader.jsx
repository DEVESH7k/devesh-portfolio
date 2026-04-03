import { useState, useEffect, useRef } from "react";

function Loader({ onComplete }) {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Matrix binary rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#6A1BDA";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Count up 0 → 100
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onComplete?.(), 600);
        }, 400);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loader-container ${hidden ? "hidden" : ""}`}>
      <canvas ref={canvasRef} className="loader-canvas" />
      <div className="loader-content">
        <div className="loader-logo">Devesh Khatik</div>
        <div className="loader-count-row">
          <span className="loader-count">{count}</span>
          <span className="loader-percent">%</span>
        </div>
        <div className="loader-text">Loading...</div>
      </div>
    </div>
  );
}

export default Loader;
