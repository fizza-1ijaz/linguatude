import { WaitlistForm } from "@/app/components/waitlist-form";
import { SiteHeader } from "@/app/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <section
          className="relative isolate flex min-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] w-full shrink-0 flex-col justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] lg:max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] lg:min-h-0 lg:px-8 lg:py-6"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center justify-center gap-4 text-center sm:gap-6 lg:min-h-0 lg:gap-4 animate-[fade-in-up_0.8s_ease-out_both] overflow-hidden sm:overflow-visible">
            <p className="hero-coming-soon-wrap">
              <span className="hero-coming-soon">Coming soon</span>
            </p>

            <h1
              id="hero-heading"
              className="hero-headline max-w-[min(100%,22rem)] px-2 text-xl font-extrabold leading-[1.15] tracking-tight text-[var(--foreground)] text-balance sm:max-w-xl sm:text-2xl md:max-w-2xl md:text-[1.75rem] lg:text-[2rem] animate-[fade-in-up_0.8s_ease-out_both] hyphens-none"
              style={{ animationDelay: '100ms' }}
            >
              Your AI Coach for the English Tests That Open Doors.
            </h1>

            <p className="max-w-xl text-pretty text-xs leading-relaxed text-[var(--muted)] sm:text-sm md:text-base animate-[fade-in-up_0.8s_ease-out_both]" style={{ animationDelay: '200ms' }}>
              Linguatude prepares you for IELTS, TOEFL iBT, PTE Academic,
              Cambridge B1 Preliminary, and Cambridge B2 First — with an AI
              that evaluates your level, builds your personal study plan, and
              adapts every day as you improve.
            </p>

            <p className="text-sm font-semibold text-[var(--foreground)] sm:text-base animate-[fade-in-up_0.8s_ease-out_both]" style={{ animationDelay: '300ms' }}>
              Be the first to know when we launch.
            </p>

            <div className="mt-1 flex w-full max-w-md justify-center px-1 animate-[fade-in-up_0.8s_ease-out_both]" style={{ animationDelay: '400ms' }}>
              <WaitlistForm variant="hero" />
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] py-20 sm:py-24"
          aria-labelledby="problem-heading"
        >
          <div className="landing-section-mesh" aria-hidden />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 animate-[fade-in-up_0.8s_ease-out_both]" style={{ animationDelay: '100ms' }}>
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-8 shadow-[0_24px_80px_-32px_color-mix(in_srgb,var(--primary)_35%,transparent)] backdrop-blur-xl sm:p-10 lg:p-12 dark:bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] dark:shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)]">
              <div className="flex flex-col gap-3 sm:gap-4">
                <span className="landing-h2-rule" aria-hidden />
                <h2
                  id="problem-heading"
                  className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl lg:max-w-4xl break-words hyphens-auto"
                >
                  Millions of people need to pass an English test. Most of them are
                  preparing the hard way.
                </h2>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-5 text-pretty text-base leading-relaxed text-[var(--muted)] sm:gap-6 sm:text-lg lg:grid-cols-2 lg:gap-10">
                <div className="space-y-6 rounded-2xl border border-[var(--border)]/80 bg-[color-mix(in_srgb,var(--surface-muted)_40%,transparent)] p-6 sm:p-7 dark:border-[var(--border)]/60 dark:bg-[color-mix(in_srgb,var(--surface-muted)_25%,transparent)]">
                  <p>
                    English proficiency tests are among the most consequential
                    examinations in the world. They determine university admission,
                    immigration outcomes, professional registration, and career
                    advancement for millions of people every year. The stakes are
                    real — and the preparation market reflects that.
                  </p>
                  <p>
                    The global English proficiency test market was valued at
                    approximately $2.8 billion in 2024 and is projected to grow to
                    $7.8 billion by 2031, driven by rising international student
                    mobility, global employment demand, and immigration volumes
                    across English-speaking countries. IELTS alone is accepted by
                    over 11,500 organisations worldwide. TOEFL iBT is recognised by
                    more than 11,000 universities and institutions across 190
                    countries. PTE Academic is accepted by over 3,000 institutions
                    globally and continues to grow rapidly.
                  </p>
                </div>
                <div className="space-y-6 rounded-2xl border border-[var(--border)]/80 bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] p-6 sm:p-7 dark:border-[var(--border)]/60 dark:bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))]">
                  <p>
                    Yet for many learners, preparation still means expensive
                    coaching centres, rigid coursebooks that do not adapt to
                    individual needs, or generic practice apps that are built for
                    language learning rather than test performance. The result is
                    preparation that costs too much, takes too long, and does not
                    always focus on what a specific learner actually needs.
                  </p>
                  <p className="rounded-xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-3 text-[0.95rem] font-semibold leading-snug text-[var(--foreground)] sm:text-base">
                    Linguatude is being built to change that.
                  </p>
                </div>
              </div>

              <aside
                className="mt-8 rounded-2xl border border-[var(--secondary)]/25 bg-[color-mix(in_srgb,var(--secondary)_10%,var(--surface))] p-5 sm:p-6 dark:border-[var(--secondary)]/20 dark:bg-[color-mix(in_srgb,var(--secondary)_12%,var(--surface))]"
                aria-label="Sources for statistics in the section above"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--secondary)]">
                  Third-party sources
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                  The figures and acceptance counts above are reported by
                  independent publishers and organisations — not by Linguatude.
                  Market size: Verified Market Research (2024). IELTS acceptance:
                  IDP / British Council. TOEFL iBT acceptance: ETS; figures also
                  summarised on Wikipedia (January 2026 update). PTE Academic
                  acceptance: Pearson; institutional count also cited on pw.live
                  (2024).
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] py-20 sm:py-24"
          aria-labelledby="what-is-heading"
        >
          <div className="landing-section-mesh opacity-60 [background:radial-gradient(ellipse_80%_50%_at_0%_0%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,color-mix(in_srgb,var(--secondary)_12%,transparent),transparent_50%)]" aria-hidden />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 animate-[fade-in-up_0.8s_ease-out_both]" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
              <span className="landing-h2-rule" aria-hidden />
              <h2
                id="what-is-heading"
                className="mx-auto max-w-4xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl"
              >
                Test-specific preparation. Personalised by AI. Built around your
                life.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <p>
                  Linguatude is an AI-powered English test preparation and
                  language learning platform. It is not a generic language app. It
                  is built specifically for learners who need to achieve a
                  target score on a recognised English proficiency examination —
                  and who want preparation that is focused, efficient, and
                  tailored to where they actually are right now.
                </p>
                <p>
                  Every learner begins with a free AI diagnostic evaluation.
                  Within minutes, the AI assesses current ability across all four
                  language skills — listening, reading, writing, and speaking —
                  and produces a skill report that identifies strengths, pinpoints
                  weaknesses, and generates a personalised daily preparation plan
                  from that point.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  From there, Linguatude adapts continuously. Practice focuses on
                  what each learner needs. Skills that are already strong are
                  recognised and moved past. Time is spent where it will make the
                  most difference. Daily sessions are designed to fit into a real
                  life — focused, structured, and short enough to be sustainable.
                </p>
                <p>
                  When a learner is ready, full exam simulations replicate the
                  conditions of the actual test. A completion certificate marks the
                  end of each preparation path.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_65%,var(--background))] py-20 sm:py-24 dark:bg-[color-mix(in_srgb,var(--surface-muted)_40%,var(--background))]"
          aria-labelledby="three-things-heading"
        >
          <div className="landing-section-mesh opacity-50" aria-hidden />
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="landing-h2-rule" aria-hidden />
              <h2
                id="three-things-heading"
                className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl"
              >
                Three Things Linguatude Does
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 md:items-stretch">
              <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 p-7 shadow-[0_16px_48px_-36px_color-mix(in_srgb,var(--primary)_45%,transparent)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-[0_24px_56px_-32px_color-mix(in_srgb,var(--accent)_22%,transparent)] sm:p-8 dark:bg-[var(--surface)]/50">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent opacity-80" aria-hidden />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_22%,transparent)] to-[color-mix(in_srgb,var(--secondary)_14%,transparent)] text-sm font-bold tabular-nums text-[var(--accent)] ring-1 ring-[var(--accent)]/15">
                  01
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  English Test Preparation
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Built around the tests that matter. Linguatude prepares
                  learners for IELTS, TOEFL iBT, PTE Academic, Cambridge B1
                  Preliminary, and Cambridge B2 First — with practice, feedback,
                  and simulations calibrated to each exam&apos;s specific format
                  and scoring criteria.
                </p>
              </article>

              <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 p-7 shadow-[0_16px_48px_-36px_color-mix(in_srgb,var(--primary)_45%,transparent)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-[0_24px_56px_-32px_color-mix(in_srgb,var(--accent)_22%,transparent)] sm:p-8 dark:bg-[var(--surface)]/50">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/45 to-transparent opacity-90" aria-hidden />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_20%,transparent)] to-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-sm font-bold tabular-nums text-[var(--secondary)] ring-1 ring-[var(--secondary)]/20">
                  02
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  Personalised Language Learning
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Not a course. A plan built for you. Every learner starts at a
                  different point and needs a different path. Linguatude uses
                  AI to identify exactly where each learner stands across all
                  four language skills and builds a daily practice plan around
                  that — adapting as they progress.
                </p>
              </article>

              <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 p-7 shadow-[0_16px_48px_-36px_color-mix(in_srgb,var(--primary)_45%,transparent)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-[0_24px_56px_-32px_color-mix(in_srgb,var(--accent)_22%,transparent)] sm:p-8 dark:bg-[var(--surface)]/50">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-80" aria-hidden />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_18%,transparent)] to-[color-mix(in_srgb,var(--primary)_25%,transparent)] text-sm font-bold tabular-nums text-[var(--accent)] ring-1 ring-[var(--accent)]/15">
                  03
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  AI Language Coaching
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Available whenever you need it. No scheduling. No waiting.
                  Linguatude&apos;s AI evaluates speaking responses, scores
                  written work against official exam rubrics, generates practice
                  content across all four skills, and provides feedback that is
                  specific enough to act on — every session, every day.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] py-20 sm:py-24"
          aria-labelledby="supported-exams-heading"
        >
          <div className="landing-section-mesh" aria-hidden />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 animate-[fade-in-up_0.8s_ease-out_both]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="landing-h2-rule" aria-hidden />
              <h2
                id="supported-exams-heading"
                className="max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl"
              >
                The tests that open doors. Prepared for here.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 shadow-[0_16px_48px_-40px_color-mix(in_srgb,var(--primary)_40%,transparent)] backdrop-blur-md sm:p-8 dark:bg-[var(--surface)]/40">
                <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  Linguatude launches with support for five internationally
                  recognised English proficiency examinations. Additional examinations are planned for future release. Linguatude is built to grow alongside the tests that matter most to
                  learners around the world.
                </p>
              </div>

              <ul className="flex flex-col gap-3 sm:gap-4">
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--primary)_35%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_45%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      <strong className="font-semibold text-[var(--foreground)]">
                        IELTS
                      </strong>
                      {' — '}
                      the world&apos;s most widely accepted English proficiency test
                      for immigration, university admission, and professional
                      registration
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--primary)_35%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_45%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      <strong className="font-semibold text-[var(--foreground)]">
                        TOEFL iBT
                      </strong>
                      {' — '}
                      recognised by more than 11,000 universities and institutions
                      across 190 countries
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--primary)_35%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_45%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      <strong className="font-semibold text-[var(--foreground)]">
                        PTE Academic
                      </strong>
                      {' — '}
                      fully computer-based, AI-scored, and accepted by over 3,000
                      institutions globally
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--primary)_35%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_45%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      <strong className="font-semibold text-[var(--foreground)]">
                        Cambridge B1 Preliminary (PET)
                      </strong>
                      {' — '}
                      internationally recognised certification at upper-intermediate
                      level
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--primary)_35%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_45%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      <strong className="font-semibold text-[var(--foreground)]">
                        Cambridge B2 First (FCE)
                      </strong>
                      {' — '}
                      globally recognised qualification for advanced academic and
                      professional settings
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_72%,var(--background))] py-20 sm:py-24 dark:bg-[color-mix(in_srgb,var(--surface)_35%,var(--background))]"
          aria-labelledby="who-is-heading"
        >
          <div className="landing-section-mesh opacity-45" aria-hidden />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 animate-[fade-in-up_0.8s_ease-out_both]" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="landing-h2-rule" aria-hidden />
              <h2
                id="who-is-heading"
                className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl"
              >
                If English is the test standing between you and what you are
                working toward — this is built for you.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 shadow-[0_16px_48px_-40px_color-mix(in_srgb,var(--primary)_38%,transparent)] backdrop-blur-md sm:p-8 dark:bg-[var(--surface)]/45">
                <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  Linguatude is for any learner who needs to achieve a score on an
                  English proficiency examination and wants preparation that is honest
                  about what it takes to get there.
                </p>
              </div>

              <ul className="flex flex-col gap-3 sm:gap-4">
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--secondary)_40%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--secondary)_15%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_40%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--secondary)] ring-4 ring-[color-mix(in_srgb,var(--secondary)_16%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      Students applying to universities in English-speaking countries
                      who need to meet admission score requirements
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--secondary)_40%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--secondary)_15%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_40%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--secondary)] ring-4 ring-[color-mix(in_srgb,var(--secondary)_16%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      Professionals seeking registration or employment in fields that
                      require certified English proficiency
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--secondary)_40%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--secondary)_15%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_40%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--secondary)] ring-4 ring-[color-mix(in_srgb,var(--secondary)_16%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      Individuals navigating immigration or residency processes that
                      require a recognised English test score
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--secondary)_40%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--secondary)_15%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_40%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--secondary)] ring-4 ring-[color-mix(in_srgb,var(--secondary)_16%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      Learners who have attempted a test before and want to improve a
                      specific score or skill area
                    </p>
                  </div>
                </li>
                <li className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-4 transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--secondary)_40%,var(--border))] hover:shadow-[0_12px_40px_-28px_color-mix(in_srgb,var(--secondary)_15%,transparent)] sm:p-5 dark:bg-[color-mix(in_srgb,var(--surface)_40%,transparent)]">
                  <div className="flex gap-3 sm:gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--secondary)] ring-4 ring-[color-mix(in_srgb,var(--secondary)_16%,transparent)]" aria-hidden />
                    <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      Anyone who needs structured, personalised, test-specific
                      preparation — and cannot afford extended coaching programmes
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] py-20 sm:py-24"
          aria-labelledby="sister-platforms-heading"
        >
          <div className="landing-section-mesh opacity-55 [background:radial-gradient(ellipse_75%_50%_at_50%_-10%,color-mix(in_srgb,var(--secondary)_10%,transparent),transparent_50%),radial-gradient(ellipse_60%_40%_at_100%_100%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_55%)]" aria-hidden />
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="landing-h2-rule" aria-hidden />
              <h2
                id="sister-platforms-heading"
                className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl"
              >
                Sister Platforms
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
              <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-7 shadow-[0_20px_56px_-40px_color-mix(in_srgb,var(--primary)_42%,transparent)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_38%,var(--border))] hover:shadow-[0_28px_64px_-36px_color-mix(in_srgb,var(--accent)_18%,transparent)] sm:p-8 dark:bg-[var(--surface)]/45">
                <div className="mb-6 h-1 w-full rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--accent)] opacity-90" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--secondary)]">
                  Studiely – Start Learning Smarter
                </p>
                <h3 className="mt-3 text-balance text-xl font-bold tracking-tight leading-snug text-[var(--foreground)] sm:text-2xl">
                  Part of the same mission. Built for a different learner.
                </h3>
                <div className="mt-6 flex flex-1 flex-col space-y-6 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  <p>
                    Linguatude is a product of Skyen Solutions — built on the
                    belief that quality education should be accessible and
                    affordable for every learner, regardless of where they are or
                    what they can afford.
                  </p>
                  <p>
                    Our sister platform,{" "}
                    <a
                      href="https://www.studiely.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition hover:decoration-[var(--accent)]"
                    >
                      Studiely
                    </a>
                    , is an AI-powered study platform for school students
                    working across British, American, IB, Australian, and
                    Canadian curricula. Where Linguatude is built for the learner
                    preparing for a high-stakes English test,{" "}
                    <a
                      href="https://www.studiely.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition hover:decoration-[var(--accent)]"
                    >
                      Studiely
                    </a>{" "}
                    is built for the student preparing for their school
                    examinations. Two different learners. The same commitment.
                  </p>
                </div>
              </article>

              <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-7 shadow-[0_20px_56px_-40px_color-mix(in_srgb,var(--primary)_42%,transparent)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--secondary)_40%,var(--border))] hover:shadow-[0_28px_64px_-36px_color-mix(in_srgb,var(--secondary)_16%,transparent)] sm:p-8 dark:bg-[var(--surface)]/45">
                <div className="mb-6 h-1 w-full rounded-full bg-gradient-to-r from-[var(--secondary)] via-[var(--accent)] to-[var(--secondary)] opacity-90" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  Make My Lesson — AI-Powered Lesson Planning for Teachers
                </p>
                <h3 className="mt-3 text-balance text-xl font-bold tracking-tight leading-snug text-[var(--foreground)] sm:text-2xl">
                  For the educator on the other side of the classroom.
                </h3>
                <div className="mt-6 flex flex-1 flex-col space-y-6 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  <p>
                    Our second sister platform,{" "}
                    <a
                      href="https://makemylesson.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition hover:decoration-[var(--accent)]"
                    >
                      Make My Lesson
                    </a>
                    , is an AI-powered lesson planning platform built for teachers
                    across Australian, British, Canadian, IB, and US curriculum
                    systems.
                  </p>
                  <p>
                    Where Linguatude is built for the learner preparing for a
                    high-stakes English proficiency test,{" "}
                    <a
                      href="https://makemylesson.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition hover:decoration-[var(--accent)]"
                    >
                      Make My Lesson
                    </a>{" "}
                    is built for the educator preparing the lessons that shape what
                    learners know. Two different users. The same commitment to
                    making quality education more accessible for everyone.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-[var(--border)] bg-gradient-to-b from-[color-mix(in_srgb,var(--surface-muted)_55%,var(--background))] to-[var(--background)] py-20 sm:py-24 dark:from-[color-mix(in_srgb,var(--surface-muted)_35%,var(--background))]"
          aria-labelledby="coming-soon-heading"
        >
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_55%)] opacity-70 dark:opacity-50" aria-hidden />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-left sm:px-6 lg:px-8">
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] p-8 shadow-[0_24px_80px_-40px_color-mix(in_srgb,var(--primary)_38%,transparent)] backdrop-blur-xl sm:p-10 dark:bg-[color-mix(in_srgb,var(--surface)_50%,transparent)] dark:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-3">
                <span className="landing-h2-rule" aria-hidden />
                <h2
                  id="coming-soon-heading"
                  className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl"
                >
                  Linguatude is coming soon.
                </h2>
              </div>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                We are in development. Leave your email and we will let you know
                the moment it is ready.
              </p>
              <div className="mt-8 flex justify-start border-t border-[var(--border)]/80 pt-8">
                <WaitlistForm variant="footer" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
