import type { Metadata } from "next";
import { Inter_Tight, Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

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
  title: "Global Cooperation (Private) Limited",
  description:
    "Expert software development, cloud solutions, and AI services for modern businesses.",
  keywords: [
    "software development",
    "cloud solutions",
    "AI",
    "machine learning",
    "digital transformation",
  ],
  authors: [{ name: "Global Cooperation (Private) Limited" }],
  icons: {
    icon: "/images/companies/logo.png",
  },
  openGraph: {
    title: "Global Cooperation (Private) Limited",
    description:
      "A group of companies providing software development, cloud, AI, and advisory services.",
    url: "https://globalsoftsl.com",
    siteName: "Global Cooperation (Private) Limited",
    type: "website",
  },
  // Industry-level metadata for search engines and social
  metadataBase: new URL("https://globalsoftsl.com"),
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
      </body>
    </html>
  );
}
