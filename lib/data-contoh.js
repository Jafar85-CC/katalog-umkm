// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Guzheng Sihir Dawai Giok Hulala",
    harga: 1250000,
    deskripsi:
      "Alat musik petik tradisional berukir naga dengan senar berdaya sihir mistik yang memancarkan melodi penenang sukma saat dimainkan.",
    foto_url: "/produk/guzheng-sihir.svg",
    kategori: "Instrumen Sihir",
  },
  {
    id: 2,
    nama: "Seruling Bambu Mistik Hulala",
    harga: 450000,
    deskripsi:
      "Seruling bambu bertuah dengan ukiran rune magis kuno. Menghasilkan resonansi suara angin pegunungan yang dapat memikat sukma.",
    foto_url: "/produk/seruling-sihir.svg",
    kategori: "Instrumen Sihir",
  },
  {
    id: 3,
    nama: "Erhu Kristal Jiwa Hulala",
    harga: 890000,
    deskripsi:
      "Instrumen gesek dua dawai berlapis kristal giok astral. Mampu memproyeksikan harmoni getaran musik sihir berfrekuensi tinggi.",
    foto_url: "/produk/erhu-sihir.svg",
    kategori: "Instrumen Sihir",
  },
  {
    id: 4,
    nama: "Robot Asisten Cerdas Honglonglong X-1",
    harga: 2450000,
    deskripsi:
      "Robot pelayan humanoid mini bertenaga neural core AI dengan navigasi otonom dan kemampuan pemrosesan bahasa alami cerdas.",
    foto_url: "/produk/robot-asisten.svg",
    kategori: "Robot & AI",
  },
  {
    id: 5,
    nama: "Cyber Drone Pengintai AI Honglonglong",
    harga: 1350000,
    deskripsi:
      "Drone cerdas patroli otomatis dengan sistem visi komputer AI dan algoritma pelacak canggih untuk keamanan kawasan.",
    foto_url: "/produk/drone-ai.svg",
    kategori: "Robot & AI",
  },
  {
    id: 6,
    nama: "Modul Inti Kognitif AI Honglonglong",
    harga: 780000,
    deskripsi:
      "Perangkat chip prosesor kecerdasan buatan portabel dengan arsitektur jaringan saraf untuk otomatisasi sistem modern.",
    foto_url: "/produk/modul-ai.svg",
    kategori: "Robot & AI",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
