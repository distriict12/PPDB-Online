# 🎓 PPDB Online — Fullstack Application

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Golang](https://img.shields.io/badge/Backend-Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

Aplikasi **Penerimaan Peserta Didik Baru (PPDB) Online** yang dirancang untuk membantu sekolah dalam mengelola proses pendaftaran siswa baru secara digital, cepat, dan efisien. 

Dibangun dengan arsitektur **Full-Stack** modern — memadukan *Backend* yang tangguh (*robust*) dan *Frontend* yang interaktif serta responsif. Dilengkapi dengan sistem autentikasi keamanan tinggi (JWT) dan antarmuka pengguna *(UI/UX)* bernuansa *Dark Mode* yang elegan.

---

## Fitur & Antarmuka Aplikasi

### Panel Admin (Pengelola)

**1. Dashboard Statistik**
Ringkasan pendaftar secara *real-time* (Total, Perlu Verifikasi, Lolos, Ditolak).
![Dashboard Admin](https://github.com/distriict12/PPDB-Online/blob/main/public/Dashboard%20Utama-admin.png?raw=true)

**2. Verifikasi Pendaftar**
Manajemen pendaftar dengan pencarian, filter status, dan aksi verifikasi berkas (Terima/Tolak).
![Verifikasi Admin](https://github.com/distriict12/PPDB-Online/blob/main/public/Verifikasi%20Pendaftar-admin.png?raw=true)

**3. Manajemen Akun & Keamanan**
Pengelolaan *role*, pembuatan hak akses tingkat Admin, serta akses *login* khusus pengelola sistem PPDB.

---

### Portal Siswa (Pendaftar)

**1. Registrasi & Login**
Pembuatan akun baru dan akses masuk bagi calon peserta didik untuk memulai pendaftaran.
![Halaman Login](https://github.com/distriict12/PPDB-Online/blob/main/public/Halaman%20Login.png?raw=true)
![Halaman Register](https://github.com/distriict12/PPDB-Online/blob/main/public/Halaman%20Register.png?raw=true)

**2. Dashboard Siswa & Cek Status**
Siswa dapat memantau hasil seleksi dan status verifikasi berkas mereka secara langsung dari panel ini.
![Dashboard Siswa](https://github.com/distriict12/PPDB-Online/blob/main/public/Dashboard%20Utama-siswa.png?raw=true)

**3. Formulir Pendaftaran & Unggah Dokumen**
Antarmuka pengisian data diri dan kelengkapan pendaftaran secara responsif, dilengkapi sistem validasi unggah berkas.
![Formulir Siswa](https://github.com/distriict12/PPDB-Online/blob/main/public/Formulir%20Pendaftaran-siswa.png?raw=true)

---

### ⚙️ Sistem Inti (Core)
- 🔒 **Autentikasi JWT:** Keamanan *login* berlapis dan perlindungan jalur API menggunakan **JSON Web Token**.

---

## Teknologi yang Digunakan

** Frontend**
- [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

**⚙️ Backend**
- [Golang (Go)](https://golang.org/)
- RESTful API
- [JWT](https://jwt.io/) — JSON Web Token
- [MySQL](https://www.mysql.com/)

---

## 🚀 Cara Menjalankan Proyek

Install terlebih dahulu dependensi berikut:
- [Node.js](https://nodejs.org/) v20+ (Direkomendasikan v22+)
- [Go](https://golang.org/) v1.25+
- [MySQL](https://www.mysql.com/)

### 1. Clone Repository
```bash
git clone [https://github.com/distriict12/PPDB-Online.git](https://github.com/distriict12/PPDB-Online.git)
cd PPDB-Online
```

### 2. Setup Database
Buat terlebih dahulu database kosong di MySQL lokal kamu sebelum menjalankan backend:
```sql
CREATE DATABASE db_ppdb;
```

### 3. Setup Backend
Masuk ke folder backend:
```bash
cd backend-ppdb
```

Buat file `.env` di dalam folder tersebut dan isi dengan konfigurasi berikut:
```env
APP_PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=(password mysql kamu)
DB_NAME=db_ppdb
JWT_SECRET=(rahasia jwt kamu)
```

Install dependensi dan jalankan server:
```bash
go mod tidy
go run main.go
```
> Server backend berjalan di `http://localhost:3000`

### 4. Setup Frontend
Buka tab terminal baru (biarkan server backend tetap berjalan), lalu masuk ke folder frontend:
```bash
cd frontend-ppdb
```

Install dependensi dan jalankan development server:
```bash
npm install

npm run dev
```
> Aplikasi frontend berjalan di `http://localhost:5173`

---

## 👨‍💻 Pengembang

Dikembangkan dengan penuh dedikasi oleh **Mohamad Ali** 🚀

Tertarik berkolaborasi, diskusi teknologi, atau sekadar *networking*? Mari terhubung melalui:

[![GitHub](https://img.shields.io/badge/GitHub-distriict12-181717?style=for-the-badge&logo=github)](https://github.com/distriict12)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mohamad_Ali-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/username-linkedin-kapten/)
[![Email](https://img.shields.io/badge/Email-Hubungi_Saya-EA4335?style=for-the-badge&logo=gmail)](mailto:email.pve.mohamadali@gmail.com)

⭐ *Jika kamu menyukai proyek ini atau merasa terbantu, jangan ragu untuk memberikan bintang (Star) pada repository ini!*

---

📝 **Lisensi:** Proyek ini didistribusikan di bawah lisensi [MIT](./LICENSE).
