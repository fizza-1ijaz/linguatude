"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  buildConsent,
  clearConsentFromDocument,
  readConsentFromDocument,
  writeConsentToDocument,
  type StoredConsent,
} from "@/app/components/cookie-consent/consent-storage";
import { GoogleAnalytics } from "@/app/components/cookie-consent/google-analytics";

const INTRO_LS_KEY = "linguatude_cookie_crack_intro_v1";

type Stage = "cookie" | "crack" | "banner";

type CookieConsentContextValue = {
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsent");
  }
  return ctx;
}

function CookieCrackGraphic({
  isCracking,
  onCrackTimingDone,
}: {
  isCracking: boolean;
  onCrackTimingDone: () => void;
}) {
  const doneRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isCracking || reduceMotion) return;
    const t = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onCrackTimingDone();
    }, 720);
    return () => window.clearTimeout(t);
  }, [isCracking, onCrackTimingDone, reduceMotion]);

  const fly = isCracking && !reduceMotion;

  return (
    <div className="flex h-[200px] w-[200px] items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        width={200}
        height={200}
        className="overflow-visible"
        aria-hidden
      >
        <defs>
          <clipPath id="cc-left" clipPathUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="200" />
          </clipPath>
          <clipPath id="cc-right" clipPathUnits="userSpaceOnUse">
            <rect x="100" y="0" width="100" height="200" />
          </clipPath>
        </defs>
        <motion.g
          clipPath="url(#cc-left)"
          initial={false}
          animate={
            fly
              ? { x: -320, y: 40, rotate: -22, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{
            duration: fly ? 0.7 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="86"
            fill="#c99562"
            stroke="#8b6239"
            strokeWidth="3"
          />
          <circle cx="72" cy="88" r="9" fill="#5c3d2e" />
          <circle cx="92" cy="118" r="6" fill="#5c3d2e" />
          <circle cx="58" cy="118" r="5" fill="#5c3d2e" />
        </motion.g>
        <motion.g
          clipPath="url(#cc-right)"
          initial={false}
          animate={
            fly
              ? { x: 320, y: 40, rotate: 22, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{
            duration: fly ? 0.7 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="86"
            fill="#c99562"
            stroke="#8b6239"
            strokeWidth="3"
          />
          <circle cx="128" cy="92" r="8" fill="#5c3d2e" />
          <circle cx="108" cy="72" r="6" fill="#5c3d2e" />
          <circle cx="138" cy="118" r="7" fill="#5c3d2e" />
          <circle cx="118" cy="128" r="5" fill="#5c3d2e" />
        </motion.g>
      </svg>
    </div>
  );
}

export function CookiePreferencesButton() {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-left font-medium text-[var(--on-brand)]/85 underline decoration-current/35 underline-offset-2 transition hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
    >
      Cookie settings
    </button>
  );
}

export function CookieConsent({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  /** Bumps when the user opens Cookie settings so stage logic re-runs with a cleared cookie. */
  const [consentSyncKey, setConsentSyncKey] = useState(0);

  const openPreferences = useCallback(() => {
    clearConsentFromDocument();
    try {
      localStorage.setItem(INTRO_LS_KEY, "1");
    } catch {
      /* ignore */
    }
    setConsent(null);
    setConsentSyncKey((k) => k + 1);
  }, []);

  useLayoutEffect(() => {
    const c = readConsentFromDocument();
    setConsent(c);
    setHydrated(true);

    if (c !== null) {
      setStage(null);
      return;
    }

    if (reduceMotion === true) {
      setStage("banner");
      return;
    }

    let introDone = false;
    try {
      introDone = localStorage.getItem(INTRO_LS_KEY) === "1";
    } catch {
      introDone = false;
    }
    if (introDone) {
      setStage("banner");
      return;
    }

    setStage("cookie");
    const t = window.setTimeout(() => setStage("crack"), 600);
    return () => window.clearTimeout(t);
  }, [reduceMotion, consentSyncKey]);

  const onCrackTimingDone = useCallback(() => {
    try {
      localStorage.setItem(INTRO_LS_KEY, "1");
    } catch {
      /* ignore */
    }
    setStage("banner");
  }, []);

  const save = useCallback((analytics: boolean) => {
    const c = buildConsent(analytics);
    writeConsentToDocument(c);
    setConsent(c);
    setStage(null);
    try {
      localStorage.setItem(INTRO_LS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const ctx = useMemo(() => ({ openPreferences }), [openPreferences]);

  const showConsentUi = hydrated && consent === null;
  const showIntroOverlay = showConsentUi && (stage === "cookie" || stage === "crack");
  const showBanner = showConsentUi && stage === "banner";

  useEffect(() => {
    if (!showBanner) {
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.style.paddingBottom =
      "max(7.5rem, calc(env(safe-area-inset-bottom, 0px) + 6.5rem))";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [showBanner]);

  return (
    <CookieConsentContext.Provider value={ctx}>
      {children}
      <GoogleAnalytics analyticsEnabled={consent?.analytics === true} />
      <AnimatePresence>
        {showIntroOverlay ? (
          <motion.div
            key="cookie-intro"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie introduction"
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/55 px-4 pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <CookieCrackGraphic
                isCracking={stage === "crack"}
                onCrackTimingDone={onCrackTimingDone}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showBanner ? (
          <motion.div
            key="cookie-banner"
            role="region"
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-[300] border-t border-white/10 bg-[var(--primary-deep)]/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4 shadow-[0_-12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1 text-sm leading-relaxed text-[var(--on-brand)]/85">
                <p
                  id="cookie-consent-title"
                  className="font-semibold text-[var(--on-brand)]"
                >
                  We value your privacy
                </p>
                <p className="mt-1.5">
                  We use necessary cookies to run this site and optional
                  analytics (Google Analytics) to improve it — only if you
                  accept. Read our{" "}
                  <a
                    href="/cookie-policy"
                    className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/50 underline-offset-2 hover:decoration-[var(--accent)]"
                  >
                    Cookie Policy
                  </a>
                  .
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => save(false)}
                  className="touch-manipulation min-h-11 rounded-xl border border-white/20 bg-[var(--primary-mid)] px-4 text-sm font-semibold text-[var(--on-brand)] transition hover:bg-[var(--primary-mid)]/85 sm:min-h-10 sm:px-5"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => save(true)}
                  className="touch-manipulation min-h-11 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition hover:bg-[var(--accent-hover)] sm:min-h-10 sm:px-5"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </CookieConsentContext.Provider>
  );
}
