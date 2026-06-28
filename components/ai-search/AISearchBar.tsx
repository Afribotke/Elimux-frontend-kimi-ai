"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Loader2 } from "lucide-react";

interface AISearchBarProps {
  onSearch: (query: string, strategy: string) => void;
  isLoading?: boolean;
}

const strategies = [
  { value: "fallback", label: "Best Quality", description: "Tries best provider first" },
  { value: "cost", label: "Cheapest", description: "Uses lowest cost provider" },
  { value: "latency", label: "Fastest", description: "Uses fastest responding provider" },
  { value: "round-robin", label: "Balanced", description: "Rotates between providers" },
];

const examples = [
  "Medicine in Kenya under KES 500k",
  "MBA with scholarship in Germany",
  "Online nursing from Africa",
  "Computer Science in Canada",
];

export function AISearchBar({ onSearch, isLoading = false }: AISearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("fallback");
  const [showStrategies, setShowStrategies] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), selectedStrategy);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-600" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: Medicine in Kenya under KES 500k, MBA with scholarship in Germany..."
            className="pl-12 pr-4 h-14 bg-black/50 border-gold-800/50 text-white placeholder:text-gray-600 focus:border-gold-500 focus:ring-gold-500/20 text-base"
            disabled={isLoading}
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-500 animate-spin" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-gold-600 text-black hover:bg-gold-500 h-11 px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                AI Search
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => setShowStrategies(!showStrategies)}
            className="text-sm text-gold-500 hover:text-gold-400 underline"
          >
            Strategy: {strategies.find(s => s.value === selectedStrategy)?.label}
          </button>
        </div>

        {showStrategies && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-black/30 border border-gold-900/30 rounded-lg">
            {strategies.map((strategy) => (
              <button
                key={strategy.value}
                type="button"
                onClick={() => {
                  setSelectedStrategy(strategy.value);
                  setShowStrategies(false);
                }}
                className={`text-left p-3 rounded-lg transition-colors ${
                  selectedStrategy === strategy.value
                    ? "bg-gold-950/50 border border-gold-700/50"
                    : "hover:bg-gold-950/30 border border-transparent"
                }`}
              >
                <div className="font-medium text-gold-400 text-sm">{strategy.label}</div>
                <div className="text-xs text-gray-500">{strategy.description}</div>
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-gray-600">Try:</span>
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setQuery(example)}
              className="text-gold-600 hover:text-gold-400 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
