/* Loads GA4, Google Ads, and the Meta Pixel only after cookie consent
   and only for IDs that are no longer placeholders. IDs live in config.js. */
(function () {
  var cfg = window.KRW_CONFIG || {};

  function isPlaceholder(value) {
    if (!value || typeof value !== "string") return true;
    if (value.indexOf("PLACEHOLDER") !== -1) return true;
    if (/X{3,}/.test(value)) return true;
    return false;
  }

  function loadGoogle(ga4, ads) {
    var primary = ga4 || ads;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(primary);
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    if (ga4) window.gtag("config", ga4);
    if (ads) window.gtag("config", ads);
  }

  function loadMeta(pixelId) {
    if (window.fbq) return;
    var n = window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }

  function maybeLead() {
    if (!document.body || document.body.getAttribute("data-conversion") !== "lead") return;
    try {
      if (sessionStorage.getItem("krw_lead_fired") === "1") return;
    } catch (err) { /* ignore */ }
    var sent = false;
    if (window.gtag && !isPlaceholder(cfg.GA4_MEASUREMENT_ID)) {
      window.gtag("event", "generate_lead");
      sent = true;
    }
    if (window.gtag && !isPlaceholder(cfg.GOOGLE_ADS_ID) && !isPlaceholder(cfg.GOOGLE_ADS_LEAD_LABEL)) {
      window.gtag("event", "conversion", { send_to: cfg.GOOGLE_ADS_ID + "/" + cfg.GOOGLE_ADS_LEAD_LABEL });
      sent = true;
    }
    if (window.fbq && !isPlaceholder(cfg.META_PIXEL_ID)) {
      window.fbq("track", "Lead");
      sent = true;
    }
    if (sent) {
      try { sessionStorage.setItem("krw_lead_fired", "1"); } catch (err) { /* ignore */ }
    }
  }

  function loadTags() {
    if (window.__krwTagsLoaded) {
      maybeLead();
      return;
    }
    var ga4 = !isPlaceholder(cfg.GA4_MEASUREMENT_ID) ? cfg.GA4_MEASUREMENT_ID : "";
    var ads = !isPlaceholder(cfg.GOOGLE_ADS_ID) ? cfg.GOOGLE_ADS_ID : "";
    var pixel = !isPlaceholder(cfg.META_PIXEL_ID) ? cfg.META_PIXEL_ID : "";
    if (!ga4 && !ads && !pixel) return;
    window.__krwTagsLoaded = true;
    if (ga4 || ads) loadGoogle(ga4, ads);
    if (pixel) loadMeta(pixel);
    maybeLead();
  }

  window.KRW_applyConsent = function () {
    var choice = "";
    try { choice = localStorage.getItem("krw_consent") || ""; } catch (err) { choice = ""; }
    if (choice === "accepted") loadTags();
  };
})();
