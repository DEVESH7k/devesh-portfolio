import { useState, useEffect, useRef } from "react";

function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef(null);

  // Parse number from strings like "156+", "3.5K+", "50+"
  const parseTarget = (val) => {
    if (typeof val === "number") return val;
    const str = String(val).replace(/[+,]/g, "");
    if (str.includes("K")) return parseFloat(str.replace("K", "")) * 1000;
    return parseFloat(str) || 0;
  };

  const target = parseTarget(end);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [started, target, duration]);

  // Format back to display string
  const format = (val) => {
    const original = String(end);
    if (original.includes("K")) {
      return (val / 1000).toFixed(1) + "K+";
    }
    if (original.includes("+")) return val.toLocaleString() + "+";
    if (original === "24/7") return "24/7";
    return val.toLocaleString();
  };

  return { ref, displayValue: format(count) };
}

export default useCountUp;
