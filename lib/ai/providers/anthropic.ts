import { AIRequest, AIResponse, AIProviderConfig } from '../types/provider';
import { AIProvider } from './base';

export class AnthropicProvider implements AIProvider {
  name = 'anthropic';
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.config.baseUrl || 'https://api.anthropic.com'}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: request.maxTokens || this.config.maxTokens,
          temperature: request.temperature || this.config.temperature,
          system: request.systemPrompt || 'You are an AI education advisor.',
          messages: [{ role: 'user', content: request.prompt }],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Anthropic API error: ${error}`);
      }

      const data = await response.json();
      const tokensUsed = data.usage?.input_tokens + data.usage?.output_tokens || 0;
      const latency = Date.now() - startTime;
      const cost = (tokensUsed / 1000) * this.config.costPer1KTokens;

      return {
        content: data.content[0]?.text || '',
        provider: this.name,
        model: this.config.model,
        tokensUsed,
        cost,
        latency,
        success: true,
      };
    } catch (error) {
      return {
        content: '',
        provider: this.name,
        model: this.config.model,
        tokensUsed: 0,
        cost: 0,
        latency: Date.now() - startTime,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async healthCheck(): Promise<{ healthy: boolean; latency: number }> {
    const startTime = Date.now();
    try {
      const response = await fetch(`${this.config.baseUrl || 'https://api.anthropic.com'}/v1/models`, {
        headers: { 'x-api-key': this.config.apiKey, 'anthropic-version': '2023-06-01' },
      });
      return { healthy: response.ok, latency: Date.now() - startTime };
    } catch {
      return { healthy: false, latency: Date.now() - startTime };
    }
  }
}
