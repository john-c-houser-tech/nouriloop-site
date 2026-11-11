# nouriloop-site

The NouriLoop LLC business site (Transformation Plan §3A). Plain HTML/CSS, no build step,
no framework. The one third-party script is Cloudflare Turnstile on the contact page, loaded
only when the app turns it on.

Six pages, one folder each: `index.html` (Home), `services/`, `work/`, `training/`, `about/`,
`contact/`, plus `equal-opportunity/` (the LLC's policy, copied word for word from
`NouriLoop-LLC-Equal-Opportunity-Policy.md` §1–§8; change both together). Every page links
`/site.css` and repeats the same site bar and footer, so a change to either goes into every
page, including `contact/thanks/`, `contact/problem/` and `404.html` (GitHub Pages serves it for any
missing address; it carries `noindex`). `john-houser.jpg` is the About photo.

The footer has three parts with a rule between them: the company (NouriLoop LLC and nouriloop.com
alone on the first line, then GitHub and LinkedIn), what it has built (applications on the left with
Compromise Checker first, games on the right; one column on a narrow screen), and the equal
opportunity line. Every link is spelled out as a visible address.

The six pages use the wide layout: `<body class="wide">` plus `/site.js` (first-party, about 30
lines: a shadow under the site bar after scrolling, and parts that rise into place as they scroll
into view). The layout classes are in the last block of `site.css`: `hero-grid` (photo, then title
beside its text, with `rail-head` on pages whose sections are rails so the columns line up; a 3:2 photo's figure carries `style="--photo-ratio: 1.5"`), `rail` (a section's heading on the left, content at reading width on the right),
`cards`, `tiles`, `split`, `shots`, `duo`/`pair` with `panel`, and `faq`. Pages without the class
(the policy, the install page, thanks, problem, 404) keep one reading column under the same wide
site bar and footer. All motion is inside `prefers-reduced-motion: no-preference`, and every page
reads the same without the script. The install page loads no script; keep it that way.

Each page opens with one of John's photographs (`photos/`): a hand-chosen 2:1 crop of the
original (Looking East and Hotel Pier use the full 3:2 frame), shown whole at every width (CSS never crops it further), in 800, 1600 and 2400 px wide
as WebP with JPEG fallback, metadata stripped. To change one, re-crop the original at 2:1, export
all six files with the same names, and keep the alt text and caption in step.

NouriLoop screenshots (`screens/`) come from a local copy of the app with the made-up demo
user (DemoDataSeeder's "Alex Rivera"), John's own meal photos with location data stripped, real
AI analysis and synthetic glucose — never production. Each links to its 1600 px version so it can
be read on a phone.

The five service icons are maritime line drawings (lighthouse, compass, ship's wheel, anchor,
channel buoy). They're inlined as SVG in `services/index.html` and `index.html` so they take the
accent color and follow dark mode; `icons/` holds the source of each. Edit the source, then paste
its paths into both pages.

The logo is the Coil, a Flemish-coiled rope with a straight tail (source `icons/coil.svg`, same
line style as the service icons). It's inlined before "NouriLoop LLC" in the site bar of every page
(`.brand-mark`, accent color), and again before "NouriLoop LLC" on the footer's first line
(`.footer-mark`, sized to the footer text). The favicons at the root are drawn from it: `favicon.svg` (white coil
on a green rounded square), `favicon.ico` (16, 32 and 48 px) and `apple-touch-icon.png` (180 px,
square; iOS rounds the corners). Each page links all three in its `<head>`. If the coil changes,
update the source, both inline copies on every page and `favicon.svg`, then re-render the two raster
files. The `privacy/` pages are redirects to the app and carry no site bar or icon links. So are the
old app paths from before the app moved to its subdomain (`pricing/`, `help/…`, `login/`,
`register/`, `reset-password/`, and `about`/`pricing`/`login`/`register` under each language
folder such as `de/`): each is a page with a canonical link and an instant refresh to the same
path on app.nouriloop.com. GitHub Pages can't send a 301 to another host; Google treats an
instant meta refresh as a permanent redirect, so the stubs carry no `noindex` (it would contradict
the redirect). `/about/` itself is the LLC's About page, so the app's `/about` has no stub.

Two more stubs give the Compromise Checker repository's Sponsor button addresses that say what
they are, since GitHub shows a funding link's address and nothing else:
`work/compromise-checker/buy-me-a-coffee/` goes to the Stripe payment link (it carries `noindex`
and no canonical link: a payment page shouldn't be in search results), and
`work/compromise-checker/sponsor-a-threat-pack-or-distro/` goes to the repository's
`docs/sponsoring.md`. If the Stripe link is ever replaced, change it here and nowhere else.

Search: `robots.txt` points to `sitemap.xml`, which lists the eight real pages. Add a new page
there too. Each page has its own `<meta name="description">` (wording in the copy doc ▸ Search
descriptions) and a canonical link to its own https://nouriloop.com/ address. Below the
canonical link, each of the eight pages carries Open Graph tags (title and description repeat
the page's own; the image is the page's 1600 px banner JPEG, and the equal-opportunity page
borrows the home banner) so a shared link gets a preview. `index.html` also carries JSON-LD for
the LLC (ProfessionalService, with the five services linked to their anchors on `services/`) and
the WebSite; `about/index.html` carries the Person; `services/index.html` carries the FAQPage,
whose answers must stay word for word the same as the "Questions we get" section on the page.
Change the description or banner of a page and update its Open Graph tags in step; a new service
needs a line in the home-page catalog.

The contact form posts to `https://app.nouriloop.com/site-contact` on the NouriLoop app,
which emails it to info@nouriloop.com and redirects back to `contact/thanks/` or
`contact/problem/` here (app side: `.claude/rules/registration.md` ▸ Business-site contact
form in the app repo). Keep those two paths and the field names (`name`, `email`,
`message`, honeypot `website`, token `ft`) in step with the app. `contact/form.js` fetches the
signed token from the app's `GET /site-contact/token`, and, when the app returns a Turnstile
site key, loads Cloudflare's script and shows the widget (the key lives in the app's
`TURNSTILE_SITEKEY`, not here; the widget's hostnames must include nouriloop.com). Copy source: `NouriLoop-Site-Copy.md` in the
NouriLoop Business folder.

`work/compromise-checker/install/` is the Compromise Checker install page. It holds the one line to paste,
which carries the installer's hash, and that hash is all that protects the installer, so the page is
kept apart from the release's own files. After each release of the tool, replace the line with the
one `scripts/release.py verify` prints, and the version on the page. It uses no script: one click
selects the line (CSS `user-select: all`).

Local preview: https://nouriloop-site.localhost:8443 (Caddy `file_server` on this directory).
