import { navLinks, socialLinks } from "../constants";
import { DownloadIcon, GithubIcon, LinkedinIcon, MediumIcon } from "./Icons";

const socials = [
  { name: "GitHub", url: socialLinks.github, Icon: GithubIcon },
  { name: "LinkedIn", url: socialLinks.linkedin, Icon: LinkedinIcon },
  { name: "Medium", url: socialLinks.medium, Icon: MediumIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-base font-medium tracking-[-0.02em] text-chalk">
              Devesh Khatik
            </p>
            <p className="mt-1.5 text-sm text-mist">
              DevSecOps Engineer · Mumbai, India
            </p>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[13px] text-mist transition-colors duration-300 hover:text-chalk"
            >
              <DownloadIcon className="h-4 w-4" />
              Download resume
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[13px] text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            {socials.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} profile`}
                className="flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors duration-300 hover:bg-chalk/5 hover:text-chalk"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-mist/75">
            Designed &amp; built by Devesh Khatik
          </p>
          <p className="font-mono text-[11px] text-mist/75">
            React · Vite · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
