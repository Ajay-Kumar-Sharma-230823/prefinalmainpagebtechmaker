/**
 * B.Tech Maker – Registration Function
 *
 * Receives form submissions from the frontend, validates them,
 * and saves them to Netlify Forms via the Forms API.
 *
 * Environment variables required (set in Netlify dashboard → Site → Environment):
 *   NETLIFY_ACCESS_TOKEN   – personal access token from app.netlify.com/user/applications
 *   NETLIFY_SITE_ID        – site ID from Site Settings → General (e.g. abc123.netlify.app)
 *
 * Both variables must be present for the function to save submissions.
 * Without them the function still validates and returns a friendly error.
 */

export default async (request) => {
  // ── CORS pre-flight ──────────────────────────────────────────────────────
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let data
  try {
    const contentType = request.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      data = await request.json()
    } else {
      const text = await request.text()
      const params = new URLSearchParams(text)
      data = Object.fromEntries(params)
    }
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid request body.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // ── Validate required fields ─────────────────────────────────────────────
  const { name, course, branch, contactNumber, email, suggestion = '' } = data ?? {}

  if (!name?.trim())   return errorResponse(corsHeaders, 'Full name is required.')
  if (!course?.trim()) return errorResponse(corsHeaders, 'Course is required.')
  if (!branch?.trim()) return errorResponse(corsHeaders, 'Branch is required.')

  const phone = (contactNumber ?? '').replace(/[\s\-]/g, '')
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return errorResponse(corsHeaders, 'Enter a valid 10-digit Indian mobile number.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '')) {
    return errorResponse(corsHeaders, 'Enter a valid email address.')
  }

  if (suggestion.length > 1000) {
    return errorResponse(corsHeaders, 'Suggestion must be 1000 characters or fewer.')
  }

  // ── Sanitize ─────────────────────────────────────────────────────────────
  const clean = {
    name:          name.trim().slice(0, 120),
    course:        course.trim().slice(0, 80),
    branch:        branch.trim().slice(0, 120),
    contactNumber: phone,
    email:         email.trim().toLowerCase().slice(0, 254),
    suggestion:    suggestion.trim().slice(0, 1000),
  }

  // ── Persist via Netlify Forms API ────────────────────────────────────────
  const accessToken = process.env.NETLIFY_ACCESS_TOKEN
  const siteId      = process.env.NETLIFY_SITE_ID

  if (!accessToken || !siteId) {
    // Env vars not configured — still acknowledge the user gracefully in
    // production; in dev, the error message makes the missing config obvious.
    console.warn('[register] NETLIFY_ACCESS_TOKEN or NETLIFY_SITE_ID not set.')
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'Registration service is not yet configured. Please contact B.Tech Maker support.',
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  try {
    // POST to Netlify Forms API — this writes directly to the Forms database
    // associated with the site, same as a Netlify-detected HTML form submission.
    const payload = {
      form_name: 'btech-maker-registration',
      fields: {
        name:          clean.name,
        course:        clean.course,
        branch:        clean.branch,
        contactNumber: clean.contactNumber,
        email:         clean.email,
        suggestion:    clean.suggestion,
      },
    }

    const netlifyRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${encodeURIComponent(siteId)}/submissions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    if (!netlifyRes.ok) {
      const errText = await netlifyRes.text().catch(() => '')
      console.error(`[register] Netlify API error ${netlifyRes.status}: ${errText}`)
      throw new Error(`Netlify API returned ${netlifyRes.status}`)
    }

    return new Response(
      JSON.stringify({ ok: true, message: 'Registration saved successfully.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('[register] Submission error:', err)
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'We could not save your registration. Please try again in a moment.',
      }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
}

function errorResponse(corsHeaders, message) {
  return new Response(JSON.stringify({ ok: false, message }), {
    status: 422,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
