import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../constants";

function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.035]" style={{ background: "radial-gradient(circle, #e879f9 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">What I've built</p>
        <h2 className="text-[38px] sm:text-[48px] font-bold font-outfit leading-tight">
          Featured <span className="orange-text-gradient">Projects</span>
        </h2>
        <p className="mt-4 text-[#9488aa] text-[16px] font-outfit font-light max-w-2xl leading-relaxed">
          Real-world DevSecOps projects — from Terraform-provisioned EKS clusters to full CI/CD pipelines with security gates baked in.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-7">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
