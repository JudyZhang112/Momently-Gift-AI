"use client";

import { useCallback, useEffect, useState } from "react";
import { Product } from "@/data/product-pools";

const STORAGE_KEY = "momently_saved_products";

function readSaved(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Product[];
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function writeSaved(list: Product[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function useSavedProducts() {
  const [saved, setSaved] = useState<Product[]>([]);

  useEffect(() => {
    setSaved(readSaved());
    const handler = () => setSaved(readSaved());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isSaved = useCallback(
    (id: string) => {
      return saved.some((p) => p.id === id);
    },
    [saved]
  );

  const toggleSave = useCallback(
    (product: Product) => {
      setSaved((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
        writeSaved(next);
        return next;
      });
    },
    []
  );

  return { saved, isSaved, toggleSave };
}
