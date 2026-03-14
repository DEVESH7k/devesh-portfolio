#!/bin/bash
# ============================================================
# setup.sh
# One-shot script to provision the entire portfolio pipeline
# on AWS using only the AWS CLI.
#
# Run this ONCE from your local machine after configuring AWS CLI.
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
# ============================================================

set -euo pipefail

# ── CONFIG — edit these ──────────────────────────────────────
GITHUB_OWNER="DEVESH7k"
GITHUB_REPO="devesh-portfolio"
GITHUB_BRANCH="main"
BUCKET_NAME="deveshkhatik-portfolio"
PIPELINE_NAME="deveshkhatik-portfolio-pipeline"
CODEBUILD_PROJECT="deveshkhatik-portfolio-build"
REGION="ap-south-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
# ─────────────────────────────────────────────────────────────

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   Devesh Khatik — Portfolio AWS Setup            ║"
echo "║   Account: $ACCOUNT_ID                           ║"
echo "║   Region:  $REGION                               ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── STEP 1: S3 BUCKET ────────────────────────────────────────
echo "▶ Step 1/7 — Creating S3 bucket: $BUCKET_NAME"

aws s3api create-bucket \
  --bucket "$BUCKET_NAME" \
  --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION" \
  2>/dev/null || echo "  (bucket already exists, continuing)"

# Block all public access (CloudFront will use OAC)
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket "$BUCKET_NAME" \
  --versioning-configuration Status=Enabled

echo "  ✅ S3 bucket ready: $BUCKET_NAME"

# ── STEP 2: CLOUDFRONT OAC + DISTRIBUTION ────────────────────
echo ""
echo "▶ Step 2/7 — Creating CloudFront distribution"

# Create Origin Access Control
OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config \
    "Name=portfolio-oac,Description=OAC for portfolio,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3" \
  --query 'OriginAccessControl.Id' --output text 2>/dev/null || echo "")

if [ -z "$OAC_ID" ]; then
  OAC_ID=$(aws cloudfront list-origin-access-controls \
    --query "OriginAccessControlList.Items[?Name=='portfolio-oac'].Id" \
    --output text)
fi
echo "  OAC ID: $OAC_ID"

# Create distribution
DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config "{
  \"CallerReference\": \"portfolio-$(date +%s)\",
  \"Comment\": \"Devesh Khatik portfolio\",
  \"DefaultRootObject\": \"index.html\",
  \"Origins\": {
    \"Quantity\": 1,
    \"Items\": [{
      \"Id\": \"S3-$BUCKET_NAME\",
      \"DomainName\": \"$BUCKET_NAME.s3.$REGION.amazonaws.com\",
      \"OriginAccessControlId\": \"$OAC_ID\",
      \"S3OriginConfig\": {\"OriginAccessIdentity\": \"\"}
    }]
  },
  \"DefaultCacheBehavior\": {
    \"TargetOriginId\": \"S3-$BUCKET_NAME\",
    \"ViewerProtocolPolicy\": \"redirect-to-https\",
    \"CachePolicyId\": \"658327ea-f89d-4fab-a63d-7e88639e58f6\",
    \"Compress\": true,
    \"AllowedMethods\": {\"Quantity\": 2, \"Items\": [\"GET\",\"HEAD\"], \"CachedMethods\": {\"Quantity\": 2, \"Items\": [\"GET\",\"HEAD\"]}}
  },
  \"CustomErrorResponses\": {
    \"Quantity\": 2,
    \"Items\": [
      {\"ErrorCode\": 403, \"ResponsePagePath\": \"/index.html\", \"ResponseCode\": \"200\", \"ErrorCachingMinTTL\": 10},
      {\"ErrorCode\": 404, \"ResponsePagePath\": \"/index.html\", \"ResponseCode\": \"200\", \"ErrorCachingMinTTL\": 10}
    ]
  },
  \"Enabled\": true,
  \"PriceClass\": \"PriceClass_100\"
}")

DISTRIBUTION_ID=$(echo "$DISTRIBUTION_OUTPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Distribution']['Id'])")
CLOUDFRONT_DOMAIN=$(echo "$DISTRIBUTION_OUTPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Distribution']['DomainName'])")

echo "  ✅ CloudFront distribution: $DISTRIBUTION_ID"
echo "  🌐 URL: https://$CLOUDFRONT_DOMAIN"

# Attach bucket policy for CloudFront OAC
aws s3api put-bucket-policy \
  --bucket "$BUCKET_NAME" \
  --policy "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [{
      \"Sid\": \"AllowCloudFront\",
      \"Effect\": \"Allow\",
      \"Principal\": {\"Service\": \"cloudfront.amazonaws.com\"},
      \"Action\": \"s3:GetObject\",
      \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\",
      \"Condition\": {
        \"StringEquals\": {\"AWS:SourceArn\": \"arn:aws:cloudfront::$ACCOUNT_ID:distribution/$DISTRIBUTION_ID\"}
      }
    }]
  }"

# Store distribution ID in SSM so CodeBuild can read it
aws ssm put-parameter \
  --name "/portfolio/cloudfront_distribution_id" \
  --value "$DISTRIBUTION_ID" \
  --type "String" \
  --overwrite \
  --region "$REGION"

echo "  ✅ Bucket policy + SSM parameter set"

# ── STEP 3: ARTIFACT BUCKET for CodePipeline ─────────────────
echo ""
echo "▶ Step 3/7 — Creating CodePipeline artifact bucket"

ARTIFACT_BUCKET="$BUCKET_NAME-artifacts"

aws s3api create-bucket \
  --bucket "$ARTIFACT_BUCKET" \
  --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION" \
  2>/dev/null || echo "  (artifact bucket exists)"

aws s3api put-public-access-block \
  --bucket "$ARTIFACT_BUCKET" \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

echo "  ✅ Artifact bucket: $ARTIFACT_BUCKET"

# ── STEP 4: IAM ROLES ─────────────────────────────────────────
echo ""
echo "▶ Step 4/7 — Creating IAM roles"

# CodeBuild role
aws iam create-role \
  --role-name "portfolio-codebuild-role" \
  --assume-role-policy-document '{
    "Version":"2012-10-17",
    "Statement":[{"Effect":"Allow","Principal":{"Service":"codebuild.amazonaws.com"},"Action":"sts:AssumeRole"}]
  }' 2>/dev/null || echo "  (CodeBuild role exists)"

aws iam put-role-policy \
  --role-name "portfolio-codebuild-role" \
  --policy-name "portfolio-codebuild-policy" \
  --policy-document "{
    \"Version\":\"2012-10-17\",
    \"Statement\":[
      {\"Effect\":\"Allow\",\"Action\":[\"logs:CreateLogGroup\",\"logs:CreateLogStream\",\"logs:PutLogEvents\"],\"Resource\":\"*\"},
      {\"Effect\":\"Allow\",\"Action\":[\"s3:GetObject\",\"s3:PutObject\",\"s3:DeleteObject\",\"s3:ListBucket\",\"s3:GetBucketLocation\"],\"Resource\":[\"arn:aws:s3:::$BUCKET_NAME\",\"arn:aws:s3:::$BUCKET_NAME/*\",\"arn:aws:s3:::$ARTIFACT_BUCKET\",\"arn:aws:s3:::$ARTIFACT_BUCKET/*\"]},
      {\"Effect\":\"Allow\",\"Action\":\"cloudfront:CreateInvalidation\",\"Resource\":\"arn:aws:cloudfront::$ACCOUNT_ID:distribution/$DISTRIBUTION_ID\"},
      {\"Effect\":\"Allow\",\"Action\":\"ssm:GetParameter\",\"Resource\":\"arn:aws:ssm:$REGION:$ACCOUNT_ID:parameter/portfolio/*\"}
    ]
  }"

# CodePipeline role
aws iam create-role \
  --role-name "portfolio-codepipeline-role" \
  --assume-role-policy-document '{
    "Version":"2012-10-17",
    "Statement":[{"Effect":"Allow","Principal":{"Service":"codepipeline.amazonaws.com"},"Action":"sts:AssumeRole"}]
  }' 2>/dev/null || echo "  (CodePipeline role exists)"

aws iam put-role-policy \
  --role-name "portfolio-codepipeline-role" \
  --policy-name "portfolio-codepipeline-policy" \
  --policy-document "{
    \"Version\":\"2012-10-17\",
    \"Statement\":[
      {\"Effect\":\"Allow\",\"Action\":[\"s3:GetObject\",\"s3:PutObject\",\"s3:GetBucketVersioning\",\"s3:ListBucket\"],\"Resource\":[\"arn:aws:s3:::$ARTIFACT_BUCKET\",\"arn:aws:s3:::$ARTIFACT_BUCKET/*\"]},
      {\"Effect\":\"Allow\",\"Action\":[\"codebuild:StartBuild\",\"codebuild:BatchGetBuilds\"],\"Resource\":\"arn:aws:codebuild:$REGION:$ACCOUNT_ID:project/$CODEBUILD_PROJECT\"},
      {\"Effect\":\"Allow\",\"Action\":[\"codestar-connections:UseConnection\"],\"Resource\":\"*\"}
    ]
  }"

echo "  ✅ IAM roles created"

# ── STEP 5: CODEBUILD PROJECT ─────────────────────────────────
echo ""
echo "▶ Step 5/7 — Creating CodeBuild project"

aws codebuild create-project \
  --name "$CODEBUILD_PROJECT" \
  --description "Portfolio build: Medium RSS sync + S3 deploy" \
  --source "type=CODEPIPELINE,buildspec=buildspec.yml" \
  --artifacts "type=CODEPIPELINE" \
  --environment "{
    \"type\": \"LINUX_CONTAINER\",
    \"image\": \"aws/codebuild/standard:7.0\",
    \"computeType\": \"BUILD_GENERAL1_SMALL\",
    \"environmentVariables\": [
      {\"name\": \"S3_BUCKET_NAME\", \"value\": \"$BUCKET_NAME\", \"type\": \"PLAINTEXT\"},
      {\"name\": \"REGION\", \"value\": \"$REGION\", \"type\": \"PLAINTEXT\"}
    ]
  }" \
  --service-role "arn:aws:iam::$ACCOUNT_ID:role/portfolio-codebuild-role" \
  --region "$REGION" \
  2>/dev/null || echo "  (CodeBuild project exists, updating...)"

echo "  ✅ CodeBuild project: $CODEBUILD_PROJECT"

# ── STEP 6: GITHUB CONNECTION ─────────────────────────────────
echo ""
echo "▶ Step 6/7 — GitHub connection"
echo ""
echo "  ⚠️  This step requires manual action in AWS Console:"
echo ""
echo "  1. Go to: https://$REGION.console.aws.amazon.com/codesuite/settings/connections"
echo "  2. Click 'Create connection' → choose 'GitHub'"
echo "  3. Name it: portfolio-github"
echo "  4. Click 'Install a new app' → authorize your GitHub account"
echo "  5. Complete the connection → copy the Connection ARN"
echo ""
read -rp "  Paste your GitHub Connection ARN here: " GITHUB_CONNECTION_ARN
echo ""

# ── STEP 7: CODEPIPELINE ──────────────────────────────────────
echo "▶ Step 7/7 — Creating CodePipeline"

aws codepipeline create-pipeline \
  --pipeline "{
    \"name\": \"$PIPELINE_NAME\",
    \"roleArn\": \"arn:aws:iam::$ACCOUNT_ID:role/portfolio-codepipeline-role\",
    \"artifactStore\": {
      \"type\": \"S3\",
      \"location\": \"$ARTIFACT_BUCKET\"
    },
    \"stages\": [
      {
        \"name\": \"Source\",
        \"actions\": [{
          \"name\": \"GitHub_Source\",
          \"actionTypeId\": {
            \"category\": \"Source\",
            \"owner\": \"AWS\",
            \"provider\": \"CodeStarSourceConnection\",
            \"version\": \"1\"
          },
          \"configuration\": {
            \"ConnectionArn\": \"$GITHUB_CONNECTION_ARN\",
            \"FullRepositoryId\": \"$GITHUB_OWNER/$GITHUB_REPO\",
            \"BranchName\": \"$GITHUB_BRANCH\",
            \"OutputArtifactFormat\": \"CODE_ZIP\",
            \"DetectChanges\": \"true\"
          },
          \"outputArtifacts\": [{\"name\": \"SourceArtifact\"}]
        }]
      },
      {
        \"name\": \"Build\",
        \"actions\": [{
          \"name\": \"CodeBuild_Deploy\",
          \"actionTypeId\": {
            \"category\": \"Build\",
            \"owner\": \"AWS\",
            \"provider\": \"CodeBuild\",
            \"version\": \"1\"
          },
          \"configuration\": {
            \"ProjectName\": \"$CODEBUILD_PROJECT\"
          },
          \"inputArtifacts\": [{\"name\": \"SourceArtifact\"}],
          \"outputArtifacts\": [{\"name\": \"BuildArtifact\"}]
        }]
      }
    ]
  }" \
  --region "$REGION"

echo "  ✅ CodePipeline created: $PIPELINE_NAME"

# ── ADD SCHEDULED SYNC (EventBridge rule) ────────────────────
echo ""
echo "▶ Bonus — Adding EventBridge schedule for Medium auto-sync (every 6h)"

aws events put-rule \
  --name "portfolio-medium-sync" \
  --schedule-expression "rate(6 hours)" \
  --state ENABLED \
  --region "$REGION" 2>/dev/null || true

PIPELINE_ARN="arn:aws:codepipeline:$REGION:$ACCOUNT_ID:$PIPELINE_NAME"

# EventBridge needs permission to trigger CodePipeline
aws iam create-role \
  --role-name "portfolio-eventbridge-role" \
  --assume-role-policy-document '{
    "Version":"2012-10-17",
    "Statement":[{"Effect":"Allow","Principal":{"Service":"events.amazonaws.com"},"Action":"sts:AssumeRole"}]
  }' 2>/dev/null || true

aws iam put-role-policy \
  --role-name "portfolio-eventbridge-role" \
  --policy-name "trigger-pipeline" \
  --policy-document "{
    \"Version\":\"2012-10-17\",
    \"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"codepipeline:StartPipelineExecution\",\"Resource\":\"$PIPELINE_ARN\"}]
  }" 2>/dev/null || true

EVENTS_ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/portfolio-eventbridge-role"

aws events put-targets \
  --rule "portfolio-medium-sync" \
  --targets "[{\"Id\":\"pipeline-trigger\",\"Arn\":\"$PIPELINE_ARN\",\"RoleArn\":\"$EVENTS_ROLE_ARN\"}]" \
  --region "$REGION" 2>/dev/null || true

echo "  ✅ EventBridge schedule set — pipeline triggers every 6 hours"

# ── DONE ─────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   ✅  SETUP COMPLETE                                     ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║   S3 Bucket:       $BUCKET_NAME"
echo "║   CloudFront:      https://$CLOUDFRONT_DOMAIN"
echo "║   Pipeline:        $PIPELINE_NAME"
echo "║   Build project:   $CODEBUILD_PROJECT"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║   NEXT: push to GitHub → pipeline triggers automatically  ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "🔗 Monitor pipeline:"
echo "   https://$REGION.console.aws.amazon.com/codesuite/codepipeline/pipelines/$PIPELINE_NAME/view"
