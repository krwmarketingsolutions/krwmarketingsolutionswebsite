(function () {
  var slots = document.querySelectorAll("[data-booking]");
  if (!slots.length) return;
  var url = (window.KRW_CONFIG && window.KRW_CONFIG.CALENDLY_URL) || "";
  var pending = !url || url.indexOf("PLACEHOLDER") !== -1;
  var scriptAdded = false;
  slots.forEach(function (slot) {
    if (pending) {
      slot.innerHTML = '<p class="booking__note">Scheduling embed is off. The setting <code>CALENDLY_URL_PLACEHOLDER</code> has not been replaced with a real link yet. Email <a href="mailto:kyler@krwmarketingsolutions.com">kyler@krwmarketingsolutions.com</a> and we will set a time.</p>';
      return;
    }
    if (url.indexOf("calendly.com") !== -1) {
      var widget = document.createElement("div");
      widget.className = "calendly-inline-widget";
      widget.setAttribute("data-url", url);
      widget.style.minWidth = "280px";
      widget.style.height = "720px";
      slot.appendChild(widget);
      if (!scriptAdded) {
        var script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
        scriptAdded = true;
      }
      return;
    }
    var frame = document.createElement("iframe");
    frame.src = url;
    frame.title = "Schedule a consultation";
    frame.loading = "lazy";
    slot.appendChild(frame);
  });
})();
