import TechMark from "./TechMark";

/* ──────────────────────────────────────────────────────────────
   Original architecture illustrations, one per case study. These
   are drawings of the documented stack — not screenshots, and not
   claims about systems beyond what each repository contains.
   ────────────────────────────────────────────────────────────── */

const W = 800;
const H = 500;

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#00DFA2" />
        <stop offset="1" stopColor="#55C8FF" />
      </linearGradient>
      <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#00DFA2" stopOpacity="0.65" />
        <stop offset="1" stopColor="#55C8FF" stopOpacity="0.65" />
      </linearGradient>
      <radialGradient id={`${id}-bloom`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#00DFA2" stopOpacity="0.2" />
        <stop offset="1" stopColor="#00DFA2" stopOpacity="0" />
      </radialGradient>
      <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0v32" fill="none" stroke="rgba(245,245,247,0.045)" strokeWidth="1" />
      </pattern>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 1.5 8.5 5 0 8.5z" fill="rgba(245,245,247,0.4)" />
      </marker>
    </defs>
  );
}

function Stage({ id, x, y, w = 128, h = 92, label, sub, tech, accent = false }) {
  /* Anchor the text to the bottom of the box so short nodes do not spill. */
  const labelY = y + h - (sub ? 30 : 14);
  const subY = y + h - 12;

  return (
    <g>
      {accent && (
        <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx={26} fill={`url(#${id}-bloom)`} />
      )}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        fill="rgba(245,245,247,0.035)"
        stroke={accent ? "rgba(0,223,162,0.5)" : "rgba(245,245,247,0.12)"}
        strokeWidth="1"
      />
      {tech && (
        <g transform={`translate(${x + 16} ${y + 16})`} color={accent ? "#00DFA2" : "#A1A1AA"}>
          <TechMark name={tech} size={22} />
        </g>
      )}
      <text
        x={x + 16}
        y={labelY}
        fill="#F5F5F7"
        fontSize="14"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        letterSpacing="-0.2"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + 16}
          y={subY}
          fill="#A1A1AA"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Wire({ id, d, lit = false, dashed = false }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={lit ? `url(#${id}-wire)` : "rgba(245,245,247,0.16)"}
      strokeWidth={lit ? 1.6 : 1.2}
      strokeDasharray={dashed ? "4 6" : undefined}
      markerEnd={`url(#${id}-arrow)`}
    />
  );
}

function Caption({ x, y, children, anchor = "start" }) {
  return (
    <text
      x={x}
      y={y}
      fill="#A1A1AA"
      fontSize="10.5"
      letterSpacing="1.8"
      textAnchor={anchor}
      fontFamily="'JetBrains Mono', monospace"
    >
      {children}
    </text>
  );
}

/* ── 01 · Shift-left pipeline ── */
function PipelineDiagram({ id }) {
  const row = 150;
  const xs = [40, 196, 352, 508, 664];
  return (
    <>
      <Caption x={40} y={60}>SHIFT-LEFT PIPELINE</Caption>
      <Stage id={id} x={xs[0]} y={row} w={120} label="Commit" sub="Source push" tech="Git" />
      <Stage id={id} x={xs[1]} y={row} w={120} label="SAST" sub="Checkmarx" tech="Checkmarx" accent />
      <Stage id={id} x={xs[2]} y={row} w={120} label="SCA audit" sub="OWASP deps" tech="shield" accent />
      <Stage id={id} x={xs[3]} y={row} w={120} label="Build" sub="Multi-stage" tech="Docker" />
      <Stage id={id} x={xs[4]} y={row} w={120} label="Image scan" sub="Trivy CVEs" tech="Trivy" accent />

      {xs.slice(0, -1).map((x, i) => (
        <Wire key={x} id={id} d={`M${x + 120} ${row + 46} H${xs[i + 1] - 8}`} lit={i >= 1} />
      ))}

      {/* Gate outcome */}
      <Wire id={id} d={`M${xs[4] + 60} ${row + 92} V330 H260 V${372}`} lit />
      <Stage id={id} x={200} y={372} w={120} h={76} label="Deploy" sub="AWS" tech="AWS" />

      <Wire id={id} d={`M${xs[1] + 60} ${row - 8} V96 H${xs[2] + 60} V${row - 8}`} dashed />
      <Caption x={xs[1] + 128} y={88}>FAIL → BUILD HALTED</Caption>

      <Caption x={340} y={436}>JENKINS ORCHESTRATED</Caption>
    </>
  );
}

/* ── 02 · GitOps delivery ── */
function GitopsDiagram({ id }) {
  return (
    <>
      <Caption x={40} y={60}>GITOPS DELIVERY</Caption>

      <Stage id={id} x={40} y={110} w={140} label="Jenkins" sub="Declarative CI" tech="Jenkins" />
      <Stage id={id} x={220} y={110} w={140} label="Scan gates" sub="Checkmarx · Trivy" tech="Checkmarx" accent />
      <Stage id={id} x={400} y={110} w={140} label="Registry" sub="Tagged image" tech="Docker" />
      <Stage id={id} x={580} y={110} w={140} label="Helm chart" sub="Versioned" tech="Helm" />

      <Wire id={id} d="M180 156 H212" />
      <Wire id={id} d="M360 156 H392" lit />
      <Wire id={id} d="M540 156 H572" lit />

      <Wire id={id} d="M650 202 V250 H420 V292" lit />
      <Stage id={id} x={350} y={292} w={140} label="ArgoCD" sub="Git = truth" tech="ArgoCD" accent />

      {/* Cluster */}
      <rect x={40} y={282} width={270} height={168} rx={20} fill="rgba(245,245,247,0.02)" stroke="rgba(245,245,247,0.1)" />
      <Caption x={60} y={310}>KUBERNETES · AWS EC2</Caption>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={62 + i * 82}
            y={330}
            width={66}
            height={66}
            rx={14}
            fill="rgba(245,245,247,0.04)"
            stroke="rgba(0,223,162,0.3)"
          />
          <g transform={`translate(${82 + i * 82} 350)`} color="#00DFA2">
            <TechMark name="Kubernetes" size={26} />
          </g>
        </g>
      ))}
      <Caption x={62} y={424}>REPLICA SET</Caption>

      <Wire id={id} d="M350 338 H318" lit />

      <Stage id={id} x={560} y={330} w={200} h={92} label="Prometheus + Grafana" sub="Metrics and alerting" tech="Prometheus" />
      <Wire id={id} d="M310 400 H440 V376 M490 338 H552" dashed />
    </>
  );
}

/* ── 03 · Release with approval gate ── */
function ReleaseDiagram({ id }) {
  const y = 130;
  return (
    <>
      <Caption x={40} y={60}>RELEASE WITH APPROVAL GATE</Caption>

      <Stage id={id} x={40} y={y} w={130} label="Build" sub="Jenkins" tech="Jenkins" />
      <Stage id={id} x={206} y={y} w={130} label="Test" sub="Automated" tech="Pytest" />
      <Stage id={id} x={372} y={y} w={130} label="Containerize" sub="Docker" tech="Docker" />
      <Stage id={id} x={538} y={y} w={130} label="Scan" sub="Checkmarx · Trivy" tech="Trivy" accent />

      <Wire id={id} d={`M170 ${y + 46} H198`} />
      <Wire id={id} d={`M336 ${y + 46} H364`} />
      <Wire id={id} d={`M502 ${y + 46} H530`} lit />

      {/* Approval diamond */}
      <g>
        <rect
          x={352}
          y={272}
          width={96}
          height={96}
          rx={18}
          transform="rotate(45 400 320)"
          fill="rgba(245,245,247,0.035)"
          stroke={`url(#${id}-accent)`}
          strokeOpacity="0.5"
        />
        <text
          x={400}
          y={316}
          textAnchor="middle"
          fill="#F5F5F7"
          fontSize="13"
          fontWeight="500"
          fontFamily="Inter, sans-serif"
        >
          Manual
        </text>
        <text
          x={400}
          y={334}
          textAnchor="middle"
          fill="#A1A1AA"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          approval
        </text>
      </g>

      <Wire id={id} d={`M603 ${y + 92} V240 H400 V${266}`} lit />
      <Wire id={id} d="M400 376 V398 H251 V402" lit />
      <Stage id={id} x={186} y={408} w={130} h={72} label="AWS EC2" tech="AWS" />

      <Wire id={id} d="M400 376 V398 H560 V402" dashed />
      <Caption x={496} y={424}>ZERO-DOWNTIME ROLLOUT</Caption>
    </>
  );
}

/* ── 04 · Terraform-provisioned EKS ── */
function InfraDiagram({ id }) {
  return (
    <>
      <Caption x={40} y={60}>TERRAFORM · AMAZON EKS</Caption>

      <Stage id={id} x={40} y={200} w={140} h={104} label="Terraform" sub="Modules + state" tech="Terraform" accent />
      <Wire id={id} d="M180 252 H228" lit />

      {/* VPC */}
      <rect x={236} y={104} width={520} height={340} rx={24} fill="rgba(245,245,247,0.02)" stroke="rgba(245,245,247,0.12)" />
      <Caption x={258} y={134}>VPC 10.0.0.0/16</Caption>

      {/* Public subnet */}
      <rect x={260} y={154} width={224} height={122} rx={16} fill="rgba(85,200,255,0.04)" stroke="rgba(85,200,255,0.25)" strokeDasharray="5 5" />
      <Caption x={278} y={180}>PUBLIC SUBNET</Caption>
      <Stage id={id} x={278} y={192} w={120} h={66} label="LoadBalancer" tech="AWS" />

      {/* Private subnet */}
      <rect x={260} y={296} width={224} height={122} rx={16} fill="rgba(0,223,162,0.04)" stroke="rgba(0,223,162,0.25)" strokeDasharray="5 5" />
      <Caption x={278} y={322}>PRIVATE SUBNET</Caption>
      <Stage id={id} x={278} y={334} w={120} h={66} label="Node group" tech="Kubernetes" />

      <Wire id={id} d="M338 258 V330" lit />

      {/* Control plane */}
      <Stage id={id} x={530} y={192} w={190} h={92} label="EKS control plane" sub="Managed" tech="Kubernetes" accent />
      <Wire id={id} d="M484 226 H522" />
      <Wire id={id} d="M484 366 H560 V292" />

      <Stage id={id} x={530} y={322} w={190} h={92} label="IAM roles" sub="Least privilege" tech="shield" />
      <Wire id={id} d="M110 304 V392 H250 V392" dashed />
      <Caption x={110} y={416}>PROVISIONS EVERY RESOURCE</Caption>
    </>
  );
}

const DIAGRAMS = {
  pipeline: PipelineDiagram,
  gitops: GitopsDiagram,
  release: ReleaseDiagram,
  infra: InfraDiagram,
};

export default function ProjectVisual({ variant = "pipeline", title }) {
  const Diagram = DIAGRAMS[variant] || PipelineDiagram;
  const id = `pv-${variant}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={`Architecture diagram for ${title}`}
    >
      <title>{`Architecture diagram for ${title}`}</title>
      <Defs id={id} />
      <rect width={W} height={H} fill="#0B0D12" />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} />
      <Diagram id={id} />
    </svg>
  );
}
