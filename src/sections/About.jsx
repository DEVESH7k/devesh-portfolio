import { motion } from "framer-motion";
import { aboutData } from "../constants";
import useCountUp from "../hooks/useCountUp";

function StatItem({ value, label }) {
  const { ref, displayValue } = useCountUp(value, 1800, true);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-lightest">
        {displayValue}
      </span>
      <span className="font-mono text-xs text-slate mt-1">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="px-6 sm:px-12 md:px-0 max-w-[900px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading">
          <span className="text-teal font-mono text-xl sm:text-2xl mr-3 font-normal">
            01.
          </span>
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start mt-8">
          {/* Text Content: 3 cols (60%) */}
          <div className="md:col-span-3 text-slate text-base leading-relaxed space-y-4">
            <p>
              Today, I&apos;m a DevSecOps Engineer at{" "}
              <span className="text-teal font-medium">ProTechmanize</span> in Mumbai,
              where I build and maintain automated CI/CD pipelines across{" "}
              <span className="text-teal font-medium">AWS, Azure DevOps, and Jenkins</span>.
              Security is built into every stage rather than bolted on at the end: I leverage{" "}
              <span className="text-teal font-medium">Checkmarx</span> for{" "}
              <span className="text-teal font-medium">SAST, SCA, and API security</span>,
              alongside container and Docker image scanning with automated daily updates for newly
              disclosed CVE vulnerabilities to ensure zero risky builds ever reach production.
            </p>

            <p>
              Beyond pipelines, I manage Ubuntu and Windows EC2 hosts across multiple
              customer environments, enforcing OS hardening baselines and running continuous
              CVE remediation so that every environment stays patched, consistent, and
              auditable. I use <span className="text-teal font-medium">Terraform</span> to keep
              infrastructure reproducible, and{" "}
              <span className="text-teal font-medium">Prometheus and Grafana</span> to keep a
              close eye on how it behaves in production.
            </p>


            <p>
              Driven by continuous learning, I recently completed the{" "}
              <span className="text-teal font-medium">30 Days of DevSecOps</span> challenge on
              LinkedIn, documenting deep dives on shift-left security, container hardening,
              Kubernetes internals, and zero-downtime deployment. I enjoy turning what I learn
              into practical, hands-on projects and sharing it with the community.
            </p>

            <p className="pt-2 text-slate-lightest font-medium">
              Here are a few technologies I&apos;ve been working with recently:
            </p>

            {/* Two column mono list with teal arrow markers */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 list-none p-0 mt-3 font-mono text-xs sm:text-[13px] text-slate-light">
              {aboutData.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="text-teal text-xs leading-none">▹</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo with offset teal border: 2 cols (40%) */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <div className="relative group w-64 sm:w-72 max-w-full">
              {/* Offset teal border behind (exact Brittany Chiang styling) */}
              <div
                className="absolute inset-0 translate-x-5 translate-y-5 border-2 border-teal rounded transition-transform duration-300 ease-portfolio group-hover:translate-x-3 group-hover:translate-y-3 z-0"
                aria-hidden="true"
              />

              {/* Photo Card container */}
              <div className="relative z-10 rounded bg-teal overflow-hidden transition-transform duration-300 ease-portfolio group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-card group-hover:shadow-card-hover">
                <img
                  src="/me.jpg"
                  alt="Devesh Khatik"
                  width="300"
                  height="380"
                  className="w-full h-auto aspect-[3/4] object-cover object-top rounded mix-blend-multiply filter grayscale contrast-100 group-hover:filter-none group-hover:mix-blend-normal transition-all duration-300 block"
                />
                {/* Subtle teal overlay tint that clears on hover */}
                <div
                  className="absolute inset-0 bg-teal/20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Small quiet row of count-up stats */}
        <div className="mt-16 pt-8 border-t border-navy-lightest grid grid-cols-2 sm:grid-cols-4 gap-6">
          <StatItem value="156+" label="CI/CD Pipelines" />
          <StatItem value="0" label="CRITICAL CVEs in Prod" />
          <StatItem value="50+" label="Customer Envs (EC2)" />
          <StatItem value="4.5K+" label="LinkedIn Followers" />
        </div>
      </motion.div>
    </section>
  );
}
