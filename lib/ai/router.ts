import { AIRequest, AIResponse, AIProviderConfig, SearchResult } from './types/provider';
import { CostBasedStrategy } from './strategies/cost-based';
import { LatencyBasedStrategy } from './strategies/latency-based';
import { FallbackStrategy } from './strategies/fallback';
import { RoundRobinStrategy } from './strategies/round-robin';

type StrategyType = 'cost' | 'latency' | 'fallback' | 'round-robin';

export class AIRouter {
  private configs: AIProviderConfig[];
  private strategy: StrategyType;

  constructor(configs: AIProviderConfig[], strategy: StrategyType = 'fallback') {
    this.configs = configs;
    this.strategy = strategy;
  }

  setStrategy(strategy: StrategyType): void {
    this.strategy = strategy;
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    switch (this.strategy) {
      case 'cost':
        return new CostBasedStrategy(this.configs).execute(request);
      case 'latency':
        return new LatencyBasedStrategy(this.configs).execute(request);
      case 'round-robin':
        return new RoundRobinStrategy(this.configs).execute(request);
      case 'fallback':
      default:
        return new FallbackStrategy(this.configs).execute(request);
    }
  }

  async searchEducation(query: string): Promise<SearchResult> {
    const systemPrompt = `You are an AI education advisor. Given a user's query, find the best matching institutions and programs.

Return a JSON object with this structure:
{
  "institutions": [
    {
      "id": "string",
      "name": "string", 
      "country": "string",
      "matchScore": 0-100,
      "matchReason": "string",
      "programs": number,
      "tuitionRange": "string",
      "accreditation": ["string"],
      "highlights": ["string"]
    }
  ],
  "programs": [
    {
      "id": "string",
      "name": "string",
      "institution": "string",
      "degreeType": "string",
      "duration": "string",
      "tuition": "string",
      "matchScore": 0-100,
      "matchReason": "string",
      "requirements": ["string"],
      "deadlines": ["string"],
      "scholarships": boolean
    }
  ],
  "explanation": "string explaining why these matches were chosen",
  "confidence": 0-100,
  "filters": {
    "countries": ["string"],
    "budget": { "min": number, "max": number, "currency": "string" },
    "degreeTypes": ["string"],
    "fields": ["string"]
  }
}

Be specific about costs in KES for Kenya, USD for international. Include real-sounding institution names.`;

    const response = await this.generate({
      prompt: `Find education programs matching: "${query}"`,
      systemPrompt,
      maxTokens: 2000,
      temperature: 0.7,
    });

    if (!response.success) {
      throw new Error(response.error);
    }

    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = response.content.match(/```json
?([\s\S]*?)
?```/) || 
                        response.content.match(/```
?([\s\S]*?)
?```/) ||
                        [null, response.content];

      const jsonStr = jsonMatch[1]?.trim() || response.content;
      return JSON.parse(jsonStr) as SearchResult;
    } catch (error) {
      console.error('Failed to parse AI response:', response.content);
      throw new Error('Failed to parse search results');
    }
  }

  getCurrentStrategy(): StrategyType {
    return this.strategy;
  }

  getProviderConfigs(): AIProviderConfig[] {
    return this.configs;
  }
}
