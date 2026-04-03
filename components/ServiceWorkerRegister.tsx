"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      void navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` });
    }
  }, []);

  return null;
}
