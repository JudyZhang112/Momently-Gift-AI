export type Product = {
  id: string;
  name: string;
  price: number;
  recipient_tags: string[];
  interest_tags: string[];
  urgency_tags: string[];
  image_url: string;
  buy_url: string;
  reason: string;
};

type BaseProduct = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  buy_url: string;
  reason: string;
};

function normalize(products: BaseProduct[], tags: Partial<Product>): Product[] {
  return products.map((p) => ({
    ...p,
    recipient_tags: tags.recipient_tags || [],
    interest_tags: tags.interest_tags || [],
    urgency_tags: tags.urgency_tags || [],
  }));
}

const recipientPools = {
  her: normalize(
    [
      {
        id: "her-1",
        name: "Pearl Huggie Earrings",
        price: 48,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=pearl+earrings&tag=momently-20",
        reason: "Timeless shine for daily wear.",
      },
      {
        id: "her-2",
        name: "Blush Cashmere Scarf",
        price: 72,
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=cashmere+scarf&tag=momently-20",
        reason: "Soft warmth with a gentle hue.",
      },
      {
        id: "her-3",
        name: "Rose Vanilla Candle",
        price: 28,
        image_url: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=rose+candle&tag=momently-20",
        reason: "Cozy scent for calm nights.",
      },
    ],
    { recipient_tags: ["for_her"] }
  ),
  him: normalize(
    [
      {
        id: "him-1",
        name: "Walnut Desk Charger",
        price: 59,
        image_url: "https://images.unsplash.com/photo-1527443224154-d2eec626e034?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=wireless+desk+charger&tag=momently-20",
        reason: "Keeps his setup tidy and premium.",
      },
      {
        id: "him-2",
        name: "Weekend Duffel",
        price: 95,
        image_url: "https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=weekend+duffel&tag=momently-20",
        reason: "Ready for quick trips together.",
      },
      {
        id: "him-3",
        name: "Espresso Gift Set",
        price: 42,
        image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=espresso+gift+set&tag=momently-20",
        reason: "Slow-morning coffee ritual.",
      },
    ],
    { recipient_tags: ["for_him"] }
  ),
  parents: normalize(
    [
      {
        id: "parents-1",
        name: "Heirloom Recipe Journal",
        price: 36,
        image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=recipe+journal&tag=momently-20",
        reason: "Collect family dishes in one place.",
      },
      {
        id: "parents-2",
        name: "Digital Frame",
        price: 119,
        image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=digital+frame&tag=momently-20",
        reason: "Auto-updates with shared photos.",
      },
      {
        id: "parents-3",
        name: "Tea Tasting Box",
        price: 34,
        image_url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=tea+tasting+box&tag=momently-20",
        reason: "Slow afternoons made special.",
      },
    ],
    { recipient_tags: ["for_parents"] }
  ),
  friends: normalize(
    [
      {
        id: "friends-1",
        name: "Movie Night Projector",
        price: 78,
        image_url: "https://images.unsplash.com/photo-1444044205806-38f3ed106c10?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=mini+projector&tag=momently-20",
        reason: "Instant cozy hangs anywhere.",
      },
      {
        id: "friends-2",
        name: "Matcha Starter Kit",
        price: 52,
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=matcha+kit&tag=momently-20",
        reason: "A calm ritual to share.",
      },
      {
        id: "friends-3",
        name: "Photo Strip Printer",
        price: 88,
        image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=photo+strip+printer&tag=momently-20",
        reason: "Capture nights out as keepsakes.",
      },
    ],
    { recipient_tags: ["for_friends"] }
  ),
  kids: normalize(
    [
      {
        id: "kids-1",
        name: "STEM Robot Kit",
        price: 49,
        image_url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=stem+robot+kit&tag=momently-20",
        reason: "Hands-on coding fun.",
      },
      {
        id: "kids-2",
        name: "Soft Plush Bunny",
        price: 24,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=plush+bunny&tag=momently-20",
        reason: "Adorable and nap-ready.",
      },
      {
        id: "kids-3",
        name: "Creative Art Set",
        price: 29,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=creative+art+set&tag=momently-20",
        reason: "Spark imagination with color.",
      },
    ],
    { recipient_tags: ["for_kids"] }
  ),
};

const budgetPools = {
  under25: normalize(
    [
      {
        id: "u25-1",
        name: "Ceramic Mug",
        price: 18,
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=ceramic+mug&tag=momently-20",
        reason: "Cozy sips all season.",
      },
      {
        id: "u25-2",
        name: "Mini Succulent Trio",
        price: 22,
        image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=mini+succulent+trio&tag=momently-20",
        reason: "Low-maintenance greenery.",
      },
      {
        id: "u25-3",
        name: "Silk Sleep Mask",
        price: 19,
        image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=silk+sleep+mask&tag=momently-20",
        reason: "Comfort for travelers.",
      },
    ],
    { recipient_tags: [], interest_tags: [], urgency_tags: [] }
  ),
  mid25to50: normalize(
    [
      {
        id: "25-50-1",
        name: "Aroma Diffuser",
        price: 38,
        image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=aroma+diffuser&tag=momently-20",
        reason: "Sets a soothing vibe fast.",
      },
      {
        id: "25-50-2",
        name: "Travel Jewelry Case",
        price: 42,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=travel+jewelry+case&tag=momently-20",
        reason: "Keeps favorites safe on trips.",
      },
      {
        id: "25-50-3",
        name: "Cozy Throw Blanket",
        price: 48,
        image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=throw+blanket&tag=momently-20",
        reason: "Warm and movie-night ready.",
      },
    ],
    {}
  ),
  mid50to100: normalize(
    [
      {
        id: "50-100-1",
        name: "Instant Camera",
        price: 88,
        image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=instant+camera&tag=momently-20",
        reason: "Prints memories on the spot.",
      },
      {
        id: "50-100-2",
        name: "Handcrafted Speaker",
        price: 92,
        image_url: "https://images.unsplash.com/photo-1527443224154-d2eec626e034?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=wood+speaker&tag=momently-20",
        reason: "Rich sound with warm finish.",
      },
      {
        id: "50-100-3",
        name: "Spa Night Kit",
        price: 65,
        image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=spa+kit&tag=momently-20",
        reason: "Everything for a reset evening.",
      },
    ],
    {}
  ),
  over100: normalize(
    [
      {
        id: "100-1",
        name: "Premium Cashmere Wrap",
        price: 160,
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=cashmere+wrap&tag=momently-20",
        reason: "Luxuriously soft, heirloom quality.",
      },
      {
        id: "100-2",
        name: "Luxe Espresso Machine",
        price: 220,
        image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=espresso+machine&tag=momently-20",
        reason: "Cafe-grade coffee at home.",
      },
      {
        id: "100-3",
        name: "Smart Suitcase",
        price: 189,
        image_url: "https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=smart+suitcase&tag=momently-20",
        reason: "Trackable, durable, trip-ready.",
      },
    ],
    {}
  ),
};

const interestPools = {
  tech: normalize(
    [
      {
        id: "tech-1",
        name: "Noise-Canceling Earbuds",
        price: 129,
        image_url: "https://images.unsplash.com/photo-1518444057712-a0a1f66f7e57?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=wireless+earbuds&tag=momently-20",
        reason: "Noise-free focus on the go.",
      },
      {
        id: "tech-2",
        name: "Smart Home Starter",
        price: 99,
        image_url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=smart+home+kit&tag=momently-20",
        reason: "Lights and routines in minutes.",
      },
      {
        id: "tech-3",
        name: "Mini Projector",
        price: 85,
        image_url: "https://images.unsplash.com/photo-1444044205806-38f3ed106c10?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=mini+projector&tag=momently-20",
        reason: "Pocket cinema for gatherings.",
      },
    ],
    { interest_tags: ["tech"] }
  ),
  beauty: normalize(
    [
      {
        id: "beauty-1",
        name: "Silk Pillowcase",
        price: 42,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=silk+pillowcase&tag=momently-20",
        reason: "Smooth skin and hair mornings.",
      },
      {
        id: "beauty-2",
        name: "Glow Serum Set",
        price: 58,
        image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=glow+serum+set&tag=momently-20",
        reason: "Hydrated, luminous skin.",
      },
      {
        id: "beauty-3",
        name: "Spa Headband + Roller",
        price: 29,
        image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=spa+roller+set&tag=momently-20",
        reason: "At-home facial upgrade.",
      },
    ],
    { interest_tags: ["beauty"] }
  ),
  cozy: normalize(
    [
      {
        id: "cozy-1",
        name: "Cloud Slippers",
        price: 32,
        image_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=cloud+slippers&tag=momently-20",
        reason: "Pillowy soft for downtime.",
      },
      {
        id: "cozy-2",
        name: "Weighted Blanket",
        price: 89,
        image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=weighted+blanket&tag=momently-20",
        reason: "Calming comfort for rest.",
      },
      {
        id: "cozy-3",
        name: "Tea Sampler",
        price: 26,
        image_url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=tea+sampler&tag=momently-20",
        reason: "Soothing flavors for nights in.",
      },
    ],
    { interest_tags: ["cozy"] }
  ),
  fitness: normalize(
    [
      {
        id: "fit-1",
        name: "Smart Jump Rope",
        price: 39,
        image_url: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=smart+jump+rope&tag=momently-20",
        reason: "Track cardio anywhere.",
      },
      {
        id: "fit-2",
        name: "Yoga Mat + Strap",
        price: 48,
        image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=yoga+mat+and+strap&tag=momently-20",
        reason: "Supportive flow at home.",
      },
      {
        id: "fit-3",
        name: "Recovery Roller",
        price: 29,
        image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=recovery+roller&tag=momently-20",
        reason: "Loosens tight spots post-workout.",
      },
    ],
    { interest_tags: ["fitness"] }
  ),
  photography: normalize(
    [
      {
        id: "photo-1",
        name: "Instant Film Pack",
        price: 35,
        image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=instant+film&tag=momently-20",
        reason: "Keep memories tangible.",
      },
      {
        id: "photo-2",
        name: "Softbox Light",
        price: 68,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=softbox+light&tag=momently-20",
        reason: "Better portraits indoors.",
      },
      {
        id: "photo-3",
        name: "Camera Strap",
        price: 44,
        image_url: "https://images.unsplash.com/photo-1527443224154-d2eec626e034?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=camera+strap&tag=momently-20",
        reason: "Comfortable carry all day.",
      },
    ],
    { interest_tags: ["photography"] }
  ),
  fashion: normalize(
    [
      {
        id: "fashion-1",
        name: "Minimal Watch",
        price: 120,
        image_url: "https://images.unsplash.com/photo-1451290337906-ac938fcadfce?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=minimal+watch&tag=momently-20",
        reason: "Clean lines for any outfit.",
      },
      {
        id: "fashion-2",
        name: "Leather Card Holder",
        price: 48,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=leather+card+holder&tag=momently-20",
        reason: "Slim and premium daily carry.",
      },
      {
        id: "fashion-3",
        name: "Wool Beanie",
        price: 32,
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=wool+beanie&tag=momently-20",
        reason: "Warmth with style.",
      },
    ],
    { interest_tags: ["fashion"] }
  ),
  gaming: normalize(
    [
      {
        id: "gaming-1",
        name: "Wireless Controller",
        price: 64,
        image_url: "https://images.unsplash.com/photo-1581898518804-8c32ff3272a0?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=wireless+controller&tag=momently-20",
        reason: "Extra player ready anytime.",
      },
      {
        id: "gaming-2",
        name: "RGB Desk Mat",
        price: 38,
        image_url: "https://images.unsplash.com/photo-1600267165505-4a5991f8035e?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=rgb+desk+mat&tag=momently-20",
        reason: "Immersive setup glow.",
      },
      {
        id: "gaming-3",
        name: "Comfort Headset",
        price: 79,
        image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=gaming+headset&tag=momently-20",
        reason: "Crisp sound for sessions.",
      },
    ],
    { interest_tags: ["gaming"] }
  ),
};

const urgencyPools = {
  tomorrow: normalize(
    [
      {
        id: "fast-1",
        name: "Prime Bouquet",
        price: 45,
        image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=flower+bouquet+prime&tag=momently-20",
        reason: "Arrives next-day with a note.",
      },
      {
        id: "fast-2",
        name: "Digital Frame (Fast Ship)",
        price: 110,
        image_url: "https://images.unsplash.com/photo-1516035050185-99b3e264a5a1?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=digital+frame+fast+shipping&tag=momently-20",
        reason: "Preload photos before gifting.",
      },
      {
        id: "fast-3",
        name: "Cozy Hoodie",
        price: 58,
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=cozy+hoodie+prime&tag=momently-20",
        reason: "Comfort delivered by tomorrow.",
      },
    ],
    { urgency_tags: ["tomorrow"] }
  ),
  week: normalize(
    [
      {
        id: "week-1",
        name: "Artisanal Chocolate Box",
        price: 36,
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=artisanal+chocolate+box&tag=momently-20",
        reason: "Arrives in days, delight on arrival.",
      },
      {
        id: "week-2",
        name: "Custom Photo Book",
        price: 68,
        image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=custom+photo+book&tag=momently-20",
        reason: "Memories bound beautifully.",
      },
      {
        id: "week-3",
        name: "Cozy Slippers",
        price: 32,
        image_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=cozy+slippers&tag=momently-20",
        reason: "Snug by the weekend.",
      },
    ],
    { urgency_tags: ["this_week"] }
  ),
  digital: normalize(
    [
      {
        id: "digital-1",
        name: "Masterclass Pass",
        price: 90,
        image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=masterclass+gift&tag=momently-20",
        reason: "Instant access to premium classes.",
      },
      {
        id: "digital-2",
        name: "Music Streaming Gift",
        price: 30,
        image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=music+streaming+gift&tag=momently-20",
        reason: "Delivered instantly to inbox.",
      },
      {
        id: "digital-3",
        name: "Meditation App Year",
        price: 60,
        image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=meditation+app+gift&tag=momently-20",
        reason: "Calm on-demand, same day.",
      },
    ],
    { urgency_tags: ["digital"] }
  ),
  local: normalize(
    [
      {
        id: "local-1",
        name: "Spa e-Gift Card",
        price: 75,
        image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=spa+gift+card&tag=momently-20",
        reason: "Redeemable nearby, instant delivery.",
      },
      {
        id: "local-2",
        name: "Restaurant Experience",
        price: 100,
        image_url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=restaurant+gift+card&tag=momently-20",
        reason: "Date-night ready within the week.",
      },
      {
        id: "local-3",
        name: "Flower Subscription",
        price: 55,
        image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
        buy_url: "https://www.amazon.com/s?k=flower+subscription&tag=momently-20",
        reason: "Fresh stems delivered locally.",
      },
    ],
    { urgency_tags: ["local"] }
  ),
};

const sponsoredPool = normalize(
  [
    {
      id: "spon-1",
      name: "Luxe Sleep Bundle",
      price: 140,
      image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      buy_url: "https://www.amazon.com/s?k=luxe+sleep+bundle&tag=momently-20",
      reason: "Partner offer: premium rest kit.",
    },
    {
      id: "spon-2",
      name: "Designer Candle Duo",
      price: 64,
      image_url: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80",
      buy_url: "https://www.amazon.com/s?k=designer+candle+set&tag=momently-20",
      reason: "Limited drop, partner pick.",
    },
    {
      id: "spon-3",
      name: "Art Print Set",
      price: 58,
      image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      buy_url: "https://www.amazon.com/s?k=art+print+set&tag=momently-20",
      reason: "Curated by creators we love.",
    },
  ],
  {}
);

export const productPools = {
  recipient: recipientPools,
  budget: budgetPools,
  interest: interestPools,
  urgency: urgencyPools,
  sponsored: sponsoredPool,
};

export function sampleProducts(pool: Product[], count = 3): Product[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
