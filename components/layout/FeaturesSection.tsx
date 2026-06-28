"use client";

import { Search, GraduationCap, Award, Globe } from "lucide-react";

const features = [
  {
    icon: "Search",
    title: "AI-Powered Search",
    description: "Find institutions and programs using natural language queries powered by AI."
  },
  {
    icon: "GraduationCap",
    title: "Institution Profiles",
    description: "Detailed profiles with courses, fees, admission requirements, and reviews."
  },
  {
    icon: "Award",
    title: "Scholarship Finder",
    description: "Discover scholarships and financial aid opportunities matched to your profile."
  },
  {
    icon: "Globe",
    title: "Global Reach",
    description: "Explore educational opportunities in Kenya and around the world."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ElimuX?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {feature.icon === "Search" && <Search className="h-8 w-8 text-blue-600" />}
                {feature.icon === "GraduationCap" && <GraduationCap className="h-8 w-8 text-blue-600" />}
                {feature.icon === "Award" && <Award className="h-8 w-8 text-blue-600" />}
                {feature.icon === "Globe" && <Globe className="h-8 w-8 text-blue-600" />}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

