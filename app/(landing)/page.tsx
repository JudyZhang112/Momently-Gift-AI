import { Hero } from "@/components/landing/hero";
import { ProductSection } from "@/components/landing/product-section";
import { productPools } from "@/data/product-pools";

export default function LandingPage() {
  return (
    <div className="space-y-12 pb-16">
      <Hero />
      <ProductSection
        title="By recipient"
        tabs={[
          { key: "her", label: "For her", products: productPools.recipient.her },
          { key: "him", label: "For him", products: productPools.recipient.him },
          { key: "parents", label: "For parents", products: productPools.recipient.parents },
          { key: "friends", label: "For friends", products: productPools.recipient.friends },
          { key: "kids", label: "For kids", products: productPools.recipient.kids },
        ]}
      />
      <ProductSection
        title="By budget"
        tabs={[
          { key: "under25", label: "Under $25", products: productPools.budget.under25 },
          { key: "25-50", label: "$25–$50", products: productPools.budget.mid25to50 },
          { key: "50-100", label: "$50–$100", products: productPools.budget.mid50to100 },
          { key: "100+", label: "$100+", products: productPools.budget.over100 },
        ]}
      />
      <ProductSection
        title="By interest"
        tabs={[
          { key: "tech", label: "Tech", products: productPools.interest.tech },
          { key: "beauty", label: "Beauty", products: productPools.interest.beauty },
          { key: "cozy", label: "Cozy", products: productPools.interest.cozy },
          { key: "fitness", label: "Fitness", products: productPools.interest.fitness },
          { key: "photo", label: "Photography", products: productPools.interest.photography },
          { key: "fashion", label: "Fashion", products: productPools.interest.fashion },
          { key: "gaming", label: "Gaming", products: productPools.interest.gaming },
        ]}
      />
      <ProductSection
        title="By urgency"
        tabs={[
          { key: "tomorrow", label: "Arrives tomorrow", products: productPools.urgency.tomorrow },
          { key: "week", label: "Arrives this week", products: productPools.urgency.week },
          { key: "digital", label: "Digital gifts", products: productPools.urgency.digital },
          { key: "local", label: "Local pickup", products: productPools.urgency.local },
        ]}
      />
      <ProductSection
        title="Sponsored picks"
        subtitle="Partner offers we love"
        tabs={[{ key: "sponsored", label: "Featured", products: productPools.sponsored }]}
        sponsored
      />
    </div>
  );
}
