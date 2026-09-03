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
