import { embeddedViewConfigs } from '../../../config/config';
import { PathParams, ViewConfig, ViewConfigWithPathParams } from '../types';
import { SourceResolver, ViewConfigSource } from './types';

interface MatchResult {
  configKey: string;
  doesMatch: boolean;
  exactMatches: number;
  dynamicParams: Record<string, string>;
  partsLength?: number;
}

const sourceResolver: SourceResolver = async (pathParams: PathParams) => {
  const path = pathParams.join('/');

  // Check if a there is an exact embedded config match
  const predefinedConfig = embeddedViewConfigs[path];
  if (predefinedConfig != null) {
    return Promise.resolve({ ...predefinedConfig });
  }

  // Check if a there is an embedded config that matches via path
  const pathMatchedConfig = matchByPath(pathParams);
  if (pathMatchedConfig != null) {
    return Promise.resolve({ ...pathMatchedConfig });
  }

  return Promise.resolve({
    reason: 'No embedded config found',
  });
};

const matchByPath = (dataset: string[]): ViewConfig | null => {
  const matchResults: MatchResult[] = Object.keys(embeddedViewConfigs).map(
    (configKey) => {
      const configKeyParts = configKey.split('/');

      // Check that paths have same length
      if (dataset.length !== configKeyParts.length) {
        return {
          configKey,
          doesMatch: false,
          exactMatches: 0,
          dynamicParams: {},
        };
      }

      let exactMatches = 0;
      let doesMatch = true;
      const dynamicParams: Record<string, string> = {};
      const paramsCount = configKeyParts.length;

      for (let i = 0; i < configKeyParts.length; i++) {
        const part = configKeyParts[i];

        // Skip dynamic path parts (e.g. ID of a resource)
        if (part.at(0) === '{' && part.at(-1) === '}') {
          dynamicParams[part] = dataset[i];
          continue;
        }

        // If parts don't match, then the current configKey doesn't match
        if (part !== dataset[i]) {
          doesMatch = false;
          break;
        }

        // Increase number of exactMatches to find best match later on
        exactMatches++;
      }

      return {
        configKey,
        doesMatch,
        exactMatches,
        paramsCount,
        dynamicParams,
      };
    }
  );

  const matches = matchResults.filter((result) => result.doesMatch);

  if (matches.length === 0) {
    return null;
  }

  matches.sort((a, b) => a.exactMatches - b.exactMatches);
  const bestMatch = matches[0];
  const config = {
    ...embeddedViewConfigs[bestMatch.configKey],
  };

  // Handle url dynamic params replacement
  replaceDynamicParams(config, bestMatch.dynamicParams);

  return config;
};

const replaceDynamicParams = (
  config: ViewConfig,
  dynamicParams: Record<string, string>
): void => {
  config.path = replaceUrlParam(config.path, dynamicParams);
};

const replaceUrlParam = (
  url: string,
  dynamicParams: Record<string, string>
): string => {
  for (const param in dynamicParams) {
    url = url.replace(param, dynamicParams[param]);
  }
  return url;
};

const getAllViewConfigs = async (): Promise<
  Record<string, ViewConfigWithPathParams[]>
> => {
  return Object.keys(embeddedViewConfigs).reduce<
    Record<string, ViewConfigWithPathParams[]>
  >((prev, key) => {
    const pathParams = key.split('/');
    const domain = pathParams.at(0) ?? 'NO DOMAIN';
    const viewConfig = embeddedViewConfigs[key];
    const viewConfigWithPathParams: ViewConfigWithPathParams = {
      viewConfig,
      pathParams,
    };

    return {
      ...prev,
      [domain]: [...(prev[domain] ?? []), viewConfigWithPathParams],
    };
  }, {});
};

export const embeddedViewConfigSource: ViewConfigSource = {
  source: 'embedded',
  resolve: sourceResolver,
  getAllViewConfigs,
};
