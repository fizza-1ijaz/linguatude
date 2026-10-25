# Linguatude Web — Frontend Corrections for Shared Backend Parity

**Oct 25, 2026 · Web frontend audit (mirrors mobile Figma corrections by @Hamza)**

## How to use this doc

The web app was built by copying Figma screens into a frontend-only Next.js UI. Mobile and web will share the **same backend and product rules**, so the web UI must match the same CEO rules the mobile developer flagged in *Linguatude App — Figma Corrections for Designer* (Oct 23, 2026).

**Rule sources (in this order):** Linguatude APP MASTER FINAL (22 Sep 2026), then FINAL Figma Screens Correction Authority (Part A). If an older screen or note disagrees, those win.

**What was checked:** Marketing pages, auth, onboarding, and dashboard components under `app/` and `app/components/` (frontend copy and UI states only — no live backend yet).

**IDs:** Each fix names a route and/or component file so you can find it in the repo. Prefer fixing shared components so all routes stay consistent.

**Do not invent** prices, scores, dates, waitlist counts, ratings, legal wording, or support promises. Where real values are not available yet, use a clear placeholder such as `[price from store]`.

---

## Rules for every screen

Apply these on every screen, not only the ones listed in the table below.

| Area | Rule | What it means in the web UI |
|------|------|-----------------------------|
| Exams | PTE Academic and IELTS are both active. Cambridge and TOEFL are Coming Soon. | Never show PTE as Coming Soon. Coming Soon exams get a waitlist only. |
| Exam choice | Neither PTE nor IELTS is pre-selected. | Show both options unselected until the learner taps one. |
| Workspace | Each exam has its own score, target, plan, progress and subscription. | A screen shows one exam only. Do not mix an IELTS pill and PTE content on one screen. |
| Score wording | PTE = Score (10–90). IELTS = Band (0–9). | No “Band” on any PTE screen. Labels: Estimated PTE Score / Estimated IELTS Band Score. |
| Estimate honesty | Detailed results must say it is not official. | Use: “Estimated by Linguatude from your practice performance. Not an official test result.” |
| Missing evidence | No data is not zero. | Show “Not enough data” instead of 0 or a made-up number. |
| Daily time | 15 / 30 / 45 / 60 min, 30 = Recommended. | Show 30 min on home only if the learner chose 30. |
| Diagnostic | Copy: “Takes about 10 minutes.” | Remove “10-minute”, “quick 10-minute” and other timings. |
| Target and test date | Both optional. | Include “I'm not sure yet” and “I haven't booked my test yet”. No countdown without a date. |
| Study days | Learner picks days. | No fixed Saturday mock day anywhere. |
| Focus | “Let Linguatude decide” (Recommended) or one skill. | No focus split, no percentages, no Higher/Medium/Lower sliders. |
| Pace | On Track / Behind Pace / Ahead of Pace only. | Only for Goal-based plans (target + date + enough data). Never two pace states at once. |
| Free plan | Per exam: 5 AI Speaking + Writing attempts a month, 0 full mocks. | Never show free full mocks. |
| Trial | 7 days, per exam, payment method needed, starts only when the learner activates it. | Trial allowance: 25 AI attempts + 1 full mock in total. |
| Premium | Monthly or Yearly, per exam. 100 AI attempts + 3 full mocks a month. | Yearly also resets monthly. No “unlimited”. No bundle covering both exams. |
| Prices | Dynamic. | No fixed prices, savings %, or “only $X/month”. Use a price placeholder. |
| Devices | Max 3 registered devices. | Device list with current device, last active and remove/sign out. |
| Timezone | Learner’s local device time. | No Sydney or other fixed timezone. |
| Audio | Speaking audio kept up to 90 days. | No adjustable retention setting. |
| Claims | No invented ratings, stats, SLA, “24/7” or learning-style science. | Remove “4.8 Rated”, “above average vs other users”, “24/7”, “your dominant style is Visual”. |

---

## Screen-by-screen corrections

These web screens/components break a rule today. Fix copy and UI states so web and mobile stay backend-compatible.

| # | Location | Problem now | Required change | Status |
|---|----------|-------------|-----------------|--------|
| 1 | `app/layout.tsx` (global title + meta description) | SEO title/description say **“Coming Soon”** and list PTE with coming-soon framing. | PTE and IELTS are **active**. Coming Soon only for Cambridge / TOEFL. | To do |
| 2 | `app/components/onboarding/onboarding-exam-step.tsx` | “More exams coming soon” with no exam names / no waitlist CTA. | Name **Cambridge** and **TOEFL**; each has Join waitlist (shared waitlist form OK). Continue stays disabled until PTE or IELTS is tapped (already mostly correct). | To do |
| 3 | `app/components/dashboard/dashboard-shell.tsx` | Exam state defaults to **`ielts`** before localStorage sync. | Neutral until stored exam loads; do not flash IELTS as selected for PTE learners. | To do |
| 4 | `app/components/onboarding/onboarding-schedule-step.tsx` | Target step uses **Band** dropdowns even when exam is PTE; has IELTS/PTE tabs on the same screen. | Remove in-step exam tabs (exam from ONBD exam step). PTE version = Target PTE Score (10–90). IELTS = Band (0–9). | To do |
| 5 | `app/components/onboarding/onboarding-results-step.tsx` | Hardcoded IELTS band results for every learner; disclaimer is IELTS-only. | Add PTE Estimated Score variant. Use master not-official line. Add **Not enough data** per skill. | To do |
| 6 | `app/components/onboarding/onboarding-plan-step.tsx` | “Band …” / invented timeline copy for all exams. | Goal-based only when target + date exist; else General Improvement. Score/Band by exam. No invented “reach Band X in N weeks” without evidence. | To do |
| 7 | `app/components/onboarding/onboarding-diagnostic-step.tsx` | “A quick 10-minute test” / “10 minutes” chip. | **“Takes about 10 minutes.”** only. | To do |
| 8 | `app/components/diagnostic/diagnostic-analysing.tsx` | “~10 minutes” duration claim. | Same diagnostic wording rule. | To do |
| 9 | `app/components/dashboard/dashboard-home.tsx` | “Take a 10-minute diagnostic”; Daily Goal fixed **30 Min**; insight “Writing improved 0.5 bands”; possible countdown without date. | Diagnostic: “Takes about 10 minutes.” Goal = learner minutes. Insight only with evidence; PTE uses Score not Band. With-date / no-date variants. | To do |
| 10 | `app/components/dashboard/mock-home.tsx` | Full Mock card chip **“Free (1 per month)”**. | Free = **0 full mocks**. Show Trial / Premium access only for full mocks. Confirm Quick Mock with CEO. | To do / Ask CEO |
| 11 | `app/components/dashboard/mock-home.tsx` + `mock-test-results.tsx` | Band-centric mock history / “most accurate band estimate”; results disclaimer incomplete. | One exam per hub. PTE Score wording. Full not-official line. | To do |
| 12 | `app/components/dashboard/progress-plan-editor.tsx` | **Focus split** with Higher / Medium / Lower; **Mock day — Saturday is recommended**. | Replace with Let Linguatude decide (Recommended) or one skill. Learner picks mock day from study days — no recommended weekday. | To do |
| 13 | `app/components/dashboard/progress-plan-review.tsx` | Weekly schedule fixes **Sat — Quick Mock**; possible dual pace/date messaging. | Schedule follows learner days. One pace state. Add General Improvement variant (no pace). | To do |
| 14 | Progress / home charts (`progress-dashboard.tsx`, score history, etc.) | Hardcoded scores (e.g. 64) with no empty state. | **Not enough data** variants wherever evidence is missing. | To do |
| 15 | `app/components/dashboard/progress-score-history.tsx` | Labels may say generic “Estimated Score Trend”; history may mix empty + trend. | Rename/label by exam (Score History / Band History). Separate data vs empty variants. No invented pts/week pace. | To do |
| 16 | `app/components/dashboard/pte-score-report.tsx` | Hardcoded DHA table; short “AI-estimated” only; re-test copy present but no locked state. | Full not-official line. DHA as dated CMS (“as of [date]”) via `content/dha-guidance.json`. Diagnostic retake locked state (once / 30 days per exam). Remove peer-comparison claims if any. | To do |
| 17 | All LEARN / SPEAK / WRITE / PTE task headers (`PteTaskHeaderRight`, account badges, etc.) | Exam pill can disagree with content (IELTS Band vs PTE Score). | Pill = active exam’s estimate or **Not enough data**. Never mix. | To do |
| 18 | `app/components/dashboard/premium-purchase.tsx` | Fixed **$3.99 / $24.99**, **Save 48%**, **4.8 ★ rated**, feature **“IELTS & PTE Academic preparation”**, certificates perk. | Price placeholders. Remove rating. One exam per subscription. Show Free (5/0), Trial (25+1), Premium (100+3). Certificates: remove or ask CEO. | To do / Ask CEO |
| 19 | `app/components/dashboard/premium-welcome.tsx` | **“Unlimited access to quick and full mocks”**. | Premium = 100 AI + 3 full mocks / month. No “unlimited”. | To do |
| 20 | `app/components/dashboard/account-subscription.tsx` | Fixed A$89.99/yr style copy; Free view titled like IELTS Premium; no both-subscriptions layout; no trial-cancelled / free-after-premium states. | Price placeholders. Header matches subscription exam. Design both-subscriptions, trial-cancelled-but-active, free-after-premium. | To do |
| 21 | `app/components/dashboard/account-speaking.tsx` | First option **“AU-priority”**; 3 sec default not marked Recommended. | Options: Recommended / Balanced / Everything. Mark 3 sec Recommended. Confirm AU-priority vs Recommended with CEO. | To do / Ask CEO |
| 22 | `app/components/dashboard/account-settings.tsx` | No **Devices** entry. | Add Devices row → new Device management screen. | To do |
| 23 | `app/components/dashboard/help-center.tsx` / Ayra chat | Soft “anytime” support promise (24/7 implication). | Remove 24/7 / anytime SLA-style claims. | To do |
| 24 | `app/components/home-hero.tsx` | “Join 100,000+ test takers” (invented social proof). | Remove or replace with approved claim only. | To do |
| 25 | `app/components/pricing-page-content.tsx` | Exam tab defaults to **`pte`**. | Neither exam pre-selected until tapped. | To do |
| 26 | `app/components/dashboard/switch-exam.tsx` | Coming Soon waitlist mentioned without a working TOEFL waitlist path. | Cambridge waitlist exists; add TOEFL waitlist (or shared form with exam tag) + success state. | To do |
| 27 | Speaking exam setup / simulation copy | Possible “follows official IELTS band descriptors” style claim. | Confirm with CEO or remove. | Ask CEO |
| 28 | `app/components/dashboard/account-privacy.tsx` | Account deletion / privacy wording may not be CEO-approved legal text. | Use approved legal text only. | Ask CEO |
| 29 | Diagnostic flows | IELTS-format diagnostic only; no PTE diagnostic task frames / branch. | Keep IELTS diagnostic; add PTE diagnostic task types for PTE workspace. | To do |

---

## New screens and states to build (web)

Required by the same rules; missing or only partial on web today.

| # | Screen or state | What it must show | Opens from | Status |
|---|-----------------|-------------------|------------|--------|
| 1 | Waitlist (Cambridge + TOEFL) | Exam name, email, Notify me. No wait count, no launch date. | Exam selector Coming Soon; Switch exam | Partial (Cambridge only) |
| 2 | Waitlist success | “You're on the list…” | Waitlist | Partial |
| 3 | Device management | Up to 3 devices: name, this device, last active, Sign out / Remove. | Account & Settings → Devices | Missing |
| 4 | Fourth-device prompt | “You can use Linguatude on 3 devices” + list + Remove. No ban message. | Sign-in on 4th device | Missing |
| 5 | Not enough data states | Replace numbers with “Not enough data” on estimate cards, skill rows, trends, exam pill. | Home, diagnostic results, progress | Missing |
| 6 | Trial cancelled but active | Premium until original trial end; no first charge; Reactivate. Must not look like a new trial. | Subscription management | Missing |
| 7 | Free after Premium expired | Free allowance (5 AI / 0 full mocks). Past scores, mocks, feedback still visible. | Subscription + Progress | Missing |
| 8 | Both subscriptions | PTE and IELTS as two cards (plan, status, renewal, Manage). | Subscription management | Missing |
| 9 | General Improvement plan | Plan with no target, no test date, no pace label. | Plan preview + Plan review | Missing |
| 10 | Scoring concern form | Attempt, concern type, Tell us more, Submit, confirmation. No response-time promise. | Help / Account | Present (`account-help.tsx`) — verify against mobile fields |
| 11 | Second exam setup | First visit to other exam asks only exam-specific steps (previous score, target, date, diagnostic). | Switch exam | Missing |
| 12 | Diagnostic retake locked | “You can retake the diagnostic on [date]” (once / 30 days per exam). Earlier results stay visible. | Home diagnostic card; Score report | Partial (copy only) |

---

## Questions for the CEO

Same blockers as mobile — answer before designing rows marked Ask CEO:

1. **Quick Mock:** Is a shorter free/trial Quick Mock allowed, and does it use mock credit? (row 11)
2. **Exam simulation copy:** May we say scoring “follows official IELTS band descriptors”? (row 28)
3. **Certificates:** Are completion certificates a Premium feature, and what earns one? (row 19)
4. **Legal text:** Approved wording for account deletion, data export, privacy claims. (row 29)
5. **Mock timing:** Full mock duration for PTE and IELTS; does a mock pause when the tab/app backgrounds?
6. **Speaking accents:** Is “Recommended” the same as “AU-priority”, and what does it include? (row 22)
7. **Prices:** Will store/payment provider supply prices so all price text stays a placeholder? (row 19)

---

## Final check before sign-off

A screen is not approved if it breaks any rule above, even if an older Figma frame showed it.

Search the whole frontend (editor / `rg`) for each item:

- [ ] `"10/20/30"`, `"10/15/20"`, `"10-minute"`, `"quick 10"` — none left (except “Takes about 10 minutes.”)
- [ ] Any exam card shown selected before the learner taps it — none
- [ ] `"Coming Soon"` on PTE — none; Cambridge and TOEFL lead only to the waitlist
- [ ] `"Band"` on any PTE screen — none
- [ ] `"unlimited"`, `"24/7"`, `"4.8"`, `"Save"`, `"$"` — none, or only as price placeholders
- [ ] `"Saturday"`, `"Mock day"`, `"Focus split"`, `%` next to skills (focus UI) — none
- [ ] `"Sydney"` or any fixed timezone — none
- [ ] Countdown or “days to your test” only on the with-date variant
- [ ] Every estimate card has a Not enough data variant
- [ ] Every detailed result has the not-official line
- [ ] Free = 5 AI attempts + 0 full mocks; Trial = 25 + 1; Premium = 100 + 3 a month, **per exam**
- [ ] Cancelled, Past Due and expired states keep the learner’s history visible
- [ ] `"learning style"` and `"dominant style"` — none
- [ ] Web and mobile use the **same** allowance, exam workspace, and estimate wording (shared backend contract)

---

## Priority order (web)

1. **Blockers for backend parity:** free full-mock claims, paywall prices/bundle/unlimited, PTE Band copy, focus-split / Saturday mock day, missing Not enough data, PTE Coming Soon in global SEO meta, device management.
2. **Should-fix:** diagnostic wording, daily goal = learner minutes, estimate disclaimer string, DHA dated CMS, subscription state variants, TOEFL waitlist.
3. **Ask CEO** before inventing: Quick Mock, certificates, official-descriptor claims, speaking Recommended vs AU-priority, legal text.

---

## Notes for engineering

- Prefer fixing **shared components** (`dashboard-shell`, premium purchase, plan editor, score report, onboarding steps) over one-off page patches.
- When APIs arrive, replace hardcoded demo numbers with real data + empty states — do not ship zeros as scores.
- Keep marketing pricing JSON (`content/pricing-plans.json`) aligned with Free / Trial / Premium allowances if UI still hardcodes contradictory chips.
