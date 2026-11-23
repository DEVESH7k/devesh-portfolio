import { contactData, socialLinks } from "../constants";
import AnimatedSection, { Reveal, RevealGroup, RevealItem, Words } from "../components/AnimatedSection";
import { ArrowIcon, GithubIcon, LinkedinIcon, MailIcon } from "../components/Icons";
import { useMagnetic } from "../hooks/useScrollAnimation";

const channels = [
  { name: "LinkedIn", value: "/in/deveshkhatik", url: socialLinks.linkedin, Icon: LinkedinIcon, external: true },
  { name: "GitHub", value: "DEVESH7k", url: socialLinks.github, Icon: GithubIcon, external: true },
  { name: "Email", value: socialLinks.email, url: `mailto:${socialLinks.email}`, Icon: MailIcon, external: false },
];

function PrimaryCta() {
  const magnetic = useMagnetic(0.22);
  return (
    <a {...magnetic} href={`mailto:${socialLinks.email}`} className="btn btn-solid sheen px-7 py-4 text-[15px]">
      Get In Touch
      <ArrowIcon className="h-4 w-4" />
    </a>
  );
}

export default function Contact() {
  return (
    <AnimatedSection id="contact" label="Contact" className="relative overflow-hidden">
      {/* Closing light */}
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute inset-x-0 bottom-[-30%] top-[-10%] -z-10"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 70%, rgba(0,223,162,0.16), transparent 70%), radial-gradient(40% 40% at 78% 28%, rgba(71,123,255,0.12), transparent 72%)",
        }}
      />

      <div className="shell text-center">
        <Reveal as="p" y={12} amount={0.5} className="eyebrow justify-center">
          Contact
        </Reveal>

        <Words
          text={contactData.headline}
          accent={["secure."]}
          as="h2"
          delay={0.08}
          amount={0.4}
          className="mx-auto mt-6 max-w-[15ch] text-display font-semibold text-chalk"
        />

        <Reveal
          as="p"
          delay={0.18}
          amount={0.3}
          className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-mist sm:text-lg"
        >
          {contactData.description}
        </Reveal>

        <Reveal delay={0.26} amount={0.3} className="mt-11 flex justify-center">
          <PrimaryCta />
        </Reveal>

        <RevealGroup
          as="ul"
          stagger={0.08}
          delay={0.1}
          amount={0.2}
          className="mx-auto mt-16 grid max-w-3xl gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3"
        >
          {channels.map(({ name, value, url, Icon, external }) => (
            <RevealItem as="li" key={name} className="bg-ink">
              <a
                href={url}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col items-center gap-3 px-5 py-8 transition-colors duration-500 ease-expo hover:bg-ink-soft"
              >
                <Icon className="h-5 w-5 text-mist transition-colors duration-500 group-hover:text-emerald" />
                <span className="text-sm font-medium text-chalk">{name}</span>
                <span className="break-all font-mono text-[11px] text-mist/75">{value}</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </AnimatedSection>
  );
}
