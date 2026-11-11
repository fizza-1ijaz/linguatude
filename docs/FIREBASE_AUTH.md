# Firebase Authentication (web)

Aligned with **deployed** Cloud Functions on project `linguatude` (listed via Firebase CLI).

## Deployed auth callables (`us-central1`)

| Function | Auth required | Client input | Behaviour |
|----------|---------------|--------------|-----------|
| `sendPasswordReset` | No | `{ email }` | Rate-limited; emails reset **link** via Resend |
| `sendVerificationEmail` | Yes | `{}` | Emails 6-digit code (+ link) via Resend |
| `verifyEmailCode` | Yes | `{ code }` | Verifies OTP; sets `emailVerified` |

## Client flows

| Flow | Implementation |
|------|----------------|
| Signup | Firebase Auth create → callable `sendVerificationEmail` → `/verify-email` |
| Verify email | OTP UI → callable `verifyEmailCode` → onboarding/dashboard |
| Login | Firebase Auth; password users without verified email → `/verify-email` |
| Google / Apple | Firebase Auth popup |
| Forgot password | Callable `sendPasswordReset` → check-inbox (link) |
| Reset password | Firebase `confirmPasswordReset(oobCode, …)` when link provides `oobCode` |
| Sign out | Firebase Auth `signOut` |

## Code

- `lib/firebase.ts` — Functions region `us-central1`
- `lib/functions-auth.ts` — wrappers for the three callables
- `lib/auth.ts` — Auth helpers wired to those callables
- `app/verify-email` — OTP verification screen
