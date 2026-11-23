import { markIdFor, techNames } from "./techMarkMeta";

/* ──────────────────────────────────────────────────────────────
   Monochrome technology glyphs, drawn on a shared 24×24 grid and
   inheriting `currentColor` so a single colour decision upstream
   keeps the whole strip consistent. Simplified silhouettes, not
   brand reproductions.
   ────────────────────────────────────────────────────────────── */

/* Kubernetes helm spokes are generated so the 7-fold symmetry is exact. */
const K8S_SPOKES = Array.from({ length: 7 }, (_, i) => {
  const angle = (-90 + i * (360 / 7)) * (Math.PI / 180);
  return {
    x1: 12 + Math.cos(angle) * 3.4,
    y1: 12 + Math.sin(angle) * 3.4,
    x2: 12 + Math.cos(angle) * 7.1,
    y2: 12 + Math.sin(angle) * 7.1,
  };
});

/* Helm's ship wheel: eight spokes plus the knobs around the rim. */
const WHEEL = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45 - 90) * (Math.PI / 180);
  return {
    cos: Math.cos(angle),
    sin: Math.sin(angle),
  };
});

const glyphs = {
  aws: (
    <>
      <text
        x="12"
        y="12.6"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="9.6"
        fontWeight="700"
        letterSpacing="-0.4"
        fill="currentColor"
      >
        aws
      </text>
      <path
        d="M3.4 16.9c2.7 1.9 6 2.9 9.3 2.9 2.4 0 4.8-.5 7-1.5l.6 1.2c-2.4 1.1-5 1.7-7.6 1.7-3.7 0-7.2-1.2-10-3.3z"
        fill="currentColor"
      />
    </>
  ),

  azure: (
    <>
      <path d="M10.6 3h4.8l6.2 16.3h-5z" fill="currentColor" opacity="0.55" />
      <path
        d="M9.4 5.8 2.4 19.3h13.8l-3.6-3.9H7.9z"
        fill="currentColor"
      />
    </>
  ),

  kubernetes: (
    <>
      <path
        d="M12 2.1 19.8 5.8 21.8 14.2 16.3 21H7.7L2.2 14.2 4.2 5.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      {K8S_SPOKES.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ))}
    </>
  ),

  docker: (
    <>
      {[
        [3.4, 11.3],
        [7.2, 11.3],
        [11, 11.3],
        [7.2, 7.5],
        [11, 7.5],
        [11, 3.7],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3.2" height="3.2" rx="0.4" fill="currentColor" />
      ))}
      <path
        d="M1.4 15.2h16.9c.6-1.1 1.5-1.8 2.8-2.1.5 1 .6 2.1.2 3.3-.7 2.5-2.9 4.5-6.2 5.2-1.2.2-2.5.4-3.9.4-4.8 0-8.6-1.7-10.8-4.6a8.6 8.6 0 0 1-.8-2.1z"
        fill="currentColor"
      />
    </>
  ),

  terraform: (
    <path
      d="M9 4.3 15.1 7.8v7L9 11.3zM15.9 8.3 22 4.8v7l-6.1 3.5zM9 12.2l6.1 3.5v7L9 19.2zM2.1 .4 8.2 3.9v7L2.1 7.4z"
      fill="currentColor"
      transform="translate(0,3.6)"
    />
  ),

  jenkins: (
    <>
      <path
        d="M6.2 21c0-3.3 2.6-5.6 5.8-5.6s5.8 2.3 5.8 5.6z"
        fill="currentColor"
      />
      <circle cx="12" cy="8.2" r="3.9" fill="currentColor" />
      <path d="M5.9 7.3C5.9 4 8.6 2 12 2s6.1 1.8 6.1 5.1z" fill="currentColor" opacity="0.55" />
      <path d="M12 14.4 10 17l2 1.4 2-1.4z" fill="#050608" />
    </>
  ),

  "github-actions": (
    <>
      <path
        d="M12 3.6a8.4 8.4 0 1 0 8.4 8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M17.4 2.3 23 5.3l-5.6 3z" fill="currentColor" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </>
  ),

  github: (
    <path
      d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2z"
      fill="currentColor"
    />
  ),

  linux: (
    <>
      <path
        d="M12 2.6c2.3 0 3.6 1.8 3.6 4.2 0 1.5.4 2.3 1.3 3.7 1.1 1.7 2.1 3.2 2.1 5.4 0 1.6-.8 2.6-1.9 2.6-.6 0-1-.2-1.4-.5-.9 1-2.2 1.6-3.7 1.6s-2.8-.6-3.7-1.6c-.4.3-.8.5-1.4.5-1.1 0-1.9-1-1.9-2.6 0-2.2 1-3.7 2.1-5.4.9-1.4 1.3-2.2 1.3-3.7 0-2.4 1.3-4.2 3.6-4.2z"
        fill="currentColor"
      />
      <circle cx="10.4" cy="7" r="1" fill="#050608" />
      <circle cx="13.6" cy="7" r="1" fill="#050608" />
      <path d="M12 8.6 13.5 10 12 11.1 10.5 10z" fill="#050608" opacity="0.6" />
      <path
        d="M9.2 19.6c-1 1.1-2.6 1.6-3.1 2.4h12c-.5-.8-2.1-1.3-3.1-2.4z"
        fill="currentColor"
        opacity="0.55"
      />
    </>
  ),

  checkmarx: (
    <>
      <path
        d="M12 2.2 20.7 7v10L12 21.8 3.3 17V7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m8 11.8 2.9 3L16.2 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  trivy: (
    <>
      <path
        d="M12 2.4 20 5.6v6.1c0 4.4-3.3 8.4-8 9.9-4.7-1.5-8-5.5-8-9.9V5.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="11.2" cy="10.9" r="2.7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="m13.3 13 2.6 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),

  prometheus: (
    <>
      <circle cx="12" cy="12" r="9.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="13.4" width="10" height="1.8" rx="0.9" fill="currentColor" />
      <path
        d="M12 4.4c1.9 1.9 1.1 3.3.4 4.4-.7 1-1.2 2.1.3 3.3h-5c1-1.6.6-3-.1-4 1.7.2 2.5-1.3 1.8-2.5 1.2.4 2.1-.3 2.6-1.2z"
        fill="currentColor"
      />
    </>
  ),

  grafana: (
    <>
      <path
        d="M12 2.2c2.5 2.3 2.8 4.5 1.6 6.4 1.3.2 2.2-.5 2.7-1.5.9 1.6.7 3.2-.2 4.4 1-.1 1.8-.6 2.3-1.4.9 4.6-2.3 9.2-6.4 11.4-4.4-1.4-7.4-5.3-7.4-9.8 0-3.2 1.5-5.5 3.5-7.1-.3 1.5.1 2.7 1.2 3.4-.4-2.6.8-4.6 2.7-5.8z"
        fill="currentColor"
      />
      <circle cx="12" cy="13.6" r="2.4" fill="#050608" />
    </>
  ),

  argocd: (
    <>
      <circle cx="12" cy="9.4" r="5.6" fill="currentColor" />
      <circle cx="10" cy="8.6" r="1" fill="#050608" />
      <circle cx="14" cy="8.6" r="1" fill="#050608" />
      <path
        d="M7.1 13.8c-.6 2.6-1.4 4.6-2.6 6.2M12 15c0 2.6.2 4.6.7 6.4M16.9 13.8c.6 2.6 1.4 4.6 2.6 6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),

  helm: (
    <>
      <circle cx="12" cy="12" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      {WHEEL.map(({ cos, sin }, i) => (
        <g key={i}>
          <line
            x1={12 + cos * 6.4}
            y1={12 + sin * 6.4}
            x2={12 + cos * 9.1}
            y2={12 + sin * 9.1}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1={12 + cos * 2.1}
            y1={12 + sin * 2.1}
            x2={12 + cos * 6.4}
            y2={12 + sin * 6.4}
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </g>
      ))}
    </>
  ),

  python: (
    <>
      <path
        d="M11.9 2c-2.4 0-4.4.7-4.4 3v2.4h4.6v.7H5.3c-1.9 0-3.3 1.4-3.3 4.4s1.1 4.5 3 4.5h1.7v-2.8c0-2.1 1.8-3.8 3.9-3.8h4c1.7 0 3-1.4 3-3.1V5c0-1.9-1.6-3-3.5-3zm-2.5 1.8c.5 0 .9.4.9.9s-.4.9-.9.9a.9.9 0 0 1 0-1.8z"
        fill="currentColor"
      />
      <path
        d="M12.1 22c2.4 0 4.4-.7 4.4-3v-2.4h-4.6v-.7h6.8c1.9 0 3.3-1.4 3.3-4.4s-1.1-4.5-3-4.5h-1.7v2.8c0 2.1-1.8 3.8-3.9 3.8h-4c-1.7 0-3 1.4-3 3.1V19c0 1.9 1.6 3 3.5 3zm2.5-1.8a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
        fill="currentColor"
        opacity="0.55"
      />
    </>
  ),

  shield: (
    <>
      <path
        d="M12 2.4 20 5.6v6.1c0 4.4-3.3 8.4-8 9.9-4.7-1.5-8-5.5-8-9.9V5.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m8.4 11.9 2.6 2.7 4.6-5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  git: (
    <>
      <circle cx="12" cy="5.4" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18.6" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.2" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v8M12 12h4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
};


/**
 * `size` sets width/height attributes, which is what a nested <svg> inside
 * another SVG needs — CSS box sizing does not apply there and the glyph
 * would otherwise fill the whole parent viewport.
 */
export default function TechMark({ name, id, className = "", title, size }) {
  const key = id || markIdFor(name);
  const glyph = glyphs[key] || glyphs.shield;
  const label = title || techNames[key] || name;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...(size ? { width: size, height: size } : null)}
      role="img"
      aria-label={label}
      focusable="false"
    >
      <title>{label}</title>
      {glyph}
    </svg>
  );
}
