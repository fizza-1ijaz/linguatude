"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signOut as firebaseSignOut } from "@/lib/auth";
import { touchLastActive } from "@/lib/user-profile";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
      if (next) {
        // Do not create users/{uid} — Cloud Function onUserCreate owns that.
        void touchLastActive(next);
      }
    });
    return unsub;
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut();
  }, []);

  const refreshUser = useCallback(async () => {
    if (!auth.currentUser) {
      setUser(null);
      return;
    }
    await auth.currentUser.reload();
    setUser(auth.currentUser);
    await touchLastActive(auth.currentUser);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signOut, refreshUser }),
    [user, loading, signOut, refreshUser],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
