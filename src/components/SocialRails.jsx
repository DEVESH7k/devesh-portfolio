import { socialLinks } from "../constants";

export default function SocialRails() {
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
    <>
      {/* Left Social Rail (fixed at left: 40px / 20px, width: 40px) */}
      <div
        className="fixed bottom-0 left-5 lg:left-10 z-40 hidden md:flex flex-col items-center w-10 text-slate-light"
        aria-label="Social Links"
      >
        <ul className="flex flex-col items-center gap-2 list-none m-0 p-0">
          {socials.map((item) => (
            <li key={item.name} className="m-0">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} Profile`}
                className="p-2.5 inline-block text-slate-light hover:text-teal hover:-translate-y-1 transition-all duration-200 focus-visible:text-teal focus-visible:outline-none"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
        <div className="w-[1px] h-[90px] bg-slate-light mt-5" aria-hidden="true" />
      </div>

      {/* Right Email Rail (fixed at right: 40px / 20px, width: 40px) */}
      <div
        className="fixed bottom-0 right-5 lg:right-10 z-40 hidden md:flex flex-col items-center w-10 text-slate-light"
        aria-label="Email Link"
      >
        <div className="p-2.5">
          <a
            href={`mailto:${socialLinks.email}`}
            className="font-mono text-xs text-slate-light hover:text-teal hover:-translate-y-1 transition-all duration-200 tracking-[0.15em] [writing-mode:vertical-rl] focus-visible:text-teal focus-visible:outline-none"
          >
            {socialLinks.email}
          </a>
        </div>
        <div className="w-[1px] h-[90px] bg-slate-light mt-5" aria-hidden="true" />
      </div>
    </>
  );
}
