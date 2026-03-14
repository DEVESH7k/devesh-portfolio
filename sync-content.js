/**
 * scripts/sync-content.js
 *
 * 1. Fetches Medium RSS  → extracts latest posts
 * 2. Reads content/linkedin-posts.json
 * 3. Merges both, injects into index.html between marker comments
 * 4. Writes final file to dist/index.html
 */

"use strict";

const https  = require("https");
const http   = require("http");
const fs     = require("fs");
const path   = require("path");

const ROOT            = path.join(__dirname, "..");
const SRC_HTML        = path.join(ROOT, "index.html");
const LINKEDIN_JSON   = path.join(ROOT, "content", "linkedin-posts.json");
const DIST_DIR        = path.join(ROOT, "dist");
const DIST_HTML       = path.join(DIST_DIR, "index.html");
const MEDIUM_USER     = process.env.MEDIUM_USERNAME || "deveshkhatik007";
const MEDIUM_RSS_URL  = `https://medium.com/feed/@${MEDIUM_USER}`;
const MAX_POSTS       = 6;

// ── Fetch helper (follows redirects) ─────────────────────────────────────────

function get(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (redirects === 0) return reject(new Error("Too many redirects"));
        return get(res.headers.location, redirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let body = "";
      res.on("data", c => (body += c));
      res.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

// ── XML helpers ───────────────────────────────────────────────────────────────

function tag(xml, name) {
  // handles both CDATA and plain text
  const re = new RegExp(
    `<${name}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${name}>`,
    "i"
  );
  const m = xml.match(re);
  return m ? (m[1] ?? m[2] ?? "").trim() : "";
}

function allTags(xml, name) {
  const re = new RegExp(
    `<${name}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${name}>`,
    "gi"
  );
  const out = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push((m[1] ?? m[2] ?? "").trim());
  return out;
}

function items(xml) {
  const re = /<item>([\s\S]*?)<\/item>/g;
  const out = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function fmtDate(str) {
  if (!str) return "";
  try {
    return new Date(str).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return ""; }
}

// ── Medium ────────────────────────────────────────────────────────────────────

async function fetchMedium() {
  console.log(`📡  Fetching Medium RSS → ${MEDIUM_RSS_URL}`);
  let xml;
  try {
    xml = await get(MEDIUM_RSS_URL);
  } catch (e) {
    console.warn("⚠️   Medium RSS failed (offline? rate-limited):", e.message);
    return [];
  }

  return items(xml).slice(0, MAX_POSTS).map((item) => {
    const title       = tag(item, "title") || "Untitled";
    // <link> in RSS is weird — it's often a plain text node after <guid>
    const linkMatch   = item.match(/<link>([^<]+)<\/link>/) ||
                        item.match(/<guid[^>]*>([^<]+)<\/guid>/);
    const link        = linkMatch ? linkMatch[1].trim() : "#";
    const pubDate     = tag(item, "pubDate");
    const content     = tag(item, "content:encoded") || tag(item, "description");
    const raw         = stripHtml(content);
    const snippet     = raw.length > 150 ? raw.slice(0, 150) + "…" : raw;
    const categories  = allTags(item, "category");
    const tag_        = categories.find(c => c.length < 30) || "Article";

    return { source: "medium", title, link, pubDate: fmtDate(pubDate), snippet, tag: tag_ };
  });
}

// ── LinkedIn JSON ─────────────────────────────────────────────────────────────

function readLinkedIn() {
  if (!fs.existsSync(LINKEDIN_JSON)) {
    console.warn("⚠️   linkedin-posts.json not found — skipping.");
    return [];
  }
  try {
    const posts = JSON.parse(fs.readFileSync(LINKEDIN_JSON, "utf8"));
    console.log(`📋  Found ${posts.length} LinkedIn post(s) in JSON`);
    return posts.slice(0, MAX_POSTS).map(p => ({ ...p, source: "linkedin" }));
  } catch (e) {
    console.error("❌  linkedin-posts.json is invalid JSON:", e.message);
    return [];
  }
}

// ── Build HTML card ───────────────────────────────────────────────────────────

function card(post) {
  const icon    = post.source === "medium" ? "✍️&nbsp;Medium" : "💼&nbsp;LinkedIn";
  const date    = post.pubDate ? ` · ${post.pubDate}` : "";
  const title   = post.title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const snippet = (post.snippet || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tag     = (post.tag || (post.source === "medium" ? "Article" : "Post"))
                    .replace(/</g, "&lt;");

  return `      <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="blog-card">
        <div class="blog-platform">${icon}${date}</div>
        <div class="blog-title">${title}</div>
        <div class="blog-snippet">${snippet}</div>
        <div class="blog-footer">
          <span class="blog-tag">${tag}</span>
          <span class="blog-arrow">↗</span>
        </div>
      </a>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Validate source HTML exists
  if (!fs.existsSync(SRC_HTML)) {
    console.error(`❌  index.html not found at ${SRC_HTML}`);
    process.exit(1);
  }

  const medium   = await fetchMedium();
  const linkedin = readLinkedIn();

  // LinkedIn posts go first (more recent / curated), then Medium
  const all = [...linkedin, ...medium].slice(0, MAX_POSTS);
  console.log(`✅  Total posts to inject: ${all.length} (${linkedin.length} LinkedIn + ${medium.length} Medium)`);

  const cards   = all.map(card).join("\n");
  const grid    = `<div class="blog-grid">\n${cards}\n    </div>`;

  let html = fs.readFileSync(SRC_HTML, "utf8");

  // Replace blog section between markers
  const marker = /<!-- BLOG_START -->[\s\S]*?<!-- BLOG_END -->/;
  if (!marker.test(html)) {
    console.error([
      "❌  Missing markers in index.html.",
      "    Add these two comments around your blog section:",
      "    <!-- BLOG_START -->",
      "    <!-- BLOG_END -->",
    ].join("\n"));
    process.exit(1);
  }

  html = html.replace(marker, `<!-- BLOG_START -->\n    ${grid}\n    <!-- BLOG_END -->`);

  // Stamp build time (optional marker)
  const ts = new Date().toISOString();
  if (html.includes("<!-- BUILD_TIME -->")) {
    html = html.replace("<!-- BUILD_TIME -->", `<!-- BUILD_TIME: ${ts} -->`);
  }

  // Write output
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(DIST_HTML, html, "utf8");

  const kb = (fs.statSync(DIST_HTML).size / 1024).toFixed(1);
  console.log(`📦  dist/index.html written — ${kb} KB`);
  console.log(`🕐  Build: ${ts}`);
}

main().catch(e => { console.error("❌  Fatal:", e); process.exit(1); });
