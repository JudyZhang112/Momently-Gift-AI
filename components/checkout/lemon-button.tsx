import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LemonButton() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL || "https://www.lemonsqueezy.com";

  return (
    <Button asChild size="lg" className="w-full sm:w-auto">
      <Link href={checkoutUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4" /> Unlock premium
      </Link>
    </Button>
  );
}
