import { Metadata } from "next";

import ResultsClient from "@/components/results/results-client";

export const metadata: Metadata = {
  title: "Results | Momently Gift AI",
};

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

function parsePayload(payload?: string): Payload {
  if (!payload) return { gifts: [], meta: { query_summary: null, recipient: null, budget_max: null } };
  try {
    return JSON.parse(decodeURIComponent(payload)) as Payload;
  } catch {
    return { gifts: [], meta: { query_summary: null, recipient: null, budget_max: null } };
  }
}

export default function ResultsPage({ searchParams }: { searchParams: { payload?: string } }) {
  const parsed = parsePayload(searchParams.payload);
  return <ResultsClient payload={parsed} />;
}
