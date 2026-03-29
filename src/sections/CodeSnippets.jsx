import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Token types → colours ──────────────────────────────────────────────────
const T = {
  kw:      "#c084fc", // keyword / directive
  fn:      "#60a5fa", // function / stage name
  str:     "#86efac", // string literal
  num:     "#fbbf24", // number
  cmt:     "#4a3d66", // comment
  var:     "#fb923c", // variable / interpolation
  op:      "#e879f9", // operator / punctuation accent
  def:     "#e2e8f0", // default / plain text
  ok:      "#34d399", // success / zero
  err:     "#f87171", // error / critical
};

// ── Snippet definitions ─────────────────────────────────────────────────────
// Each line is an array of [text, colorHex] pairs
const SNIPPETS = {
  Jenkinsfile: {
    lang: "groovy",
    icon: "🔧",
    desc: "Declarative pipeline with SonarQube SAST + Trivy CVE gates",
    lines: [
      [[`pipeline `, T.kw], [`{`, T.def]],
      [[`  agent `, T.kw], [`any`, T.fn]],
      [[`  environment `, T.kw], [`{`, T.def]],
      [[`    IMAGE `, T.def], [`= `, T.def], [`"devesh/netflix:\${BUILD_NUMBER}"`, T.str]],
      [[`  }`, T.def]],
      [[``]],
      [[`  stages `, T.kw], [`{`, T.def]],
      [[`    stage(`, T.def], [`'SonarQube SAST'`, T.str], [`) {`, T.def]],
      [[`      steps {`, T.def]],
      [[`        withSonarQubeEnv(`, T.fn], [`'sonar-server'`, T.str], [`) {`, T.def]],
      [[`          sh `, T.kw], [`'mvn sonar:sonar -Dsonar.qualitygate.wait=true'`, T.str]],
      [[`        }`, T.def]],
      [[`      }`, T.def]],
      [[`    }`, T.def]],
      [[``]],
      [[`    stage(`, T.def], [`'Docker Build'`, T.str], [`) {`, T.def]],
      [[`      steps {`, T.def]],
      [[`        sh `, T.kw], [`"docker build -t \${IMAGE} ."`, T.str]],
      [[`      }`, T.def]],
      [[`    }`, T.def]],
      [[``]],
      [[`    stage(`, T.def], [`'Trivy CVE Scan'`, T.str], [`) {`, T.def]],
      [[`      steps {`, T.def]],
      [[`        sh `, T.kw], [`"""`, T.str]],
      [[`          trivy image `, T.fn]],
      [[`            --severity `, T.kw], [`CRITICAL,HIGH `, T.err]],
      [[`            --exit-code `, T.kw], [`1 `, T.num]],
      [[`            --no-progress \${IMAGE}`, T.var]],
      [[`        """`, T.str]],
      [[`      }`, T.def]],
      [[`    }`, T.def]],
      [[``]],
      [[`    stage(`, T.def], [`'EKS Deploy'`, T.str], [`) {`, T.def]],
      [[`      steps {`, T.def]],
      [[`        sh `, T.kw], [`'kubectl rollout restart deploy/netflix -n prod'`, T.str]],
      [[`        sh `, T.kw], [`'kubectl rollout status deploy/netflix -n prod'`, T.str]],
      [[`      }`, T.def]],
      [[`    }`, T.def]],
      [[`  }`, T.def]],
      [[``]],
      [[`  post `, T.kw], [`{`, T.def]],
      [[`    always `, T.kw], [`{`, T.def]],
      [[`      // Archive Trivy report for audit trail`, T.cmt]],
      [[`      archiveArtifacts `, T.fn], [`artifacts: `, T.def], [`'trivy-*.json'`, T.str]],
      [[`    }`, T.def]],
      [[`  }`, T.def]],
      [[`}`, T.def]],
    ],
  },
  Dockerfile: {
    lang: "dockerfile",
    icon: "🐳",
    desc: "Multi-stage hardened image — minimal attack surface, non-root user",
    lines: [
      [[`# ── Stage 1: Build ───────────────────────────────`, T.cmt]],
      [[`FROM `, T.kw], [`node:20-alpine `, T.fn], [`AS `, T.kw], [`builder`, T.fn]],
      [[``]],
      [[`WORKDIR `, T.kw], [`/app`, T.str]],
      [[``]],
      [[`# Copy dependency manifests first (layer cache)`, T.cmt]],
      [[`COPY `, T.kw], [`package*.json ./`, T.def]],
      [[`RUN `, T.kw], [`npm ci --omit=dev`, T.fn]],
      [[``]],
      [[`COPY `, T.kw], [`. .`, T.def]],
      [[`RUN `, T.kw], [`npm run build`, T.fn]],
      [[``]],
      [[`# ── Stage 2: Production ─────────────────────────`, T.cmt]],
      [[`FROM `, T.kw], [`node:20-alpine`, T.fn]],
      [[``]],
      [[`# Security: non-root user`, T.cmt]],
      [[`RUN `, T.kw], [`addgroup -S appgroup && adduser -S appuser -G appgroup`, T.fn]],
      [[``]],
      [[`WORKDIR `, T.kw], [`/app`, T.str]],
      [[`COPY `, T.kw], [`--from=builder /app/dist ./dist`, T.def]],
      [[`COPY `, T.kw], [`--from=builder /app/node_modules ./node_modules`, T.def]],
      [[``]],
      [[`# Security: drop all capabilities`, T.cmt]],
      [[`USER `, T.kw], [`appuser`, T.fn]],
      [[``]],
      [[`# Health check`, T.cmt]],
      [[`HEALTHCHECK `, T.kw], [`--interval=`, T.def], [`30s `, T.num], [`--timeout=`, T.def], [`5s `, T.num], [`\\`, T.def]],
      [[`  CMD `, T.kw], [`wget -qO- http://localhost:3000/health || exit 1`, T.str]],
      [[``]],
      [[`EXPOSE `, T.kw], [`3000`, T.num]],
      [[`CMD `, T.kw], [`["node"`, T.str], [`, `, T.def], [`"dist/server.js"]`, T.str]],
    ],
  },
  "trivy.yaml": {
    lang: "yaml",
    icon: "🛡️",
    desc: "Trivy config — exit-code 1 on CRITICAL/HIGH, offline DB, report formats",
    lines: [
      [[`# trivy.yaml — enforce zero critical/high policy`, T.cmt]],
      [[`scan:`, T.fn]],
      [[`  severity:`, T.def]],
      [[`    - `, T.def], [`CRITICAL`, T.err]],
      [[`    - `, T.def], [`HIGH`, T.var]],
      [[``]],
      [[`exit-code: `, T.fn], [`1`, T.num],  [`  # fail pipeline on findings`, T.cmt]],
      [[``]],
      [[`vulnerability:`, T.fn]],
      [[`  type:`, T.def]],
      [[`    - `, T.def], [`os`, T.str]],
      [[`    - `, T.def], [`library`, T.str]],
      [[``]],
      [[`format: `, T.fn], [`json`, T.str]],
      [[`output: `, T.fn], [`trivy-report.json`, T.str]],
      [[``]],
      [[`cache:`, T.fn]],
      [[`  dir: `, T.def], [`/tmp/.trivy-cache`, T.str]],
      [[`  ttl: `, T.def], [`24h`, T.num]],
      [[``]],
      [[`# Ignore known false-positives / accepted risks`, T.cmt]],
      [[`ignore-unfixed: `, T.fn], [`false`, T.err]],
      [[``]],
      [[`# Table output for CI logs`, T.cmt]],
      [[`table:`, T.fn]],
      [[`  show-suppressed: `, T.def], [`false`, T.num]],
    ],
  },
};

// ── Syntax-rendered line ───────────────────────────────────────────────────
function CodeLine({ tokens, lineNum }) {
  if (!tokens || tokens.length === 0) {
    return (
      <div className="flex">
        <span className="select-none w-10 text-right pr-4 text-[#2d2440] text-[12px] font-mono flex-shrink-0">{lineNum}</span>
        <span className="text-[12px] font-mono leading-[1.7]">&nbsp;</span>
      </div>
    );
  }
  return (
    <div className="flex group hover:bg-white/[0.02] rounded-sm">
      <span className="select-none w-10 text-right pr-4 text-[#2d2440] text-[12px] font-mono flex-shrink-0 leading-[1.7]">
        {lineNum}
      </span>
      <span className="text-[12px] font-mono leading-[1.7] flex-1 whitespace-pre">
        {tokens.map(([text, color], i) => (
          <span key={i} style={{ color: color || T.def }}>{text}</span>
        ))}
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
function CodeSnippets() {
  const [activeTab, setActiveTab] = useState("Jenkinsfile");
  const [copied, setCopied] = useState(false);

  const snippet = SNIPPETS[activeTab];

  const getRawCode = useCallback(() => {
    return snippet.lines
      .map((line) => line.map(([text]) => text).join(""))
      .join("\n");
  }, [snippet]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(getRawCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [getRawCode]);

  return (
    <section id="snippets" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-[0.035]"
        style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Engineering Depth</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Code <span className="orange-text-gradient">Snippets</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Real configs from my production pipelines — the exact Jenkinsfile, Dockerfile, and Trivy policy that
          keep 156+ builds clean. No boilerplate. No lorem ipsum.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10"
      >
        {/* Editor chrome */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#07040f] overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-[11px] font-mono text-[#4a3d66]">devesh/netflix-devsecops</span>
          </div>

          {/* Tabs + copy */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05] bg-white/[0.01]">
            <div className="flex items-center gap-0">
              {Object.keys(SNIPPETS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-mono transition-all duration-200 border-b-2"
                  style={{
                    color: activeTab === tab ? "#f5f0ff" : "#4a3d66",
                    borderBottomColor: activeTab === tab ? "#a78bfa" : "transparent",
                    background: activeTab === tab ? "rgba(167,139,250,0.06)" : "transparent",
                  }}
                >
                  <span>{SNIPPETS[tab].icon}</span>
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all duration-200"
              style={{
                background: copied ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.04)",
                color: copied ? "#34d399" : "#9488aa",
                border: `1px solid ${copied ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {copied ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {/* File description bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-5 py-2.5 border-b border-white/[0.04] flex items-center gap-3"
            >
              <span className="text-[10px] font-mono text-[#4a3d66] uppercase tracking-wider">
                {snippet.lang}
              </span>
              <span className="text-[#2d2440]">·</span>
              <span className="text-[12px] font-outfit font-light text-[#9488aa]">{snippet.desc}</span>
            </motion.div>
          </AnimatePresence>

          {/* Code body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="p-5 overflow-x-auto"
              style={{ maxHeight: "440px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#2d2440 transparent" }}
            >
              {snippet.lines.map((tokens, i) => (
                <CodeLine key={i} tokens={tokens} lineNum={i + 1} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#2d2440]">
              {snippet.lines.length} lines · {snippet.lang}
            </span>
            <a
              href="https://github.com/DEVESH7k/netflix-devsecops-pipeline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-[#4a3d66] hover:text-accent transition-colors duration-200 flex items-center gap-1"
            >
              view full repo
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CodeSnippets;
