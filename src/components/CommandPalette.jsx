import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "../constants";

const COMMANDS = [
  // Navigate
  { id: "about",           group: "Navigate", label: "About Me",              icon: "👤", href: "#about",          action: "scroll" },
  { id: "skills",          group: "Navigate", label: "Tech Stack",            icon: "⚙️", href: "#skills",         action: "scroll" },
  { id: "experience",      group: "Navigate", label: "Experience",            icon: "💼", href: "#experience",     action: "scroll" },
  { id: "projects",        group: "Navigate", label: "Featured Projects",     icon: "🚀", href: "#projects",       action: "scroll" },
  { id: "architecture",    group: "Navigate", label: "Architecture Diagrams", icon: "🏗️", href: "#architecture",   action: "scroll" },
  { id: "security",        group: "Navigate", label: "Security Dashboard",    icon: "🛡️", href: "#security",       action: "scroll" },
  { id: "certifications",  group: "Navigate", label: "Certifications",        icon: "🏆", href: "#certifications", action: "scroll" },
  { id: "snippets",        group: "Navigate", label: "Code Snippets",         icon: "📋", href: "#snippets",       action: "scroll" },
  { id: "writing",         group: "Navigate", label: "30-Day Writing",        icon: "✍️", href: "#writing",        action: "scroll" },
  { id: "contact",         group: "Navigate", label: "Contact Me",            icon: "✉️", href: "#contact",        action: "scroll" },
  // Links
  { id: "github",    group: "Links", label: "GitHub Profile",    icon: "⬡", href: socialLinks.github,   action: "external" },
  { id: "linkedin",  group: "Links", label: "LinkedIn Profile",  icon: "in", href: socialLinks.linkedin, action: "external" },
  { id: "resume",    group: "Links", label: "Download Resume",   icon: "📄", href: socialLinks.resume,   action: "external" },
  { id: "email",     group: "Links", label: "Send an Email",     icon: "📧", href: `mailto:${socialLinks.email}`, action: "external" },
];

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/25 text-accent rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = COMMANDS.filter(
    (c) =>
      query === "" ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.group.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  const flatFiltered = filtered;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const execute = useCallback(
    (cmd) => {
      onClose();
      if (cmd.action === "scroll") {
        setTimeout(() => {
          const el = document.querySelector(cmd.href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        window.open(cmd.href, cmd.action === "external" ? "_blank" : "_self", "noopener noreferrer");
      }
    },
    [onClose]
  );

  const handleKey = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, flatFiltered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatFiltered[selected]) execute(flatFiltered[selected]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [flatFiltered, selected, execute, onClose]
  );

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-[560px] px-4"
          >
            <div className="rounded-2xl border border-white/[0.1] bg-[#08050f]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07]">
                <svg className="w-4 h-4 text-[#9488aa] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Search sections, links, actions…"
                  className="flex-1 bg-transparent text-[14px] font-outfit text-white placeholder-[#4a3d66] outline-none"
                />
                <kbd className="text-[10px] font-mono text-[#4a3d66] border border-white/[0.07] rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[360px] overflow-y-auto py-2"
                style={{ scrollbarWidth: "none" }}
              >
                {flatFiltered.length === 0 ? (
                  <p className="px-5 py-8 text-center text-[13px] font-outfit text-[#4a3d66]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  Object.entries(grouped).map(([group, items]) => (
                    <div key={group}>
                      <p className="px-5 pt-3 pb-1 text-[10px] font-mono text-[#4a3d66] uppercase tracking-[0.18em]">
                        {group}
                      </p>
                      {items.map((cmd) => {
                        const globalIdx = flatFiltered.indexOf(cmd);
                        const isActive = globalIdx === selected;
                        return (
                          <button
                            key={cmd.id}
                            data-idx={globalIdx}
                            onMouseEnter={() => setSelected(globalIdx)}
                            onClick={() => execute(cmd)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors duration-100"
                            style={{
                              background: isActive ? "rgba(167,139,250,0.1)" : "transparent",
                              borderLeft: isActive ? "2px solid rgba(167,139,250,0.5)" : "2px solid transparent",
                            }}
                          >
                            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px] flex-shrink-0"
                              style={{ background: isActive ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.04)" }}>
                              {cmd.icon}
                            </span>
                            <span className={`flex-1 text-left text-[13px] font-outfit ${isActive ? "text-white" : "text-[#b4aec8]"}`}>
                              {highlight(cmd.label, query)}
                            </span>
                            {cmd.action === "external" && (
                              <svg className="w-3 h-3 text-[#4a3d66]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                            {isActive && cmd.action === "scroll" && (
                              <kbd className="text-[9px] font-mono text-accent/60 border border-accent/20 rounded px-1.5 py-0.5">↵</kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-white/[0.05] flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#4a3d66]">
                  <kbd className="border border-white/[0.07] rounded px-1.5 py-0.5">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#4a3d66]">
                  <kbd className="border border-white/[0.07] rounded px-1.5 py-0.5">↵</kbd> open
                </span>
                <span className="ml-auto text-[10px] font-mono text-[#4a3d66]">
                  {flatFiltered.length} result{flatFiltered.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
