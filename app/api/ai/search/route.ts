import { NextResponse } from "next/server";
import { getProviderConfigs } from "@/lib/ai/config";
import { AIRouter } from "@/lib/ai/router";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const configs = getProviderConfigs().filter(c => c.enabled && c.apiKey);
    
    if (configs.length === 0) {
      return NextResponse.json(
        { error: "No AI providers configured. Check your API keys." },
        { status: 503 }
      );
    }

    const router = new AIRouter(configs);
    const results = await router.search({ query });

    return NextResponse.json({
      success: true,
      query,
      results: results.results,
      provider: results.provider,
      error: results.error,
    });
  } catch (error) {
    console.error("AI Search Error:", error);
    return NextResponse.json(
      { error: "Search failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
