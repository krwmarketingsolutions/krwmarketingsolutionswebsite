(function () {
  document.querySelectorAll('form[name="firm-intake"]').forEach(function (form) {
    form.addEventListener("submit", function (event) {
      var boxes = form.querySelectorAll('input[name="verticals"]');
      var any = false;
      boxes.forEach(function (box) { if (box.checked) any = true; });
      var error = form.querySelector(".field__error");
      if (!any) {
        event.preventDefault();
        if (error) error.hidden = false;
        if (boxes[0]) boxes[0].focus();
        return;
      }
      if (error) error.hidden = true;
    });
  });
})();
