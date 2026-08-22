// ============================================================
// Dòchas Home Care - shared site behaviour
// Used on every page: mobile nav toggle + (on faq.html) accordion
// ============================================================

// ---- Mobile nav toggle ----
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primaryNav');
if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
}

// ---- FAQ content & accordion ----
  const faqData = [
    {group:"About Dòchas", items:[
      ["What is Dòchas Home Care?","Dòchas is a home care provider supporting people to live as safely and independently as possible in their own homes. Our approach is built around dignity, choice, compassion, independence, safety and professional care."],
      ["What does Dòchas mean?","Dòchas is associated with hope. Needing support shouldn't mean giving up independence, identity, or the things that make life meaningful, good care should help people continue living their lives."],
      ["Where does Dòchas provide care?","We currently provide care across Dundee and the surrounding area. If you're unsure whether we cover yours, please contact us."]
    ]},
    {group:"Arranging care", items:[
      ["How do I arrange care?","Start by contacting us, by phone, email, or the enquiry form on our website. We'll talk through the support you're looking for and explain what happens next."],
      ["Can I enquire on behalf of my parent or another family member?","Yes, families often make the first enquiry. As arrangements progress, we respect the rights, wishes, capacity, consent and confidentiality of the person who will actually receive the service."],
      ["Do I need a referral from a social worker?","Not necessarily, it depends on how care is arranged and funded. Contact us and we'll explain the right route for your circumstances."],
      ["What happens before care begins?","We need to understand the person's needs and confirm we can provide the required support safely. This may involve an assessment covering routines, preferences, mobility, medication, risks and desired outcomes, before a care plan is developed."],
      ["Can my care change if my needs change?","Yes. Care shouldn't remain frozen when circumstances change, speak to us and we'll review the arrangement."]
    ]},
    {group:"Your care", items:[
      ["Will I be involved in decisions about my care?","Yes, it's your care. We want you to understand the support being provided and be involved in decisions that affect you."],
      ["Will you respect my normal routines?","Wherever reasonably possible, yes. We want to understand how you prefer things done, rather than unnecessarily changing your life to fit around us."],
      ["Will carers do everything for me?","Not necessarily, and that's intentional. Where you can safely continue doing something yourself, we want to encourage that independence."],
      ["What if I don't want a particular part of my care?","Tell us. Consent and choice matter. If refusing something creates a safety concern, we'll discuss the risk with you rather than simply ignoring it or overriding your decision."]
    ]},
    {group:"Our care staff", items:[
      ["How do you recruit carers?","Dòchas follows safer recruitment procedures appropriate to regulated care, including pre-employment checks, references, right-to-work and PVG requirements."],
      ["Are Dòchas carers trained?","Yes. Staff receive induction and training appropriate to their responsibilities, supported by ongoing supervision and competency assessment."],
      ["Are carers expected to register with the SSSC?","Where registration is required for the role, staff are expected to meet the relevant Scottish Social Services Council requirements."],
      ["Can I ask a carer to do something that isn't in my care plan?","Speak to your Care Manager first. Carers shouldn't agree to duties outside the agreed care arrangements where it could create safety, insurance or other concerns."]
    ]},
    {group:"Privacy & professional boundaries", items:[
      ["Will my information be kept confidential?","Yes, information is only accessed, used or shared for legitimate purposes and in line with applicable law and Dòchas policies, except where there's a serious safeguarding concern or another lawful reason."],
      ["Can my family receive information about my care?","Not automatically. Receiving care doesn't mean losing your right to privacy, information can be shared with relatives where there's appropriate consent or authority."],
      ["Can I become friends with my carer?","We want relationships to be warm, respectful and comfortable, but they must remain professional. Boundaries protect both the client and the care worker."]
    ]},
    {group:"Complaints & concerns", items:[
      ["What if I'm unhappy with my care?","Please tell us, speak to a member of the management team or use our complaints process. We want concerns raised early."],
      ["Will complaining affect my care?","No, you should never be treated adversely for raising a genuine concern or complaint."],
      ["Can a family member complain for me?","Yes, where appropriate, we may need to confirm consent or authority to act on your behalf, particularly where confidential information is involved."],
      ["What if my concern is about abuse or neglect?","Please report it as a safeguarding concern. If someone is in immediate danger, contact emergency services straight away."]
    ]},
    {group:"Fees & funding", items:[
      ["How much does Dòchas care cost?","Cost depends on the type and amount of support required, and how care is arranged. Please contact us so we can discuss your circumstances."],
      ["Can care be funded by the local authority?","Some people receive all or part of their care through public funding. Eligibility is decided by the relevant authority, we can discuss the care service itself and work with professionals where a referral is being considered."]
    ]},
    {group:"Careers", items:[
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
  }
