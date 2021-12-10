import { get } from 'lodash';
import { ApiConfig, apiConfig, ApiConfigEntry } from './config';

export const apiConfigProvider = (
  id: keyof ApiConfig
): ApiConfigEntry | undefined => apiConfig[id];

const replacePlaceholders = (
  s: string,
  replacements?: Record<string, string>
): string => {
  if (replacements == null) {
    return s;
  }

  return Object.keys(replacements).reduce(
    (prev, curr) => prev.replace(`{${curr}}`, replacements[curr]),
    s
  );
};

export const extractField = (
  item: unknown,
  fields: Record<string, string>,
  replacements?: Record<string, string>
) =>
  Object.keys(fields).reduce((prev, key) => {
    const sourceField = fields[key];

    const fieldName = replacePlaceholders(sourceField, replacements);

    const value = get(item, fieldName);
    return { ...prev, [key]: value };
  }, {});
