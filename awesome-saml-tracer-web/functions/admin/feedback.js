// GET /admin/feedback?key=SECRET — read feedback submissions.
//
// Minimal password gate via the ADMIN_KEY secret. Not linked anywhere public;
// bookmark it with the key. (Query-string key is fine for a low-stakes internal
// view; it can leak into logs, so treat the URL as semi-secret and rotate if needed.)

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!env.ADMIN_KEY || !safeEqual(key, env.ADMIN_KEY)) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (!env.DB) return new Response('Feedback storage is not configured yet.', { status: 500 });

  const { results } = await env.DB.prepare(
    `SELECT id, created_at, version, source, use_case, pain, recommend, email, handled
       FROM feedback ORDER BY created_at DESC LIMIT 500`,
  ).all();

  const list = results || [];
  const rows = list.map((r) => `
      <tr${r.handled ? ' class="done"' : ''}>
        <td>${r.id}</td>
        <td class="nowrap">${esc(r.created_at)}</td>
        <td>${esc(r.version)}</td>
        <td>${esc(r.source)}</td>
        <td>${esc(r.use_case)}</td>
        <td>${esc(r.pain)}</td>
        <td>${esc(r.recommend)}</td>
        <td>${esc(r.email)}</td>
      </tr>`).join('');

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Feedback — Awesome SAML Tracer</title>
  <style>
    :root{color-scheme:light dark}
    body{font:14px/1.5 system-ui,-apple-system,sans-serif;margin:24px;color:#151a27;background:#f4f6fb}
    h1{font-size:18px;margin:0 0 16px}
    .count{color:#59637a;font-weight:400}
    .wrap{overflow-x:auto;border:1px solid #e0e4ee;border-radius:8px}
    table{border-collapse:collapse;width:100%;background:#fff;min-width:860px}
    th,td{border-bottom:1px solid #eef1f7;padding:9px 11px;text-align:left;vertical-align:top;max-width:300px}
    td{white-space:pre-wrap;word-break:break-word}
    td.nowrap{white-space:nowrap}
    th{background:#eef1f7;position:sticky;top:0;font-weight:600}
    tr.done{opacity:.5}
    .empty{color:#59637a;padding:16px}
  </style></head><body>
  <h1>Feedback <span class="count">(${list.length})</span></h1>
  <div class="wrap"><table>
    <thead><tr><th>#</th><th>When (UTC)</th><th>Ver</th><th>Source</th><th>Use case</th><th>Missing / pain</th><th>Recommend</th><th>Email</th></tr></thead>
    <tbody>${rows || '<tr><td class="empty" colspan="8">No feedback yet.</td></tr>'}</tbody>
  </table></div>
  </body></html>`;

  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// Length-independent comparison to avoid trivial timing leaks on the key.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
