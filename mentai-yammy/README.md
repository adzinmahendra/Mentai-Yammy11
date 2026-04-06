# 🍱 Mentai Yammy

Aplikasi UMKM Dimsum, Mentai & Wonton berbasis web — siap deploy ke **Vercel** via **GitHub**.

---

## 📁 Struktur Project

```
mentai-yammy/
├── index.html          ← Markup utama (semua layar)
├── css/
│   ├── base.css        ← CSS Variables, Reset, Animasi
│   ├── components.css  ← Komponen reusable (navbar, card, modal, dll)
│   └── screens.css     ← Style per-layar (splash, home, detail, cart, dll)
├── js/
│   ├── data.js         ← Data menu & konstanta
│   └── app.js          ← Semua logika aplikasi
└── README.md
```

---

## 🚀 Cara Deploy ke Vercel via GitHub

### 1. Buat Repository di GitHub

```bash
# Inisialisasi Git
git init
git add .
git commit -m "feat: initial commit Mentai Yammy app"

# Buat repo baru di GitHub (github.com/new), lalu:
git remote add origin https://github.com/USERNAME/mentai-yammy.git
git branch -M main
git push -u origin main
```

### 2. Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → **Log in with GitHub**
2. Klik **"Add New Project"**
3. Pilih repository `mentai-yammy`
4. Klik **Deploy** — Vercel otomatis mendeteksi static site
5. Selesai! URL live akan diberikan (contoh: `mentai-yammy.vercel.app`)

### 3. Update Otomatis

Setiap kali push ke branch `main`, Vercel otomatis rebuild & deploy ulang.

```bash
git add .
git commit -m "update: ..."
git push
```

---

## ✨ Fitur Aplikasi

| Fitur | Keterangan |
|---|---|
| 🔐 Auth (Login/Register) | Tamu hanya bisa lihat menu, harus login untuk pesan |
| 🏠 Beranda | Hero, promo banner, filter kategori, search menu |
| 🥟 Detail Menu | Deskripsi lengkap, rating, kalori, porsi, qty control |
| 🛒 Keranjang | Edit qty, hitung subtotal + ongkir otomatis |
| 💳 Pembayaran | Pilih e-wallet (GoPay/OVO/DANA/ShopeePay), QR scan simulasi |
| 👤 Profil | Info akun, riwayat pesanan, alamat, logout |
| 🔔 Toast Notifikasi | Feedback aksi pengguna |

---

## 🛠️ Tech Stack

- **HTML5** — Struktur & layout
- **CSS3** — Variabel, animasi, responsive grid
- **Vanilla JavaScript** — Tanpa framework, ringan & cepat
- **Google Fonts** — Playfair Display + DM Sans

---

## 📱 Responsif

Dioptimalkan untuk tampilan mobile (360px – 480px) dan desktop.

---

## 📞 Kontak UMKM

**Mentai Yammy**  
📍 Kota Solo, Jawa Tengah  
📱 WhatsApp: 0812-xxxx-xxxx  
📸 Instagram: @mentaiyammy
# Mentai-Yammy11
