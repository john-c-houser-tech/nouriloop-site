# nouriloop-site

The NouriLoop LLC business site (Transformation Plan §3A). Plain HTML/CSS, no build step,
no framework, no third-party scripts.

Six pages, one folder each: `index.html` (Home), `services/`, `work/`, `training/`, `about/`,
`contact/`, plus `equal-opportunity/` (the LLC's policy, copied word for word from
`NouriLoop-LLC-Equal-Opportunity-Policy.md` §1–§8; change both together). Every page links
`/site.css` and repeats the same site bar and footer, so a change to either goes into every
page, including `contact/thanks/` and `contact/problem/`. `john-houser.jpg` is the About photo.

Each page opens with one of John's photographs (`photos/`): a hand-chosen 2:1 crop of the
original (Looking East and Hotel Pier use the full 3:2 frame), shown whole at every width (CSS never crops it further), in 800, 1600 and 2400 px wide
as WebP with JPEG fallback, metadata stripped. To change one, re-crop the original at 2:1, export
all six files with the same names, and keep the alt text and caption in step.

The five service icons are maritime line drawings (lighthouse, compass, ship's wheel, anchor,
channel buoy). They're inlined as SVG in `services/index.html` and `index.html` so they take the
accent color and follow dark mode; `icons/` holds the source of each. Edit the source, then paste
its paths into both pages.

The contact form posts to `https://app.nouriloop.com/site-contact` on the NouriLoop app,
which emails it to info@nouriloop.com and redirects back to `contact/thanks/` or
`contact/problem/` here (app side: `.claude/rules/registration.md` ▸ Business-site contact
form in the app repo). Keep those two paths and the field names (`name`, `email`,
`message`, honeypot `website`) in step with the app. Copy source: `NouriLoop-Site-Copy.md` in the
NouriLoop Business folder.

Local preview: https://nouriloop-site.localhost:8443 (Caddy `file_server` on this directory).
