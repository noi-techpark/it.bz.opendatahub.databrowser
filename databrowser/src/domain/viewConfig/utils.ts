import { get } from 'lodash-es';
import { useApiQuery } from '../api/service/apiQueryHandler';
import { stringifyParameter } from '../api/service/query';
import { NoViewConfig, ViewConfig } from './types';

export const isViewConfig = (
  config: ViewConfig | NoViewConfig
): config is ViewConfig => (config as ViewConfig).source != null;

export const useFieldExtraction = () => {
  const apiQuery = useApiQuery();

  const getValue = (
    item: any,
    fields: Record<string, string>,
    params?: Record<string, string>
  ) => {
    const replacements = Object.entries(apiQuery.allApiParameters.value).reduce(
      (previous, [key, value]) => ({
        ...previous,
        [key]: stringifyParameter(value),
      }),
      {}
    );

    const extractedFields = extractField(item, fields, replacements);
    return { ...extractedFields, ...params };
  };

  return { getValue };
};

const extractField = (
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
