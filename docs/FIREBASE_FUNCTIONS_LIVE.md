# Live Cloud Functions audit (project `linguatude`)

Verified via Firebase CLI after reauth (`firebase functions:list --project linguatude`) on **21 Nov 2026**.

All callables / triggers below are in **`us-central1`**, Node.js 22.

## Auth (web wired)

| Function | Kind | Web client |
|----------|------|------------|
| `sendVerificationEmail` | callable | `lib/functions-auth.ts` |
| `verifyEmailCode` | callable | `lib/functions-auth.ts` |
| `sendPasswordReset` | callable | `lib/functions-auth.ts` |
| `onUserCreate` | Auth trigger v1 | server only |

## Diagnostic (web wired)

| Function | Kind | Web client |
|----------|------|------------|
| `startDiagnostic` | callable | `lib/functions-diagnostic.ts` |
| `finalizeDiagnostic` | callable | `lib/functions-diagnostic.ts` |
| `skipDiagnostic` | callable | `lib/functions-diagnostic.ts` |
| `getDiagnosticAudio` | callable | `lib/functions-diagnostic.ts` |
| `prepareDiagnostic` | Firestore create trigger | server only |
| `getNextItems` | callable | `lib/functions-diagnostic.ts` + `lib/items.ts` |

## Learning / entitlements (deployed live; web wrappers added)

| Function | Kind | Web client |
|----------|------|------------|
| `ensureEntitlement` | callable | `lib/functions-learning.ts` → used from onboarding + Account |
| `debugSetEntitlement` | callable (admin) | wrapper only — not in learner UI |
| `scoreTextAttempt` | callable | `lib/attempts.ts` |
| `scoreWritingAttempt` | callable | `lib/attempts.ts` → Writing Task 1 submit |
| `issueAudioPlayToken` | callable | `lib/functions-learning.ts` |
| `onWorkspaceCreate` | Firestore create | server only (Free entitlement seed) |
| `onAudioUploaded` | Storage finalize | server only |
| `scoreAudioWorker` | Firestore update | server only |
| `updateAggregates` | Firestore update | server only |
| `updateAggregatesOnCreate` | Firestore create | server only |

## Notes

- Local `Linguatude-mob/functions/index.js` is **behind** production (missing entitlement / scoring exports). Do **not** redeploy from that older tree without merging.
- Mobile Flutter client also does **not** call `ensureEntitlement` / `score*` yet; those backends are live for both clients.
- App Check: `ensureEntitlement` logs show App Check tokens may be invalid; enforcement is currently disabled so requests still succeed when Auth is valid.
