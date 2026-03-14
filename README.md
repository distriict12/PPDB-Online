# 🎓 PPDB Online — Fullstack Application

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react)
![Golang](https://img.shields.io/badge/Backend-Golang-00ADD8?style=for-the-badge&logo=go)

Aplikasi **Penerimaan Peserta Didik Baru (PPDB) Online** yang dirancang untuk membantu sekolah dalam mengelola proses pendaftaran siswa baru secara digital dan efisien. Dibangun dengan arsitektur **Full-Stack** modern — Backend yang robust dan Frontend yang interaktif serta responsif.

---

## 📌 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [Screenshot](#-screenshot)
- [Cara Menjalankan Proyek](#-cara-menjalankan-proyek)
- [Pengembang](#-pengembang)

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📊 Dashboard | Ringkasan statistik pendaftar: Total, Perlu Verifikasi, Lolos, dan Ditolak |
| 📋 Verifikasi Pendaftar | Manajemen pendaftar dengan fitur pencarian, filter status, dan aksi verifikasi berkas |
| 👥 Manajemen Akun | Pengelolaan role dan hak akses akun Admin |
| 🖨️ Laporan & Ekspor | Ekspor data pendaftar ke format **.xlsx (Excel)** untuk rekapitulasi |
| 🔒 Autentikasi JWT | Keamanan API menggunakan **JSON Web Token** |

---

## 🛠️ Teknologi yang Digunakan

**Frontend**
- [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

**Backend**
- [Golang (Go)](https://golang.org/)
- RESTful API
- [JWT](https://jwt.io/) — JSON Web Token
- [MySQL](https://www.mysql.com/)

---

## 📸 Screenshot

### Dashboard Utama
![Dashboard](./screenshots/dashboard.png)

### Verifikasi Pendaftar
![Verifikasi](./screenshots/verifikasi.png)

### Manajemen Akun
![Manajemen Akun](./screenshots/manajemen-akun.png)

### Laporan & Ekspor
![Laporan](./screenshots/laporan.png)

> 💡 Simpan screenshot ke folder `/screenshots` di root proyek agar gambar tampil otomatis.

---

## 🚀 Cara Menjalankan Proyek

Pastikan kamu sudah menginstall:
- [Node.js](https://nodejs.org/) v18+
- [Go](https://golang.org/) v1.21+
- [MySQL](https://www.mysql.com/)

### 1. Clone Repository
```bash
git clone https://github.com/distriict12/PPDB-Online.git
cd PPDB-Online
```

### 2. Setup Backend
```bash
cd backend-ppdb

# Salin file environment
cp .env.example .env

# Isi konfigurasi database di file .env
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=ppdb_db
# DB_USER=root
# DB_PASSWORD=yourpassword
# JWT_SECRET=your_jwt_secret

# Install dependencies & jalankan server
go mod tidy
go run main.go
```

> Server backend berjalan di `http://localhost:8080`

### 3. Setup Frontend
```bash
cd frontend-ppdb

# Install dependencies
npm install

# Salin file environment
cp .env.example .env

# Isi base URL API di file .env
# VITE_API_URL=http://localhost:8080

# Jalankan development server
npm run dev
```

> Aplikasi frontend berjalan di `http://localhost:5173`

### 4. Setup Database

Import file SQL yang tersedia ke MySQL:
```bash
mysql -u root -p ppdb_db < database/ppdb.sql
```

---

## 👨‍💻 Pengembang

Dikembangkan oleh **Mohamad Ali** ([@distriict12](https://github.com/distriict12)).

Tertarik berkolaborasi atau ingin melihat proyek lainnya? Kunjungi profil GitHub saya!

---

📝 **Lisensi:** Proyek ini menggunakan lisensi [MIT](./LICENSE).
