"use client";

import { AISearchBar } from "./AISearchBar";
import { SearchResults } from "./SearchResults";
import { useAISearch } from "@/hooks/use-ai-search";
import { Globe, GraduationCap, Users, Sparkles } from "lucide-react";

export function AISearchHero() {
  const { results, isLoading, error, strategy, search, clearResults } = useAISearch();

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-black to-black" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-950/50 border border-gold-800/50 px-4 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 text-gold-500" />
            <span className="text-sm text-gold-400">AI-powered</span>
            <span className="text-sm text-gray-500">· Multi-provider · Cost-optimized</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ask anything. <span className="text-gold-500">Get your top 10</span> options.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Tell us in plain language what you want to study, where, and your budget. 
            Our AI finds your best matches across multiple providers.
          </p>
        </div>

        <AISearchBar onSearch={search} isLoading={isLoading} />

        {error && (
          <div className="mt-6 p-4 bg-red-950/30 border border-red-900/30 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}

        {results && (
          <div className="mt-12">
            <SearchResults results={results} strategy={strategy} />
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-gold-600" />
            <span className="text-sm font-medium text-gray-400">186 Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-gold-600" />
            <span className="text-sm font-medium text-gray-400">21,847 Institutions</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gold-600" />
            <span className="text-sm font-medium text-gray-400">50,000+ Students</span>
          </div>
        </div>
      </div>
    </section>
  );
}
