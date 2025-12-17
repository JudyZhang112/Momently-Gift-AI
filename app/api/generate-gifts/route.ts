import { NextResponse } from "next/server";

import { productPools, Product, sampleProducts } from "@/data/product-pools";
import { isTestMode } from "@/lib/env";

type Gift = {
  id: string;
  name: string;
  price: string;
  image_url: string;
  reason: string;
  buy_url: string;
  category: "recipient" | "budget" | "interest" | "urgency";
};

type RequestBody = {
  prompt: string;
};

const makeId = () => Math.random().toString(36).slice(2, 10);
const MAX_PROMPT_LENGTH = 240;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = isTestMode() ? 20 : 10;
const DAILY_LIMIT_MAX = isTestMode() ? 100 : 50;
const dailyRateMap = new Map<string, { count: number; day: string }>();
const CACHE_TTL_MS = 20 * 60_000;
const intentCache = new Map<
  string,
  {
    expires: number;
    gifts: Gift[];
    summary: string;
  }
>();

const rateMap = new Map<string, { count: number; expires: number }>();

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.expires < now) {
    rateMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  rateMap.set(ip, entry);
  return false;
}

function isDailyLimited(ip: string) {
  const today = new Date().toISOString().slice(0, 10);
  const entry = dailyRateMap.get(ip);
  if (!entry || entry.day !== today) {
    dailyRateMap.set(ip, { count: 1, day: today });
    return false;
  }
  if (entry.count >= DAILY_LIMIT_MAX) return true;
  entry.count += 1;
  dailyRateMap.set(ip, entry);
  return false;
}

const baseGifts: Gift[] = [
  {
    id: makeId(),
    name: "Cozy Throw Blanket",
    price: "$48",
    image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
    reason: "Warm, neutral, easy to gift.",
    buy_url: "https://www.amazon.com/s?k=throw+blanket&tag=momently-20",
    category: "recipient",
  },
  {
    id: makeId(),
    name: "Instant Camera Bundle",
    price: "$95",
    image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
    reason: "Prints memories in seconds.",
    buy_url: "https://www.amazon.com/s?k=instant+camera&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Aroma Diffuser + Oils",
    price: "$52",
    image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    reason: "Sets a calm, spa-like vibe.",
    buy_url: "https://www.amazon.com/s?k=aroma+diffuser&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Pearl Huggie Earrings",
    price: "$44",
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    reason: "Timeless and dress-up ready.",
    buy_url: "https://www.amazon.com/s?k=pearl+earrings&tag=momently-20",
    category: "recipient",
  },
  {
    id: makeId(),
    name: "Weighted Blanket",
    price: "$82",
    image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
    reason: "Gentle pressure for better rest.",
    buy_url: "https://www.amazon.com/s?k=weighted+blanket&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Smart Speaker",
    price: "$79",
    image_url: "https://images.unsplash.com/photo-1527443224154-d2eec626e034?auto=format&fit=crop&w=900&q=80",
    reason: "Voice control for music lovers.",
    buy_url: "https://www.amazon.com/s?k=smart+speaker&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Leather Card Holder",
    price: "$38",
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    reason: "Slim, premium, daily carry.",
    buy_url: "https://www.amazon.com/s?k=leather+card+holder&tag=momently-20",
    category: "recipient",
  },
  {
    id: makeId(),
    name: "Yoga Mat + Strap",
    price: "$46",
    image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    reason: "Supportive for daily practice.",
    buy_url: "https://www.amazon.com/s?k=yoga+mat+strap&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Soft Sleep Mask",
    price: "$22",
    image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    reason: "Comfort for frequent travelers.",
    buy_url: "https://www.amazon.com/s?k=silk+sleep+mask&tag=momently-20",
    category: "budget",
  },
  {
    id: makeId(),
    name: "STEM Robot Kit",
    price: "$55",
    image_url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    reason: "Builds coding curiosity early.",
    buy_url: "https://www.amazon.com/s?k=stem+robot+kit&tag=momently-20",
    category: "recipient",
  },
  {
    id: makeId(),
    name: "Mini Projector",
    price: "$89",
    image_url: "https://images.unsplash.com/photo-1444044205806-38f3ed106c10?auto=format&fit=crop&w=900&q=80",
    reason: "Movie nights anywhere, anytime.",
    buy_url: "https://www.amazon.com/s?k=mini+projector&tag=momently-20",
    category: "urgency",
  },
  {
    id: makeId(),
    name: "Digital Frame",
    price: "$118",
    image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
    reason: "Auto-updates with shared photos.",
    buy_url: "https://www.amazon.com/s?k=digital+frame&tag=momently-20",
    category: "urgency",
  },
  {
    id: makeId(),
    name: "Herbal Tea Box",
    price: "$26",
    image_url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
    reason: "Cozy sips for quiet evenings.",
    buy_url: "https://www.amazon.com/s?k=herbal+tea+box&tag=momently-20",
    category: "budget",
  },
  {
    id: makeId(),
    name: "Matcha Starter Kit",
    price: "$54",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    reason: "Calming morning ritual set.",
    buy_url: "https://www.amazon.com/s?k=matcha+kit&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Bouquet Delivery",
    price: "$48",
    image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    reason: "Fresh stems arriving tomorrow.",
    buy_url: "https://www.amazon.com/s?k=flower+bouquet&tag=momently-20",
    category: "urgency",
  },
  {
    id: makeId(),
    name: "Wireless Earbuds",
    price: "$129",
    image_url: "https://images.unsplash.com/photo-1518444057712-a0a1f66f7e57?auto=format&fit=crop&w=900&q=80",
    reason: "Noise-free focus on the go.",
    buy_url: "https://www.amazon.com/s?k=wireless+earbuds&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Minimal Watch",
    price: "$120",
    image_url: "https://images.unsplash.com/photo-1451290337906-ac938fcadfce?auto=format&fit=crop&w=900&q=80",
    reason: "Clean style, daily wear ready.",
    buy_url: "https://www.amazon.com/s?k=minimal+watch&tag=momently-20",
    category: "recipient",
  },
  {
    id: makeId(),
    name: "Gaming Headset",
    price: "$78",
    image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    reason: "Comfortable for long sessions.",
    buy_url: "https://www.amazon.com/s?k=gaming+headset&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Spa Gift Card",
    price: "$85",
    image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    reason: "Instant delivery, pure relaxation.",
    buy_url: "https://www.amazon.com/s?k=spa+gift+card&tag=momently-20",
    category: "urgency",
  },
  {
    id: makeId(),
    name: "Custom Photo Book",
    price: "$68",
    image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
    reason: "Collect memories in print.",
    buy_url: "https://www.amazon.com/s?k=photo+book&tag=momently-20",
    category: "recipient",
  },
  {
    id: makeId(),
    name: "Premium Candle Duo",
    price: "$62",
    image_url: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80",
    reason: "Soft scents for cozy nights.",
    buy_url: "https://www.amazon.com/s?k=premium+candle&tag=momently-20",
    category: "budget",
  },
  {
    id: makeId(),
    name: "Smart Jump Rope",
    price: "$39",
    image_url: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80",
    reason: "Track cardio anywhere easily.",
    buy_url: "https://www.amazon.com/s?k=smart+jump+rope&tag=momently-20",
    category: "interest",
  },
  {
    id: makeId(),
    name: "Silk Pillowcase",
    price: "$42",
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    reason: "Smooth skin and hair mornings.",
    buy_url: "https://www.amazon.com/s?k=silk+pillowcase&tag=momently-20",
    category: "recipient",
  },
];

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json({ error: "Prompt too long" }, { status: 400 });
    }

    const ip = getIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests, please wait" }, { status: 429 });
    }
    if (isDailyLimited(ip)) {
      return NextResponse.json({ error: "Daily limit reached, try again tomorrow" }, { status: 429 });
    }

    const banned = /(abuse|weapon|hate|violence|explosive|harm)/i;
    if (banned.test(prompt)) {
      return NextResponse.json({ error: "Prompt not allowed" }, { status: 400 });
    }

    const summary =
      prompt.length > 120 ? `${prompt.slice(0, 117)}...` : prompt || "Gift ideas requested";

    const cacheKey = summary.toLowerCase();
    const now = Date.now();
    const cached = intentCache.get(cacheKey);
    if (cached && cached.expires > now) {
      return NextResponse.json({ query_summary: cached.summary, gifts: cached.gifts });
    }

    const lower = prompt.toLowerCase();

    const recipient =
      /her|she|girlfriend|wife/.test(lower)
        ? "for_her"
        : /him|he|boyfriend|husband/.test(lower)
        ? "for_him"
        : /parent|mom|mother|dad|father/.test(lower)
        ? "for_parents"
        : /friend/.test(lower)
        ? "for_friends"
        : /kid|child|son|daughter/.test(lower)
        ? "for_kids"
        : "unknown";

    const budgetMatch = lower.match(/\$?\s?(\d{1,4})/);
    const budget_max = budgetMatch ? Number(budgetMatch[1]) : null;

    const interestsList = [
      { key: "tech", pattern: /(tech|gadget|device|smart)/ },
      { key: "beauty", pattern: /(beauty|skincare|makeup|spa)/ },
      { key: "cozy", pattern: /(cozy|home|blanket|candle|warm)/ },
      { key: "fitness", pattern: /(fitness|gym|yoga|workout|run)/ },
      { key: "photography", pattern: /(photo|camera|film)/ },
      { key: "fashion", pattern: /(fashion|style|wear|accessor)/ },
      { key: "gaming", pattern: /(game|gaming|xbox|playstation|switch|pc)/ },
    ];
    const interests = interestsList.filter((i) => i.pattern.test(lower)).map((i) => i.key);

    const urgency =
      /tomorrow|next day|overnight/.test(lower)
        ? "tomorrow"
        : /week|this week|few days/.test(lower)
        ? "this_week"
        : /digital|email|instant/.test(lower)
        ? "digital"
        : "none";

    const gift_count = Math.min(10, Math.max(6, 8));

    const pools: Product[] = [];

    const recipientMap = {
      for_her: productPools.recipient.her,
      for_him: productPools.recipient.him,
      for_parents: productPools.recipient.parents,
      for_friends: productPools.recipient.friends,
      for_kids: productPools.recipient.kids,
    } as const;
    if (recipient in recipientMap) {
      pools.push(...recipientMap[recipient as keyof typeof recipientMap]);
    }

    if (budget_max !== null) {
      if (budget_max <= 25) pools.push(...productPools.budget.under25);
      else if (budget_max <= 50) pools.push(...productPools.budget.mid25to50);
      else if (budget_max <= 100) pools.push(...productPools.budget.mid50to100);
      else pools.push(...productPools.budget.over100);
    }

    const interestMap: Record<string, Product[]> = {
      tech: productPools.interest.tech,
      beauty: productPools.interest.beauty,
      cozy: productPools.interest.cozy,
      fitness: productPools.interest.fitness,
      photography: productPools.interest.photography,
      fashion: productPools.interest.fashion,
      gaming: productPools.interest.gaming,
    };
    interests.forEach((i) => {
      if (interestMap[i]) pools.push(...interestMap[i]);
    });

    const urgencyMap = {
      tomorrow: productPools.urgency.tomorrow,
      this_week: productPools.urgency.week,
      digital: productPools.urgency.digital,
    } as const;
    if (urgency in urgencyMap) {
      pools.push(...urgencyMap[urgency as keyof typeof urgencyMap]);
    }

    const allProducts = Object.values(productPools.recipient).flat()
      .concat(
        productPools.budget.under25,
        productPools.budget.mid25to50,
        productPools.budget.mid50to100,
        productPools.budget.over100,
        productPools.interest.tech,
        productPools.interest.beauty,
        productPools.interest.cozy,
        productPools.interest.fitness,
        productPools.interest.photography,
        productPools.interest.fashion,
        productPools.interest.gaming,
        productPools.urgency.tomorrow,
        productPools.urgency.week,
        productPools.urgency.digital,
        productPools.urgency.local
      );

    let source = pools.length ? pools : allProducts;

    const scored = source.map((p) => {
      let score = 0;
      if (budget_max !== null) {
        const diff = Math.abs(p.price - budget_max);
        score -= diff; // closer is better
      }
      interests.forEach((i) => {
        if (p.reason.toLowerCase().includes(i) || p.name.toLowerCase().includes(i)) score += 5;
      });
      return { p, score };
    });

    const sorted =
      scored.length > 0
        ? scored.sort((a, b) => b.score - a.score).map((s) => s.p)
        : sampleProducts(allProducts, allProducts.length);

    const poolForSelection = sorted.length ? sorted : allProducts;
    let selected = sampleProducts(poolForSelection, gift_count);

    if (!selected.length && budget_max !== null) {
      const expanded = source.filter((p) => p.price <= budget_max * 1.2);
      if (expanded.length) {
        selected = sampleProducts(expanded, gift_count);
      }
    }

    if (!selected.length && interests.length) {
      source = allProducts;
      selected = sampleProducts(source, gift_count);
    }

    if (!selected.length) {
      selected = sampleProducts(allProducts, gift_count);
    }

    const gifts: Gift[] = selected.map((p) => ({
      id: p.id || makeId(),
      name: p.name,
      price: `$${p.price.toFixed(0)}`,
      image_url: p.image_url,
      reason: p.reason,
      buy_url:
        p.buy_url || `https://www.amazon.com/s?k=${encodeURIComponent(p.name)}&tag=momently-20`,
      category: "recipient",
    }));

    intentCache.set(cacheKey, { gifts, summary, expires: now + CACHE_TTL_MS });

    return NextResponse.json({
      query_summary: summary,
      recipient,
      budget_max,
      gifts,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to generate gifts" }, { status: 500 });
  }
}
