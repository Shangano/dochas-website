// ============================================================
// Dòchas Home Care - shared site behaviour
// Used on every page: mobile nav toggle, scroll-reveal animation,
// and (on faq.html) the FAQ accordion
// ============================================================

// ============================================================
// EmailJS configuration
// ------------------------------------------------------------
// Fill in the three values below after setting up a free account
// at https://www.emailjs.com — connect your inbox as an "Email
// Service", create an "Email Template", then copy these IDs from
// the EmailJS dashboard. Until they're filled in, the enquiry
// chatbot and contact form fall back to opening the visitor's own
// email app instead (the old mailto: behaviour), so nothing breaks
// in the meantime.
// ============================================================
const EMAILJS_PUBLIC_KEY = 'HhBi_m43Y5w-vp2zK';
const EMAILJS_SERVICE_ID = 'service_6a5ev4q';
const EMAILJS_TEMPLATE_ID = 'template_teuslei';

// Ready once the EmailJS library has loaded and none of the three values is still a "YOUR_..." placeholder.
// (Written this way so a find-and-replace on a placeholder can never switch the check off.)
const emailjsReady = typeof emailjs !== 'undefined'
  && ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some(v => /^YOUR_/.test(v));

if (emailjsReady) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// ============================================================
// Form validation helpers (used by the contact form AND the enquiry chat)
// ------------------------------------------------------------
// isValidEmail checks the FORMAT of an address: a name part, exactly one @,
// and a real-looking domain ending in a dot and 2+ letters. It rejects things
// like "hello", "a@b", "name@@x.com", "name@localhost" or anything with spaces.
// (Only a mail server can prove an inbox actually exists; no website can.)
// ============================================================
function isValidEmail(value) {
  const v = String(value).trim();
  if (v.length > 254 || /\s/.test(v)) return false;
  const parts = v.split('@');
  if (parts.length !== 2) return false;
  const local = parts[0], domain = parts[1];
  if (local.length < 1 || local.length > 64) return false;
  if (!/^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*$/.test(local)) return false;
  return /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(domain);
}

// Returns '' if the email is fine, otherwise a plain-English message saying what's wrong.
function emailProblem(value) {
  const v = String(value).trim();
  if (!v) return 'Please enter your email address.';
  if (v.indexOf('@') === -1) return "That doesn't look like an email address. It needs an @, like name@example.com.";
  if (!isValidEmail(v)) return "That email address doesn't look quite right. Please check it, it should look like name@example.com.";
  return '';
}

// A plausible phone number: only digits, spaces, + ( ) - . and 7 to 15 digits in total.
function looksLikePhone(value) {
  const v = String(value).trim();
  if (!/^[0-9+()\-.\s]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

// ============================================================
// Phone numbers with a country code (contact form + enquiry chat)
// ------------------------------------------------------------
// COUNTRY_CODES is the complete table of dialling codes (ISO region : code, 245 entries,
// about 1.6 KB). Country NAMES are not stored here: the visitor's own browser supplies
// them (Intl.DisplayNames), so nothing extra is downloaded.
// ============================================================
const COUNTRY_CODES = "AC:247,AD:376,AE:971,AF:93,AG:1,AI:1,AL:355,AM:374,AO:244,AR:54,AS:1,AT:43,AU:61,AW:297,AX:358,AZ:994,BA:387,BB:1,BD:880,BE:32,BF:226,BG:359,BH:973,BI:257,BJ:229,BL:590,BM:1,BN:673,BO:591,BQ:599,BR:55,BS:1,BT:975,BW:267,BY:375,BZ:501,CA:1,CC:61,CD:243,CF:236,CG:242,CH:41,CI:225,CK:682,CL:56,CM:237,CN:86,CO:57,CR:506,CU:53,CV:238,CW:599,CX:61,CY:357,CZ:420,DE:49,DJ:253,DK:45,DM:1,DO:1,DZ:213,EC:593,EE:372,EG:20,EH:212,ER:291,ES:34,ET:251,FI:358,FJ:679,FK:500,FM:691,FO:298,FR:33,GA:241,GB:44,GD:1,GE:995,GF:594,GG:44,GH:233,GI:350,GL:299,GM:220,GN:224,GP:590,GQ:240,GR:30,GT:502,GU:1,GW:245,GY:592,HK:852,HN:504,HR:385,HT:509,HU:36,ID:62,IE:353,IL:972,IM:44,IN:91,IO:246,IQ:964,IR:98,IS:354,IT:39,JE:44,JM:1,JO:962,JP:81,KE:254,KG:996,KH:855,KI:686,KM:269,KN:1,KP:850,KR:82,KW:965,KY:1,KZ:7,LA:856,LB:961,LC:1,LI:423,LK:94,LR:231,LS:266,LT:370,LU:352,LV:371,LY:218,MA:212,MC:377,MD:373,ME:382,MF:590,MG:261,MH:692,MK:389,ML:223,MM:95,MN:976,MO:853,MP:1,MQ:596,MR:222,MS:1,MT:356,MU:230,MV:960,MW:265,MX:52,MY:60,MZ:258,NA:264,NC:687,NE:227,NF:672,NG:234,NI:505,NL:31,NO:47,NP:977,NR:674,NU:683,NZ:64,OM:968,PA:507,PE:51,PF:689,PG:675,PH:63,PK:92,PL:48,PM:508,PR:1,PS:970,PT:351,PW:680,PY:595,QA:974,RE:262,RO:40,RS:381,RU:7,RW:250,SA:966,SB:677,SC:248,SD:249,SE:46,SG:65,SH:290,SI:386,SJ:47,SK:421,SL:232,SM:378,SN:221,SO:252,SR:597,SS:211,ST:239,SV:503,SX:1,SY:963,SZ:268,TA:290,TC:1,TD:235,TG:228,TH:66,TJ:992,TK:690,TL:670,TM:993,TN:216,TO:676,TR:90,TT:1,TV:688,TW:886,TZ:255,UA:380,UG:256,US:1,UY:598,UZ:998,VA:39,VC:1,VE:58,VG:1,VI:1,VN:84,VU:678,WF:681,WS:685,XK:383,YE:967,YT:262,ZA:27,ZM:260,ZW:263";

// Fills a <select> with every country, United Kingdom first and pre-selected.
function buildCountrySelect(select) {
  let names = null;
  try { names = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) { /* very old browser: fall back to the 2-letter code */ }
  const list = COUNTRY_CODES.split(',').map(pair => {
    const bits = pair.split(':');
    return { region: bits[0], code: bits[1], name: (names && names.of(bits[0])) || bits[0] };
  }).sort((a, b) => a.name.localeCompare(b.name, 'en'));
  const make = c => {
    const o = document.createElement('option');
    o.value = '+' + c.code;
    o.textContent = c.name + ' (+' + c.code + ')';
    return o;
  };
  select.textContent = '';
  const uk = list.filter(c => c.region === 'GB')[0];
  select.appendChild(make(uk));
  const rule = document.createElement('option');
  rule.disabled = true; rule.textContent = '──────────';
  select.appendChild(rule);
  list.filter(c => c.region !== 'GB').forEach(c => select.appendChild(make(c)));
  select.selectedIndex = 0;
}

const PHONE_PROBLEM = "That doesn't look like a valid phone number. Please check it, and choose the country code first if it isn't a UK number.";

// Turns what someone typed plus their chosen country code into one clear number.
// Returns { value, problem }. Handles all the ways people really write numbers:
//   07309 704101      with +44  ->  +44 (0)7309 704101   (the (0) is the usual way to show the dropped first 0)
//   71 234 567        with +267 ->  +267 71 234 567
//   +267 71 234 567   typed in full: used as typed, the drop-down is ignored
//   00267 71234567    "00" is read as "+"
function composePhone(code, raw) {
  let v = String(raw).replace(/\s+/g, ' ').trim();
  if (!/^\+?[0-9()\-. ]+$/.test(v)) return { value: '', problem: PHONE_PROBLEM };
  if (/^00[^0]/.test(v.replace(/[ ().-]/g, ''))) v = '+' + v.replace(/^0\s*0\s*/, '');
  const digits = v.replace(/\D/g, '');
  if (v.charAt(0) === '+') {                         // already international
    return (digits.length >= 7 && digits.length <= 15) ? { value: v, problem: '' } : { value: '', problem: PHONE_PROBLEM };
  }
  const trunk = digits.charAt(0) === '0';
  const national = trunk ? digits.slice(1) : digits;
  const total = String(code).replace(/\D/g, '').length + national.length;
  if (national.length < 4 || total < 7 || total > 15) return { value: '', problem: PHONE_PROBLEM };
  // UK numbers are often written with brackets, e.g. (01382) 123456: drop the brackets, then the leading 0
  const plain = v.replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
  const shown = trunk ? plain.replace(/^0\s*/, '') : plain;
  return { value: code + ' ' + (trunk ? '(0)' : '') + shown, problem: '' };
}

// ============================================================
// What gets sent to EmailJS: ONE named variable per field, so the email template can show
// each answer on its own line. A field that doesn't apply (for example "area" on a
// professional referral) is sent empty, and the template simply leaves that line out.
// The variable names below are the ones to use in the EmailJS template (see docs, Section 7b).
// ============================================================
function chatEmailParams(a) {
  const get = k => String(a[k] || '').trim();
  const professional = get('Enquiry is for') === 'Professional referral';
  const name = get('Name');
  const contact = get('Contact details');
  const notes = get('Additional notes');
  return {
    source: professional ? 'Enquiry chat (professional referral)' : 'Enquiry chat',
    subject: 'New enquiry from the Dòchas website' + (name ? ': ' + name : ''),
    from_name: name || 'Website enquiry',
    reply_to: get('Email') || (isValidEmail(contact) ? contact : ''),   // so "Reply" goes straight to them
    enquiry_for: get('Enquiry is for'),
    organisation: get('Organisation & role'),
    phone: get('Phone number'),
    contact_details: contact,
    area: get('Area / postcode'),
    support_type: get('Type of support'),
    timing: get('Timing'),
    referral_details: get('Referral details'),
    notes: /^(no|none|nope|nothing|n\/a)[.!\s]*$/i.test(notes) ? '' : notes,   // "no" isn't worth a line
  };
}

// Used by the enquiry chat. Returns '' if the answer is acceptable, otherwise a message.
function chatAnswerProblem(kind, value) {
  if (kind === 'email') {
    const p = emailProblem(value);
    return p ? p + " If you don't have an email address, please call us on 07309 704101." : '';
  }
  if (kind === 'emailOrPhone') {
    if (String(value).indexOf('@') !== -1) return emailProblem(value);
    return looksLikePhone(value) ? '' : 'Please give us a phone number or an email address (like name@example.com).';
  }
  return '';
}

// ---- Mobile nav toggle ----
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primaryNav');
if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
}

// ---- Text reveal animation ----
// Automatically fades/slides in headings, paragraphs and cards as they
// scroll into view. No manual "reveal" classes need adding to HTML -
// this selects the common content elements on every page.
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const selectors = [
    'h1', 'h2', 'h3',
    '.lead', '.eyebrow', '.quote',
    '.arch-card', '.route-card', '.way-card',
    '.step', '.founder',
    '.form-card', '.faq-group', '.logo-meaning-grid > div'
  ];
  const targets = document.querySelectorAll(selectors.join(','));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('reveal', 'in-view'));
    return;
  }

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i % 6, 5) * 70) + 'ms';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

// ---- Nav dropdown (About Us sections): staggered open, clean close ----
// Opening (hover, focus, or tap) is handled by CSS alone, each link has its
// own transition-delay (set in styles.css via :nth-child) so they reveal one
// after another. This script's only job is making sure that stagger never
// gets in the way of closing: every close path here zeroes each link's delay
// first, so the whole dropdown disappears together instantly rather than
// lingering item-by-item, then restores the staggered delays shortly after
// so the next time it opens, the reveal plays again from the start.
(function () {
  const navItems = document.querySelectorAll('.nav-item');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function dropdownLinks(item) {
    const dropdown = item.querySelector('.nav-dropdown');
    return dropdown ? dropdown.querySelectorAll('a') : [];
  }
  function zeroDelays(item) {
    if (reduceMotion) return; // nothing to zero, transitions are already near-instant
    dropdownLinks(item).forEach(a => { a.style.transitionDelay = '0ms'; });
  }
  function restoreDelays(item) {
    dropdownLinks(item).forEach(a => { a.style.transitionDelay = ''; });
  }
  function closeItem(item) {
    zeroDelays(item);
    item.classList.remove('dropdown-open');
    const toggle = item.querySelector('.nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    window.setTimeout(() => restoreDelays(item), 260);
  }

  navItems.forEach(item => {
    const toggle = item.querySelector('.nav-toggle');
    if (!toggle) return;

    // Tap/click toggle, used on touch devices and as a keyboard-free fallback
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('dropdown-open');
      if (isOpen) {
        closeItem(item);
      } else {
        restoreDelays(item);
        item.classList.add('dropdown-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Desktop hover: make sure a fresh stagger is ready to go each time the
    // pointer arrives, and clean up the moment it leaves.
    item.addEventListener('mouseenter', () => restoreDelays(item));
    item.addEventListener('mouseleave', () => {
      zeroDelays(item);
      window.setTimeout(() => restoreDelays(item), 260);
    });

    // Keyboard: focus entering the item (Tab) gets a fresh stagger too,
    // since :focus-within is what reveals the dropdown for keyboard users.
    item.addEventListener('focusin', () => restoreDelays(item));
  });

  // Close any open dropdown when clicking elsewhere on the page
  document.addEventListener('click', (e) => {
    navItems.forEach(item => {
      if (!item.contains(e.target) && item.classList.contains('dropdown-open')) {
        closeItem(item);
      }
    });
  });

  // Close dropdown after choosing a link inside it (mobile menu stays open otherwise)
  document.querySelectorAll('.nav-dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      const item = link.closest('.nav-item');
      if (item) closeItem(item);
    });
  });

  // Escape closes any open dropdown, and returns focus to that dropdown's toggle
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    navItems.forEach(item => {
      if (item.classList.contains('dropdown-open')) {
        closeItem(item);
        const toggle = item.querySelector('.nav-toggle');
        if (toggle) toggle.focus();
      }
    });
  });
})();

// ---- FAQ content & accordion ----
  const faqData = [
    {group:"About Dòchas", id:"about-dochas", items:[
      ["What is Dòchas Home Care?","Dòchas is a home care provider supporting people to live as safely and independently as possible in their own homes. Our approach is built around dignity, choice, compassion, independence, safety and professional care."],
      ["What does Dòchas mean?","Dòchas is associated with hope. Needing support shouldn't mean giving up independence, identity, or the things that make life meaningful, good care should help people continue living their lives."],
      ["Where does Dòchas provide care?","The service is provided by one staff team located in Dundee, covering Dundee City and East Angus areas. If you're unsure whether we cover yours, please contact us."]
    ]},
    {group:"Arranging care", id:"arranging-care", items:[
      ["How do I arrange care?","Start by contacting us, by phone, email, or the enquiry form on our website. We'll talk through the support you're looking for and explain what happens next."],
      ["Can I enquire on behalf of my parent or another family member?","Yes, families often make the first enquiry. As arrangements progress, we respect the rights, wishes, capacity, consent and confidentiality of the person who will actually receive the service."],
      ["Do I need a referral from a social worker?","Not necessarily, it depends on how care is arranged and funded. Contact us and we'll explain the right route for your circumstances."],
      ["What happens before care begins?","We need to understand the person's needs and confirm we can provide the required support safely. This may involve an assessment covering routines, preferences, mobility, medication, risks and desired outcomes, before a care plan is developed."],
      ["Can my care change if my needs change?","Yes. Care shouldn't remain frozen when circumstances change, speak to us and we'll review the arrangement."]
    ]},
    {group:"Your care", id:"your-care", items:[
      ["Will I be involved in decisions about my care?","Yes, it's your care. We want you to understand the support being provided and be involved in decisions that affect you."],
      ["Will you respect my normal routines?","Wherever reasonably possible, yes. We want to understand how you prefer things done, rather than unnecessarily changing your life to fit around us."],
      ["Will carers do everything for me?","Not necessarily, and that's intentional. Where you can safely continue doing something yourself, we want to encourage that independence."],
      ["What if I don't want a particular part of my care?","Tell us. Consent and choice matter. If refusing something creates a safety concern, we'll discuss the risk with you rather than simply ignoring it or overriding your decision."]
    ]},
    {group:"Our care staff", id:"our-care-staff", items:[
      ["How do you recruit carers?","Dòchas follows safer recruitment procedures appropriate to regulated care, including pre-employment checks, references, right-to-work and PVG requirements."],
      ["Are Dòchas carers trained?","Yes. Staff receive induction and training appropriate to their responsibilities, supported by ongoing supervision and competency assessment."],
      ["Are carers expected to register with the SSSC?","Where registration is required for the role, staff are expected to meet the relevant Scottish Social Services Council requirements."],
      ["Can I ask a carer to do something that isn't in my care plan?","Speak to your Care Manager first. Carers shouldn't agree to duties outside the agreed care arrangements where it could create safety, insurance or other concerns."]
    ]},
    {group:"Privacy & professional boundaries", id:"privacy-boundaries", items:[
      ["Will my information be kept confidential?","Yes, information is only accessed, used or shared for legitimate purposes and in line with applicable law and Dòchas policies, except where there's a serious safeguarding concern or another lawful reason."],
      ["Can my family receive information about my care?","Not automatically. Receiving care doesn't mean losing your right to privacy, information can be shared with relatives where there's appropriate consent or authority."],
      ["Can I become friends with my carer?","We want relationships to be warm, respectful and comfortable, but they must remain professional. Boundaries protect both the client and the care worker."]
    ]},
    {group:"Complaints & concerns", id:"complaints", items:[
      ["What if I'm unhappy with my care?","Please tell us, speak to a member of the management team or use our complaints process. We want concerns raised early."],
      ["Will complaining affect my care?","No, you should never be treated adversely for raising a genuine concern or complaint."],
      ["Can a family member complain for me?","Yes, where appropriate, we may need to confirm consent or authority to act on your behalf, particularly where confidential information is involved."],
      ["What if my concern is about abuse or neglect?","Please report it as a safeguarding concern. If someone is in immediate danger, contact emergency services straight away."]
    ]},
    {group:"Fees & funding", id:"fees-funding", items:[
      ["How much does Dòchas care cost?","Cost depends on the type and amount of support required, and how care is arranged. Please contact us so we can discuss your circumstances."],
      ["Can care be funded by the local authority?","Some people receive all or part of their care through public funding. Eligibility is decided by the relevant authority, we can discuss the care service itself and work with professionals where a referral is being considered."]
    ]},
    {group:"Careers", id:"careers-faqs", items:[
      ["How do I apply to work for Dòchas?","Current vacancies are advertised in our Careers section."],
      ["Do I need previous care experience?","Experience can be valuable, but requirements vary by role, check the specific vacancy for details."],
      ["Do I need a driving licence and a car?","Only where driving is genuinely essential to a particular role, this will be clearly stated in that job's advertisement, not assumed for every position."],
      ["What happens if I'm successful?","You'll complete the required recruitment checks before moving into our onboarding and induction process, covering your role, policies, training and The Dòchas Way."]
    ]}
  ];

  const faqRoot = document.getElementById('faqRoot');
  if (faqRoot) {
  faqData.forEach(group => {
    const gWrap = document.createElement('div');
    gWrap.className = 'faq-group';
    if (group.id) gWrap.id = group.id;
    const h = document.createElement('h3');
    h.textContent = group.group;
    h.style.marginBottom = '4px';
    gWrap.appendChild(h);
    group.items.forEach(([q,a]) => {
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = `<button class="faq-q"><span>${q}</span><span class="plus">+</span></button><div class="faq-a"><p>${a}</p></div>`;
      const btn = item.querySelector('.faq-q');
      const ans = item.querySelector('.faq-a');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        ans.style.maxHeight = isOpen ? null : ans.scrollHeight + 'px';
      });
      gWrap.appendChild(item);
    });
    faqRoot.appendChild(gWrap);
  });

  // If the page was opened with a #group-id hash (e.g. from a nav dropdown link),
  // scroll to that group once the content above has been built.
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
  }

// ============================================================
// Enquiry chatbot
// Floating button + panel, present on every page via shared markup
// (see the .enquire-fab / #chatOverlay / #chatPanel elements each
// page includes just before </body>).
// ============================================================
(function () {
  const fab = document.getElementById('enquireFab');
  const overlay = document.getElementById('chatOverlay');
  const panel = document.getElementById('chatPanel');
  const body = document.getElementById('chatBody');
  const closeBtn = document.getElementById('chatClose');

  if (!fab || !overlay || !panel || !body) return;

  // ---- Conversation script ----
  // Each step: bot text, an input type, and how to find the next step.
  const steps = {
    who: {
      bot: "Hi, I'm here to help start your enquiry with Dòchas. Who is this for?",
      type: 'options',
      key: 'Enquiry is for',
      options: [
        { label: 'Myself', value: 'Myself' },
        { label: 'A parent or relative', value: 'A parent or relative' },
        { label: 'Someone I care for', value: 'Someone I care for' },
        { label: "I'm a professional making a referral", value: 'Professional referral' }
      ],
      next: (val) => val === 'Professional referral' ? 'prof_org' : 'name'
    },

    // Professional referral branch
    prof_org: { bot: "Thanks for reaching out. What's your organisation and role?", type: 'text', key: 'Organisation & role', next: () => 'prof_name' },
    prof_name: { bot: "What's your name?", type: 'text', key: 'Name', next: () => 'prof_contact' },
    prof_contact: { bot: "Best phone number or email to reach you?", type: 'text', key: 'Contact details', validate: 'emailOrPhone', placeholder: 'Phone (with +country code) or email', next: () => 'prof_details' },
    prof_details: { bot: "Tell us a bit about the referral, who needs support, and anything relevant we should know.", type: 'text', key: 'Referral details', next: () => 'summary' },

    // Personal enquiry branch
    name: { bot: "What's your name?", type: 'text', key: 'Name', next: () => 'phone' },
    phone: { bot: "Best phone number to reach you on?", type: 'text', key: 'Phone number', phone: true, placeholder: 'Phone number', inputMode: 'tel', next: () => 'email' },
    email: { bot: "And an email address?", type: 'text', key: 'Email', validate: 'email', placeholder: 'name@example.com', inputMode: 'email', next: () => 'area' },
    area: { bot: "Which area or postcode is care needed in?", type: 'text', key: 'Area / postcode', next: () => 'support_type' },
    support_type: {
      bot: "What kind of support are you looking for? Choose all that apply.",
      type: 'multiselect',
      key: 'Type of support',
      options: [
        'Personal care', 'Support with daily living', 'Companionship and social time', 'Medication support',
        'Mobility support', 'Support after hospital discharge', 'Respite for family', "Not sure yet"
      ],
      next: () => 'timing'
    },
    timing: {
      bot: "When might care need to begin?",
      type: 'options',
      key: 'Timing',
      options: [
        { label: 'As soon as possible', value: 'As soon as possible' },
        { label: 'In the next few weeks', value: 'In the next few weeks' },
        { label: 'In the next few months', value: 'In the next few months' },
        { label: 'Just researching for now', value: 'Just researching for now' }
      ],
      next: () => 'notes'
    },
    notes: { bot: "Anything else you'd like us to know? You can also just say \"no\".", type: 'text', key: 'Additional notes', next: () => 'summary' },

    summary: { bot: "Here's what I've got, take a look, and send it through whenever you're ready.", type: 'summary' }
  };

  let currentStepId = 'who';
  const answers = {};
  let started = false;

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function addBubble(text, who) {
    const div = document.createElement('div');
    div.className = 'chat-bubble ' + who;
    div.textContent = text;
    body.appendChild(div);
    scrollToBottom();
  }

  function clearTransientInputs() {
    const existing = body.querySelectorAll('.chat-options, .chat-input-row-inline');
    existing.forEach(el => el.remove());
  }

  function renderStep(stepId) {
    currentStepId = stepId;
    const step = steps[stepId];
    if (!step) return;

    addBubble(step.bot, 'bot');

    if (step.type === 'options') {
      const wrap = document.createElement('div');
      wrap.className = 'chat-options';
      step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
          clearTransientInputs();
          addBubble(opt.label, 'user');
          answers[step.key] = opt.value;
          renderStep(step.next(opt.value));
        });
        wrap.appendChild(btn);
      });
      body.appendChild(wrap);
      scrollToBottom();

    } else if (step.type === 'multiselect') {
      const wrap = document.createElement('div');
      wrap.className = 'chat-options';
      const selected = new Set();
      step.options.forEach(label => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          if (selected.has(label)) {
            selected.delete(label);
            btn.classList.remove('selected');
          } else {
            selected.add(label);
            btn.classList.add('selected');
          }
        });
        wrap.appendChild(btn);
      });
      const cont = document.createElement('button');
      cont.type = 'button';
      cont.className = 'chat-continue';
      cont.textContent = 'Continue';
      cont.addEventListener('click', () => {
        if (selected.size === 0) return;
        clearTransientInputs();
        const chosen = Array.from(selected);
        addBubble(chosen.join(', '), 'user');
        answers[step.key] = chosen.join(', ');
        renderStep(step.next());
      });
      wrap.appendChild(cont);
      body.appendChild(wrap);
      scrollToBottom();

    } else if (step.type === 'text') {
      const row = document.createElement('div');
      row.className = 'chat-input-row-inline chat-options';
      row.style.width = '100%';
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = step.placeholder || 'Type your answer...';
      if (step.inputMode) input.inputMode = step.inputMode;
      if (step.validate === 'email') input.autocomplete = 'email';
      input.style.cssText = 'flex:1; border:1.5px solid var(--line); border-radius:100px; padding:9px 14px; font-family:inherit; font-size:.88rem; background:var(--paper);';
      let errEl = null;
      // Phone steps get a country-code list above the box (UK pre-selected)
      let countrySel = null, holder = row;
      if (step.phone) {
        holder = document.createElement('div');
        holder.className = 'chat-input-row-inline chat-options';
        holder.style.cssText = 'width:100%; flex-direction:column; align-items:stretch; gap:8px;';
        countrySel = document.createElement('select');
        countrySel.setAttribute('aria-label', 'Country code');
        countrySel.style.cssText = 'width:100%; border:1.5px solid var(--line); border-radius:100px; padding:9px 14px; font-family:inherit; font-size:.88rem; background:var(--paper); color:var(--ink);';
        buildCountrySelect(countrySel);
        countrySel.addEventListener('change', () => { if (errEl) { errEl.remove(); errEl = null; } input.removeAttribute('aria-invalid'); input.focus(); });
        holder.appendChild(countrySel);
        holder.appendChild(row);
      }
      const send = document.createElement('button');
      send.type = 'button';
      send.textContent = 'Send';
      send.style.cssText = 'background:var(--purple); color:#fff; border:none; border-radius:100px; padding:9px 16px; font-weight:700; font-size:.85rem; cursor:pointer;';

      // Shows (or updates) the "that doesn't look right" message under the box
      const showError = (msg) => {
        if (!errEl) {
          errEl = document.createElement('div');
          errEl.className = 'chat-input-row-inline chat-error';   // cleared with the row by clearTransientInputs()
          errEl.setAttribute('role', 'alert');
          body.appendChild(errEl);
        }
        errEl.textContent = msg;
        input.setAttribute('aria-invalid', 'true');
        scrollToBottom();
        input.focus();
      };
      input.addEventListener('input', () => {
        if (errEl) { errEl.remove(); errEl = null; }
        input.removeAttribute('aria-invalid');
      });

      const submit = () => {
        let val = input.value.trim();
        if (!val) return;
        if (step.phone) {
          const res = composePhone(countrySel.value, val);
          if (res.problem) { showError(res.problem); return; }
          val = res.value;                                // e.g. "+267 71 234 567", shown back to them below
        } else if (step.validate) {
          const problem = chatAnswerProblem(step.validate, val);
          if (problem) { showError(problem); return; }   // keep what they typed so they can fix it
        }
        clearTransientInputs();
        addBubble(val, 'user');
        answers[step.key] = val;
        renderStep(step.next());
      };
      send.addEventListener('click', submit);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

      row.appendChild(input);
      row.appendChild(send);
      body.appendChild(holder);
      scrollToBottom();
      input.focus();

    } else if (step.type === 'summary') {
      const card = document.createElement('div');
      card.className = 'chat-summary';
      Object.keys(answers).forEach(key => {
        const dt = document.createElement('dt');
        dt.textContent = key;
        const dd = document.createElement('dd');
        dd.textContent = answers[key];
        card.appendChild(dt);
        card.appendChild(dd);
      });
      body.appendChild(card);

      const wrap = document.createElement('div');
      wrap.className = 'chat-options';
      const sendBtn = document.createElement('button');
      sendBtn.type = 'button';
      sendBtn.className = 'chat-continue';
      sendBtn.textContent = 'Send enquiry';
      sendBtn.addEventListener('click', () => {
        const lines = Object.keys(answers).map(k => k + ': ' + answers[k]);
        const messageBody = lines.join('\n');

        if (emailjsReady) {
          sendBtn.disabled = true;
          sendBtn.textContent = 'Sending...';
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, chatEmailParams(answers)).then(() => {
            sendBtn.remove();
            addBubble("Thanks, your enquiry has been sent! We'll be in touch soon.", 'bot');
          }).catch((err) => {
            console.error('EmailJS could not send the message:', (err && err.text) ? err.status + ' ' + err.text : err);
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send enquiry';
            addBubble("Sorry, something went wrong sending that. Please try again, or call us on 07309 704101.", 'bot');
          });
        } else {
          // Fallback while EmailJS isn't configured yet: opens the visitor's own email app
          const subject = encodeURIComponent('New enquiry from the Dòchas website');
          const bodyText = encodeURIComponent(messageBody);
          window.location.href = `mailto:contact@dochashomecare.co.uk?subject=${subject}&body=${bodyText}`;
          addBubble("Thanks! Your email app should now open with everything filled in, just hit send there.", 'bot');
        }
      });
      const restartBtn = document.createElement('button');
      restartBtn.type = 'button';
      restartBtn.textContent = 'Start again';
      restartBtn.addEventListener('click', resetChat);

      wrap.appendChild(sendBtn);
      wrap.appendChild(restartBtn);
      body.appendChild(wrap);
      scrollToBottom();
    }
  }

  function resetChat() {
    body.innerHTML = '';
    Object.keys(answers).forEach(k => delete answers[k]);
    started = false;
    openChat();
  }

  function openChat() {
    overlay.classList.add('open');
    panel.classList.add('open');
    fab.classList.add('hide');
    if (!started) {
      started = true;
      renderStep('who');
    }
  }

  function closeChat() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    fab.classList.remove('hide');
  }

  fab.addEventListener('click', openChat);
  overlay.addEventListener('click', closeChat);
  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  // Any element with data-open-chat (e.g. the Enquire page launch card, header CTA) opens the same panel
  document.querySelectorAll('[data-open-chat]').forEach(el => {
    el.addEventListener('click', openChat);
  });

  // Escape closes the chat panel too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeChat();
  });
})();

// ============================================================
// Cookie consent banner
// Present on every page. Currently the site sets no analytics or
// advertising cookies, so this mainly records a visitor's choice
// for when that changes, but "Reject All" is fully honoured now
// and going forward: nothing non-essential loads unless accepted.
// ============================================================
(function () {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');
  const prefsLink = document.getElementById('cookiePrefsLink');
  if (!banner) return;

  const STORAGE_KEY = 'dochas_cookie_consent';

  function openBanner() {
    banner.classList.add('open');
  }
  function closeBanner() {
    banner.classList.remove('open');
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* storage unavailable, ignore */ }
    closeBanner();
    // When analytics is added later, check localStorage.getItem('dochas_cookie_consent')
    // and only load the analytics script if it equals 'accepted'.
  }

  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  if (!stored) openBanner();

  if (acceptBtn) acceptBtn.addEventListener('click', () => setConsent('accepted'));
  if (rejectBtn) rejectBtn.addEventListener('click', () => setConsent('rejected'));
  if (prefsLink) prefsLink.addEventListener('click', openBanner);
})();

// ============================================================
// Contact form (contact.html only)
// Sends via EmailJS once configured at the top of this file;
// falls back to opening the visitor's own email app until then.
// ============================================================
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  const nameEl = form.elements['name'];
  const phoneEl = form.elements['phone'];
  const codeEl = form.elements['phonecode'];
  buildCountrySelect(codeEl);   // fills the country list (UK first); the page ships with just the UK so it still works without script
  const emailEl = form.elements['email'];
  const reasonEl = form.elements['reason'];
  const messageEl = form.elements['message'];

  // Show (or clear) the message under a field, and flag the field for screen readers
  function setFieldError(input, text) {
    const errEl = document.getElementById('cf-' + input.name + '-error');
    errEl.textContent = text || '';
    if (text) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errEl.id);
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }
  // clear a field's message as soon as the person starts correcting it
  [nameEl, emailEl, phoneEl, messageEl].forEach(el => el.addEventListener('input', () => setFieldError(el, '')));
  codeEl.addEventListener('change', () => setFieldError(phoneEl, ''));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const email = emailEl.value.trim();
    const reason = reasonEl.value;
    const message = messageEl.value.trim();

    // Check every field, show every problem at once, then jump to the first one
    // The telephone is optional, but if one is given it must be a real-looking number
    const phoneResult = phone ? composePhone(codeEl.value, phone) : { value: '', problem: '' };
    const checks = [
      [nameEl, name ? '' : 'Please tell us your name.'],
      [emailEl, emailProblem(email)],
      [phoneEl, phoneResult.problem],
      [messageEl, message ? '' : 'Please write a short message.'],
    ];
    let firstBad = null;
    checks.forEach(([el, problem]) => {
      setFieldError(el, problem);
      if (problem && !firstBad) firstBad = el;
    });
    if (firstBad) {
      statusEl.textContent = '';
      firstBad.focus();
      return;                      // nothing is sent until every field is right
    }

    const fullMessage = `Reason: ${reason}\nPhone: ${phoneResult.value || 'Not given'}\n\n${message}`;

    if (emailjsReady) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusEl.textContent = '';
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        source: 'Contact form',
        subject: 'New contact form message from ' + name,
        from_name: name,
        reply_to: email,
        reason: reason,
        phone: phoneResult.value,
        message: message,
      }).then(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        statusEl.textContent = "Thanks, your message has been sent! We'll be in touch soon.";
        statusEl.style.color = 'var(--green-deep)';
      }).catch((err) => {
            console.error('EmailJS could not send the message:', (err && err.text) ? err.status + ' ' + err.text : err);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        statusEl.textContent = 'Sorry, something went wrong. Please try again, or call us on 07309 704101.';
        statusEl.style.color = '#8C3A2F';
      });
    } else {
      // Fallback while EmailJS isn't configured yet: opens the visitor's own email app
      const subject = encodeURIComponent('New message from the Dòchas contact form');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n${fullMessage}`);
      window.location.href = `mailto:contact@dochashomecare.co.uk?subject=${subject}&body=${body}`;
      statusEl.textContent = 'Your email app should now open with everything filled in, just hit send there.';
      statusEl.style.color = 'var(--ink-soft)';
    }
  });
})();

// ============================================================
// Carousel: one item at a time, arrows + dots + swipe + keyboard.
// Used on services.html and speak-up.html. Fully independent per
// instance (a page can have more than one), guarded so it's a
// no-op on pages with no .carousel element.
// ============================================================
(function () {
  const carousels = document.querySelectorAll('.carousel');
  if (!carousels.length) return;

  carousels.forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dotsWrap = carousel.parentElement.querySelector('.carousel-dots');
    const metaEl = carousel.parentElement.querySelector('.carousel-meta');
    const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
    const nextBtn = carousel.parentElement.querySelector('.carousel-next');
    if (!slides.length) return;

    let current = 0;
    let dots = [];

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Go to item ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function render() {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'leaving');
        if (i === current) slide.classList.add('active');
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      if (metaEl) metaEl.textContent = (current + 1) + ' / ' + slides.length;
    }

    function goTo(index) {
      if (index === current) return;
      slides[current].classList.add('leaving');
      current = (index + slides.length) % slides.length;
      render();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Keyboard arrows when the carousel area has focus
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(current - 1); }
    });

    // Swipe support (touch)
    let touchStartX = 0, touchStartY = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        goTo(current + (dx < 0 ? 1 : -1));
      } else if (Math.abs(dy) > 40 && carousel.classList.contains('vertical')) {
        goTo(current + (dy < 0 ? 1 : -1));
      }
    }, { passive: true });

    render();
  });
})();
