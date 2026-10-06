/**
 * BlogCraft — dashboard.js
 * Dashboard, Create, and Edit content functionality
 * Backend API integration
 */

'use strict';

const DASHBOARD_API_BASE_URL = 'http://localhost:5000/api';


// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════

async function initDashboard() {

  if (!document.getElementById('dashboardPage')) {
    return;
  }

  const user = requireAuth('login.html');

  if (!user) {
    return;
  }

  // User information
  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = user.name;
  });

  document.querySelectorAll('.user-initials').forEach(el => {
    el.textContent = user.initials || 'U';
  });

  document.querySelectorAll('.user-email').forEach(el => {
    el.textContent = user.email;
  });

  // Greeting
  const greeting = document.getElementById('dashGreeting');

  if (greeting) {

    const hour = new Date().getHours();

    const time =
      hour < 12
        ? 'Morning'
        : hour < 18
          ? 'Afternoon'
          : 'Evening';

    greeting.innerHTML =
      `Good ${time}, <strong>${user.name.split(' ')[0]}</strong> 👋`;
  }

  // Load backend content before rendering
  try {

    if (
      window.ContentDB &&
      typeof ContentDB.refreshBackendContent === 'function'
    ) {
      await ContentDB.refreshBackendContent();
    }

  } catch (error) {

    console.error(
      'Dashboard content loading failed:',
      error
    );
  }

  loadStats();
  loadContentTable();
  initSidebar();
}


// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ══════════════════════════════════════════════════════════════════════════════

function loadStats() {

  const all = ContentDB.getAllContent();

  // For the internship dashboard, show all BlogCraft articles
  const myContent = all.filter(() => true);

  const published = myContent.filter(
    article => article.status === 'published'
  );

  const drafts = myContent.filter(
    article => article.status === 'draft'
  );

  const views = myContent.reduce(
    (sum, article) =>
      sum + Number(article.views || 0),
    0
  );

  setValue('statTotal', myContent.length);
  setValue('statPublished', published.length);
  setValue('statDrafts', drafts.length);
  setValue('statViews', views.toLocaleString());
}


function setValue(id, value) {

  const el = document.getElementById(id);

  if (el) {
    el.textContent = value;
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD ARTICLE TABLE
// ══════════════════════════════════════════════════════════════════════════════

function loadContentTable() {

  const tbody = document.getElementById('contentTableBody');

  if (!tbody) {
    return;
  }

  const all = ContentDB.getAllContent();

  console.log(
    'BlogCraft dashboard articles:',
    all.length
  );

  if (all.length === 0) {

    tbody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:32px;
                        color:var(--text-muted);
                    "
                >
                    No content yet.

                    <a href="create.html">
                        Create your first article →
                    </a>
                </td>
            </tr>
        `;

    return;
  }

  tbody.innerHTML =
    all
      .map(item => {

        const dateStr =
          item.date
            ? new Date(item.date).toLocaleDateString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }
            )
            : '—';

        const badge =
          item.status === 'published'

            ? `
                            <span class="badge badge-published">
                                Published
                            </span>
                        `

            : `
                            <span class="badge badge-draft">
                                Draft
                            </span>
                        `;

        return `
                    <tr>

                        <td data-label="Title">

                            <span class="table-title">
                                ${escapeHtml(item.title)}
                            </span>

                        </td>


                        <td data-label="Category">

                            <span class="badge badge-tech">
                                ${escapeHtml(item.category || 'General')}
                            </span>

                        </td>


                        <td data-label="Status">

                            ${badge}

                        </td>


                        <td data-label="Date">

                            ${dateStr}

                        </td>


                        <td data-label="Actions">

                            <div class="table-actions">

                                <a
                                    href="details.html?id=${encodeURIComponent(item.id)}"
                                    class="btn btn-sm btn-outline-accent"
                                    aria-label="View ${escapeHtml(item.title)}"
                                >
                                    View
                                </a>


                                <a
                                    href="create.html?id=${encodeURIComponent(item.id)}"
                                    class="btn btn-sm btn-secondary"
                                    aria-label="Edit ${escapeHtml(item.title)}"
                                >
                                    Edit
                                </a>


                                <button
                                    type="button"
                                    class="btn btn-sm btn-danger"
                                    data-delete="${escapeHtml(item.id)}"
                                    aria-label="Delete ${escapeHtml(item.title)}"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>
                `;
      })
      .join('');

  // Delete handlers
  tbody
    .querySelectorAll('[data-delete]')
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          const row = button.closest('tr');

          const title =
            row
              ?.querySelector('.table-title')
              ?.textContent
              ?.trim();

          confirmDelete(
            button.dataset.delete,
            title
          );
        }
      );
    });
}


// ══════════════════════════════════════════════════════════════════════════════
// HTML ESCAPE
// ══════════════════════════════════════════════════════════════════════════════

function escapeHtml(value) {

  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// ══════════════════════════════════════════════════════════════════════════════
// DELETE
// ══════════════════════════════════════════════════════════════════════════════

function confirmDelete(id, title) {

  const overlay =
    document.getElementById('deleteModal');

  const titleEl =
    document.getElementById('deleteModalTitle');

  if (titleEl) {
    titleEl.textContent =
      title || 'this article';
  }

  if (
    typeof Modal !== 'undefined' &&
    overlay
  ) {
    Modal.open(overlay);
  }

  const confirmButton =
    document.getElementById('confirmDeleteBtn');

  if (!confirmButton) {
    return;
  }

  // Prevent multiple handlers
  confirmButton.onclick = async () => {

    const token =
      localStorage.getItem('blogcraftToken');

    if (!token) {

      Toast?.show?.(
        'Please login again to continue.',
        'error'
      );

      return;
    }

    try {

      confirmButton.disabled = true;
      confirmButton.textContent = 'Deleting...';

      const response =
        await fetch(
          `${DASHBOARD_API_BASE_URL}/blogs/${encodeURIComponent(id)}`,
          {
            method: 'DELETE',

            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      // Authentication error
      if (
        response.status === 401 ||
        response.status === 403
      ) {

        localStorage.removeItem('blogcraftToken');

        Toast?.show?.(
          'Your session has expired. Please login again.',
          'error',
          5000
        );

        if (
          typeof Modal !== 'undefined' &&
          overlay
        ) {
          Modal.close(overlay);
        }

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);

        return;
      }

      // Backend error
      if (!response.ok) {

        Toast?.show?.(
          data.message ||
          'Failed to delete article.',
          'error',
          5000
        );

        return;
      }

      // Remove from local cache after backend succeeds
      if (
        window.ContentDB &&
        typeof ContentDB.deleteContent === 'function'
      ) {
        ContentDB.deleteContent(id);
      }

      if (
        typeof Modal !== 'undefined' &&
        overlay
      ) {
        Modal.close(overlay);
      }

      Toast?.show?.(
        data.message ||
        'Article deleted successfully.',
        'success'
      );

      loadStats();
      loadContentTable();

    } catch (error) {

      console.error(
        'Delete Blog API error:',
        error
      );

      Toast?.show?.(
        'Unable to connect to the backend. Make sure the server is running.',
        'error',
        5000
      );

    } finally {

      confirmButton.disabled = false;
      confirmButton.textContent = 'Delete';
    }
  };
}


// ══════════════════════════════════════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════════════════════════════════════

function initSidebar() {

  const toggle =
    document.getElementById('sidebarToggle');

  const sidebar =
    document.getElementById('sidebar');

  const overlay =
    document.getElementById('sidebarOverlay');

  const closeBtn =
    document.getElementById('sidebarClose');


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


  toggle?.addEventListener(
    'click',
    openSidebar
  );


  closeBtn?.addEventListener(
    'click',
    closeSidebar
  );


  overlay?.addEventListener(
    'click',
    closeSidebar
  );


  // Active sidebar link
  const current =
    location.pathname
      .split('/')
      .pop();

  document
    .querySelectorAll('.sidebar-link[data-page]')
    .forEach(link => {

      link.classList.toggle(
        'active',
        link.dataset.page === current
      );
    });
}


// ══════════════════════════════════════════════════════════════════════════════
// CREATE / EDIT PAGE
// ══════════════════════════════════════════════════════════════════════════════

function initCreatePage() {

  if (!document.getElementById('createPage')) {
    return;
  }

  const user =
    requireAuth('login.html');

  if (!user) {
    return;
  }

  const params =
    new URLSearchParams(location.search);

  const editId =
    params.get('id');

  const existing =
    editId
      ? ContentDB.getById(editId)
      : null;


  // Heading
  const pageHeading =
    document.getElementById('createHeading');

  if (pageHeading) {

    pageHeading.textContent =
      existing
        ? 'Edit Article'
        : 'Create New Article';
  }


  // Form elements
  const form =
    document.getElementById('createForm');

  const titleIn =
    document.getElementById('artTitle');

  const categoryIn =
    document.getElementById('artCategory');

  const descIn =
    document.getElementById('artDesc');

  const contentIn =
    document.getElementById('artContent');

  const statusIn =
    document.getElementById('artStatus');

  const tagsWrap =
    document.getElementById('tagsWrap');

  const charCount =
    document.getElementById('descCharCount');

  const imgArea =
    document.getElementById('imageUploadArea');

  const imgInput =
    document.getElementById('imageInput');

  const imgPreview =
    document.getElementById('imagePreview');

  const previewImg =
    document.getElementById('previewImg');

  const removeImgBtn =
    document.getElementById('removeImgBtn');

  const saveDraftBtn =
    document.getElementById('saveDraftBtn');

  const publishBtn =
    document.getElementById('publishBtn');


  let tags = [];

  let imageBase64 = null;


  // ══════════════════════════════════════════════════════════════════════════
  // POPULATE EDIT FORM
  // ══════════════════════════════════════════════════════════════════════════

  if (existing) {

    if (titleIn) {
      titleIn.value =
        existing.title || '';
    }

    if (categoryIn) {
      categoryIn.value =
        existing.category || '';
    }

    if (descIn) {
      descIn.value =
        existing.description || '';
    }

    if (contentIn) {

      contentIn.value =
        existing.content
          ?.replace(/<[^>]+>/g, '') || '';
    }

    if (statusIn) {

      statusIn.value =
        existing.status ||
        'published';
    }

    tags = [
      ...(existing.tags || [])
    ];

    if (existing.image) {

      showPreview(existing.image);

      if (
        existing.image.startsWith('data:image/')
      ) {

        imageBase64 =
          existing.image;
      }
    }

    renderTags();

    updateCharCount();
  }


  // ══════════════════════════════════════════════════════════════════════════
  // CHARACTER COUNT
  // ══════════════════════════════════════════════════════════════════════════

  function updateCharCount() {

    if (!descIn || !charCount) {
      return;
    }

    const len =
      descIn.value.length;

    charCount.textContent =
      `${len}/200`;

    charCount.className =
      'char-counter' +
      (
        len > 200
          ? ' error'
          : len > 160
            ? ' warn'
            : ''
      );
  }


  descIn?.addEventListener(
    'input',
    updateCharCount
  );


  // ══════════════════════════════════════════════════════════════════════════
  // TAGS
  // ══════════════════════════════════════════════════════════════════════════

  function renderTags() {

    if (!tagsWrap) {
      return;
    }

    const chips =
      tags
        .map(tag => `

                    <span class="tag-chip">

                        ${escapeHtml(tag)}

                        <button
                            type="button"
                            class="tag-chip-remove"
                            data-tag="${escapeHtml(tag)}"
                            aria-label="Remove tag ${escapeHtml(tag)}"
                        >
                            ×
                        </button>

                    </span>

                `)
        .join('');


    tagsWrap.innerHTML =
      chips +
      `

                <input
                    type="text"
                    class="tags-input-field"
                    id="tagsField"
                    placeholder="${tags.length
        ? ''
        : 'Add tags (Enter)'
      }"
                    aria-label="Add tag"
                >

            `;


    tagsWrap
      .querySelectorAll('.tag-chip-remove')
      .forEach(button => {

        button.addEventListener(
          'click',
          () => {

            tags =
              tags.filter(
                tag =>
                  tag !==
                  button.dataset.tag
              );

            renderTags();
          }
        );
      });


    const field =
      document.getElementById('tagsField');


    field?.addEventListener(
      'keydown',
      event => {

        if (
          (
            event.key === 'Enter' ||
            event.key === ','
          ) &&
          field.value.trim()
        ) {

          event.preventDefault();

          const tag =
            field.value
              .trim()
              .replace(/,/g, '')
              .toLowerCase();


          if (
            tag &&
            !tags.includes(tag) &&
            tags.length < 8
          ) {

            tags.push(tag);

            renderTags();
          }
        }
      }
    );
  }


  renderTags();


  // ══════════════════════════════════════════════════════════════════════════
  // IMAGE PREVIEW
  // ══════════════════════════════════════════════════════════════════════════

  function showPreview(src) {

    if (imgArea) {
      imgArea.style.display = 'none';
    }

    if (imgPreview) {
      imgPreview.style.display = '';
    }

    if (previewImg) {
      previewImg.src = src;
    }
  }


  function hidePreview() {

    if (imgArea) {
      imgArea.style.display = '';
    }

    if (imgPreview) {
      imgPreview.style.display = 'none';
    }

    imageBase64 = null;

    if (previewImg) {
      previewImg.src = '';
    }
  }


  imgArea?.addEventListener(
    'click',
    () => imgInput?.click()
  );


  imgArea?.addEventListener(
    'dragover',
    event => {

      event.preventDefault();

      imgArea.classList.add('drag-over');
    }
  );


  imgArea?.addEventListener(
    'dragleave',
    () => {

      imgArea.classList.remove('drag-over');
    }
  );


  imgArea?.addEventListener(
    'drop',
    event => {

      event.preventDefault();

      imgArea.classList.remove('drag-over');

      const file =
        event.dataTransfer.files[0];

      if (
        file &&
        file.type.startsWith('image/')
      ) {

        handleFile(file);
      }
    }
  );


  imgInput?.addEventListener(
    'change',
    () => {

      if (imgInput.files[0]) {

        handleFile(
          imgInput.files[0]
        );
      }
    }
  );


  removeImgBtn?.addEventListener(
    'click',
    hidePreview
  );


  function handleFile(file) {

    if (
      file.size >
      4 * 1024 * 1024
    ) {

      Toast?.show?.(
        'Image must be under 4MB.',
        'error'
      );

      return;
    }


    const reader =
      new FileReader();


    reader.onload =
      event => {

        imageBase64 =
          event.target.result;

        showPreview(
          imageBase64
        );
      };


    reader.readAsDataURL(file);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // VALIDATION
  // ══════════════════════════════════════════════════════════════════════════

  function validate() {

    let valid = true;


    if (!titleIn?.value.trim()) {

      showErr(
        titleIn,
        'titleError',
        'Title is required.'
      );

      valid = false;

    } else {

      clearErr(
        titleIn,
        'titleError'
      );
    }


    if (!categoryIn?.value) {

      showErr(
        categoryIn,
        'categoryError',
        'Please select a category.'
      );

      valid = false;

    } else {

      clearErr(
        categoryIn,
        'categoryError'
      );
    }


    if (!descIn?.value.trim()) {

      showErr(
        descIn,
        'descError',
        'Description is required.'
      );

      valid = false;

    } else {

      clearErr(
        descIn,
        'descError'
      );
    }


    if (
      descIn?.value.length >
      200
    ) {

      showErr(
        descIn,
        'descError',
        'Description must be 200 characters or less.'
      );

      valid = false;
    }


    return valid;
  }


  function showErr(
    el,
    errId,
    message
  ) {

    el?.classList.add('error');

    const errorEl =
      document.getElementById(errId);

    if (errorEl) {

      errorEl.textContent =
        message;

      errorEl.classList.add('visible');
    }
  }


  function clearErr(
    el,
    errId
  ) {

    el?.classList.remove('error');

    const errorEl =
      document.getElementById(errId);

    if (errorEl) {

      errorEl.classList.remove('visible');
    }
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SAVE BLOG — CREATE + UPDATE
  // ══════════════════════════════════════════════════════════════════════════

  async function save(status) {

    if (!validate()) {
      return;
    }


    const token =
      localStorage.getItem('blogcraftToken');


    if (!token) {

      Toast?.show?.(
        'Please login again to continue.',
        'error'
      );

      setTimeout(
        () => {
          window.location.href =
            'login.html';
        },
        1000
      );

      return;
    }


    const rawContent =
      contentIn?.value.trim() || '';


    const content =
      rawContent
        .split('\n\n')
        .map(
          paragraph =>
            paragraph.trim()
              ? `<p>${paragraph.replace(
                /\n/g,
                '<br>'
              )}</p>`
              : ''
        )
        .join('\n');


    // Image
    const image =
      imageBase64 ||
      existing?.image ||
      '';


    const blogData = {

      title:
        titleIn.value.trim(),

      content:
        content ||
        `<p>${descIn.value.trim()}</p>`,

      category:
        categoryIn.value,

      image:
        image
    };


    // Disable buttons
    if (saveDraftBtn) {
      saveDraftBtn.disabled = true;
    }

    if (publishBtn) {
      publishBtn.disabled = true;
    }


    if (status === 'published') {

      if (publishBtn) {
        publishBtn.textContent =
          existing
            ? 'Updating...'
            : 'Publishing...';
      }

    } else {

      if (saveDraftBtn) {
        saveDraftBtn.textContent =
          existing
            ? 'Updating...'
            : 'Saving...';
      }
    }


    try {

      /*
       * IMPORTANT:
       *
       * Create:
       * POST /api/blogs
       *
       * Edit:
       * PUT /api/blogs/:id
       */

      const isEdit =
        Boolean(editId);


      const endpoint =
        isEdit
          ? `${DASHBOARD_API_BASE_URL}/blogs/${encodeURIComponent(editId)}`
          : `${DASHBOARD_API_BASE_URL}/blogs`;


      const method =
        isEdit
          ? 'PUT'
          : 'POST';


      console.log(
        `Blog ${isEdit ? 'update' : 'create'} request:`,
        method,
        endpoint
      );


      const response =
        await fetch(
          endpoint,
          {
            method: method,

            headers: {

              'Content-Type':
                'application/json',

              'Authorization':
                `Bearer ${token}`
            },

            body:
              JSON.stringify(
                blogData
              )
          }
        );


      const data =
        await response.json();


      // Auth error
      if (
        response.status === 401 ||
        response.status === 403
      ) {

        localStorage.removeItem(
          'blogcraftToken'
        );

        Toast?.show?.(
          'Your session has expired. Please login again.',
          'error',
          5000
        );

        setTimeout(
          () => {
            window.location.href =
              'login.html';
          },
          1200
        );

        return;
      }


      // Backend error
      if (!response.ok) {

        Toast?.show?.(
          data.message ||
          (
            isEdit
              ? 'Failed to update article.'
              : 'Failed to create article.'
          ),
          'error',
          5000
        );

        return;
      }


      // ════════════════════════════════════════════════════════════════
      // SAVE BACKEND RESPONSE LOCALLY
      // ════════════════════════════════════════════════════════════════

      if (data.blog) {

        const localArticle = {

          id:
            data.blog._id ||
            editId ||
            `c_${Date.now()}`,

          title:
            data.blog.title,

          category:
            data.blog.category,

          description:
            descIn.value.trim(),

          content:
            data.blog.content,

          tags:
            [...tags],

          image:
            data.blog.image ||
            image,

          author:
            user.name,

          authorInitials:
            user.initials ||
            'U',

          date:
            data.blog.updatedAt ||
            data.blog.createdAt ||
            new Date().toISOString(),

          status:
            status,

          views:
            existing?.views ||
            0,

          userId:
            user.id
        };


        if (
          window.ContentDB &&
          typeof ContentDB.saveContent === 'function'
        ) {

          ContentDB.saveContent(
            localArticle
          );
        }
      }


      // Success message
      if (isEdit) {

        Toast?.show?.(
          'Article updated successfully! 🎉',
          'success'
        );

      } else if (status === 'published') {

        Toast?.show?.(
          'Article published successfully! 🎉',
          'success'
        );

      } else {

        Toast?.show?.(
          'Draft saved successfully.',
          'success'
        );
      }


      // Return to dashboard
      setTimeout(
        () => {

          window.location.href =
            'dashboard.html';

        },
        1000
      );


    } catch (error) {

      console.error(
        `Blog ${editId ? 'update' : 'create'} API error:`,
        error
      );

      Toast?.show?.(
        'Unable to connect to the backend. Make sure the server is running.',
        'error',
        5000
      );


    } finally {

      if (saveDraftBtn) {

        saveDraftBtn.disabled =
          false;

        saveDraftBtn.textContent =
          existing
            ? 'Save Changes'
            : 'Save as Draft';
      }


      if (publishBtn) {

        publishBtn.disabled =
          false;

        publishBtn.textContent =
          existing
            ? 'Update & Publish'
            : 'Publish Article';
      }
    }
  }


  // ══════════════════════════════════════════════════════════════════════════
  // BUTTONS
  // ══════════════════════════════════════════════════════════════════════════

  saveDraftBtn?.addEventListener(
    'click',
    () => save('draft')
  );


  publishBtn?.addEventListener(
    'click',
    () => save('published')
  );


  form?.addEventListener(
    'submit',
    event => {

      event.preventDefault();

      save(
        statusIn?.value ||
        'published'
      );
    }
  );


  initSidebar();
}


// ══════════════════════════════════════════════════════════════════════════════
// INITIALIZE
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener(
  'DOMContentLoaded',
  () => {

    initDashboard();

    initCreatePage();
  }
);