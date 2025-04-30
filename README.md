# 🚗 Aplikasi Web Showroom Mobil

Aplikasi web ini dibuat untuk mengelola data showroom mobil, termasuk data mobil, riwayat servis, perhitungan HPP (Harga Pokok Produksi), serta penghapusan data. Aplikasi dikembangkan menggunakan **MERN Stack (MongoDB, Express, React, Node.js)** dengan styling dari Tailwind CSS.

---

## ✨ Fitur-Fitur

1. **Menambahkan Mobil**
   - Form input data mobil: ID, Merk, Model, Tahun, Harga Dasar.
   - Jika pembelian melalui bank, input tambahan: Pinjaman, Suku Bunga (%/tahun).

2. **Menampilkan Semua Mobil**
   - Halaman utama menampilkan daftar semua mobil (ID, Merk, Model, Tahun).

3. **Menampilkan Detail Mobil**
   - Detail lengkap mobil: spesifikasi, riwayat service, dan info pembiayaan.

4. **Menambahkan Service Mobil**
   - Form input service: ID mobil, Tanggal, Deskripsi, Biaya.
   - Service dikaitkan dengan mobil tertentu.

5. **Menghitung HPP (Harga Pokok Produksi)**
   - Formula:  
     `HPP = Harga Dasar + (Pinjaman × Suku Bunga) + Total Biaya Service`

6. **Menghapus Mobil**
   - Hapus data mobil dari daftar atau dari halaman detail.

---

## 📦 Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Dotenv
- Nodemon

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

---

## ⚙️ Prasyarat (Pre-requisites)

Sebelum menjalankan proyek ini, pastikan Anda sudah menginstal:

- [Node.js & npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- Git

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/username/showroom-mobil-app.git
cd showroom-mobil-app
cd ./Backend || cd ./Frontend
npm install
npm run dev
```

### 2. Access Endpoint that Created

##### Frontend
```bash
http://localhost:{PORT}
```

##### Backend
```bash
http://localhost:3000/api/v1
```