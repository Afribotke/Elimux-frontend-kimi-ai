import { NextResponse } from "next/server";
import { ProviderFactory } from "@/lib/ai/providers/factory";
import { getProviderConfigs } from "@/lib/ai/config";
import { ProviderHealth } from "@/lib/ai/types/provider";

export async function GET() {
  const configs = getProviderConfigs().filter(c => c.enabled);
  const healthChecks: ProviderHealth[] = [];

  for (const config of configs) {
    try {
      const provider = ProviderFactory.create(config);
      const health = await provider.healthCheck();

      healthChecks.push({
        provider: config.name,
        status: health.healthy ? 'healthy' : 'down',
        latency: health.latency,
        lastChecked: new Date().toISOString(),
        errorRate: 0,
      });
    } catch (error) {
      healthChecks.push({
        provider: config.name,
        status: 'down',
        latency: 0,
        lastChecked: new Date().toISOString(),
        errorRate: 1,
      });
    }
  }

  return NextResponse.json({
    providers: healthChecks,
    total: healthChecks.length,
    healthy: healthChecks.filter(h => h.status === 'healthy').length,
  });
}
