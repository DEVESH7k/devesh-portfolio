import { motion } from "framer-motion";
import { socialLinks } from "../constants";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6 text-center max-w-[600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
        className="flex flex-col items-center"
      >
        <p className="font-mono text-teal text-sm sm:text-base mb-4 font-normal">
          04. What&apos;s Next?
        </p>

        <h2 className="text-4xl sm:text-5xl font-bold text-slate-lightest font-sans mb-5 tracking-tight">
          Get In Touch
        </h2>

        <p className="text-slate text-base sm:text-lg leading-relaxed mb-12">
          I&apos;m always open to discussing DevSecOps automation, cloud architecture,
          or continuous security hardening. Whether you have an inquiry, a question
          about shift-left pipelines, or just want to connect, my inbox is always open!
        </p>

        <a
          href={`mailto:${socialLinks.email}`}
          className="btn-teal text-sm px-8 py-4 rounded font-mono inline-block"
        >
          Say Hello
        </a>
      </motion.div>
    </section>
  );
}
