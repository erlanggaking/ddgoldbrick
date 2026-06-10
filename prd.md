# Product Requirements Document (PRD) - Lego E-Commerce Platform

## 1. Informasi Dokumen
* **Nama Proyek:** Lego E-Commerce Platform
* **Status:** Draft
* **Tanggal:** 11 Juni 2026
* **Target Rilis:** Q3 2026

---

## 2. Executive Summary & Background
Proyek ini bertujuan untuk membangun sebuah platform e-commerce mandiri yang didedikasikan khusus untuk penjualan produk Lego (baik set baru, *rare/collector items*, maupun suku cadang jika diperlukan). Platform ini dirancang untuk memberikan pengalaman belanja yang mulus dan intuitif bagi para kolektor (*Adult Fans of Lego* / AFOL) maupun pembeli kasual, dengan navigasi utama yang berfokus pada kategorisasi berdasarkan tema Lego. 

Sistem ini akan mengotomatisasi seluruh alur transaksi, mulai dari perhitungan ongkos kirim *real-time* hingga penyelesaian pembayaran melalui *payment gateway* lokal, serta menyediakan jalur komunikasi cepat via WhatsApp.

---

## 3. Goals & Success Metrics (KPIs)
### 3.1. Goals
* Menyediakan platform belanja yang memiliki navigasi cepat dan terstruktur berdasarkan tema Lego.
* Mengurangi gesekan (*friction*) saat checkout dengan sistem otomasi cek ongkir dan *payment gateway*.
* Menghadirkan antarmuka (UI/UX) yang *clean*, *minimalist*, dan *elegant* guna menonjolkan visual produk Lego yang berwarna-warni.
* Menyediakan dasbor internal untuk memantau performa bisnis secara *real-time*.

### 3.2. Success Metrics (KPIs)
* **Trafik & Jangkauan:** Peningkatan jumlah pengunjung unik (*Unique Visitors*) dan jangkauan (*Reach*) bulanan.
* **Engagement:** Rata-rata durasi sesi pengguna di halaman detail produk dan interaksi dengan fitur filter tema.
* **Conversion Rate:** Persentase pengunjung yang menyelesaikan pembayaran dibanding total kunjungan.
* **Sales & Profit:** Metrik laba bersih dan total penjualan yang terlacak akurat di dasbor admin.

---

## 4. User Persona & Target Audience
1.  **Kolektor Lego / AFOL (Adult Fans of Lego):** Pengguna yang mencari set spesifik, edisi terbatas, atau seri langka (misal: Star Wars UCS, Technic, Creator Expert). Mereka peduli pada detail nomor set, kondisi boks, dan keaslian.
2.  **Orang Tua / Pembeli Hadiah:** Pengguna kasual yang mencari Lego untuk anak-anak atau hadiah berdasarkan tema populer (misal: Lego City, Ninjago, Friends) atau rentang usia tertentu.

---

## 5. Functional Requirements (Fitur Inti)

### 5.1. Fitur Pengguna (Front-end)
#### A. Navigasi & Kategorisasi Tema Lego
* Sistem wajib menyediakan menu navigasi utama yang menampilkan daftar Tema Lego secara terstruktur (contoh: Star Wars, Harry Potter, Technic, Architecture, City, Speed Champions, dll.).
* Halaman katalog harus memiliki filter dinamis berdasarkan:
    * Tema
    * Rentang Harga
    * Kondisi (MISB - *Mint in Sealed Box*, BIB - *Box in Box*, Loose, dll.)
    * Tahun Rilis / Nomor Set

#### B. Halaman Detail Produk (Product Detail Page - PDP)
* Galeri foto produk resolusi tinggi dengan fitur *zoom*.
* Informasi spesifik Lego: Nomor Set (e.g., 75192), Jumlah *Pieces*, Jumlah Minifigures, Tahun Rilis, dan Dimensi Box.
* Label kondisi produk yang jelas (Baru/Bekas, Kondisi Boks % mulus).

#### C. Shopping Cart & Cek Ongkir Otomatis
* Pengguna dapat memasukkan beberapa produk ke keranjang belanja.
* Pada halaman *checkout*, sistem mengintegrasikan API pengiriman untuk mendeteksi lokasi pengguna hingga tingkat kecamatan.
* Sistem menghitung berat total (atau berat volume) boks Lego untuk memunculkan pilihan kurir (JNE, J&T, Sicepat, GoSend/GrabExpress untuk lokal) beserta tarifnya secara *real-time*.

#### D. Payment Gateway Integration
* Proses pembayaran otomatis tanpa perlu konfirmasi manual (unggah bukti transfer).
* Mendukung berbagai metode pembayaran:
    * Virtual Account (BCA, Mandiri, BNI, BRI)
    * E-Wallet (GoPay, OVO, ShopeePay, Dana)
    * Kartu Kredit / Debit Online

#### E. Dukungan Bilingual (Multi-language)
* Menyediakan *toggle* bahasa untuk mengubah seluruh antarmuka situs antara **Bahasa Indonesia** dan **English**, guna memfasilitasi pembeli ekspatriat atau kolektor internasional.

#### F. WhatsApp Integration
* Menyediakan tombol *floating* WhatsApp yang mengarah langsung ke tim *customer service*.
* Saat diklik dari halaman detail produk, pesan otomatis akan terformat membawa nama produk atau link produk tersebut untuk mempermudah konsultasi stok/kondisi.

### 5.2. Fitur Admin & Backend (Back-end)
#### A. Manajemen Produk & Inventaris
* Input produk baru dengan multi-kategori (Tema Utama, Sub-tema).
* Manajemen stok otomatis (stok berkurang saat pesanan masuk/terbayar, dan kembali bertambah jika pesanan *expired*).

#### B. Manajemen Pesanan (Order Management System)
* Pelacakan status pesanan: *Menunggu Pembayaran*, *Diproses*, *Dikirim* (input nomor resi otomatis/manual), *Selesai*, *Dibatalkan*.

#### C. Internal Analytics Dashboard
* Halaman dasbor khusus admin untuk memantau performa bisnis dengan visualisasi grafik:
    * **Traffic & Reach:** Jumlah kunjungan harian/mingguan/bulanan.
    * **Engagement Metrics:** Produk yang paling sering dilihat dan dimasukkan ke keranjang.
    * **Sales Profit:** Laporan pendapatan kotor, harga pokok penjualan (HPP), dan laba bersih secara real-time.

---

## 6. Non-Functional Requirements & Design Principles
* **Desain Antarmuka (UI/UX):** Mengadopsi estetika yang *minimalist, clean,* dan *elegant*. Background dominan bersih (putih/abu-abu sangat muda) dengan tipografi yang kuat, memastikan visual produk Lego yang kaya warna menjadi pusat perhatian utama pengguna.
* **Kecepatan & Performa:** Waktu pemuatan halaman awal (*First Contentful Paint*) harus di bawah 2 detik untuk optimasi SEO dan konversi.
* **Mobile-First Design:** Karena mayoritas transaksi e-commerce berasal dari perangkat mobile, tata letak menu tema dan proses checkout harus dioptimalkan untuk layar ponsel.
* **Keamanan Data:** Enkripsi SSL penuh, perlindungan data transaksi pengguna, dan integrasi API yang aman (*secure token validation*).

---

## 7. Arsitektur & Integrasi Pihak Ketiga (Rekomendasi)
* **Platform Pengiriman (Cek Ongkir):** RajaOngkir API (Pro) / Biteship API.
* **Payment Gateway:** Midtrans / Xendit.
* **Framework/Tech Stack:** Next.js (Frontend, bagus untuk SEO katalog Lego) + Node.js/Go (Backend) + PostgreSQL (Database).