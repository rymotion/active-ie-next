"use client";

import { useCallback, useEffect, useState } from "react";

export type ConsentState = "granted" | "denied" | "unset";

const COOKIE_NAME = "aie-consent";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year
/** Fired by the footer's "manage cookies" affordance to reopen the banner. */
export const OPEN_CONSENT_EVENT = "aie:open-consent";

function readCookie(): ConsentState {
  if (typeof document === "undefined") return "unset";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=(granted|denied)`)
  );
  return (match?.[1] as ConsentState) ?? "unset";
}

export function useConsent() {
  // Start "unset" on both server and client to avoid hydration mismatch;
  // the real cookie value applies after mount.
  const [consent, setConsentState] = useState<ConsentState>("unset");
  const [hydrated, setHydrated] = useState(false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    setConsentState(readCookie());
    setHydrated(true);
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  const setConsent = useCallback((value: "granted" | "denied") => {
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
    setConsentState(value);
    setReopened(false);
  }, []);

  return {
    consent,
    setConsent,
    /** Banner shows when no decision exists yet, or when reopened. */
    bannerVisible: hydrated && (consent === "unset" || reopened),
  };
}

export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
