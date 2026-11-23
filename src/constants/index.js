/* ──────────────────────────────────────────────────────────────
   Single source of truth for every piece of portfolio content.
   Nothing here is invented: every metric, role, and link is
   carried over from the existing site or the linked repositories.
   ────────────────────────────────────────────────────────────── */

export const navLinks = [
  { id: "hero", title: "Home" },
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "writing", title: "Writing" },
  { id: "contact", title: "Contact" },
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
  eyebrow: "DevSecOps Engineer · Mumbai, India",
  headline: ["Engineering Secure", "Infrastructure."],
  headlineAccent: "Automating Everything.",
  description:
    "I'm Devesh Khatik, a DevSecOps Engineer passionate about cloud infrastructure, CI/CD automation, Kubernetes, and building security into every stage of software delivery.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Let's Connect", href: "#contact" },
};

/* Logo strip directly beneath the hero */
export const showcaseTech = [
  "AWS",
  "Azure",
  "Kubernetes",
  "Docker",
  "Terraform",
  "Jenkins",
  "GitHub Actions",
  "Linux",
  "Checkmarx",
];

export const aboutData = {
  eyebrow: "About",
  headline: "Building scalable, secure and resilient systems.",
  lede:
    "I'm a DevSecOps Engineer focused on cloud infrastructure, CI/CD automation, and security engineering. I enjoy solving complex infrastructure problems and building reliable systems that scale.",
  paragraphs: [
    "Today I'm a DevSecOps Engineer at ProTechmanize in Mumbai, where I build and maintain automated CI/CD pipelines across AWS, Azure DevOps, and Jenkins. Security is built into every stage rather than bolted on at the end: I leverage Checkmarx for SAST, SCA, and API security, alongside container and Docker image scanning with automated daily updates for newly disclosed CVE vulnerabilities to ensure zero risky builds ever reach production.",
    "Beyond pipelines, I manage Ubuntu and Windows EC2 hosts across multiple customer environments, enforcing OS hardening baselines and running continuous CVE remediation so that every environment stays patched, consistent, and auditable. I use Terraform to keep infrastructure reproducible, and Prometheus and Grafana to keep a close eye on how it behaves in production.",
    "Driven by continuous learning, I recently completed the 30 Days of DevSecOps challenge on LinkedIn, documenting deep dives on shift-left security, container hardening, Kubernetes internals, and zero-downtime deployment. I enjoy turning what I learn into practical, hands-on projects and sharing it with the community.",
  ],
  stats: [
    { value: 156, suffix: "+", label: "CI/CD pipelines maintained", detail: "AWS CodePipeline, Azure DevOps, Jenkins" },
    { value: 50, suffix: "+", label: "Customer environments", detail: "Ubuntu Linux and Windows EC2 hosts" },
    { value: 30, suffix: "", label: "Days of DevSecOps", detail: "Public challenge, completed" },
    { value: 4500, suffix: "+", label: "LinkedIn followers", detail: "Writing on shift-left security" },
  ],
};

export const experiences = [
  {
    company: "ProTechmanize",
    role: "DevSecOps Engineer",
    range: "Dec 2025 — Present",
    location: "Mumbai, India",
    url: "https://protechmanize.com",
    bullets: [
      "Manage 156+ CI/CD pipelines across AWS CodePipeline, Azure DevOps, and Jenkins with zero CRITICAL CVEs reaching production since SAST integration.",
      "Integrated Checkmarx for SAST, SCA, and API security across all pipelines, enforcing strict quality gates that halt builds before container images are generated.",
      "Implemented Docker container image scanning with daily CVE vulnerability feeds, preventing vulnerable dependencies or images from deploying to production.",
      "Administer Ubuntu Linux and Windows EC2 hosts across 50+ customer environments — managing OS patching, security hardening, and 24/7 on-call rotations.",
    ],
    tech: ["AWS", "Azure DevOps", "Jenkins", "Checkmarx", "Docker", "Terraform", "Linux"],
  },
  {
    company: "HERE Technologies",
    role: "Data Specialist",
    range: "May 2024 — Sep 2025",
    location: "Mumbai, India",
    url: "https://www.here.com",
    bullets: [
      "Built data quality automation scripts in Python, replacing manual validation with reliable pipelines and establishing a scripting-first automation discipline.",
      "Collaborated with AWS infrastructure teams to secure large-scale geospatial datasets on S3 with IAM access controls and EC2 operations at global scale.",
      "Managed the full place-data lifecycle across HERE WeGo global mapping records, enforcing data integrity standards that directly inform CI/CD quality gate design.",
      "Operated in a high-availability, globally distributed team with structured escalation habits and cross-functional communication for on-call readiness.",
    ],
    tech: ["Python", "AWS S3", "IAM", "EC2", "Data Quality"],
  },
];

/* ── Tech stack, grouped by domain ── */
export const techGroups = [
  {
    id: "cloud",
    title: "Cloud",
    blurb: "Where the infrastructure lives.",
    items: [
      { name: "AWS", note: "EC2 · S3 · IAM · EKS" },
      { name: "Azure", note: "Azure DevOps pipelines" },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    blurb: "Packaging and running workloads.",
    items: [
      { name: "Docker", note: "Multi-stage builds" },
      { name: "Kubernetes", note: "Workloads · Helm" },
      { name: "Amazon EKS", note: "Managed clusters" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD",
    blurb: "Delivery, automated end to end.",
    items: [
      { name: "Jenkins", note: "Declarative pipelines" },
      { name: "GitHub Actions", note: "Workflow automation" },
      { name: "AWS CodePipeline", note: "Release orchestration" },
      { name: "AWS CodeBuild", note: "Managed build phases" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    blurb: "Reproducible by default.",
    items: [{ name: "Terraform", note: "Modules · remote state" }],
  },
  {
    id: "security",
    title: "Security",
    blurb: "Shift-left, every stage.",
    items: [
      { name: "Checkmarx", note: "SAST · SCA · API security" },
      { name: "Trivy", note: "Container CVE scanning" },
      { name: "Vulnerability Mgmt", note: "Daily CVE remediation" },
      { name: "Container Security", note: "Image hardening" },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    blurb: "The ground everything stands on.",
    items: [{ name: "Linux", note: "Ubuntu hardening · Bash" }],
  },
];

/* ── DevSecOps lifecycle, signature scroll section ── */
export const lifecycleStages = [
  { id: "plan", label: "Plan", tools: ["Jira", "Git"], note: "Threat modelling before the first commit." },
  { id: "code", label: "Code", tools: ["Git", "Pre-commit"], note: "Secrets and linting caught locally." },
  { id: "build", label: "Build", tools: ["Docker", "CodeBuild"], note: "Multi-stage builds, minimal images." },
  { id: "test", label: "Test", tools: ["Pytest", "Quality gates"], note: "Automated gates fail the build, not production." },
  { id: "scan", label: "Security Scan", tools: ["Checkmarx", "Trivy"], note: "SAST, SCA, API and image scanning.", emphasis: true },
  { id: "release", label: "Release", tools: ["Jenkins", "Helm"], note: "Versioned artefacts, approval gates." },
  { id: "deploy", label: "Deploy", tools: ["Kubernetes", "ArgoCD"], note: "Zero-downtime rollouts on EKS." },
  { id: "monitor", label: "Monitor", tools: ["Prometheus", "Grafana"], note: "Metrics, alerts, and on-call feedback." },
];

/* ── Projects: four lead case studies, then the supporting set ── */
export const caseStudies = [
  {
    index: "01",
    title: "OWASP Juice Shop DevSecOps Pipeline",
    kicker: "Shift-left security on AWS",
    description:
      "Automated shift-left DevSecOps pipeline on AWS integrating Checkmarx SAST static analysis, OWASP dependency vulnerability auditing, multi-stage Docker builds, and Trivy CVE scanning.",
    highlights: [
      "Checkmarx SAST runs on every commit, before any image is built",
      "OWASP dependency auditing surfaces vulnerable transitive packages",
      "Trivy scans the final image; findings block promotion",
    ],
    tech: ["AWS", "Jenkins", "Checkmarx", "Trivy", "Docker"],
    github: "https://github.com/DEVESH7k/juice-shop-aws-devsecops",
    external: null,
    visual: "pipeline",
  },
  {
    index: "02",
    title: "End-to-End DevSecOps Kubernetes Pipeline",
    kicker: "GitOps delivery to Kubernetes",
    description:
      "Shift-left DevSecOps pipeline featuring Jenkins declarative workflows, Checkmarx SAST quality gates, Trivy container CVE scanning, Helm charts, and GitOps continuous delivery with ArgoCD to Kubernetes on AWS EC2.",
    highlights: [
      "Jenkins declarative workflow drives build, scan, and publish stages",
      "ArgoCD reconciles cluster state from Git — no manual kubectl applies",
      "Prometheus and Grafana close the loop on deployed workloads",
    ],
    tech: ["Jenkins", "Checkmarx", "Trivy", "Docker", "Kubernetes", "ArgoCD", "Helm", "Prometheus"],
    github: "https://github.com/DEVESH7k/DevSecOps-Project",
    external: null,
    visual: "gitops",
  },
  {
    index: "03",
    title: "Swiggy App CI/CD Pipeline",
    kicker: "Cloud-native delivery with approval gates",
    description:
      "Cloud-native CI/CD architecture for a food delivery platform automating build, test, containerization, security scans, and zero-downtime deployment with manual approval gates.",
    highlights: [
      "Build, test, and containerization fully automated on commit",
      "Security scanning gates sit ahead of the release stage",
      "Manual approval before production, zero-downtime rollout after",
    ],
    tech: ["Jenkins", "Docker", "Checkmarx", "Trivy", "AWS EC2"],
    github: "https://github.com/DEVESH7k/DevOps-Project-Swiggy",
    external: null,
    visual: "release",
  },
  {
    index: "04",
    title: "Super Mario on AWS EKS with Terraform",
    kicker: "Infrastructure as Code, end to end",
    description:
      "Production-grade Infrastructure as Code provisioning an Amazon EKS cluster with custom VPC, subnets, and least-privilege IAM roles. Containerized with Docker and deployed to Kubernetes with LoadBalancer ingress.",
    highlights: [
      "Custom VPC with public and private subnets, provisioned by Terraform",
      "Least-privilege IAM roles for the cluster and node groups",
      "Kubernetes Deployment exposed through a LoadBalancer Service",
    ],
    tech: ["Terraform", "AWS EKS", "Kubernetes", "Docker", "VPC", "IAM"],
    github: "https://github.com/DEVESH7k/terraform-eks-super-mario",
    external: null,
    visual: "infra",
  },
];

export const otherProjects = [
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

/* ── Terminal storytelling block ── */
export const terminalScript = [
  { command: "whoami", output: ["Devesh Khatik"] },
  { command: "role", output: ["DevSecOps Engineer"] },
  {
    command: "focus",
    output: ["Cloud Infrastructure", "CI/CD Automation", "Kubernetes", "Security Engineering"],
  },
  { command: "status", output: ["Building secure systems..."] },
];

/* ── Writing: the 30 Days of DevSecOps series ── */
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

export const writingChannels = [
  {
    name: "LinkedIn",
    handle: "/in/deveshkhatik",
    description:
      "Where the 30 Days of DevSecOps series was published, plus ongoing notes on shift-left security and pipeline design.",
    url: socialLinks.linkedin,
  },
  {
    name: "Medium",
    handle: "@deveshkhatik007",
    description:
      "Longer-form technical write-ups on CI/CD architecture, Kubernetes, and Infrastructure as Code.",
    url: socialLinks.medium,
  },
  {
    name: "GitHub",
    handle: "DEVESH7k",
    description:
      "Source for every project on this site — pipelines, Terraform modules, and Kubernetes manifests.",
    url: socialLinks.github,
  },
];

export const contactData = {
  headline: "Let's build something secure.",
  description:
    "Have an interesting infrastructure challenge or an opportunity to collaborate? I'd love to connect.",
};
