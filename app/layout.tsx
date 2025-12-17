import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { seasonalClassName, getSeasonalTheme } from "@/lib/theme";
import { Toaster } from "sonner";
import { Tracker } from "@/components/layout/tracker";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Momently Gift AI | Pastel-perfect gift finding",
  description:
    "Find thoughtful, pastel-perfect gifts with AI. Polaroid reveals, PDF cards, and instant shareables.",
  openGraph: {
    title: "Momently Gift AI",
    description: "Find thoughtful, warm gifts in seconds.",
    url: "https://momently.example.com",
    images: [
      {
        url: "https://momently.example.com/og.png",
        width: 1200,
        height: 630,
        alt: "Momently Gift AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momently Gift AI",
    description: "Find thoughtful, warm gifts in seconds.",
    images: ["https://momently.example.com/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const seasonal = seasonalClassName(getSeasonalTheme());

  return (
    <html lang="en" className={cn(manrope.variable, playfair.variable)} suppressHydrationWarning>
      <body className={cn("antialiased", seasonal)}>
        <ThemeProvider>
          <div className="relative isolate overflow-hidden">
            <div className="gradient-ring pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative flex min-h-screen flex-col">
              <Tracker />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
