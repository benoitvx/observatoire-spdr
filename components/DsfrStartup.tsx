"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dsfr?: {
      start: () => void;
      stop: () => void;
      version?: string;
    };
  }
}

/**
 * Re-initialise le JS DSFR après l'hydratation React.
 * Nécessaire pour que les éléments rendus par React (modales, disclosures)
 * soient découverts par le système de composants DSFR natif.
 */
export function DsfrStartup() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.dsfr) {
      window.dsfr.start();
    }
  }, []);

  return null;
}
