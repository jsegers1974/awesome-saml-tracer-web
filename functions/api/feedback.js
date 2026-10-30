// POST /api/feedback — accept a feedback submission, spam-check, store in D1.
//
// Cloudflare Pages Function. Spam protection is layered:
//   1. a honeypot field (always on, zero config)
//   2. Cloudflare Turnstile — only enforced when TURNSTILE_SECRET is configured,
//      so the form works today without it and can be hardened later.
// Storage: the `feedback` table in the D1 database bound as `DB`.

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Could not read the form.' }, 400);
  }

  // Honeypot — real users never fill this hidden field; bots often do.
  // Accept-and-drop so a bot can't tell it was caught.
  if (str(form.get('website'))) return json({ ok: true });

  // Optional Turnstile check (only when a secret is configured).
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(
      str(form.get('cf-turnstile-response')),
      env.TURNSTILE_SECRET,
      request.headers.get('CF-Connecting-IP'),
    );
    if (!ok) return json({ error: 'Spam check failed. Please try again.' }, 400);
  }

  const useCase = str(form.get('use_case'));
  const pain = str(form.get('pain'));
  const recommend = str(form.get('recommend'));
  const email = str(form.get('email'));
  const version = str(form.get('v'));
  const source = str(form.get('source')) || 'site';

  if (!useCase && !pain && !recommend) {
    return json({ error: 'Please fill in at least one field.' }, 400);
  }
  for (const v of [useCase, pain, recommend, email]) {
    if (v.length > 4000) return json({ error: 'That response is too long.' }, 400);
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'That email address looks invalid.' }, 400);
  }

  if (!env.DB) return json({ error: 'Feedback storage is not configured yet.' }, 500);

  try {
    await env.DB.prepare(
      `INSERT INTO feedback (version, source, use_case, pain, recommend, email)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
    ).bind(version || null, source, useCase || null, pain || null, recommend || null, email || null).run();
  } catch {
    return json({ error: 'Could not save your feedback. Please try again.' }, 500);
  }

  return json({ ok: true });
}

async function verifyTurnstile(token, secret, ip) {
  if (!token) return false;
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

const str = (v) => (v == null ? '' : String(v).trim());
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
