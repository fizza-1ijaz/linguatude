export const CONSENT_COOKIE_NAME = "linguatude_cookie_consent";

/** 12 months in seconds */
const MAX_AGE = 60 * 60 * 24 * 365;

export type StoredConsent = {
  v: 1;
  analytics: boolean;
  updatedAt: string;
};

export function readConsentFromDocument(): StoredConsent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.split("=")
    .slice(1)
    .join("=");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as StoredConsent;
    if (parsed.v !== 1 || typeof parsed.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsentToDocument(consent: StoredConsent): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(consent));
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearConsentFromDocument(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0`;
}

export function buildConsent(analytics: boolean): StoredConsent {
  return {
    v: 1,
    analytics,
    updatedAt: new Date().toISOString(),
  };
}
