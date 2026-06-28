import { Metadata } from "next";
import { AISearchHero } from "@/components/ai-search/AISearchHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, Search, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "ElimuX - Discover Global Education Opportunities",
  description: "Find and apply to universities, colleges, and programs worldwide. AI-powered education discovery platform.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <AISearchHero />

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
              description="Access universities and colleges from Kenya, Africa, and worldwide."
            />
            <FeatureCard 
              icon={Shield}
              title="Verified Information"
              description="All institutions and programs are verified for accuracy and legitimacy."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gold-950/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of students who found their dream education through ElimuX.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-black">
                Get Started
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="outline" className="border-gold-600 text-gold-400 hover:bg-gold-950/50">
                Explore Institutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Institutions" />
            <StatCard number="10,000+" label="Programs" />
            <StatCard number="50,000+" label="Students" />
            <StatCard number="30+" label="Countries" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-black border border-gold-900/30 rounded-lg p-6 text-center hover:border-gold-700 transition-colors">
      <div className="flex justify-center mb-4">
        <Icon className="h-10 w-10 text-gold-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div>
      <p className="text-3xl font-bold text-gold-500">{number}</p>
      <p className="text-gray-400 mt-1">{label}</p>
    </div>
  );
}
