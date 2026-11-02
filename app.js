/* ============================================================
   Bahagia.Escape — logika halaman (tanpa framework)
   ============================================================ */
(function () {
  "use strict";

  const LS_KEY = "be_lang";
  let lang = "en";

  /* ---------- util ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

  function safeGet() { try { return localStorage.getItem(LS_KEY); } catch (e) { return null; } }
  function safeSet(v) { try { localStorage.setItem(LS_KEY, v); } catch (e) { /* abaikan */ } }

  function detectLang() {
    const saved = safeGet();
    if (saved === "id" || saved === "en") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("id") ? "id" : "en";
  }

  const ICONS = {
    plane: '<path d="M2 16l20-6-3-3-6 2-6-5-2 1 4 6-4 2-2-2-1 1 3 4 4 1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    route: '<circle cx="6" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  };

  function waUrl(text) {
    const base = "https://wa.me/" + CONFIG.whatsapp;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  /* ---------- render: layanan & armada ---------- */
  function renderServices() {
    $("#services-grid").innerHTML = SERVICES.map((s) =>
      `<article class="card"><div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[s.icon]}</svg></div>
       <h3>${t("svc." + s.id + ".t")}</h3><p>${t("svc." + s.id + ".d")}</p></article>`
    ).join("");
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  function specsHtml(v) {
    const rows = [];
    if (v.specs.passengers) rows.push(`<li><b>${t("fleet.passengers")}:</b> ${esc(v.specs.passengers)}</li>`);
    if (v.specs.luggage) rows.push(`<li><b>${t("fleet.luggage")}:</b> ${esc(v.specs.luggage)}</li>`);
    if (v.specs.features) rows.push(`<li><b>${t("fleet.features")}:</b> ${esc(v.specs.features)}</li>`);
    return rows.length ? `<ul class="specs">${rows.join("")}</ul>` : `<p class="specs">${t("fleet.specsTbc")}</p>`;
  }

  function renderFleet() {
    $("#fleet-grid").innerHTML = VEHICLES.filter((v) => v.visible).map((v) => {
      const ok = v.status === "available_on_request";
      const action = ok
        ? `<a class="btn btn--ghost btn--sm" href="#book" data-pick-vehicle="${v.id}">${t("fleet.check")}</a>`
        : `<a class="btn btn--ghost btn--sm" data-wa-link data-wa-text="${esc(t("fleet.ask") + ": " + v.name)}" href="#" target="_blank" rel="noopener">${t("fleet.ask")}</a>`;
      return `<article class="vehicle ${ok ? "" : "vehicle--off"}">
        <img src="${v.photo}" alt="${esc(v.name)}" loading="lazy">
        <div class="vehicle__body">
          <h3>${esc(v.name)}</h3>
          <span class="badge ${ok ? "badge--ok" : "badge--no"}">${t(ok ? "fleet.available" : "fleet.unavailable")}</span>
          ${specsHtml(v)}
          ${action}
        </div></article>`;
    }).join("");
    bindWaLinks();
    $$("[data-pick-vehicle]").forEach((a) => a.addEventListener("click", () => { $("#vehicle").value = a.dataset.pickVehicle; }));
  }

  /* ---------- form selects ---------- */
  function renderSelects() {
    const svc = $("#service"), veh = $("#vehicle");
    const svcVal = svc.value, vehVal = veh.value;
    svc.innerHTML = SERVICES.map((s) => `<option value="${s.id}">${t("svcName." + s.id)}</option>`).join("");
    veh.innerHTML = `<option value="any">${t("form.vehicleAny")}</option>` +
      VEHICLES.filter((v) => v.visible).map((v) => {
        const ok = v.status === "available_on_request";
        return `<option value="${v.id}" ${ok ? "" : "disabled"}>${esc(v.name)}${ok ? "" : " — " + t("form.vehicleUnavail")}</option>`;
      }).join("");
    if (svcVal) svc.value = svcVal;
    if (vehVal) veh.value = vehVal;
  }

  /* ---------- i18n apply ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    $('meta[name="description"]').setAttribute("content", t("meta.desc"));
    $$("[data-i18n]").forEach((el) => {
      let txt = t(el.dataset.i18n);
      if (el.hasAttribute("data-owner")) txt = txt.replace("{owner}", CONFIG.owner);
      el.textContent = txt;
    });
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    renderServices();
    renderFleet();
    renderSelects();
    // validasi ulang agar pesan error ikut berganti bahasa
    if ($("#booking").dataset.touched) validate(false);
  }

  function setLang(l) { lang = l; safeSet(l); applyI18n(); }

  /* ---------- WhatsApp links ---------- */
  function bindWaLinks() {
    $$("[data-wa-link]").forEach((a) => { a.href = waUrl(a.dataset.waText || ""); });
  }

  /* ---------- validasi ---------- */
  function setErr(name, msg) {
    const field = $(`[name="${name}"]`).closest(".field");
    const p = $(`[data-err-for="${name}"]`);
    field.classList.toggle("invalid", !!msg);
    if (p) p.textContent = msg || "";
    return !msg;
  }
  const todayStr = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };

  function validate() {
    const f = $("#booking");
    const v = (n) => f.elements[n].value.trim();
    let ok = true;
    ["name", "pickup", "dest", "time"].forEach((n) => { ok = setErr(n, v(n) ? "" : t("err.required")) && ok; });
    ok = setErr("service", v("service") ? "" : t("err.required")) && ok;

    const digits = v("phone").replace(/\D/g, "");
    ok = setErr("phone", !v("phone") ? t("err.required") : (digits.length < 8 || digits.length > 15 || !/^[+\d\s()\-.]+$/.test(v("phone"))) ? t("err.phone") : "") && ok;

    const d = v("date");
    ok = setErr("date", !d ? t("err.required") : d < todayStr() ? t("err.date") : "") && ok;

    const pax = parseInt(v("pax"), 10);
    ok = setErr("pax", !pax || pax < 1 ? t("err.pax") : "") && ok;

    $("#form-error").hidden = ok;
    return ok;
  }

  /* ---------- pesan WhatsApp ---------- */
  function fmtDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
      .format(new Date(Date.UTC(y, m - 1, d)));
  }

  function buildMessage(f) {
    const g = (n) => f.elements[n].value.trim();
    const veh = VEHICLES.find((x) => x.id === g("vehicle"));
    const vehicleTxt = veh ? veh.name + (lang === "id" ? " (atau yang tersedia)" : " (or any available)") : t("wa.vehicleAny");
    const lines = [
      t("wa.greeting"), "",
      `${t("wa.service")}: ${t("svcName." + g("service"))}`,
      `${t("wa.vehicle")}: ${vehicleTxt}`,
      `${t("wa.name")}: ${g("name")}`,
      `${t("wa.phone")}: ${g("phone")}`,
      `${t("wa.pickup")}: ${g("pickup")}`,
      `${t("wa.dest")}: ${g("dest")}`,
      `${t("wa.datetime")}: ${fmtDate(g("date"))}, ${g("time")}`,
      `${t("wa.pax")}: ${g("pax")} | ${t("wa.luggage")}: ${g("luggage") || 0}`,
    ];
    if (g("flight")) lines.push(`${t("wa.flight")}: ${g("flight")}`);
    if (g("notes")) lines.push(`${t("wa.notes")}: ${g("notes")}`);
    lines.push("", t("wa.close"));

    // Baris ringkasan untuk pemilik — selalu Bahasa Indonesia
    const L = OWNER_SUMMARY_LABELS;
    const idDate = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
      .format(new Date(Date.UTC(...g("date").split("-").map((n, i) => (i === 1 ? n - 1 : +n)))));
    lines.push("", `(${L.summary}: ${L.svc[g("service")]}, ${idDate} ${g("time")}, ${g("pax")} ${L.pax}; ${L.lang}: ${lang.toUpperCase()})`);
    return lines.join("\n");
  }

  /* ---------- init ---------- */
  function init() {
    lang = detectLang();
    $("#year").textContent = new Date().getFullYear();
    $("#email-link").textContent = CONFIG.email;
    $("#email-link").href = "mailto:" + CONFIG.email;
    $("#wa-display").textContent = "WhatsApp: " + CONFIG.whatsappDisplay;
    $("#date").min = todayStr();

    $$("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    // Floating & hero links tanpa teks awal
    applyI18n();
    bindWaLinks();

    const form = $("#booking");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.dataset.touched = "1";
      if (!validate()) {
        const first = $(".field.invalid input, .field.invalid select", form);
        if (first) first.focus();
        return;
      }
      window.open(waUrl(buildMessage(form)), "_blank", "noopener");
    });
    form.addEventListener("input", (e) => { if (form.dataset.touched) validate(); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
