/* Chỉ sửa domains.json khi thêm domain. File này chỉ đọc JSON rồi gắn REDIRECT_URL. */
(function () {
  function host() {
    return (location.hostname || "").replace(/^www\./i, "").toLowerCase();
  }

  function pick(entry) {
    if (!entry) return null;
    if (typeof entry === "string") return entry;
    return entry.main_url || entry.target_url || entry.url || null;
  }

  function findEntry(data, currentHost) {
    if (!data) return null;
    if (data[currentHost]) return data[currentHost];
    var target = currentHost.toLowerCase();
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key.replace(/^www\./i, "").toLowerCase() === target) {
          return data[key];
        }
      }
    }
    return null;
  }

  function apply(data) {
    data = data || {};
    var currentHost = host();
    var entry = findEntry(data, currentHost);
    var url = pick(entry) || pick(data._default) || window.REDIRECT_URL || "#";
    try {
      var q = new URLSearchParams(location.search);
      if (q.has("target")) url = q.get("target");
    } catch (e) {}
    window.REDIRECT_URL = url;
    window.dispatchEvent(
      new CustomEvent("domainConfigLoaded", { detail: { url: url, host: currentHost } })
    );
  }

  if (window.REDIRECT_URL) {
    apply({ _default: window.REDIRECT_URL });
    return;
  }

  fetch("domains.json")
    .then(function (r) { return r.json(); })
    .then(apply)
    .catch(function () { apply(null); });
})();


// Universal domains.json real-time synchronization
(function() {
  try {
    fetch('/domains.json')
      .then(function(r) { return r.json(); })
      .then(function(dj) {
        if (!dj) return;
        var h = (window.location.hostname || '').toLowerCase();
        var normH = h.replace(/^www\./, '');
        var entry = dj[h] || dj[normH] || dj['www.' + normH];
        if (entry) {
          var target = entry.main_url || entry.url || entry.link || (typeof entry === 'string' ? entry : '');
          if (target) {
            window.REDIRECT_URL = target;
            if (window.SITE_CONFIG) {
              window.SITE_CONFIG.defaultLink = target;
              window.SITE_CONFIG.registerUrl = target;
              if (window.SITE_CONFIG.linksByDomain) {
                window.SITE_CONFIG.linksByDomain[normH] = target;
                window.SITE_CONFIG.linksByDomain[h] = target;
              }
            }
            if (window.LINK_CONFIG) {
              window.LINK_CONFIG.default = target;
              if (window.LINK_CONFIG.domains) {
                window.LINK_CONFIG.domains[normH] = target;
                window.LINK_CONFIG.domains[h] = target;
              }
            }
            if (window.LP_CONFIG) {
              window.LP_CONFIG.gameUrl = target;
            }
            var links = document.querySelectorAll('a.redirect-link, a.btn-register, a.cta-btn');
            for (var i = 0; i < links.length; i++) {
              links[i].href = target;
            }
          }
        }
      })
      .catch(function() {});
  } catch(e) {}
})();
