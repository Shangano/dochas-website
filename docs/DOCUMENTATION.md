# Dòchas Home Care, Website Documentation

This document explains what the website is built with, how the folder is organised, and how to make common changes safely. It's written for someone with little or no coding background.

---

## 1. What this website is built with

| Technology | What it does here | Notes |
|---|---|---|
| **HTML5** | The content and structure of every page (text, headings, forms, images spaces, links). | One `.html` file per page. No build tools or server required, every file opens directly in a browser. |
| **CSS3** | All visual styling: colours, fonts, spacing, layout, responsive (mobile/tablet/desktop) behaviour, and the gentle scroll-reveal and dropdown animations. | One shared file: `css/styles.css`. Uses native CSS custom properties (variables) for the colour palette, and CSS Grid/Flexbox for layout, no framework (no Bootstrap/Tailwind). |
| **JavaScript (vanilla, no framework)** | All interactivity: the dropdown menus (staggered reveal) and mobile MENU button, the one-at-a-time carousels (Services and Help & Feedback), the enquiry chat, the cookie banner, the FAQ accordion, the contact form, and the scroll-reveal animation. | One shared file: `js/main.js`. No libraries, no build step, no npm/node required. |
| **Google Fonts** | Two typefaces loaded from Google's font service over the internet: **Fraunces** (headings) and **Public Sans** (body text). | Loaded via a `<link>` in the `<head>` of every page. Requires an internet connection to display the intended fonts, if offline, browsers fall back to a default serif/sans-serif. |

There is **no backend, database, or server-side code**. The enquiry and contact forms are visually complete but not yet "wired up" to send anywhere, see Section 6.

---

## 2. Folder structure

The site now has **41 pages**: a small number of "hub" pages (one per main navigation section) plus a dedicated page for every single dropdown item, so nothing sits buried halfway down a long page.

```
dochas-website/
│
├── index.html                    → Home page
│
├── about.html                    → About Us (hub, links to the 8 pages below)
│   ├── who-we-are.html
│   ├── our-story.html
│   ├── meet-the-founders.html
│   ├── what-dochas-means.html
│   ├── mission-and-vision.html
│   ├── the-dochas-way.html        → simple table layout (see Section 3a)
│   ├── quality-and-regulation.html
│   └── the-dochas-difference.html
│
├── services.html                 → Our Services (hub, links to the 9 pages below)
│   ├── personal-care.html
│   ├── daily-living-support.html
│   ├── meals-and-nutrition.html
│   ├── medication-support.html
│   ├── mobility-support.html
│   ├── companionship.html
│   ├── community-support.html
│   ├── hospital-discharge-support.html
│   └── respite-and-family-support.html
│
├── enquire.html                  → Arranging Care (hub + enquiry chatbot)
│   ├── how-care-starts.html
│   ├── care-assessment-and-planning.html
│   ├── professional-referrals.html
│   └── fees-and-funding.html
│
├── careers.html                  → Careers / Working at Dòchas (hub)
│   ├── current-vacancies.html
│   ├── recruitment-process.html
│   ├── training-and-development.html
│   └── careers-faqs.html
│
├── speak-up.html                 → Help & Feedback (hub)
│   ├── raise-a-concern.html
│   ├── make-a-complaint.html
│   ├── safeguarding-concern.html
│   ├── whistleblowing.html
│   ├── report-anonymously.html
│   ├── send-a-compliment.html
│   └── escalation-routes.html
│
├── faq.html                      → Frequently Asked Questions
├── contact.html                  → Contact Us (contact form + emergency notice)
├── privacy-policy.html           → Privacy Policy (legal)
├── sitemap.xml                    → List of pages for search engines (see Section 10)
├── robots.txt                     → Crawler permissions for search engines (see Section 10)
│
├── css/
│   └── styles.css                → ALL styling for every page, in one file
│
├── images/                        (31 files, every one is used by a page)
│   ├── logo-icon-transparent.png  → the Dòchas logo mark (header, footer, About)
│   ├── logo-icon-*.png (5)        → the five logo symbols (Home, Services)
│   ├── homepage-hero.jpg, home-care-moment.jpg → Home page photos
│   ├── services-hero-door.jpg     → Services page photo
│   ├── arranging-care.jpg         → Arranging Care page photo
│   ├── annah.jpg, gail.jpg        → founder photos
│   ├── staff-office.jpg, team-meeting.jpg → Careers page photos
│   ├── equality-hands-sign.jpg    → About Us, equality section
│   ├── svc-*.jpg (9)              → Services carousel illustrations
│   └── way-*.jpg (7)              → The Dòchas Way illustrations
│
├── js/
│   └── main.js                    → ALL interactivity for every page, in one file
│
└── docs/
    └── DOCUMENTATION.md           → This file
```

**Why the change from anchors to real pages?** The site originally grouped each dropdown's content into anchored sections on one long page per topic. The client felt this put too much information in front of a visitor at once. Every dropdown item is now its own short, focused page, and each hub page (`about.html`, `services.html`, etc.) is just a brief intro plus a set of link cards to those pages, rather than the full content itself.

**Navigation structure:** Home | About Us▼ | Our Services▼ | Arranging Care▼ | Careers▼ | Help & Feedback▼ | FAQs | Contact Us, plus a distinct "Enquire About Care" button. Clicking a dropdown heading itself (e.g. "About Us") opens that section's hub page; each item inside the dropdown opens its own dedicated page.

**Why share one CSS file and one JS file?** So that a style or behaviour only has to be changed once and it updates everywhere automatically. Since there are now many more pages, this matters even more, changing the brand colour, for example, still only means editing one file, not forty-one.

---

## 3. How the pages fit together

Every page follows the same skeleton:

```
<head>   → page title, description, font loading, link to css/styles.css
<header> → logo + navigation menu (same on every page)
<main>   → the content unique to that page
<footer> → site links, address, contact details (same on every page)
<script> → link to js/main.js
```

Because there's no shared templating system, the header and footer HTML is duplicated inside each page file. This is intentional and normal for a small static site, it keeps things simple, with no build step. The trade-off is that if you change the navigation menu or footer, you need to make that change across **all 41 files**. See Section 5 for how to do that efficiently, and consider asking a developer to set up a simple build step (or a framework like 11ty) if the page count grows much further, since hand-editing 41 files for one nav change is the main cost of this approach.

---

## 3a. The Dòchas Way page

`the-dochas-way.html` shows the seven principles as coloured cards, each with an illustration (`images/way-*.jpg`, cropped from the client's artwork). The styling is the `.way-card-grid` / `.way-card` / `.way-card-icon` rules in `css/styles.css`. To add a principle later, copy an existing `.way-card` block, change its background colour, title and text, and add a matching illustration to `images/`.

## 3b. Expandable "+ see more" sections

A few pages (`quality-and-regulation.html`, `the-dochas-difference.html`, `professional-referrals.html`, `escalation-routes.html`) use native HTML `<details>`/`<summary>` elements, styled as a heading with a "+" that rotates when opened, to keep genuinely long content (like the full list of policy areas) collapsed until someone wants to read it. No JavaScript is needed, it's built into HTML natively, so it's simple to copy this pattern onto any other page:

```html
<details class="expand">
  <summary><span>Section title</span><span class="plus">+</span></summary>
  <div class="expand-body">
    <p>Content that's hidden until clicked.</p>
  </div>
</details>
```

---

## 4. Logo and colour palette

The real Dòchas logo (supplied by the client) is now in use, at `images/logo-icon-transparent.png`, a cropped, transparent-background version of the icon mark (roof, two figures, heart, hands), used in the header, footer, and on the About page's "What our logo represents" section.

The site's colour palette was re-sampled directly from the logo artwork so the website matches it exactly:

| Variable | Hex | Used for |
|---|---|---|
| `--purple` | `#532D7B` | Primary buttons, links, headings |
| `--purple-deep` | `#3C2059` | Headings, footer background, dark text |
| `--purple-tint` | `#F1EEF4` | Light purple backgrounds/tints |
| `--green` | `#2D693A` | Secondary accents, icons |
| `--green-deep` | `#204C2A` | Dark green accents, small labels |
| `--green-tint` | `#EAF0EB` | Light green backgrounds/tints |

These are all defined once, at the top of `css/styles.css`, so changing any of them updates the whole site.

If a full brand guideline (exact Pantone/hex values, approved logo files in other formats such as SVG or a white/reversed version) becomes available later, swap the values in this table and the image file, everything else updates automatically.

---

## 5. Photos and images

All photos are in place, there are no empty "Image space" placeholders left anywhere on the site. Every file in the `images/` folder is used by at least one page (see the list in Section 2).

**To swap a photo for a new one,** the simplest way is to save the new image with the **same file name** over the old one in the `images/` folder, no HTML editing needed. Keep it a similar shape to the original (most photos are 3:2 landscape) and compress it first (aim for under ~200 KB) so pages stay quick to load.

Founder photos live in `meet-the-founders.html` (`annah.jpg`, `gail.jpg`), team photos on `careers.html`, and the equality banner on `about.html` (`equality-hands-sign.jpg`). The logo (`logo-icon-transparent.png`) appears in every page's header and footer and on the Home page, so it only needs replacing in one place (see Section 4).

---

## 6. Making common changes

### Change text on one page
Open that page's `.html` file in any text editor (Notepad, TextEdit, VS Code, etc.), find the sentence, edit it, and save. Refresh the browser to see the change.

### Change a colour, font size, or spacing site-wide
Edit `css/styles.css`. Colours are defined once at the very top of the file as named variables, for example:
```css
:root{
  --purple:#532D7B;
  --green:#2D693A;
  --paper:#FAF6F0;
  ...
}
```
Changing a value here updates it everywhere that colour is used, across all 41 pages.

### Change the navigation menu or footer (appears on every page)
Because the header/footer are duplicated across all files, do a **find-and-replace across all `.html` files** using your text editor's "Find in Files" / "Search across files" feature, rather than editing each page one by one. With 41 pages, this is the change most worth handing to a developer if you're not comfortable with bulk find-and-replace.

### Add a brand-new page
1. Copy an existing hub page (e.g. `careers.html`) or subpage (e.g. `raise-a-concern.html`) as a starting point, depending on whether the new page is a section landing page or a single topic.
2. Rename it, and replace the `<main>` content with the new page's content.
3. Add a link to it: inside the relevant dropdown (`<div class="nav-dropdown">`) in the header **and** the footer, on every page, plus a link card on the relevant hub page if it belongs under one.

---

## 7. What's NOT wired up yet (by design)

- **Enquiry chatbot and contact form** are both built to send via EmailJS, and will do so automatically as soon as the three placeholder values in `js/main.js` are filled in with real EmailJS credentials, see Section 7b for the exact steps. Until then, both fall back to opening the visitor's own email app with everything pre-filled (a `mailto:` link), so nothing is broken in the meantime, it's just not landing directly in an inbox yet.

### Items marked for Dòchas to confirm before launch (per the navigation brief)

These are marked directly in the page content, in *italics inside square brackets*, wherever they appear:
- Confirmed service area wording (currently "Dundee and the surrounding area")
- Care Inspectorate registration details and any required registration link or badge (`quality-and-regulation.html`)
- Whether every listed service is within Dòchas's registration, staffing and current delivery capability
- Current vacancy requirements, including experience, driving licence and vehicle requirements by role (`current-vacancies.html`)
- Out-of-hours contact arrangements and emergency wording (`contact.html`)
- Final privacy wording and technical handling for anonymous reports (`report-anonymously.html`)
- Current external complaint contact details before publication (`escalation-routes.html`)

- **Care Inspectorate registration number** and **out-of-hours service details** are marked in the source document as still to be confirmed, search `contact.html` and `about.html` for these and add them once available.
- **Careers vacancies**, the "View current vacancies" button currently links to the Contact page; once you have a jobs board or listing, point it there instead.

---

## 7a. How the enquiry chatbot works (for future edits)

The floating button, overlay, and chat panel markup is duplicated near the bottom of every page (just before the `<script src="js/main.js">` line), the same pattern used for the header and footer. The actual conversation script (questions, options, and branching logic) lives in one place: the bottom of `js/main.js`, in an object called `steps`.

To change a question, add a new one, or adjust the options:
1. Open `js/main.js` and find the `const steps = {` block near the end of the file.
2. Each step has a `bot` message, a `type` (`options`, `multiselect`, `text`, or `summary`), and a `next` function that decides which step comes after it.
3. Editing the text or options here updates the chatbot on every page at once, no need to touch individual HTML files.

The professional referral path branches automatically based on the answer to the very first question, so it asks different follow-up questions for a personal enquiry vs. a professional making a referral.

---

## 7b. Connecting the enquiry chatbot and contact form to a real inbox (EmailJS)

By default, both the chatbot and the contact form (`contact.html`) fall back to opening the visitor's own email app with everything pre-filled. To have submissions land directly in a real inbox instead, without needing any backend server, the site is already wired up for **EmailJS**, you just need to finish the account setup:

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Under **Email Services**, connect the inbox you want enquiries to arrive in (Gmail, Outlook, or any other supported provider), then copy its **Service ID**.
3. Under **Email Templates**, create a new template. It will receive these variables from the site: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, and `{{message}}` (a plain-text block containing all the enquiry answers, or the contact form's message). A simple template body works well, for example:
   ```
   Subject: {{subject}}
   From: {{from_name}} ({{reply_to}})

   {{message}}
   ```
   Copy the template's **Template ID** once saved.
4. Under **Account → General**, copy your **Public Key**.
5. Open `js/main.js` and find these three lines near the very top of the file:
   ```js
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
   Replace the three placeholder values with the ones from steps 2–4.
6. Save the file. That's it, no other changes needed. Both the chatbot's "Send enquiry" button and the contact form will now send directly to your inbox, on every page, since they all share this one file.

Until these values are filled in, the site automatically keeps using the mailto: fallback, so nothing is broken in the meantime, this is a drop-in upgrade whenever you're ready. EmailJS's free tier covers 200 emails per month at the time of writing, worth checking their current pricing if the site gets busier.

---

## 8. Accessibility & compatibility notes

- All interactive elements (menu, accordion, buttons) are keyboard-reachable and show a visible focus outline.
- The site is responsive and has been designed to work down to small mobile screens (~360px wide) through to large desktop screens.
- Tested against modern evergreen browsers (Chrome, Safari, Edge, Firefox). No Internet Explorer support.

---

## 9. Hosting the site

Because this is a static site (no server-side code), it can be hosted almost anywhere, for example:
- **Netlify** or **Vercel**, drag-and-drop the whole `dochas-website` folder.
- **GitHub Pages**, push the folder to a repository and enable Pages.
- Any standard web hosting provider that serves plain HTML/CSS/JS files.

The only requirement is that the folder structure (`css/`, `js/`, `images/`, and the `.html` files) stays together and in the same relative positions, since the pages link to `css/styles.css` and `js/main.js` using relative paths.

### Uploading to GitHub (the 100-file limit)

GitHub's web uploader accepts at most **100 files at a time**. The whole site is **77 files** (41 pages, 31 images, plus the stylesheet, script, sitemap, robots file and this document), so it fits in one upload. If you ever add enough files to pass 100, upload in two batches instead, for example:
1. All the `.html` pages (plus `sitemap.xml` and `robots.txt`), then commit.
2. The `css`, `js`, `images` and `docs` folders, then commit.

Two things to remember:
- **Uploading only adds or replaces files, it never deletes.** If a file has been removed from the project (for example a retired page or an unused photo), it stays in the GitHub repository until you delete it there by hand: open the file on github.com, click the bin icon, and commit. Stray files don't break anything, but they do count towards what you manage and clutter the repository.
- **Check for leftovers after a big clean-up.** Compare the repository's file list against the project folder; anything in the repository that isn't in the folder can be deleted.

---

## 10. Privacy Policy, sitemap.xml, and robots.txt

**`privacy-policy.html`** is a working draft, styled to match the rest of the site, covering what information is collected (through the enquiry/contact forms and more broadly as a care provider), how it's used, and visitors' rights under UK GDPR. It is linked from the footer on every page.

Search the file for text in *italics inside square brackets*, for example `[insert date]`, these mark details that still need to be filled in (a review date, ICO registration number if applicable, specific record retention periods, and confirmation of whether analytics/cookies are in use). **This is a template, not legal advice**, it's strongly recommended a solicitor or data protection advisor familiar with the care sector reviews it before the site goes live, given the sensitivity of the information involved (health and care details).

**`sitemap.xml`** and **`robots.txt`** sit at the top level of the `dochas-website` folder (next to `index.html`). They tell search engines which pages exist and give permission to crawl them:
- Both files currently use a placeholder domain (`https://www.dochashomecare.co.uk/`). **Before publishing, open both files and replace every instance of that placeholder with the real, live domain.**
- Once the site is live, submit the sitemap's full URL (e.g. `https://yourdomain.co.uk/sitemap.xml`) in Google Search Console, under Sitemaps.
- If a new page is ever added to the site, add a matching `<url>` entry to `sitemap.xml` so search engines find it too.

---

*Last updated as part of this build. For questions about the content itself (services, policies, contact details), refer back to the original Dòchas Home Care source document.*
