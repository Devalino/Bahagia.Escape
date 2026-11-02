(function () {
  "use strict";

  var lang = CONFIG.defaultLang;

  function t(key, l) {
    var d = I18N[l || lang];
    return d && d[key] !== undefined ? d[key] : key;
  }

  /* ---------- language state ---------- */
  function detectLang() {
    try {
      var saved = localStorage.getItem("be_lang");
      if (saved === "id" || saved === "en") return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("id") === 0 ? "id" : "en";
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem("be_lang", l); } catch (e) {}
    document.documentElement.lang = l;
    render();
  }

  /* ---------- rendering ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function renderStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang);
    });
  }

  function renderServices() {
    var g = document.getElementById("serviceGrid");
    g.innerHTML = "";
    SERVICES.forEach(function (s) {
      var c = el("div", "card");
      c.appendChild(el("div", "", "<span aria-hidden='true' style='font-size:1.6rem'>" + s.ico + "</span>"));
      c.appendChild(el("h3", "", t("svc." + s.id + ".t")));
      c.appendChild(el("p", "", t("svc." + s.id + ".d")));
      g.appendChild(c);
    });
  }

  function renderFleet() {
    var g = document.getElementById("fleetGrid");
    g.innerHTML = "";
    FLEET.forEach(function (v) {
      var ok = v.status === "available_on_request";
      var c = el("div", "card vehicle" + (ok ? "" : " unavailable"));
      var photo = el("div", "vehicle-photo");
      if (v.photo) {
        var img = document.createElement("img");
        img.src = v.photo; img.alt = v.name;
        photo.appendChild(img);
      } else {
        photo.textContent = t("fleet.photo");
      }
      c.appendChild(photo);
      c.appendChild(el("h3", "", v.name));
      c.appendChild(el("span", "badge " + (ok ? "ok" : "no"), t("fleet.status." + v.status)));
      var ul = el("ul", "specs");
      ["seats", "bags", "extras"].forEach(function (k) {
        ul.appendChild(el("li", "", t("fleet." + k) + ": " + v.specs[k]));
      });
      c.appendChild(ul);
      var btn = el("a", "btn btn-ghost btn-sm", ok ? t("fleet.check") : t("fleet.na"));
      btn.href = "#booking";
      if (ok) {
        btn.addEventListener("click", function () {
          document.getElementById("vehicle").value = v.id;
        });
      } else {
        btn.setAttribute("aria-disabled", "true");
        btn.tabIndex = -1;
      }
      c.appendChild(btn);
      g.appendChild(c);
    });
  }

  function renderSteps() {
    var o = document.getElementById("stepsList");
    o.innerHTML = "";
    for (var i = 1; i <= 4; i++) {
      o.appendChild(el("li", "", "<strong>" + t("how." + i + ".t") + "</strong><span>" + t("how." + i + ".d") + "</span>"));
    }
  }

  function renderFaq() {
    var f = document.getElementById("faqList");
    f.innerHTML = "";
    FAQ_KEYS.forEach(function (k) {
      var d = el("details");
      d.appendChild(el("summary", "", t("faq." + k + ".q")));
      d.appendChild(el("p", "", t("faq." + k + ".a")));
      f.appendChild(d);
    });
  }

  function renderSelects() {
    var s = document.getElementById("service");
    var v = document.getElementById("vehicle");
    var sv = s.value, vv = v.value;
    s.innerHTML = "<option value=''>" + t("form.service.placeholder") + "</option>";
    SERVICES.forEach(function (x) {
      var o = document.createElement("option");
      o.value = x.id; o.textContent = t("svc." + x.id + ".t");
      s.appendChild(o);
    });
    v.innerHTML = "<option value=''>" + t("form.vehicle.any") + "</option>";
    FLEET.filter(function (x) { return x.status === "available_on_request"; }).forEach(function (x) {
      var o = document.createElement("option");
      o.value = x.id; o.textContent = x.name;
      v.appendChild(o);
    });
    s.value = sv; v.value = vv;
  }

  function renderContact() {
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(t("wa.generic"));
      a.target = "_blank"; a.rel = "noopener";
    });
    document.querySelectorAll("[data-wa-text]").forEach(function (a) {
      a.textContent = CONFIG.whatsappDisplay;
      a.href = "https://wa.me/" + CONFIG.whatsapp;
      a.target = "_blank"; a.rel = "noopener";
    });
    document.querySelectorAll("[data-email]").forEach(function (n) { n.textContent = CONFIG.email; });
  }

  function render() {
    renderStatic();
    renderServices();
    renderFleet();
    renderSteps();
    renderFaq();
    renderSelects();
    renderContact();
    clearErrors();
  }

  /* ---------- form ---------- */
  function clearErrors() {
    document.querySelectorAll(".err").forEach(function (e) { e.textContent = ""; });
    document.querySelectorAll(".field.invalid").forEach(function (f) { f.classList.remove("invalid"); });
  }

  function setErr(name, msgKey) {
    var e = document.querySelector('[data-err-for="' + name + '"]');
    if (e) {
      e.textContent = t(msgKey);
      e.closest(".field").classList.add("invalid");
    }
  }

  function fmtDate(iso, l) {
    var p = iso.split("-");
    var m = MONTHS[l][parseInt(p[1], 10) - 1];
    return parseInt(p[2], 10) + " " + m + " " + p[0];
  }

  function vehicleName(id, l) {
    if (!id) return t("wa.any", l);
    var v = FLEET.filter(function (x) { return x.id === id; })[0];
    return v ? v.name : t("wa.any", l);
  }

  function buildMessage(d) {
    var L = function (k) { return t(k); };
    var lines = [
      L("wa.greeting"), "",
      L("wa.service") + ": " + t("svc." + d.service + ".t"),
      L("wa.vehicle") + ": " + vehicleName(d.vehicle, lang),
      L("wa.name") + ": " + d.name,
      L("wa.phone") + ": " + d.phone,
      L("wa.pickup") + ": " + d.pickup,
      L("wa.dest") + ": " + d.dest,
      L("wa.datetime") + ": " + fmtDate(d.date, lang) + ", " + d.time,
      L("wa.pax") + ": " + d.pax + (d.bags !== "" ? " | " + L("wa.bags") + ": " + d.bags : "")
    ];
    if (d.flight) lines.push(L("wa.flight") + ": " + d.flight);
    if (d.notes) lines.push(L("wa.notes") + ": " + d.notes);
    /* baris ringkasan untuk pemilik: selalu Indonesia */
    lines.push("", "(" + OWNER_SUMMARY_LABEL + ": " + t("svc." + d.service + ".t", "id") +
      ", " + fmtDate(d.date, "id") + " " + d.time + ", " + d.pax + " penumpang, " +
      vehicleName(d.vehicle, "id") + ")");
    return lines.join("\n");
  }

  function onSubmit(ev) {
    ev.preventDefault();
    clearErrors();
    var f = ev.target;
    var d = {};
    ["service", "vehicle", "name", "phone", "pickup", "dest", "date", "time", "pax", "bags", "flight", "notes"].forEach(function (k) {
      d[k] = (f.elements[k].value || "").trim();
    });
    var ok = true;
    ["service", "name", "pickup", "dest", "date", "time"].forEach(function (k) {
      if (!d[k]) { setErr(k, "err.required"); ok = false; }
    });
    if (!d.phone) { setErr("phone", "err.required"); ok = false; }
    else if (d.phone.replace(/\D/g, "").length < 8) { setErr("phone", "err.phone"); ok = false; }
    var pax = parseInt(d.pax, 10);
    if (!d.pax) { setErr("pax", "err.required"); ok = false; }
    else if (isNaN(pax) || pax < 1 || pax > 20) { setErr("pax", "err.pax"); ok = false; }
    if (d.date) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var chosen = new Date(d.date + "T00:00:00");
      if (chosen < today) { setErr("date", "err.past"); ok = false; }
    }
    if (!ok) {
      var first = document.querySelector(".field.invalid input, .field.invalid select");
      if (first) first.focus();
      return;
    }
    var url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(buildMessage(d));
    window.open(url, "_blank", "noopener");
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("year").textContent = new Date().getFullYear();
    var dateInput = document.getElementById("date");
    var n = new Date();
    dateInput.min = n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    document.getElementById("bookingForm").addEventListener("submit", onSubmit);

    var menuBtn = document.getElementById("menuBtn");
    var links = document.getElementById("navLinks");
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", function () {
      links.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });

    lang = detectLang();
    document.documentElement.lang = lang;
    render();
  });
})();
