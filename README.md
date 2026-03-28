# 🚀 Devesh Khatik — DevSecOps Portfolio

A production-grade 3D portfolio built with **React + Three.js + Tailwind CSS**, deployed on **AWS** with a fully automated CI/CD pipeline.

🔗 **Live:** [d35cca44okwtnr.cloudfront.net](https://d35cca44okwtnr.cloudfront.net)

---

## ⚡ Tech Stack

| Layer | Tools |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS, Framer Motion |
| **3D / Animations** | Three.js, React Three Fiber, Drei |
| **Hosting** | AWS S3 + CloudFront CDN |
| **CI/CD** | AWS CodePipeline + CodeBuild |
| **SEO** | Structured Data (JSON-LD), Open Graph, Sitemap, robots.txt |

---

## 🎯 Features

- **Animated Starfield** — Three.js particle system across the entire site
- **Typing Animation** — Rotating role titles in the hero section
- **Official Tech Logos** — 12 skill icons loaded from devicons CDN
- **Animated Counters** — Numbers count up from 0 when scrolled into view
- **Scroll Progress Bar** — Gradient progress indicator in the navbar
- **Loading Screen** — DK logo pulse animation on initial load
- **Cursor Glow** — Follows mouse movement in the hero
- **Lazy Loading** — All sections below the fold are code-split
- **Resume Download** — One-click PDF download
- **Responsive** — Fully mobile-optimized with hamburger menu
- **SEO Optimized** — Schema.org, OG tags, sitemap, semantic HTML

---

## 📂 Project Structure

```
devesh-portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ExperienceCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   └── StarsCanvas.jsx
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Certifications.jsx
│   │   ├── Challenge.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── constants/
│   │   └── index.js
│   ├── hooks/
│   │   └── useCountUp.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── buildspec.yml
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## 🛠️ Run Locally

```bash
# Clone the repo
git clone https://github.com/DEVESH7k/devesh-portfolio.git
cd devesh-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

---

## 🚀 Deployment (AWS CI/CD)

This project uses a fully automated deployment pipeline:

```
GitHub Push → AWS CodePipeline → CodeBuild → S3 → CloudFront
```

**How it works:**

1. Push code to `main` branch
2. CodePipeline detects the change automatically
3. CodeBuild runs `npm ci` → `npm run build`
4. Built files sync to S3 bucket with optimized cache headers
5. CloudFront cache invalidation triggers
6. Site is live in under 3 minutes

**AWS Resources:**
- **S3 Bucket:** `deveshkhatik-portfolio`
- **CloudFront Distribution:** `EPKFUTJXE9ZUQ`
- **CodePipeline:** `deveshkhatik-portfolio-pipeline`
- **CodeBuild:** `deveshkhatik-portfolio-build`
- **Region:** `ap-south-1`

**Cache Strategy:**
- Static assets (JS/CSS/images): `max-age=31536000` (1 year, immutable)
- `index.html`: `no-cache` (always fresh)
- `sitemap.xml` / `robots.txt`: `no-cache`

---

## 📸 Screenshots

### Hero Section
Animated starfield background with typing effect and cursor glow.

### Tech Stack
Official brand logos for AWS, Kubernetes, Docker, Terraform, Jenkins, SonarQube, Trivy, Azure, Linux, Git, Prometheus, and Grafana.

### Experience Timeline
Animated vertical timeline with scroll-triggered reveals.

### 30 Days of DevSecOps
Showcase of the LinkedIn challenge — stats, phases, and top posts.

---

## 📝 Sections

| Section | Description |
|---|---|
| **Hero** | Typing animation, stats, CTAs, starfield background |
| **About** | Career story + animated count-up stat cards |
| **Skills** | 12 official tech logos in a responsive grid |
| **Experience** | Animated timeline — ProTechmanize + HERE Technologies |
| **Projects** | 4 DevSecOps project cards with hover effects |
| **Certifications** | AWS SAA, CKA, Terraform, DevSecOps roadmap |
| **30 Days Challenge** | Stats, 4 phases, top posts with impressions |
| **Blog** | Latest 6 LinkedIn posts with excerpts |
| **Contact** | Contact form + social links + availability status |
| **Footer** | GitHub, LinkedIn, Email + back to top |

---

## 🧑‍💻 About Me

**Devesh Khatik** — DevSecOps Engineer at ProTechmanize, Mumbai

- 🔧 Managing **156+ CI/CD pipelines** across AWS, Azure & Jenkins
- 🔐 Integrated **SonarQube SAST** + **Trivy CVE scanning** across all pipelines
- ☁️ Managing **50+ customer environments** on EC2
- 📝 Completed **30 Days of DevSecOps** LinkedIn challenge
- 🤝 **3,500+ LinkedIn followers**

---

## 📬 Connect

- **Email:** deveshkhatik007@gmail.com
- **LinkedIn:** [linkedin.com/in/deveshkhatik](https://linkedin.com/in/deveshkhatik)
- **GitHub:** [github.com/DEVESH7k](https://github.com/DEVESH7k)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> *Built with ☕ and `git push` — because a DevOps engineer's portfolio should deploy itself.*
