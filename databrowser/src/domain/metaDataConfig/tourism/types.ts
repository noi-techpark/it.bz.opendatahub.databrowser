export interface TourismMetaData {
  id: string;
  title: string;
  description: string;
  output: string;
  apiVersion: string;
  swaggerUrl: string;
  access: 'opendata' | 'limited' | 'closed' | 'unknown';
  pathParam: string[];
  externalLink: string;
  sources: string[];
  lastUpdated?: Date;
  apiFilter?: Record<string, string>;
  recordCount?: { open?: number; closed?: number; reduced?: number };
  deprecated?: boolean;
}
