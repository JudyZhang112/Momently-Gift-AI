"use client";

import { useEffect, useState } from "react";

import { isTestMode } from "@/lib/env";

function readFeedback() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("momently_feedback") || "";
}

export function Footer() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const testMode = isTestMode();

  useEffect(() => {
    setFeedback(readFeedback());
  }, []);

  const submitFeedback = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("momently_feedback", feedback);
    setShowFeedback(false);
  };

  return (
    <footer className="border-t border-border/50">
      <div className="container flex flex-col gap-2 py-6 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} Momently. All rights reserved.</span>
          <button
            type="button"
            className="text-primary underline-offset-4 hover:underline"
            onClick={() => setShowFeedback((v) => !v)}
          >
            Give feedback
          </button>
        </div>
        {testMode ? (
          <p className="text-xs text-primary">Early test version — feedback welcome.</p>
        ) : null}
        {showFeedback ? (
          <div className="space-y-2 rounded-xl border border-border/70 bg-card/80 p-3">
            <textarea
              className="w-full rounded-lg border border-border bg-card p-2 text-sm"
              placeholder="What felt confusing or missing?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-1 text-sm"
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
                onClick={submitFeedback}
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </footer>
  );
}

export default Footer;
