"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  mapAuthError,
  postAuthPath,
  signInApple,
  signInGoogle,
} from "@/lib/auth";

type Props = {
  /** New social accounts go to onboarding; returning users use postAuthPath. */
  mode: "login" | "signup";
};

type SocialProvider = "google" | "apple";

export function SocialAuthButtons({ mode }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<SocialProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSocial(provider: SocialProvider) {
    if (busy) return;
    setBusy(provider);
    setError(null);
    try {
      const cred =
        provider === "google" ? await signInGoogle() : await signInApple();
      const isNew =
        cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime;
      if (mode === "signup" || isNew) {
        router.push("/onboarding");
      } else {
        router.push(await postAuthPath());
      }
    } catch (err) {
      setError(mapAuthError(err));
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => void handleSocial("google")}
          disabled={busy !== null}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#1e1b4b] transition hover:bg-[#f9fafb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 disabled:opacity-60"
        >
          <Image
            src="/auth/google.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px]"
          />
          {busy === "google" ? "…" : "Google"}
        </button>
        <button
          type="button"
          onClick={() => void handleSocial("apple")}
          disabled={busy !== null}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#1e1b4b] transition hover:bg-[#f9fafb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 disabled:opacity-60"
        >
          <Image
            src="/auth/apple.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px]"
          />
          {busy === "apple" ? "…" : "Apple"}
        </button>
      </div>
    </div>
  );
}
