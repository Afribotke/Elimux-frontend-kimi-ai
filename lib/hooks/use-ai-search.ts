"use client";

import { useState, useCallback } from "react";
import { SearchResult } from "@/lib/ai/types/provider";

interface UseAISearchReturn {
  results: SearchResult | null;
  isLoading: boolean;
  error: string | null;
  strategy: string;
  search: (query: string, strategy?: string) => Promise<void>;
  clearResults: () => void;
}

export function useAISearch(): UseAISearchReturn {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState("fallback");

  const search = useCallback(async (query: string, selectedStrategy: string = "fallback") => {
    setIsLoading(true);
    setError(null);
    setStrategy(selectedStrategy);

    try {
      const response = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, strategy: selectedStrategy }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Search failed");
      }

      setResults(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return { results, isLoading, error, strategy, search, clearResults };
}
