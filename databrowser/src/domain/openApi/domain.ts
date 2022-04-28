import { SupportedDomains } from './types';

export const domains = {
  tourism: {
    description: 'Open Data Hub Tourism API',
    documentUrl:
      'https://api.tourism.testingmachine.eu/swagger/v1/swagger.json',
    baseUrl: 'https://api.tourism.testingmachine.eu',
  },
  mobility: {
    description: 'Open Data Hub Mobility API',
    documentUrl: 'https://mobility.api.opendatahub.bz.it/v2/apispec',
    baseUrl: 'https://mobility.api.opendatahub.bz.it',
  },
};

export const domainKeys = new Set(Object.keys(domains));

export const isDomainKnown = (s: string): s is SupportedDomains =>
  domainKeys.has(s);
