import { AIProviderConfig, AISearchRequest, AISearchResponse } from "./types";
import { AnthropicProvider } from "./providers/anthropic";

export class AIRouter {
  private provider: AnthropicProvider | null = null;

  constructor(config: AIProviderConfig) {
    if (config.name === "anthropic" && config.enabled) {
      this.provider = new AnthropicProvider(config);
    }
  }

  async search(request: AISearchRequest): Promise<AISearchResponse> {
    if (!this.provider) {
      return {
        results: [],
        error: "AI provider not configured",
        query: request.query,
      };
    }

    try {
      const response = await this.provider.search(request);

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
      };
    } catch (error) {
      return {
        results: [],
        error: error instanceof Error ? error.message : "Search failed",
        query: request.query,
      };
    }
  }

  async healthCheck() {
    if (!this.provider) {
      return { healthy: false, latency: 0 };
    }
    return this.provider.healthCheck();
  }
}
