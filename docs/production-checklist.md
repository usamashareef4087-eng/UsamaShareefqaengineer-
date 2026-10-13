# Production acceptance checklist

This checklist distinguishes implemented code from live-account verification. A successful local build does not prove hosted authentication, database policies, email delivery, or Vercel persistence.

## Accounts and configuration

- [ ] Create Supabase project and execute every migration, in filename order.
- [ ] Confirm database tables, constraints, functions, storage buckets and RLS policies exist.
- [ ] Disable public sign-up; configure Site URL and approved recovery redirect URLs.
- [ ] Create designated admin with a unique password; grant role through protected admin_profiles, using the user's Auth UUID.
- [ ] Configure and test authenticator MFA and recovery procedures.
- [ ] Verify a Resend sending domain, set EMAIL_FROM and notification recipient.
- [ ] Set production and preview environment variables independently.
- [ ] Deploy repository to Vercel and attach approved domain.

## Hosted security acceptance

- [ ] Anonymous requests cannot read inquiries, drafts or audit logs.
- [ ] Ordinary signed-in users cannot mutate public content or upload/delete media.
- [ ] Every admin mutation rejects absent/invalid sessions.
- [ ] Foreign-origin mutations are rejected; cookies have required security attributes.
- [ ] Repeated login/contact attempts trigger rate limiting across serverless instances.
- [ ] Disallowed file formats, spoofed MIME types, oversized files and executable content fail upload.
- [ ] Password recovery works on production domain; logout invalidates access.
- [ ] No secret key is exposed in browser assets, repository or logs.

## Functional acceptance

- [ ] Publish a real project, reload public page, and confirm draft remains private.
- [ ] Edit experience dates and verify Present formatting and overlapping roles.
- [ ] Replace/delete unused media and verify referenced media cannot be accidentally removed.
- [ ] Update services, appearance and SEO, preview and publish.
- [ ] Submit genuine contact inquiry and confirm durable storage and notification receipt.
- [ ] Verify inquiry filters, statuses, deletion and CSV export.
- [ ] Check all links and keyboard navigation at 1440, 1024, 768, 390 and 320px.
- [ ] Confirm no horizontal overflow, clipped text or misleading delivery-success messages.
- [ ] Check sitemap, robots, canonical tags, social cards and project metadata on custom domain.
- [ ] Redeploy, then verify uploaded files and CMS changes survive.
- [ ] Run dependency audit and assess findings; retain dated test output.
- [ ] Review privacy policy, retention period and actual service claims with owner.

## Outstanding external dependencies

Live Supabase, Resend and Vercel operations require the owner's account access and environment configuration. Production login/reset/MFA, email-domain verification, hosted RLS execution, redeployment persistence and production end-to-end flows cannot be certified without those accounts. A CV, verified work evidence and authorized media are also required before publishing experience, education, certifications or project results.

## Local verification performed on 13 October 2026

- Strict TypeScript check and ESLint completed successfully.
- Next.js production build compiled and generated its intended routes.
- Local HTTP smoke checks returned the public page, redirected `/admin` to login, returned 404 for an unpublished project, rejected unauthenticated admin data, and did not accept an inquiry without a configured backend.
- The production audit reported zero vulnerabilities after updating Sharp. The complete dependency audit subsequently reported zero vulnerabilities from the locally cached advisory data; repeat it online before launch.
- Playwright browsers and a configured Supabase/Resend test environment were unavailable, so the browser suite and authenticated end-to-end paths were not executed.
