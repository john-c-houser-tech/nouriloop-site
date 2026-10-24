# nouriloop-site

The NouriLoop LLC business site (Transformation Plan §3A). Plain HTML/CSS, no build step,
no framework, no third-party scripts.

Six pages, one folder each: `index.html` (Home), `services/`, `work/`, `training/`, `about/`,
`contact/`, plus `equal-opportunity/` (the LLC's policy, copied word for word from
`NouriLoop-LLC-Equal-Opportunity-Policy.md` §1–§8; change both together). Every page links
`/site.css` and repeats the same site bar and footer, so a change to either goes into every
page, including `contact/thanks/` and `contact/problem/`. `john-houser.jpg` is the About photo.

The contact form posts to `https://app.nouriloop.com/site-contact` on the NouriLoop app,
which emails it to info@nouriloop.com and redirects back to `contact/thanks/` or
`contact/problem/` here (app side: `.claude/rules/registration.md` ▸ Business-site contact
form in the app repo). Keep those two paths and the field names (`name`, `email`,
`message`, honeypot `website`) in step with the app. Copy source: `NouriLoop-Site-Copy.md` in the
NouriLoop Business folder.

Local preview: https://nouriloop-site.localhost:8443 (Caddy `file_server` on this directory).
