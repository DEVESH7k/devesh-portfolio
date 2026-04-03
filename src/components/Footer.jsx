import { socialLinks } from "../constants";

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 14" fill="none">
    <path d="M7.088 0.164V1.746c0 .09.039.176.107.237L12.123 6.258H1.125A.125.125 0 001 6.414v1.172c0 .086.07.156.125.156H12.123L7.195 12.018a.172.172 0 00-.107.236v1.582c0 .133.158.205.258.117l7.47-6.482a1.03 1.03 0 000-1.542L7.346.047c-.1-.088-.258-.016-.258.117z" fill="currentColor"/>
  </svg>
);

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-primary">

      {/* Main footer content */}
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center border border-accent/50">
                <span className="text-accent font-bold text-xs" style={{ fontFamily: "'Chakra Petch', monospace" }}>DK</span>
              </div>
              <span className="text-white/80 text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                Devesh Khatik
              </span>
            </div>
            <p className="text-[12px] text-white/30 leading-relaxed max-w-[220px]" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              DevSecOps Engineer securing cloud-native pipelines at scale. Mumbai, India.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">Open to opportunities</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-6">/ Navigation</p>
            <div className="flex flex-col gap-3">
              {[
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] text-white/40 hover:text-accent transition-all duration-200 uppercase tracking-wider flex items-center gap-2 group hover:-translate-y-0.5"
                  style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                >
                  <span className="w-0 group-hover:w-3 h-[1px] bg-accent transition-all duration-300" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-6">/ Connect</p>
            <div className="flex flex-col gap-4">
              {[
                { href: socialLinks.github, label: "GitHub" },
                { href: socialLinks.linkedin, label: "LinkedIn" },
                { href: socialLinks.medium, label: "Medium" },
                { href: `mailto:${socialLinks.email}`, label: "Email" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className="text-[13px] text-white/40 hover:text-accent transition-all duration-200 uppercase tracking-wider flex items-center justify-between border-b border-white/[0.04] pb-3 group hover:-translate-y-0.5"
                  style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                >
                  {label}
                  <span className="text-white/20 group-hover:text-accent transition-colors">
                    <ArrowIcon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-white/20 uppercase tracking-wider">
            © {new Date().getFullYear()} Devesh Khatik — All rights reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[11px] font-mono text-white/20 hover:text-accent transition-colors uppercase tracking-wider flex items-center gap-2 group"
          >
            Back to top
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
