export type ThemeTokens = {
  slug: "default" | "christmas" | "valentine" | "mother" | "father";
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  helperText: string;
  badgeText: string;
  illustration: string;
};

function hexToHsl(hex: string) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number) {
  const first = new Date(year, month, 1);
  const firstWeekday = first.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const day = 1 + offset + (n - 1) * 7;
  return new Date(year, month, day);
}

function inRange(date: Date, start: Date, end: Date) {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return target >= s && target <= e;
}

export function getSeasonalTheme(date = new Date()): ThemeTokens {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Christmas: Dec 1-25
  if (month === 11 && day >= 1 && day <= 25) {
    return {
      slug: "christmas",
      name: "Christmas",
      primary: hexToHsl("#0f5132"),
      secondary: hexToHsl("#b91c1c"),
      accent: hexToHsl("#f8f3e7"),
      background: hexToHsl("#fdf9f2"),
      helperText: "Describe who you’re shopping for and your budget.",
      badgeText: "Christmas gifting made simple",
      illustration: "snow",
    };
  }

  // Valentine’s: Feb 1-14
  if (month === 1 && day >= 1 && day <= 14) {
    return {
      slug: "valentine",
      name: "Valentine’s Day",
      primary: hexToHsl("#ff4f79"),
      secondary: hexToHsl("#ff99a8"),
      accent: hexToHsl("#ffe6ec"),
      background: hexToHsl("#fff6f8"),
      helperText: "Describe who you’re shopping for and your budget.",
      badgeText: "Valentine’s gifting warmth",
      illustration: "hearts",
    };
  }

  // Mother’s Day: second Sunday of May ± 3 days
  if (month === 4 || month === 5) {
    const motherSunday = nthWeekdayOfMonth(year, 4, 0, 2); // May, Sunday, 2nd
    const start = new Date(motherSunday);
    start.setDate(motherSunday.getDate() - 3);
    const end = new Date(motherSunday);
    end.setDate(motherSunday.getDate() + 3);
    if (inRange(date, start, end)) {
      return {
        slug: "mother",
        name: "Mother’s Day",
        primary: hexToHsl("#f7c6c7"),
        secondary: hexToHsl("#c4a1ff"),
        accent: hexToHsl("#ffe8d6"),
        background: hexToHsl("#fff9f4"),
        helperText: "Describe who you’re shopping for and your budget.",
        badgeText: "Thoughtful picks for moms",
        illustration: "floral",
      };
    }
  }

  // Father’s Day: third Sunday of June ± 3 days
  if (month === 5 || month === 6) {
    const fatherSunday = nthWeekdayOfMonth(year, 5, 0, 3); // June, Sunday, 3rd
    const start = new Date(fatherSunday);
    start.setDate(fatherSunday.getDate() - 3);
    const end = new Date(fatherSunday);
    end.setDate(fatherSunday.getDate() + 3);
    if (inRange(date, start, end)) {
      return {
        slug: "father",
        name: "Father’s Day",
        primary: hexToHsl("#2c4a72"),
        secondary: hexToHsl("#b8c2cf"),
        accent: hexToHsl("#f3ede4"),
        background: hexToHsl("#f7f4ef"),
        helperText: "Describe who you’re shopping for and your budget.",
        badgeText: "Understated warmth for dads",
        illustration: "minimal-lines",
      };
    }
  }

  // Default
  return {
    slug: "default",
    name: "Everyday gifting",
    primary: hexToHsl("#d47744"),
    secondary: hexToHsl("#c4a381"),
    accent: hexToHsl("#f6ede3"),
    background: hexToHsl("#fbf7f2"),
    helperText: "Describe who you’re shopping for and your budget.",
    badgeText: "Curated, warm, gift-ready",
    illustration: "soft-glow",
  };
}

export function applyThemeTokens(theme: ThemeTokens) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const setVar = (key: string, value: string) => root.style.setProperty(key, value);
  setVar("--primary", theme.primary);
  setVar("--secondary", theme.secondary);
  setVar("--accent", theme.accent);
  setVar("--background", theme.background);
  setVar("--ring", theme.primary);
  setVar("--border", theme.accent);
  setVar("--input", theme.accent);
  root.dataset.themeName = theme.slug;
  root.dataset.themeIllustration = theme.illustration;
}

export function getHeroBadge(theme: ThemeTokens) {
  return theme.badgeText;
}

export function getHelperText(theme: ThemeTokens) {
  return theme.helperText;
}

export function seasonalClassName(theme: ThemeTokens) {
  return `theme-${theme.slug}`;
}
