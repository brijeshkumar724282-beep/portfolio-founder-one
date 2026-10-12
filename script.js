// Founder One interactions: nav, reveals, counters, accordion, form, year
(function () {
  "use strict";

  var nav = document.getElementById("topnav");
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  // Sticky nav shadow
  function onScroll() {
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger
  hamburger.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a") && window.innerWidth <= 860) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // Active link highlight
  var links = Array.prototype.slice.call(document.querySelectorAll(".navLink"));
  var sections = ["ventures", "writing", "journey", "faq", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  function setActive(id) {
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === "#" + id) a.classList.add("active");
      else a.classList.remove("active");
    });
  }
  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive(en.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  // Scroll reveals
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Animated counters
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-target")) || 0;
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = prefix + val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll(".counter");
  if ("IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animateCounter(en.target);
          cObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(animateCounter);
  }

  // Accordion (single open)
  var items = document.querySelectorAll(".accItem");
  items.forEach(function (item) {
    var btn = item.querySelector(".accBtn");
    var panel = item.querySelector(".accPanel");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      items.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".accPanel").style.maxHeight = null;
        other.querySelector(".accBtn").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Contact form validation
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("fname");
    var email = document.getElementById("femail");
    var msg = document.getElementById("fmsg");
    var errName = document.getElementById("errName");
    var errEmail = document.getElementById("errEmail");
    var errMsg = document.getElementById("errMsg");
    var ok = true;

    errName.textContent = "";
    errEmail.textContent = "";
    errMsg.textContent = "";
    name.classList.remove("invalid");
    email.classList.remove("invalid");
    msg.classList.remove("invalid");
    note.textContent = "";
    note.className = "formNote";

    if (name.value.trim().length < 2) {
      errName.textContent = "Please enter your name.";
      name.classList.add("invalid");
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      errEmail.textContent = "Please enter a valid email address.";
      email.classList.add("invalid");
      ok = false;
    }
    if (msg.value.trim().length < 10) {
      errMsg.textContent = "Message needs at least 10 characters.";
      msg.classList.add("invalid");
      ok = false;
    }
    if (!ok) {
      note.textContent = "Please fix the highlighted fields and try again.";
      note.classList.add("bad");
      return;
    }
    note.textContent = "Thanks " + name.value.trim().split(" ")[0] + ". Your message was validated and is ready to send. I reply within two business days.";
    note.classList.add("ok");
    form.reset();
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
