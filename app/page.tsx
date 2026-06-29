import { Metadata } from "next";
import { getInstitutions } from "@/lib/api";
import { AISearchHero } from "@/components/ai-search/AISearchHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, Search, Globe, Shield } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ElimuX - Discover Global Education Opportunities",
  description: "Find and apply to universities, colleges, and programs worldwide. AI-powered education discovery platform.",
};

// Force dynamic rendering so Supabase data is fetched at request time
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const institutions = await getInstitutions();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <AISearchHero />

      {/* Featured Institutions from Supabase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Institutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover top universities and colleges across Africa and beyond
            </p>
          </div>

          {institutions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading institutions from database...</p>
              <div className="mt-8 animate-pulse space-y-4">
                <div className="h-4 bg-gold-900/30 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gold-900/30 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutions.slice(0, 6).map((institution) => (
                  <Link
                    key={institution.id}
                    href={`/institutions/${institution.id}`}
                    className="group bg-gold-950/20 border border-gold-900/30 rounded-xl p-6 hover:border-gold-500/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gold-900/30 flex-shrink-0">
                        {institution.logo_url ? (
                          <Image
                            src={institution.logo_url}
                            alt={institution.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gold-500 text-xl font-bold">
                            {institution.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate group-hover:text-gold-400 transition-colors">
                          {institution.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{institution.city}, {institution.country}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-gold-900/30 text-gold-400 px-2 py-1 rounded">
                            {institution.type}
                          </span>
                          {institution.ranking && (
                            <span className="text-xs bg-gold-900/30 text-gold-400 px-2 py-1 rounded">
                              Rank #{institution.ranking}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4 line-clamp-2">
                      {institution.description}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/institutions"
                  className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-medium transition-colors"
                >
                  View All Institutions
                  <span>→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-gold-500">ElimuX</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="AI-Powered Search"
              description="Find the perfect institution and program using our intelligent search engine."
            />
            <FeatureCard
              icon={Globe}
              title="Global Reach"
              description="Access education opportunities from institutions worldwide, all in one place."
            />
            <FeatureCard
              icon={Shield}
              title="Verified Programs"
              description="All institutions and programs are verified for authenticity and quality."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gold-950/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="500+" label="Institutions" />
            <StatCard number="10,000+" label="Programs" />
            <StatCard number="50+" label="Countries" />
            <StatCard number="100K+" label="Students Helped" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of students who found their dream education through ElimuX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-500 text-black">
                <Search className="mr-2 h-5 w-5" />
                Search Programs
              </Button>
            </Link>
            <Link href="/institutions">
              <Button size="lg" variant="outline" className="border-gold-600 text-gold-500 hover:bg-gold-950">
                <GraduationCap className="mr-2 h-5 w-5" />
                Browse Institutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-gold-950/20 border border-gold-900/30 rounded-xl p-6 hover:border-gold-500/30 transition-colors">
      <div className="h-12 w-12 bg-gold-900/30 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-gold-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-gold-500 mb-2">{number}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
