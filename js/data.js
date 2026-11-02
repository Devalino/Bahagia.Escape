/* ============================================================
   DATA EDITABLE — ubah di sini, tanpa menyentuh tampilan.
   ============================================================ */

const CONFIG = {
  whatsapp: "6285815951005",          // format internasional tanpa +
  whatsappDisplay: "+62 858-1595-1005",
  email: "hello@example.com",         // DUMMY
  defaultLang: "id"
};

/* Status armada: "available_on_request" | "unavailable"
   Spesifikasi bertanda placeholder:true = BELUM dikonfirmasi. */
const FLEET = [
  {
    id: "veloz",
    name: "Toyota Veloz",
    status: "available_on_request",
    photo: "",                                  // contoh: "assets/veloz.jpg"
    specs: { seats: "[TBC]", bags: "[TBC]", extras: "[TBC]" },
    placeholder: true
  },
  {
    id: "veloz-hybrid",
    name: "Toyota Veloz Hybrid",
    status: "available_on_request",
    photo: "",
    specs: { seats: "[TBC]", bags: "[TBC]", extras: "[TBC]" },
    placeholder: true
  },
  {
    id: "zenix",
    name: "Toyota Zenix",
    status: "unavailable",                      // sedang terikat kontrak sewa
    photo: "",
    specs: { seats: "[TBC]", bags: "[TBC]", extras: "[TBC]" },
    placeholder: true
  }
];

const SERVICES = [
  { id: "airport",  ico: "✈" },
  { id: "charter",  ico: "☀" },
  { id: "intercity", ico: "➜" },
  { id: "business", ico: "💼" }
];

const FAQ_KEYS = ["price", "cancel", "luggage", "flight"];

/* ============================================================
   KAMUS BAHASA — kunci harus sama di id dan en.
   ============================================================ */
const I18N = {
  id: {
    "nav.services": "Layanan", "nav.fleet": "Armada", "nav.how": "Cara Pesan",
    "nav.about": "Tentang", "nav.contact": "Kontak", "nav.book": "Pesan",

    "hero.eyebrow": "Transportasi privat dengan sopir",
    "hero.title": "Antar-jemput bandara dan perjalanan privat yang nyaman.",
    "hero.lead": "Kendaraan privat dengan sopir untuk bandara, perjalanan antarkota, dan agenda kerja. Kirim permintaan dalam kurang dari satu menit, kami konfirmasi lewat WhatsApp.",
    "hero.cta1": "Ajukan Pemesanan", "hero.cta2": "Chat WhatsApp",

    "services.title": "Layanan",
    "services.sub": "Pilih jenis perjalanan. Detail dan harga dikonfirmasi lewat WhatsApp.",
    "svc.airport.t": "Antar-jemput bandara", "svc.airport.d": "Penjemputan dan pengantaran bandara, dengan nomor penerbangan agar jadwal tepat.",
    "svc.charter.t": "Sewa harian (day charter)", "svc.charter.d": "Kendaraan dan sopir untuk seharian, cocok untuk wisata atau urusan beberapa lokasi.",
    "svc.intercity.t": "Perjalanan antarkota", "svc.intercity.d": "Perjalanan dari kota ke kota. Rute dan estimasi dibahas bersama.",
    "svc.business.t": "Perjalanan bisnis", "svc.business.d": "Transportasi terjadwal untuk pertemuan, kunjungan, atau agenda kerja.",

    "fleet.title": "Armada",
    "fleet.sub": "Ketersediaan mengikuti jadwal operasional dan dikonfirmasi sebelum pesanan diterima.",
    "fleet.note": "Spesifikasi bertanda [TBC] masih menunggu konfirmasi. Ketersediaan dan harga dikonfirmasi lewat WhatsApp.",
    "fleet.status.available_on_request": "Tersedia sesuai jadwal",
    "fleet.status.unavailable": "Saat ini tidak tersedia untuk pemesanan baru",
    "fleet.seats": "Penumpang", "fleet.bags": "Bagasi", "fleet.extras": "Fasilitas",
    "fleet.photo": "Foto menyusul",
    "fleet.check": "Cek ketersediaan", "fleet.na": "Tidak tersedia",

    "how.title": "Cara pesan",
    "how.1.t": "Kirim permintaan", "how.1.d": "Isi formulir singkat. Tidak perlu akun.",
    "how.2.t": "Buka WhatsApp", "how.2.d": "Pesan Anda sudah terisi, tinggal kirim.",
    "how.3.t": "Konfirmasi", "how.3.d": "Kami cek ketersediaan dan menyepakati harga.",
    "how.4.t": "Dijemput sopir", "how.4.d": "Sopir menjemput sesuai jadwal yang disepakati.",

    "form.title": "Ajukan pemesanan",
    "form.sub": "Ini permintaan pemesanan, bukan pemesanan final. Kesepakatan dibuat lewat WhatsApp.",
    "form.service": "Jenis layanan", "form.vehicle": "Kendaraan",
    "form.vehicle.any": "Tidak ada preferensi (yang tersedia)",
    "form.name": "Nama", "form.phone": "Nomor WhatsApp",
    "form.pickup": "Titik jemput", "form.dest": "Tujuan",
    "form.date": "Tanggal", "form.time": "Jam (24 jam)",
    "form.pax": "Jumlah penumpang", "form.bags": "Jumlah koper",
    "form.flight": "Nomor penerbangan (opsional)", "form.notes": "Catatan (opsional)",
    "form.submit": "Kirim lewat WhatsApp",
    "form.disclaimer": "Dengan menekan tombol, WhatsApp akan terbuka dengan pesan terisi. Tidak ada data yang disimpan di website ini.",
    "form.service.placeholder": "Pilih layanan",
    "err.required": "Wajib diisi.", "err.phone": "Masukkan nomor yang valid (minimal 8 digit).",
    "err.pax": "Masukkan jumlah 1–20.", "err.past": "Tanggal tidak boleh sudah lewat.",

    "about.title": "Tentang Bahagia.Escape",
    "about.p1": "[Draf, silakan edit] Bahagia.Escape adalah layanan transportasi privat dengan sopir untuk antar-jemput bandara dan perjalanan antarkota.",
    "about.p2": "[Draf, silakan edit] Dikelola langsung oleh Muhammad Yusuf Alfarizi. Tagline kami: Every Journey, A Happier Escape.",

    "faq.title": "Pertanyaan umum",
    "faq.price.q": "Berapa tarifnya?", "faq.price.a": "Tarif dikonfirmasi lewat WhatsApp sesuai rute, jadwal, dan kendaraan. [Isi kebijakan tarif]",
    "faq.cancel.q": "Bagaimana kebijakan pembatalan?", "faq.cancel.a": "[Placeholder — kebijakan pembatalan belum ditentukan.]",
    "faq.luggage.q": "Berapa bagasi yang muat?", "faq.luggage.a": "[Placeholder — kapasitas bagasi belum dikonfirmasi.] Sebutkan jumlah koper di formulir.",
    "faq.flight.q": "Bagaimana jika pesawat terlambat?", "faq.flight.a": "[Placeholder — kebijakan keterlambatan belum ditentukan.] Cantumkan nomor penerbangan di formulir.",

    "contact.title": "Kontak", "contact.sub": "Pertanyaan sebelum memesan? Hubungi kami langsung.",
    "contact.wa": "Chat WhatsApp", "contact.dummy": "(email contoh)",

    "wa.greeting": "Halo Bahagia.Escape, saya ingin mengajukan pemesanan.",
    "wa.service": "Layanan", "wa.vehicle": "Kendaraan", "wa.name": "Nama",
    "wa.phone": "Kontak", "wa.pickup": "Jemput", "wa.dest": "Tujuan",
    "wa.datetime": "Tanggal & jam", "wa.pax": "Penumpang", "wa.bags": "Koper",
    "wa.flight": "No. penerbangan", "wa.notes": "Catatan", "wa.any": "Yang tersedia",
    "wa.generic": "Halo Bahagia.Escape, saya ingin bertanya tentang layanan Anda."
  },

  en: {
    "nav.services": "Services", "nav.fleet": "Fleet", "nav.how": "How to book",
    "nav.about": "About", "nav.contact": "Contact", "nav.book": "Book",

    "hero.eyebrow": "Private chauffeur transport",
    "hero.title": "Comfortable airport transfers and private trips.",
    "hero.lead": "A private vehicle with a driver for airport transfers, intercity trips and business schedules. Send a request in under a minute and we confirm via WhatsApp.",
    "hero.cta1": "Request Booking", "hero.cta2": "Chat on WhatsApp",

    "services.title": "Services",
    "services.sub": "Choose your trip type. Details and price are confirmed on WhatsApp.",
    "svc.airport.t": "Airport transfer", "svc.airport.d": "Airport pickup and drop-off. Add your flight number so we can plan around your arrival.",
    "svc.charter.t": "Day charter", "svc.charter.d": "A vehicle and driver for the day, ideal for sightseeing or errands in several places.",
    "svc.intercity.t": "Intercity trips", "svc.intercity.d": "City-to-city travel. We agree the route and estimate together.",
    "svc.business.t": "Business travel", "svc.business.d": "Scheduled transport for meetings, site visits and work agendas.",

    "fleet.title": "Fleet",
    "fleet.sub": "Availability follows our operating schedule and is confirmed before we accept a booking.",
    "fleet.note": "Specs marked [TBC] are awaiting confirmation. Availability and price are confirmed on WhatsApp.",
    "fleet.status.available_on_request": "Available by schedule",
    "fleet.status.unavailable": "Currently unavailable for new bookings",
    "fleet.seats": "Passengers", "fleet.bags": "Luggage", "fleet.extras": "Features",
    "fleet.photo": "Photo coming soon",
    "fleet.check": "Check availability", "fleet.na": "Unavailable",

    "how.title": "How to book",
    "how.1.t": "Send a request", "how.1.d": "Fill in a short form. No account needed.",
    "how.2.t": "Open WhatsApp", "how.2.d": "Your message is pre-filled, just press send.",
    "how.3.t": "We confirm", "how.3.d": "We check availability and agree the price with you.",
    "how.4.t": "Driver picks you up", "how.4.d": "Your driver arrives at the agreed time.",

    "form.title": "Request a booking",
    "form.sub": "This is a booking request, not a final booking. The deal is agreed on WhatsApp.",
    "form.service": "Service type", "form.vehicle": "Vehicle",
    "form.vehicle.any": "No preference (any available)",
    "form.name": "Name", "form.phone": "WhatsApp number",
    "form.pickup": "Pickup location", "form.dest": "Destination",
    "form.date": "Date", "form.time": "Time (24-hour)",
    "form.pax": "Passengers", "form.bags": "Luggage pieces",
    "form.flight": "Flight number (optional)", "form.notes": "Notes (optional)",
    "form.submit": "Send via WhatsApp",
    "form.disclaimer": "Pressing the button opens WhatsApp with a pre-filled message. This website does not store your data.",
    "form.service.placeholder": "Select a service",
    "err.required": "This field is required.", "err.phone": "Enter a valid number (at least 8 digits).",
    "err.pax": "Enter a number from 1 to 20.", "err.past": "The date cannot be in the past.",

    "about.title": "About Bahagia.Escape",
    "about.p1": "[Draft, please edit] Bahagia.Escape is a private chauffeur transport service for airport transfers and intercity trips.",
    "about.p2": "[Draft, please edit] Run directly by Muhammad Yusuf Alfarizi. Our tagline: Every Journey, A Happier Escape.",

    "faq.title": "FAQ",
    "faq.price.q": "How much does it cost?", "faq.price.a": "Prices are confirmed on WhatsApp based on route, schedule and vehicle. [Add pricing policy]",
    "faq.cancel.q": "What is the cancellation policy?", "faq.cancel.a": "[Placeholder — cancellation policy not decided yet.]",
    "faq.luggage.q": "How much luggage fits?", "faq.luggage.a": "[Placeholder — luggage capacity not confirmed yet.] Please state your luggage count in the form.",
    "faq.flight.q": "What if my flight is delayed?", "faq.flight.a": "[Placeholder — delay policy not decided yet.] Please include your flight number in the form.",

    "contact.title": "Contact", "contact.sub": "Questions before booking? Message us directly.",
    "contact.wa": "Chat on WhatsApp", "contact.dummy": "(sample email)",

    "wa.greeting": "Hello Bahagia.Escape, I would like to request a booking.",
    "wa.service": "Service", "wa.vehicle": "Vehicle", "wa.name": "Name",
    "wa.phone": "Contact", "wa.pickup": "Pickup", "wa.dest": "Destination",
    "wa.datetime": "Date & time", "wa.pax": "Passengers", "wa.bags": "Luggage",
    "wa.flight": "Flight no.", "wa.notes": "Notes", "wa.any": "Any available",
    "wa.generic": "Hello Bahagia.Escape, I have a question about your service."
  }
};

/* Baris ringkasan untuk pemilik — selalu Bahasa Indonesia */
const OWNER_SUMMARY_LABEL = "Ringkasan";
const MONTHS = {
  id: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
  en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
};
