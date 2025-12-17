"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product, sampleProducts } from "@/data/product-pools";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useSavedProducts } from "@/lib/use-saved";

type Tab = {
  key: string;
  label: string;
  products: Product[];
};

type Props = {
  title: string;
  subtitle?: string;
  tabs: Tab[];
  defaultCount?: number;
  sponsored?: boolean;
};

export default function ProductSection({ title, subtitle, tabs, defaultCount = 3, sponsored }: Props) {
  const { saved, isSaved, toggleSave } = useSavedProducts();
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "");
  const [cache, setCache] = useState<Record<string, { list: Product[]; index: number }>>(() => {
    const initial: Record<string, { list: Product[]; index: number }> = {};
    tabs.forEach((t) => {
      const shuffled = sampleProducts(t.products, t.products.length);
      initial[t.key] = { list: shuffled, index: 0 };
    });
    return initial;
  });

  const getVisible = (tabKey: string) => {
    const entry = cache[tabKey];
    if (!entry) return [];
    const { list, index } = entry;
    const end = index + defaultCount;
    if (end <= list.length) return list.slice(index, end);
    const overflow = end - list.length;
    return [...list.slice(index), ...list.slice(0, overflow)];
  };

  const [visible, setVisible] = useState(() => getVisible(tabs[0]?.key ?? ""));

  const activeProducts = useMemo(() => {
    const tab = tabs.find((t) => t.key === activeTab);
    return tab ? tab.products : [];
  }, [activeTab, tabs]);

  const refresh = () => {
    setCache((prev) => {
      const entry = prev[activeTab];
      if (!entry) return prev;
      const nextIndex = (entry.index + defaultCount) % entry.list.length;
      const updated = { ...prev, [activeTab]: { ...entry, index: nextIndex } };
      setVisible(getVisible(activeTab));
      trackEvent("refresh_clicked", { query_summary: null, recipient: null, budget_max: null });
      return updated;
    });
  };

  const changeTab = (key: string) => {
    setActiveTab(key);
    setVisible(getVisible(key));
    if (title.toLowerCase().includes("urgency")) {
      trackEvent("urgency_filter_used", { query_summary: null, recipient: null, budget_max: null });
    }
  };

  return (
    <section className="container space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl">{title}</h2>
            {sponsored && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                Sponsored
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/generate" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            See all
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => changeTab(tab.key)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition",
              activeTab === tab.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-muted/60 text-muted-foreground hover:border-primary/40"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            tracking={{ query_summary: null, recipient: null, budget_max: null }}
            saved={isSaved(product.id)}
            onSave={toggleSave}
          />
        ))}
      </div>
    </section>
  );
}
