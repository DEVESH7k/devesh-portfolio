import { motion } from "framer-motion";
import { socialLinks } from "../constants";
import { GithubIcon, LinkedinIcon, MediumIcon } from "./Icons";
import { EASE_EXPO } from "../hooks/useScrollAnimation";

const rails = [
  { name: "GitHub", url: socialLinks.github, Icon: GithubIcon },
  { name: "LinkedIn", url: socialLinks.linkedin, Icon: LinkedinIcon },
  { name: "Medium", url: socialLinks.medium, Icon: MediumIcon },
];

/* Thin fixed rails at the page edges — desktop only, they would
   crowd a phone. Purely supplementary: every link also appears in
   the contact section and footer. */
export default function SocialRails() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: EASE_EXPO }}
      aria-hidden="false"
      className="pointer-events-none fixed inset-y-0 left-0 right-0 z-30 hidden xl:block"
    >
      {/* Left: social marks */}
      <div className="pointer-events-auto absolute bottom-0 left-7 flex flex-col items-center gap-5">
        {rails.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} profile`}
            className="p-1.5 text-mist transition-[color,transform] duration-500 ease-expo hover:-translate-y-1 hover:text-emerald"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
        <span aria-hidden="true" className="mt-2 h-24 w-px bg-gradient-to-b from-line-strong to-transparent" />
      </div>

      {/* Right: email, set vertically */}
      <div className="pointer-events-auto absolute bottom-0 right-7 flex flex-col items-center gap-6">
        <a
          href={`mailto:${socialLinks.email}`}
          className="font-mono text-[11px] tracking-[0.18em] text-mist transition-[color,transform] duration-500 ease-expo hover:-translate-y-1 hover:text-emerald"
          style={{ writingMode: "vertical-rl" }}
        >
          {socialLinks.email}
        </a>
        <span aria-hidden="true" className="h-24 w-px bg-gradient-to-b from-line-strong to-transparent" />
      </div>
    </motion.div>
  );
}
