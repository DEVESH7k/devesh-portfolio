import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "../constants";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: "Devesh Portfolio",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 left-[5%] -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Get in touch</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Let's <span className="orange-text-gradient">Connect</span>
        </h2>
        <p className="mt-4 text-[#b4aec8] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Open to DevSecOps roles, cloud security consulting, and technical collaborations. Drop a message or
          reach out directly — I reply within 24 hours.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1"
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="text-[11px] font-mono text-[#b4aec8] uppercase tracking-wider block mb-2">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="form-input"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-[11px] font-mono text-[#b4aec8] uppercase tracking-wider block mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@company.com"
                  className="form-input"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="text-[11px] font-mono text-[#b4aec8] uppercase tracking-wider block mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the role, project, or just say hi..."
                rows={5}
                className="form-input resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={sending || status === "success"}
                className="px-8 py-3 rounded-full green-pink-gradient text-white font-outfit font-semibold text-[14px] hover:opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-accent/20 min-w-[148px] justify-center"
              >
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.span
                      key="done"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Sent!
                    </motion.span>
                  ) : sending ? (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Send Message</motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.span
                    role="status"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[13px] font-mono text-green-400 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                    Message sent! I'll reply soon.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    role="alert"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[13px] font-mono text-red-400 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400" aria-hidden="true" />
                    Failed — email me directly at{" "}
                    <a href={`mailto:${socialLinks.email}`} className="underline">
                      {socialLinks.email}
                    </a>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="lg:w-[360px] flex-shrink-0 space-y-5"
        >
          {/* Direct contact */}
          <div className="rounded-2xl bg-bg1 border border-white/[0.06] p-7">
            <h3 className="text-[15px] font-outfit font-semibold text-white mb-5">Direct Contact</h3>
            <div className="space-y-4">
              {[
                {
                  href: `mailto:${socialLinks.email}`,
                  label: "Email",
                  value: socialLinks.email,
                  icon: (
                    <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  href: socialLinks.linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/deveshkhatik",
                  target: "_blank",
                  icon: (
                    <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  ),
                },
                {
                  href: socialLinks.github,
                  label: "GitHub",
                  value: "github.com/DEVESH7k",
                  target: "_blank",
                  icon: (
                    <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                },
              ].map(({ href, label, value, icon, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel={target ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-[#b4aec8] uppercase tracking-wider">{label}</p>
                    <p className="text-[13px] font-outfit text-white group-hover:text-accent transition-colors duration-300 mt-0.5">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability card */}
          <div className="rounded-2xl bg-bg1 border border-white/[0.06] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <span className="text-[12px] font-mono text-green-400 uppercase tracking-wider">
                Available for opportunities
              </span>
            </div>
            <p className="text-[#b4aec8] text-[14px] font-outfit font-light leading-relaxed">
              Open to full-time DevSecOps roles, cloud security consulting, and technical collaborations.
            </p>
          </div>

          {/* Resume download */}
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-bg1 border border-accent/20 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[14px] font-outfit font-semibold text-accent">Download Resume (PDF)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
