export const navLinks = [
  { id: "about",         title: "About"    },
  { id: "skills",        title: "Skills"   },
  { id: "experience",    title: "Work"     },
  { id: "projects",      title: "Projects" },
  { id: "architecture",  title: "Design"   },
  { id: "security",      title: "SOC"      },
  { id: "snippets",      title: "Code"     },
  { id: "certifications",title: "Certs"    },
  { id: "writing",       title: "Writing"  },
  { id: "contact",       title: "Contact"  },
];

export const experiences = [
  {
    title: "DevSecOps Engineer",
    company: "ProTechmanize",
    date: "Dec 2025 — Present",
    location: "Mumbai · On-site",
    highlights: ["156+ Pipelines", "SonarQube SAST", "Trivy CVE Scan", "50+ EC2 Hosts", "24/7 On-Call"],
    points: [
      "Managing 156+ CI/CD pipelines — AWS CodePipeline for web apps, Azure DevOps for Android/iOS, and Jenkins for in-house delivery — with zero CRITICAL CVEs reaching production since SAST integration.",
      "Integrated SonarQube SAST across all pipelines, enforcing quality gates that block deployments on any critical vulnerability before a container image is ever built.",
      "Implemented Trivy container image CVE scanning as a mandatory pipeline gate across Docker and EKS environments, preventing vulnerable images from reaching any environment.",
      "Managing Ubuntu Linux and Windows EC2 hosts across 50+ customer environments — including OS patching, security hardening, and capacity management.",
      "24/7 on-call rotation — triaging and resolving production incidents, writing post-mortems, and eliminating recurring failure modes to reduce MTTR.",
    ],
    current: true,
  },
  {
    title: "Data Specialist",
    company: "HERE Technologies",
    date: "May 2024 — Sep 2025",
    location: "Navi Mumbai · 1 yr 5 mos",
    highlights: ["AWS Infrastructure", "Python Automation", "Data Pipelines", "Global Scale"],
    points: [
      "Built data quality automation scripts in Python, replacing hours of manual validation with reliable, repeatable pipelines — establishing the scripting-first discipline that now drives my DevSecOps automation work.",
      "Collaborated with AWS infrastructure teams to store and secure large-scale geospatial datasets — gaining hands-on exposure to S3 data governance, IAM access control, and EC2 operations at global scale.",
      "Managed the full place-data lifecycle across HERE WeGo's global mapping records, developing rigorous standards for data integrity and audit trails that directly inform CI/CD quality gate design.",
      "Operated in a high-availability, globally distributed team — building incident-awareness, structured escalation habits, and cross-functional communication skills that carry directly into 24/7 on-call operations.",
    ],
    current: false,
  },
];

export const education = {
  degree: "Bachelor of Computer Science (B.Sc. CS)",
  institution: "University of Mumbai",
  period: "2021 – 2024",
  highlights: ["Cloud Computing", "Network Security", "Linux Administration", "Database Management"],
};

export const projects = [
  {
    name: "Netflix Clone — Full DevSecOps",
    description:
      "Production-grade Netflix clone on Kubernetes with a complete shift-left security pipeline — SonarQube SAST quality gates block on any critical vulnerability, Trivy CVE scanning before every deployment, Jenkins CI/CD with rolling updates and auto-scaling on EKS.",
    architecture:
      "Code push triggers Jenkins pipeline → SonarQube SAST quality gate (0 bugs · 0 vulns) → Docker multi-stage build → Trivy CVE scan (CRITICAL: 0) → ECR push → kubectl rolling update on EKS → Prometheus health check.",
    highlights: ["SonarQube SAST", "Trivy CVE Scan", "EKS Auto-Scale", "Rolling Deploy"],
    metrics: ["Build: ~4 min", "CRITICAL CVEs: 0", "SAST Findings: 0", "Pods: 3/3 healthy"],
    pipeline: ["Git", "Jenkins", "SonarQube", "Docker", "Trivy", "ECR", "EKS"],
    tags: ["Kubernetes", "SonarQube", "Trivy", "Jenkins", "EKS"],
    icon: "🎬",
    source_code_link: "https://github.com/DEVESH7k/netflix-devsecops-pipeline",
    live_demo: null,
  },
  {
    name: "Super Mario on AWS EKS",
    description:
      "Provisioned a production EKS cluster with Terraform IaC — VPC, subnets, node groups, and IAM roles with least-privilege. Containerized the app with Docker, exposed via Kubernetes LoadBalancer, with auto-scaling node groups handling demand spikes.",
    architecture:
      "Terraform provisions VPC + EKS cluster → IAM roles with least-privilege → Docker image built and pushed to ECR → Kubernetes Deployment + LoadBalancer Service → Auto-scaling node groups (1–5 nodes).",
    highlights: ["Terraform IaC", "EKS Cluster", "IAM Least-Privilege", "K8s RBAC"],
    metrics: ["IaC: 100% Terraform", "IAM: Least-privilege", "Auto-scale: 1–5 nodes", "Cluster: EKS managed"],
    pipeline: ["Terraform", "AWS VPC", "EKS", "Docker", "ECR", "K8s"],
    tags: ["Terraform", "EKS", "Docker", "Kubernetes", "AWS"],
    icon: "🎮",
    source_code_link: "https://github.com/DEVESH7k/mario-eks-terraform",
    live_demo: null,
  },
  {
    name: "Swiggy CI/CD on AWS CodePipeline",
    description:
      "End-to-end AWS CI/CD for a food-delivery clone — CodePipeline triggers on every push, Jenkins runs SAST and container scan security gates, and manual approval gates enforce controlled rollouts through staging to production.",
    architecture:
      "GitHub push → CodePipeline webhook → CodeBuild compile → Jenkins security stage (SonarQube + Trivy) → Manual approval gate → CodeDeploy to staging → Auto-promote to production on green.",
    highlights: ["CodePipeline", "Security Gates", "Multi-Env Approval", "Jenkins"],
    metrics: ["Envs: Staging + Prod", "Gates: 2 approval stages", "SAST: SonarQube", "CVE scan: Trivy"],
    pipeline: ["CodePipeline", "CodeBuild", "Jenkins", "SonarQube", "Trivy", "CodeDeploy"],
    tags: ["AWS CodePipeline", "Jenkins", "DevSecOps", "IaC"],
    icon: "🍔",
    source_code_link: "https://github.com/DEVESH7k/swiggy-aws-codepipeline",
    live_demo: null,
  },
  {
    name: "Django Notes App CI/CD",
    description:
      "React + Django notes app containerized with Docker and deployed on AWS behind Nginx reverse proxy. Full CI/CD with GitHub Actions — automated builds, Trivy container scanning, ECR push, and zero-downtime rolling restarts on EC2.",
    architecture:
      "GitHub Actions workflow → Docker Compose build → Trivy container scan → Push to ECR → EC2 pull + docker-compose up → Nginx reverse proxy → Health check endpoint → Zero-downtime rolling restart.",
    highlights: ["GitHub Actions", "Docker Compose", "Nginx Proxy", "Zero-Downtime"],
    metrics: ["Zero-downtime: ✓", "Image scan: Clean", "Stack: Docker + Nginx", "Deploy target: EC2"],
    pipeline: ["GitHub Actions", "Docker", "Trivy", "ECR", "EC2", "Nginx"],
    tags: ["Django", "Docker", "AWS", "Nginx", "GitHub Actions"],
    icon: "📝",
    source_code_link: "https://github.com/DEVESH7k/django-notes-app",
    live_demo: null,
  },
];

export const skills = [
  {
    name: "AWS", category: "Cloud", color: "#FF9900", level: 85, levelLabel: "Advanced",
    context: "EKS, EC2, CodePipeline, IAM, S3, CloudWatch, ECR",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Azure", category: "Cloud", color: "#0078D4", level: 65, levelLabel: "Proficient",
    context: "Azure DevOps pipelines, ACR, App Service, RBAC",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "SonarQube", category: "Security", color: "#4E9BCD", level: 82, levelLabel: "Advanced",
    context: "SAST across 156+ pipelines, quality gates, vulnerability triage",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",
  },
  {
    name: "Trivy", category: "Security", color: "#1904DA", level: 85, levelLabel: "Advanced",
    context: "Container CVE scanning, IaC misconfig detection, CI/CD pipeline gates",
    logo: "https://cdn.simpleicons.org/trivy/1904DA",
  },
  {
    name: "Jenkins", category: "CI/CD", color: "#D33833", level: 88, levelLabel: "Advanced",
    context: "Declarative pipelines, shared libraries, RBAC, webhook triggers",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  },
  {
    name: "Terraform", category: "CI/CD", color: "#7B42BC", level: 78, levelLabel: "Advanced",
    context: "EKS clusters, VPC, EC2, module-based IaC at scale",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  },
  {
    name: "GitHub Actions", category: "CI/CD", color: "#2088FF", level: 72, levelLabel: "Proficient",
    context: "Container build & scan workflows, ECR push, security gate checks, PR automation",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Kubernetes", category: "Containers", color: "#326CE5", level: 80, levelLabel: "Advanced",
    context: "EKS deployments, RBAC, HPA, rolling updates, namespaces",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "Docker", category: "Containers", color: "#2496ED", level: 92, levelLabel: "Expert",
    context: "Multi-stage builds, ECR, Compose, image optimisation, security hardening",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Prometheus", category: "Monitoring", color: "#E6522C", level: 72, levelLabel: "Proficient",
    context: "PromQL, scrape configs, alerting rules, service monitors",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
  },
  {
    name: "Grafana", category: "Monitoring", color: "#F46800", level: 75, levelLabel: "Proficient",
    context: "EKS dashboards, alert channels, CloudWatch data source integration",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  },
  {
    name: "Python", category: "Scripting", color: "#3776AB", level: 72, levelLabel: "Proficient",
    context: "Automation scripts, AWS boto3 integrations, data pipeline tooling, CI/CD utilities",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Bash", category: "Scripting", color: "#4EAA25", level: 82, levelLabel: "Advanced",
    context: "Deployment scripts, shell automation, cron jobs, log parsing, system administration",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "Linux", category: "Foundation", color: "#FCC624", level: 87, levelLabel: "Advanced",
    context: "Ubuntu/RHEL EC2 admin, systemd, hardening, performance tuning",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Git", category: "Foundation", color: "#F05032", level: 90, levelLabel: "Expert",
    context: "GitOps workflows, branching strategy, hooks, monorepos, PR review workflows",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

export const certifications = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "Target: Q2 2026",
    icon: "☁️",
    color: "#FF9900",
    credentialUrl: "https://aws.amazon.com/certification/",
    status: "in-progress",
    progress: 35,
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    date: "Target: Q2 2026",
    icon: "⎈",
    color: "#326CE5",
    credentialUrl: "https://www.cncf.io/training/certification/cka/",
    status: "planned",
    progress: 20,
  },
  {
    name: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    date: "Target: Q3 2026",
    icon: "🏗️",
    color: "#7B42BC",
    credentialUrl: "https://www.hashicorp.com/en/certification/terraform-associate",
    status: "planned",
    progress: 15,
  },
  {
    name: "Certified DevSecOps Professional",
    issuer: "Practical DevSecOps",
    date: "Target: Q4 2026",
    icon: "🛡️",
    color: "#a78bfa",
    credentialUrl: "https://www.practical-devsecops.com/",
    status: "planned",
    progress: 10,
  },
];

export const blogPosts = [
  {
    day: 1,
    title: "Why I'm doing a 30-day DevSecOps writing challenge",
    tag: "Growth",
    excerpt: "The decision to write every day for 30 days wasn't about visibility — it was about forcing myself to articulate what I do. Turns out, teaching is the best way to learn.",
  },
  {
    day: 2,
    title: "DevSecOps vs DevOps: what's actually different?",
    tag: "Career",
    excerpt: "Security isn't a phase you bolt on at the end. The key difference between DevOps and DevSecOps is when and how security is integrated — and what breaks when it's not.",
  },
  {
    day: 3,
    title: "How I set up my first Jenkins server from scratch",
    tag: "CI/CD",
    excerpt: "My first Jenkins install was a disaster. Three hours of config, two broken plugins, one corrupted workspace. Here's the clean path I wish I had.",
  },
  {
    day: 4,
    title: "Understanding SAST: what SonarQube actually checks",
    tag: "Security",
    excerpt: "Static analysis is not just linting. SonarQube looks for real vulnerability patterns — SQL injection, hardcoded secrets, insecure deserialization. Here's what it caught in my code.",
  },
  {
    day: 5,
    title: "Multi-stage Docker builds: why size and security both matter",
    tag: "Docker",
    excerpt: "A 1.4GB image vs a 180MB image — same app. Multi-stage builds shrink your attack surface and your scan time. Here's the pattern I use in every project.",
  },
  {
    day: 6,
    title: "Terraform basics: managing AWS infrastructure as code",
    tag: "CI/CD",
    excerpt: "The first time I ran terraform destroy and watched 12 resources disappear in 30 seconds, I understood why IaC is not optional at scale.",
  },
  {
    day: 7,
    title: "Week 1 recap: from Jenkins installs to Terraform fear",
    tag: "Growth",
    excerpt: "Seven posts in. What I thought I knew vs what I actually know. The gaps were bigger than expected — and more interesting.",
  },
  {
    day: 8,
    title: "AWS IAM: least privilege isn't optional",
    tag: "Security",
    excerpt: "Every wide-open IAM policy is a future incident waiting to happen. I've seen what happens when an ECS task has AdministratorAccess. Never again.",
  },
  {
    day: 9,
    title: "What actually happens inside a Kubernetes cluster?",
    tag: "Kubernetes",
    excerpt: "The gap between kubectl apply and a running pod is wider than it looks. etcd, the API server, the scheduler, the kubelet — all of them have to work for your pod to exist.",
  },
  {
    day: 10,
    title: "Git branching strategies for DevOps teams",
    tag: "CI/CD",
    excerpt: "GitFlow, trunk-based development, feature flags — the branching strategy you choose shapes how your CI/CD pipeline works. Here's what actually works at my scale.",
  },
  {
    day: 11,
    title: "EKS vs self-managed Kubernetes: the real trade-offs",
    tag: "Kubernetes",
    excerpt: "EKS costs more. Self-managed costs your time. At 3am with a broken control plane, the managed service starts looking cheap.",
  },
  {
    day: 12,
    title: "Shift-left security: why moving security earlier saves money",
    tag: "Security",
    excerpt: "A vulnerability caught in code review costs $80 to fix. The same vuln found in production costs $7,600. The math isn't subtle — shift left.",
  },
  {
    day: 13,
    title: "Writing better Bash scripts for CI/CD automation",
    tag: "CI/CD",
    excerpt: "Most Bash scripts I've inherited were untestable, unreadable, and undocumented. Here's my checklist for writing automation scripts that survive beyond the person who wrote them.",
  },
  {
    day: 14,
    title: "Week 2 recap: security gates, IAM, and K8s internals",
    tag: "Growth",
    excerpt: "Two weeks down. The pattern I keep seeing: security knowledge unlocks infrastructure knowledge. You can't secure what you don't understand.",
  },
  {
    day: 15,
    title: "AWS CodePipeline vs Jenkins: when to use each",
    tag: "CI/CD",
    excerpt: "I manage both in production. They solve different problems. CodePipeline for AWS-native simplicity, Jenkins for complex multi-stage pipelines with shared libraries.",
  },
  {
    day: 16,
    title: "Container security: beyond just running Trivy",
    tag: "Docker",
    excerpt: "CVE scanning is one layer. Non-root users, read-only filesystems, no-new-privileges flags, seccomp profiles — container security is a stack, not a single tool.",
  },
  {
    day: 17,
    title: "Prometheus and Grafana: building dashboards that matter",
    tag: "Monitoring",
    excerpt: "A dashboard with 40 panels measuring everything is measuring nothing. Here's how I decide what to actually alert on vs just display.",
  },
  {
    day: 18,
    title: "Python automation for DevOps: where to start",
    tag: "CI/CD",
    excerpt: "boto3, subprocess, os.path — the Python I use for DevOps is not machine learning Python. Here's the practical subset that saves hours every week.",
  },
  {
    day: 19,
    title: "Incident response: what a DevSecOps on-call rotation looks like",
    tag: "Career",
    excerpt: "3am, production down, no runbook. Here's the mental model I use to stay calm, triage fast, and write post-mortems that actually prevent recurrence.",
  },
  {
    day: 20,
    title: "Terraform state management: why remote state matters",
    tag: "CI/CD",
    excerpt: "Local state is fine until two people run terraform apply at the same time. S3 + DynamoDB locking is not optional on a team.",
  },
  {
    day: 21,
    title: "Week 3 recap: from monitoring to incident response",
    tag: "Growth",
    excerpt: "Three weeks of writing. The topics I thought were simple (Bash, Python) turned out to be deep. The topics I thought were hard (K8s internals) turned out to be logical.",
  },
  {
    day: 22,
    title: "The real cost of a production security incident",
    tag: "Security",
    excerpt: "Downtime, data exposure, customer trust, engineering hours, compliance fines. I calculated the cost of one bad image making it to production. It changed how I prioritize security gates.",
  },
  {
    day: 23,
    title: "How to write a post-mortem that actually prevents recurrence",
    tag: "Career",
    excerpt: "A post-mortem with just timeline and fix is useless. The five-whys, contributing factors, and — most importantly — the action items with owners and deadlines.",
  },
  {
    day: 24,
    title: "AWS vs Azure DevOps: a practitioner's comparison",
    tag: "CI/CD",
    excerpt: "I use both daily. AWS CodePipeline for web workloads, Azure DevOps for mobile CI/CD. The UX is different, the pricing model is different, but the pipeline logic is the same.",
  },
  {
    day: 25,
    title: "A bad Dockerfile creates security risks — my 8-point checklist",
    tag: "Docker",
    excerpt: "The Dockerfile mistakes that create real CVEs in production. My checklist for building minimal, secure, scannable container images.",
  },
  {
    day: 26,
    title: "Your Kubernetes cluster is running — but is it healthy?",
    tag: "Monitoring",
    excerpt: "Running != healthy. How to set up meaningful health checks, resource monitoring, and alerting that actually catches problems early.",
  },
  {
    day: 27,
    title: "10 kubectl commands every DevOps engineer should know",
    tag: "Kubernetes",
    excerpt: "Beyond the basics — the commands that actually save time in production debugging, incident response, and cluster troubleshooting.",
  },
  {
    day: 28,
    title: "What a DevSecOps engineer actually does all day",
    tag: "Career",
    excerpt: "A raw look behind the title. On-call rotations, security scanning, infrastructure firefighting, and the unglamorous work that keeps systems alive.",
  },
  {
    day: 29,
    title: "Why most CI/CD pipelines fail in production",
    tag: "CI/CD",
    excerpt: "The gap between a pipeline that works in staging and one that survives production. Real failure patterns I've seen across 156+ pipelines.",
  },
  {
    day: 30,
    title: "30 days of consistency — what I learned about showing up",
    tag: "Growth",
    excerpt: "The final reflection on 30 days of writing every single day. What changed, what I'd do differently, and why consistency beats talent.",
  },
];

export const challengePosts = [
  { day: 29, title: "Why most CI/CD pipelines fail in production", tag: "CI/CD", impressions: "581" },
  { day: 27, title: "10 kubectl commands every DevOps engineer should know", tag: "Kubernetes", impressions: "598" },
  { day: 28, title: "What a DevSecOps engineer actually does all day", tag: "Career", impressions: "290" },
  { day: 26, title: "Your Kubernetes cluster is running — but is it healthy?", tag: "Monitoring", impressions: "267" },
  { day: 25, title: "A bad Dockerfile creates security risks — my 8-point checklist", tag: "Docker", impressions: "—" },
  { day: 30, title: "30 days of consistency — what I learned about showing up", tag: "Growth", impressions: "159" },
];

export const architectureDiagrams = [
  {
    id: "cicd",
    title: "CI/CD Security Pipeline",
    subtitle: "End-to-end DevSecOps pipeline with shift-left security gates",
    stages: [
      { icon: "📝", name: "Source", tool: "Git Push", color: "#a78bfa", detail: "Developer pushes to main branch, webhook fires immediately" },
      { icon: "⚙️", name: "Build", tool: "Jenkins", color: "#D33833", detail: "Declarative pipeline triggered, dependencies installed, unit tests run" },
      { icon: "🔍", name: "SAST", tool: "SonarQube", color: "#4E9BCD", detail: "Static analysis — quality gate blocks on any critical bug or vulnerability" },
      { icon: "📦", name: "Package", tool: "Docker", color: "#2496ED", detail: "Multi-stage Dockerfile builds a minimal production image, pushed to ECR" },
      { icon: "🛡️", name: "CVE Scan", tool: "Trivy", color: "#1904DA", detail: "Container image scanned for CVEs — CRITICAL findings fail the pipeline" },
      { icon: "🚀", name: "Deploy", tool: "Kubernetes", color: "#326CE5", detail: "kubectl rolling update to EKS — zero-downtime, 3/3 pods healthy" },
      { icon: "📊", name: "Monitor", tool: "Prometheus", color: "#E6522C", detail: "Prometheus scrapes metrics, Grafana dashboards, alerts on anomaly" },
    ],
  },
  {
    id: "aws",
    title: "AWS Cloud Architecture",
    subtitle: "Production-grade multi-tier infrastructure on AWS",
    stages: [
      { icon: "🌐", name: "Users", tool: "Internet", color: "#60a5fa", detail: "End users access the application from anywhere globally" },
      { icon: "🔀", name: "Load Balancer", tool: "ALB", color: "#FF9900", detail: "Application Load Balancer distributes traffic, handles SSL termination" },
      { icon: "⎈", name: "Orchestration", tool: "EKS", color: "#326CE5", detail: "Managed Kubernetes cluster with auto-scaling node groups across AZs" },
      { icon: "🗄️", name: "Storage", tool: "S3 / RDS", color: "#34d399", detail: "S3 for assets, RDS PostgreSQL with Multi-AZ failover for persistence" },
      { icon: "🔐", name: "Security", tool: "IAM / SG", color: "#f87171", detail: "Least-privilege IAM roles, security groups, KMS encryption at rest" },
      { icon: "📡", name: "Observability", tool: "CloudWatch", color: "#F46800", detail: "Centralised logs, custom metrics, alarms, and X-Ray distributed tracing" },
    ],
  },
  {
    id: "security",
    title: "Shift-Left Security Model",
    subtitle: "Security injected at every stage — not bolted on at the end",
    stages: [
      { icon: "💻", name: "Dev Machine", tool: "Pre-commit", color: "#a78bfa", detail: "Secrets detection, linting, and Dockerfile best-practice checks on commit" },
      { icon: "🔀", name: "Pull Request", tool: "Code Review", color: "#c084fc", detail: "Peer review + automated checks — no merge without pipeline green" },
      { icon: "🔍", name: "SAST Gate", tool: "SonarQube", color: "#4E9BCD", detail: "Zero critical issues policy enforced — breaks build before any image builds" },
      { icon: "🛡️", name: "Image Scan", tool: "Trivy", color: "#1904DA", detail: "Every image scanned for OS + app CVEs before touching any environment" },
      { icon: "✅", name: "Policy Check", tool: "OPA / Kyverno", color: "#34d399", detail: "Kubernetes admission control — block non-compliant workloads from deploying" },
      { icon: "🚀", name: "Production", tool: "Runtime", color: "#E6522C", detail: "Continuous runtime monitoring — anomaly detection, audit logs, incident response" },
    ],
  },
];

export const socialLinks = {
  github: "https://github.com/DEVESH7k",
  linkedin: "https://linkedin.com/in/deveshkhatik",
  email: "deveshkhatik007@gmail.com",
  linkedinActivity: "https://linkedin.com/in/deveshkhatik/recent-activity/shares/",
  medium: "https://medium.com/@deveshkhatik007",
  resume: "/Devesh_Khatik_Resume.pdf",
};
