# ✦ BlogCraft — Turn Your Ideas Into Stories.

> A modern, professional content publishing platform built with pure HTML5, CSS3, and Vanilla JavaScript.

---

## 🌟 Overview

**BlogCraft** is a full-featured, frontend-only blog publishing platform. No frameworks, no build tools, no dependencies — just clean, performant, and beautifully designed web technology.

**Design philosophy:** Modern · Professional · Minimal · Premium · Responsive  
**Color system:** Dark navy palette with an indigo/violet accent  
**Stack:** Vanilla HTML5 · CSS3 · JavaScript · localStorage

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🏠 **Homepage** | Hero section, platform features, article grid, about section, CTA |
| 🔍 **Search & Filter** | Real-time search, category filter, multi-sort (newest/oldest/popular/A-Z) |
| 📖 **Article Cards** | Unique cover images, category badges, author info, read-more links |
| 📄 **Article Details** | Full article view, reading progress bar, related articles, social share |
| 🔒 **Authentication** | Login + registration with full client-side validation |
| 🔑 **Password Strength** | Live strength meter on registration |
| 📊 **Dashboard** | Stats cards (total/published/drafts/views) + article management table |
| ✍️ **Article Editor** | Create/edit with image upload, tag input, category, publish/draft toggle |
| 🗑️ **Delete** | Confirmation modal before deleting any article |
| 💾 **Persistence** | All data stored in `localStorage` — survives page refresh |
| 📱 **Responsive** | Desktop, tablet, and mobile layouts with hamburger navigation |
| ♿ **Accessible** | ARIA labels, semantic HTML, keyboard navigation |
| 🎨 **Dark Theme** | Premium dark UI with smooth animations |

---

## 📁 Project Structure

```
blogcraft/
│
├── index.html           ← Homepage (hero, features, article grid, about, footer)
├── login.html           ← Login page (split-panel, demo credentials)
├── register.html        ← Registration (password strength meter)
├── dashboard.html       ← User dashboard (stats, article table, modals)
├── create.html          ← Create / Edit article
├── details.html         ← Article detail view (reading progress, share)
│
├── css/
│   ├── style.css        ← Design tokens, global styles, layout, animations
│   ├── components.css   ← Auth, dashboard, forms, cards, tables, modals
│   └── responsive.css   ← Mobile-first breakpoints + reduced-motion
│
├── js/
│   ├── app.js           ← Core: toasts, modals, navbar, scroll fx, Storage API
│   ├── auth.js          ← Login/register validation, session management
│   ├── content.js       ← Seed articles, search/filter/sort, card rendering
│   └── dashboard.js     ← Stats, CRUD table, create/edit form, tags, upload
│
├── assets/
│   └── images/
│       ├── hero-dashboard.jpg           ← Hero section image
│       ├── article-javascript.jpg       ← Article: Modern JavaScript
│       ├── article-cybersecurity.jpg    ← Article: Cybersecurity Fundamentals
│       ├── article-ai.jpg               ← Article: Future of AI
│       ├── article-webdev.jpg           ← Article: Web Development Roadmap
│       ├── article-cloud.jpg            ← Article: Cloud Architecture
│       ├── article-design-system.svg    ← Article: Building a Design System
│       └── article-fullstack-2026.jpg   ← Article: Full Stack Architecture 2026
│
└── README.md
```

---

## 🗂️ Article Image Map

Every article has its own unique cover image. No duplicates.

| Article | Image File |
|---|---|
| Getting Started With Modern JavaScript | `article-javascript.jpg` |
| Cybersecurity Fundamentals for Developers | `article-cybersecurity.jpg` |
| The Future of Artificial Intelligence | `article-ai.jpg` |
| Modern Web Development Roadmap 2026 | `article-webdev.jpg` |
| Cloud Architecture: Building Scalable Systems | `article-cloud.jpg` |
| Building a Design System From Scratch | `article-design-system.svg` |
| Full Stack Architecture in 2026 | `article-fullstack-2026.jpg` |

---

## 🔑 Demo Login

```
Email:    demo@blogcraft.dev
Password: Demo1234!
```

Or create your own account via the Register page.

---

## ▶️ Getting Started

1. Clone or download the project
2. Open `index.html` in any modern browser
3. No build step, no `npm install` required

```bash
# Optional: serve locally for best experience
npx serve .
# or
python -m http.server 8080
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#080c14` |
| Surface | `#121929` |
| Card | `#161e30` |
| Elevated | `#1a2236` |
| Accent | `#6366f1` (Indigo) |
| Accent Light | `#818cf8` |
| Text Primary | `#f1f5f9` |
| Text Secondary | `#94a3b8` |
| Success | `#22c55e` |
| Warning | `#f59e0b` |
| Danger | `#ef4444` |
| Font | Inter (Google Fonts) |

---

## 💾 Data Persistence

All application state is stored in `localStorage` under the `BlogCraft_` namespace:

| Key | Contents |
|---|---|
| `BlogCraft_content` | All article records (array of objects) |
| `BlogCraft_user` | Logged-in user session |
| `BlogCraft_users` | All registered user accounts |

---

## ✅ Feature Checklist

- [x] Sticky navbar with active state highlighting
- [x] Animated hamburger menu (mobile)
- [x] Hero section with animated stats
- [x] 6 platform feature cards
- [x] Real-time search (title, description, tags, author)
- [x] Category filter dropdown
- [x] Multi-sort (newest, oldest, most popular, A–Z)
- [x] 7 unique article images (no duplicates)
- [x] Login with validation + demo credentials
- [x] Registration with live password strength meter
- [x] Auth guard: dashboard/create redirect to login if not signed in
- [x] Dashboard stats (total, published, drafts, views)
- [x] Article management table (view / edit / delete)
- [x] Create article (title, description, content, category, status, tags, image)
- [x] Edit article (pre-fills all fields)
- [x] Image upload with drag-and-drop preview
- [x] Tag input (press Enter to add, click to remove)
- [x] Publish / Save as draft toggle
- [x] Delete article with confirmation modal
- [x] Article details page with full content
- [x] Reading progress bar
- [x] Related articles sidebar
- [x] Social share (Twitter/X, LinkedIn, Copy Link)
- [x] localStorage data persistence
- [x] Fully responsive (desktop / tablet / mobile)
- [x] No horizontal scrolling on any viewport
- [x] Smooth CSS animations
- [x] `prefers-reduced-motion` respected
- [x] ARIA attributes and semantic HTML throughout
- [x] Keyboard navigation support

---

## 📸 Pages Reference

| Page | File | Access |
|---|---|---|
| Homepage | `index.html` | Public |
| Login | `login.html` | Public |
| Register | `register.html` | Public |
| Dashboard | `dashboard.html` | Auth required |
| Create Article | `create.html` | Auth required |
| Article Details | `details.html?id=c_001` | Public |

---

## 👨‍💻 Author

Built as a professional portfolio web application project.

---

*© 2026 BlogCraft. All rights reserved. Built with ♥ for creators everywhere.*
