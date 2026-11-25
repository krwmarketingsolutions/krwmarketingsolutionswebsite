(function () {
  var toggle = document.querySelector(".nav__toggle");
  var mobile = document.getElementById("mobileNav");
  if (!toggle || !mobile) return;
  toggle.addEventListener("click", function () {
    var open = mobile.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mobile.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobile.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
