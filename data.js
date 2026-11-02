/* ============================================================
   DATA BAHAGIA.ESCAPE  — edit file ini, tidak perlu menyentuh tampilan
   ============================================================ */

const CONFIG = {
  brand: "Bahagia.Escape",
  whatsapp: "6285815951005",          // +62 858-1595-1005 (format wa.me: tanpa + dan tanpa spasi)
  whatsappDisplay: "+62 858-1595-1005",
  email: "hello@example.com",         // TODO: DUMMY — ganti dengan email asli
  owner: "Muhammad Yusuf Alfarizi",
};

/* STATUS ARMADA
   - "available_on_request" : bisa dipilih, tetap dikonfirmasi lewat WhatsApp
   - "unavailable"          : tampil redup, tidak bisa dipilih di form
   Ubah status di sini saat kondisi armada berubah.
   Set visible:false untuk menyembunyikan kendaraan sementara. */
const VEHICLES = [
  {
    id: "veloz",
    name: "Toyota Veloz",
    status: "available_on_request",
    visible: true,
    photo: "assets/veloz-non-hybrid.webp",   // TODO: ganti foto asli
    // Isi jika sudah pasti. Kosong (null) = tidak ditampilkan.
    specs: { passengers: null, luggage: null, features: null },
  },
  {
    id: "veloz-hybrid",
    name: "Toyota Veloz Hybrid",
    status: "available_on_request",
    visible: true,
    photo: "assets/veloz-hybrid.webp",
    specs: { passengers: null, luggage: null, features: null },
  },
  {
    id: "zenix",
    name: "Toyota Zenix",
    status: "unavailable",
    visible: true,
    photo: "assets/zenix.png",
    specs: { passengers: null, luggage: null, features: null },
  },
];

const SERVICES = [
  { id: "airport",  icon: "plane" },
  { id: "intercity", icon: "route" },
  { id: "charter",  icon: "clock" },
  { id: "business", icon: "briefcase" },
];
