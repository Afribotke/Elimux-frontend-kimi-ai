import { AIProviderConfig, AIRequest, AIResponse } from "./types";
import { AnthropicProvider } from "./providers/anthropic";

export interface AISearchRequest {
  query: string;
  context?: string;
}

export interface AISearchResponse {
  results: any[];
  query: string;
  error?: string;
  provider?: string;
}

export class AIRouter {
  private providers: { name: string; provider: AnthropicProvider }[] = [];

  constructor(configs: AIProviderConfig[]) {
    for (const config of configs) {
      if (config.enabled && config.apiKey) {
        try {
          this.providers.push({
            name: config.name,
            provider: new AnthropicProvider(config),
          });
        } catch (e) {
          console.warn(`Failed to initialize ${config.name}:`, e);
        }
      }
    }
  }

  async search(request: AISearchRequest): Promise<AISearchResponse> {
    if (this.providers.length === 0) {
      return {
        results: [],
        error: "No AI providers configured",
        query: request.query,
      };
    }

    // Try each provider in priority order
    for (const { name, provider } of this.providers) {
      try {
        const aiRequest: AIRequest = {
          prompt: request.query,
          systemPrompt: request.context || "You are an educational search assistant. Help students find institutions and programs. Return results in JSON format with institutions and programs arrays.",
        };

        const response = await provider.generate(aiRequest);

        let parsedResults = [];
        try {
          const content = response.content || "";
          const jsonBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
          const jsonMatch = jsonBlockMatch ? jsonBlockMatch[1] : content;
          parsedResults = JSON.parse(jsonMatch);
        } catch (e) {
          parsedResults = [{ title: "AI Response", content: response.content }];
        }

        return {
          results: parsedResults,
          query: request.query,
          provider: name,
        };
      } catch (error) {
        console.warn(`${name} failed:`, error);
        continue;
      }
    }

    return {
      results: [],
      error: "All AI providers failed",
      query: request.query,
    };
  }

  async healthCheck() {
    const checks = await Promise.all(
      this.providers.map(async ({ name, provider }) => {
        try {
          const health = await provider.healthCheck();
          return { name, ...health };
        } catch (e) {
          return { name, healthy: false, latency: 0 };
        }
      })
    );
    return checks;
  }
}
