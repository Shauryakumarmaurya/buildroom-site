"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  authEnabled: boolean;
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const supabase = getSupabaseBrowser();
  const authEnabled = !!supabase;

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  // close the login modal automatically once signed in
  useEffect(() => {
    if (user) setIsAuthOpen(false);
  }, [user]);

  const openAuth = useCallback(() => setIsAuthOpen(true), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  const signInWithEmail = useCallback(
    async (email: string) => {
      if (!supabase) return { error: "login isn't configured yet." };
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });
      return { error: error ? error.message : null };
    },
    [supabase]
  );

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return { error: "login isn't configured yet." };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    return { error: error ? error.message : null };
  }, [supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  const value = useMemo(
    () => ({
      user,
      ready,
      authEnabled,
      isAuthOpen,
      openAuth,
      closeAuth,
      signInWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [
      user,
      ready,
      authEnabled,
      isAuthOpen,
      openAuth,
      closeAuth,
      signInWithEmail,
      signInWithGoogle,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
