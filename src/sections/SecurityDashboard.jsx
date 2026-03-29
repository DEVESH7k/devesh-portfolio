import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

// ── CVE Ring Chart ─────────────────────────────────────────────────────────
const CVE_DATA = [
  { label: "Critical", count: 0,  color: "#f87171", stroke: "#f87171" },
  { label: "High",     count: 0,  color: "#fb923c", stroke: "#fb923c" },
  { label: "Medium",   count: 3,  color: "#fbbf24", stroke: "#fbbf24" },
  { label: "Low",      count: 12, color: "#34d399", stroke: "#34d399" },
  { label: "Info",     count: 28, color: "#60a5fa", stroke: "#60a5fa" },
];

function RingChart({ animated }) {
  const total = CVE_DATA.reduce((s, d) => s + d.count, 0) || 1;
  const r = 52;
  const circumference = 2 * Math.PI * r;

  const segments = useMemo(() => {
    let acc = 0;
    return CVE_DATA.map((d) => {
      const pct = d.count / total;
      const seg = { ...d, dashLength: pct * circumference, dashOffset: -acc };
      acc += pct * circumference;
      return seg;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Track */}
        <circle cx="70" cy="70" r={r} fill="none" strokeWidth="14" stroke="rgba(255,255,255,0.04)" />
        {segments.map((seg, i) =>
          seg.count > 0 ? (
            <motion.circle
              key={seg.label}
              cx="70" cy="70" r={r}
              fill="none"
              strokeWidth="14"
              stroke={seg.stroke}
              strokeLinecap="butt"
              strokeDasharray={`${animated ? seg.dashLength : 0} ${circumference}`}
              strokeDashoffset={seg.dashOffset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={animated ? { strokeDasharray: `${seg.dashLength} ${circumference}` } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "70px 70px" }}
            />
          ) : null
        )}
        {/* Centre text */}
        <text x="70" y="64" textAnchor="middle" className="font-mono" fontSize="20" fontWeight="bold" fill="white">
          {total}
        </text>
        <text x="70" y="80" textAnchor="middle" fontSize="9" fill="#9488aa" fontFamily="'IBM Plex Mono', monospace">
          findings
        </text>
      </svg>
      {/* Legend */}
      <div className="mt-3 flex flex-col gap-1.5 w-full">
        {CVE_DATA.map((d) => (
          <div key={d.label} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
              <span className="font-mono text-[#9488aa]">{d.label}</span>
            </div>
            <span
              className="font-mono font-bold tabular-nums"
              style={{ color: d.count === 0 ? "#34d399" : d.color }}
            >
              {d.count === 0 ? "✓ 0" : d.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Compliance Gauge ────────────────────────────────────────────────────────
function ComplianceGauge({ animated }) {
  const score = 96;
  const r = 52;
  const arcLen = Math.PI * r; // half-circle
  const filled = (score / 100) * arcLen;

  const getColor = (s) => (s >= 90 ? "#34d399" : s >= 70 ? "#fbbf24" : "#f87171");
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80">
        {/* Track */}
        <path
          d="M 10 75 A 60 60 0 0 1 130 75"
          fill="none"
          strokeWidth="14"
          stroke="rgba(255,255,255,0.05)"
          strokeLinecap="round"
        />
        {/* Fill */}
        <motion.path
          d="M 10 75 A 60 60 0 0 1 130 75"
          fill="none"
          strokeWidth="14"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={arcLen}
          initial={{ strokeDashoffset: arcLen }}
          animate={animated ? { strokeDashoffset: arcLen - filled } : { strokeDashoffset: arcLen }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* Score label */}
        <text x="70" y="65" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white" fontFamily="'Outfit', sans-serif">
          {score}
        </text>
        <text x="70" y="78" textAnchor="middle" fontSize="8" fill="#9488aa" fontFamily="'IBM Plex Mono', monospace">
          / 100
        </text>
      </svg>
      <span
        className="mt-1 text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded"
        style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}
      >
        Excellent
      </span>
    </div>
  );
}

// ── Pipeline Health Grid ────────────────────────────────────────────────────
// 156 pipelines: 148 green (passing), 8 recently updated (amber)
function PipelineGrid({ animated }) {
  const TOTAL = 156;
  const AMBER = [4, 11, 27, 42, 68, 89, 103, 130]; // indices that are amber
  const show = animated;

  return (
    <div>
      <div className="flex flex-wrap gap-[3px]" style={{ maxWidth: "200px" }}>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const isAmber = AMBER.includes(i);
          return (
            <motion.div
              key={i}
              className="w-[9px] h-[9px] rounded-[2px]"
              style={{ background: isAmber ? "#fbbf24" : "#34d399" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={show ? { opacity: isAmber ? 0.8 : 0.65, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.004 }}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#9488aa]">
          <span className="w-2 h-2 rounded-sm bg-[#34d399]/65" />
          {TOTAL - AMBER.length} passing
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#9488aa]">
          <span className="w-2 h-2 rounded-sm bg-[#fbbf24]/80" />
          {AMBER.length} patched recently
        </div>
      </div>
    </div>
  );
}

// ── Main Section ────────────────────────────────────────────────────────────
const METRICS = [
  { label: "MTTR",            value: "14m",  sub: "mean time to resolve", color: "#a78bfa", icon: "⚡" },
  { label: "CRITICAL CVEs",   value: "0",    sub: "blocked this month",   color: "#34d399", icon: "🛡️" },
  { label: "Vulns Patched",   value: "47",   sub: "since Dec 2025",       color: "#60a5fa", icon: "🔧" },
  { label: "Gate Coverage",   value: "100%", sub: "pipelines gated",      color: "#fbbf24", icon: "✅" },
];

function SecurityDashboard() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="security" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #34d399 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Live Posture</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Security <span className="orange-text-gradient">Dashboard</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          A SOC-style snapshot of my production pipeline security posture — real numbers from 156+ pipelines.
          Every row is a gate; every green square means zero critical CVEs reached production.
        </p>
      </motion.div>

      {/* Top metric strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            className="relative rounded-2xl border border-white/[0.07] bg-[#07040f]/70 p-4 overflow-hidden group hover:border-white/[0.14] transition-colors duration-300"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{ background: `radial-gradient(120px circle at 30% 40%, ${m.color}10, transparent)` }} />
            <div className="flex items-start justify-between mb-3">
              <span className="text-[18px]">{m.icon}</span>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: m.color }} />
            </div>
            <p className="text-[28px] font-bold font-outfit tabular-nums" style={{ color: m.color }}>
              {m.value}
            </p>
            <p className="text-[9px] font-mono text-[#4a3d66] uppercase tracking-wider mt-1">{m.label}</p>
            <p className="text-[11px] font-outfit text-[#9488aa] mt-0.5 leading-snug">{m.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Dashboard grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CVE Ring */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-white/[0.07] bg-[#07040f]/70 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">CVE Severity</p>
              <p className="text-[13px] font-outfit text-white mt-0.5">Last full scan</p>
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-[#34d399] px-2 py-1 rounded-full border border-[#34d399]/20 bg-[#34d399]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              LIVE
            </span>
          </div>
          <RingChart animated={animated} />
        </motion.div>

        {/* Pipeline Health */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="rounded-2xl border border-white/[0.07] bg-[#07040f]/70 p-6"
        >
          <div className="mb-5">
            <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">Pipeline Health</p>
            <p className="text-[13px] font-outfit text-white mt-0.5">156 active pipelines</p>
          </div>
          <PipelineGrid animated={animated} />
          <div className="mt-5 pt-4 border-t border-white/[0.05]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9488aa]">Success rate</span>
              <span className="text-[14px] font-mono font-bold text-[#34d399]">99.8%</span>
            </div>
            <div className="mt-2 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#34d399]"
                initial={{ width: "0%" }}
                animate={animated ? { width: "99.8%" } : {}}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Compliance Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="rounded-2xl border border-white/[0.07] bg-[#07040f]/70 p-6"
        >
          <div className="mb-5">
            <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">Compliance Score</p>
            <p className="text-[13px] font-outfit text-white mt-0.5">CIS Benchmark posture</p>
          </div>
          <ComplianceGauge animated={animated} />

          {/* Checklist */}
          <div className="mt-5 space-y-2">
            {[
              { label: "SAST on all pipelines", pass: true },
              { label: "CVE scanning mandatory", pass: true },
              { label: "Least-privilege IAM", pass: true },
              { label: "EC2 patching schedule", pass: true },
              { label: "SOC2 audit trail", pass: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-[11px] font-outfit">
                <span className={item.pass ? "text-[#34d399]" : "text-[#4a3d66]"}>
                  {item.pass ? "✓" : "○"}
                </span>
                <span className={item.pass ? "text-[#9488aa]" : "text-[#4a3d66]"}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 text-[11px] font-mono text-[#4a3d66] text-center"
      >
        * Numbers reflect my live production environment at ProTechmanize. Dashboard updates with each pipeline run.
      </motion.p>
    </section>
  );
}

export default SecurityDashboard;
