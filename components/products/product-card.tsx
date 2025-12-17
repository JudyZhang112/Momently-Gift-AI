import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/product-pools";
import { trackEvent } from "@/lib/analytics";
import { useMemo } from "react";

type Props = {
  product: Product;
  tracking?: {
    query_summary: string | null;
    recipient: string | null;
    budget_max: number | null;
  };
  saved?: boolean;
  onSave?: (product: Product) => void;
};

export function ProductCard({ product, tracking, saved, onSave }: Props) {
  const link =
    product.buy_url ||
    `https://www.amazon.com/s?k=${encodeURIComponent(product.name)}&tag=momently-20`;

  const meta = useMemo(
    () => ({
      query_summary: tracking?.query_summary || null,
      recipient: tracking?.recipient || null,
      budget_max: tracking?.budget_max ?? null,
    }),
    [tracking]
  );

  const handleView = () => {
    trackEvent("product_viewed", meta);
  };

  const handleSave = () => {
    trackEvent("product_saved", meta);
    onSave?.(product);
  };

  const priceText = `$${product.price.toFixed(0)}`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold">{product.name}</h3>
            <p className="text-sm text-primary">{priceText}</p>
          </div>
          {product.recipient_tags?.length ? (
            <Badge variant="outline" className="text-xs">
              {product.recipient_tags[0]}
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.reason}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          <Button asChild size="sm" className="flex-1">
            <a href={link} target="_blank" rel="noreferrer" onClick={handleView}>
              View
            </a>
          </Button>
          <Button size="sm" variant="outline" className="flex-1" type="button" onClick={handleSave}>
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
