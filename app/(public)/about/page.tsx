import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, Zap, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ElimuX mission to democratize global education access.",
};

const values = [
  {
    icon: Globe,
    title: "Accessibility",
    description: "Education should be accessible to everyone, regardless of location or background.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "We verify every institution to ensure students connect with legitimate opportunities.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "AI-powered tools help students find the perfect match for their academic goals.",
  },
  {
    icon: HeartHandshake,
    title: "Support",
    description: "From discovery to application, we guide students every step of the way.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-teal-700 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About ElimuX</h1>
          <p className="mt-6 text-lg text-teal-100 max-w-2xl mx-auto">
            We are on a mission to democratize access to global education opportunities 
            for students across Africa and beyond.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              To bridge the gap between ambitious students and world-class educational institutions 
              through technology, transparency, and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-700">2023</div>
              <div className="text-sm text-gray-600 mt-1">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">Kenya</div>
              <div className="text-sm text-gray-600 mt-1">Headquarters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">20+</div>
              <div className="text-sm text-gray-600 mt-1">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">50+</div>
              <div className="text-sm text-gray-600 mt-1">Countries</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
