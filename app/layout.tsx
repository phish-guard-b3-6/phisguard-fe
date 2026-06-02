import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-providers";
import { ReCaptchaProvider } from "next-recaptcha-v3";

// ── Goli Font (local) ──────────────────────────────────────────────────────
// Font files located at app/fonts/
// Path is relative to this file (app/layout.tsx), so no directory prefix needed.
const goli = localFont({
  src: [
    {
      path: "./fonts/Goli Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Goli-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Goli Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Goli Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-goli",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CIMB PhishGuard",
  description: "Phishing detection and reporting platform by CIMB Niaga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("h-full antialiased", goli.variable)}>
      <body
        className={cn(
          "flex flex-col min-h-screen font-goli",
          "bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_40%,#ffd6d6_100%)]",
          "dark:bg-[linear-gradient(to_bottom,#0f0f0f_0%,#0f0f0f_60%,#4a0000_100%)]",
          "bg-fixed bg-no-repeat",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <QueryProvider>
            <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}>
              {children}
            </ReCaptchaProvider>
          </QueryProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
