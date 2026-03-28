export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "architecture", title: "Architecture" },
  { id: "certifications", title: "Certs" },
  { id: "challenge", title: "30 Days" },
  { id: "contact", title: "Contact" },
];

export const experiences = [
  {
    title: "DevSecOps Engineer",
    company: "ProTechmanize",
    date: "Dec 2025 — Present",
    location: "Mumbai · On-site",
    highlights: ["156+ Pipelines", "SonarQube SAST", "Trivy CVE Scan", "50+ EC2 Hosts", "24/7 On-Call"],
    points: [
      "Managing 156+ CI/CD pipelines — AWS CodePipeline for web apps, Azure DevOps for Android/iOS, Jenkins for in-house delivery.",
      "Integrated SonarQube SAST across all pipelines to enforce code quality and detect vulnerabilities pre-production.",
      "Implemented Trivy for container image CVE scanning across Docker and EKS environments before every deployment.",
      "Managing Ubuntu Linux and Windows EC2 hosts across 50+ customer environments.",
      "24/7 on-call rotation — triaging and resolving production incidents to minimize downtime.",
    ],
    current: true,
  },
  {
    title: "Data Specialist",
    company: "HERE Technologies",
    date: "May 2024 — Sep 2025",
    location: "Navi Mumbai · 1 yr 5 mos",
    highlights: ["AWS Infrastructure", "Data Pipelines", "Global Scale", "1yr 5mo"],
    points: [
      "Analyzed complex datasets to derive actionable insights for location-based solutions in HERE WeGo.",
      "Optimized data pipelines with cross-functional teams to ensure accuracy and high availability.",
      "Managed place data lifecycle — creation, modification, deletion — across global mapping records.",
      "Collaborated with cloud infrastructure teams to store and secure large datasets on AWS.",
    ],
    current: false,
  },
];

export const projects = [
  {
    name: "Netflix Clone — Full DevSecOps",
    description:
      "Production-grade Netflix clone on Kubernetes with a complete shift-left security pipeline — SonarQube SAST quality gates, Trivy CVE scanning before every deployment, Jenkins CI/CD with rolling updates and auto-scaling on EKS.",
    architecture:
      "Code push triggers Jenkins pipeline → SonarQube SAST quality gate → Docker multi-stage build → Trivy CVE scan → ECR push → kubectl rolling update on EKS → Prometheus health check.",
    highlights: ["SonarQube SAST", "Trivy CVE Scan", "EKS Auto-Scale", "Rolling Deploy"],
    pipeline: ["Git", "Jenkins", "SonarQube", "Docker", "Trivy", "ECR", "EKS"],
    tags: ["Kubernetes", "SonarQube", "Trivy", "Jenkins", "EKS"],
    icon: "🎬",
    source_code_link: "https://github.com/DEVESH7k",
    live_demo: null,
  },
  {
    name: "Super Mario on AWS EKS",
    description:
      "Provisioned a production EKS cluster with Terraform IaC — VPC, subnets, node groups, IAM roles. Containerized the app with Docker and exposed it via Kubernetes LoadBalancer with least-privilege access policies.",
    architecture:
      "Terraform provisions VPC + EKS cluster → IAM roles with least-privilege → Docker image built and pushed to ECR → Kubernetes Deployment + LoadBalancer Service → Auto-scaling node groups.",
    highlights: ["Terraform IaC", "EKS Cluster", "IAM Least-Privilege", "K8s RBAC"],
    pipeline: ["Terraform", "AWS VPC", "EKS", "Docker", "ECR", "K8s"],
    tags: ["Terraform", "EKS", "Docker", "Kubernetes", "AWS"],
    icon: "🎮",
    source_code_link: "https://github.com/DEVESH7k",
    live_demo: null,
  },
  {
    name: "Swiggy CI/CD on AWS CodePipeline",
    description:
      "End-to-end AWS CI/CD for a food-delivery app — CodePipeline triggers on every push, Jenkins runs security gates (SAST + container scan), and multi-environment approvals enforce controlled rollouts.",
    architecture:
      "GitHub push → CodePipeline webhook → CodeBuild compile → Jenkins security stage (SonarQube + Trivy) → Manual approval gate → CodeDeploy to staging → Auto-promote to production on green.",
    highlights: ["CodePipeline", "Security Gates", "Multi-Env Approval", "Jenkins"],
    pipeline: ["CodePipeline", "CodeBuild", "Jenkins", "SonarQube", "Trivy", "CodeDeploy"],
    tags: ["AWS CodePipeline", "Jenkins", "DevSecOps", "IaC"],
    icon: "🍔",
    source_code_link: "https://github.com/DEVESH7k",
    live_demo: null,
  },
  {
    name: "Django Notes App CI/CD",
    description:
      "React + Django notes app containerized with Docker and deployed on AWS behind Nginx reverse proxy. Full CI/CD pipeline with automated Docker image builds, container scanning, and zero-downtime deployments.",
    architecture:
      "Docker Compose build → Container image scan → Push to ECR → EC2 pull + docker-compose up → Nginx reverse proxy → Health check endpoint → Zero-downtime rolling restart.",
    highlights: ["Docker Compose", "Nginx Proxy", "CI/CD Pipeline", "Zero-Downtime"],
    pipeline: ["GitHub Actions", "Docker", "Trivy", "ECR", "EC2", "Nginx"],
    tags: ["Django", "Docker", "AWS", "Nginx", "CI/CD"],
    icon: "📝",
    source_code_link: "https://github.com/DEVESH7k",
    live_demo: null,
  },
];

export const skills = [
  {
    name: "AWS", category: "Cloud", color: "#FF9900", level: 85, levelLabel: "Advanced",
    context: "EKS, EC2, CodePipeline, IAM, S3, CloudWatch",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Azure", category: "Cloud", color: "#0078D4", level: 65, levelLabel: "Proficient",
    context: "Azure DevOps pipelines, ACR, App Service, RBAC",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "SonarQube", category: "Security", color: "#4E9BCD", level: 82, levelLabel: "Advanced",
    context: "SAST across 156+ pipelines, quality gates, issue triage",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",
  },
  {
    name: "Trivy", category: "Security", color: "#1904DA", level: 85, levelLabel: "Advanced",
    context: "Container CVE scanning, IaC misconfig, CI/CD gates",
    logo: "https://cdn.simpleicons.org/trivy/1904DA",
  },
  {
    name: "Jenkins", category: "CI/CD", color: "#D33833", level: 88, levelLabel: "Advanced",
    context: "Declarative pipelines, shared libraries, RBAC, webhooks",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  },
  {
    name: "Terraform", category: "CI/CD", color: "#7B42BC", level: 78, levelLabel: "Advanced",
    context: "EKS clusters, VPC, EC2, module-based IaC at scale",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  },
  {
    name: "Kubernetes", category: "Containers", color: "#326CE5", level: 80, levelLabel: "Advanced",
    context: "EKS deployments, RBAC, HPA, rolling updates, namespaces",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "Docker", category: "Containers", color: "#2496ED", level: 92, levelLabel: "Expert",
    context: "Multi-stage builds, ECR, Compose, image optimisation",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Prometheus", category: "Monitoring", color: "#E6522C", level: 72, levelLabel: "Proficient",
    context: "PromQL, scrape configs, alerting rules, service monitors",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
  },
  {
    name: "Grafana", category: "Monitoring", color: "#F46800", level: 75, levelLabel: "Proficient",
    context: "EKS dashboards, alert channels, CloudWatch integration",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  },
  {
    name: "Linux", category: "Foundation", color: "#FCC624", level: 87, levelLabel: "Advanced",
    context: "Ubuntu/RHEL EC2 admin, bash scripting, cron, systemd",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Git", category: "Foundation", color: "#F05032", level: 90, levelLabel: "Expert",
    context: "GitOps workflows, branching strategy, hooks, monorepos",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

export const certifications = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "2025",
    icon: "☁️",
    color: "#FF9900",
    credentialUrl: "https://aws.amazon.com/certification/",
    status: "planned",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    date: "2026",
    icon: "⎈",
    color: "#326CE5",
    credentialUrl: "https://www.cncf.io/training/certification/cka/",
    status: "planned",
  },
  {
    name: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    date: "2026",
    icon: "🏗️",
    color: "#7B42BC",
    credentialUrl: "https://www.hashicorp.com/en/certification/terraform-associate",
    status: "planned",
  },
  {
    name: "Certified DevSecOps Professional",
    issuer: "Practical DevSecOps",
    date: "2026",
    icon: "🛡️",
    color: "#a78bfa",
    credentialUrl: "https://www.practical-devsecops.com/",
    status: "planned",
  },
];

export const blogPosts = [
  {
    day: 30,
    title: "30 days of consistency — what I learned about showing up",
    tag: "Growth",
    excerpt: "The final reflection on 30 days of writing every single day. What changed, what I'd do differently, and why consistency beats talent.",
  },
  {
    day: 29,
    title: "Why most CI/CD pipelines fail in production",
    tag: "CI/CD",
    excerpt: "The gap between a pipeline that works in staging and one that survives production. Real failure patterns I've seen across 156+ pipelines.",
  },
  {
    day: 28,
    title: "What a DevSecOps engineer actually does all day",
    tag: "Career",
    excerpt: "A raw look behind the title. On-call rotations, security scanning, infrastructure firefighting, and the unglamorous work that keeps systems alive.",
  },
  {
    day: 27,
    title: "10 kubectl commands every DevOps engineer should know",
    tag: "Kubernetes",
    excerpt: "Beyond the basics — the commands that actually save time in production debugging, incident response, and cluster troubleshooting.",
  },
  {
    day: 26,
    title: "Your Kubernetes cluster is running — but is it healthy?",
    tag: "Monitoring",
    excerpt: "Running != healthy. How to set up meaningful health checks, resource monitoring, and alerting that actually catches problems early.",
  },
  {
    day: 25,
    title: "A bad Dockerfile creates security risks — my 8-point checklist",
    tag: "Docker",
    excerpt: "The Dockerfile mistakes that create real CVEs in production. My checklist for building minimal, secure, scannable container images.",
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
      { icon: "📊", name: "Monitor", tool: "Prometheus", color: "#E6522C", detail: "Prometheus scrapes metrics, Grafana dashboards, PagerDuty alerts on anomaly" },
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
  medium: "https://medium.com/@deveshkhatik",
  resume: "/Devesh_Khatik_Resume.pdf",
};
