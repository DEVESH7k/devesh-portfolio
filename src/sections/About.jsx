import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useCountUp from "../hooks/useCountUp";

// ── GitHub stats fetch ────────────────────────────────────────────────────
function useGitHubStats(username) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((user) => {
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
          .then((r) => r.json())
          .then((repos) => {
            if (!Array.isArray(repos)) return;
            const langCount = {};
            repos.forEach((r) => {
              if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
            });
            const topLangs = Object.entries(langCount)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([lang]) => lang);
            const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
            setStats({
              repos: user.public_repos || 0,
              followers: user.followers || 0,
              stars,
              topLangs,
              updatedAt: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
            });
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [username]);

  return stats;
}

// ── Bento card variants ───────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { type: "spring", duration: 0.9 } },
};

const langColors = {
  Python:     "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HCL:        "#7B42BC",
  Dockerfile: "#2496ED",
  Shell:      "#4EAA25",
  Groovy:     "#4298B8",
  Go:         "#00ADD8",
  HTML:       "#E34F26",
  CSS:        "#1572B6",
};

function StatBentoCard({ value, label, icon, color }) {
  const isSpecial = value === "24/7";
  const { ref, displayValue } = useCountUp(value, 1800, true);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className="group relative rounded-2xl border border-white/[0.07] bg-[#07040f]/80 p-5 flex flex-col gap-2 overflow-hidden hover:border-white/[0.14] transition-colors duration-300"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(120px circle at 30% 40%, ${color}12, transparent)` }} />
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px]"
        style={{ background: `${color}15`, border: `1px solid ${color}20` }}>
        {icon}
      </div>
      <p className="text-[26px] font-bold font-outfit text-white leading-none tabular-nums" style={{ color }}>
        {isSpecial ? "24/7" : displayValue}
      </p>
      <p className="text-[10px] font-mono text-[#9488aa] uppercase tracking-wider leading-tight">{label}</p>
    </motion.div>
  );
}

function GitHubBentoCard({ stats }) {
  return (
    <motion.a
      variants={cardVariants}
      href="https://github.com/DEVESH7k"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl border border-white/[0.07] bg-[#07040f]/80 p-5 flex flex-col gap-3 overflow-hidden hover:border-accent/30 transition-colors duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(150px circle at 50% 30%, rgba(167,139,250,0.08), transparent)" }} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#9488aa]" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span className="text-[11px] font-mono text-[#9488aa]">DEVESH7k</span>
        </div>
        {stats && (
          <span className="text-[9px] font-mono text-[#4a3d66]">
            updated {stats.updatedAt}
          </span>
        )}
      </div>

      {stats ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: stats.repos,     l: "repos"  },
              { v: stats.stars,     l: "stars"  },
              { v: stats.followers, l: "followers" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-[18px] font-bold font-outfit text-white tabular-nums">{v}</p>
                <p className="text-[9px] font-mono text-[#4a3d66] uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/[0.05]">
            <p className="text-[9px] font-mono text-[#4a3d66] uppercase tracking-wider mb-2">Top languages</p>
            <div className="flex flex-wrap gap-1.5">
              {stats.topLangs.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 rounded text-[9px] font-mono"
                  style={{
                    color: langColors[lang] || "#9488aa",
                    background: `${langColors[lang] || "#9488aa"}15`,
                    border: `1px solid ${langColors[lang] || "#9488aa"}25`,
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#4a3d66]">
          <div className="w-3 h-3 border border-[#4a3d66] border-t-accent rounded-full animate-spin" />
          Loading stats…
        </div>
      )}
    </motion.a>
  );
}

// ── Main About ─────────────────────────────────────────────────────────────
export default function About() {
  const ghStats = useGitHubStats("DEVESH7k");

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Introduction</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          About <span className="orange-text-gradient">Me</span>
        </h2>
      </motion.div>

      {/* ── Bento Grid ── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4"
      >
        {/* ── Bio Card (col-span-2) ── */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-2 relative rounded-2xl border border-white/[0.07] bg-[#07040f]/80 p-7 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-[0.05] blur-3xl"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accentPink flex items-center justify-center text-white font-bold font-outfit text-lg flex-shrink-0">
              DK
            </div>
            <div>
              <p className="text-[17px] font-outfit font-semibold text-white">Devesh Khatik</p>
              <p className="text-[12px] font-mono text-[#9488aa] mt-0.5">DevSecOps Engineer · Mumbai, India</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/25 text-[10px] font-mono text-green-400 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to work
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-[#9488aa] text-[15px] leading-[1.85] font-outfit font-light">
              I own the security and reliability of{" "}
              <span className="text-accent font-medium">156+ CI/CD pipelines</span> at ProTechmanize,
              spanning AWS CodePipeline, Azure DevOps, and Jenkins — with zero CRITICAL CVEs reaching
              production since I integrated the SAST and CVE scanning gates.
            </p>
            <p className="text-[#9488aa] text-[15px] leading-[1.85] font-outfit font-light">
              Before this, I spent 1+ years at{" "}
              <span className="text-accent font-medium">HERE Technologies</span> on global mapping
              datasets — sharpening data instincts and AWS infrastructure foundations at scale.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["AWS", "Kubernetes", "Jenkins", "SonarQube", "Trivy", "Terraform", "Docker"].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-accent border border-accent/15 bg-accent/5">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Location + Status Card ── */}
        <motion.div
          variants={cardVariants}
          className="relative rounded-2xl border border-white/[0.07] bg-[#07040f]/80 p-5 flex flex-col gap-4 overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <span className="text-[28px]">📍</span>
            <div>
              <p className="text-[14px] font-outfit font-semibold text-white">Mumbai, India</p>
              <p className="text-[11px] font-mono text-[#9488aa]">UTC+5:30</p>
            </div>
          </div>
          <div className="rounded-xl border border-accent/15 bg-accent/[0.04] p-4 flex-1">
            <p className="text-[10px] font-mono text-accent uppercase tracking-[0.18em] mb-3">Core Principles</p>
            <div className="space-y-3">
              {[
                { icon: "🛡️", t: "Security by Default",  d: "SAST + CVE scanning — non-negotiable gates" },
                { icon: "⚡", t: "Automate Everything",   d: "If I do it twice, I script it" },
                { icon: "📢", t: "Build in Public",       d: "30-day challenge, open repos, learning out loud" },
              ].map((p) => (
                <div key={p.t} className="flex items-start gap-3">
                  <span className="text-[14px] mt-0.5 flex-shrink-0">{p.icon}</span>
                  <div>
                    <p className="text-[12px] font-outfit font-semibold text-white">{p.t}</p>
                    <p className="text-[11px] font-outfit font-light text-[#9488aa] leading-snug">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <StatBentoCard value="156+" label="CI/CD Pipelines"       icon="⚙️" color="#a78bfa" delay={0.2} />
        <StatBentoCard value="50+"  label="Cloud Environments"    icon="☁️" color="#60a5fa" delay={0.28} />

        {/* ── Currently Studying card ── */}
        <motion.div
          variants={cardVariants}
          className="relative rounded-2xl border border-white/[0.07] bg-[#07040f]/80 p-5 flex items-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(120px circle at 20% 50%, rgba(52,211,153,0.15), transparent)" }} />
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <div>
            <p className="text-[10px] font-mono text-[#9488aa] uppercase tracking-wider">Currently studying</p>
            <p className="text-[13px] font-outfit font-semibold text-white mt-0.5">
              AWS Solutions Architect Associate
            </p>
            <div className="mt-2 h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "35%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <p className="text-[9px] font-mono text-[#4a3d66] mt-1">35% · Target Q2 2026</p>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <StatBentoCard value="24/7"  label="On-Call & Incident Ops" icon="🔥" color="#f87171" delay={0.36} />

        {/* ── GitHub Stats ── */}
        <GitHubBentoCard stats={ghStats} />

        {/* ── Community stat ── */}
        <StatBentoCard value="3500+" label="LinkedIn Community"   icon="🤝" color="#34d399" delay={0.44} />
      </motion.div>
    </section>
  );
}
