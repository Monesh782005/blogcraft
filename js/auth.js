/**
 * BlogCraft — auth.js
 * Login and Registration logic with client-side validation
 */

'use strict';

// ── Seeded Demo Accounts ──────────────────────────────────────────────────────
const DEMO_USERS = [
  {
    id: 'u_demo1',
    name: 'Alex Morgan',
    email: 'demo@BlogCraft.dev',
    password: 'Demo1234!',
    bio: 'Frontend developer and content creator.',
    joined: '2025-01-15',
    initials: 'AM',
  }
];

function seedDemoUsers() {
  const existing = Storage.get('users') || [];
  if (existing.length === 0) Storage.set('users', DEMO_USERS);
}

function getUsers() { return Storage.get('users') || DEMO_USERS; }
function saveUsers(users) { Storage.set('users', users); }

// ── Validation Helpers ────────────────────────────────────────────────────────
const Validate = {
  required: (v) => v && v.trim().length > 0,
  email:    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  minLen:   (v, n) => v && v.trim().length >= n,
  hasUpper: (v) => /[A-Z]/.test(v),
  hasLower: (v) => /[a-z]/.test(v),
  hasNum:   (v) => /[0-9]/.test(v),
};

function showFieldError(inputEl, errorEl, msg) {
  inputEl.classList.add('error');
  inputEl.classList.remove('success');
  errorEl.textContent = msg;
  errorEl.classList.add('visible');
}

function showFieldSuccess(inputEl, errorEl) {
  inputEl.classList.remove('error');
  inputEl.classList.add('success');
  errorEl.classList.remove('visible');
}

function clearField(inputEl, errorEl) {
  inputEl.classList.remove('error', 'success');
  errorEl.classList.remove('visible');
}

// ── Password Strength ─────────────────────────────────────────────────────────
function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

function renderStrengthBar(container, score) {
  if (!container) return;
  const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#eab308', '#22c55e', '#10b981'];
  container.innerHTML = `
    <div style="display:flex;gap:4px;margin-top:6px;">
      ${[1,2,3,4,5].map(i => `<div style="flex:1;height:3px;border-radius:2px;background:${i<=score ? colors[score] : 'var(--border)'}"></div>`).join('')}
    </div>
    <span style="font-size:0.72rem;color:${colors[score]};margin-top:3px;display:block;">${labels[score]}</span>
  `;
}

// ── Password Visibility Toggle ────────────────────────────────────────────────
function initPasswordToggles() {
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.textContent = isText ? '👁' : '🔒';
      btn.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    });
  });
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function initLogin() {
  if (!document.getElementById('loginForm')) return;
  redirectIfAuth('dashboard.html');
  seedDemoUsers();

  const form     = document.getElementById('loginForm');
  const emailIn  = document.getElementById('loginEmail');
  const passIn   = document.getElementById('loginPassword');
  const emailErr = document.getElementById('loginEmailError');
  const passErr  = document.getElementById('loginPassError');
  const submitBtn = document.getElementById('loginSubmit');

  initPasswordToggles();

  function validateLogin() {
    let valid = true;
    const email = emailIn.value.trim();
    const pass  = passIn.value;

    if (!Validate.required(email)) {
      showFieldError(emailIn, emailErr, 'Email is required.'); valid = false;
    } else if (!Validate.email(email)) {
      showFieldError(emailIn, emailErr, 'Enter a valid email address.'); valid = false;
    } else {
      showFieldSuccess(emailIn, emailErr);
    }

    if (!Validate.required(pass)) {
      showFieldError(passIn, passErr, 'Password is required.'); valid = false;
    } else if (!Validate.minLen(pass, 6)) {
      showFieldError(passIn, passErr, 'Password must be at least 6 characters.'); valid = false;
    } else {
      showFieldSuccess(passIn, passErr);
    }
    return valid;
  }

  emailIn.addEventListener('blur', () => {
    const v = emailIn.value.trim();
    if (v && !Validate.email(v)) showFieldError(emailIn, emailErr, 'Enter a valid email.');
    else if (v) showFieldSuccess(emailIn, emailErr);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateLogin()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in…';

    setTimeout(() => {
      const users = getUsers();
      const email = emailIn.value.trim().toLowerCase();
      const pass  = passIn.value;
      const user  = users.find(u => u.email.toLowerCase() === email && u.password === pass);

      if (!user) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
        showFieldError(passIn, passErr, 'Incorrect email or password.');
        Toast.show('Invalid credentials. Try demo@BlogCraft.dev / Demo1234!', 'error', 5000);
        return;
      }

      const sessionUser = { id: user.id, name: user.name, email: user.email, bio: user.bio, initials: user.initials || user.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(), joined: user.joined };
      Storage.setUser(sessionUser);
      Toast.show(`Welcome back, ${user.name}! 🎉`, 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    }, 700);
  });
}

// ── REGISTER ─────────────────────────────────────────────────────────────────
function initRegister() {
  if (!document.getElementById('registerForm')) return;
  redirectIfAuth('dashboard.html');
  seedDemoUsers();

  const form        = document.getElementById('registerForm');
  const nameIn      = document.getElementById('regName');
  const emailIn     = document.getElementById('regEmail');
  const passIn      = document.getElementById('regPassword');
  const confirmIn   = document.getElementById('regConfirm');
  const termsIn     = document.getElementById('regTerms');
  const nameErr     = document.getElementById('regNameError');
  const emailErr    = document.getElementById('regEmailError');
  const passErr     = document.getElementById('regPassError');
  const confirmErr  = document.getElementById('regConfirmError');
  const termsErr    = document.getElementById('regTermsError');
  const strengthBar = document.getElementById('strengthBar');
  const submitBtn   = document.getElementById('registerSubmit');

  initPasswordToggles();

  passIn.addEventListener('input', () => {
    const score = getPasswordStrength(passIn.value);
    renderStrengthBar(strengthBar, score);
  });

  function validate() {
    let valid = true;
    const name  = nameIn.value.trim();
    const email = emailIn.value.trim();
    const pass  = passIn.value;
    const conf  = confirmIn.value;

    if (!Validate.minLen(name, 2)) {
      showFieldError(nameIn, nameErr, 'Full name must be at least 2 characters.'); valid = false;
    } else { showFieldSuccess(nameIn, nameErr); }

    if (!Validate.email(email)) {
      showFieldError(emailIn, emailErr, 'Enter a valid email address.'); valid = false;
    } else {
      const existing = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        showFieldError(emailIn, emailErr, 'An account with this email already exists.'); valid = false;
      } else { showFieldSuccess(emailIn, emailErr); }
    }

    if (!Validate.minLen(pass, 8)) {
      showFieldError(passIn, passErr, 'Password must be at least 8 characters.'); valid = false;
    } else if (!Validate.hasUpper(pass) || !Validate.hasLower(pass) || !Validate.hasNum(pass)) {
      showFieldError(passIn, passErr, 'Include uppercase, lowercase, and a number.'); valid = false;
    } else { showFieldSuccess(passIn, passErr); }

    if (pass !== conf) {
      showFieldError(confirmIn, confirmErr, 'Passwords do not match.'); valid = false;
    } else if (conf) { showFieldSuccess(confirmIn, confirmErr); }

    if (!termsIn.checked) {
      termsErr.classList.add('visible'); valid = false;
    } else { termsErr.classList.remove('visible'); }

    return valid;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account…';

    setTimeout(() => {
      const name  = nameIn.value.trim();
      const email = emailIn.value.trim();
      const pass  = passIn.value;
      const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
      const newUser = {
        id: 'u_' + Date.now(),
        name, email, password: pass, bio: '',
        initials,
        joined: new Date().toISOString().slice(0,10),
      };
      const users = getUsers();
      users.push(newUser);
      saveUsers(users);

      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, bio: '', initials, joined: newUser.joined };
      Storage.setUser(sessionUser);
      Toast.show(`Account created! Welcome to BlogCraft, ${name}! 🚀`, 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 1200);
    }, 800);
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initRegister();
});
