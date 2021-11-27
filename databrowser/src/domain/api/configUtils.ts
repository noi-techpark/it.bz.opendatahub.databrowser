import { get } from 'lodash';
import { ApiConfig, apiConfig, ApiConfigEntry } from './config';

export const apiConfigProvider = (id: keyof ApiConfig): ApiConfigEntry =>
  apiConfig[id];

export const extractField = (item: unknown, fields: Record<string, string>) =>
  Object.keys(fields).reduce((prev, key) => {
    const sourceField = (fields as Record<string, string>)[key];
    const value = get(item, sourceField);
    return { ...prev, [key]: value };
  }, {});
