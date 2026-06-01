"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ApplyContextValue = {
  isOpen: boolean;
  openApply: () => void;
  closeApply: () => void;
};

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function ApplyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openApply = useCallback(() => setIsOpen(true), []);
  const closeApply = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openApply, closeApply }),
    [isOpen, openApply, closeApply]
  );

  return <ApplyContext.Provider value={value}>{children}</ApplyContext.Provider>;
}

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) {
    throw new Error("useApply must be used within an ApplyProvider");
  }
  return ctx;
}
