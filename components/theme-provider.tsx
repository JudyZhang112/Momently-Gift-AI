"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useMemo } from "react";

import { applyThemeTokens, getSeasonalTheme } from "@/lib/theme";

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const timedTheme = useMemo(() => getSeasonalTheme(new Date()), []);

  useEffect(() => {
    applyThemeTokens(timedTheme);
  }, [timedTheme]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
