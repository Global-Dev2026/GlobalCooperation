import { COMPANIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CompanyHero from "@/components/sections/CompanyHero";
import CompanyFeatures from "@/components/sections/CompanyFeatures";
import CompanyStats from "@/components/sections/CompanyStats";
import CompanyCTA from "@/components/sections/CompanyCTA";
import CompanyDirector from "@/components/sections/CompanyDirector";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = COMPANIES.find((c) => c.slug === slug);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  return {
    title: `${company.name} | Global Cooperation`,
    description: company.description,
  };
}

// Generate static paths for all companies
export async function generateStaticParams() {
  return COMPANIES.map((company) => ({
    slug: company.slug,
  }));
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = COMPANIES.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <CompanyHero
          name={company.name}
          description={company.fullDescription}
          image={company.image}
          gradient={company.gradient}
        />

        {/* About Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gray-900" style={{ backgroundColor: company.color }} />
                <span
                  className="text-xs font-bold tracking-[0.25em] uppercase"
                  style={{ color: company.color }}
                >
                  About Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                {company.description}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <CompanyFeatures
          features={company.features}
          companyColor={company.color}
        />

        {/* Statistics Section */}
        <CompanyStats stats={company.stats} companyColor={company.color} />

        {/* Director Section */}
        {"directors" in company && company.directors && (
          <CompanyDirector
            directorIds={company.directors}
            companyColor={company.color}
          />
        )}

        {/* Call to Action Section */}
        <CompanyCTA
          cta={company.cta}
          companyColor={company.color}
          companyName={company.name}
        />
      </main>
      <Footer />
    </>
  );
}
