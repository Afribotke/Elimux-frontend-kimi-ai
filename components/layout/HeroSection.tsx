"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Discover Your Perfect
          <span className="text-blue-600"> Educational Path</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Search universities, colleges, and programs worldwide. Find scholarships, compare institutions, and apply with confidence.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/discover">
            <Button size="lg">Start Exploring</Button>
          </Link>
          <Link href="/institutions">
            <Button size="lg" variant="outline">View Institutions</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

