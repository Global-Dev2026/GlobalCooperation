import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Companies from "@/components/sections/Companies";
import BoardOfDirectors from "@/components/sections/BoardOfDirectors";

export const metadata: Metadata = {
  title: "Software & Technology Solutions",
  description: "Global Cooperation provides innovative software, AI, CCTV security, and comprehensive consulting services across Sri Lanka.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Global Cooperation (Private) Limited",
    image: "https://globalsoftsl.com/images/companies/logo.png",
    "@id": "https://globalsoftsl.com",
    url: "https://globalsoftsl.com",
    telephone: "+94 11 216 0252",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sepali Place, 22/20 Yahampath Mawatha",
      addressLocality: "Maharagama",
      postalCode: "10280",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.848529340982361,
      longitude: 79.92398553256087,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:30",
      closes: "17:30",
    },
    sameAs: [
      "https://www.linkedin.com/company/global-cooperation-pvt-ltd/?viewAsMember=true",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Services />
        <Companies />
        <About />
        <BoardOfDirectors />
      </main>
      <Footer />
    </>
  );
}
