import { AIProviderConfig } from './types/provider';

export const defaultProviderConfigs: AIProviderConfig[] = [
  {
    name: 'openai',
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o-mini',
    maxTokens: 2000,
    temperature: 0.7,
    costPer1KTokens: 0.15, // $0.15 per 1K tokens (input + output avg)
    enabled: true,
    priority: 1,
    timeout: 30000,
  },
  {
    name: 'anthropic',
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    model: 'claude-3-haiku-20240307',
    maxTokens: 2000,
    temperature: 0.7,
    costPer1KTokens: 0.25, // $0.25 per 1K tokens
    enabled: true,
    priority: 2,
    timeout: 30000,
  },
  {
    name: 'gemini',
    apiKey: process.env.GEMINI_API_KEY || '',
    model: 'gemini-1.5-flash',
    maxTokens: 2000,
    temperature: 0.7,
    costPer1KTokens: 0.075, // $0.075 per 1K tokens (cheapest)
    enabled: true,
    priority: 3,
    timeout: 30000,
  },
  {
    name: 'cohere',
    apiKey: process.env.COHERE_API_KEY || '',
    model: 'command-r',
    maxTokens: 2000,
    temperature: 0.7,
    costPer1KTokens: 0.5, // $0.50 per 1K tokens
    enabled: false, // Disabled by default (most expensive)
    priority: 4,
    timeout: 30000,
  },
];

export function getProviderConfigs(): AIProviderConfig[] {
  return defaultProviderConfigs.map(config => ({
    ...config,
    apiKey: process.env[`${config.name.toUpperCase()}_API_KEY`] || config.apiKey,
  }));
}
