import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { architectureDiagrams } from "../constants";

// ── Custom pipeline node ──────────────────────────────────────────────────
function PipelineNode({ data }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center text-center cursor-default select-none"
      style={{ width: 100 }}
    >
      <Handle type="target" position={Position.Left} style={{ background: `${data.color}60`, border: "none", width: 8, height: 8 }} />

      <div
        className="w-full rounded-xl border p-3 flex flex-col items-center gap-2 transition-all duration-300"
        style={{
          background: hovered ? `${data.color}14` : "#0a0618",
          borderColor: hovered ? `${data.color}70` : "rgba(255,255,255,0.08)",
          boxShadow: hovered ? `0 0 24px ${data.color}20` : "none",
        }}
      >
        {/* Index badge */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border"
          style={{ background: `${data.color}20`, borderColor: `${data.color}40`, color: data.color }}
        >
          {data.index + 1}
        </div>

        <span className="text-[22px] mt-1">{data.icon}</span>
        <p className="text-[11px] font-outfit font-semibold text-white leading-tight">{data.label}</p>
        <span
          className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider"
          style={{ background: `${data.color}15`, color: data.color, border: `1px solid ${data.color}25` }}
        >
          {data.tool}
        </span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[190px] rounded-xl border border-white/[0.08] bg-[#0f0a1e]/95 backdrop-blur-sm p-3.5 shadow-xl pointer-events-none"
          >
            <p className="text-[11px] font-outfit text-white leading-relaxed">{data.detail}</p>
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-l border-t border-white/[0.08] rounded-sm bg-[#0f0a1e]" />
          </motion.div>
        )}
      </AnimatePresence>

      <Handle type="source" position={Position.Right} style={{ background: `${data.color}60`, border: "none", width: 8, height: 8 }} />
    </div>
  );
}

const nodeTypes = { pipeline: PipelineNode };

// ── Build nodes + edges from a diagram config ─────────────────────────────
function buildGraph(diagram) {
  const SPACING_X = 180;
  const SPACING_Y = 120;
  const cols = Math.min(diagram.stages.length, 4);

  const nodes = diagram.stages.map((stage, i) => ({
    id: `${diagram.id}-${i}`,
    type: "pipeline",
    position: {
      x: (i % cols) * SPACING_X,
      y: Math.floor(i / cols) * SPACING_Y,
    },
    data: {
      ...stage,
      label: stage.name,
      index: i,
    },
  }));

  const edges = diagram.stages.slice(0, -1).map((stage, i) => ({
    id: `e-${diagram.id}-${i}`,
    source: `${diagram.id}-${i}`,
    target: `${diagram.id}-${i + 1}`,
    type: "smoothstep",
    animated: true,
    style: { stroke: `${stage.color}50`, strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: `${stage.color}80`,
      width: 16,
      height: 16,
    },
  }));

  return { nodes, edges };
}

// ── Flow diagram view ─────────────────────────────────────────────────────
function FlowDiagram({ diagram }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildGraph(diagram),
    [diagram]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-[#07040f]/60 overflow-hidden"
      style={{ height: diagram.stages.length > 4 ? 340 : 220 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.35 }}
        minZoom={0.5}
        maxZoom={2}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      >
        <Background
          color="rgba(167,139,250,0.06)"
          gap={20}
          size={1}
          variant="dots"
        />
        <Controls
          showInteractive={false}
          style={{
            background: "rgba(10,6,24,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
          }}
        />
      </ReactFlow>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────
function Architecture() {
  const [activeId, setActiveId] = useState("cicd");
  const active = architectureDiagrams.find((d) => d.id === activeId);

  return (
    <section id="architecture" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">System Design</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Architecture <span className="orange-text-gradient">Diagrams</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Interactive pipeline diagrams — drag, zoom, and explore the systems I design.
          Hover each node for detail.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        {architectureDiagrams.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveId(d.id)}
            className="px-5 py-2.5 rounded-xl text-[13px] font-outfit font-medium transition-all duration-300"
            style={{
              background: activeId === d.id
                ? "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(232,121,249,0.08))"
                : "transparent",
              border: `1px solid ${activeId === d.id ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: activeId === d.id ? "#f5f0ff" : "#9488aa",
            }}
          >
            {d.title}
          </button>
        ))}
      </motion.div>

      {/* Hint */}
      <p className="mt-3 text-[11px] font-mono text-[#4a3d66] flex items-center gap-2">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
        Drag to pan · scroll to zoom · hover nodes for details
      </p>

      {/* Flow diagram */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <div className="mb-4">
            <h3 className="text-[18px] font-outfit font-bold text-white">{active.title}</h3>
            <p className="text-[13px] font-outfit font-light text-[#9488aa] mt-0.5">{active.subtitle}</p>
          </div>

          <FlowDiagram diagram={active} />

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#9488aa]">
              <span className="w-6 h-[2px] bg-accent/40 inline-block" />
              Automated handoff
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#9488aa]">
              <span className="w-4 h-4 rounded border border-accent/30 bg-accent/10 inline-block" />
              Stage node (hover for detail)
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#9488aa]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              Active in production
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default Architecture;
