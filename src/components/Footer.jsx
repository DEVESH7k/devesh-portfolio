import { socialLinks } from "../constants";

export default function Footer() {
  const socials = [
    {
      name: "GitHub",
      url: socialLinks.github,
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: socialLinks.linkedin,
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "Medium",
      url: socialLinks.medium,
      icon: (
        <img
          src="/medium-logo.png"
          alt="Medium"
          className="w-5 h-5 object-contain"
        />
      ),
    },
  ];

  return (
    <footer className="w-full py-8 px-6 text-center flex flex-col items-center justify-center">
      {/* Mobile Social Links (Visible only on small screens where vertical rails are hidden) */}
      <div className="flex md:hidden items-center gap-6 mb-6 text-slate">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} Profile`}
            className="hover:text-teal transition-colors p-2"
          >
            {s.icon}
          </a>
        ))}
      </div>

      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs text-slate hover:text-teal transition-colors p-2 inline-block focus-visible:text-teal"
      >
        <div>Designed &amp; Built by Devesh Khatik</div>
      </a>
    </footer>
  );
}
