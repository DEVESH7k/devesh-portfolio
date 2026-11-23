/* Shared line icons. Sized by the consumer via className. */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function GithubIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function MediumIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="6.4" cy="12" rx="6.1" ry="6.9" fill="currentColor" />
      <ellipse cx="16.6" cy="12" rx="3" ry="6.5" fill="currentColor" />
      <ellipse cx="22.1" cy="12" rx="1.1" ry="5.8" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.3 5.3a2 2 0 0 0 2.4 0L20.5 7" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </svg>
  );
}

export function ExternalIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
    </svg>
  );
}

export function DownloadIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4.5 17.5v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1" />
    </svg>
  );
}
