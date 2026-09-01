import DOMAIN_MAPPINGS from "./domains.json";

function pickUrl(entry) {
  if (!entry) return null;
  if (typeof entry === "string") return entry;
  return entry.main_url || entry.target_url || entry.url || null;
}

function resolveTargetUrl(cleanHost) {
  const map = DOMAIN_MAPPINGS || {};
  return pickUrl(map[cleanHost]) || pickUrl(map._default) || "#";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const rawHost = request.headers.get("host") || url.hostname || "";
    const cleanHost = rawHost.replace(/^www\./i, "").split(":")[0].toLowerCase();
    const targetUrl = resolveTargetUrl(cleanHost);

    if (path === "/api/domain-config") {
      return new Response(JSON.stringify({ success: true, host: cleanHost, targetUrl }), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    if (path === "/config.js") {
      const configJs =
        `/* ${cleanHost} */\n` +
        `window.REDIRECT_URL = ${JSON.stringify(targetUrl)};\n`;
      return new Response(configJs, {
        headers: {
          "Content-Type": "application/javascript;charset=UTF-8",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      });
    }

    return env.ASSETS ? env.ASSETS.fetch(request) : fetch(request);
  }
};
