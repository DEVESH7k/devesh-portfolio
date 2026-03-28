import { socialLinks } from "../constants";

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accentPink flex items-center justify-center text-white font-bold font-outfit text-sm">
              DK
            </div>
            <div>
              <p className="text-white font-outfit font-semibold text-[16px]">
                Devesh Khatik
              </p>
              <p className="text-[12px] font-mono text-[#9488aa]">
                DevSecOps Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-bg1 border border-white/[0.08] flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              <svg className="w-[18px] h-[18px] text-[#9488aa]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-bg1 border border-white/[0.08] flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              <svg className="w-[18px] h-[18px] text-[#9488aa]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
            </a>

            <a
              href={`mailto:${socialLinks.email}`}
              className="w-10 h-10 rounded-full bg-bg1 border border-white/[0.08] flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              <svg className="w-[18px] h-[18px] text-[#9488aa]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[12px] font-mono text-[#9488aa] uppercase tracking-wider hover:text-accent transition-colors duration-300"
          >
            Back to top
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>

        {/* Removed bottom copyright section */}
      </div>
    </footer>
  );
}

export default Footer;