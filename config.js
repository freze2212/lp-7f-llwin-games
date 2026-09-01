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

  function apply(data) {
    data = data || {};
    var url = pick(data[host()]) || pick(data._default) || window.REDIRECT_URL || "#";
    try {
      var q = new URLSearchParams(location.search);
      if (q.has("target")) url = q.get("target");
    } catch (e) {}
    window.REDIRECT_URL = url;
    window.dispatchEvent(
      new CustomEvent("domainConfigLoaded", { detail: { url: url, host: host() } })
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
