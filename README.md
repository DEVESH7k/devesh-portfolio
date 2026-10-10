# 🚀 Devesh Khatik — DevSecOps Portfolio

A minimalist, developer-focused portfolio inspired by the classic Brittany Chiang v4 aesthetic, built with **React 19 + Vite 8 + Tailwind CSS 3** and deployed on **AWS** with a fully automated CI/CD pipeline (CodePipeline + CodeBuild to S3 + CloudFront).

🔗 **Live:** [d35cca44okwtnr.cloudfront.net](https://d35cca44okwtnr.cloudfront.net)

---

## ⚡ Tech Stack

| Layer | Tools |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 3, Framer Motion |
| **Typography** | Inter (body), JetBrains Mono (nav, numbers, tags, labels) |
| **Styling** | Custom Dark Navy Design System (`#0a192f`, `#112240`, `#233554`, `#64ffda`) |
| **Hosting** | AWS S3 + CloudFront CDN |
| **CI/CD** | AWS CodePipeline + CodeBuild |
| **SEO & Access** | Semantic HTML, JSON-LD, Open Graph, Sitemap, robots.txt, WCAG AA Contrast |

---

## 🎯 Features

- **Minimalist Dark Navy Aesthetic** — Curated color palette (`#0a192f` navy background, `#64ffda` teal accents, `#ccd6f6` headings, `#8892b0` body text)
- **Sticky Blur Navbar** — Numbered mono links (`01. About`, `02. Experience`, `03. Work`, `04. Contact`) that hide on scroll down, reappear on scroll up, with a mobile slide-in panel
- **Fixed Vertical Rails** — Left social rail (GitHub, LinkedIn, Medium) and right vertical email rail with hover micro-interactions
- **Tabbed Experience** — Vertical tabbed navigation with an animated active indicator and keyboard navigation support
- **Featured Projects (Alternating)** — Left/right alternating cards with navy/teal overlay tints, DevSecOps pipeline/architecture diagram placeholders, and GitHub/external links
- **Noteworthy Projects Grid** — 3-column responsive card grid with hover lift and "Show More" toggle
- **Writing & Certifications** — 4-phase summary of the 30 Days of DevSecOps challenge, linked article cards, and clearly status-tagged certifications
- **Code-Split Lazy Loading** — All sections below the fold are dynamically lazy loaded with React Suspense
- **Resume Download** — Direct link to `/resume.pdf`
- **Accessible & Motion-Respecting** — Keyboard focus-visible rings, skip-to-content link, and strict `prefers-reduced-motion` compliance

---

## 📂 Project Structure

```
devesh-portfolio/
├── public/
│   ├── favicon.svg
│   ├── resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectDiagram.jsx
│   │   └── SocialRails.jsx
│   ├── constants/
│   │   └── index.js
│   ├── hooks/
│   │   └── useCountUp.js
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   └── Writing.jsx
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

---

## 📸 Section Overview

### Hero Section
Clean developer introduction with mono accent greeting, bold headings, DevSecOps engineer summary, and an outlined teal "Check out my work" button.

### About Me
Two-column layout highlighting career progression from HERE Technologies to ProTechmanize, a two-column mono tech stack with teal arrow markers, an offset border photo container with tint clear on hover, and a quiet row of metric counters.

### Where I've Worked
Tabbed experience layout featuring roles at ProTechmanize and HERE Technologies with vertical tabs, an animated teal active indicator, and bullet points detailing shift-left security and automation achievements.

### Some Things I've Built (Work)
Alternating featured project cards with custom architecture and pipeline diagram visual placeholders (OWASP Juice Shop DevSecOps pipeline, Netflix Clone CI/CD on EKS, Swiggy CI/CD on AWS CodePipeline, and EKS with Terraform IaC), followed by a 3-column noteworthy projects card grid.

### Writing & Certifications
Structured overview of the 30 Days of DevSecOps challenge broken into 4 strategic phases, selected articles linked out to LinkedIn, and a verified certifications status tracker.

### Get In Touch (Contact)
Centered minimalist contact section with a mono "04. What's Next?" prompt, friendly invitation, and an outlined teal "Say Hello" button.

---

## 📝 Sections Table

| Section | Identifier | Description |
|---|---|---|
| **Hero** | `#hero` | Intro, role summary, outlined CTA button |
| **About** | `#about` | 01. About Me — story, mono tech list, offset photo card, quiet stat counters |
| **Experience** | `#experience` | 02. Where I've Worked — vertical tabs, animated active indicator, bullet points |
| **Projects** | `#projects` | 03. Some Things I've Built — alternating featured projects, diagrams, noteworthy grid |
| **Writing & Certs** | `#writing` | ~/ Writing & Certifications — 4 challenge phases, LinkedIn post cards, cert status |
| **Contact** | `#contact` | 04. What's Next? — Centered "Say Hello" mailto CTA |
| **Footer** | `footer` | Minimal credit "Designed & Built by Devesh Khatik" |

---

## 🧑‍💻 About Me

**Devesh Khatik** — DevSecOps Engineer at ProTechmanize, Mumbai

- 🔧 Managing **156+ CI/CD pipelines** across AWS, Azure & Jenkins
- 🔐 Integrated **Checkmarx (SAST, SCA, API & Docker Image scanning)** with daily CVE vulnerability tracking
- ☁️ Managing **50+ customer environments** on EC2
- 📝 Completed **30 Days of DevSecOps** LinkedIn challenge
- 🤝 **4,500+ LinkedIn followers**

---

## 📬 Connect

- **Email:** deveshkhatik007@gmail.com
- **LinkedIn:** [linkedin.com/in/deveshkhatik](https://linkedin.com/in/deveshkhatik)
- **GitHub:** [github.com/DEVESH7k](https://github.com/DEVESH7k)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
