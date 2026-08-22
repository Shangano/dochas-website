# Dòchas Home Care, Website Documentation

This document explains what the website is built with, how the folder is organised, and how to make common changes safely. It's written for someone with little or no coding background.

---

## 1. What this website is built with

| Technology | What it does here | Notes |
|---|---|---|
| **HTML5** | The content and structure of every page (text, headings, forms, images spaces, links). | One `.html` file per page. No build tools or server required, every file opens directly in a browser. |
| **CSS3** | All visual styling: colours, fonts, spacing, layout, responsive (mobile/tablet/desktop) behaviour, and the two small animations in the homepage hero. | One shared file: `css/styles.css`. Uses native CSS custom properties (variables) for the colour palette, and CSS Grid/Flexbox for layout, no framework (no Bootstrap/Tailwind). |
| **JavaScript (vanilla, no framework)** | Two small interactive behaviours: (1) the mobile "hamburger" menu opening/closing, (2) the expand/collapse accordion on the FAQ page. | One shared file: `js/main.js`. No libraries, no build step, no npm/node required. |
| **Google Fonts** | Two typefaces loaded from Google's font service over the internet: **Fraunces** (headings) and **Public Sans** (body text). | Loaded via a `<link>` in the `<head>` of every page. Requires an internet connection to display the intended fonts, if offline, browsers fall back to a default serif/sans-serif. |

There is **no backend, database, or server-side code**. The enquiry and contact forms are visually complete but not yet "wired up" to send anywhere, see Section 6.

---

## 2. Folder structure

```
dochas-website/
│
├── index.html          → Home page
├── about.html           → About Us
├── services.html        → Our Services
├── enquire.html         → Enquire About Care (enquiry form)
├── speak-up.html        → Speak Up / Complaints & Feedback
├── faq.html              → Frequently Asked Questions
├── careers.html          → Careers
├── contact.html          → Contact Us (contact form + complaints info)
├── privacy-policy.html   → Privacy Policy (legal)
├── sitemap.xml            → List of pages for search engines (see Section 10)
├── robots.txt             → Crawler permissions for search engines (see Section 10)
│
├── css/
│   └── styles.css        → ALL styling for every page, in one file
│
├── images/
│   └── logo-icon-transparent.png → the real Dòchas logo mark
│
├── js/
│   └── main.js            → ALL interactivity for every page, in one file
│
└── docs/
    └── DOCUMENTATION.md   → This file
```

**Why split into separate pages?** Each page is now its own file, so you (or anyone helping you) can open, for example, just `services.html` to add a new service, without touching Home, Contact, or any other page. This is easier to manage and reduces the risk of accidentally breaking an unrelated page.

**Why share one CSS file and one JS file?** So that a style or behaviour only has to be changed once and it updates everywhere automatically. If each page had its own copy of the styling, changing the brand colour, for example, would mean editing eight files instead of one.

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

Because there's no shared templating system, the header and footer HTML is duplicated inside each page file. This is intentional and normal for a small static site, it keeps things simple, with no build step. The trade-off is that if you change the navigation menu or footer, you need to make that change in **all eight files**. See Section 5 for how to do that efficiently.

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

## 5. Where to add images

Search `about.html` for the words **"Image space"**, these mark dashed placeholder boxes where a real photo should go: Annah's photo and Gail's photo.

There is already an `images/` folder inside `dochas-website/` (currently holding the logo file). To add a photo yourself:
1. Save the image file into that `images/` folder.
2. In `about.html`, find the placeholder `<div class="avatar">...</div>` and replace its contents with:
   ```html
   <img src="images/annah.jpg" alt="Photo of Annah, co-founder of Dòchas Home Care" style="width:100%;height:100%;object-fit:cover;border-radius:50% 50% 8px 8px;">
   ```
3. Repeat for Gail's photo.

The logo now uses the client's real artwork (`images/logo-icon-transparent.png`), so it doesn't need to be touched unless a different version of the logo file becomes available (see Section 4).

---

## 6. Making common changes

### Change text on one page
Open that page's `.html` file in any text editor (Notepad, TextEdit, VS Code, etc.), find the sentence, edit it, and save. Refresh the browser to see the change.

### Change a colour, font size, or spacing site-wide
Edit `css/styles.css`. Colours are defined once at the very top of the file as named variables, for example:
```css
:root{
  --purple:#5B3568;
  --green:#3F6B4A;
  --paper:#FAF6F0;
  ...
}
```
Changing a value here updates it everywhere that colour is used across all eight pages.

### Change the navigation menu or footer (appears on every page)
Because the header/footer are duplicated across all files, do a **find-and-replace across all `.html` files** using your text editor's "Find in Files" / "Search across files" feature, rather than editing each page one by one. If you're not comfortable doing this, it's a quick, low-risk task to hand to a developer.

### Add a brand-new page
1. Copy an existing page (e.g. `contact.html`) as a starting point.
2. Rename it, and replace the `<main>` content with the new page's content.
3. Add a link to it in the navigation menu (`<nav class="primary">`) **and** the footer, on every page.

---

## 7. What's NOT wired up yet (by design)

- **Enquiry form** (`enquire.html`) and **Contact form** (`contact.html`) are fully styled and usable-looking, but pressing "Send" currently does nothing, there's no server to receive the submission yet. To make them work, you'll need either:
  - A form backend service (e.g. Formspree, Netlify Forms, GetForm), usually the quickest option, no coding required, or
  - A custom backend built by a developer that emails or stores the submissions securely.
- **Care Inspectorate registration number** and **out-of-hours service details** are marked in the source document as still to be confirmed, search `contact.html` and `about.html` for these and add them once available.
- **Careers vacancies**, the "View current vacancies" button currently links to the Contact page; once you have a jobs board or listing, point it there instead.

---

## 8. Accessibility & compatibility notes

- All interactive elements (menu, accordion, buttons) are keyboard-reachable and show a visible focus outline.
- Motion (the hero door animation) is automatically disabled for visitors who have "reduced motion" turned on in their operating system.
- The site is responsive and has been designed to work down to small mobile screens (~360px wide) through to large desktop screens.
- Tested against modern evergreen browsers (Chrome, Safari, Edge, Firefox). No Internet Explorer support.

---

## 9. Hosting the site

Because this is a static site (no server-side code), it can be hosted almost anywhere, for example:
- **Netlify** or **Vercel**, drag-and-drop the whole `dochas-website` folder.
- **GitHub Pages**, push the folder to a repository and enable Pages.
- Any standard web hosting provider that serves plain HTML/CSS/JS files.

The only requirement is that the folder structure (`css/`, `js/`, `images/`, and the `.html` files) stays together and in the same relative positions, since the pages link to `css/styles.css` and `js/main.js` using relative paths.

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
