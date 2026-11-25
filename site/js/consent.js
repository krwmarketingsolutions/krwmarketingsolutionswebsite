(function () {
  var banner = document.getElementById("cookieBanner");

  function choice() {
    try { return localStorage.getItem("krw_consent") || ""; } catch (err) { return ""; }
  }
  function save(value) {
    try { localStorage.setItem("krw_consent", value); } catch (err) { /* ignore */ }
    if (banner) banner.hidden = true;
    if (value === "accepted" && window.KRW_applyConsent) window.KRW_applyConsent();
  }
  if (banner) {
    banner.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent]");
      if (!button) return;
      save(button.getAttribute("data-consent"));
    });
  }
  document.querySelectorAll("[data-cookie-settings]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (banner) banner.hidden = false;
    });
  });
  if (!choice()) {
    if (banner) banner.hidden = false;
  } else if (window.KRW_applyConsent) {
    window.KRW_applyConsent();
  }
})();
