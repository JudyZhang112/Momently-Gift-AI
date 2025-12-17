"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { getDailyUsage, incrementDailySearchLimit, trackEvent } from "@/lib/analytics";
import { getHeroBadge, getHelperText, getSeasonalTheme } from "@/lib/theme";

const promptChips = [
  "For her",
  "For him",
  "For parents",
  "Under $50",
  "Arrives this week",
  "Safe gift (no risk)",
];

export default function Hero() {
  const [prompt, setPrompt] = useState(
    "A birthday gift for a 20-year-old girl, budget $50, likes photography"
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("momently_search_submitted") === "true";
  });
  const themeTokens = useMemo(() => getSeasonalTheme(new Date()), []);

  type ApiGift = {
    id: string;
    name: string;
    price: string;
    image_url: string;
    reason: string;
    buy_url: string;
  };

  const runSearch = async (text: string) => {
    if (loading || limitReached) return;
    const cacheKey = `payload:${text.toLowerCase()}`;
    if (typeof window !== "undefined") {
      const cached = window.sessionStorage.getItem(cacheKey);
      if (cached) {
        router.push(`/results?payload=${cached}`);
        return;
      }
    }
    try {
      const usage = getDailyUsage(5);
      if (usage.remaining <= 0) {
        setLimitReached(true);
        return;
      }
      setLoading(true);
      setError(null);
      trackEvent("search_submitted", { query_summary: null, recipient: null, budget_max: null });
      const res = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch gifts");
      }
      incrementDailySearchLimit(5);
      const data = (await res.json()) as {
        query_summary: string;
        recipient: string | null;
        budget_max: number | null;
        gifts: ApiGift[];
      };
      trackEvent("search_success", {
        query_summary: data.query_summary || null,
        recipient: data.recipient || null,
        budget_max: data.budget_max ?? null,
      });
      const payload = {
        gifts: data.gifts,
        meta: {
          query_summary: data.query_summary || null,
          recipient: data.recipient || null,
          budget_max: data.budget_max ?? null,
        },
      };
      const encoded = encodeURIComponent(JSON.stringify(payload));
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("momently_search_submitted", "true");
        window.sessionStorage.setItem(cacheKey, encoded);
        setHasSearched(true);
      }
      router.push(`/results?payload=${encoded}`);
    } catch (error) {
      setError("Couldn’t generate gifts. Try a different budget or interest.");
      trackEvent("search_failed", { query_summary: null, recipient: null, budget_max: null });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = prompt.trim();
    if (!text) return;
    await runSearch(text);
  };

  const handleExampleClick = async (example: string) => {
    setPrompt(example);
    await runSearch(example);
  };

  useEffect(() => {
    if (!hasSearched && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasSearched]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-card to-background" aria-hidden />
      <div className="container relative flex min-h-[70vh] flex-col items-center justify-center gap-8 py-12 text-center">
        <Badge className="inline-flex items-center gap-2 bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
          {getHeroBadge(themeTokens)}
        </Badge>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">Find a gift they’ll love</h1>
        <p className="max-w-2xl text-muted-foreground">
          One smart prompt to pull together heartfelt, on-time gift ideas for any holiday or occasion.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-primary/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Gift className="h-5 w-5" />
              </div>
              <Input
                ref={inputRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A birthday gift for a 20-year-old girl, budget $50, likes photography"
                className="h-14 flex-1 rounded-xl border-none bg-transparent text-base"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 rounded-full px-6"
                disabled={loading || limitReached}
              >
                {loading ? "Finding..." : "Find gifts"}
              </Button>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {limitReached ? (
              <div className="rounded-xl border border-border/70 bg-card/80 p-3 text-sm text-foreground">
                You’ve reached today’s free limit. Unlimited access coming soon.
              </div>
            ) : null}
            <p className="text-sm text-muted-foreground">{getHelperText(themeTokens)}</p>
            {loading ? (
              <div className="grid gap-3 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="h-24 animate-pulse bg-muted/50" />
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setPrompt(chip)}
                  className={cn(
                    "rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground transition",
                    "hover:border-primary/50 hover:text-primary"
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Birthday gift for my best friend under $50",
                "Gift for my mom who loves cozy things",
                "Last-minute digital gift",
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className={cn(
                    "rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground transition",
                    "hover:border-primary/50 hover:text-primary"
                  )}
                  disabled={loading || limitReached}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </form>

        <motion.div
          className="relative flex h-40 w-full max-w-2xl items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-4 shadow-xl backdrop-blur dark:bg-muted/40"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute left-4 top-8 flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            🎁 Gift courier en route
          </motion.div>
          <motion.div
            className="absolute right-6 bottom-6 flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-2 text-sm font-semibold text-foreground"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            ✨ Wrapped with care
          </motion.div>
          <div className="text-sm text-muted-foreground">
            Lightweight loop; doesn’t block load. Skip by scrolling anytime.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
