import { OpenAPIV3 } from 'openapi-types';
import { domains } from './domain';

// Disable typescript error for next line, the export OpenApi is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export import OpenApi = OpenAPIV3;

export interface DocumentState {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export type SupportedDomains = keyof typeof domains;
