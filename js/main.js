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
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

const emailjsReady = typeof emailjs !== 'undefined'
  && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

if (emailjsReady) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
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
      key: 'who',
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
    prof_contact: { bot: "Best phone number or email to reach you?", type: 'text', key: 'Contact details', next: () => 'prof_details' },
    prof_details: { bot: "Tell us a bit about the referral, who needs support, and anything relevant we should know.", type: 'text', key: 'Referral details', next: () => 'summary' },

    // Personal enquiry branch
    name: { bot: "What's your name?", type: 'text', key: 'Name', next: () => 'phone' },
    phone: { bot: "Best phone number to reach you on?", type: 'text', key: 'Phone number', next: () => 'email' },
    email: { bot: "And an email address?", type: 'text', key: 'Email', next: () => 'area' },
    area: { bot: "Which area or postcode is care needed in?", type: 'text', key: 'Area / postcode', next: () => 'support_type' },
    support_type: {
      bot: "What kind of support are you looking for? Choose all that apply.",
      type: 'multiselect',
      key: 'Type of support',
      options: [
        'Personal care', 'Support with daily living', 'Companionship', 'Medication support',
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
      input.placeholder = 'Type your answer...';
      input.style.cssText = 'flex:1; border:1.5px solid var(--line); border-radius:100px; padding:9px 14px; font-family:inherit; font-size:.88rem; background:var(--paper);';
      const send = document.createElement('button');
      send.type = 'button';
      send.textContent = 'Send';
      send.style.cssText = 'background:var(--purple); color:#fff; border:none; border-radius:100px; padding:9px 16px; font-weight:700; font-size:.85rem; cursor:pointer;';

      const submit = () => {
        const val = input.value.trim();
        if (!val) return;
        clearTransientInputs();
        addBubble(val, 'user');
        answers[step.key] = val;
        renderStep(step.next());
      };
      send.addEventListener('click', submit);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

      row.appendChild(input);
      row.appendChild(send);
      body.appendChild(row);
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
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: answers['Name'] || 'Website enquiry',
            reply_to: answers['Email'] || '',
            subject: 'New enquiry from the Dòchas website',
            message: messageBody,
          }).then(() => {
            sendBtn.remove();
            addBubble("Thanks, your enquiry has been sent! We'll be in touch soon.", 'bot');
          }).catch(() => {
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const reason = form.reason.value;
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = 'Please fill in your name, email and message.';
      statusEl.style.color = '#8C3A2F';
      return;
    }

    const fullMessage = `Reason: ${reason}\nPhone: ${phone}\n\n${message}`;

    if (emailjsReady) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusEl.textContent = '';
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        reply_to: email,
        subject: 'New message from the Dòchas contact form',
        message: fullMessage,
      }).then(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        statusEl.textContent = "Thanks, your message has been sent! We'll be in touch soon.";
        statusEl.style.color = 'var(--green-deep)';
      }).catch(() => {
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
