import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* The easing used everywhere. Exported so every component shares it. */
export const EASE_EXPO = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH = [0.65, 0, 0.35, 1];

/* Standard entrance: a short rise with a long, decelerating fade. */
export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

/* Parent that releases its children one after another. */
export const staggerVariants = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/* Word-level headline reveal. */
export const wordVariants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

/**
 * Tracks which section is currently framed in the viewport so the
 * navigation can show an active indicator. Uses a single observer
 * with a band across the middle of the screen rather than scroll math.
 */
export function useActiveSection(ids, { rootMargin = "-45% 0px -50% 0px" } = {}) {
  const [active, setActive] = useState(ids[0]);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => seen.set(entry.target.id, entry.isIntersecting));
        const current = ids.find((id) => seen.get(id));
        if (current) setActive(current);
      },
      { rootMargin, threshold: 0 }
    );

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    nodes.forEach((node) => observer.observe(node));

    /* The sections past the hero arrive with a lazy chunk; retry until
       they are all mounted, then stop. */
    let retry;
    if (nodes.length < ids.length && attempt < 25) {
      retry = setTimeout(() => setAttempt((n) => n + 1), 300);
    }

    return () => {
      observer.disconnect();
      clearTimeout(retry);
    };
  }, [ids, rootMargin, attempt]);

  return active;
}

/**
 * Magnetic hover: the element leans a few pixels toward the cursor.
 * Returns props to spread onto the target. Disabled for coarse
 * pointers and for anyone who asked for reduced motion.
 */
export function useMagnetic(strength = 0.28) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  const active = enabled && !prefersReduced;

  const onMouseMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node || !active) return;
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    },
    [active, strength]
  );

  const onMouseLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate3d(0, 0, 0)";
  }, []);

  if (!active) return { ref };

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" },
  };
}

/**
 * True once the element has been scrolled into view at least once.
 * Used to defer expensive work (canvas loops, typing sequences)
 * until the section is actually on screen.
 */
export function useInViewOnce(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

/** Matches a media query, re-evaluating on change. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
