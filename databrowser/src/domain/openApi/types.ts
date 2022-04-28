import { OpenAPIV3 } from 'openapi-types';
import { domains } from './domain';

export import OpenApi = OpenAPIV3;

export interface DocumentState {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export type SupportedDomains = keyof typeof domains;
