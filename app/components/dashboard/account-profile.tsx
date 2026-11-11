"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/auth-provider";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";
import {
  getUserDisplayName,
  mapAuthError,
  updateDisplayName,
} from "@/lib/auth";

export function AccountProfile() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const email = user?.email ?? "";

  useEffect(() => {
    if (!user) return;
    setName(user.displayName?.trim() || getUserDisplayName(user));
  }, [user]);

  async function handleSave() {
    const next = name.trim();
    if (!next) {
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }

    setErrorMessage(null);
    setStatus("saving");
    try {
      await updateDisplayName(next);
      await refreshUser();
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(mapAuthError(err));
    }
  }

  return (
    <DashboardShell
      title="Profile"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-5 pb-10">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-4">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoURL}
                alt=""
                className="size-14 rounded-full object-cover ring-2 ring-[#DBEAFE]"
              />
            ) : (
              <span className="flex size-14 items-center justify-center rounded-full bg-[#DBEAFE] text-lg font-bold text-[#1D4ED8]">
                {(name || "U").charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-[#141B2B]">
                {name || "Your profile"}
              </p>
              {email ? (
                <p className="truncate text-sm text-[#64748B]">{email}</p>
              ) : null}
            </div>
          </div>

          {errorMessage ? (
            <p
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
          {status === "saved" ? (
            <p
              className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
              role="status"
            >
              Profile updated.
            </p>
          ) : null}

          <label className="block">
            <span className="text-sm font-bold text-[#141B2B]">Full name</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === "saved" || status === "error") setStatus("idle");
              }}
              className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3.5 text-sm text-[#141B2B] outline-none transition focus:border-[#2b5ce6]"
            />
            <span className="mt-1.5 block text-xs text-[#94A3B8]">
              Enter your full name as it appears on official documents.
            </span>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-[#141B2B]">Email</span>
            <input
              type="email"
              value={email}
              readOnly
              className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 text-sm text-[#64748B] outline-none"
            />
            <span className="mt-1.5 block text-xs text-[#94A3B8]">
              Email comes from your sign-in method and can&apos;t be changed here
              yet.
            </span>
          </label>
        </section>

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={status === "saving" || !user}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6] disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save Changes"}
        </button>

        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
            i
          </span>
          <div className="text-sm">
            <p className="font-bold text-[#141B2B]">Shared account with mobile</p>
            <p className="mt-0.5 text-[#64748B]">
              Your Auth account is created in Firebase; Cloud Function{" "}
              <code className="text-xs">onUserCreate</code> seeds your profile.
              Saving updates Auth and the shared Firestore profile.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
