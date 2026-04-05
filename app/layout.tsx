import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter } from "@/app/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = new URL("https://linguatude.com");

const description =
  "Linguatude is an AI-powered English test preparation platform. Get diagnosed, build a personalised study plan, and prepare for IELTS, TOEFL, PTE Academic. Coming soon.";

const keywords = [
  "IELTS preparation",
  "TOEFL preparation",
  "PTE Academic preparation",
  "English test prep",
  "AI English test preparation",
  "IELTS study app",
  "online IELTS preparation",
  "English proficiency test preparation",
  "Cambridge English preparation",
  "AI language learning",
  "IELTS band score improvement",
  "English test coaching",
  "affordable IELTS prep",
  "TOEFL study plan",
  "PTE practice",
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#132a4a" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1829" },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  /* Tab icon: app/favicon.ico (logo). Metadata `icon` would add a second <link> after Next’s default order. */
  icons: {
    apple: [{ url: "/logo.jpg", type: "image/jpeg" }],
  },
  title:
    "Linguatude — AI English Test Preparation | IELTS, TOEFL, PTE & More | Coming Soon",
  description,
  keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Linguatude",
    title: "Linguatude — AI English Test Preparation",
    description:
      "Prepare for IELTS, TOEFL, PTE Academic, and Cambridge English tests with an AI coach that diagnoses your level and builds your plan. Coming soon to linguatude.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linguatude — AI English Test Preparation",
    description:
      "Prepare for IELTS, TOEFL, PTE Academic, and Cambridge English tests with an AI coach that diagnoses your level and builds your plan. Coming soon to linguatude.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} min-h-dvh antialiased`}>
      <body className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-hidden font-sans pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)] pb-[env(safe-area-inset-bottom,0px)]">
        <CookieConsent>
          {children}
          <SiteFooter />
        </CookieConsent>
      </body>
    </html>
  );
}
