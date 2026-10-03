/**
 * BlogCraft — dashboard.js
 * Dashboard, Create, and Edit content functionality
 */

'use strict';

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function initDashboard() {
  if (!document.getElementById('dashboardPage')) return;
  const user = requireAuth('login.html');
  if (!user) return;

  // Set user info
  document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.user-initials').forEach(el => el.textContent = user.initials || 'U');
  document.querySelectorAll('.user-email').forEach(el => el.textContent = user.email);

  const greeting = document.getElementById('dashGreeting');
  if (greeting) {
    const hour = new Date().getHours();
    const time = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
    greeting.innerHTML = `Good ${time}, <strong>${user.name.split(' ')[0]}</strong> 👋`;
  }

  loadStats();
  loadContentTable();
  initSidebar();
}

function loadStats() {
  const all       = ContentDB.getAllContent();
  const myContent = all.filter(c => c.userId === Storage.getUser()?.id || true); // show all for demo
  const published = myContent.filter(c => c.status === 'published');
  const drafts    = myContent.filter(c => c.status === 'draft');
  const views     = myContent.reduce((sum, c) => sum + (c.views || 0), 0);

  setValue('statTotal',     myContent.length);
  setValue('statPublished', published.length);
  setValue('statDrafts',    drafts.length);
  setValue('statViews',     views.toLocaleString());
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function loadContentTable() {
  const tbody = document.getElementById('contentTableBody');
  if (!tbody) return;

  const all = ContentDB.getAllContent();
  if (all.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted);">No content yet. <a href="create.html">Create your first article →</a></td></tr>`;
    return;
  }

  tbody.innerHTML = all.map(item => {
    const dateStr = item.date ? new Date(item.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric'}) : '—';
    const badge   = item.status === 'published'
      ? `<span class="badge badge-published">Published</span>`
      : `<span class="badge badge-draft">Draft</span>`;
    return `
      <tr>
        <td data-label="Title"><span class="table-title">${item.title}</span></td>
        <td data-label="Category"><span class="badge badge-tech">${item.category}</span></td>
        <td data-label="Status">${badge}</td>
        <td data-label="Date">${dateStr}</td>
        <td data-label="Actions">
          <div class="table-actions">
            <a href="details.html?id=${item.id}" class="btn btn-sm btn-outline-accent" aria-label="View ${item.title}">View</a>
            <a href="create.html?id=${item.id}" class="btn btn-sm btn-secondary" aria-label="Edit ${item.title}">Edit</a>
            <button class="btn btn-sm btn-danger" data-delete="${item.id}" aria-label="Delete ${item.title}">Delete</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  // Delete handlers
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => confirmDelete(btn.dataset.delete, btn.closest('tr').querySelector('.table-title')?.textContent));
  });
}

function confirmDelete(id, title) {
  const overlay = document.getElementById('deleteModal');
  const titleEl = document.getElementById('deleteModalTitle');
  if (titleEl) titleEl.textContent = title || 'this article';
  Modal.open(overlay);

  document.getElementById('confirmDeleteBtn').onclick = () => {
    ContentDB.deleteContent(id);
    Modal.close(overlay);
    Toast.show('Article deleted successfully.', 'success');
    loadStats();
    loadContentTable();
  };
}

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
function initSidebar() {
  const toggle  = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('sidebarClose');

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Active sidebar link
  const current = location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === current);
  });
}

// ── CREATE / EDIT CONTENT ─────────────────────────────────────────────────────
function initCreatePage() {
  if (!document.getElementById('createPage')) return;
  const user = requireAuth('login.html');
  if (!user) return;

  const params    = new URLSearchParams(location.search);
  const editId    = params.get('id');
  const existing  = editId ? ContentDB.getById(editId) : null;

  // Set page title
  const pageHeading = document.getElementById('createHeading');
  if (pageHeading) pageHeading.textContent = existing ? 'Edit Article' : 'Create New Article';

  const form        = document.getElementById('createForm');
  const titleIn     = document.getElementById('artTitle');
  const categoryIn  = document.getElementById('artCategory');
  const descIn      = document.getElementById('artDesc');
  const contentIn   = document.getElementById('artContent');
  const statusIn    = document.getElementById('artStatus');
  const tagsWrap    = document.getElementById('tagsWrap');
  const tagsField   = document.getElementById('tagsField');
  const charCount   = document.getElementById('descCharCount');
  const imgArea     = document.getElementById('imageUploadArea');
  const imgInput    = document.getElementById('imageInput');
  const imgPreview  = document.getElementById('imagePreview');
  const previewImg  = document.getElementById('previewImg');
  const removeImgBtn = document.getElementById('removeImgBtn');
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const publishBtn   = document.getElementById('publishBtn');

  let tags        = [];
  let imageBase64 = null;

  // Populate form if editing
  if (existing) {
    if (titleIn)    titleIn.value    = existing.title;
    if (categoryIn) categoryIn.value = existing.category;
    if (descIn)     descIn.value     = existing.description;
    if (contentIn)  contentIn.value  = existing.content?.replace(/<[^>]+>/g, '') || '';
    if (statusIn)   statusIn.value   = existing.status;
    tags = [...(existing.tags || [])];
    if (existing.image && !existing.image.startsWith('assets/')) {
      imageBase64 = existing.image;
      showPreview(existing.image);
    } else if (existing.image) {
      showPreview(existing.image);
    }
    renderTags();
    updateCharCount();
  }

  // Character count
  function updateCharCount() {
    if (!descIn || !charCount) return;
    const len = descIn.value.length;
    charCount.textContent = `${len}/200`;
    charCount.className = 'char-counter' + (len > 200 ? ' error' : len > 160 ? ' warn' : '');
  }
  descIn?.addEventListener('input', updateCharCount);

  // Tags
  function renderTags() {
    if (!tagsWrap) return;
    const chips = tags.map(t => `
      <span class="tag-chip">
        ${t}
        <button type="button" class="tag-chip-remove" data-tag="${t}" aria-label="Remove tag ${t}">×</button>
      </span>`).join('');
    tagsWrap.innerHTML = chips + `<input type="text" class="tags-input-field" id="tagsField" placeholder="${tags.length ? '' : 'Add tags (Enter)'}" aria-label="Add tag">`;
    tagsWrap.querySelectorAll('.tag-chip-remove').forEach(btn => {
      btn.addEventListener('click', () => { tags = tags.filter(t => t !== btn.dataset.tag); renderTags(); });
    });
    const newField = document.getElementById('tagsField');
    if (newField) {
      newField.addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ',') && newField.value.trim()) {
          e.preventDefault();
          const tag = newField.value.trim().replace(/,/g, '').toLowerCase();
          if (tag && !tags.includes(tag) && tags.length < 8) { tags.push(tag); renderTags(); }
        }
      });
    }
    tagsWrap.addEventListener('click', () => document.getElementById('tagsField')?.focus());
  }
  renderTags();

  // Image upload
  function showPreview(src) {
    if (imgArea)    imgArea.style.display    = 'none';
    if (imgPreview) imgPreview.style.display = '';
    if (previewImg) previewImg.src           = src;
  }
  function hidePreview() {
    if (imgArea)    imgArea.style.display    = '';
    if (imgPreview) imgPreview.style.display = 'none';
    imageBase64 = null;
    if (previewImg) previewImg.src = '';
  }

  imgArea?.addEventListener('click', () => imgInput?.click());
  imgArea?.addEventListener('dragover', e => { e.preventDefault(); imgArea.classList.add('drag-over'); });
  imgArea?.addEventListener('dragleave', () => imgArea.classList.remove('drag-over'));
  imgArea?.addEventListener('drop', e => {
    e.preventDefault(); imgArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  });
  imgInput?.addEventListener('change', () => { if (imgInput.files[0]) handleFile(imgInput.files[0]); });
  removeImgBtn?.addEventListener('click', hidePreview);

  function handleFile(file) {
    if (file.size > 4 * 1024 * 1024) { Toast.show('Image must be under 4MB.', 'error'); return; }
    const reader = new FileReader();
    reader.onload = e => { imageBase64 = e.target.result; showPreview(imageBase64); };
    reader.readAsDataURL(file);
  }

  // Validate
  function validate() {
    let ok = true;
    if (!titleIn?.value.trim()) {
      showErr(titleIn, 'titleError', 'Title is required.'); ok = false;
    } else clearErr(titleIn, 'titleError');
    if (!categoryIn?.value) {
      showErr(categoryIn, 'categoryError', 'Please select a category.'); ok = false;
    } else clearErr(categoryIn, 'categoryError');
    if (!descIn?.value.trim()) {
      showErr(descIn, 'descError', 'Description is required.'); ok = false;
    } else clearErr(descIn, 'descError');
    return ok;
  }
  function showErr(el, errId, msg) {
    el?.classList.add('error');
    const e = document.getElementById(errId);
    if (e) { e.textContent = msg; e.classList.add('visible'); }
  }
  function clearErr(el, errId) {
    el?.classList.remove('error');
    const e = document.getElementById(errId);
    if (e) e.classList.remove('visible');
  }

  // Save
  function save(status) {
    if (!validate()) return;
    const rawContent = contentIn?.value.trim() || '';
    const content    = rawContent.split('\n\n').map(p => p.trim() ? `<p>${p.replace(/\n/g, '<br>')}</p>` : '').join('\n');

    let imgSrc = imageBase64 || (existing?.image) || 'assets/images/article-webdev.jpg';

    const item = {
      id:            editId || `c_${Date.now()}`,
      title:         titleIn.value.trim(),
      category:      categoryIn.value,
      description:   descIn.value.trim(),
      content:       content || `<p>${descIn.value.trim()}</p>`,
      tags,
      image:         imgSrc,
      author:        user.name,
      authorInitials: user.initials || 'U',
      date:          existing?.date || new Date().toISOString().slice(0,10),
      status,
      views:         existing?.views || 0,
      userId:        user.id,
    };

    ContentDB.saveContent(item);
    Toast.show(status === 'published' ? 'Article published! 🎉' : 'Draft saved.', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1000);
  }

  saveDraftBtn?.addEventListener('click', () => save('draft'));
  publishBtn?.addEventListener('click',   () => save('published'));
  form?.addEventListener('submit', e => { e.preventDefault(); save(statusIn?.value || 'published'); });

  initSidebar();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initCreatePage();
});
