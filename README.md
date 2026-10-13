# Usama Shareef — QA consulting portfolio

Next.js App Router, strict TypeScript, Tailwind CSS, Supabase PostgreSQL/Auth/Storage, and Resend. The original Stitch design informs the editorial layout. Original design inputs are retained in `design-reference/` for review and are not served by the application. Unsupported employment, credentials and project outcomes must remain unpublished.

## Local development

Use Node.js 22 LTS and npm. Run `npm ci`, copy `.env.example` to `.env.local`, add your own values, then run `npm run dev`. Open http://localhost:3000. Never commit `.env.local` or credentials. The site can render its safe initial public content without credentials; protected integrations require setup. An unavailable backend must never produce a successful inquiry message.

Run the checks available in package.json before deployment: type checking, linting, tests and production build. Run `npm audit` and investigate findings. Read [the verification register](docs/content-verification.md) before publishing records and [the production checklist](docs/production-checklist.md) before launch.

## Supabase setup

1. Create a Supabase project, preserve the database password securely and choose a region near the audience.
2. Execute `supabase/migrations/*.sql` in filename order in the SQL Editor, or apply them through the Supabase CLI to the linked project. Do not selectively skip policies or constraints.
3. Run `supabase/seed.sql` once after the migration. It publishes only the supplied general portfolio copy and broad service/expertise categories; no employment, project, degree or certificate records are seeded. Verify the migration-created storage bucket and its policies. Uploads belong in Supabase Storage, never Vercel's ephemeral filesystem.
4. In Authentication, disable public self-registration, set Site URL to your production origin, and allow only your actual login/recovery callback URLs and trusted local development URL. Avoid broad production redirect wildcards.
5. Create the initial `usamashareef4087@gmail.com` Auth user through the Supabase dashboard with a unique portfolio password. Alternatively, after configuring server-only Supabase variables, supply a temporary `ADMIN_BOOTSTRAP_PASSWORD` environment secret of at least 12 characters and run `node scripts/bootstrap-admin.mjs` once; remove that secret immediately afterward. Do not paste it into source code or commit it. This is not the Gmail password. Keep credentials out of SQL history and source code.
6. If you created the Auth user manually, obtain the UUID in Authentication → Users. In SQL Editor, run `insert into public.admin_profiles(user_id,role) values ('<UUID from Auth Users>','admin');`. The bootstrap script grants this role automatically. Never substitute the email address for the UUID. Email identity alone must never grant authorization. Keep this table protected by RLS.
7. Test login, recovery and role enforcement using both an authorized admin and an ordinary user. Configure authenticator MFA where supported and keep recovery methods securely.

## Environment variables

| Variable | Visibility | Purpose |
|---|---|---|
| NEXT_PUBLIC_SITE_URL | Public | Production origin used for canonical URLs and links |
| NEXT_PUBLIC_SUPABASE_URL | Public | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Public | Supported Supabase publishable key; RLS still required |
| SUPABASE_SECRET_KEY | Server only | Privileged Supabase secret key for explicit server operations |
| RESEND_API_KEY | Server only | Email delivery credentials |
| EMAIL_FROM | Server only | Sender address on the verified sending domain |
| CONTACT_NOTIFICATION_EMAIL | Server only | Portfolio owner's inquiry notification recipient |

Supabase currently supports publishable and secret keys. Never use a privileged secret key in a `NEXT_PUBLIC_` variable. The recipient is `usamashareef4087@gmail.com`; EMAIL_FROM must use a domain verified with the provider, not an arbitrary Gmail sender.

## GitHub and Vercel

1. Create an empty private GitHub repository. From this project directory run `git init`, `git add .`, `git commit -m 'Build QA portfolio and CMS'`, add your repository as `origin`, and push the main branch. Confirm `.env.local` is ignored before staging.
2. In Vercel, import that repository and choose the Next.js preset. Keep the project root at this directory. Use the lockfile and npm build script.
3. Add the required environment values in Vercel's project settings. Use the production origin for NEXT_PUBLIC_SITE_URL; add preview values separately where appropriate.
4. Deploy. If configuration changes, redeploy so server functions receive updated values.
5. Add a custom domain in Vercel, apply its displayed DNS records at your registrar and wait for TLS issuance. Update Supabase Site URL/approved redirects and NEXT_PUBLIC_SITE_URL to the final domain.
6. Verify the Resend sending domain with its displayed DNS records. Send a real inquiry, check the backend result and confirm notification receipt.
7. Run the production checklist. Supabase content and storage persist independently of builds; verify this with an actual redeployment.

Creating GitHub, Supabase, Resend and Vercel accounts, DNS verification, secret provisioning, initial-admin authorization and production acceptance require owner action. No account credentials or deployment were presumed.

## Content management

Use `/admin/login` and `/admin` after setup. Save unverified work as draft, inspect previews and publish only reviewed content. Use authorized images only. Keep personal and customer information out of screenshots. Routine database content changes should not require deployment. Apply migrations when changing the database schema.

Inquiries contain personal data. Restrict their access, review the privacy page, agree a retention period and periodically remove stale records. Export only to authorized recipients. Do not enable fabricated analytics, reviews or metrics.

## Tests

Browser acceptance specifications live in `tests/`. Install Playwright browser binaries if your environment allows them, start the app, and run the configured Playwright suite. The unconfigured-backend test is intended for a test environment without Supabase/Resend secrets; do not run a destructive acceptance suite against production. Authenticated CMS flows require a dedicated Supabase test project, test admin and non-admin credentials. Never report those flows as verified solely because the public page renders.

## What was verified in this build

A local production build, strict TypeScript check, lint and production dependency audit are part of the delivery verification. Browser automation is included as an acceptance suite, but requires installed Playwright browsers. SQL execution, account integration and hosted functional tests remain for the owner-backed environment. See the checklist for exact steps.

## Editing guide

The left navigation manages database records. Add a project as a draft, upload images in Media Library, select its thumbnail in the project editor, add screenshots in Project Screenshots, preview the text, then publish only after checking its facts. The project URL uses its slug. Experience dates are entered as month/year; select Currently working to display Present and leave the end date blank. Multiple roles may overlap.

Profile Settings edits the public name, email, LinkedIn URL and positioning. Pages & Content edits the hero, About and four working-approach steps as structured JSON. In Site Appearance, the `theme` JSON record recognizes only six-digit hex `accent`, `background` and `dark_contact` values, plus a `button_radius` from 0 to 12 pixels. The `navigation_labels` record can replace menu text for its existing destinations and `footer_text` sets the line after the current-year copyright. The `sections_visibility` JSON record accepts booleans for `about`, `expertise`, `services`, `experience`, `work`, `approach` and `credentials`. Other CSS or JavaScript is never injected. The SEO Settings `homepage` record accepts `title`, `description`, `og_title`, `og_description`, `canonical_url`, `og_image_id`, `favicon_id` and `indexing`; image IDs come from Media Library.

Projects, experience, services, skills, education, certifications, page sections and settings use draft/published status. The public queries only published rows. Publication changes render from Supabase on the next request without a Vercel rebuild. Published work and media should be reviewed for client confidentiality before visibility is enabled.
#   U s a m a S h a r e e f q a e n g i n e e r -  
 