export default function ProjectDiagram({ type }) {
  if (type === "cicd-pipeline") {
    return (
      <div className="w-full h-full bg-[#0d1f3c] p-6 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-navy-lightest pb-3 font-mono text-[11px] text-slate">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
            <span className="text-slate-lightest font-medium">pipeline.yaml</span>
          </div>
          <span className="text-teal bg-teal/10 px-2 py-0.5 rounded">STATUS: PASS</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">01 · SAST GATE</span>
            <span className="text-xs font-semibold text-slate-lightest">Checkmarx</span>
            <span className="font-mono text-[10px] text-green-400">0 Vulns · A-Rating</span>
          </div>
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">02 · CVE AUDIT</span>
            <span className="text-xs font-semibold text-slate-lightest">Trivy Scan</span>
            <span className="font-mono text-[10px] text-green-400">0 Critical CVEs</span>
          </div>
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">03 · DEPLOY</span>
            <span className="text-xs font-semibold text-slate-lightest">AWS Cloud</span>
            <span className="font-mono text-[10px] text-slate-light">Zero-Downtime</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-light/70 flex items-center justify-between bg-navy/80 px-3 py-2 rounded border border-navy-lightest/50">
          <span>&gt; sh &apos;trivy image --exit-code 1 --severity CRITICAL ...&apos;</span>
          <span className="text-teal">[OK]</span>
        </div>
      </div>
    );
  }

  if (type === "eks-k8s") {
    return (
      <div className="w-full h-full bg-[#0d1f3c] p-6 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-navy-lightest pb-3 font-mono text-[11px] text-slate">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
            <span className="text-slate-lightest font-medium">eks-cluster.k8s</span>
          </div>
          <span className="text-teal bg-teal/10 px-2 py-0.5 rounded">3/3 PODS HEALTHY</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">INGRESS</span>
            <span className="text-xs font-semibold text-slate-lightest">AWS ALB</span>
            <span className="font-mono text-[10px] text-slate-light">SSL Terminated</span>
          </div>
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">ORCHESTRATION</span>
            <span className="text-xs font-semibold text-slate-lightest">EKS v1.30</span>
            <span className="font-mono text-[10px] text-green-400">Rolling Updates</span>
          </div>
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">METRICS</span>
            <span className="text-xs font-semibold text-slate-lightest">Prometheus</span>
            <span className="font-mono text-[10px] text-slate-light">Scraping: 15s</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-light/70 flex items-center justify-between bg-navy/80 px-3 py-2 rounded border border-navy-lightest/50">
          <span>&gt; kubectl rollout status deployment/netflix-app</span>
          <span className="text-teal">[SUCCESS]</span>
        </div>
      </div>
    );
  }

  if (type === "aws-codepipeline") {
    return (
      <div className="w-full h-full bg-[#0d1f3c] p-6 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-navy-lightest pb-3 font-mono text-[11px] text-slate">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
            <span className="text-slate-lightest font-medium">aws-codepipeline</span>
          </div>
          <span className="text-teal bg-teal/10 px-2 py-0.5 rounded">MULTI-STAGE GATES</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">STAGE 1</span>
            <span className="text-xs font-semibold text-slate-lightest">CodeBuild</span>
            <span className="font-mono text-[10px] text-green-400">Compile &amp; Test</span>
          </div>
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">STAGE 2</span>
            <span className="text-xs font-semibold text-slate-lightest">Security Gate</span>
            <span className="font-mono text-[10px] text-green-400">SAST + Trivy</span>
          </div>
          <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
            <span className="font-mono text-[10px] text-teal">STAGE 3</span>
            <span className="text-xs font-semibold text-slate-lightest">CodeDeploy</span>
            <span className="font-mono text-[10px] text-slate-light">Manual Approval</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-light/70 flex items-center justify-between bg-navy/80 px-3 py-2 rounded border border-navy-lightest/50">
          <span>&gt; aws codepipeline get-pipeline-state --name swiggy-prod</span>
          <span className="text-teal">[GREEN]</span>
        </div>
      </div>
    );
  }

  // Terraform IaC
  return (
    <div className="w-full h-full bg-[#0d1f3c] p-6 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-navy-lightest pb-3 font-mono text-[11px] text-slate">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
          <span className="text-slate-lightest font-medium">terraform.tf</span>
        </div>
        <span className="text-teal bg-teal/10 px-2 py-0.5 rounded">IaC 100% AUTOMATED</span>
      </div>

      <div className="grid grid-cols-3 gap-3 my-4">
        <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
          <span className="font-mono text-[10px] text-teal">VPC &amp; SUBNETS</span>
          <span className="text-xs font-semibold text-slate-lightest">Multi-AZ</span>
          <span className="font-mono text-[10px] text-slate-light">Public/Private</span>
        </div>
        <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
          <span className="font-mono text-[10px] text-teal">IAM SECURITY</span>
          <span className="text-xs font-semibold text-slate-lightest">Least-Privilege</span>
          <span className="font-mono text-[10px] text-green-400">RBAC Enforced</span>
        </div>
        <div className="bg-navy p-3 rounded border border-navy-lightest flex flex-col gap-1">
          <span className="font-mono text-[10px] text-teal">NODE GROUPS</span>
          <span className="text-xs font-semibold text-slate-lightest">Auto-Scaling</span>
          <span className="font-mono text-[10px] text-slate-light">1 to 5 EC2s</span>
        </div>
      </div>

      <div className="font-mono text-[10px] text-slate-light/70 flex items-center justify-between bg-navy/80 px-3 py-2 rounded border border-navy-lightest/50">
        <span>&gt; terraform apply -auto-approve (14 added, 0 destroyed)</span>
        <span className="text-teal">[APPLIED]</span>
      </div>
    </div>
  );
}
