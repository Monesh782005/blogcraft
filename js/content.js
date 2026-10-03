/**
 * BlogCraft — content.js
 * Content data, seed articles, homepage rendering, search/filter
 */

'use strict';

// ── Sample Content Data ───────────────────────────────────────────────────────
const SEED_CONTENT = [
  {
    id: 'c_001',
    title: 'Getting Started With Modern JavaScript',
    category: 'Technology',
    description: 'Master the fundamentals of modern JavaScript — from ES6+ syntax and async/await to modules and beyond. Build confidence as a developer.',
    content: `<p>JavaScript has evolved dramatically over the past decade. With the introduction of ES6 and subsequent yearly releases, the language now feels modern, expressive, and powerful. Understanding these changes is essential for any developer building web applications today.</p>

<h2>Arrow Functions & Destructuring</h2>
<p>Arrow functions provide a concise syntax and lexically bind <code>this</code>, making them ideal for callbacks. Combined with destructuring, your code becomes far more readable and maintainable.</p>

<h2>Promises & Async/Await</h2>
<p>Asynchronous programming is at the heart of web development. Promises solved the callback hell problem, but async/await makes asynchronous code read almost like synchronous code — greatly improving developer experience.</p>

<blockquote>JavaScript is the world's most widely-used programming language, and understanding it deeply unlocks an enormous range of opportunities.</blockquote>

<h2>Modules</h2>
<p>ES Modules allow you to split your code into reusable, isolated files. With native browser support and Node.js integration, modules are now the standard way to structure JavaScript applications.</p>

<h3>Key Takeaways</h3>
<ul>
  <li>Use const and let instead of var</li>
  <li>Prefer arrow functions for callbacks</li>
  <li>Use async/await for clean asynchronous code</li>
  <li>Organize code with ES Modules</li>
  <li>Use template literals for string interpolation</li>
</ul>

<p>Whether you're just starting out or looking to solidify your understanding, mastering modern JavaScript is one of the highest-leverage skills you can develop as a web professional.</p>`,
    tags: ['javascript', 'es6', 'web development', 'programming'],
    image: 'assets/images/article-javascript.jpg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-09-15',
    status: 'published',
    views: 1840,
    userId: 'u_demo1',
  },
  {
    id: 'c_002',
    title: 'Cybersecurity Fundamentals for Developers',
    category: 'Security',
    description: 'Every developer must understand cybersecurity basics. This guide covers threats, encryption, secure coding practices, and how to protect your applications.',
    content: `<p>Security is no longer optional. With the increasing frequency of data breaches and cyberattacks, every developer must build security awareness into their workflow from day one. This guide walks you through the fundamentals.</p>

<h2>Common Threat Vectors</h2>
<p>Understanding what you're defending against is the first step. The most common threats include SQL injection, cross-site scripting (XSS), cross-site request forgery (CSRF), and man-in-the-middle attacks.</p>

<h2>Input Validation & Sanitization</h2>
<p>Never trust user input. Always validate and sanitize data on the server side. Client-side validation is great for UX, but it is never a security measure — it can always be bypassed.</p>

<blockquote>Security is a process, not a product. Building secure software requires continuous vigilance and learning.</blockquote>

<h2>HTTPS & Encryption</h2>
<p>Always serve your applications over HTTPS. Use strong encryption protocols and ensure certificates are kept up to date. For sensitive data at rest, use industry-standard encryption algorithms.</p>

<h3>Developer Security Checklist</h3>
<ul>
  <li>Validate and sanitize all inputs</li>
  <li>Use parameterized queries to prevent SQL injection</li>
  <li>Implement Content Security Policy headers</li>
  <li>Store passwords using bcrypt or Argon2</li>
  <li>Keep dependencies updated and audit regularly</li>
  <li>Never expose secrets in source code or version control</li>
</ul>

<p>Security is everyone's responsibility. The earlier it is integrated into the development process, the more effective — and less costly — it becomes.</p>`,
    tags: ['security', 'cybersecurity', 'web security', 'best practices'],
    image: 'assets/images/article-cybersecurity.jpg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-09-22',
    status: 'published',
    views: 2310,
    userId: 'u_demo1',
  },
  {
    id: 'c_003',
    title: 'The Future of Artificial Intelligence',
    category: 'Artificial Intelligence',
    description: 'AI is reshaping every industry. Explore the current landscape, upcoming breakthroughs, ethical considerations, and what this means for the future of work.',
    content: `<p>Artificial Intelligence is no longer a distant vision of science fiction. It is here, it is transforming industries at unprecedented speed, and understanding its trajectory is essential for any professional in the modern economy.</p>

<h2>Where We Are Today</h2>
<p>Large Language Models, computer vision systems, and reinforcement learning agents have reached remarkable capability thresholds. From medical diagnosis to creative content generation, AI systems are now performing tasks that once seemed exclusively within the human domain.</p>

<h2>Emerging Capabilities</h2>
<p>The next wave of AI includes multi-modal systems that simultaneously process text, images, audio, and video. These systems are moving toward more general reasoning capabilities, raising both exciting possibilities and serious ethical questions.</p>

<blockquote>The question is not whether AI will transform the economy, but how we choose to shape that transformation to benefit everyone.</blockquote>

<h2>Ethical Considerations</h2>
<p>As AI capabilities grow, so do concerns about bias, transparency, and accountability. Responsible AI development requires diverse teams, rigorous testing, and clear governance frameworks to ensure these systems serve humanity equitably.</p>

<h3>What This Means for Developers</h3>
<ul>
  <li>AI tools are becoming standard in the developer toolkit</li>
  <li>Understanding AI APIs and integration patterns is essential</li>
  <li>Human judgment and creativity remain irreplaceable</li>
  <li>Ethical AI literacy is becoming a professional expectation</li>
</ul>

<p>The future of AI is not predetermined. The developers, policymakers, and citizens of today are actively shaping it through every decision they make.</p>`,
    tags: ['AI', 'machine learning', 'future tech', 'ethics'],
    image: 'assets/images/article-ai.jpg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-09-28',
    status: 'published',
    views: 3420,
    userId: 'u_demo1',
  },
  {
    id: 'c_004',
    title: 'Modern Web Development Roadmap 2026',
    category: 'Web Development',
    description: 'A comprehensive roadmap for aspiring web developers in 2026. Covers HTML/CSS fundamentals, JavaScript, frontend frameworks, backend, databases, and DevOps.',
    content: `<p>Web development continues to evolve rapidly. Whether you're just starting out or looking to level up your skills, having a clear roadmap makes the journey significantly more manageable and intentional.</p>

<h2>The Foundation: HTML & CSS</h2>
<p>Everything on the web builds on HTML and CSS. Semantic HTML ensures your content is accessible and meaningful. Modern CSS — including Grid, Flexbox, custom properties, and container queries — gives you the power to build any layout imaginable.</p>

<h2>JavaScript Mastery</h2>
<p>JavaScript is the language of the web. Focus on core concepts first: DOM manipulation, events, promises, and modules. Then explore the modern ecosystem — build tools, package managers, and testing frameworks.</p>

<blockquote>The web is for everyone. As a developer, your craft directly impacts how billions of people access information and opportunities.</blockquote>

<h2>Frontend Frameworks</h2>
<p>Once you're comfortable with vanilla JavaScript, frameworks like React, Vue, or Svelte will dramatically accelerate your development. Understanding the underlying concepts makes you a better framework user, regardless of which you choose.</p>

<h3>Recommended Learning Path</h3>
<ol>
  <li>HTML5 & semantic markup</li>
  <li>CSS3, Flexbox, Grid, and responsive design</li>
  <li>JavaScript fundamentals and ES6+</li>
  <li>Version control with Git</li>
  <li>A frontend framework (React recommended)</li>
  <li>Node.js and backend basics</li>
  <li>Databases: SQL and NoSQL</li>
  <li>Deployment and basic DevOps</li>
</ol>

<p>The journey takes time, but every concept you master compounds. Stay consistent, build real projects, and don't be afraid to be a beginner. The web development community is one of the most supportive in tech.</p>`,
    tags: ['web development', 'roadmap', 'frontend', 'backend', 'career'],
    image: 'assets/images/article-webdev.jpg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-01',
    status: 'published',
    views: 4150,
    userId: 'u_demo1',
  },
  {
    id: 'c_005',
    title: 'Cloud Architecture: Building Scalable Systems',
    category: 'Cloud Computing',
    description: 'Learn the principles of cloud architecture. Understand microservices, serverless, containers, and how to design systems that scale gracefully under load.',
    content: `<p>Cloud computing has fundamentally changed how software systems are built and operated. Moving beyond traditional on-premise infrastructure, cloud-native architectures enable teams to build systems that scale automatically, fail gracefully, and evolve rapidly.</p>

<h2>Core Cloud Principles</h2>
<p>Successful cloud architectures are built around a few key principles: elasticity, fault tolerance, loose coupling, and managed services. Each principle guides decisions about how components are designed, deployed, and operated.</p>

<h2>Microservices vs. Monoliths</h2>
<p>The shift to microservices allows teams to deploy, scale, and update individual services independently. However, this comes with significant operational complexity. Understanding when to choose a monolith versus microservices is a critical architectural skill.</p>

<blockquote>Cloud architecture is about making intelligent trade-offs. The right choice depends on your team's size, the nature of your traffic, and your operational maturity.</blockquote>

<h2>Serverless Computing</h2>
<p>Serverless architectures — Functions as a Service — allow you to run code without managing servers. This dramatically reduces operational overhead for many workloads, though it introduces its own constraints around cold starts, execution limits, and observability.</p>

<h3>Key Cloud Architecture Patterns</h3>
<ul>
  <li>Event-driven architectures for decoupled services</li>
  <li>CQRS and Event Sourcing for complex domains</li>
  <li>Circuit breakers for fault tolerance</li>
  <li>Saga pattern for distributed transactions</li>
  <li>API Gateway for unified service access</li>
</ul>

<p>Cloud architecture is as much about organizational structure as it is about technology. The best architectures evolve iteratively alongside the teams that build and operate them.</p>`,
    tags: ['cloud', 'AWS', 'architecture', 'scalability', 'microservices'],
    image: 'assets/images/article-cloud.jpg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-02',
    status: 'published',
    views: 1920,
    userId: 'u_demo1',
  },
  {
    id: 'c_006',
    title: 'Building a Design System From Scratch',
    category: 'Design',
    description: 'Design systems are the backbone of consistent, scalable user interfaces. Learn how to build tokens, components, and documentation that teams actually use.',
    content: `<p>A design system is more than a component library. It is a shared language between designers and developers — a foundation that allows teams to build consistent, accessible, and scalable products with confidence and speed.</p>

<h2>Design Tokens: The Foundation</h2>
<p>Design tokens are the atomic values of your visual design: colors, spacing, typography, shadows, border radii. Defining these as named variables — in CSS custom properties, JSON, or your design tool — creates a single source of truth that both code and design reference.</p>

<h2>Component Architecture</h2>
<p>Well-designed components are composable, accessible, and well-documented. They should expose clear APIs that allow flexibility without requiring consumers to fight against them. The best components solve 80% of cases elegantly and get out of the way for the remaining 20%.</p>

<blockquote>A design system is not finished when it is launched. It is only beginning. Continuous iteration based on real product needs is what makes it genuinely valuable.</blockquote>

<h2>Documentation That Gets Used</h2>
<p>The best component library in the world is useless if no one knows how to use it. Invest in live documentation with interactive examples, usage guidelines, do's and don'ts, and accessibility notes. Your documentation is a product in itself.</p>

<h3>Design System Checklist</h3>
<ul>
  <li>Define your color palette and semantic tokens</li>
  <li>Establish a type scale and spacing system</li>
  <li>Build base components: Button, Input, Card, Modal</li>
  <li>Write accessibility guidelines for each component</li>
  <li>Publish a changelog and versioning strategy</li>
  <li>Create a contribution guide for team adoption</li>
</ul>

<p>The ROI of a design system compounds over time. Initial investment in tokens and components pays dividends every time a new feature is built faster, more consistently, and with fewer defects.</p>`,
    tags: ['design system', 'UI', 'UX', 'components', 'CSS'],
    image: 'assets/images/article-design-system.svg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-03',
    status: 'draft',
    views: 0,
    userId: 'u_demo1',
  },
  {
    id: 'c_007',
    title: 'Full Stack Architecture in 2026: Bridging Frontend State and Backend Services',
    category: 'Web Development',
    description: 'A deep dive into modern full-stack architecture patterns — connecting React/Vue frontend state managers to scalable Node.js backend services with type-safe API contracts.',
    content: `<p>Full stack development in 2026 is no longer just about knowing both frontend and backend. It demands a coherent architectural vision that keeps both sides of the stack tightly coordinated, type-safe, and maintainable at scale.</p>

<h2>The State Management Challenge</h2>
<p>Modern frontends built with React, Vue, or Svelte manage increasingly complex state. Server state, UI state, form state, and cache state each have different lifecycles and synchronization requirements. Libraries like TanStack Query, Zustand, and Jotai have emerged to handle these distinct concerns elegantly.</p>

<h2>Type-Safe API Contracts</h2>
<p>The most significant architectural shift in 2026 is the widespread adoption of end-to-end type safety. Tools like tRPC, GraphQL with code generation, and OpenAPI-to-TypeScript workflows eliminate an entire class of runtime bugs by ensuring that the data shapes your frontend expects are guaranteed by the backend contract at compile time.</p>

<blockquote>The best full-stack architectures are not about which framework you use — they are about maintaining a single source of truth that both your frontend and backend can trust unconditionally.</blockquote>

<h2>Backend Service Patterns</h2>
<p>Node.js has matured significantly as a backend platform. With native ESM support, mature TypeScript integration, and production-grade frameworks like Fastify, NestJS, and Hono, backend development feels as productive as frontend work. The key is designing service boundaries that map cleanly to frontend data requirements.</p>

<h2>Bridging the Gap: Real-Time Sync</h2>
<p>WebSockets, Server-Sent Events, and emerging standards like Partykit have made real-time state synchronization practical for most applications. Choosing the right synchronization primitive depends on your consistency requirements, network conditions, and team familiarity.</p>

<h3>Architecture Checklist for 2026</h3>
<ul>
  <li>Define your API contract first — let it drive both frontend and backend implementation</li>
  <li>Use a schema validation library (Zod, Valibot) shared across the stack</li>
  <li>Separate server state from UI state in your frontend</li>
  <li>Implement optimistic updates for perceived performance</li>
  <li>Design for offline-first where user experience demands it</li>
  <li>Monitor your API with observability tooling from day one</li>
</ul>

<p>The developers who thrive in 2026 are those who can think holistically across the full stack — understanding not just how to write code on each side, but how the two sides communicate, stay consistent, and evolve together over time.</p>`,
    tags: ['full stack', 'architecture', 'react', 'nodejs', 'api', 'typescript'],
    image: 'assets/images/article-fullstack-2026.jpg',
    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-03',
    status: 'published',
    views: 2780,
    userId: 'u_demo1',
  },
];

// ── Patch: correct images in localStorage for articles whose image was updated ──
// Runs on every page load to ensure localStorage always reflects the correct
// image for each article title. Only touches articles explicitly listed here.
function patchArticleImages() {
  const PATCHES = [
    {
      title: 'Full Stack Architecture in 2026: Bridging Frontend State and Backend Services',
      image: 'assets/images/article-fullstack-2026.jpg',
    },
    {
      title: 'Building a Design System From Scratch',
      image: 'assets/images/article-design-system.svg',
    },
  ];
  const all = Storage.getContent();
  if (!all || all.length === 0) return;
  let changed = false;
  all.forEach(item => {
    const patch = PATCHES.find(p => p.title === item.title);
    if (patch && item.image !== patch.image) {
      item.image = patch.image;
      changed = true;
    }
  });
  if (changed) Storage.setContent(all);
}

// ── Seed content into localStorage ───────────────────────────────────────────
function seedContent() {
  const existing = Storage.getContent();
  if (existing.length === 0) Storage.setContent(SEED_CONTENT);
  patchArticleImages();
}

function getAllContent() {
  const stored = Storage.getContent();
  if (stored.length === 0) { Storage.setContent(SEED_CONTENT); return SEED_CONTENT; }
  patchArticleImages(); // ensure correct images for all patched articles
  return Storage.getContent();
}

function getPublished() {
  return getAllContent().filter(c => c.status === 'published');
}

function getById(id) {
  return getAllContent().find(c => c.id === id) || null;
}

function saveContent(item) {
  const all = getAllContent();
  const idx = all.findIndex(c => c.id === item.id);
  if (idx >= 0) all[idx] = item;
  else all.unshift(item);
  Storage.setContent(all);
}

function deleteContent(id) {
  const all = getAllContent().filter(c => c.id !== id);
  Storage.setContent(all);
}

window.ContentDB = { getAllContent, getPublished, getById, saveContent, deleteContent, seedContent };

// ── Card Renderer ─────────────────────────────────────────────────────────────
function renderCard(item) {
  const dateStr = item.date ? new Date(item.date).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '';
  return `
    <article class="article-card fade-up" data-id="${item.id}" tabindex="0" role="button" aria-label="Read article: ${item.title}">
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='assets/images/article-webdev.jpg'">
        <span class="card-category">${item.category}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer">
          <div class="card-author">
            <div class="card-avatar" aria-hidden="true">${item.authorInitials || 'LM'}</div>
            <div>
              <div style="font-weight:600;color:var(--text-secondary);">${item.author}</div>
              <div>${dateStr}</div>
            </div>
          </div>
          <a href="details.html?id=${item.id}" class="card-read-more" aria-label="Read more about ${item.title}">
            Read more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

// ── Homepage: Search + Filter + Render ───────────────────────────────────────
function initHomepageContent() {
  const grid       = document.getElementById('contentGrid');
  const searchIn   = document.getElementById('searchInput');
  const categoryEl = document.getElementById('categoryFilter');
  const sortEl     = document.getElementById('sortFilter');
  const countEl    = document.getElementById('resultCount');
  if (!grid) return;

  seedContent();
  let allItems = getPublished();

  // Populate category filter dynamically
  if (categoryEl) {
    const cats = [...new Set(allItems.map(c => c.category))].sort();
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      categoryEl.appendChild(opt);
    });
  }

  function render() {
    const q    = searchIn ? searchIn.value.toLowerCase().trim() : '';
    const cat  = categoryEl ? categoryEl.value : 'all';
    const sort = sortEl ? sortEl.value : 'newest';

    let filtered = allItems.filter(item => {
      const matchQ   = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.join(' ').toLowerCase().includes(q);
      const matchCat = cat === 'all' || item.category === cat;
      return matchQ && matchCat;
    });

    filtered.sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date);
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sort === 'popular') return (b.views || 0) - (a.views || 0);
      if (sort === 'az') return a.title.localeCompare(b.title);
      return 0;
    });

    if (countEl) countEl.textContent = `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <div class="empty-icon">🔍</div>
          <h3>No articles found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>`;
    } else {
      grid.innerHTML = filtered.map(renderCard).join('');
      // Re-observe for scroll animations
      if (window.initScrollAnimations) initScrollAnimations();
    }

    // Card click → details
    grid.querySelectorAll('.article-card').forEach(card => {
      const go = () => window.location.href = `details.html?id=${card.dataset.id}`;
      card.addEventListener('click', go);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  if (searchIn) searchIn.addEventListener('input', render);
  if (categoryEl) categoryEl.addEventListener('change', render);
  if (sortEl) sortEl.addEventListener('change', render);

  render();
}

// ── Details Page ──────────────────────────────────────────────────────────────
function initDetailsPage() {
  const params = new URLSearchParams(location.search);
  const id     = params.get('id');
  const mainEl = document.getElementById('articleMain');
  if (!mainEl) return;

  seedContent();
  const article = getById(id);

  if (!article) {
    mainEl.innerHTML = `<div class="empty-state" style="padding:100px 0;"><div class="empty-icon">📭</div><h2>Article not found</h2><p><a href="index.html">← Back to Home</a></p></div>`;
    return;
  }

  // Increment view count
  article.views = (article.views || 0) + 1;
  saveContent(article);

  // Hero
  const heroImg = document.getElementById('detailsHeroImg');
  const heroOverlayContent = document.getElementById('detailsHeroContent');
  if (heroImg) { heroImg.src = article.image; heroImg.alt = article.title; }
  if (heroOverlayContent) {
    const dateStr = article.date ? new Date(article.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric'}) : '';
    heroOverlayContent.innerHTML = `
      <span class="article-category-badge">${article.category}</span>
      <h1 class="article-title" style="font-size:clamp(1.6rem,4vw,2.6rem)">${article.title}</h1>
      <div class="article-meta">
        <div class="meta-author">
          <div class="card-avatar" style="width:32px;height:32px;font-size:12px;">${article.authorInitials}</div>
          <span>${article.author}</span>
        </div>
        <span>📅 ${dateStr}</span>
        <span>👁 ${(article.views||0).toLocaleString()} views</span>
      </div>`;
  }

  // Body
  const bodyEl = document.getElementById('articleBody');
  if (bodyEl) bodyEl.innerHTML = article.content || `<p>${article.description}</p>`;

  // Tags
  const tagsEl = document.getElementById('articleTags');
  if (tagsEl && article.tags?.length) {
    tagsEl.innerHTML = article.tags.map(t => `<span class="badge badge-tech">#${t}</span>`).join('');
  }

  // Related
  const relatedEl = document.getElementById('relatedArticles');
  if (relatedEl) {
    const related = getPublished().filter(c => c.id !== article.id && c.category === article.category).slice(0, 3);
    const others  = related.length < 3 ? getPublished().filter(c => c.id !== article.id && !related.find(r=>r.id===c.id)).slice(0, 3 - related.length) : [];
    const items   = [...related, ...others];
    relatedEl.innerHTML = items.map(r => `
      <div class="related-card" role="button" tabindex="0" onclick="location.href='details.html?id=${r.id}'" aria-label="${r.title}">
        <img src="${r.image}" alt="${r.title}" loading="lazy" onerror="this.src='assets/images/article-webdev.jpg'">
        <div class="related-card-info">
          <div class="related-card-cat">${r.category}</div>
          <div class="related-card-title">${r.title}</div>
        </div>
      </div>`).join('');
  }

  // Update page title
  document.title = `${article.title} — BlogCraft`;
}

window.ContentDB.renderCard = renderCard;

document.addEventListener('DOMContentLoaded', () => {
  seedContent();
  initHomepageContent();
  initDetailsPage();
});
