import { NextResponse } from "next/server";
import { getProviderConfigs } from "@/lib/ai/config";
import { AIRouter } from "@/lib/ai/router";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const configs = getProviderConfigs();
    const config = configs.find(c => c.enabled && c.name === "anthropic");

    if (!config) {
      return NextResponse.json(
        { error: "AI provider not configured" },
        { status: 503 }
      );
    }

    const router = new AIRouter(config);
    const results = await router.search({ query });

    return NextResponse.json({
      success: true,
      query,
      results: results.results,
    });
  } catch (error) {
    console.error("AI Search Error:", error);
    return NextResponse.json(
      { error: "Search failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
