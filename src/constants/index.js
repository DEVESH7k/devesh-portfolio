export const navLinks = [
  { id: "about", title: "About", number: "01" },
  { id: "experience", title: "Experience", number: "02" },
  { id: "projects", title: "Work", number: "03" },
  { id: "contact", title: "Contact", number: "04" },
];

export const socialLinks = {
  github: "https://github.com/DEVESH7k",
  linkedin: "https://linkedin.com/in/deveshkhatik",
  twitter: "https://twitter.com/deveshkhatik",
  medium: "https://medium.com/@deveshkhatik007",
  instagram: "https://instagram.com/deveshkhatik",
  email: "deveshkhatik007@gmail.com",
  resume: "/resume.pdf",
};

export const heroData = {
  greeting: "Hi, my name is",
  name: "Devesh Khatik.",
  subtitle: "I secure and automate software delivery.",
  description:
    "I'm a DevOps & Cloud Security Engineer passionate about automating resilient cloud infrastructure and shift-left security. I specialize in architecting automated CI/CD pipelines, container orchestration with Kubernetes, and Infrastructure as Code on AWS.",
  ctaText: "Check out my work",
};

export const aboutData = {
  paragraphs: [
    "Today, I'm a DevSecOps Engineer at ProTechmanize in Mumbai, where I build and maintain automated CI/CD pipelines across AWS, Azure DevOps, and Jenkins. Security is built into every stage rather than bolted on at the end: I leverage Checkmarx for SAST, SCA, and API security, alongside container and Docker image scanning with automated daily updates for newly disclosed CVE vulnerabilities to ensure zero risky builds ever reach production.",
    "Beyond pipelines, I manage Ubuntu and Windows EC2 hosts across multiple customer environments, enforcing OS hardening baselines and running continuous CVE remediation so that every environment stays patched, consistent, and auditable. I use Terraform to keep infrastructure reproducible, and Prometheus and Grafana to keep a close eye on how it behaves in production.",
    "Driven by continuous learning, I recently completed the 30 Days of DevSecOps challenge on LinkedIn, documenting deep dives on shift-left security, container hardening, Kubernetes internals, and zero-downtime deployment. I enjoy turning what I learn into practical, hands-on projects and sharing it with the community.",
  ],
  skills: [
    "AWS",
    "Kubernetes",
    "Docker",
    "Terraform",
    "Jenkins",
    "Checkmarx",
    "Trivy",
    "Azure",
    "Linux",
    "Prometheus",
    "Grafana",
    "Python",
    "Bash",
  ],
  stats: [
    { value: 156, suffix: "+", label: "CI/CD Pipelines" },
    { value: 0, suffix: "", label: "CRITICAL CVEs in Prod" },
    { value: 50, suffix: "+", label: "Customer Environments" },
    { value: 4500, suffix: "+", label: "LinkedIn Followers" },
  ],
};

export const experiences = [
  {
    company: "ProTechmanize",
    role: "DevSecOps Engineer",
    range: "Dec 2025 — Present",
    url: "https://protechmanize.com",
    bullets: [
      "Manage 156+ CI/CD pipelines across AWS CodePipeline, Azure DevOps, and Jenkins with zero CRITICAL CVEs reaching production since SAST integration.",
      "Integrated Checkmarx for SAST, SCA, and API security across all pipelines, enforcing strict quality gates that halt builds before container images are generated.",
      "Implemented Docker container image scanning with daily CVE vulnerability feeds, preventing vulnerable dependencies or images from deploying to production.",
      "Administer Ubuntu Linux and Windows EC2 hosts across 50+ customer environments — managing OS patching, security hardening, and 24/7 on-call rotations.",
    ],
  },
  {
    company: "HERE Technologies",
    role: "Data Specialist",
    range: "May 2024 — Sep 2025",
    url: "https://www.here.com",
    bullets: [
      "Built data quality automation scripts in Python, replacing manual validation with reliable pipelines and establishing a scripting-first automation discipline.",
      "Collaborated with AWS infrastructure teams to secure large-scale geospatial datasets on S3 with IAM access controls and EC2 operations at global scale.",
      "Managed the full place-data lifecycle across HERE WeGo global mapping records, enforcing data integrity standards that directly inform CI/CD quality gate design.",
      "Operated in a high-availability, globally distributed team with structured escalation habits and cross-functional communication for on-call readiness.",
    ],
  },
];

export const featuredProjects = [
  {
    title: "Deploy Super Mario on AWS EKS with Terraform",
    description:
      "Production-grade Infrastructure as Code provisioning an Amazon EKS cluster with custom VPC, subnets, and least-privilege IAM roles. Containerized Super Mario with Docker and deployed to Kubernetes with LoadBalancer ingress.",
    tech: ["Terraform", "AWS EKS", "Kubernetes", "Docker", "VPC", "IAM"],
    github: "https://github.com/DEVESH7k/terraform-eks-super-mario",
    external: null,
    image: "/projects/super-mario.png",
  },
  {
    title: "End-to-End DevSecOps Kubernetes Pipeline",
    description:
      "Shift-left DevSecOps pipeline featuring Jenkins declarative workflows, Checkmarx SAST quality gates, Trivy container CVE scanning, Helm charts, and GitOps continuous delivery with ArgoCD to Kubernetes on AWS EC2.",
    tech: ["Jenkins", "Checkmarx", "Trivy", "Docker", "Kubernetes", "ArgoCD", "Helm", "Prometheus"],
    github: "https://github.com/DEVESH7k/DevSecOps-Project",
    external: null,
    image: "/projects/devsecops-flow.png",
  },
];

export const otherProjects = [
  {
    title: "OWASP Juice Shop DevSecOps Pipeline",
    description:
      "Automated shift-left DevSecOps pipeline on AWS integrating Checkmarx SAST static analysis, OWASP dependency vulnerability auditing, multi-stage Docker builds, and Trivy CVE scanning.",
    tech: ["AWS", "Jenkins", "Checkmarx", "Trivy", "Docker"],
    github: "https://github.com/DEVESH7k/juice-shop-aws-devsecops",
    external: null,
  },
  {
    title: "Swiggy App CI/CD Pipeline",
    description:
      "Cloud-native CI/CD architecture for food delivery platform automating build, test, containerization, security scans, and zero-downtime deployment with manual approval gates.",
    tech: ["Jenkins", "Docker", "Checkmarx", "Trivy", "AWS EC2"],
    github: "https://github.com/DEVESH7k/DevOps-Project-Swiggy",
    external: null,
  },
  {
    title: "Cloud-Native Observability Stack",
    description:
      "Production Kubernetes observability infrastructure with Prometheus server, Grafana dashboards, Alertmanager notification routing, and Node Exporter cluster metric scraping.",
    tech: ["Kubernetes", "Prometheus", "Grafana", "Helm", "Alertmanager"],
    github: "https://github.com/DEVESH7k/cloud-native-monitoring",
    external: null,
  },
  {
    title: "Django Notes App CI/CD",
    description:
      "Containerized full-stack Python Django application deployed on AWS behind an Nginx reverse proxy with automated Trivy vulnerability scanning and zero-downtime rolling restarts.",
    tech: ["Django", "Docker", "AWS EC2", "Nginx", "Trivy"],
    github: "https://github.com/DEVESH7k/Django_notes_app",
    external: null,
  },
  {
    title: "Terraform AWS Infrastructure Automation",
    description:
      "Modular Terraform Infrastructure as Code provisioning AWS VPC, public and private subnets, security groups, EC2 compute instances, and IAM access policies with remote state.",
    tech: ["Terraform", "AWS VPC", "EC2", "IAM", "Security Groups"],
    github: "https://github.com/DEVESH7k/Terraform-Script-Swiggy",
    external: null,
  },
  {
    title: "Two-Tier Flask DevOps Pipeline",
    description:
      "Multi-tier Python Flask and MySQL application containerized with Docker Compose, automated via Jenkins declarative CI/CD, and deployed with zero-downtime health gates.",
    tech: ["Python Flask", "MySQL", "Docker", "Jenkins", "AWS"],
    github: "https://github.com/DEVESH7k/DevOps-Project-Two-Tier-Flask-App-Public",
    external: null,
  },
];

export const challengePhases = [
  {
    phase: "01",
    title: "CI/CD & Linux Foundation",
    days: "Days 1 — 7",
    summary:
      "Core automation fundamentals: Jenkins declarative pipelines, multi-stage Docker builds for size and security, shell automation, and infrastructure as code basics.",
  },
  {
    phase: "02",
    title: "Shift-Left Security & CVE Scanning",
    days: "Days 8 — 14",
    summary:
      "Embedding security at code commit: Checkmarx SAST & SCA quality gates, IAM least-privilege enforcement, container vulnerability scanning with Trivy, and attack surface reduction.",
  },
  {
    phase: "03",
    title: "Kubernetes & Infrastructure at Scale",
    days: "Days 15 — 21",
    summary:
      "Cloud-native orchestration: EKS cluster management, Terraform remote state locking with S3/DynamoDB, GitOps branching workflows, and Prometheus/Grafana metric alerting.",
  },
  {
    phase: "04",
    title: "Production Observability & On-Call",
    days: "Days 22 — 30",
    summary:
      "Real-world operational reliability: 24/7 on-call mental models, blameless post-mortems, cluster health auditing, MTTR reduction, and production pipeline failure patterns.",
  },
];
