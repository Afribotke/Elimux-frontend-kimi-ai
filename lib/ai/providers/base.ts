import { AIRequest, AIResponse } from '../types/provider';

export interface AIProvider {
  name: string;
  generate(request: AIRequest): Promise<AIResponse>;
  healthCheck(): Promise<{ healthy: boolean; latency: number }>;
}
