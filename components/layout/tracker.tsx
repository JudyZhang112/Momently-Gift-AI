"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function Tracker() {
  useEffect(() => {
    trackEvent("page_load", { query_summary: null, recipient: null, budget_max: null });
    const handler = () => trackEvent("exit", { query_summary: null, recipient: null, budget_max: null });
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);
  return null;
}
