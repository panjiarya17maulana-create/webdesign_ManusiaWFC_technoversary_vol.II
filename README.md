# EcoPath Gunung Anyar

EcoPath adalah website edukasi dan ekowisata yang mengenalkan ekosistem mangrove Gunung Anyar, Surabaya Timur. Pengunjung dapat mempelajari fungsi mangrove, mengenali contoh flora dan fauna pesisir, melihat panorama interaktif, serta menyiapkan kunjungan dengan lebih bertanggung jawab.

**Website:** [EcoPath Gunung Anyar](https://panjiarya17maulana-create.github.io/webdesign_ManusiaWFC_technoversary_vol.II/)

## Fitur Website

### Beranda — `index.html`

- **Pengenalan kawasan:** hero, ringkasan kondisi pesisir, dan statistik kawasan.
- **Jelajah mikrohabitat:** pilih tab Akar Mangrove, Penghuni Pesisir, atau Karbon Biru. Tab akar dilengkapi tiga hotspot yang menjelaskan tajuk, akar napas, dan akar tunjang.
- **Kuis Penjaga Pesisir:** jawab tiga pertanyaan tentang fungsi mangrove, sikap terhadap satwa, dan kebiasaan ramah lingkungan. Hasil menampilkan jumlah jawaban benar; kuis dapat diulang.
- **Info kunjungan cepat:** ringkasan jam kunjungan, lokasi, dan aktivitas utama. Informasi jadwal dan akses perlu dikonfirmasi kepada pengelola sebelum berangkat.
- **Peta interaktif:** peta Leaflet dengan penanda fasilitas seperti dermaga, menara pandang, boardwalk, dan area pembibitan. Titik fasilitas merupakan ilustrasi untuk panduan awal.
- **Kalkulator emisi perjalanan:** masukkan jarak satu arah; estimasi emisi dihitung untuk perjalanan pulang-pergi dengan asumsi 0,12 kg CO₂/km. Hasil juga menunjukkan perkiraan bibit mangrove berdasarkan asumsi 10 kg CO₂/tahun per bibit.
- **Checklist persiapan:** tandai empat langkah persiapan dan gunakan tombol reset bila ingin memulai kembali.
- **Kartu komitmen adopsi mangrove:** masukkan nama dan pilih 1, 3, atau 5 bibit. Pratinjau menghitung estimasi serapan 10 kg CO₂/tahun per bibit.

### Tentang — `about.html`

- Kisah kawasan mangrove Gunung Anyar dan peran kawasan sebagai ruang edukasi pesisir.
- Kartu yang dapat dibuka untuk membaca manfaat mangrove, seperti meredam abrasi dan menyimpan karbon biru.
- Panduan etika berkunjung yang dapat dibuka untuk membaca tips menjaga satwa dan habitat.

### Jelajah — `gallery.html`

- **Katalog biodiversitas:** cari nama spesies dan filter kartu berdasarkan flora atau fauna. Katalog menampilkan contoh mangrove, burung, monyet, dan kepiting yang disebut pada halaman.
- **Tur panorama:** geser panorama dengan mouse atau sentuhan, lalu pilih adegan Jalur Boardwalk atau Pemandangan Menara.
- **Artikel edukasi:** buka artikel tentang abrasi, karbon biru, dan jaring-jaring kehidupan pesisir.

### Kontak — `contact.html`

- Informasi awal lokasi kawasan dan peta lokasi.
- Formulir minat relawan serta formulir saran/pertanyaan dengan indikator kelengkapan data wajib.
- Formulir adalah demo antarmuka: data tidak dikirim atau disimpan ke server.

### Fitur lintas halaman

- Navigasi untuk berpindah antara Beranda, Tentang, Jelajah, dan Kontak.
- Tombol **Suara Alam** di setiap halaman untuk menyalakan atau mematikan soundscape yang dibuat dengan Web Audio API. Slider mengatur volume 0–100%; pilihan volume disimpan di browser agar berlaku lintas halaman pada perangkat yang sama.
- Animasi interaktif seperti indikator progres scroll, parallax hero, tilt kartu, efek magnetik tombol, riak klik, sorotan kursor, dan partikel daun. Efek kursor/parallax ditujukan untuk perangkat desktop dengan mouse; preferensi `prefers-reduced-motion` dihormati.
- Tata letak responsif untuk desktop dan perangkat seluler.

## Alur Penggunaan Website

1. **Mulai dari Beranda.** Baca pengenalan kawasan, lalu gunakan navigasi untuk membuka halaman atau tombol pada hero untuk menuju bagian terkait.
2. **Kenali ekosistem.** Di bagian Jelajah Mikrohabitat, pilih salah satu dari tiga tab. Pada tab Akar Mangrove, pilih hotspot untuk membaca fungsi bagian-bagian mangrove.
3. **Uji pemahaman.** Jawab tiga pertanyaan di Kuis Penjaga Pesisir, baca penjelasan setiap jawaban, lalu lihat hasil kuis. Pilih **Main lagi** untuk mengulang.
4. **Rencanakan kunjungan.** Baca info kunjungan cepat, periksa peta dan penanda fasilitas, lalu masukkan jarak perjalanan pada kalkulator emisi untuk melihat estimasinya.
5. **Siapkan kebiasaan baik.** Tandai checklist sebelum berangkat. Progres tersimpan di browser dan dapat dilanjutkan saat halaman dibuka kembali pada browser/perangkat yang sama.
6. **Pilih aksi konservasi.** Di kartu komitmen, isi nama dan jumlah bibit untuk melihat pratinjau estimasi serapan karbon. Tautan di bagian ini mengarahkan pengunjung ke informasi relawan atau halaman Tentang.
7. **Lanjutkan penjelajahan.** Pada halaman Tentang, buka kartu manfaat dan panduan. Pada halaman Jelajah, cari/filter spesies, pilih adegan tur panorama, dan buka artikel.
8. **Hubungi atau sampaikan minat.** Pada halaman Kontak, baca informasi lokasi, lengkapi formulir relawan atau saran, lalu kirim untuk melihat konfirmasi demo. Pengiriman ini tidak menghubungkan data ke pengelola.
9. **Atur suara bila diperlukan.** Di widget Suara Alam yang tersedia pada setiap halaman, tekan tombol untuk mengaktifkan/menonaktifkan suara dan geser slider untuk mengubah volume.

Alur tersebut merupakan panduan penggunaan yang disarankan; pengunjung dapat berpindah halaman atau bagian melalui navigasi kapan saja.

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

**Tanpa Live Server:** buka `index.html` langsung di browser. Koneksi internet diperlukan agar pustaka CDN, peta, dan font eksternal dapat dimuat.

## Teknologi

- HTML5, CSS3, dan JavaScript
- [Leaflet](https://leafletjs.com/) dan OpenStreetMap untuk peta
- [AOS](https://michalsnik.github.io/aos/) untuk animasi saat menggulir
- [Pannellum](https://pannellum.org/) untuk tur panorama
- Web Audio API untuk soundscape yang dibuat di browser
- `localStorage` browser untuk menyimpan checklist dan preferensi volume

## Catatan

- Panorama merupakan ilustrasi untuk pengalaman website, bukan dokumentasi panorama resmi kawasan.
- Titik fasilitas peta dan informasi kunjungan adalah panduan awal; lokasi masuk, akses, jam buka, serta kegiatan dapat berubah. Konfirmasikan kepada pengelola sebelum berkunjung.
- Kalkulator emisi dan estimasi serapan karbon menggunakan asumsi edukatif, bukan pengukuran resmi.
- Formulir Kontak hanya demonstrasi antarmuka. Tidak ada backend untuk menerima atau menyimpan kiriman.
- Checklist dan preferensi volume tersimpan secara lokal pada browser/perangkat yang digunakan.

## Struktur Halaman

| Halaman | File | Isi utama |
| --- | --- | --- |
| Beranda | `index.html` | Pengenalan, mikrohabitat, kuis, info kunjungan, peta, kalkulator emisi, checklist, dan kartu komitmen |
| Tentang | `about.html` | Kisah kawasan, manfaat mangrove, dan panduan konservasi |
| Jelajah | `gallery.html` | Katalog flora/fauna, tur panorama, dan artikel edukasi |
| Kontak | `contact.html` | Informasi lokasi, formulir minat relawan, dan formulir saran |

## Tim

- **Nama tim:** Manusia WFC
- **Anggota:**
  - Panji Arya Maulana
  - Ferdian
  - Ahmad Ghilman
