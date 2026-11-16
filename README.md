# EcoPath Gunung Anyar

Website edukasi dan ekowisata yang mengenalkan kawasan mangrove Gunung Anyar, Surabaya. Pengunjung dapat mempelajari ekosistem pesisir, menjelajahi biodiversitas, melihat panorama interaktif, dan merencanakan kunjungan dengan lebih bertanggung jawab.

**Website:** [EcoPath Gunung Anyar](https://panjiarya17maulana-create.github.io/webdesign_ManusiaWFC_technoversary_vol.II/)

## Fitur

- Halaman Beranda dengan pengenalan kawasan, kuis konservasi, peta, dan kalkulator estimasi emisi perjalanan.
- Halaman Tentang dengan informasi fungsi mangrove dan panduan berkunjung interaktif.
- Halaman Jelajah dengan pencarian dan filter flora/fauna, tur panorama 360°, serta artikel edukasi.
- Halaman Kontak dengan informasi lokasi dan formulir minat relawan.
- Desain responsif untuk desktop dan perangkat seluler, dengan animasi yang menghormati preferensi reduced motion.

> Formulir Kontak saat ini hanya demonstrasi antarmuka. Data tidak dikirim atau disimpan ke server.

## Instalasi

1. Pastikan Git dan browser modern sudah tersedia.
2. Clone repositori:

   ```bash
   git clone https://github.com/panjiarya17maulana-create/webdesign_ManusiaWFC_technoversary_vol.II.git
   ```

3. Masuk ke folder proyek:

   ```bash
   cd webdesign_ManusiaWFC_technoversary_vol.II
   ```

Tidak diperlukan instalasi package atau proses build. Website menggunakan HTML, CSS, dan JavaScript, serta beberapa pustaka yang dimuat melalui CDN.

## Cara Menjalankan

**Dengan Visual Studio Code dan Live Server:**

1. Buka folder proyek di Visual Studio Code.
2. Jika belum tersedia, pasang ekstensi **Live Server**.
3. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
4. Browser akan membuka website lokal. Gunakan navigasi untuk membuka halaman Tentang, Jelajah, atau Kontak.

**Tanpa Live Server:** buka `index.html` langsung di browser. Koneksi internet diperlukan agar pustaka eksternal, peta, dan font dari CDN dapat dimuat.

## Teknologi

- HTML5, CSS3, dan JavaScript
- [Leaflet](https://leafletjs.com/) dan OpenStreetMap untuk peta
- [AOS](https://michalsnik.github.io/aos/) untuk animasi saat menggulir
- [Pannellum](https://pannellum.org/) untuk tur panorama

## Struktur Halaman

| Halaman | File | Isi |
| --- | --- | --- |
| Beranda | `index.html` | Pengenalan, kuis, peta, kalkulator emisi, dan checklist kunjungan |
| Tentang | `about.html` | Kisah kawasan, fungsi mangrove, dan panduan konservasi |
| Jelajah | `gallery.html` | Biodiversitas, tur panorama, dan artikel edukasi |
| Kontak | `contact.html` | Informasi lokasi, formulir relawan, dan formulir saran |

## Tim

- **Nama tim:** Manusia WFC
- **Anggota:**
  - Panji Arya Maulana
  - Ferdian
  - Ahmad Ghilman