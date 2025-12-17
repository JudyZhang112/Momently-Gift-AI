"use client";

import { useEffect } from "react";

import { ProductCard } from "@/components/products/product-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/product-pools";
import { trackEvent } from "@/lib/analytics";
import { useSavedProducts } from "@/lib/use-saved";

type ApiGift = {
  id: string;
  name: string;
  price: string;
  image_url: string;
  reason: string;
  buy_url: string;
  category: "recipient" | "budget" | "interest" | "urgency";
};

type Payload = { gifts: ApiGift[]; meta?: { query_summary?: string | null; recipient?: string | null; budget_max?: number | null } };

function toProduct(gift: ApiGift): Product {
  return {
    id: gift.id,
    name: gift.name,
    price: Number(gift.price.replace(/[^0-9.]/g, "")) || 0,
    image_url: gift.image_url,
    reason: gift.reason,
    buy_url: gift.buy_url,
    recipient_tags: gift.category ? [gift.category] : [],
    interest_tags: [],
    urgency_tags: [],
  };
}

export default function ResultsClient({ payload }: { payload: Payload }) {
  const products = payload.gifts.map(toProduct);
  const trackingMeta = {
    query_summary: payload.meta?.query_summary || null,
    recipient: payload.meta?.recipient || null,
    budget_max: payload.meta?.budget_max ?? null,
  };
  const { isSaved, toggleSave } = useSavedProducts();

  useEffect(() => {
    trackEvent("results_shown", trackingMeta);
    return () => trackEvent("exit", trackingMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!products.length) {
    trackEvent("empty_results_shown", trackingMeta);
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>No gifts yet</CardTitle>
            <CardDescription>Find gifts first and we will display them here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/">Go to search</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-6 space-y-1">
        <h1 className="font-display text-3xl">Your gift set</h1>
        <p className="text-muted-foreground">Quick picks based on your prompt.</p>
        <p className="text-xs text-muted-foreground">
          Suggestions are curated based on your input. We may earn a commission at no extra cost to you.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            tracking={trackingMeta}
            saved={isSaved(product.id)}
            onSave={toggleSave}
          />
        ))}
      </div>
    </div>
  );
}
