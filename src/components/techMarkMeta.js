/* Human-readable names keyed by glyph id — used for alt text / labels. */
export const techNames = {
  aws: "AWS",
  azure: "Azure",
  kubernetes: "Kubernetes",
  docker: "Docker",
  terraform: "Terraform",
  jenkins: "Jenkins",
  "github-actions": "GitHub Actions",
  github: "GitHub",
  linux: "Linux",
  checkmarx: "Checkmarx",
  trivy: "Trivy",
  prometheus: "Prometheus",
  grafana: "Grafana",
  argocd: "ArgoCD",
  helm: "Helm",
  python: "Python",
  shield: "Security",
  git: "Git",
};

/* Maps the display names used in content to a glyph id. */
export function markIdFor(name) {
  const key = String(name).toLowerCase();
  if (key.startsWith("aws code") || key === "aws" || key.startsWith("aws ") || key.startsWith("amazon s3")) return "aws";
  if (key.startsWith("azure")) return "azure";
  if (key.startsWith("amazon eks") || key.startsWith("kubernetes")) return "kubernetes";
  if (key.startsWith("docker")) return "docker";
  if (key.startsWith("terraform")) return "terraform";
  if (key.startsWith("jenkins")) return "jenkins";
  if (key.startsWith("github actions")) return "github-actions";
  if (key.startsWith("github")) return "github";
  if (key.startsWith("linux")) return "linux";
  if (key.startsWith("checkmarx")) return "checkmarx";
  if (key.startsWith("trivy")) return "trivy";
  if (key.startsWith("prometheus")) return "prometheus";
  if (key.startsWith("grafana") || key.startsWith("alertmanager")) return "grafana";
  if (key.startsWith("argo")) return "argocd";
  if (key.startsWith("helm")) return "helm";
  if (key.startsWith("python") || key.startsWith("django") || key.startsWith("pytest")) return "python";
  if (key.startsWith("git") || key.startsWith("pre-commit") || key.startsWith("jira")) return "git";
  return "shield";
}
