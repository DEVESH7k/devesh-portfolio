import { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "../constants";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // TODO: Wire to AWS Lambda + SES
    // await fetch("YOUR_API_GATEWAY_URL", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-[5%] -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <p className="section-label">Get in touch</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Let's <span className="orange-text-gradient">Connect</span>
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[12px] font-mono text-[#9488aa] uppercase tracking-wider block mb-2">Your Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Devesh Khatik" className="form-input" required />
            </div>
            <div>
              <label className="text-[12px] font-mono text-[#9488aa] uppercase tracking-wider block mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="hello@example.com" className="form-input" required />
            </div>
            <div>
              <label className="text-[12px] font-mono text-[#9488aa] uppercase tracking-wider block mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or just say hi..." rows={5} className="form-input resize-none" required />
            </div>
            <button type="submit" disabled={sending} className="px-8 py-3 rounded-full green-pink-gradient text-white font-outfit font-semibold text-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {sending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Sending...
                </>
              ) : sent ? "Sent! ✓" : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:w-[380px] flex-shrink-0 space-y-6">
          {/* Direct contact */}
          <div className="rounded-2xl bg-bg1 border border-white/[0.06] p-7">
            <h3 className="text-[18px] font-outfit font-semibold text-white mb-5">Direct Contact</h3>
            <div className="space-y-4">
              <a href={`mailto:${socialLinks.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-[18px] h-[18px] text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">Email</p>
                  <p className="text-[14px] font-outfit text-white group-hover:text-accent transition-colors">{socialLinks.email}</p>
                </div>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-[18px] h-[18px] text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">LinkedIn</p>
                  <p className="text-[14px] font-outfit text-white group-hover:text-accent transition-colors">3,541 followers</p>
                </div>
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-[18px] h-[18px] text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[#9488aa] uppercase tracking-wider">GitHub</p>
                  <p className="text-[14px] font-outfit text-white group-hover:text-accent transition-colors">DEVESH7k</p>
                </div>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div className="rounded-2xl bg-bg1 border border-white/[0.06] p-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[13px] font-mono text-green-400 uppercase tracking-wider">Available for opportunities</span>
            </div>
            <p className="text-[#9488aa] text-[14px] font-outfit font-light leading-relaxed">
              Open to DevSecOps roles, cloud security consulting, and technical collaborations. Let's talk.
            </p>
          </div>

          {/* Resume download */}
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-bg1 border border-accent/20 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className="text-[14px] font-outfit font-semibold text-accent">Download Resume (PDF)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
