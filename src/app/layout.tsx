import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { UnderlayNav } from "@/components/layout/underlay-nav";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { seoDefaults, site } from "@/content/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoDefaults.title,
    template: `%s — ${site.name}`,
  },
  description: seoDefaults.description,
  keywords: seoDefaults.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: seoDefaults.title,
    description: seoDefaults.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.title,
    description: seoDefaults.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        {/* Pin to top before hydration so a refreshed mid-page scroll
            position doesn't stick under the hero intro lock. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0);}catch(e){}})();`,
          }}
        />
        <MotionProvider>
          <LenisProvider>
            <a
              href="#main-content"
              className="focus:bg-surface sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-sm"
            >
              Skip to main content
            </a>
            <UnderlayNav />
            {/*
              Everything except the fixed header/menu/overlay lives here.
              The underlay menu is a sibling positioned behind this wrapper
              (z-1 vs z-2) — opening it slides this wrapper left to reveal it.
            */}
            <div
              data-main
              className="bg-background relative z-[2] flex flex-1 flex-col"
            >
              {children}
              <SiteFooter />
            </div>
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
