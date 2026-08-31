/* Gắn window.REDIRECT_URL (config theo domain) vào CTA + mini-game slot. */
(function () {
  var SYMBOLS = ["🍒", "🔔", "💎", "7️⃣", "⭐", "💰"];
  var spinning = false;

  function currentUrl() {
    return window.REDIRECT_URL || "#";
  }

  function goToTarget() {
    var url = currentUrl();
    if (url && url !== "#") window.location.href = url;
  }

  function updateAllLinks() {
    var url = currentUrl();
    var links = document.querySelectorAll("a.redirect-link, a.ref-btn, #main-cta");
    for (var i = 0; i < links.length; i++) {
      links[i].href = url;
    }
  }

  function setReel(el, symbol) {
    if (el) el.textContent = symbol;
  }

  function spinReels(reels, onDone) {
    var ticks = [0, 0, 0];
    var maxTicks = [18, 24, 30];
    var timers = [];

    reels.forEach(function (reel, idx) {
      reel.classList.add("spinning");
      timers[idx] = setInterval(function () {
        ticks[idx] += 1;
        setReel(reel, SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
        if (ticks[idx] >= maxTicks[idx]) {
          clearInterval(timers[idx]);
          reel.classList.remove("spinning");
          setReel(reel, "7️⃣");
          if (idx === reels.length - 1) onDone();
        }
      }, 80);
    });
  }

  function initModal() {
    var mainCta = document.getElementById("main-cta");
    var modal = document.getElementById("casino-modal");
    var modalMsg = document.getElementById("modal-message");
    var finalCta = document.getElementById("final-cta");
    var modalTitle = document.getElementById("modal-title");
    var reels = [
      document.getElementById("reel-1"),
      document.getElementById("reel-2"),
      document.getElementById("reel-3")
    ];

    if (!mainCta || !modal || !finalCta || !reels[0]) return false;

    function resetModal() {
      spinning = false;
      if (modalTitle) modalTitle.textContent = "SLOT MAY MẮN";
      if (modalMsg) {
        modalMsg.textContent = "Đang quay...";
        modalMsg.classList.remove("success-text");
      }
      finalCta.classList.add("hidden");
      reels.forEach(function (reel, i) {
        reel.classList.remove("spinning");
        setReel(reel, SYMBOLS[i % SYMBOLS.length]);
      });
    }

    function openAndSpin() {
      resetModal();
      modal.style.display = "flex";
      spinning = true;
      spinReels(reels, function () {
        spinning = false;
        if (modalTitle) modalTitle.textContent = "CHÚC MỪNG!";
        if (modalMsg) {
          modalMsg.textContent = "Bạn đã nổ hũ — nhận thưởng và vào link quốc tế ngay!";
          modalMsg.classList.add("success-text");
        }
        finalCta.classList.remove("hidden");
      });
    }

    mainCta.addEventListener("click", function (e) {
      e.preventDefault();
      if (spinning) return;
      openAndSpin();
    });

    finalCta.addEventListener("click", function () {
      goToTarget();
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal && !spinning) {
        modal.style.display = "none";
      }
    });

    return true;
  }

  function initGoldButtons() {
    var buttons = document.querySelectorAll(".gold-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        e.preventDefault();
        goToTarget();
      });
    }
  }

  function init() {
    updateAllLinks();
    initGoldButtons();
    initModal();
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("domainConfigLoaded", updateAllLinks);
})();
