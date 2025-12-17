"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useSavedProducts } from "@/lib/use-saved";

export function Header() {
  const { saved } = useSavedProducts();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(saved.length);
  }, [saved]);

  return (
    <header className="border-b border-border/50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold">
          Momently
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            Saved {count}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
