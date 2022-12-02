import { domains } from './domain';

export interface DocumentState {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export type SupportedDomains = keyof typeof domains;
