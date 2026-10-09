/**
 * BlogCraft — content.js
 * Content database, MongoDB integration, homepage rendering,
 * search/filter, details page
 */

'use strict';

const API_BASE_URL = "https://blogcraft-lfmi.onrender.com/api";


// ══════════════════════════════════════════════════════════════════════════════
// LOCAL SEED CONTENT
// ══════════════════════════════════════════════════════════════════════════════

const SEED_CONTENT = [
  {
    id: 'c_001',
    title: 'Getting Started With Modern JavaScript',
    category: 'Technology',

    description:
      'Master the fundamentals of modern JavaScript — from ES6+ syntax and async/await to modules and beyond. Build confidence as a developer.',

    content: `
      <p>JavaScript has evolved dramatically over the past decade. With the introduction of ES6 and subsequent yearly releases, the language now feels modern, expressive, and powerful. Understanding these changes is essential for any developer building web applications today.</p>

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

      <p>Whether you're just starting out or looking to solidify your understanding, mastering modern JavaScript is one of the highest-leverage skills you can develop as a web professional.</p>
    `,

    tags: [
      'javascript',
      'es6',
      'web development',
      'programming'
    ],

    image:
      'assets/images/article-javascript.jpg',

    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-09-15',
    status: 'published',
    views: 1840,
    userId: 'u_demo1'
  },


  {
    id: 'c_002',
    title: 'Cybersecurity Fundamentals for Developers',
    category: 'Security',

    description:
      'Every developer must understand cybersecurity basics. This guide covers threats, encryption, secure coding practices, and how to protect your applications.',

    content: `
      <p>Security is no longer optional. With the increasing frequency of data breaches and cyberattacks, every developer must build security awareness into their workflow from day one.</p>

      <h2>Common Threat Vectors</h2>
      <p>Understanding what you're defending against is the first step. The most common threats include SQL injection, cross-site scripting (XSS), cross-site request forgery (CSRF), and man-in-the-middle attacks.</p>

      <h2>Input Validation & Sanitization</h2>
      <p>Never trust user input. Always validate and sanitize data on the server side.</p>

      <blockquote>Security is a process, not a product.</blockquote>

      <h2>HTTPS & Encryption</h2>
      <p>Always serve your applications over HTTPS and use strong encryption protocols.</p>

      <h3>Developer Security Checklist</h3>

      <ul>
        <li>Validate and sanitize all inputs</li>
        <li>Use parameterized queries</li>
        <li>Implement Content Security Policy headers</li>
        <li>Store passwords securely</li>
        <li>Keep dependencies updated</li>
        <li>Never expose secrets in source code</li>
      </ul>
    `,

    tags: [
      'security',
      'cybersecurity',
      'web security'
    ],

    image:
      'assets/images/article-cybersecurity.jpg',

    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-09-22',
    status: 'published',
    views: 2310,
    userId: 'u_demo1'
  },


  {
    id: 'c_003',
    title: 'The Future of Artificial Intelligence',
    category: 'Artificial Intelligence',

    description:
      'AI is reshaping every industry. Explore the current landscape, upcoming breakthroughs, ethical considerations, and what this means for the future of work.',

    content: `
      <p>Artificial Intelligence is transforming industries at unprecedented speed.</p>

      <h2>Where We Are Today</h2>
      <p>Large Language Models, computer vision systems, and reinforcement learning agents have reached remarkable capability thresholds.</p>

      <h2>Emerging Capabilities</h2>
      <p>The next wave of AI includes multi-modal systems that process text, images, audio, and video.</p>

      <blockquote>The question is not whether AI will transform the economy, but how we choose to shape that transformation.</blockquote>

      <h2>Ethical Considerations</h2>
      <p>Responsible AI development requires diverse teams, rigorous testing, and clear governance frameworks.</p>
    `,

    tags: [
      'AI',
      'machine learning',
      'future tech',
      'ethics'
    ],

    image:
      'assets/images/article-ai.jpg',

    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-09-28',
    status: 'published',
    views: 3420,
    userId: 'u_demo1'
  },


  {
    id: 'c_004',
    title: 'Modern Web Development Roadmap 2026',
    category: 'Web Development',

    description:
      'A comprehensive roadmap for aspiring web developers in 2026. Covers HTML/CSS fundamentals, JavaScript, frontend frameworks, backend, databases, and DevOps.',

    content: `
      <p>Web development continues to evolve rapidly. Having a clear roadmap makes the journey significantly more manageable.</p>

      <h2>The Foundation: HTML & CSS</h2>
      <p>Everything on the web builds on HTML and CSS.</p>

      <h2>JavaScript Mastery</h2>
      <p>JavaScript is the language of the web. Focus on core concepts first.</p>

      <h2>Frontend Frameworks</h2>
      <p>Once you're comfortable with vanilla JavaScript, frameworks like React, Vue, or Svelte can accelerate development.</p>

      <h3>Recommended Learning Path</h3>

      <ol>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>Git</li>
        <li>Frontend framework</li>
        <li>Node.js</li>
        <li>Databases</li>
        <li>Deployment</li>
      </ol>
    `,

    tags: [
      'web development',
      'roadmap',
      'frontend',
      'backend',
      'career'
    ],

    image:
      'assets/images/article-webdev.jpg',

    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-01',
    status: 'published',
    views: 4150,
    userId: 'u_demo1'
  },


  {
    id: 'c_005',
    title: 'Cloud Architecture: Building Scalable Systems',
    category: 'Cloud Computing',

    description:
      'Learn the principles of cloud architecture. Understand microservices, serverless, containers, and how to design systems that scale gracefully under load.',

    content: `
      <p>Cloud computing has fundamentally changed how software systems are built and operated.</p>

      <h2>Core Cloud Principles</h2>
      <p>Successful cloud architectures are built around elasticity, fault tolerance, loose coupling, and managed services.</p>

      <h2>Microservices vs. Monoliths</h2>
      <p>Understanding when to choose a monolith versus microservices is a critical architectural skill.</p>

      <h2>Serverless Computing</h2>
      <p>Serverless architectures allow you to run code without managing servers.</p>
    `,

    tags: [
      'cloud',
      'AWS',
      'architecture',
      'scalability'
    ],

    image:
      'assets/images/article-cloud.jpg',

    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-02',
    status: 'published',
    views: 1920,
    userId: 'u_demo1'
  },


  {
    id: 'c_006',
    title: 'Building a Design System From Scratch',
    category: 'Design',

    description:
      'Design systems are the backbone of consistent, scalable user interfaces.',

    content: `
      <p>A design system is more than a component library. It is a shared language between designers and developers.</p>

      <h2>Design Tokens</h2>
      <p>Design tokens define colors, spacing, typography, shadows, and border radii.</p>

      <h2>Component Architecture</h2>
      <p>Well-designed components are composable, accessible, and documented.</p>
    `,

    tags: [
      'design system',
      'UI',
      'UX',
      'components',
      'CSS'
    ],

    image:
      'assets/images/article-design-system.svg',

    author: 'Alex Morgan',
    authorInitials: 'AM',
    date: '2026-10-03',
    status: 'draft',
    views: 0,
    userId: 'u_demo1'
  }
];


// ══════════════════════════════════════════════════════════════════════════════
// IMAGE MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

const BLOGCRAFT_IMAGES = [
  'assets/images/article-javascript.jpg',
  'assets/images/article-cybersecurity.jpg',
  'assets/images/article-ai.jpg',
  'assets/images/article-webdev.jpg',
  'assets/images/article-cloud.jpg',
  'assets/images/article-design-system.svg',
  'assets/images/article-javascript-backend.jpg',
  'assets/images/article-backend-api.jpg',
  'assets/images/article-fullstack-dev.jpg'
];


/*
 * Images that are known to NOT exist on disk.
 * Any article referencing these will be reassigned
 * a proper unique image automatically.
 */
const BROKEN_IMAGES = new Set([
  'assets/images/article-js.jpg'
]);


/*
 * Articles that have been permanently removed.
 * Filtered out from all content sources —
 * including any stale localStorage cache —
 * so they never surface in the UI again.
 */
const REMOVED_ARTICLE_IDS = new Set([
  'c_007'
]);

const REMOVED_ARTICLE_TITLES = new Set([
  'full stack architecture in 2026: bridging frontend state and backend services'
]);

function isRemovedArticle(article) {
  return (
    REMOVED_ARTICLE_IDS.has(String(article.id || '')) ||
    REMOVED_ARTICLE_TITLES.has(
      String(article.title || '').trim().toLowerCase()
    )
  );
}


function createUniqueImage(title, usedImages) {

  const name =
    String(title || '').toLowerCase();


  // ── Seed / local article mappings ────────────────────────

  if (
    name.includes('getting started with modern javascript') ||
    name === 'getting started with modern javascript'
  ) {
    const image = 'assets/images/article-javascript.jpg';
    if (!usedImages.has(image)) return image;
  }


  if (name.includes('cybersecurity')) {
    const image = 'assets/images/article-cybersecurity.jpg';
    if (!usedImages.has(image)) return image;
  }


  if (
    name.includes('artificial intelligence') ||
    name.includes('future of artificial intelligence')
  ) {
    const image = 'assets/images/article-ai.jpg';
    if (!usedImages.has(image)) return image;
  }


  if (name.includes('web development roadmap')) {
    const image = 'assets/images/article-webdev.jpg';
    if (!usedImages.has(image)) return image;
  }


  if (name.includes('cloud architecture')) {
    const image = 'assets/images/article-cloud.jpg';
    if (!usedImages.has(image)) return image;
  }


  if (name.includes('design system')) {
    const image = 'assets/images/article-design-system.svg';
    if (!usedImages.has(image)) return image;
  }



  // ── Backend / MongoDB article mappings ───────────────────
  // "Getting Started With JavaScript" (backend)
  if (
    name === 'getting started with javascript' ||
    (name.includes('getting started') && name.includes('javascript') &&
      !name.includes('modern javascript'))
  ) {
    const image = 'assets/images/article-javascript-backend.jpg';
    if (!usedImages.has(image)) return image;
  }


  // "My First Blog From Backend" – Node.js / REST API theme
  if (
    name.includes('first blog from backend') ||
    name.includes('my first blog')
  ) {
    const image = 'assets/images/article-backend-api.jpg';
    if (!usedImages.has(image)) return image;
  }


  // "Full-stack web developer" (backend career article)
  if (
    name === 'full-stack web developer' ||
    name === 'full stack web developer' ||
    (name.includes('full') && name.includes('stack') &&
      name.includes('developer') && !name.includes('architecture'))
  ) {
    const image = 'assets/images/article-fullstack-dev.jpg';
    if (!usedImages.has(image)) return image;
  }


  // ── Generic fallback: any unused image ───────────────────
  const available =
    BLOGCRAFT_IMAGES.find(
      image => !usedImages.has(image)
    );

  if (available) {
    return available;
  }


  // No image available at all
  return null;
}


// ══════════════════════════════════════════════════════════════════════════════
// MONGODB → BLOGCRAFT FORMAT
// ══════════════════════════════════════════════════════════════════════════════

function normalizeBlog(blog) {

  const authorName =
    typeof blog.author === 'object'
      ? blog.author?.name || 'BlogCraft Author'
      : blog.author || 'BlogCraft Author';


  const authorEmail =
    typeof blog.author === 'object'
      ? blog.author?.email || ''
      : '';


  const initials =
    authorName
      .split(' ')
      .filter(Boolean)
      .map(name => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();


  const plainText =
    String(blog.content || '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();


  return {

    id:
      blog._id ||
      blog.id,

    title:
      blog.title ||
      'Untitled Article',

    category:
      blog.category ||
      'General',

    description:
      blog.description ||
      plainText.slice(0, 180) ||
      'Read this article on BlogCraft.',

    content:
      blog.content ||
      '',

    tags:
      Array.isArray(blog.tags)
        ? blog.tags
        : [],

    image:
      (blog.image && !BROKEN_IMAGES.has(blog.image))
        ? blog.image
        : null,

    author:
      authorName,

    authorInitials:
      initials ||
      'BC',

    authorEmail,

    date:
      blog.createdAt ||
      blog.date ||
      new Date().toISOString(),

    status:
      blog.status ||
      'published',

    views:
      Number(blog.views || 0),

    userId:
      typeof blog.author === 'object'
        ? blog.author?._id
        : blog.author
  };
}


// ══════════════════════════════════════════════════════════════════════════════
// BACKEND
// ══════════════════════════════════════════════════════════════════════════════

async function fetchBlogsFromBackend() {

  try {

    const response =
      await fetch(
        `${API_BASE_URL}/blogs`
      );


    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }


    const data =
      await response.json();


    if (!Array.isArray(data.blogs)) {
      throw new Error(
        'Invalid blog response'
      );
    }


    return data.blogs.map(
      normalizeBlog
    );

  } catch (error) {

    console.error(
      'Failed to fetch blogs from backend:',
      error
    );

    return null;
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// LOCAL STORAGE
// ══════════════════════════════════════════════════════════════════════════════

function getAllLocalContent() {

  const stored =
    Storage.getContent();


  if (
    Array.isArray(stored) &&
    stored.length > 0
  ) {

    /*
     * Sanitize any cached articles that still hold
     * broken / non-existent image paths.
     */
    const hasBroken = stored.some(
      a => a.image && BROKEN_IMAGES.has(a.image)
    );

    if (hasBroken) {

      const usedImages = new Set(
        stored
          .filter(a => a.image && !BROKEN_IMAGES.has(a.image))
          .map(a => a.image)
      );

      const sanitized = stored.map(a => {

        if (a.image && BROKEN_IMAGES.has(a.image)) {

          const fixed = createUniqueImage(
            a.title,
            usedImages
          );

          if (fixed) usedImages.add(fixed);

          return { ...a, image: fixed || '' };
        }

        return a;
      });

      /*
       * Also purge any removed articles that may
       * have been cached in a previous session.
       */
      const purged =
        sanitized.filter(a => !isRemovedArticle(a));

      Storage.setContent(purged);

      return purged;
    }


    /*
     * Purge any removed articles from the
     * cached localStorage array.
     */
    const purged =
      stored.filter(a => !isRemovedArticle(a));

    if (purged.length !== stored.length) {
      Storage.setContent(purged);
    }

    return purged;
  }


  const cleanSeed =
    SEED_CONTENT.filter(a => !isRemovedArticle(a));

  Storage.setContent(cleanSeed);


  return [
    ...cleanSeed
  ];
}


function seedContent() {

  const existing =
    Storage.getContent();


  if (
    !Array.isArray(existing) ||
    existing.length === 0
  ) {

    Storage.setContent(
      SEED_CONTENT
    );
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// MERGE LOCAL + MONGODB
// ══════════════════════════════════════════════════════════════════════════════

let backendContent = null;


async function refreshBackendContent() {

  const backendBlogs =
    await fetchBlogsFromBackend();


  /*
   * If backend is unavailable,
   * keep local BlogCraft articles.
   */
  if (
    !backendBlogs ||
    backendBlogs.length === 0
  ) {

    console.warn(
      'Backend unavailable. Keeping local BlogCraft content.'
    );

    backendContent =
      getAllLocalContent();

    return backendContent;
  }


  const localArticles =
    getAllLocalContent();


  const combined =
    [...localArticles];


  /*
   * Add MongoDB articles.
   * Do NOT delete the original 7 articles.
   */
  backendBlogs.forEach(
    backendArticle => {

      const existingIndex =
        combined.findIndex(
          localArticle => {

            /*
             * Match by MongoDB ID
             */
            if (
              localArticle.id &&
              backendArticle.id &&
              String(localArticle.id) ===
              String(backendArticle.id)
            ) {

              return true;
            }


            /*
             * Match by title
             */
            return (
              String(
                localArticle.title || ''
              )
                .trim()
                .toLowerCase()
              ===
              String(
                backendArticle.title || ''
              )
                .trim()
                .toLowerCase()
            );
          }
        );


      if (existingIndex >= 0) {

        /*
         * Update existing article with backend data,
         * while preserving important local information.
         */
        const oldArticle =
          combined[existingIndex];


        combined[existingIndex] = {

          ...oldArticle,

          ...backendArticle,

          /*
           * Keep local image if backend image
           * is missing.
           */
          image:
            backendArticle.image ||
            oldArticle.image
        };

      } else {

        combined.push(
          backendArticle
        );
      }
    }
  );


  /*
   * Make sure articles don't all use the same image.
   */
  const usedImages =
    new Set();


  const finalArticles =
    combined.map(
      article => {

        let image =
          article.image;


        /*
         * Treat broken / non-existent image paths
         * the same as a missing image — so they
         * get reassigned below.
         */
        if (image && BROKEN_IMAGES.has(image)) {
          image = null;
        }


        /*
         * Title-based lookup runs first so that
         * every article with a known title always
         * receives its dedicated image, even if
         * the stored image path happened to be
         * correct and not yet in usedImages.
         *
         * This is the primary uniqueness guarantee.
         */
        const titledImage =
          createUniqueImage(
            article.title,
            usedImages
          );


        if (titledImage) {
          usedImages.add(titledImage);
          return { ...article, image: titledImage };
        }


        /*
         * If title lookup returned nothing
         * (all slots used), keep the stored image
         * if it exists and hasn't been taken yet.
         */
        if (
          image &&
          !usedImages.has(image)
        ) {

          usedImages.add(image);

          return {
            ...article,
            image
          };
        }


        /*
         * Last resort: no unique image found.
         * Leave image blank rather than duplicating.
         */
        return {
          ...article,
          image: image || ''
        };
      }
    );


  backendContent =
    finalArticles;


  /*
   * Save combined data locally.
   * This means Dashboard can also use it.
   */
  Storage.setContent(
    finalArticles
  );


  console.log(
    `BlogCraft: ${finalArticles.length} articles loaded`
  );


  return finalArticles;
}


// ══════════════════════════════════════════════════════════════════════════════
// CONTENT DB
// ══════════════════════════════════════════════════════════════════════════════

function getAllContent() {

  if (
    Array.isArray(backendContent)
  ) {

    return backendContent;
  }


  return getAllLocalContent();
}


function getPublished() {

  return getAllContent().filter(
    article =>
      article.status === 'published'
  );
}


function getById(id) {

  return getAllContent().find(
    article =>
      String(article.id) ===
      String(id)
  ) || null;
}


function saveContent(item) {

  const all =
    getAllContent();


  const index =
    all.findIndex(
      article =>
        String(article.id) ===
        String(item.id)
    );


  if (index >= 0) {

    all[index] =
      item;

  } else {

    all.unshift(
      item
    );
  }


  backendContent =
    all;


  Storage.setContent(
    all
  );
}


function deleteContent(id) {

  const all =
    getAllContent().filter(
      article =>
        String(article.id) !==
        String(id)
    );


  backendContent =
    all;


  Storage.setContent(
    all
  );
}


window.ContentDB = {

  getAllContent,

  getPublished,

  getById,

  saveContent,

  deleteContent,

  seedContent,

  refreshBackendContent
};


// ══════════════════════════════════════════════════════════════════════════════
// CARD RENDERER
// ══════════════════════════════════════════════════════════════════════════════

function renderCard(item) {

  const dateStr =
    item.date
      ? new Date(
        item.date
      ).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }
      )
      : '';


  return `

    <article
      class="article-card fade-up"
      data-id="${item.id}"
      tabindex="0"
      role="button"
      aria-label="Read article: ${item.title}"
    >

      <div class="card-image">

        ${item.image
      ? `
              <img
                src="${item.image}"
                alt="${item.title}"
                loading="lazy"
                onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#171d31,#252d52);color:white;font-size:42px;\'>✨</div>'"
              >
            `
      : `
              <div
                style="
                  width:100%;
                  height:100%;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  background:linear-gradient(
                    135deg,
                    #171d31,
                    #252d52
                  );
                  color:white;
                  font-size:42px;
                "
              >
                ✨
              </div>
            `
    }

        <span class="card-category">
          ${item.category}
        </span>

      </div>


      <div class="card-body">

        <h3 class="card-title">
          ${item.title}
        </h3>


        <p class="card-desc">
          ${item.description}
        </p>


        <div class="card-footer">

          <div class="card-author">

            <div
              class="card-avatar"
              aria-hidden="true"
            >
              ${item.authorInitials || 'BC'}
            </div>


            <div>

              <div
                style="
                  font-weight:600;
                  color:var(--text-secondary);
                "
              >
                ${item.author || 'BlogCraft Author'}
              </div>


              <div>
                ${dateStr}
              </div>

            </div>

          </div>


          <a
            href="details.html?id=${item.id}"
            class="card-read-more"
            aria-label="Read more about ${item.title}"
          >
            Read more
            <span aria-hidden="true">
              →
            </span>
          </a>

        </div>

      </div>

    </article>
  `;
}


// ══════════════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ══════════════════════════════════════════════════════════════════════════════

async function initHomepageContent() {

  const grid =
    document.getElementById(
      'contentGrid'
    );


  const searchIn =
    document.getElementById(
      'searchInput'
    );


  const categoryEl =
    document.getElementById(
      'categoryFilter'
    );


  const sortEl =
    document.getElementById(
      'sortFilter'
    );


  const countEl =
    document.getElementById(
      'resultCount'
    );


  if (!grid) {
    return;
  }


  seedContent();


  /*
   * Loading state
   */
  grid.innerHTML = `

    <div
      class="empty-state"
      style="grid-column:1/-1;"
    >

      <div class="empty-icon">
        ⏳
      </div>

      <h3>
        Loading articles...
      </h3>

      <p>
        Fetching the latest articles from BlogCraft.
      </p>

    </div>

  `;


  /*
   * Load local + MongoDB content
   */
  await refreshBackendContent();


  let allItems =
    getPublished();


  /*
   * Category filter
   */
  if (categoryEl) {

    categoryEl
      .querySelectorAll(
        'option:not([value="all"])'
      )
      .forEach(
        option =>
          option.remove()
      );


    const categories =
      [
        ...new Set(
          allItems.map(
            article =>
              article.category
          )
        )
      ]
        .filter(Boolean)
        .sort();


    categories.forEach(
      category => {

        const option =
          document.createElement(
            'option'
          );


        option.value =
          category;


        option.textContent =
          category;


        categoryEl.appendChild(
          option
        );

      }
    );
  }


  function render() {

    const q =
      searchIn
        ? searchIn.value
          .toLowerCase()
          .trim()
        : '';


    const cat =
      categoryEl
        ? categoryEl.value
        : 'all';


    const sort =
      sortEl
        ? sortEl.value
        : 'newest';


    let filtered =
      allItems.filter(
        item => {

          const title =
            String(
              item.title || ''
            )
              .toLowerCase();


          const description =
            String(
              item.description || ''
            )
              .toLowerCase();


          const tags =
            Array.isArray(
              item.tags
            )
              ? item.tags
                .join(' ')
                .toLowerCase()
              : '';


          const matchQuery =
            !q ||
            title.includes(q) ||
            description.includes(q) ||
            tags.includes(q);


          const matchCategory =
            cat === 'all' ||
            item.category === cat;


          return (
            matchQuery &&
            matchCategory
          );
        }
      );


    /*
     * Sorting
     */
    filtered.sort(
      (a, b) => {

        if (
          sort === 'newest'
        ) {

          return (
            new Date(b.date) -
            new Date(a.date)
          );
        }


        if (
          sort === 'oldest'
        ) {

          return (
            new Date(a.date) -
            new Date(b.date)
          );
        }


        if (
          sort === 'popular'
        ) {

          return (
            (b.views || 0) -
            (a.views || 0)
          );
        }


        if (
          sort === 'az'
        ) {

          return String(
            a.title
          ).localeCompare(
            String(b.title)
          );
        }


        return 0;
      }
    );


    /*
     * Count
     */
    if (countEl) {

      countEl.textContent =
        `${filtered.length} article${filtered.length !== 1
          ? 's'
          : ''
        }`;
    }


    /*
     * Empty state
     */
    if (
      filtered.length === 0
    ) {

      grid.innerHTML = `

        <div
          class="empty-state"
          style="grid-column:1/-1;"
        >

          <div class="empty-icon">
            🔍
          </div>

          <h3>
            No articles found
          </h3>

          <p>
            Try adjusting your search or filters.
          </p>

        </div>

      `;

    } else {

      /*
       * Render cards
       */
      grid.innerHTML =
        filtered
          .map(renderCard)
          .join('');


      if (
        window.initScrollAnimations
      ) {

        initScrollAnimations();
      }
    }


    /*
     * Card click
     */
    grid
      .querySelectorAll(
        '.article-card'
      )
      .forEach(
        card => {

          const go =
            () => {

              window.location.href =
                `details.html?id=${card.dataset.id}`;
            };


          card.addEventListener(
            'click',
            event => {

              /*
               * Don't interfere with
               * Read More link.
               */
              if (
                event.target.closest(
                  'a'
                )
              ) {
                return;
              }


              go();
            }
          );


          card.addEventListener(
            'keydown',
            event => {

              if (
                event.key === 'Enter' ||
                event.key === ' '
              ) {

                event.preventDefault();

                go();
              }
            }
          );

        }
      );
  }


  /*
   * Search
   */
  searchIn?.addEventListener(
    'input',
    render
  );


  /*
   * Category
   */
  categoryEl?.addEventListener(
    'change',
    render
  );


  /*
   * Sort
   */
  sortEl?.addEventListener(
    'change',
    render
  );


  /*
   * Initial render
   */
  render();
}


// ══════════════════════════════════════════════════════════════════════════════
// DETAILS PAGE
// ══════════════════════════════════════════════════════════════════════════════

async function initDetailsPage() {

  const params =
    new URLSearchParams(
      location.search
    );


  const id =
    params.get('id');


  const mainEl =
    document.getElementById(
      'articleMain'
    );


  if (!mainEl) {
    return;
  }


  seedContent();


  /*
   * Load MongoDB + local content
   */
  await refreshBackendContent();


  let article =
    getById(id);


  if (!article) {

    mainEl.innerHTML = `

      <div
        class="empty-state"
        style="padding:100px 0;"
      >

        <div class="empty-icon">
          📭
        </div>

        <h2>
          Article not found
        </h2>

        <p>
          <a href="index.html">
            ← Back to Home
          </a>
        </p>

      </div>

    `;

    return;
  }


  /*
   * Local view counter
   */
  article.views =
    (article.views || 0) + 1;


  saveContent(
    article
  );


  /*
   * Hero image
   */
  const heroImg =
    document.getElementById(
      'detailsHeroImg'
    );


  if (heroImg) {

    const safeImage =
      (article.image && !BROKEN_IMAGES.has(article.image))
        ? article.image
        : null;

    if (safeImage) {

      heroImg.src =
        safeImage;

      heroImg.alt =
        article.title;

      heroImg.style.display =
        '';

      heroImg.onerror = function () {
        this.style.display = 'none';
        const hero = document.getElementById('detailsHero');
        if (hero) {
          hero.style.background =
            'linear-gradient(135deg, #0d1117 0%, #171d31 50%, #252d52 100%)';
        }
      };

    } else {

      heroImg.style.display =
        'none';
    }
  }


  /*
   * Hero content
   */
  const heroOverlayContent =
    document.getElementById(
      'detailsHeroContent'
    );


  if (
    heroOverlayContent
  ) {

    const dateStr =
      article.date
        ? new Date(
          article.date
        ).toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        )
        : '';


    heroOverlayContent.innerHTML = `

      <span class="article-category-badge">
        ${article.category}
      </span>


      <h1
        class="article-title"
        style="
          font-size:clamp(
            1.6rem,
            4vw,
            2.6rem
          )
        "
      >
        ${article.title}
      </h1>


      <div class="article-meta">

        <div class="meta-author">

          <div
            class="card-avatar"
            style="
              width:32px;
              height:32px;
              font-size:12px;
            "
          >
            ${article.authorInitials || 'BC'}
          </div>


          <span>
            ${article.author || 'BlogCraft Author'}
          </span>

        </div>


        <span>
          📅 ${dateStr}
        </span>


        <span>
          👁 ${(article.views || 0).toLocaleString()} views
        </span>

      </div>
    `;
  }


  /*
   * Article body
   */
  const bodyEl =
    document.getElementById(
      'articleBody'
    );


  if (bodyEl) {

    bodyEl.innerHTML =
      article.content ||
      `<p>${article.description || ''}</p>`;
  }


  /*
   * Tags
   */
  const tagsEl =
    document.getElementById(
      'articleTags'
    );


  if (tagsEl) {

    if (
      Array.isArray(
        article.tags
      ) &&
      article.tags.length > 0
    ) {

      tagsEl.innerHTML =
        article.tags
          .map(
            tag =>
              `
                <span class="badge badge-tech">
                  #${tag}
                </span>
              `
          )
          .join('');

    } else {

      tagsEl.innerHTML =
        '';
    }
  }


  /*
   * Related articles
   */
  const relatedEl =
    document.getElementById(
      'relatedArticles'
    );


  if (relatedEl) {

    const published =
      getPublished();


    const related =
      published
        .filter(
          item =>
            String(item.id) !==
            String(article.id) &&
            item.category ===
            article.category
        )
        .slice(0, 3);


    const others =
      related.length < 3
        ? published
          .filter(
            item =>
              String(item.id) !==
              String(article.id) &&
              !related.some(
                relatedItem =>
                  String(
                    relatedItem.id
                  ) ===
                  String(item.id)
              )
          )
          .slice(
            0,
            3 - related.length
          )
        : [];


    const items = [
      ...related,
      ...others
    ];


    relatedEl.innerHTML =
      items
        .map(
          item => `

            <div
              class="related-card"
              role="button"
              tabindex="0"
              onclick="
                location.href='details.html?id=${item.id}'
              "
              aria-label="${item.title}"
            >

              ${item.image
              ? `
                    <img
                      src="${item.image}"
                      alt="${item.title}"
                      loading="lazy"
                      onerror="this.parentElement.style.background='linear-gradient(135deg,#171d31,#252d52)';this.style.display='none'"
                    >
                  `
              : ''
            }


              <div
                class="related-card-info"
              >

                <div
                  class="related-card-cat"
                >
                  ${item.category}
                </div>


                <div
                  class="related-card-title"
                >
                  ${item.title}
                </div>

              </div>

            </div>

          `
        )
        .join('');
  }


  /*
   * Browser title
   */
  document.title =
    `${article.title} — BlogCraft`;
}


// ══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════════════════════════════════════

window.ContentDB.renderCard =
  renderCard;


// ══════════════════════════════════════════════════════════════════════════════
// INITIALIZE
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener(
  'DOMContentLoaded',
  () => {

    seedContent();

    initHomepageContent();

    initDetailsPage();

  }
);