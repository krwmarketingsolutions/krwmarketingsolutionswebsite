(function () {
  var root = document.getElementById("exampleCalc");
  if (!root) return;
  var unit = document.getElementById("calcUnit");
  var contact = document.getElementById("calcContact");
  var contactLabel = document.getElementById("contactLabel");
  var signLabel = document.getElementById("signLabel");
  var out = document.getElementById("calcOut");

  function syncUnit() {
    var transfers = unit.value === "transfer";
    contact.disabled = transfers;
    if (transfers) contact.value = "100";
    contactLabel.textContent = transfers ? "Share you reach, percent (already live)" : "Share you reach, percent";
    signLabel.textContent = transfers ? "Share of transfers that sign, percent" : "Share of conversations that sign, percent";
  }
  unit.addEventListener("change", syncUnit);

  document.getElementById("calcRun").addEventListener("click", function () {
    var units = Number(document.getElementById("calcUnits").value);
    var price = Number(document.getElementById("calcPrice").value);
    var reach = Number(contact.value) / 100;
    var sign = Number(document.getElementById("calcSign").value) / 100;
    out.hidden = false;
    if (!(units > 0) || !(price >= 0) || !(reach > 0) || !(sign > 0) || reach > 1 || sign > 1) {
      out.innerHTML = "<p>Enter a count above zero, a price of zero or more, and percents from 1 to 100. This is still an example.</p>";
      return;
    }
    var spend = units * price;
    var signed = units * reach * sign;
    var each = spend / signed;
    var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(each);
    var spendText = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(spend);
    var signedText = (Math.round(signed * 10) / 10).toString();
    out.innerHTML = "<p>Example spend</p><strong>" + spendText + "</strong><p>Example signed cases</p><strong>" + signedText + "</strong><p>Example cost per signed case</p><strong>" + money + "</strong><p>Example only. Not a KRW price and not a forecast.</p>";
  });
})();
