/* =============================================================
   app.js — Application Logic
   Mentai Yammy © 2025
   ============================================================= */

'use strict';

/* ──────────────────────────────────────────
   STATE
   ────────────────────────────────────────── */
let currentUser     = null;   // { name, email, orders }
let cart            = [];     // [{ ...MenuItem, qty }]
let currentItem     = null;   // MenuItem being viewed in detail
let currentQty      = 1;
let selectedWallet  = null;   // string wallet id
let countdownTimer  = null;   // setInterval reference
let activeMenuCat   = 'semua';

/* ──────────────────────────────────────────
   INITIALISE
   ────────────────────────────────────────── */
(function init() {
  // Auto-navigate from splash after 2 seconds
  setTimeout(() => showScreen('home'), 2000);

  // First render of the menu
  renderMenu(MENU_DATA);
})();

/* ──────────────────────────────────────────
   SCREEN NAVIGATION
   ────────────────────────────────────────── */

/**
 * Show a named screen and hide all others.
 * @param {string} id - The screen element's id attribute
 */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Screen-specific side effects
  if (id === 'cart')    renderCart();
  if (id === 'profile') renderProfile();

  window.scrollTo(0, 0);
}

/**
 * Handle bottom-navigation tab clicks.
 * Requires login for 'cart'.
 * @param {string} tab
 * @param {HTMLElement} btn
 */
function switchTab(tab, btn) {
  if (tab === 'cart' && !currentUser) {
    showToast('Login dulu untuk melihat keranjang! 🛒');
    showScreen('login');
    return;
  }

  const screenMap = { home: 'home', cart: 'cart', profile: 'profile' };
  showScreen(screenMap[tab]);
}

/* ──────────────────────────────────────────
   MENU RENDERING & FILTERING
   ────────────────────────────────────────── */

/**
 * Render menu cards into #menu-grid.
 * @param {MenuItem[]} items
 */
function renderMenu(items) {
  const grid = document.getElementById('menu-grid');

  if (!items.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:30px;color:var(--gray)">Menu tidak ditemukan 😕</p>';
    return;
  }

  grid.innerHTML = items.map(m => `
    <div class="menu-card" onclick="openDetail(${m.id})">
      ${m.popular ? '<span class="badge-popular">🔥 Popular</span>' : ''}
      ${m.isNew    ? '<span class="badge-new">✨ Baru</span>'       : ''}
      <div class="menu-emoji-img">${m.emoji}</div>
      <div class="menu-info">
        <div class="menu-name">${m.name}</div>
        <div class="menu-desc">${m.desc}</div>
        <div class="menu-price">Rp ${m.price.toLocaleString('id-ID')}</div>
      </div>
    </div>
  `).join('');
}

/**
 * Filter by category tab click.
 * @param {string}      cat
 * @param {HTMLElement} btn
 */
function filterCat(cat, btn) {
  activeMenuCat = cat;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

/**
 * Filter by search input.
 */
function filterMenu() {
  applyFilters();
}

/**
 * Applies both category and search filters simultaneously.
 */
function applyFilters() {
  const query = (document.getElementById('search-input').value || '').toLowerCase();

  let filtered = MENU_DATA;

  if (activeMenuCat !== 'semua') {
    filtered = filtered.filter(m => m.cat === activeMenuCat);
  }

  if (query) {
    filtered = filtered.filter(
      m => m.name.toLowerCase().includes(query) || m.desc.toLowerCase().includes(query)
    );
  }

  renderMenu(filtered);
}

/* ──────────────────────────────────────────
   DETAIL PAGE
   ────────────────────────────────────────── */

/**
 * Open the detail page for a menu item.
 * @param {number} id
 */
function openDetail(id) {
  currentItem = MENU_DATA.find(m => m.id === id);
  if (!currentItem) return;

  currentQty = 1;

  // Populate DOM
  document.getElementById('detail-emoji').textContent   = currentItem.emoji;
  document.getElementById('detail-cat').textContent     = capitalise(currentItem.cat);
  document.getElementById('detail-name').textContent    = currentItem.name;
  document.getElementById('detail-price').textContent   = 'Rp ' + fmt(currentItem.price);
  document.getElementById('detail-desc').textContent    = currentItem.detail;
  document.getElementById('detail-rating').textContent  = currentItem.rating;
  document.getElementById('detail-cal').textContent     = currentItem.cal;
  document.getElementById('detail-portion').textContent = currentItem.portion;

  const hotEl = document.getElementById('detail-hot');
  hotEl.style.display = currentItem.popular ? 'inline-block' : 'none';

  updateDetailTotal();
  showScreen('detail');
}

/**
 * Increment or decrement detail qty.
 * @param {number} delta - +1 or -1
 */
function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-display').textContent = currentQty;
  updateDetailTotal();
}

/** Recalculate and show the running total on the detail CTA. */
function updateDetailTotal() {
  if (!currentItem) return;
  document.getElementById('detail-total').textContent = 'Rp ' + fmt(currentItem.price * currentQty);
}

/**
 * Add currentItem * currentQty to cart.
 * Requires login.
 */
function addToCart() {
  if (!currentUser) {
    showToast('Login dulu untuk memesan! 😊');
    showScreen('login');
    return;
  }

  const existing = cart.find(c => c.id === currentItem.id);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({ ...currentItem, qty: currentQty });
  }

  showToast(`${currentItem.emoji} ${currentItem.name} ditambahkan!`);
  showScreen('home');
}

/* ──────────────────────────────────────────
   CART
   ────────────────────────────────────────── */

/** Render the cart screen contents. */
function renderCart() {
  const body = document.getElementById('cart-body');

  // Not logged in
  if (!currentUser) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🔐</div>
        <h3>Perlu Login</h3>
        <p>Login dulu untuk melihat keranjang belanjamu</p>
        <button
          class="btn-primary"
          style="margin-top:20px;padding:14px 28px;width:auto"
          onclick="showScreen('login')"
        >Masuk Sekarang</button>
      </div>`;
    return;
  }

  // Empty cart
  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h3>Keranjang Kosong</h3>
        <p>Yuk pilih dimsum favoritmu dulu!</p>
        <button
          class="btn-primary"
          style="margin-top:20px;padding:14px 28px;width:auto"
          onclick="showScreen('home')"
        >Lihat Menu</button>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const ongkir   = subtotal >= 50000 ? 0 : 8000;
  const total    = subtotal + ongkir;

  body.innerHTML = `
    <div class="cart-items">
      ${cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item-img">${item.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">Rp ${fmt(item.price * item.qty)}</div>
            <div class="cart-item-qty">
              <button class="cq-btn" onclick="updateCartItem(${i}, -1)">−</button>
              <span style="font-weight:700">${item.qty}</span>
              <button class="cq-btn" onclick="updateCartItem(${i},  1)">+</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>Rp ${fmt(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Ongkos Kirim</span>
        <span style="color:${ongkir === 0 ? '#27ae60' : 'inherit'}">
          ${ongkir === 0 ? '🎉 Gratis' : 'Rp ' + fmt(ongkir)}
        </span>
      </div>
      <div class="summary-row">
        <span>Total</span>
        <span style="color:var(--orange)">Rp ${fmt(total)}</span>
      </div>
    </div>

    <button class="btn-checkout" onclick="openPayment()">
      💳 Bayar Sekarang · Rp ${fmt(total)}
    </button>
  `;
}

/**
 * Update cart item quantity. Remove if qty reaches 0.
 * @param {number} index
 * @param {number} delta
 */
function updateCartItem(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

/* ──────────────────────────────────────────
   PAYMENT
   ────────────────────────────────────────── */

/** Open the payment modal, reset to step 1. */
function openPayment() {
  selectedWallet = null;

  document.querySelectorAll('.ewallet-btn').forEach(b => b.classList.remove('selected'));
  setQRButtonState(false);

  document.getElementById('modal-step-1').style.display = 'block';
  document.getElementById('modal-step-2').style.display = 'none';
  document.getElementById('payment-modal').classList.add('active');
}

/**
 * Select an e-wallet option.
 * @param {HTMLElement} btn
 * @param {string}      walletId
 */
function selectWallet(btn, walletId) {
  document.querySelectorAll('.ewallet-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedWallet = walletId;
  setQRButtonState(true);
}

/** Enable or disable the "proceed to QR" button. */
function setQRButtonState(enabled) {
  const qrBtn = document.getElementById('btn-show-qr');
  qrBtn.style.opacity       = enabled ? '1'    : '0.5';
  qrBtn.style.pointerEvents = enabled ? 'auto' : 'none';
}

/** Advance from wallet selection to QR display. */
function showQR() {
  if (!selectedWallet) return;

  const total      = cartTotal();
  const walletName = EWALLET_DATA.find(w => w.id === selectedWallet)?.name || '';

  document.getElementById('wallet-name-show').textContent = walletName;
  document.getElementById('pay-amount-show').textContent  = 'Rp ' + fmt(total);

  document.getElementById('modal-step-1').style.display = 'none';
  document.getElementById('modal-step-2').style.display = 'block';

  startCountdown(300); // 5 minutes
}

/** Go back to wallet selection from QR step. */
function backToWallet() {
  clearCountdown();
  document.getElementById('modal-step-1').style.display = 'block';
  document.getElementById('modal-step-2').style.display = 'none';
}

/** Close the payment modal. */
function closeModal() {
  clearCountdown();
  document.getElementById('payment-modal').classList.remove('active');
}

/** Confirm payment and show success screen. */
function confirmPayment() {
  clearCountdown();
  document.getElementById('payment-modal').classList.remove('active');

  // Generate a simple order ID
  const orderId = 'MY-' + Date.now().toString().slice(-8);
  document.getElementById('order-id-show').textContent = orderId;

  // Update user's order count
  if (currentUser) currentUser.orders = (currentUser.orders || 0) + 1;

  cart = []; // Clear cart after payment
  document.getElementById('success-modal').classList.add('active');
}

/** Close the success modal and go home. */
function closeSuccess() {
  document.getElementById('success-modal').classList.remove('active');
  showScreen('home');
}

/* ──────────────────────────────────────────
   COUNTDOWN TIMER
   ────────────────────────────────────────── */

/**
 * Start a countdown timer displayed in #countdown.
 * @param {number} seconds
 */
function startCountdown(seconds) {
  clearCountdown();
  let remaining = seconds;
  const el = document.getElementById('countdown');

  countdownTimer = setInterval(() => {
    remaining--;
    const m   = Math.floor(remaining / 60);
    const s   = remaining % 60;
    el.textContent = `${pad(m)}:${pad(s)}`;
    if (remaining <= 0) clearCountdown();
  }, 1000);
}

function clearCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

/* ──────────────────────────────────────────
   AUTH
   ────────────────────────────────────────── */

/** Simulate login (demo – no real backend). */
function doLogin() {
  const emailEl = document.getElementById('login-email');
  const email   = emailEl?.value?.trim() || 'pengguna@email.com';
  const name    = capitalise(email.split('@')[0]);

  currentUser = { name, email, orders: 3 };
  syncAuthUI();
  showScreen('home');
  showToast(`Selamat datang, ${currentUser.name}! 🎉`);
}

/** Simulate registration (demo – no real backend). */
function doRegister() {
  const nameVal  = document.getElementById('reg-name')?.value?.trim()  || 'Pelanggan Baru';
  const emailVal = document.getElementById('reg-email')?.value?.trim() || 'pengguna@email.com';

  currentUser = { name: nameVal, email: emailVal, orders: 0 };
  syncAuthUI();
  showScreen('home');
  showToast(`Akun berhasil dibuat, ${nameVal}! 🎉`);
}

/** Log out the current user. */
function doLogout() {
  currentUser = null;
  cart        = [];
  syncAuthUI();
  showScreen('home');
  showToast('Berhasil keluar. Sampai jumpa! 👋');
}

/** Sync navbar & profile UI to current auth state. */
function syncAuthUI() {
  const showAuth = !currentUser;
  document.getElementById('nav-auth-btns').style.display = showAuth ? 'flex'  : 'none';
  document.getElementById('nav-user-btns').style.display = showAuth ? 'none'  : 'flex';
}

/* ──────────────────────────────────────────
   PROFILE
   ────────────────────────────────────────── */

/** Render profile screen based on auth state. */
function renderProfile() {
  const logoutBtn    = document.getElementById('logout-btn');
  const loginBtns    = document.getElementById('prof-login-btns');
  const nameEl       = document.getElementById('prof-name');
  const emailEl      = document.getElementById('prof-email');
  const avatarEl     = document.getElementById('prof-avatar');
  const ordersEl     = document.getElementById('prof-orders');

  if (currentUser) {
    nameEl.textContent   = currentUser.name;
    emailEl.textContent  = currentUser.email;
    avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();
    ordersEl.textContent = currentUser.orders || 0;
    logoutBtn.style.display = 'block';
    loginBtns.style.display = 'none';
  } else {
    nameEl.textContent   = 'Halo, Tamu!';
    emailEl.textContent  = 'Login untuk fitur lengkap';
    avatarEl.textContent = '👤';
    ordersEl.textContent = '—';
    logoutBtn.style.display = 'none';
    loginBtns.style.display = 'flex';
  }
}

/** Profile feature that requires login. */
function checkLogin() {
  if (!currentUser) {
    showToast('Login dulu ya! 😊');
    showScreen('login');
  } else {
    showToast('Fitur segera hadir! 🚀');
  }
}

/* ──────────────────────────────────────────
   TOAST NOTIFICATION
   ────────────────────────────────────────── */

let toastTimer = null;

/**
 * Show a toast message for 2.5 seconds.
 * @param {string} message
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ──────────────────────────────────────────
   UTILITY HELPERS
   ────────────────────────────────────────── */

/**
 * Format a number as Indonesian rupiah (no symbol, commas only).
 * @param {number} n
 * @returns {string}
 */
function fmt(n) {
  return n.toLocaleString('id-ID');
}

/**
 * Capitalise first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Zero-pad a number to 2 digits.
 * @param {number} n
 * @returns {string}
 */
function pad(n) {
  return String(n).padStart(2, '0');
}

/**
 * Calculate total cart value (excluding delivery).
 * @returns {number}
 */
function cartTotal() {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const ongkir   = subtotal >= 50000 ? 0 : 8000;
  return subtotal + ongkir;
}
