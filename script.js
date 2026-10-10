/* Adventure Escape SA - shared behaviour | The Akatsuki | XHAW5112 */
(function () {
  "use strict";

  /* Footer year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Header: becomes solid after scrolling on the home page */
  var header = document.getElementById("siteHeader");
  if (header && header.classList.contains("over-hero")) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 60); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu toggle */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (header) header.classList.toggle("scrolled", open || (header.classList.contains("over-hero") && window.scrollY > 60));
    });
  }

  /* ---------- Calculate Total Fees ---------- */
  var form = document.getElementById("feesForm");
  if (!form) return;

  var VAT_RATE = 0.15;
  var selectedBookings = [];            // array of {name, price}

  function discountRate(count) {        // 1 = 0%, 2 = 5%, 3 = 10%, >3 = 15%
    if (count > 3) return 0.15;
    if (count === 3) return 0.10;
    if (count === 2) return 0.05;
    return 0;
  }
  function rand(n) {
    return "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function el(id) { return document.getElementById(id); }
  function setError(inputId, errId, msg) {
    var input = el(inputId), err = el(errId);
    if (err) err.textContent = msg;
    if (input) input.classList.toggle("invalid", !!msg);
    return !msg;
  }

  function validateName() {
    var v = el("fullName").value.trim();
    if (!v) return setError("fullName", "nameError", "Please enter your full name.");
    if (!/^[A-Za-z][A-Za-z\s'\-]+$/.test(v) || v.length < 2) return setError("fullName", "nameError", "Names may only contain letters, spaces, hyphens and apostrophes.");
    return setError("fullName", "nameError", "");
  }
  function validatePhone() {
    var v = el("phone").value.trim();
    if (!v) return setError("phone", "phoneError", "Please enter your phone number.");
    if (!/^[0-9+\s\-()]+$/.test(v)) return setError("phone", "phoneError", "Phone numbers may only contain digits, spaces, +, - and brackets.");
    var digits = v.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 12) return setError("phone", "phoneError", "Please enter a valid phone number (9 to 12 digits).");
    return setError("phone", "phoneError", "");
  }
  function validateEmail() {
    var v = el("email").value.trim();
    if (!v) return setError("email", "emailError", "Please enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return setError("email", "emailError", "Please enter a valid email address, e.g. name@example.com.");
    return setError("email", "emailError", "");
  }
  function collectSelection() {
    selectedBookings = Array.prototype.map.call(
      form.querySelectorAll('input[name="courses"]:checked'),
      function (c) { return { name: c.value, price: Number(c.getAttribute("data-price")) }; }
    );
    return selectedBookings;
  }
  function validateItems() {
    var ok = collectSelection().length > 0;
    el("itemsError").textContent = ok ? "" : "Please select at least one experience.";
    return ok;
  }

  function renderQuote() {
    var items = collectSelection();
    var count = items.length;
    var subtotal = items.reduce(function (s, i) { return s + i.price; }, 0);
    var rate = discountRate(count);
    var discount = subtotal * rate;
    var afterDiscount = subtotal - discount;
    var vat = afterDiscount * VAT_RATE;
    var total = afterDiscount + vat;

    el("quoteRows").innerHTML = items.map(function (i) {
      return "<tr><td>" + i.name + "</td><td>" + rand(i.price) + "</td></tr>";
    }).join("");
    el("qCount").textContent = count;
    el("qSub").textContent = rand(subtotal);
    el("qDiscLabel").textContent = "Discount (" + Math.round(rate * 100) + "%)";
    el("qDisc").textContent = "\u2212" + rand(discount);
    el("qVat").textContent = rand(vat);
    el("qTotal").textContent = rand(total);
    el("quoteEmpty").hidden = true;
    el("quoteOut").hidden = false;
  }

  function status(msg, ok) {
    var s = el("formStatus");
    s.textContent = msg;
    s.className = "form-status " + (ok ? "ok" : "bad");
  }

  el("calcBtn").addEventListener("click", function () {
    if (!validateItems()) { status("Select at least one experience to calculate your fee.", false); return; }
    renderQuote();
    status("Quote updated. Complete your details to request a consultant.", true);
  });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var ok = [validateName(), validatePhone(), validateEmail(), validateItems()].every(Boolean);
    if (!ok) { status("Please correct the highlighted fields and try again.", false); return; }
    renderQuote();
    status("Thank you, " + el("fullName").value.trim().split(" ")[0] + "! A consultant will contact you shortly to confirm your booking.", true);
  });

  el("fullName").addEventListener("blur", validateName);
  el("phone").addEventListener("blur", validatePhone);
  el("email").addEventListener("blur", validateEmail);
  form.addEventListener("change", function (e) {
    if (e.target.name === "courses" && !el("quoteOut").hidden) renderQuote();
  });
  form.addEventListener("reset", function () {
    setTimeout(function () {
      ["nameError", "phoneError", "emailError", "itemsError"].forEach(function (id) { el(id).textContent = ""; });
      ["fullName", "phone", "email"].forEach(function (id) { el(id).classList.remove("invalid"); });
      el("quoteOut").hidden = true; el("quoteEmpty").hidden = false; status("", true);
      selectedBookings = [];
    }, 0);
  });
})();
