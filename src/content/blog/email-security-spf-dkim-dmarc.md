---
title: 'Email Security That Actually Stops Spoofing: SPF, DKIM, and DMARC'
description: 'Why “we have Microsoft 365” is not email authentication. A practical mid-market guide to SPF, DKIM, and DMARC — alignment, enforcement, and a rollout that stops domain spoofing.'
pubDate: 2026-08-10
banner: cybersecurity-lock
bannerAlt:
  en: 'Digital padlock and circuit-style security imagery representing layered cybersecurity controls'
  es: 'Candado digital e imágenes de circuitos que representan controles de ciberseguridad en capas'
---

Finance gets an email that looks like it came from the CEO. The domain is yours. The signature is right. The urgency is familiar — a closing that cannot wait, a vendor that needs a wire today, a board packet that somehow turned into a payment instruction. Someone on the team replies. Money moves. An hour later, the real CEO asks what payment they are talking about.

That is not a story about weak passwords. It is not a story about antivirus. It is a story about **email spoofing**: an attacker using your domain name in the From field without ever logging into your Microsoft 365 or Google Workspace tenant. The message never came from your mailboxes. It only claimed to.

Most mid-market organizations still treat this as a niche technical issue. It is not. Domain spoofing is how invoice fraud, vendor impersonation, and “CEO fraud” still land in inboxes that otherwise look well protected. MFA does not stop it. Endpoint detection does not stop it. A glossy spam filter alone does not stop it. What stops it — or at least makes it dramatically harder for outsiders to abuse your brand in email — is a trio of DNS records most leadership teams have heard of once and never verified: **SPF, DKIM, and DMARC**.

This guide is the practical version. Not a standards reading group. Not an enterprise program with a twelve-person email security team. A clear picture of what each control does, why “we turned something on in Microsoft” is not the same as enforcement, how organizations break their own mail while trying to fix this, and a sequence Cybercon uses with South Florida and mid-market teams that need spoofing resistance without breaking legitimate senders.

If you already ran our free [domain security snapshot](/services/web-design-development/#site-check) and saw red or yellow on SPF, DKIM, or DMARC, this is the article that explains what those scores are trying to tell you — and what to do next.

## The uncomfortable truth: your domain can be worn like a costume

Email was designed in an era when the internet was smaller and trust was cheaper. The core protocol that moves mail between servers (SMTP) does not, by itself, prove that the person claiming to be `ceo@yourcompany.com` controls that address. Without extra authentication layers, any server on the internet can put your domain in the visible From line. Receiving mail systems may or may not notice. Many still deliver the message if other signals look “good enough.”

That is why spoofing feels so unfair to business owners. You paid for the domain. You pay for Microsoft 365. You trained people not to click suspicious links. And somehow a stranger still used your logo and your domain to ask for money.

There are two different problems people mix up, and you need both named clearly:

1. **Outsider spoofing your domain.** Someone sends mail that *looks like* it came from you, but it never touched your tenant. SPF, DKIM, and DMARC are the primary defense here.
2. **Insider account compromise.** Someone phishes a real employee, logs into a real mailbox, and sends mail that *actually* came from you. Authentication records will often pass, because the mail is “legitimate” from a protocol point of view. That problem needs identity hardening, MFA, mailbox monitoring, and the kind of [endpoint-and-identity program](/blog/endpoint-security-beyond-the-endpoint/) we have written about elsewhere.

This article focuses on problem one. If you skip it, attackers do not even need to steal a password to borrow your brand. If you only fix problem one and ignore problem two, you still get burned — just differently. Serious email security covers both. Start with spoofing controls because they are DNS work with outsized payoff, then keep going.

## What “email authentication” actually means

Think of SPF, DKIM, and DMARC as three answers a receiving mail system can ask about a message that claims to be from your domain:

- **SPF asks:** “Did this message come from a server you said was allowed to send for this domain?”
- **DKIM asks:** “Is this message cryptographically signed in a way that proves it was authorized by the domain’s signing key, and that key parts were not altered in transit?”
- **DMARC asks:** “Given SPF and DKIM results — and whether those results align with the domain the user sees — what should I do: deliver, quarantine, or reject? And where should I send the report?”

Notice the last one is the policy layer. SPF and DKIM are evidence. DMARC is the decision. That is why organizations with “SPF set up” and “DKIM enabled” still get spoofed: without DMARC enforcement, many receivers treat failures as advisory. The costume still works.

Also notice the word **align**. This trips up more IT teams than any other detail. A message can pass SPF for a mail-flow domain that is not the domain shown to the human reader. A message can pass DKIM for a signing domain that is not your visible From domain. DMARC cares whether the authenticated identity matches the brand the recipient thinks they are reading. Without alignment, a pass is a technicality, not protection.

## SPF: the guest list for servers that may send as you

**SPF (Sender Policy Framework)** is a DNS TXT record that lists which mail servers are allowed to send mail for your domain. When a receiving server gets a message, it checks the sending IP against your published list.

In plain English: SPF is a guest list. If the server is not on the list, SPF fails.

### What a healthy SPF record looks like in practice

A typical mid-market company on Microsoft 365 might publish something conceptually like: “Microsoft’s sending infrastructure is allowed; everyone else is not.” Marketing platforms, billing systems, CRMs, and helpdesk tools that send as `@yourcompany.com` must also be represented — either directly or through includes those vendors document.

The hard part is not syntax. The hard part is **inventory**. Most organizations have more senders than they think:

- Microsoft 365 / Google Workspace (primary mail)
- Marketing tools (newsletters, drip campaigns)
- Billing and invoicing platforms
- CRM and fundraising systems
- HR / payroll notifications
- Ticketing and monitoring alerts
- “Temporary” tools someone connected two years ago and forgot

If you publish a strict SPF record before you finish that inventory, legitimate mail starts failing. If you leave SPF wide open forever, spoofers keep using the gaps. The work is finding every system that puts your domain in outbound mail, then encoding that reality into DNS.

### SPF limits you should respect

SPF has well-known ceilings. The big one: DNS lookups. An SPF record can trigger a chain of `include:` mechanisms, and receivers stop evaluating after too many lookups. Bloated SPF records break mysteriously. The fix is not “add one more include and hope.” The fix is consolidation, vendor-recommended records, and sometimes redesigning which domains send which mail.

SPF also authenticates a return-path / envelope identity that is not always identical to the From address humans see. That is one reason SPF alone never finished the spoofing problem — and why DKIM and DMARC had to arrive.

Practical rule: **treat SPF as necessary, never sufficient.** Publish it carefully. Keep it short. Revisit it whenever you add a SaaS that sends as your domain.

## DKIM: the tamper-evident seal on the message

**DKIM (DomainKeys Identified Mail)** attaches a cryptographic signature to outbound messages. Your sending platform signs with a private key. You publish the matching public key in DNS. Receiving systems verify the signature. If the important headers and body match what was signed, DKIM passes.

In plain English: DKIM is a tamper-evident seal. It does not merely ask “which server sent this?” It asks “did an authorized signer produce this exact message?”

### Why DKIM matters when SPF already exists

Mail forwarding breaks SPF often. A message goes from your server to a mailing list or a forwarding rule; the next hop has a different IP; SPF fails even though the content is still yours. DKIM can survive that path if the signed content was not altered. That resilience is one reason modern DMARC strategies lean heavily on DKIM alignment for real-world mail flows.

DKIM also helps with brand integrity in a way SPF cannot. A signature tied to your domain is stronger evidence for receivers building trust signals over time — including, eventually, brand indicators some inboxes show when DMARC enforcement is solid.

### Where mid-market DKIM usually breaks

- **Microsoft 365 DKIM not enabled for custom domains.** Many tenants run for years with default signing behavior that does not give you the custom-domain DKIM alignment you think you have. Someone checked a box once in a setup guide and never verified DNS.
- **Third-party senders without DKIM.** Your CRM sends as you with SPF include but no DKIM. DMARC at enforcement then becomes a coin flip depending on SPF alignment.
- **Selector rot.** Keys and selectors get rotated, DNS leftovers linger, or a migration leaves half your streams signed and half unsigned.
- **Body modification by intermediate systems.** Some older gateways alter content and invalidate signatures. That is an architecture smell, not a reason to skip DKIM.

Practical rule: **every platform that sends as your primary domains should DKIM-sign with an aligned domain** whenever the vendor supports it. If a vendor cannot, isolate that traffic on a subdomain with its own authentication story — do not let one stubborn SaaS keep your apex domain stuck at `p=none` forever.

## DMARC: the policy that turns evidence into action

**DMARC (Domain-based Message Authentication, Reporting, and Conformance)** ties SPF and DKIM to the domain in the visible From header and tells receivers what to do on failure. It also gives you reporting so you can see who is sending as you — legitimate systems you forgot, and hostile systems you never authorized.

### The policy ladder

DMARC policies are not a light switch. They are a ladder:

1. **`p=none` (monitor).** Receivers still deliver failing messages in most cases, but you get aggregate reports. This is where you discover your real sender inventory.
2. **`p=quarantine`.** Failing messages should go to spam/junk. Spoofing gets much harder to weaponize for wire fraud because urgency dies in the junk folder.
3. **`p=reject`.** Failing messages should be refused. This is the destination for domains that should not be forgeable — especially your primary corporate domain.

Rushing from nothing to `p=reject` overnight is how you break month-end invoicing and board newsletters at the same time. Staying on `p=none` for three years because “we are still monitoring” is how you keep wearing a costume rack for attackers. The discipline is paced enforcement with eyes on reports.

### Alignment is the whole game

DMARC does not ask “did anything related to this company pass a check?” It asks whether SPF or DKIM passed **and** aligned with the From domain. That is why copy-pasting vendor SPF includes without checking From domains still leaves you exposed. It is also why subdomain strategy matters: `mail.marketing.yourcompany.com` can have a different DMARC posture than `yourcompany.com` while you clean up marketing tooling.

### Reports are not optional decoration

DMARC without reading reports is a smoke alarm with the batteries removed. Aggregate reports (RUA) show volume by source. Forensic/failure samples (RUF), where available and privacy-appropriate, can help during investigations. For mid-market teams, the weekly habit looks like this:

- Which IPs/sources are sending as us?
- Which are authenticated?
- Which are failing, and are they ours or hostile?
- Did a new SaaS appear after a department bought a tool on a credit card?

If nobody owns that review, DMARC becomes another DNS record that looked good on an audit checklist and did nothing in production.

## A concrete scene: how spoofing still works when “email security” is half done

Imagine a nonprofit with Microsoft 365, MFA on, and a reputable spam filter. Their SPF record includes Microsoft. DKIM was “set up” during migration. DMARC is `p=none` with a reporting address nobody reads.

An attacker registers nothing fancy. They craft messages that claim to be from the development director’s address at the nonprofit’s real domain. Because DMARC is monitor-only, many receiving systems still deliver to donors and board members. A handful of people are careful. One person is busy. A gift intended for the organization is redirected. The nonprofit spends weeks unwinding banking, donor trust, and a board conversation that should never have been necessary.

Now change one control: DMARC at `p=reject` with aligned DKIM for Microsoft 365 and the fundraising platform. The same spoof fails authentication against policy. Receivers refuse it. The busy board member never sees the costume.

That is the difference these records make. Not theoretical. Operational.

## What this does *not* stop (so you do not buy the wrong comfort)

Be honest with leadership about coverage:

- **Compromised mailboxes** still send authenticated mail. DMARC will not save you from a phished CFO account. That is identity, session protection, anomaly monitoring, and fast response.
- **Lookalike domains** (`yourcompamy.com`, `yourcompany-mail.com`) are a different fight: brand monitoring, registrant alerts, user training that teaches people to read domains carefully, and mail filtering that scores lookalikes.
- **Display-name attacks** (“CEO Name” shown while the actual address is unrelated) still fool hurried readers when the real domain is not involved. User awareness and client-side warnings matter here.
- **Partner / vendor compromise** can send “legitimate” mail from a trusted outside domain. Your DMARC does not control their domain. Vendor risk and verification procedures for payment-change requests still matter.

SPF/DKIM/DMARC are how you stop strangers from wearing *your* domain. Keep saying that sentence in QBRs so the control does not get mistaken for a full anti-phishing program.

## The mid-market rollout that works

Here is a sequence sized for teams without a dedicated email authentication engineer.

### Week 1: Snapshot and inventory

- Run a baseline on your primary domains and key subdomains (apex, `www` if used for mail weirdness, marketing domains, legacy domains still in signatures).
- Export or list every system that can send as those domains.
- Pull current DNS for SPF/DKIM/DMARC. Screenshot it. You will want the before picture.
- Identify owners: who can change DNS, who owns Microsoft 365 / Google admin, who owns marketing tools.

If you want a fast external read, use the [domain security snapshot](/services/web-design-development/#site-check). Then validate with your own DNS and admin centers — tools are a starting point, not a substitute for tenant reality.

### Weeks 2–3: Fix sending foundations

- Enable and verify DKIM for Microsoft 365 / Google Workspace custom domains.
- Correct SPF to include known senders without exceeding lookup limits.
- Add DKIM for major third-party senders where supported.
- Publish or correct DMARC at `p=none` with reporting to a mailbox or service someone will actually review.
- Create a simple sender register: system, domain used, SPF method, DKIM selector, owner, date verified.

### Weeks 4–6: Clean the long tail

- Move stubborn or partially authenticated tools to dedicated subdomains when needed.
- Stop staff from using random outbound SMTP relays “just for this campaign.”
- Fix SPF bloat. Remove dead includes.
- Confirm alignment: pass SPF/DKIM *for the From domain you care about*, not for a random mail-from cousin.
- Review two to four weeks of DMARC aggregate data. Classify sources: approved, needs work, hostile/unknown.

### Weeks 7–10: Enforce

- Move DMARC to `p=quarantine` once approved senders are clean enough that business mail will not quietly vanish into junk.
- Communicate with finance, HR, and fundraising before the cutover. They feel mail failures first.
- Monitor helpdesk tickets and DMARC reports daily for a week.
- Advance to `p=reject` for the primary corporate domain when quarantine is boring — meaning failures are hostile or negligible, not your billing platform.

### Ongoing: treat DNS like production

- Any new SaaS that sends as you goes through the sender register before go-live.
- Quarterly review of DMARC reports and DNS.
- Include email authentication status in cybersecurity QBRs next to MFA coverage and backup restore tests. If you want the reporting posture that makes that review useful, our note on [managed IT reports that read like a CIO packet](/blog/managed-it-reports-like-cio/) is the operating habit; the DMARC line item belongs there.
- When domains are retired, do not leave them unauthenticated. Old domains in people’s address books are still spoofable costumes. Park them with deny-like DMARC policies appropriate to “this domain should not send mail.”

This is not a multi-year transformation. For many organizations it is a focused project measured in weeks, then a light operating rhythm.

## Common failure patterns we see in assessments

**“Microsoft handles email security.”** Microsoft provides excellent building blocks. Your DNS and your third-party senders are still your problem. Tenants can be configured well or poorly. Spoofing resistance is not automatic because the logo is on the invoice.

**DMARC forever at `p=none`.** Monitoring without enforcement is research, not control. Attackers do not care that your reports are fascinating.

**SPF includes copied from a blog post in 2019.** Vendors change. Lookup limits punish nostalgia. Update from current vendor documentation.

**Marketing IT and corporate IT never share a diagram.** The newsletter platform is the usual breaker of enforcement timelines. Put marketing in the first inventory meeting, not the emergency meeting after `p=reject`.

**Only the apex domain is protected.** Attackers will spoof `support.`, `billing.`, `mail.`, or a forgotten brand domain from an acquisition. Inventory domains, not just the homepage domain.

**No owner.** If DMARC reports land in a shared mailbox that nobody opens, you do not have DMARC. You have TXT folklore.

## How this fits a broader cybersecurity program

Email authentication is one load-bearing wall, not the whole building. Pair it with:

- Phishing-resistant MFA and conditional access on the tenant
- Mailbox auditing for forwarding rules and consent grants
- EDR on endpoints where credential theft still starts
- Payment-change verification procedures that out-of-band confirm vendor bank updates
- Backup and restore discipline for when an incident is not “just email”

If you are sequencing a wider program, start with identity and email — the two places mid-market attackers still get cheap wins — then expand into the [practical Zero Trust rollout](/blog/zero-trust-mid-market-rollout/) pattern rather than buying a rebranded dashboard and calling it done.

For organizations that need this operationalized rather than explained, it belongs inside [cybersecurity and compliance work](/services/cybersecurity/): inventory, DNS changes, vendor coordination, enforcement, and monitoring — sized for teams that still have a day job.

## A board-ready explanation in six sentences

If you need language for leadership:

Email can be forged unless we publish and enforce authentication standards. SPF lists which servers may send as us. DKIM cryptographically signs our mail so receivers can detect tampering and verify authorization. DMARC tells receivers to quarantine or reject mail that fails those checks for our domain, and it reports who is sending as us. Monitor first so we do not break billing and marketing; then enforce so criminals cannot wear our domain. This does not replace MFA or user caution, but it removes a fraud path we should not still be leaving open in 2026.

That is enough for most boards. The rest is execution.

## Where to start this week

1. Check your primary domain’s SPF, DKIM, and DMARC — externally and in your admin center.
2. Write down every system that sends as that domain.
3. Publish DMARC at `p=none` with reporting if you lack it.
4. Fix Microsoft / Google DKIM alignment for custom domains.
5. Schedule the quarantine decision thirty to sixty days out, with a named owner.

Do not wait for a perfect inventory fairy tale. Start the monitor policy, learn from reports, enforce when the graph is boring.

Curious what outsiders can already see on your domain? Run the free [domain security snapshot](/services/web-design-development/#site-check) for SPF, DKIM, DMARC, SSL, DNS hygiene, and breach exposure. If you want a human to turn the findings into an enforcement plan that will not break month-end, [book a free 20-minute cost-and-risk review](/assessment/).

Your logo should not be a costume anyone can wear in someone else’s inbox.

## Sources

**[1]** IETF, *Sender Policy Framework (SPF)* — RFC 7208. Overview: [RFC 7208](https://www.rfc-editor.org/rfc/rfc7208).

**[2]** IETF, *DomainKeys Identified Mail (DKIM) Signatures* — RFC 6376. Overview: [RFC 6376](https://www.rfc-editor.org/rfc/rfc6376).

**[3]** IETF, *Domain-based Message Authentication, Reporting, and Conformance (DMARC)* — RFC 7489. Overview: [RFC 7489](https://datatracker.ietf.org/doc/html/rfc7489).

**[4]** FBI Internet Crime Complaint Center (IC3), business email compromise and spoofing loss reporting in annual Internet Crime Reports. Overview: [IC3 annual reports](https://www.ic3.gov/AnnualReport/Reports).

**[5]** Verizon, *Data Breach Investigations Report* (annual). Social engineering and email-driven fraud remain high-frequency paths into financial loss. Overview: [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/).

---

*Cybercon Solutions helps mid-market and South Florida organizations authenticate their email — SPF, DKIM, and DMARC with real enforcement — so your domain is harder to weaponize than a logo scraped from your website.*
