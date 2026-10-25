# Linguatude Web — Design Corrections (Shared Product Rules)

**Updated Oct 26, 2026 · For design / Figma alignment**  
Verified against *Linguatude WEB MASTER FINAL* (22 Sep 2026) and mobile Figma corrections by @Hamza (23 Oct 2026).

## How to use this doc

This list is for **design and screen copy only** — the same product rules mobile already flagged.

**Out of scope here:** SEO/meta tags, backend, APIs, attempt accounting, CMS wiring, and other engineering work (those are handled separately by development).

**Authority:** WEB MASTER FINAL wins over older decks. If a Figma frame shows old behaviour, update the frame to match these rules.

**Do not invent** prices, scores, dates, waitlist counts, ratings, legal wording, testimonials, or official-score claims. Use placeholders like `[price from store]` when real values are not approved.

---

## Rules for every screen (design)

| Area | Rule | Design implication |
|------|------|--------------------|
| Active exams | PTE Academic + IELTS | Never label PTE as Coming Soon. |
| Coming Soon | Cambridge + TOEFL | Waitlist UI only — no practice, mock, plan, trial, or progress for these. |
| Exam choice | Neither pre-selected | Both options idle until the learner taps one. |
| Workspace | One exam per screen | Do not mix IELTS Band chrome with PTE content (or reverse). |
| Score wording | PTE = Score; IELTS = Band | Labels: Estimated PTE Score / Estimated IELTS Band Score. |
| Estimate honesty | Required line | “Estimated by Linguatude from your practice performance. Not an official test result.” |
| Missing evidence | Not enough data | Never show 0 or fake numbers. Design empty variants. |
| Daily time | 15 / 30 / 45 / 60; 30 = Recommended | Home shows 30 only if learner chose 30. |
| Diagnostic | “Takes about 10 minutes.” | No “quick 10-minute” variants. |
| Target / date | Optional | “I'm not sure yet” / “I haven't booked my test yet”. No countdown without a date. |
| Focus | Let Linguatude decide (Recommended) or one skill | No focus split, %, or Higher/Medium/Lower. |
| Study / mock day | Learner picks days | No fixed Saturday mock day. |
| Pace | On Track / Behind / Ahead | Goal-based + enough data only. Never on General Improvement. Never two at once. |
| Free | 5 AI / month, **0 full mocks** | Never show free full-mock chips. |
| Trial | 7 days; 25 AI + 1 full mock total | Starts only when learner activates. Per exam. |
| Premium | 100 AI + 3 full mocks / month | No “unlimited”. Yearly still monthly reset. Per exam — no both-exams bundle. |
| Prices | Dynamic | Placeholders only — no fixed $, Save %, “only $X”. |
| Devices | Max 3 | Design device list + 4th-device remove prompt. |
| Testimonials / stats | Genuine only | No invented reviews or “100,000+” / “4.8 Rated”. |
| Certificates | Completion evidence | Not shown as a “Premium perk” from payment alone. |
| Claims | No invented SLA / learning styles | No “24/7”, “anytime” support promise, “dominant style is Visual”. |

---

## Screen-by-screen design corrections

| # | Screen / flow | Problem now | Required design change | Status |
|---|---------------|-------------|------------------------|--------|
| 1 | Onboarding — exam step | Vague “More exams coming soon”; no named waitlist. | Name **Cambridge** and **TOEFL**; Join waitlist CTA each. Neither PTE nor IELTS pre-selected. | To do |
| 2 | Onboarding — schedule / target | Band UI + exam tabs even when exam is PTE. | Exam already chosen. PTE = Target PTE Score (10–90). IELTS = Band (0–9). Remove in-step exam tabs. | To do |
| 3 | Onboarding — diagnostic results | Hardcoded IELTS bands; wrong disclaimer. | Exam-specific Estimated Score/Band; master not-official line; **Not enough data** per skill. | To do |
| 4 | Onboarding — plan preview | Invented Band timeline for all exams. | Goal-based only with target + date; else **General Improvement** (no pace). Score/Band by exam. | To do |
| 5 | Onboarding — diagnostic intro | “A quick 10-minute test” / “10 minutes” chip. | **“Takes about 10 minutes.”** only. | To do |
| 6 | Diagnostic analysing | “~10 minutes” duration claim. | Same diagnostic wording. | To do |
| 7 | Dashboard home | “10-minute diagnostic”; fixed 30 Min; Band insight; countdown without date. | Master diagnostic copy; goal = learner minutes; insights only with evidence; with-date / no-date variants. | To do |
| 8 | Mock hub | Full Mock chip **“Free (1 per month)”**. | Free = **0** full mocks. Trial / Premium access only for full mocks. | To do |
| 9 | Mock hub + results | Band-centric history; weak disclaimer. | One exam; PTE Score wording; full not-official line. | To do |
| 10 | Plan editor | Focus split Higher/Medium/Lower; Saturday mock recommended. | Let Linguatude decide or one skill. Learner picks mock day — no recommended weekday. | To do |
| 11 | Plan review | Sat — Quick Mock; dual pace messaging. | Follow learner days. One pace state. General Improvement variant (no pace). | To do |
| 12 | Progress / home charts | Always show scores (e.g. 64). | **Not enough data** empty variants. | To do |
| 13 | Score / Band history | Generic trend; empty + trend mixed. | Score History / Band History by exam; separate empty state. No invented pts/week. | To do |
| 14 | PTE score report | Short AI tag; hard-coded DHA; retake copy only. | Full not-official line; DHA “as of [date]”; locked retake state (once / 30 days). | To do |
| 15 | LEARN / SPEAK / WRITE headers | Exam pill can disagree with content. | Pill matches active exam estimate or **Not enough data**. | To do |
| 16 | Premium / paywall | Fixed prices, Save %, 4.8 rating, both exams, certificates perk. | Price placeholders; one exam; Free 5/0, Trial 25+1, Premium 100+3; no rating; no certificates-as-perk. | To do |
| 17 | Premium welcome | “Unlimited” mocks. | 100 AI + 3 full mocks / month. | To do |
| 18 | Subscription management | Fixed prices; wrong Free/Premium titles; missing state variants. | Placeholders; header matches exam; design **both subscriptions**, **Trial cancelled but active**, **Past Due**, **Free after expiry**. | To do |
| 19 | Speaking preferences | “AU-priority”; 3 sec not Recommended. | Recommended / Balanced / Everything; mark 3 sec Recommended. | To do |
| 20 | Account & Settings | No Devices row. | Add Devices → device management screen. | To do |
| 21 | Help / Ayra | “Anytime” / 24/7-style support tone. | Remove SLA-style promises. | To do |
| 22 | Marketing homepage hero | “Join 100,000+ test takers”. | Remove unsupported social proof. | To do |
| 23 | Marketing testimonials | Fictional / sample reviews. | Genuine quotes only — or empty / honest state until approved. | To do |
| 24 | Pricing page exam tabs | Defaults to PTE selected. | Neither exam pre-selected until tapped. | To do |
| 25 | Switch exam | TOEFL waitlist incomplete. | Cambridge + TOEFL waitlist (email only; no fake counts/dates). | To do |
| 26 | Diagnostic flows | IELTS-format only in design. | Separate PTE diagnostic task frames for PTE workspace. | To do |
| 27 | Trial / checkout confirm | Incomplete commercial summary. | Show selected exam, plan, amount placeholder, billing frequency, first charge date, cancel-before condition. | To do |
| 28 | Yearly plan copy | May imply full-year allowance upfront. | Yearly still **100 + 3 per month**. | To do |

**Ask CEO before designing (not invent):**

1. Quick Mock — allowed on Free/Trial? Uses mock credit?
2. “Follows official IELTS band descriptors” style claims — allowed?
3. Speaking “Recommended” vs “AU-priority” naming
4. Approved legal copy for privacy / delete account shells
5. Full mock durations (PTE vs IELTS) for UI timing labels

---

## New screens / states to design

| # | Screen or state | Must show | Opens from | Status |
|---|-----------------|-----------|------------|--------|
| 1 | Waitlist (Cambridge + TOEFL) | Exam name, email, Notify me. No wait count / launch date. | Exam selector; Switch exam | Partial |
| 2 | Waitlist success | “You're on the list…” | Waitlist | Partial |
| 3 | Device management | Up to 3 devices; this device; last active; Sign out / Remove. | Account → Devices | Missing |
| 4 | Fourth-device prompt | Remove an existing device; no ban message. | Sign-in on 4th device | Missing |
| 5 | Not enough data | Estimates, skills, trends, exam pill. | Home, diagnostic, progress | Missing |
| 6 | Trial Cancelled-but-Active | Access until original trial end; Reactivate (not a new trial). | Subscription | Missing |
| 7 | Past Due | Payment recovery messaging; history kept. | Subscription | Missing |
| 8 | Free after expiry | Free 5/0; past scores/mocks/feedback still visible. | Subscription + Progress | Missing |
| 9 | Both subscriptions | PTE + IELTS cards (plan, status, renewal, Manage). | Subscription | Missing |
| 10 | General Improvement plan | No target, no date, no pace. | Plan preview / review | Missing |
| 11 | Second exam setup | Only exam-specific steps (previous, target, date, diagnostic). | Switch exam | Missing |
| 12 | Diagnostic retake locked | “You can retake on [date]”; history still visible. | Home; Score report | Partial |
| 13 | Active session conflict | Block / resume when another learning or mock session is active. | Practice / Mock | Missing |
| 14 | Honest testimonials | Empty or approved real quotes only. | Home / About | Needed |

---

## Design QA checklist before sign-off

A frame is **not approved** if it breaks a rule above, even if an older deck showed it.

- [ ] Only **15 / 30 / 45 / 60** daily options
- [ ] No exam pre-selected
- [ ] PTE never Coming Soon; Cambridge/TOEFL → waitlist only
- [ ] No Band on PTE surfaces
- [ ] No fixed prices / Save % / “unlimited” / “4.8” / “100,000+”
- [ ] No Saturday mock day; no focus split / skill %
- [ ] No invented testimonials
- [ ] Free = 5 AI + 0 mocks; Trial = 25 + 1; Premium = 100 + 3 / month; **per exam**
- [ ] Every estimate has Not enough data + not-official disclaimer variants
- [ ] Subscription states: Trial cancelled, Past Due, Free after expiry, both exams
- [ ] Devices (max 3) + 4th-device prompt designed

---

## Priority (design)

1. **Blockers:** free full-mock claims; paywall prices/bundle/unlimited/rating; PTE Band copy; focus split / Saturday; Not enough data; invented testimonials/stats; subscription state matrix; device screens.
2. **Should-fix:** diagnostic wording; daily goal = learner minutes; disclaimer string; DHA date label; TOEFL waitlist; checkout summary fields; yearly monthly-reset copy.
3. **Ask CEO** for the open questions above — do not invent answers in Figma.
