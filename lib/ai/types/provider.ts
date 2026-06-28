// AI Provider Types - Platform Agnostic

export interface AIProviderConfig {
  name: string;
  apiKey: string;
  baseUrl?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  costPer1KTokens: number;
  enabled: boolean;
  priority: number; // Lower = higher priority
  timeout: number; // ms
}

export interface AIRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface AIResponse {
  content: string;
  provider: string;
  model: string;
  tokensUsed: number;
  cost: number;
  latency: number;
  success: boolean;
  error?: string;
}

export interface SearchResult {
  institutions: InstitutionMatch[];
  programs: ProgramMatch[];
  explanation: string;
  confidence: number;
  filters: AppliedFilters;
}

export interface InstitutionMatch {
  id: string;
  name: string;
  country: string;
  logo?: string;
  matchScore: number;
  matchReason: string;
  programs: number;
  tuitionRange: string;
  accreditation: string[];
  highlights: string[];
}

export interface ProgramMatch {
  id: string;
  name: string;
  institution: string;
  degreeType: string;
  duration: string;
  tuition: string;
  matchScore: number;
  matchReason: string;
  requirements: string[];
  deadlines: string[];
  scholarships: boolean;
}

export interface AppliedFilters {
  countries?: string[];
  budget?: { min: number; max: number; currency: string };
  degreeTypes?: string[];
  fields?: string[];
  duration?: string;
  language?: string[];
  accreditation?: string[];
  online?: boolean;
}

export interface ProviderHealth {
  provider: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  lastChecked: string;
  errorRate: number;
}
