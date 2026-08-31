/* Config link theo domain.
 * Key: hostname không có www (www.llvip.info → llvip.info).
 * Thêm domain mới: bổ sung 1 dòng trong domains.json (ưu tiên) hoặc linksByDomain.
 */
(function () {
  var DEFAULT_REDIRECT_URL = "https://14llwin.com/?id=927599905";

  window.SITE_CONFIG = {
    defaultLink: DEFAULT_REDIRECT_URL,
    linksByDomain: {
      "lltong86.com": "https://22llwin.com/?id=373982317",
      "llvip88.com": DEFAULT_REDIRECT_URL,
      "llwin85.com": "https://www.07llwin.com/?id=584043108"
    }
  };

  window.REDIRECT_URL = window.REDIRECT_URL || DEFAULT_REDIRECT_URL;

  function getCleanHost() {
    return (window.location.hostname || "").replace(/^www\./i, "").toLowerCase();
  }

  function pickUrl(entry) {
    if (!entry) return null;
    if (typeof entry === "string") return entry;
    return entry.main_url || entry.target_url || entry.url || null;
  }

  function applyDomainConfig(domainData) {
    var cleanHost = getCleanHost();
    var fromJson = pickUrl(domainData && domainData[cleanHost]);
    var fromInline = pickUrl(window.SITE_CONFIG.linksByDomain[cleanHost]);
    window.REDIRECT_URL = fromJson || fromInline || window.SITE_CONFIG.defaultLink;

    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has("target")) {
        window.REDIRECT_URL = params.get("target");
      }
    } catch (e) {}

    window.dispatchEvent(
      new CustomEvent("domainConfigLoaded", {
        detail: { url: window.REDIRECT_URL, host: cleanHost }
      })
    );
  }

  var host = getCleanHost();
  var inline = pickUrl(window.SITE_CONFIG.linksByDomain[host]);
  if (inline) window.REDIRECT_URL = inline;

  fetch("domains.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      applyDomainConfig(data);
    })
    .catch(function () {
      applyDomainConfig(null);
    });
})();
