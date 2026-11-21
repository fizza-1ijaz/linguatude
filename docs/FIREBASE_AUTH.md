# Firebase Authentication (web)

Aligned with **deployed** Cloud Functions on project `linguatude` (listed via Firebase CLI).

## Deployed auth callables (`us-central1`)

| Function | Auth required | Client input | Behaviour |
|----------|---------------|--------------|-----------|
| `sendPasswordReset` | No | `{ email }` | Rate-limited; emails reset **link** via Resend |
| `sendVerificationEmail` | Yes | `{}` | Emails 6-digit code (+ link) via Resend |
| `verifyEmailCode` | Yes | `{ code }` | Verifies OTP; sets `emailVerified` |

## Deployed diagnostic / learning callables (`us-central1`)

| Function | Auth required | Client input | Behaviour |
|----------|---------------|--------------|-----------|
| `startDiagnostic` | Yes | `{ examId }` | Creates/reuses run; retake lock → `failed-precondition` |
| `finalizeDiagnostic` | Yes | `{ runId }` | Scores diagnostic; writes ranges + plan |
| `skipDiagnostic` | Yes | `{ examId }` | No estimate; still creates plan |
| `getDiagnosticAudio` | Yes | `{ runId, itemId }` | Base64 listening audio for the run |
| `getNextItems` | Yes | `{ examId, type, count? }` | Adaptive practice items |

Server trigger (not called from client): `prepareDiagnostic`, `onUserCreate`.

## Client flows

| Flow | Implementation |
|------|----------------|
| Signup | Firebase Auth create → callable `sendVerificationEmail` (Firebase fallback) → `/verify-email` |
| Verify email | OTP UI → callable `verifyEmailCode` → onboarding/dashboard |
| Login | Firebase Auth; password users without verified email → `/verify-email` |
| Google / Apple | Firebase Auth popup |
| Forgot password | Callable `sendPasswordReset` (Firebase fallback) → check-inbox (link) |
| Reset password | Firebase `confirmPasswordReset(oobCode, …)` when link provides `oobCode` |
| Change email | Password accounts: `verifyBeforeUpdateEmail` from Profile |
| Delete account | Firebase `deleteUser` from Privacy & data |
| Sign out | Firebase Auth `signOut` |
| Diagnostic | `DiagnosticSessionProvider` → start / watch / attempts / finalize / skip |
| Route guards | `RequireAuth` blocks signed-out + unverified password users |

## Code

- `lib/firebase.ts` — Functions region `us-central1`
- `lib/functions-auth.ts` — wrappers for the three auth callables
- `lib/functions-diagnostic.ts` — wrappers for diagnostic / getNextItems
- `lib/auth.ts` — Auth helpers (including email change, delete, CF fallbacks)
- `lib/diagnostic.ts` — Firestore + Storage helpers matching mobile
- `lib/onboarding-answers.ts` — workspace writes (`users/{uid}/workspaces/{examId}`)
- `lib/items.ts` — practice items (`getNextItems` + Firestore pool)
- `app/verify-email` — OTP verification screen
- `app/components/diagnostic/diagnostic-session-context.tsx` — live diagnostic session
