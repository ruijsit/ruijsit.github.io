/* ==========================================================================
   Ruijs IT — site script
   - Language switch (NL/EN). Dutch text lives in the HTML, English text in
     assets/js/i18n.js. Elements are linked by their data-i18n key.
   - Mobile menu, screenshot tabs, footer year, old "#/..." links.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "ruijsit-lang";
  // Attributes that can be translated with data-i18n-<attribute>="key"
  var ATTRS = ["alt", "content", "aria-label", "href", "title"];
  var originals = new WeakMap(); // element -> original Dutch content

  /* ---------- Language ---------- */

  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked */ }
  }

  function initialLang() {
    var param = new URLSearchParams(window.location.search).get("lang");
    if (param === "nl" || param === "en") {
      storeLang(param);
      return param;
    }
    return getStoredLang() === "en" ? "en" : "nl";
  }

  function remember(el) {
    var o = originals.get(el);
    if (!o) {
      o = { html: el.innerHTML, attrs: {} };
      ATTRS.forEach(function (attr) {
        if (el.hasAttribute("data-i18n-" + attr)) o.attrs[attr] = el.getAttribute(attr);
      });
      originals.set(el, o);
    }
    return o;
  }

  function setLanguage(lang) {
    var en = window.RUIJSIT_EN || {};
    var useEn = lang === "en";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var o = remember(el);
      el.innerHTML = useEn && key in en ? en[key] : o.html;
    });

    ATTRS.forEach(function (attr) {
      document.querySelectorAll("[data-i18n-" + attr + "]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-" + attr);
        var o = remember(el);
        el.setAttribute(attr, useEn && key in en ? en[key] : o.attrs[attr]);
      });
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }

  document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      storeLang(lang);
      setLanguage(lang);
    });
  });

  /* ---------- Footer year ---------- */

  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Mobile menu ---------- */

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  function closeMenu() {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    header.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- Tabs (screenshots) ---------- */

  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));

    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        var next = tabs[(i + step + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
  });

  /* ---------- Old links (ruijsit.nl/#/contact etc.) ---------- */

  var legacy = { "#/": "", "#/diensten": "#diensten", "#/overons": "#over-ons", "#/contact": "#contact" };
  if (window.location.hash in legacy) {
    var target = legacy[window.location.hash];
    history.replaceState(null, "", window.location.pathname + window.location.search + target);
    var el = target && document.querySelector(target);
    if (el) el.scrollIntoView();
  }

  setYear();
  setLanguage(initialLang());
})();
