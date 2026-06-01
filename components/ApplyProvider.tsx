"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";

type ApplyContextValue = {
  openApply: () => void;
};

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function ApplyProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const openApply = useCallback(() => {
    router.push("/apply");
  }, [router]);

  const value = useMemo(() => ({ openApply }), [openApply]);

  return <ApplyContext.Provider value={value}>{children}</ApplyContext.Provider>;
}

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) {
    throw new Error("useApply must be used within an ApplyProvider");
  }
  return ctx;
}
