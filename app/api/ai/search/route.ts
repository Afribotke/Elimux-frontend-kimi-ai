import { NextResponse } from "next/server";
import { AIRouter } from "@/lib/ai/router";
import { getProviderConfigs } from "@/lib/ai/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, strategy = 'fallback' } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const configs = getProviderConfigs();
    const router = new AIRouter(configs, strategy);
    const results = await router.searchEducation(query);

    return NextResponse.json({
      success: true,
      data: results,
      strategy: router.getCurrentStrategy(),
      provider: 'ai',
    });
  } catch (error) {
    console.error('AI Search error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error',
        data: {
          institutions: [],
          programs: [],
          explanation: 'Search failed. Please try again.',
          confidence: 0,
          filters: {},
        }
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Search API - Use POST with { query: "your search" }',
    strategies: ['cost', 'latency', 'fallback', 'round-robin'],
    providers: ['openai', 'anthropic', 'gemini', 'cohere'],
  });
}
