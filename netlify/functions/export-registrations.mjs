/**
 * B.Tech Maker – Registration Export Function
 *
 * Fetches all submissions from Netlify Forms and returns them as an Excel file.
 *
 * Environment variables required (Netlify dashboard → Site → Environment):
 *   NETLIFY_ACCESS_TOKEN   – personal access token
 *   NETLIFY_SITE_ID        – site ID (see Site Settings → General)
 *   BTM_ADMIN_EXPORT_TOKEN – your chosen secret token to protect this endpoint
 *
 * Usage:
 *   GET /.netlify/functions/export-registrations
 *   Authorization: Bearer <BTM_ADMIN_EXPORT_TOKEN>
 */

import * as XLSX from 'xlsx'

const REQUIRED = ['NETLIFY_ACCESS_TOKEN', 'NETLIFY_SITE_ID', 'BTM_ADMIN_EXPORT_TOKEN']

export default async (request) => {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 })

  const missing = REQUIRED.filter(key => !process.env[key])
  if (missing.length) {
    return new Response(
      `Registration export is not configured. Missing: ${missing.join(', ')}`,
      { status: 503 },
    )
  }

  // ── Admin authentication ─────────────────────────────────────────────────
  const suppliedToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (suppliedToken !== process.env.BTM_ADMIN_EXPORT_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // ── Fetch all pages of submissions ───────────────────────────────────
    const siteId      = process.env.NETLIFY_SITE_ID
    const accessToken = process.env.NETLIFY_ACCESS_TOKEN

    let page = 1
    const perPage = 100
    let allSubmissions = []
    let hasMore = true

    while (hasMore) {
      const url = `https://api.netlify.com/api/v1/sites/${encodeURIComponent(siteId)}/submissions?per_page=${perPage}&page=${page}`
      const netlifyResponse = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!netlifyResponse.ok) {
        throw new Error(`Netlify API returned ${netlifyResponse.status}`)
      }
      const batch = await netlifyResponse.json()
      // Filter to only our form
      const ours = batch.filter(s => s.form_name === 'btech-maker-registration')
      allSubmissions = allSubmissions.concat(ours)
      hasMore = batch.length === perPage
      page++
    }

    if (allSubmissions.length === 0) {
      return new Response('No registrations found yet.', { status: 200 })
    }

    // ── Build Excel rows ─────────────────────────────────────────────────
    const rows = allSubmissions.map((submission, index) => {
      const d   = submission.data ?? {}
      const ts  = submission.created_at ? new Date(submission.created_at) : new Date()

      // Format date as DD-MM-YYYY and time as HH:MM:SS (IST)
      const isoDate = ts.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day:'2-digit', month:'2-digit', year:'numeric' })
      const isoTime = ts.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })

      return {
        'Sr. No':          index + 1,
        'Full Name':       d.name ?? '',
        'Course':          d.course ?? '',
        'Branch':          d.branch ?? '',
        'Contact Number':  String(d.contactNumber ?? ''),  // text – preserve leading zeros
        'Email Address':   d.email ?? '',
        'Suggestion':      d.suggestion ?? '',
        'Date':            isoDate,
        'Time (IST)':      isoTime,
      }
    })

    const headers = ['Sr. No', 'Full Name', 'Course', 'Branch', 'Contact Number', 'Email Address', 'Suggestion', 'Date', 'Time (IST)']

    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers })

    // Force Contact Number column to text so leading zeros and long numbers are preserved
    const contactColIndex = headers.indexOf('Contact Number')    // 0-based = 4
    const contactColLetter = XLSX.utils.encode_col(contactColIndex) // 'E'
    for (let r = 1; r <= rows.length; r++) {
      const cellAddress = `${contactColLetter}${r + 1}` // +1 for header row
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].t = 's' // force string type
        worksheet[cellAddress].z = '@' // text format
      }
    }

    // Column widths
    worksheet['!cols'] = [
      { wch: 8  },  // Sr. No
      { wch: 28 },  // Full Name
      { wch: 16 },  // Course
      { wch: 28 },  // Branch
      { wch: 18 },  // Contact Number
      { wch: 32 },  // Email Address
      { wch: 60 },  // Suggestion
      { wch: 14 },  // Date
      { wch: 14 },  // Time (IST)
    ]

    // Bold header row
    worksheet['!rows'] = [{ hpx: 20 }]

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')

    const exportDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
    const filename   = `btech-maker-registrations-${exportDate}.xlsx`

    const contents = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    return new Response(contents, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache',
        'X-Total-Registrations': String(allSubmissions.length),
      },
    })
  } catch (error) {
    console.error('[export-registrations] Error:', error)
    return new Response('Unable to export registrations. Please try again.', { status: 502 })
  }
}
