# Registration capture and Excel export

The public form is a Netlify Form named `btech-maker-registration`. On a Netlify deployment, each successful submission is retained in the site's Forms dashboard. It contains these columns: Name, Course, Branch, Contact Number, and Email.

For a direct `.xlsx` download, set these server-side environment variables in Netlify. Do not put any of them in a `VITE_` variable or in client code.

- `NETLIFY_ACCESS_TOKEN`: a Netlify personal access token with permission to read the site's form submissions.
- `NETLIFY_FORM_ID`: the Netlify ID shown for `btech-maker-registration` after the first deploy.
- `BTM_ADMIN_EXPORT_TOKEN`: a long, unique token that protects the download endpoint.

An administrator can then download the workbook through the protected endpoint:

```powershell
$headers = @{ Authorization = 'Bearer YOUR_BTM_ADMIN_EXPORT_TOKEN' }
Invoke-WebRequest 'https://YOUR-SITE.netlify.app/.netlify/functions/export-registrations' -Headers $headers -OutFile 'btech-maker-registrations.xlsx'
```

The download is generated server-side and is not accessible without the administrator token. Netlify's Forms dashboard also provides the raw submissions for routine administration.
