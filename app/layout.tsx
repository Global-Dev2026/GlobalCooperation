import type { Metadata } from "next";
import { Inter_Tight, Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Global Cooperation (Private) Limited",
    default: "Global Cooperation (Private) Limited",
  },
  description:
    "Expert software development, cloud solutions, and AI services for modern businesses.",
  keywords: [
    "Global Cooperation", // Keyword #1 priority
    "Global Cooperation Private Limited",
    "Global Cooperation Sri Lanka",
    "software development",
    "cloud solutions",
    "AI",
    "machine learning",
    "digital transformation",
    "Sri Lanka",
    "POS Systems",
    "enterprise software",
    "IT consulting",
    "web development",
  ],
  authors: [{ name: "Global Cooperation (Private) Limited" }],
  creator: "Global Cooperation (Private) Limited",
  publisher: "Global Cooperation (Private) Limited",
  metadataBase: new URL("https://globalsoftsl.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/companies/logo.png",
  },
  openGraph: {
    title: "Global Cooperation (Private) Limited",
    description:
      "A group of companies providing software development, cloud, AI, and advisory services.",
    url: "https://globalsoftsl.com",
    siteName: "Global Cooperation (Private) Limited",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Cooperation (Private) Limited",
    description: "Expert software development, cloud solutions, and AI services.",
  },
  // Industry-level metadata for search engines and social
  other: {
    industry: "Software & IT Support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="antialiased select-none" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
