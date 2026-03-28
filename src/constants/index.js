export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
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
    name: "Super Mario on AWS EKS",
    description:
      "Deployed Super Mario on Amazon EKS using Terraform IaC. End-to-end Docker containerization, Kubernetes services, and cloud provisioning on AWS.",
    tags: ["Terraform", "EKS", "Docker", "Kubernetes", "AWS"],
    icon: "🎮",
    source_code_link: "https://github.com/DEVESH7k",
  },
  {
    name: "Django Notes App CI/CD",
    description:
      "React + Django notes app containerized with Docker, deployed on AWS with Nginx reverse proxy and a complete CI/CD pipeline.",
    tags: ["Django", "Docker", "AWS", "Nginx", "CI/CD"],
    icon: "📝",
    source_code_link: "https://github.com/DEVESH7k",
  },
  {
    name: "Netflix Clone DevSecOps",
    description:
      "Production-grade Netflix clone on Kubernetes with full DevSecOps pipeline — SonarQube SAST, Trivy CVE scanning, auto-scaling, and rolling deployments.",
    tags: ["Kubernetes", "SonarQube", "Trivy", "Docker"],
    icon: "🎬",
    source_code_link: "https://github.com/DEVESH7k",
  },
  {
    name: "Swiggy CI/CD Pipeline on AWS",
    description:
      "End-to-end AWS CI/CD for a food-delivery app using CodePipeline + Jenkins with automated security gates and multi-environment deployment approvals.",
    tags: ["AWS CodePipeline", "Jenkins", "DevSecOps", "IaC"],
    icon: "🍔",
    source_code_link: "https://github.com/DEVESH7k",
  },
];

export const skills = [
  { name: "AWS", color: "#FF9900", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Kubernetes", color: "#326CE5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Docker", color: "#2496ED", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Terraform", color: "#7B42BC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Jenkins", color: "#D33833", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "SonarQube", color: "#4E9BCD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg" },
  { name: "Trivy", color: "#1904DA", logo: "https://cdn.simpleicons.org/trivy/1904DA" },
  { name: "Azure", color: "#0078D4", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Linux", color: "#FCC624", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Git", color: "#F05032", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Prometheus", color: "#E6522C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
  { name: "Grafana", color: "#F46800", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
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

export const socialLinks = {
  github: "https://github.com/DEVESH7k",
  linkedin: "https://linkedin.com/in/deveshkhatik",
  email: "deveshkhatik007@gmail.com",
  linkedinActivity: "https://linkedin.com/in/deveshkhatik/recent-activity/shares/",
  medium: "https://medium.com/@deveshkhatik",
  resume: "/Devesh_Khatik_Resume.pdf",
};
