import { NextResponse } from "next/server";
import { AnthropicProvider } from "@/lib/ai/providers/anthropic";
import { getProviderConfigs } from "@/lib/ai/config";

export async function GET() {
  const config = getProviderConfigs().find(c => c.name === "anthropic");
  
  if (!config || !config.enabled) {
    return NextResponse.json({
      provider: "anthropic",
      status: "disabled",
      message: "Anthropic provider is not configured",
    });
  }

  try {
    const provider = new AnthropicProvider(config);
    const health = await provider.healthCheck();

    return NextResponse.json({
      provider: "anthropic",
      status: health.healthy ? "healthy" : "down",
      latency: health.latency,
      lastChecked: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      provider: "anthropic",
      status: "down",
      latency: 0,
      lastChecked: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
