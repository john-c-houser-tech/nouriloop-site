# nouriloop-site

The NouriLoop LLC business site (Transformation Plan §3A). Plain HTML/CSS, no build step,
no framework, no third-party scripts.

The contact form posts to `https://app.nouriloop.com/site-contact` on the NouriLoop app,
which emails it to info@nouriloop.com and redirects back to `contact/thanks/` or
`contact/problem/` here (app side: `.claude/rules/registration.md` ▸ Business-site contact
form in the app repo). Keep those two paths and the field names (`name`, `email`,
`message`, honeypot `website`) in step with the app. Copy source: `NouriLoop-Site-Copy.md` in the
NouriLoop Business folder.

Local preview: https://nouriloop-site.localhost:8443 (Caddy `file_server` on this directory).
