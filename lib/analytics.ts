const SESSION_KEY = "momently_session_id";
const USAGE_KEY = "momently_daily_usage";

function getSessionId() {
  if (typeof window === "undefined") return "server";
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = Math.random().toString(36).slice(2, 10);
  window.sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

export type TrackingMeta = {
  query_summary: string | null;
  recipient: string | null;
  budget_max: number | null;
};

export function trackEvent(
  name:
    | "page_load"
    | "results_shown"
    | "urgency_filter_used"
    | "exit"
    | "search_submitted"
    | "search_success"
    | "search_failed"
    | "refresh_clicked"
    | "product_viewed"
    | "product_saved"
    | "empty_results_shown",
  meta: TrackingMeta
) {
  // Placeholder hook for future analytics. Logs only in test mode.
  const payload = {
    event: name,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    ...meta,
  };
  if (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_TEST_MODE === "true" || process.env.TEST_MODE === "true")) {
    // eslint-disable-next-line no-console
    console.info("[analytics]", payload);
  }
}

export function incrementDailySearchLimit(limit: number) {
  if (typeof window === "undefined") return { count: 0, remaining: limit };
  const today = new Date().toISOString().slice(0, 10);
  const stored = window.localStorage.getItem(USAGE_KEY);
  let data: { day: string; count: number } = { day: today, count: 0 };
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { day: string; count: number };
      if (parsed.day === today) data = parsed;
    } catch {
      // ignore parse errors
    }
  }
  if (data.count >= limit) {
    return { count: data.count, remaining: 0 };
  }
  const next = { day: today, count: data.count + 1 };
  window.localStorage.setItem(USAGE_KEY, JSON.stringify(next));
  return { count: next.count, remaining: Math.max(limit - next.count, 0) };
}

export function getDailyUsage(limit: number) {
  if (typeof window === "undefined") return { count: 0, remaining: limit };
  const today = new Date().toISOString().slice(0, 10);
  const stored = window.localStorage.getItem(USAGE_KEY);
  if (!stored) return { count: 0, remaining: limit };
  try {
    const parsed = JSON.parse(stored) as { day: string; count: number };
    if (parsed.day !== today) return { count: 0, remaining: limit };
    return { count: parsed.count, remaining: Math.max(limit - parsed.count, 0) };
  } catch {
    return { count: 0, remaining: limit };
  }
}
