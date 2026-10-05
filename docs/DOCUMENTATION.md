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

- **Enquiry chatbot and contact form** send through EmailJS. The three EmailJS values are already filled in at the top of `js/main.js` (see Section 7b), so both send straight to the inbox set in the EmailJS template. If the EmailJS library can't load (for example an ad-blocker), they fall back to opening the visitor's own email app.

### Details to add once Dòchas has confirmed them (none of this shows on the public site)

The live pages contain **no placeholder text**: everything that was waiting on confirmation has been worded so each page reads as finished. When the details below are confirmed, add them to the page named. Nothing is broken or missing in the meantime.

**Privacy Policy** (`privacy-policy.html`), to do once reviewed by a solicitor / data protection adviser:
- The policy is a general-purpose draft and **has not been legally reviewed**. Please have it reviewed before relying on it; in particular check the statements about practice, such as enquiries being deleted once dealt with, that no information is shared for marketing, and how long client and employment records are kept.
- Optionally add a "Last updated" line under the page title, and the **ICO registration number** (Section 1) if applicable.
- Section 6 (How long we keep it) can be given specific retention periods; for now it describes the approach in general terms.

**Other pages**
- **Care Inspectorate registration**: the registration number (CS2026000204), "Registered with the Care Inspectorate" and the service area now appear in the footer of every page (edit the `footer-reg` block in the footer of each page). The Quality and Regulation page (`quality-and-regulation.html`) doesn't repeat the number; add it there if wanted.
- **Terms of Use and Trading Terms**: the client's footer reference includes links to these, but the site has no such pages. They need real text (from the client or their solicitor) before they can be added; the footer currently links to the Privacy Policy and Cookie Preferences.
- **Out-of-hours contact arrangements** (`contact.html`, under the office hours).
- **Vacancies** (`current-vacancies.html`): the page currently says no roles are listed. When roles exist, list them there, including experience, driving licence and vehicle requirements for each role.
- **How anonymous reports are actually received.** The wording on `report-anonymously.html` tells people they can submit a concern or feedback anonymously, but the site has no way to do that yet: the contact form and the enquiry chat both ask for a name and an email. Decide on a route (for example a phone line, a postal address or a dedicated form) and add it to that page.
- **Service area wording**: currently one staff team based in Dundee, covering Dundee City and East Angus.
- Confirm every listed service is within Dòchas's registration, staffing and current delivery capability.
- **Reply time in the chat**: the chat header says "Here to help you take the first step". If Dòchas is happy to promise a reply time (for example "Usually replies within one working day"), it can be put back in the header of the chat widget, which is repeated in the HTML of each page.
- **"View current vacancies"** on the Careers page links to the vacancies page; point it at a jobs board if you use one.

**Before going live** (see also Section 9): the domain in `sitemap.xml` and `robots.txt` (`www.dochashomecare.co.uk`) must match the real address of the site, and (Section 7b, step 6) the website's address should be added to the EmailJS domain allowlist.

---

## 7a. How the enquiry chatbot works (for future edits)

The floating button, overlay, and chat panel markup is duplicated near the bottom of every page (just before the `<script src="js/main.js">` line), the same pattern used for the header and footer. The actual conversation script (questions, options, and branching logic) lives in one place: the bottom of `js/main.js`, in an object called `steps`.

To change a question, add a new one, or adjust the options:
1. Open `js/main.js` and find the `const steps = {` block near the end of the file.
2. Each step has a `bot` message, a `type` (`options`, `multiselect`, `text`, or `summary`), and a `next` function that decides which step comes after it.
3. Editing the text or options here updates the chatbot on every page at once, no need to touch individual HTML files.

The professional referral path branches automatically based on the answer to the very first question, so it asks different follow-up questions for a personal enquiry vs. a professional making a referral.


**Email checking.** Both forms refuse anything that doesn't look like a genuine email address (it must have a name part, one `@`, and a real-looking domain such as `example.com`). The rules live in one place, at the top of `js/main.js` (`isValidEmail`, `emailProblem`, `looksLikePhone`, `chatAnswerProblem`), so the contact form and the chatbot always agree. In the chatbot, add `validate: 'email'` to any text step that asks for an email, or `validate: 'emailOrPhone'` for a "phone or email" question; the step then won't move on until the answer is acceptable. The check is about *format* only: no website can prove an inbox really exists, so a made-up but well-formed address (such as `nobody@example.com`) will still be accepted. Phone numbers in the chat are not checked (only the professional-referral "phone or email" step looks for something number-like).

**Phone numbers and country codes.** The contact form's Telephone field and the chat's "Best phone number" question both have a country-code list (United Kingdom pre-selected, then every country alphabetically). The table of dialling codes (`COUNTRY_CODES`, about 1.6 KB) sits at the top of `js/main.js`; country *names* are supplied by the visitor's browser, so nothing extra is downloaded. Whatever is typed is combined with the chosen code into one clear number: `07309 704101` with +44 becomes `+44 (0)7309 704101` (the "(0)" is the usual way of showing the first 0 is dropped when dialling from abroad), and a number typed in full, such as `+267 71 234 567`, is used as typed. The check is deliberately light: a number must have 7 to 15 digits and only digits, spaces, `+`, brackets, dashes and dots; it can't prove a number is reachable. To add the list to another chat question, set `phone: true` on its step. In the contact form the Telephone field is optional.
---

## 7b. Connecting the enquiry chatbot and contact form to a real inbox (EmailJS)

By default, both the chatbot and the contact form (`contact.html`) fall back to opening the visitor's own email app with everything pre-filled. Submissions land directly in a real inbox, without any backend server, using **EmailJS**. The site is wired up and the values are filled in; this section records how it was set up and how to change it.

### The variables the site sends

Each answer is sent as its own named variable, so the email can show one per line. A variable that doesn't apply to a particular enquiry is sent empty, and the template simply leaves that line out.

| Variable | What it holds | Sent by |
|---|---|---|
| `source` | "Enquiry chat", "Enquiry chat (professional referral)" or "Contact form" | both |
| `subject` | e.g. "New enquiry from the Dòchas website: Tendai Moyo" | both |
| `from_name` | the person's name | both |
| `reply_to` | their email address (for a professional referral, the contact detail if it is an email) | both |
| `phone` | phone number including country code, e.g. `+267 71 234 567` | both |
| `enquiry_for` | Myself / A parent or relative / Someone I care for / Professional referral | chat |
| `organisation` | organisation and role | chat (referral) |
| `contact_details` | phone number or email given by a referrer | chat (referral) |
| `area` | area / postcode where care is needed | chat |
| `support_type` | types of support chosen | chat |
| `timing` | when care might begin | chat |
| `referral_details` | details of the referral | chat (referral) |
| `notes` | "anything else" (left out if they just answered "no") | chat |
| `reason` | reason for contacting us | contact form |
| `message` | the message they typed | contact form |

### Setting it up

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Under **Email Services**, connect the inbox the emails should be sent through (Gmail, Outlook, etc.) and copy its **Service ID**.
3. Under **Email Templates**, create a template and fill in its fields:
   - **Subject:** `{{subject}}`
   - **To Email:** the address your team checks for enquiries
   - **From Name:** `Dòchas website`
   - **From Email:** tick "Use Default Email Address"
   - **Reply To:** `{{reply_to}}` (so pressing Reply writes back to the person who got in touch)
   - **Content** (type each line as its own paragraph, pressing Enter, not Shift+Enter):
     ```
     New enquiry from the Dòchas website

     Received via: {{source}}

     Name: {{from_name}}
     {{#reply_to}}Email: {{reply_to}}{{/reply_to}}
     {{#phone}}Phone: {{phone}}{{/phone}}
     {{#contact_details}}Contact details: {{contact_details}}{{/contact_details}}
     {{#enquiry_for}}This enquiry is for: {{enquiry_for}}{{/enquiry_for}}
     {{#organisation}}Organisation and role: {{organisation}}{{/organisation}}
     {{#area}}Area / postcode: {{area}}{{/area}}
     {{#support_type}}Type of support: {{support_type}}{{/support_type}}
     {{#timing}}When care might begin: {{timing}}{{/timing}}
     {{#reason}}Reason for contacting us: {{reason}}{{/reason}}
     {{#referral_details}}Referral details: {{referral_details}}{{/referral_details}}
     {{#notes}}Additional notes: {{notes}}{{/notes}}
     {{#message}}Message: {{message}}{{/message}}
     ```
     The `{{#name}} ... {{/name}}` wrapper is EmailJS's "conditional section": the line appears only if that answer exists.
   - Save, then copy the template's **Template ID**.
4. Under **Account → General**, copy your **Public Key**.
5. Open `js/main.js` and find these three lines near the very top of the file:
   ```js
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
   These currently hold the live values (public key `HhBi_m43Y5w-vp2zK`, service `service_6a5ev4q`, template `template_teuslei`). To change them, replace the text between the quotes with the new values from steps 2–4, then re-upload `js/main.js`. Don't use find-and-replace across the whole file: only edit those three lines. Both the chatbot and the contact form will now send directly to your inbox, on every page, since they all share this one file.
6. **Restrict the key to your website.** The Public Key is visible to anyone who views the site's code (this is normal and expected for EmailJS). To stop other websites using it, go to **Account → Security → Domains** and add your site's address in the form `https://your-site-address` (no page path), e.g. `https://username.github.io`.
7. Test on the live site: send an enquiry through the chat and a message through the contact form, and check both arrive and that **Reply** goes to the sender.

Until the three values are filled in, the site automatically keeps using the mailto: fallback, so nothing is broken in the meantime. EmailJS's free tier covers 200 emails per month at the time of writing, so check their current pricing if the site gets busier. Note that variables in double braces are safely escaped by EmailJS, so text typed by visitors can't inject formatting or links into your emails; don't switch them to triple braces.

**Data protection:** EmailJS handles enquiry details on their way to your inbox, so it acts as a service provider for Dòchas. They publish a data protection agreement on their website; worth mentioning to the solicitor reviewing the Privacy Policy.

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

The page no longer contains any placeholder text. **It is a general-purpose draft, not legal advice, and has not been reviewed by a solicitor.** Please have a solicitor or data protection adviser familiar with the care sector review it before relying on it. The specific things to check, and the optional details to add afterwards (a "Last updated" line, the ICO registration number, specific retention periods), are listed under "Details to add once Dòchas has confirmed them" in Section 7.

**`sitemap.xml`** and **`robots.txt`** sit at the top level of the `dochas-website` folder (next to `index.html`). They tell search engines which pages exist and give permission to crawl them:
- Both files currently use a placeholder domain (`https://www.dochashomecare.co.uk/`). **Before publishing, open both files and replace every instance of that placeholder with the real, live domain.**
- Once the site is live, submit the sitemap's full URL (e.g. `https://yourdomain.co.uk/sitemap.xml`) in Google Search Console, under Sitemaps.
- If a new page is ever added to the site, add a matching `<url>` entry to `sitemap.xml` so search engines find it too.

---

*Last updated as part of this build. For questions about the content itself (services, policies, contact details), refer back to the original Dòchas Home Care source document.*
