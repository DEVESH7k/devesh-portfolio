import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TechMark from "./TechMark";
import { useMediaQuery } from "../hooks/useScrollAnimation";

/* ──────────────────────────────────────────────────────────────
   A translucent infinity loop rendered on a 2D canvas with real
   3D maths: points on a Bernoulli lemniscate are given depth,
   rotated, then perspective-projected. Depth drives both opacity
   and stroke width, which is what sells the glass.

   No 3D library — the whole scene is ~120 lines of trigonometry,
   which keeps the bundle small and the frame budget generous.
   ────────────────────────────────────────────────────────────── */

const SEGMENTS = 240;
const FOCAL = 3.2;

/* Point on the loop at parameter t, with a twist in z. */
function loopPoint(t) {
  const d = 1 + Math.sin(t) * Math.sin(t);
  return {
    x: Math.cos(t) / d,
    y: ((Math.sin(t) * Math.cos(t)) / d) * 1.45,
    z: Math.sin(2 * t) * 0.34,
  };
}

/* Rotate around Y then X, and project to the screen. */
function project(p, yaw, pitch, cx, cy, scale) {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);
  const y1 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  const persp = FOCAL / (FOCAL + z2);
  return {
    sx: cx + x1 * scale * persp,
    sy: cy + y1 * scale * persp,
    persp,
  };
}

/* Emerald → cyan → azure along the length of the loop. */
function strokeColor(ratio, alpha) {
  const stops = [
    [0, 223, 162],
    [85, 200, 255],
    [71, 123, 255],
  ];
  const scaled = ratio * (stops.length - 1);
  const i = Math.min(Math.floor(scaled), stops.length - 2);
  const f = scaled - i;
  const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f));
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

function InfinityCanvas({ animate }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let frame = 0;
    let width = 0;
    let height = 0;
    let visible = true;
    let yaw = -0.22;
    let pitch = 0.26;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.42;

      /* Idle rotation plus a gentle lean toward the pointer. */
      const targetYaw = -0.22 + (animate ? Math.sin(time / 7000) * 0.38 : 0) + pointerRef.current.x * 0.32;
      const targetPitch = 0.26 + (animate ? Math.sin(time / 9000) * 0.1 : 0) + pointerRef.current.y * 0.22;
      yaw += (targetYaw - yaw) * 0.045;
      pitch += (targetPitch - pitch) * 0.045;

      const bob = animate ? Math.sin(time / 3400) * height * 0.018 : 0;

      ctx.clearRect(0, 0, width, height);

      const pts = [];
      for (let i = 0; i <= SEGMENTS; i += 1) {
        const t = (i / SEGMENTS) * Math.PI * 2;
        const projected = project(loopPoint(t), yaw, pitch, cx, cy + bob, scale);
        pts.push(projected);
      }

      /* Three passes build the bloom: wide and faint, then the glass
         body, then a tight specular core. Cheaper than a blur filter. */
      const passes = [
        { width: 22, alpha: 0.045, composite: "lighter" },
        { width: 11, alpha: 0.1, composite: "lighter" },
        { width: 4.2, alpha: 0.5, composite: "source-over" },
        { width: 1.3, alpha: 0.95, composite: "lighter" },
      ];

      passes.forEach((pass) => {
        ctx.globalCompositeOperation = pass.composite;
        ctx.lineCap = "round";
        for (let i = 0; i < SEGMENTS; i += 1) {
          const a = pts[i];
          const b = pts[i + 1];
          /* persp ranges roughly 0.85–1.2; remap to a depth factor. */
          const depth = Math.max(0, Math.min(1, (a.persp - 0.82) / 0.4));
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = strokeColor(i / SEGMENTS, pass.alpha * (0.25 + depth * 0.75));
          ctx.lineWidth = pass.width * (0.55 + depth * 0.45) * (width / 520);
          ctx.stroke();
        }
      });

      /* Light pulses travelling the loop — the delivery pipeline. */
      ctx.globalCompositeOperation = "lighter";
      const pulseCount = 3;
      for (let p = 0; p < pulseCount; p += 1) {
        const phase = animate ? time / 5200 : 0.18;
        const t = ((phase + p / pulseCount) % 1) * Math.PI * 2;
        const pt = project(loopPoint(t), yaw, pitch, cx, cy + bob, scale);
        const depth = Math.max(0.2, Math.min(1, (pt.persp - 0.82) / 0.4));
        const r = 13 * depth * (width / 520);
        const grad = ctx.createRadialGradient(pt.sx, pt.sy, 0, pt.sx, pt.sy, r);
        grad.addColorStop(0, `rgba(245,255,252,${0.85 * depth})`);
        grad.addColorStop(0.35, strokeColor((t / (Math.PI * 2)) % 1, 0.5 * depth));
        grad.addColorStop(1, "rgba(0,223,162,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time) => {
      if (visible) draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
    };

    const onVisibility = () => {
      visible = !document.hidden;
    };

    resize();

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting && !document.hidden;
          })
        : null;
    observer?.observe(canvas);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize();
            if (!animate) draw(0);
          })
        : null;
    resizeObserver?.observe(canvas);

    if (animate) {
      frame = window.requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
    } else {
      draw(0);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

/* Chips orbit the loop. Positions are percentages of the stage so
   they stay in composition at every size. */
const CHIPS = [
  { id: "aws", top: "9%", left: "12%", depth: 0.9, delay: 0 },
  { id: "kubernetes", top: "20%", left: "78%", depth: 1.25, delay: 0.5 },
  { id: "docker", top: "64%", left: "6%", depth: 1.1, delay: 1 },
  { id: "terraform", top: "80%", left: "66%", depth: 0.8, delay: 1.5 },
  { id: "github", top: "44%", left: "90%", depth: 0.65, delay: 2 },
  { id: "shield", top: "88%", left: "30%", depth: 1.4, delay: 2.5 },
];

export default function HeroVisual() {
  const prefersReduced = useReducedMotion();
  const isCoarse = useMediaQuery("(hover: none)");
  const animate = !prefersReduced;

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[560px]"
      role="img"
      aria-label="A translucent infinity loop representing the DevSecOps cycle, surrounded by AWS, Kubernetes, Docker, Terraform, GitHub and security marks."
    >
      {/* Ambient light field behind the loop */}
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute inset-[-18%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(42% 42% at 38% 36%, rgba(0,223,162,0.3), transparent 70%), radial-gradient(38% 38% at 68% 62%, rgba(85,200,255,0.26), transparent 72%)",
        }}
      />

      <InfinityCanvas animate={animate} />

      {/* Cloud-infrastructure horizon beneath the loop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[2%]">
        <svg viewBox="0 0 560 160" className="w-full" fill="none">
          <defs>
            <linearGradient id="horizon-line" x1="0" y1="0" x2="560" y2="0">
              <stop offset="0" stopColor="#00DFA2" stopOpacity="0" />
              <stop offset="0.5" stopColor="#55C8FF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#477BFF" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="horizon-glow" cx="0.5" cy="1" r="0.75">
              <stop offset="0" stopColor="#00DFA2" stopOpacity="0.22" />
              <stop offset="1" stopColor="#00DFA2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="280" cy="150" rx="250" ry="70" fill="url(#horizon-glow)" />
          <path d="M30 140c70-34 180-50 250-50s180 16 250 50" stroke="url(#horizon-line)" strokeWidth="1.25" />
          <path
            d="M90 152c60-26 150-38 190-38s130 12 190 38"
            stroke="url(#horizon-line)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* Floating technology chips */}
      {CHIPS.map((chip) => (
        <motion.div
          key={chip.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: chip.top, left: chip.left }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 + chip.delay * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={
              animate
                ? { y: [0, -9 * chip.depth, 0], rotate: [0, 1.4, 0] }
                : undefined
            }
            transition={{
              duration: 6 + chip.depth * 2.5,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              delay: chip.delay,
            }}
            className="glass flex items-center justify-center rounded-2xl shadow-lift"
            style={{
              width: `${2.4 + chip.depth * 0.5}rem`,
              height: `${2.4 + chip.depth * 0.5}rem`,
            }}
          >
            <TechMark
              id={chip.id}
              className="h-1/2 w-1/2 text-chalk/80"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Mobile keeps the scene but drops the pointer-parallax hint */}
      {!isCoarse && (
        <span className="sr-only">Move your cursor to tilt the visual.</span>
      )}
    </div>
  );
}
